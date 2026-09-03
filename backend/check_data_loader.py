import sys
sys.path.insert(0, 'app')
from data_layer.data_loader import get_district, list_available_districts

print("Available districts:", list_available_districts())

ghaziabad = get_district("ghaziabad")  # lowercase, testing case-insensitivity
print("\nGhaziabad data:")
print(ghaziabad)

missing = get_district("Nonexistent District")
print("\nLooking up a fake district:", missing)
assert missing is None

print("\nPASSED")