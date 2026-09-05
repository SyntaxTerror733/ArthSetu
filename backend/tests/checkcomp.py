import sys
sys.path.insert(0, 'app')
from dotenv import load_dotenv
load_dotenv()

from data_layer.data_loader import get_district
from ai_layer.llm_client import build_feasibility_prompt, call_llm
from ai_layer.response_parser import parse_feasibility_report
from ai_layer.comparison_handler import get_comparison_verdict

ghaziabad = get_district("Ghaziabad")

prompt_a = build_feasibility_prompt(ghaziabad, "retail")
report_a = parse_feasibility_report(call_llm(prompt_a))

prompt_b = build_feasibility_prompt(ghaziabad, "dairy")
report_b = parse_feasibility_report(call_llm(prompt_b))

verdict = get_comparison_verdict("Ghaziabad", "retail", "dairy", report_a, report_b)
print(verdict)