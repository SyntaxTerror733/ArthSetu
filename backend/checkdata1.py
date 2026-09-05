import sys
sys.path.insert(0, 'app')
from ai_layer.fallback_cache import get_fallback_report

checks = [
    ("Ghaziabad", "retail", ["211505"]),
    ("Meerut", "retail", ["138,887", "138887"]),
    ("Varanasi", "retail", ["103354"]),
    ("Prayagraj", "textiles", ["89790"]),
]

for district, category, income_variants in checks:
    r = get_fallback_report(district, category)
    assert r is not None, f"{district} missing"
    found = any(v in r["pricing_suggestion"] for v in income_variants)
    assert found, f"{district}: none of {income_variants} found in pricing_suggestion"
    assert "suggested_questions" in r, f"{district} missing suggested_questions"
    print(f"{district}|{category}: verified — OK")

print("ALL PASSED")