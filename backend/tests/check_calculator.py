import sys
sys.path.insert(0, 'app')
from financial_engine.calculator import calculate_project_financials

r = calculate_project_financials(100000)
print(r)
assert r.project_cost == 1000000 and r.loan_amount == 900000
print('PASSED')