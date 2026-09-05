import sys
sys.path.insert(0, 'app')
from data_layer.data_loader import get_district

for d in ["Ghaziabad", "Meerut", "Varanasi", "Prayagraj"]:
    data = get_district(d)
    print(f"{d}: pop={data['population']}, density={data['population_density_per_sqkm']}, income={data['per_capita_income_annual_inr']}, confidence={data['data_confidence']}")