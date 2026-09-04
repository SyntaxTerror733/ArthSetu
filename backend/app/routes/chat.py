import logging
from typing import Any, Dict
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field

from app.data_layer.data_loader import get_district
from app.ai_layer.chat_handler import get_chat_response
from app.ai_layer.fallback_cache import get_fallback_report

logger = logging.getLogger(__name__)

router = APIRouter(prefix="/api", tags=["chat"])


class ChatRequest(BaseModel):
    district: str
    business_category: str
    question: str
    report: Dict[str, Any] = Field(default_factory=dict)


@router.post("/chat")
async def chat_with_report(req: ChatRequest) -> Dict[str, str]:
    """
    POST /api/chat

    Answers follow-up conversational questions about a generated business feasibility report.
    Uses client-provided report dict or server-side fallback cache if report is empty.
    """
    report = req.report

    # If frontend provided an empty report dict, try retrieving fallback report from cache
    if not report:
        fallback = get_fallback_report(req.district, req.business_category)
        if fallback:
            report = fallback

    try:
        answer = get_chat_response(
            report=report,
            district=req.district,
            business_category=req.business_category,
            user_question=req.question,
        )
        return {"answer": answer}
    except Exception as e:
        logger.error(
            f"Error generating chat response for question '{req.question}': {e}",
            exc_info=True,
        )
        return {
            "answer": "I'm having trouble answering right now — please try again in a moment."
        }
