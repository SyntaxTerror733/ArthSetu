"""
Fallback cache for feasibility reports.
This module acts as an on-stage safety net if the live Gemini API call fails during judging
or network interruptions.

REMINDER: All 4 districts refreshed Sep 2026 with verified Census 2011 + UP Economic Survey 2023-24 demographic data. Includes suggested_questions field, now required by response_parser.py.
"""

from typing import Any, Dict, Optional

FALLBACK_REPORTS: Dict[str, Dict[str, Any]] = {
    "ghaziabad|retail": {
        "market_reach": "Ghaziabad features a very high population density of 3970.9 persons per sq. km, which means you have a large number of potential customers living in a compact area. While 20% of the district population lives in rural areas, the high overall density suggests that reaching your target audience will be physically convenient.",
        "opportunity_analysis": "The annual per capita income of INR 211505 indicates that customers in this district have a notable level of spending power for retail goods. This demographic profile provides a solid foundation for a retail business that can cater to consistent local demand.",
        "swot": {
            "strengths": "Your business can leverage the extremely high population density to ensure constant foot traffic and accessibility for local residents. The high per capita income levels suggest that your customer base is likely willing to spend on retail items.",
            "weaknesses": "The provided data does not offer specific information regarding local supply chains, transportation infrastructure, or the cost of real estate, which are vital for retail success. We cannot confirm if the retail demand is evenly spread across the urban and rural 20% segments.",
            "opportunities": "With a total district population of over 4.6 million, even capturing a small fraction of the local market offers significant growth potential. You can focus on building a loyal customer base among the dense population who are already accustomed to local shopping.",
            "threats": "There are already 107 existing registered businesses in the retail sector, which creates a competitive environment. You must differentiate your offerings to ensure you can compete effectively against these established players."
        },
        "competitor_mapping": "With 107 existing registered businesses, the sector has a clear presence within the district. You should investigate these competitors to understand what they are selling and identify any gaps in their service that you can fill.",
        "pricing_suggestion": "The annual per capita income of INR 211505 suggests your pricing strategy should reflect a middle-to-higher spending capacity. You should position your products at a price point that offers value while acknowledging that your customers have a stable level of income.",
        "suggested_questions": [
            "Since there are 107 retail businesses already registered, how can I find out exactly what kinds of products they are focusing on to ensure I don't sell the same thing?",
            "Does the high population density mean I should prioritize a shop location in the more urban parts of Ghaziabad, or is there untapped demand in the 20% rural population area?",
            "Given the district's per capita income, what kind of quality or variety should I offer to make sure my prices seem fair to the local shoppers?"
        ]
    },
    "meerut|retail": {
        "market_reach": "With a population density of 1345.7 persons per sq. km, your retail business will benefit from a high concentration of potential customers in a compact area. Nearly half of the district population, at 45%, lives in rural settings, which provides a significant customer base outside of the main urban center.",
        "opportunity_analysis": "An annual per capita income of INR 138,887 suggests that local customers have disposable income to spend on retail goods. The combination of a large population and decent income levels indicates a stable demand for everyday retail items.",
        "swot": {
            "strengths": "The high population density means you can reach a large number of local residents without needing to travel far for customer outreach. This density helps lower the logistical effort required to attract foot traffic to your shop.",
            "weaknesses": "The data provided does not specify the literacy rates or transportation infrastructure in the rural areas, which could affect how easily customers can reach your store. Additionally, there is no information on existing retail gaps or specific product preferences in this district.",
            "opportunities": "You have a large pool of over 1.5 million rural residents to target, offering potential for growth if you align your inventory with their specific shopping needs. The steady per capita income provides a predictable base for regular consumer spending.",
            "threats": "The presence of 80 existing registered businesses in the retail sector indicates that you will be entering a space where competition is already established. You must clearly distinguish your shop from these existing players to win over regular customers."
        },
        "competitor_mapping": "There are 80 existing retail businesses already registered in the district. This number confirms that the retail market is active, but you will need to determine if your specific location is saturated or if there are underserved neighborhoods among the population.",
        "pricing_suggestion": "Pricing should be set to reflect the local per capita income of INR 138,887, ensuring your goods are affordable for the average resident while maintaining quality. You should conduct a quick local survey to see what the competition is charging to ensure your prices are seen as fair by the community.",
        "suggested_questions": [
            "Since there are already 80 retail businesses in the district, how can I find out if my specific neighborhood is already too crowded?",
            "With 45% of the population living in rural areas, what are the best ways to let them know about my shop if they live far from the center?",
            "Given the annual income of INR 138,887, what kind of products do people in this area typically look for when they go shopping?"
        ]
    },
    "varanasi|retail": {
        "market_reach": "With a high population density of 2395.3 persons per sq. km, your retail business is positioned in a very compact and accessible market. Since 55% of the 3.67 million residents live in rural areas, you have a significant opportunity to serve a large customer base outside the city center.",
        "opportunity_analysis": "An annual per capita income of INR 103354 indicates that your customers have a steady level of spending power for daily retail needs. This demographic profile is well-suited for a retail business that offers essential goods or services to the local community.",
        "swot": {
            "strengths": "The high population density ensures that a large number of potential customers are located within a short distance of your shop. This concentration of people makes it easier to reach your target audience effectively.",
            "weaknesses": "The provided data does not specify the literacy rate or local road infrastructure, which are factors that could impact rural supply chain logistics. Without this extra information, it is difficult to determine how easily goods can be transported to rural customers.",
            "opportunities": "The high rural population share of 55% presents a clear path to expand your business reach by catering to those living in the outskirts of the district. Focusing on items frequently needed by this large rural segment could drive consistent growth.",
            "threats": "There are already 68 registered businesses in this retail sector, meaning you will face direct competition from established local players. This number suggests that the market is already seeing active interest, so you will need to find a way to stand out."
        },
        "competitor_mapping": "With 68 existing businesses already operating in the retail sector, the market shows a moderate level of formal competition. You should carefully observe what these shops offer to ensure your store provides something unique or better service to your customers.",
        "pricing_suggestion": "Your pricing should reflect the annual per capita income of INR 103354 to ensure your products remain affordable for the local residents. Aim for a strategy that balances value for the customer with the reality of the local economic environment.",
        "suggested_questions": [
            "Since there are already 68 retail businesses in the district, what specific types of goods are they currently selling that I should avoid or improve upon?",
            "Given that 55% of the population is rural, should I consider a home-delivery model to better reach customers who are further away from the main district center?",
            "Does the current per capita income of INR 103354 suggest that my customers will prefer buying small, everyday items or larger monthly stock-up purchases?"
        ]
    },
    "prayagraj|textiles": {
        "market_reach": "With a large total population of over 5.9 million and a high rural share of 65%, there is a vast potential customer base across the district. The high population density of 1086.2 persons per sq. km indicates that your textile products can easily reach many people in concentrated local areas.",
        "opportunity_analysis": "The textiles sector is well-suited for a region where the majority of the population resides in rural settings, likely indicating steady demand for everyday clothing and fabrics. The annual per capita income of INR 89790 suggests a market that requires products that balance quality with affordability.",
        "swot": {
            "strengths": "Your strength lies in targeting a high-density population where textile needs are constant and essential. The sheer volume of the rural population provides a stable foundation for a local business.",
            "weaknesses": "The provided data does not specify local supply chain access or raw material availability within Prayagraj, which may be a limitation. Additionally, an annual per capita income of INR 89790 suggests that buyers may be very sensitive to price fluctuations.",
            "opportunities": "By focusing on the 65% of the population living in rural areas, you have a clear demographic to target with affordable and durable textile goods. There is potential to expand your reach by leveraging the high population density to set up distribution points in active rural clusters.",
            "threats": "With 105 existing registered businesses in the textiles sector, the market is already occupied by established competitors. You must find a way to differentiate your offerings to attract customers who might already be purchasing from these 105 local businesses."
        },
        "competitor_mapping": "There are 105 existing registered businesses in the textiles sector within Prayagraj. This indicates that you are entering a market that is not empty, so you will need a clear strategy to convince customers to choose your products over existing options.",
        "pricing_suggestion": "Given the annual per capita income of INR 89790, your pricing strategy should be centered on value and affordability. It is recommended to position your products to be accessible for the average resident while ensuring you account for the economic context of the district.",
        "suggested_questions": [
            "Since there are already 105 textile businesses in Prayagraj, what kind of unique fabric or clothing style would help me stand out from these existing competitors?",
            "With an average per capita income of INR 89790, how should I balance the cost of quality materials with the need to keep my prices affordable for rural families?",
            "Considering that 65% of the population is rural, what are the best ways to reach these customers effectively given the high population density of the district?"
        ]
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
