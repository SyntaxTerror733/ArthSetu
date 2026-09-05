import sys
sys.path.insert(0, 'app')
from data_layer.data_loader import get_district, list_available_districts

print("Available districts:", list_available_districts())

varanasi = get_district("Varanasi")
assert varanasi["sector_business_density"]["retail"] == 68

prayagraj = get_district("Prayagraj")
assert prayagraj["sector_business_density"]["textiles"] == 105

sitapur = get_district("Sitapur")
assert sitapur is None

print("PASSED")