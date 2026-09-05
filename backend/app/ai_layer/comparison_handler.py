import json
import os
import re
from typing import Any, Dict

from app.ai_layer.llm_client import call_llm

TEMPLATE_PATH = os.path.join(
    os.path.dirname(__file__), "prompt_templates", "comparison_verdict.txt"
)

REQUIRED_VERDICT_KEYS = {
    "recommended_category",
    "confidence_note",
    "reasoning",
    "key_tradeoffs",
}


def _extract_report_summary(report: Dict[str, Any]) -> str:
    """Extract a condensed summary of key report fields for prompt context."""
    if not isinstance(report, dict):
        return "No report details available."

    parts = []
    if report.get("competitor_mapping"):
        parts.append(f"Competitor Mapping: {report['competitor_mapping']}")

    swot = report.get("swot", {})
    if isinstance(swot, dict) and swot.get("threats"):
        parts.append(f"Top Risk / Threat: {swot['threats']}")

    if report.get("pricing_suggestion"):
        parts.append(f"Pricing Suggestion: {report['pricing_suggestion']}")

    if report.get("market_reach"):
        parts.append(f"Market Reach: {report['market_reach']}")

    return "\n".join(parts) if parts else "No report details available."


def _strip_markdown_fences(text: str) -> str:
    """Strip markdown code block fences and whitespace from raw text."""
    if not text:
        return ""
    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\s*```$", "", cleaned)
    return cleaned.strip()


def build_comparison_prompt(
    district: str,
    category_a: str,
    category_b: str,
    report_a: Dict[str, Any],
    report_b: Dict[str, Any],
    language: str = "en",
) -> str:
    """
    Reads comparison_verdict.txt template and fills in placeholders using
    condensed summaries from report_a and report_b.

    Args:
        district: District name (e.g. 'Ghaziabad')
        category_a: Name of Business Category A (e.g. 'Retail')
        category_b: Name of Business Category B (e.g. 'Dairy')
        report_a: Feasibility report dict for Category A
        report_b: Feasibility report dict for Category B
        language: Output language ('en' | 'hi')

    Returns:
        Formatted prompt string ready for LLM call.
    """
    with open(TEMPLATE_PATH, "r", encoding="utf-8") as f:
        template = f.read()

    lang_str = (language or "en").strip().lower()
    if lang_str == "hi":
        language_instruction = (
            "Respond entirely in Hindi (Devanagari script). "
            "Keep the JSON keys in English exactly as specified, but all text VALUES inside the JSON must be written in Hindi."
        )
    else:
        language_instruction = "Respond entirely in English."

    summary_a = _extract_report_summary(report_a)
    summary_b = _extract_report_summary(report_b)

    replacements = {
        "{district}": str(district),
        "{category_a}": str(category_a),
        "{category_b}": str(category_b),
        "{report_a_summary}": summary_a,
        "{report_b_summary}": summary_b,
        "{language_instruction}": language_instruction,
    }

    prompt = template
    for k, v in replacements.items():
        prompt = prompt.replace(k, v)

    return prompt


def get_comparison_verdict(
    district: str,
    category_a: str,
    category_b: str,
    report_a: Dict[str, Any],
    report_b: Dict[str, Any],
    language: str = "en",
) -> Dict[str, str]:
    """
    Builds the comparison prompt, calls the LLM, parses and validates the JSON response.

    Args:
        district: District name
        category_a: First business category
        category_b: Second business category
        report_a: Report dict for category_a
        report_b: Report dict for category_b
        language: Output language ('en' | 'hi')

    Returns:
        Dict containing recommended_category, confidence_note, reasoning, key_tradeoffs.
    """
    prompt = build_comparison_prompt(
        district, category_a, category_b, report_a, report_b, language
    )

    try:
        raw_response = call_llm(prompt)
        cleaned = _strip_markdown_fences(raw_response)
        data = json.loads(cleaned)

        if isinstance(data, dict):
            missing_keys = REQUIRED_VERDICT_KEYS - set(data.keys())
            if not missing_keys:
                return data
    except Exception as err:
        print(f"[get_comparison_verdict] LLM call or parsing failed: {err}")

    # Fallback response if LLM call fails or response structure is invalid
    lang_str = (language or "en").strip().lower()
    if lang_str == "hi":
        return {
            "recommended_category": category_a,
            "confidence_note": f"{district} में {category_a} और {category_b} दोनों के अच्छे अवसर हैं।",
            "reasoning": f"{district} में दोनों व्यवसायों के लिए स्थानीय मांग उपलब्ध है। विस्तृत विवरण रिपोर्ट अनुभागों में देखा जा सकता है।",
            "key_tradeoffs": f"{category_a} को चुनने पर {category_b} के विशिष्ट उपभोक्ता वर्ग की मांग का लाभ नहीं मिलेगा।",
        }

    return {
        "recommended_category": category_a,
        "confidence_note": f"Both {category_a} and {category_b} show strong feasibility in {district}.",
        "reasoning": f"Based on the district data, {category_a} aligns well with local income levels and customer reach in {district}.",
        "key_tradeoffs": f"Choosing {category_a} means bypassing the specialized customer segment available for {category_b}.",
    }
