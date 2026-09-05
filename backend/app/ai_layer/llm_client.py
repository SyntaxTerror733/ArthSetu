import os


def _call_anthropic(prompt: str) -> str:
    import anthropic

    client = anthropic.Anthropic(api_key=os.getenv("ANTHROPIC_API_KEY"))
    model = os.getenv("LLM_MODEL", "claude-3-5-sonnet-20241022")
    response = client.messages.create(
        model=model,
        max_tokens=2048,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.content[0].text


def _call_openai(prompt: str) -> str:
    import openai

    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    model = os.getenv("LLM_MODEL", "gpt-4o")
    response = client.chat.completions.create(
        model=model,
        messages=[{"role": "user", "content": prompt}],
    )
    return response.choices[0].message.content


def _call_gemini(prompt: str) -> str:
    import google.genai as genai

    client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))
    response = client.models.generate_content(
        model=os.getenv("LLM_MODEL", "gemini-3.6-flash"),
        contents=prompt,
    )
    return response.text


from pathlib import Path

TEMPLATE_PATH = Path(__file__).parent / "prompt_templates" / "feasibility_report.txt"


def build_feasibility_prompt(district_data: dict, business_category: str, language: str = "en") -> str:
    """
    Load feasibility_report.txt template and format it with district data and business category.
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

    category_key = (business_category or "").strip().lower()
    sector_density = district_data.get("sector_business_density", {})

    sector_business_count = "not available"
    if isinstance(sector_density, dict):
        if category_key in sector_density:
            sector_business_count = str(sector_density[category_key])
        else:
            for k, v in sector_density.items():
                k_norm = k.lower().replace("_", " ")
                if k_norm in category_key or category_key in k_norm:
                    sector_business_count = str(v)
                    break

    replacements = {
        "{language_instruction}": language_instruction,
        "{district}": str(district_data.get("district", "Unknown")),
        "{state}": str(district_data.get("state", "Uttar Pradesh")),
        "{population}": str(district_data.get("population", "N/A")),
        "{rural_population_percent}": str(district_data.get("rural_population_percent", "N/A")),
        "{population_density}": str(district_data.get("population_density_per_sqkm", "N/A")),
        "{sector_business_count}": str(sector_business_count),
        "{per_capita_income}": str(district_data.get("per_capita_income_annual_inr", "N/A")),
        "{business_category}": str(business_category),
    }

    result = template
    for key, val in replacements.items():
        result = result.replace(key, val)

    return result


def call_llm(prompt: str) -> str:
    """
    Unified LLM call interface supporting Gemini, Anthropic, and OpenAI.
    Determines provider via LLM_PROVIDER env variable (defaulting to 'gemini').
    """
    provider = os.getenv("LLM_PROVIDER", "gemini").lower().strip()

    if provider == "gemini":
        return _call_gemini(prompt)
    elif provider == "anthropic":
        return _call_anthropic(prompt)
    elif provider == "openai":
        return _call_openai(prompt)
    else:
        raise ValueError(f"Unsupported LLM provider '{provider}'. Expected 'gemini', 'anthropic', or 'openai'.")
