import sys
sys.path.insert(0, 'app')
from financial_engine.scheme_router import route_scheme, SchemeType

# Test 1: small project cost -> should get Micro Finance
s1 = route_scheme(140000)
print(s1)
assert s1.scheme_type == SchemeType.MICRO_FINANCE
assert s1.interest_rate_percent == 6.5

# Test 2: bigger project cost -> should get Term Loan
s2 = route_scheme(1000000)
print(s2)
assert s2.scheme_type == SchemeType.TERM_LOAN
assert s2.interest_rate_percent == 8.0

# Test 3: over ₹50 lakh -> should raise an error
try:
    route_scheme(6000000)
    print("Test 3 FAILED — should have raised ValueError")
except ValueError as e:
    print("Test 3 passed —", e)

print("PASSED")