"""
Fallback cache for feasibility reports.
This module acts as an on-stage safety net if the live Gemini API call fails during judging
or network interruptions.

REMINDER: All four demo districts (Ghaziabad/retail, Meerut/retail, Varanasi/retail, Prayagraj/textiles) now have verified fallback coverage using real OSM business data as of Sep 2026.
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
    "varanasi|retail": {
        "market_reach": (
            "With a high population density of 2395 persons per sq. km, your retail shop will have a large number of "
            "potential customers living in close proximity. Since 56.6% of the district population resides in rural areas, "
            "locating your business to serve these rural communities could significantly expand your customer base."
        ),
        "opportunity_analysis": (
            "The retail category is well-suited for a district with over 3.6 million people and a steady annual per capita "
            "income of INR 118,000. This demographic provides a consistent volume of potential buyers looking for essential "
            "and daily-use goods."
        ),
        "swot": {
            "strengths": (
                "Your primary strength is the high population density in Varanasi, which ensures a high footfall of potential "
                "customers near your business site. The large rural population segment offers a specific, sizeable market for "
                "retail items that may not be available locally."
            ),
            "weaknesses": (
                "The provided data does not specify the exact locations of existing businesses or the specific types of retail "
                "goods currently sold, making it difficult to assess exact gaps in the market. Furthermore, while the average income "
                "is known, the data does not detail spending habits, which may influence demand for premium retail items."
            ),
            "opportunities": (
                "You have the opportunity to serve a significant rural population that may currently have limited access to "
                "centralized retail options. By targeting the high-density areas, you can maximize your reach to thousands of "
                "households within a small radius."
            ),
            "threats": (
                "The presence of 68 already registered retail businesses indicates that you will be entering a market where "
                "competition is already established. You will need to differentiate your offerings to attract customers who "
                "may already have other retail shopping options available to them."
            ),
        },
        "competitor_mapping": (
            "There are 68 registered businesses currently operating in this retail sector within the district. This number "
            "suggests that the market is active, requiring you to clearly understand what goods your neighbors are selling to "
            "ensure you offer something unique or essential."
        ),
        "pricing_suggestion": (
            "Given the annual per capita income of INR 118,000, it is advisable to keep your pricing competitive and focused on "
            "value. Offering goods that align with the everyday budget needs of the local residents will likely ensure steady sales turnover."
        ),
    },
    "prayagraj|textiles": {
        "market_reach": (
            "With a large total population of nearly 4.5 million, there is a very broad potential customer base for textile goods. "
            "Since 88.2% of the people live in rural areas, your products should be designed for rural lifestyles and preferences. "
            "The high population density of 781 persons per sq. km makes it easier to reach many customers in a concentrated area."
        ),
        "opportunity_analysis": (
            "Textiles are a daily necessity, making them a suitable business choice for a region with a large rural population. "
            "Given the annual per capita income of INR 62,000, there is a consistent demand for affordable and durable clothing. "
            "Focusing on essential textile products will align well with the spending habits of the local community."
        ),
        "swot": {
            "strengths": (
                "The primary strength is the massive rural population base which ensures a high demand for clothing and fabric "
                "products. Being located in a district with such a dense population provides a clear, reachable target market."
            ),
            "weaknesses": (
                "The relatively low annual per capita income of INR 62,000 limits the amount of money customers can spend on "
                "premium or high-end textile products. You will have to manage your business carefully as the local spending power is modest."
            ),
            "opportunities": (
                "The high rural population share offers a significant chance to provide everyday wear and utility textiles that the "
                "local community regularly requires. By focusing on bulk demand from the dense local population, you can build a stable customer base."
            ),
            "threats": (
                "There are already 105 registered businesses in the textile sector, which means you will face active local competition. "
                "You must differentiate your products to ensure customers choose your business over these existing shops."
            ),
        },
        "competitor_mapping": (
            "There are 105 registered textile businesses already operating in the district, indicating an established market presence. "
            "While this confirms that textiles are a viable business, you will need to offer something unique or better service to stand "
            "out among these existing competitors."
        ),
        "pricing_suggestion": (
            "Because the annual per capita income is INR 62,000, your pricing must be very affordable and budget-friendly for the "
            "average household. Avoid high-end luxury pricing, as it may be out of reach for most of your potential customers. "
            "Focus on clear, value-based pricing that fits into a typical rural family's yearly budget."
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
