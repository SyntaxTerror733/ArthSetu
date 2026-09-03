"""
Fallback cache for feasibility reports.
This module acts as an on-stage safety net if the live Gemini API call fails during judging
or network interruptions.

REMINDER: Add pre-generated fallback report entries for the other 3 demo districts
(Bareilly, Sitapur, Varanasi) before the final demo/submission.
"""

from typing import Any, Dict, Optional

FALLBACK_REPORTS: Dict[str, Dict[str, Any]] = {
    "ghaziabad|retail": {
        "market_reach": (
            "The district has a high population density of 3,971 persons per square kilometer "
            "within a total population of 4,681,645 people. With a rural population share of 32.5%, "
            "the majority of potential customers live in urban areas, while nearly a third reside "
            "in rural villages. This dense concentration of residents allows a retail enterprise "
            "to reach a large customer base within a compact geographic area."
        ),
        "opportunity_analysis": (
            "Setting up a retail business in Ghaziabad aligns well with the district's annual "
            "per capita income of INR 165,000. With a large population base of over 4.68 million "
            "people, there is continuous household demand for retail goods. The combination of "
            "high population density and stable income levels supports daily retail trade."
        ),
        "swot": {
            "strengths": (
                "A major strength is the large district population of 4,681,645, which offers a "
                "massive potential customer base. High population density of 3,971 persons per "
                "square kilometer ensures consistent foot traffic for a retail shop. An annual "
                "per capita income of INR 165,000 provides local households with steady purchasing power."
            ),
            "weaknesses": (
                "Balancing inventory for both the 32.5% rural population and the larger urban "
                "population requires careful product selection. The provided dataset lacks "
                "specific information on local rental costs, road infrastructure, or supply chain "
                "networks. Due to these data limitations, exact store placement challenges cannot "
                "be fully analyzed."
            ),
            "opportunities": (
                "Serving a district of over 4.68 million people presents continuous opportunities "
                "to supply everyday goods. The annual per capita income of INR 165,000 supports "
                "consistent consumer spending on retail items. A retailer can grow by catering "
                "to both the urban majority and the 32.5% rural population share."
            ),
            "threats": (
                "The presence of 1,450 existing registered retail businesses indicates intense "
                "local competition in this sector. Competing with established sellers for customer "
                "loyalty poses a direct risk to a new entrant. Furthermore, the dataset does not "
                "account for unregistered vendors, which could add unmeasured competitive pressure."
            ),
        },
        "competitor_mapping": (
            "There are already 1,450 registered retail businesses operating within the district. "
            "This high business count shows that the retail sector is active, but highly crowded. "
            "A new enterprise will need to differentiate itself through good customer service "
            "and reliable stock to compete with these 1,450 existing traders."
        ),
        "pricing_suggestion": (
            "Pricing should be structured to match the district's annual per capita income of "
            "INR 165,000. Offering affordable, value-focused prices will appeal to both urban "
            "shoppers and the 32.5% rural population share. Keeping profit margins competitive "
            "will help build a regular customer base in a market with 1,450 existing competitors."
        ),
    }
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
