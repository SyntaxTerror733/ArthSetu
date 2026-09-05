import sys
sys.path.insert(0, 'app')
from data_layer.data_loader import get_district, list_available_districts

print("Available districts:", list_available_districts())
meerut = get_district("Meerut")
print(meerut)
assert meerut["sector_business_density"]["retail"] == 80
bareilly = get_district("Bareilly")
assert bareilly is None
print("PASSED")