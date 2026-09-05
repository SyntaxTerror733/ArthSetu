import sys
sys.path.insert(0, 'app')
from ai_layer.fallback_cache import get_fallback_report

for district, category in [("Ghaziabad","retail"), ("Meerut","retail"), ("Varanasi","retail"), ("Prayagraj","textiles")]:
    r = get_fallback_report(district, category)
    assert r is not None, f"Missing: {district}|{category}"
    print(f"{district}|{category}: OK")

print("ALL FOUR CACHED CORRECTLY — PASSED")