import json
import re


class FeasibilityReportParseError(Exception):
    """Raised when parsing or validating an AI feasibility report response fails."""

    pass


REQUIRED_KEYS = {
    "market_reach",
    "opportunity_analysis",
    "swot",
    "competitor_mapping",
    "pricing_suggestion",
}

REQUIRED_SWOT_KEYS = {
    "strengths",
    "weaknesses",
    "opportunities",
    "threats",
}


def _strip_markdown_fences(text: str) -> str:
    """
    Strips leading/trailing whitespace and markdown code block fences (```json ... ```).
    """
    if not text:
        return ""

    cleaned = text.strip()
    cleaned = re.sub(r"^```(?:json)?\s*", "", cleaned, flags=re.IGNORECASE)
    cleaned = re.sub(r"\s*```$", "", cleaned)
    return cleaned.strip()


def parse_feasibility_report(raw_text: str) -> dict:
    """
    Clean markdown code fences from raw LLM output, parse JSON, and validate required keys.

    Args:
        raw_text: Raw response string from LLM call.

    Returns:
        Validated dictionary containing full feasibility report structure.

    Raises:
        FeasibilityReportParseError: If JSON parsing fails or required keys are missing.
    """
    cleaned_text = _strip_markdown_fences(raw_text)

    try:
        data = json.loads(cleaned_text)
    except json.JSONDecodeError as e:
        raise FeasibilityReportParseError(f"Failed to parse LLM response as JSON: {e}") from e

    if not isinstance(data, dict):
        raise FeasibilityReportParseError(f"Expected JSON object (dict), got {type(data).__name__}")

    missing_top = REQUIRED_KEYS - set(data.keys())
    if missing_top:
        missing_sorted = sorted(list(missing_top))
        raise FeasibilityReportParseError(
            f"Feasibility report is missing required keys: {', '.join(missing_sorted)}"
        )

    swot = data.get("swot")
    if not isinstance(swot, dict):
        raise FeasibilityReportParseError("Field 'swot' must be a JSON object (dict)")

    missing_swot = REQUIRED_SWOT_KEYS - set(swot.keys())
    if missing_swot:
        missing_swot_sorted = sorted(list(missing_swot))
        raise FeasibilityReportParseError(
            f"SWOT section is missing required keys: {', '.join(missing_swot_sorted)}"
        )

    return data
