"""
Fallback cache for feasibility reports.
This module acts as an on-stage safety net if the live Gemini API call fails during judging
or network interruptions.

REMINDER: Ghaziabad's entry reflects real OSM business density data (107 retail businesses), updated Sep 2026. Meerut/retail added Sep 2026 using real OSM business data (80 retail businesses). Sitapur and Varanasi still have no cached fallback — add before final demo if those districts will be shown.
"""

from typing import Any, Dict, Optional

FALLBACK_REPORTS: Dict[str, Dict[str, Any]] = {
    "ghaziabad|retail": {
        "market_reach": (
            "With a total population of over 4.6 million and a high density of 3971 persons per sq. km, "
            "your retail business has access to a very large and concentrated customer base. "
            "Approximately 1.5 million people live in rural areas of Ghaziabad, providing a significant "
            "potential market if you locate your shop to serve these communities effectively."
        ),
        "opportunity_analysis": (
            "The annual per capita income of INR 165000 suggests that local residents have a consistent "
            "level of disposable income to spend on retail goods. The combination of a dense population "
            "and this income level creates a steady environment for a retail business to operate "
            "throughout the year."
        ),
        "swot": {
            "strengths": (
                "The high population density ensures that your business will have a large number of "
                "potential customers living within a short distance. You are positioned to serve a "
                "market that includes both urban dwellers and a substantial rural population."
            ),
            "weaknesses": (
                "The provided data does not specify the literacy rate or local infrastructure quality, "
                "so it is difficult to determine how these factors might affect daily store operations. "
                "Additionally, the data does not break down consumer preferences, making it hard to predict "
                "exactly which retail products are in highest demand."
            ),
            "opportunities": (
                "You can focus on stocking essential goods that cater to the daily needs of the 32.5% "
                "rural population segment. By targeting the needs of this specific demographic, you can "
                "build a loyal customer base within the district."
            ),
            "threats": (
                "There are already 107 registered businesses in the retail sector, which indicates a "
                "competitive environment. You must ensure your service or product selection is distinct "
                "enough to attract customers away from established competitors."
            ),
        },
        "competitor_mapping": (
            "With 107 existing registered retail businesses, the market is moderately crowded. "
            "You will need to carefully observe the goods offered by these competitors to ensure your "
            "store provides items that are currently missing or in high demand."
        ),
        "pricing_suggestion": (
            "Your pricing should reflect the annual per capita income of INR 165000, which suggests "
            "a preference for value-oriented products. Focus on pricing your items to be affordable "
            "for the average resident while maintaining a clear and consistent pricing structure."
        ),
    },
    "meerut|retail": {
        "market_reach": (
            "With a population density of 1084 persons per sq. km, your business is located in a highly "
            "concentrated area, allowing for easy access to a large number of potential customers. "
            "Since 65.2% of the 4.4 million residents live in rural areas, your store can serve a vast "
            "customer base that may have limited access to urban retail centers."
        ),
        "opportunity_analysis": (
            "The retail sector is well-suited for a district with such high population density, as there "
            "is a constant demand for daily goods among a large local population. With an annual per capita "
            "income of INR 92000, residents have steady, albeit modest, purchasing power that can support "
            "a retail enterprise focused on everyday essentials."
        ),
        "swot": {
            "strengths": (
                "Your primary strength is the massive rural population base which provides a consistent "
                "and loyal customer pool. The high population density ensures that your business location "
                "will benefit from a high volume of foot traffic."
            ),
            "weaknesses": (
                "The provided data does not give information about local supply chains or infrastructure, "
                "which are critical for retail success. We cannot determine if transportation costs or "
                "logistics will limit your ability to keep shelves stocked efficiently."
            ),
            "opportunities": (
                "You have the potential to serve a large segment of the 4.4 million people living in the "
                "district who are currently under-served by existing formal retail outlets. By focusing on "
                "essential goods that cater to both rural and urban preferences, you can capture a "
                "significant share of the local market."
            ),
            "threats": (
                "The existing 80 registered businesses in the retail sector indicate that there is already "
                "a degree of competition for the local consumer's money. You must consider if the market "
                "can support additional outlets without diluting the revenue potential for everyone."
            ),
        },
        "competitor_mapping": (
            "There are currently 80 registered retail businesses operating in this district. This indicates "
            "that while there is an established retail presence, the ratio of businesses to a population of "
            "over 4 million suggests that the market may still have space for new entrants who offer "
            "better accessibility or service."
        ),
        "pricing_suggestion": (
            "Given the annual per capita income of INR 92000, your pricing should remain competitive and "
            "focused on value to match the local purchasing capacity. It is recommended to offer a variety "
            "of products that provide good utility, ensuring they are affordable enough to fit into the "
            "local household budget."
        ),
    },
}


def get_fallback_report(district: str, business_category: str) -> Optional[Dict[str, Any]]:
    """
    Build lowercase 'district|category' key and return matching entry from FALLBACK_REPORTS.

    Args:
        district: Name of the district (e.g. 'Ghaziabad').
        business_category: Business category (e.g. 'Retail' or 'Retail Shop').

    Returns:
        Matching report dictionary or None if no cached entry exists.
    """
    if not district or not business_category:
        return None

    dist = district.strip().lower()
    cat = business_category.strip().lower()

    # Direct key lookup
    key = f"{dist}|{cat}"
    if key in FALLBACK_REPORTS:
        return FALLBACK_REPORTS[key]

    # Normalized category fallback (e.g. 'retail shop' -> 'retail')
    if "retail" in cat:
        key_retail = f"{dist}|retail"
        if key_retail in FALLBACK_REPORTS:
            return FALLBACK_REPORTS[key_retail]

    return None
