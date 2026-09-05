import sys
sys.path.insert(0, 'app')
from ai_layer.fallback_cache import get_fallback_report

result = get_fallback_report("Ghaziabad", "retail")
print(result["competitor_mapping"])
assert "107" in result["competitor_mapping"]
assert "1450" not in result["competitor_mapping"]
print("PASSED")