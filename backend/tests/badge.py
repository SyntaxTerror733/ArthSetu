import sys
sys.path.insert(0, 'app')
from data_layer.data_loader import get_district

ghaziabad = get_district("Ghaziabad")
print(ghaziabad["data_confidence"])
print(ghaziabad["sources"])
assert ghaziabad["data_confidence"]["business_density"] == "verified"
print("PASSED")