from dataclasses import asdict
from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.financial_engine.calculator import calculate_project_financials
from app.financial_engine.scheme_router import route_scheme
from app.financial_engine.emi_generator import generate_repayment_plan

router = APIRouter(prefix="/api", tags=["calculator"])


class CalculateRequest(BaseModel):
    available_margin_capital: float


@router.post("/calculate")
def calculate(request: CalculateRequest):
    try:
        financials = calculate_project_financials(request.available_margin_capital)
        scheme = route_scheme(financials.project_cost)
        repayment_plan = generate_repayment_plan(financials.loan_amount, scheme)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    return {
        "margin_capital": financials.margin_capital,
        "project_cost": financials.project_cost,
        "loan_amount": financials.loan_amount,
        "margin_percent": financials.margin_percent,
        "loan_percent": financials.loan_percent,
        "scheme": {
            "type": scheme.scheme_type.value if hasattr(scheme.scheme_type, "value") else str(scheme.scheme_type),
            "interest_rate_percent": scheme.interest_rate_percent,
            "tenure_years": scheme.tenure_years,
            "moratorium_months": scheme.moratorium_months,
            "max_project_cost": scheme.max_project_cost,
        },
        "quarterly_installment": repayment_plan.quarterly_installment,
        "repayment_quarters": repayment_plan.repayment_quarters,
        "total_interest_payable": repayment_plan.total_interest_payable,
        "schedule": [asdict(entry) for entry in repayment_plan.schedule],
    }
