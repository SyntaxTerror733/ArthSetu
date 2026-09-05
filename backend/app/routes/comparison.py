import logging
from typing import Any, Dict, Optional
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.ai_layer.comparison_handler import get_comparison_verdict

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["comparison"])


class ComparisonRequest(BaseModel):
    district: str
    category_a: str
    category_b: str
    report_a: Dict[str, Any]
    report_b: Dict[str, Any]
    language: str = "en"


@router.post("/compare-verdict")
def generate_comparison_verdict(req: ComparisonRequest) -> Dict[str, Any]:
    """
    POST /api/compare-verdict

    Compares two business categories for a given district based on their respective
    feasibility report summaries and returns a synthesized AI recommendation verdict.
    """
    try:
        verdict = get_comparison_verdict(
            district=req.district,
            category_a=req.category_a,
            category_b=req.category_b,
            report_a=req.report_a,
            report_b=req.report_b,
            language=req.language,
        )
        return verdict
    except Exception as e:
        logger.error(
            f"Error generating comparison verdict for {req.category_a} vs {req.category_b} in {req.district}: {e}",
            exc_info=True,
        )
        return {
            "recommended_category": None,
            "confidence_note": "Unable to generate a comparison right now.",
            "reasoning": "Please review both reports above to make your own comparison.",
            "key_tradeoffs": "",
        }
