import logging
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.data_layer.data_loader import get_district
from app.ai_layer.llm_client import build_feasibility_prompt, call_llm
from app.ai_layer.response_parser import parse_feasibility_report, FeasibilityReportParseError
from app.ai_layer.fallback_cache import get_fallback_report

router = APIRouter(prefix="/api", tags=["report"])
logger = logging.getLogger(__name__)


class FeasibilityReportRequest(BaseModel):
    district: str
    business_category: str


@router.post("/feasibility-report")
def generate_feasibility_report(request: FeasibilityReportRequest):
    district_data = get_district(request.district)
    if district_data is None:
        raise HTTPException(
            status_code=404,
            detail=f"No dataset found for district '{request.district}'. Supported districts: Ghaziabad, Bareilly, Sitapur, Varanasi."
        )

    try:
        prompt = build_feasibility_prompt(district_data, request.business_category)
        raw_response = call_llm(prompt)
        report = parse_feasibility_report(raw_response)
        report["_source"] = "live_llm"
        return report
    except (FeasibilityReportParseError, Exception) as e:
        logger.warning(
            f"Live LLM generation/parsing failed for district='{request.district}', category='{request.business_category}': {e}"
        )
        fallback = get_fallback_report(request.district, request.business_category)
        if fallback is not None:
            fallback_copy = dict(fallback)
            fallback_copy["_source"] = "fallback_cache"
            return fallback_copy

        raise HTTPException(
            status_code=502,
            detail=(
                f"Failed to generate feasibility report for '{request.district}' ({request.business_category}). "
                f"Live LLM error: {e}. No cached fallback entry exists for this district/category combination."
            )
        )
