"""Scheme auto-selection logic, based on NSFDC scheme tiers. IMPORTANT: verify these rates/tenures against the current official NSFDC/SCA source before final demo/submission — schemes are periodically revised."""

from dataclasses import dataclass
from enum import Enum


class SchemeType(str, Enum):
    MICRO_FINANCE = "Micro Finance Scheme"
    TERM_LOAN = "Term Loan Scheme"


@dataclass
class SchemeDetails:
    scheme_type: SchemeType
    interest_rate_percent: float
    tenure_years: int
    moratorium_months: int
    max_project_cost: float


MICRO_FINANCE_THRESHOLD = 140_000
TERM_LOAN_MAX = 5_000_000

MICRO_FINANCE = SchemeDetails(
    scheme_type=SchemeType.MICRO_FINANCE,
    interest_rate_percent=6.5,
    tenure_years=3,
    moratorium_months=3,
    max_project_cost=MICRO_FINANCE_THRESHOLD,
)

TERM_LOAN = SchemeDetails(
    scheme_type=SchemeType.TERM_LOAN,
    interest_rate_percent=8.0,
    tenure_years=7,
    moratorium_months=6,
    max_project_cost=TERM_LOAN_MAX,
)


def route_scheme(project_cost: float) -> SchemeDetails:
    """Route project cost to appropriate scheme details."""
    if project_cost <= 0:
        raise ValueError("Project cost must be greater than zero.")

    if project_cost <= MICRO_FINANCE_THRESHOLD:
        return MICRO_FINANCE
    elif project_cost <= TERM_LOAN_MAX:
        return TERM_LOAN
    else:
        raise ValueError(
            f"Project cost ₹{project_cost:,.2f} exceeds maximum scheme limit of ₹50 lakh (₹{TERM_LOAN_MAX:,.2f})."
        )
