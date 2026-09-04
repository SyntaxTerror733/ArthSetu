import os
from typing import Any, Dict
from app.ai_layer.llm_client import call_llm

TEMPLATE_PATH = os.path.join(os.path.dirname(__file__), "chat_prompt.txt")


def _format_field(val: Any) -> str:
    """Format string or list fields into a clean prompt string."""
    if val is None:
        return ""
    if isinstance(val, list):
        return "; ".join(str(item) for item in val)
    return str(val)


def build_chat_prompt(
    report: Dict[str, Any], district: str, business_category: str, user_question: str
) -> str:
    """
    Reads chat_prompt.txt and fills in placeholders using values from the report dict,
    district, business_category, and user_question.

    Args:
        report: Dict containing report fields (market_reach, opportunity_analysis, swot, etc.)
        district: Name of the district (e.g. 'Ghaziabad')
        business_category: Business sector/category (e.g. 'Retail')
        user_question: Follow-up question asked by the user

    Returns:
        Fully rendered prompt string.
    """
    with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
        template = f.read()

    swot = report.get("swot", {}) if isinstance(report.get("swot"), dict) else {}

    prompt = template.format(
        district=district,
        business_category=business_category,
        market_reach=_format_field(report.get("market_reach")),
        opportunity_analysis=_format_field(report.get("opportunity_analysis")),
        swot_strengths=_format_field(swot.get("strengths")),
        swot_weaknesses=_format_field(swot.get("weaknesses")),
        swot_opportunities=_format_field(swot.get("opportunities")),
        swot_threats=_format_field(swot.get("threats")),
        competitor_mapping=_format_field(report.get("competitor_mapping")),
        pricing_suggestion=_format_field(report.get("pricing_suggestion")),
        user_question=user_question,
    )
    return prompt


def get_chat_response(
    report: Dict[str, Any], district: str, business_category: str, user_question: str
) -> str:
    """
    Builds the chat prompt and calls call_llm to retrieve a conversational AI response.

    Args:
        report: Dict containing report fields
        district: Name of the district
        business_category: Business category
        user_question: User's follow-up question

    Returns:
        Plain text conversational AI response string.
    """
    prompt = build_chat_prompt(report, district, business_category, user_question)
    response_text = call_llm(prompt)
    return response_text
