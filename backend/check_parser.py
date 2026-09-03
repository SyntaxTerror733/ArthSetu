import sys
sys.path.insert(0, 'app')
from ai_layer.response_parser import parse_feasibility_report, FeasibilityReportParseError

# Test 1: valid JSON with markdown fences (common AI habit) — should still parse
good_with_fences = '''```json
{
  "market_reach": "test",
  "opportunity_analysis": "test",
  "swot": {"strengths": "test", "weaknesses": "test", "opportunities": "test", "threats": "test"},
  "competitor_mapping": "test",
  "pricing_suggestion": "test"
}
```'''
result = parse_feasibility_report(good_with_fences)
print("Test 1 passed — fences stripped, parsed correctly:", list(result.keys()))

# Test 2: missing a required key — should raise an error, not silently pass
missing_key = '{"market_reach": "test", "swot": {"strengths":"a","weaknesses":"b","opportunities":"c","threats":"d"}}'
try:
    parse_feasibility_report(missing_key)
    print("Test 2 FAILED — should have raised an error")
except FeasibilityReportParseError as e:
    print("Test 2 passed — correctly caught missing keys:", e)

# Test 3: broken/invalid JSON entirely — should raise an error, not crash ugly
broken_json = '{this is not valid json at all'
try:
    parse_feasibility_report(broken_json)
    print("Test 3 FAILED — should have raised an error")
except FeasibilityReportParseError as e:
    print("Test 3 passed — correctly caught invalid JSON:", e)

print("\nALL CHECKS DONE")
