import sys
sys.path.insert(0, 'app')
from dotenv import load_dotenv
load_dotenv()
import json

from data_layer.data_loader import get_district
from ai_layer.llm_client import build_feasibility_prompt, call_llm
from ai_layer.response_parser import parse_feasibility_report

ghaziabad = get_district("Ghaziabad")
prompt = build_feasibility_prompt(ghaziabad, "retail")
response = call_llm(prompt)
report = parse_feasibility_report(response)

print(json.dumps(report, indent=2, ensure_ascii=False))