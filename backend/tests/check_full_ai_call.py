import sys
sys.path.insert(0, 'app')
from dotenv import load_dotenv
load_dotenv()

from data_layer.data_loader import get_district
from ai_layer.llm_client import build_feasibility_prompt, call_llm

ghaziabad = get_district("Ghaziabad")
prompt = build_feasibility_prompt(ghaziabad, "retail")

print("Sending prompt to Gemini...\n")
response = call_llm(prompt)

print("=== RAW GEMINI RESPONSE ===")
print(response)
print("=== END RESPONSE ===")