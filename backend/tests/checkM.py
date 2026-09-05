import sys
sys.path.insert(0, 'app')
from ai_layer.fallback_cache import get_fallback_report

ghaziabad = get_fallback_report("Ghaziabad", "retail")
meerut = get_fallback_report("Meerut", "retail")

assert ghaziabad is not None and "107" in ghaziabad["competitor_mapping"]
assert meerut is not None and "80" in meerut["competitor_mapping"]

print("Both cached entries verified correct.")
print("PASSED")