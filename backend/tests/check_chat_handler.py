import sys
sys.path.insert(0, 'app')
from dotenv import load_dotenv
load_dotenv()

from ai_layer.fallback_cache import get_fallback_report
from ai_layer.chat_handler import get_chat_response

report = get_fallback_report("Ghaziabad", "retail")
answer = get_chat_response(report, "Ghaziabad", "retail", "Why is competition high here?")
print(answer)

# Also test the guardrail — asking about loans should redirect, not answer
answer2 = get_chat_response(report, "Ghaziabad", "retail", "What interest rate will I pay?")
print("\n---\n")
print(answer2)