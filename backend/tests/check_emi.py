import sys
sys.path.insert(0, 'app')
from financial_engine.scheme_router import route_scheme
from financial_engine.emi_generator import generate_repayment_plan

scheme = route_scheme(140000)
plan = generate_repayment_plan(125000, scheme)

print("Quarterly installment:", plan.quarterly_installment)
print("Number of repayment quarters:", plan.repayment_quarters)
print("Total interest payable:", plan.total_interest_payable)
print("First quarter entry:", plan.schedule[0])
print("Last quarter entry:", plan.schedule[-1])

assert plan.quarterly_installment > 0
assert len(plan.schedule) == plan.repayment_quarters
assert plan.schedule[-1].closing_balance == 0

print("PASSED")