import sys
sys.path.insert(0, 'app')
from data_layer.data_loader import get_district
from ai_layer.llm_client import build_feasibility_prompt

ghaziabad = get_district("Ghaziabad")
prompt = build_feasibility_prompt(ghaziabad, "retail")
print(prompt)