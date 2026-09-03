import sys
sys.path.insert(0, 'app')
from ai_layer.fallback_cache import get_fallback_report

result = get_fallback_report("Ghaziabad", "retail")
print(result)
assert result is not None
assert "market_reach" in result

missing = get_fallback_report("NonexistentPlace", "farming")
print("Missing lookup:", missing)
assert missing is None

print("PASSED")