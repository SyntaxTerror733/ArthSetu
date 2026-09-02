"""EMI (quarterly instalment) and moratorium schedule generator. Deterministic — no AI involved. Uses standard reducing-balance quarterly repayment math over the scheme's tenure, after the moratorium period."""

from dataclasses import dataclass, field
from .scheme_router import SchemeDetails


@dataclass
class RepaymentScheduleEntry:
    quarter: int
    opening_balance: float
    interest: float
    principal: float
    installment: float
    closing_balance: float


@dataclass
class RepaymentPlan:
    loan_amount: float
    scheme: SchemeDetails
    moratorium_months: int
    repayment_quarters: int
    quarterly_installment: float
    total_interest_payable: float
    schedule: list[RepaymentScheduleEntry] = field(default_factory=list)


def generate_repayment_plan(loan_amount: float, scheme: SchemeDetails) -> RepaymentPlan:
    """Generate a quarterly repayment plan and schedule based on scheme details."""
    if loan_amount <= 0:
        raise ValueError("Loan amount must be greater than zero.")

    quarterly_rate = (scheme.interest_rate_percent / 100) / 4
    total_quarters = scheme.tenure_years * 4
    moratorium_quarters = round(scheme.moratorium_months / 3)
    repayment_quarters = total_quarters - moratorium_quarters

    if repayment_quarters <= 0:
        raise ValueError("Repayment quarters must be greater than zero.")

    if quarterly_rate == 0:
        installment = loan_amount / repayment_quarters
    else:
        factor = (1 + quarterly_rate) ** repayment_quarters
        installment = loan_amount * quarterly_rate * factor / (factor - 1)

    quarterly_installment = round(installment, 2)
    schedule: list[RepaymentScheduleEntry] = []
    current_balance = loan_amount
    total_interest = 0.0

    for q in range(1, repayment_quarters + 1):
        opening_balance = round(current_balance, 2)
        interest = round(opening_balance * quarterly_rate, 2)
        if q == repayment_quarters:
            principal = opening_balance
            inst = round(principal + interest, 2)
            closing_balance = 0.0
        else:
            inst = quarterly_installment
            principal = round(inst - interest, 2)
            closing_balance = round(opening_balance - principal, 2)

        total_interest += interest
        current_balance = closing_balance

        schedule.append(
            RepaymentScheduleEntry(
                quarter=q,
                opening_balance=opening_balance,
                interest=interest,
                principal=principal,
                installment=inst,
                closing_balance=closing_balance,
            )
        )

    return RepaymentPlan(
        loan_amount=round(loan_amount, 2),
        scheme=scheme,
        moratorium_months=scheme.moratorium_months,
        repayment_quarters=repayment_quarters,
        quarterly_installment=quarterly_installment,
        total_interest_payable=round(total_interest, 2),
        schedule=schedule,
    )
