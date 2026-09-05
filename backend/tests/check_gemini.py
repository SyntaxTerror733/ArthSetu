import sys
sys.path.insert(0, 'app')
from dotenv import load_dotenv
load_dotenv()

from ai_layer.llm_client import call_llm

response = call_llm("Say hello in one short sentence, and confirm you are working correctly.")
print("Gemini responded:")
print(response)