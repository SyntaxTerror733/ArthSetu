"""CRITICAL RULE: This module must NEVER call an LLM or depend on ai_layer. All numbers here must be reproducible, auditable, and defensible in front of judges."""

from dataclasses import dataclass


@dataclass
class ProjectFinancials:
    margin_capital: float
    project_cost: float
    loan_amount: float
    margin_percent: float = 10.0
    loan_percent: float = 90.0


def calculate_project_financials(available_margin_capital: float) -> ProjectFinancials:
    """Calculate project financials given the beneficiary's margin capital (10% contribution)."""
    if available_margin_capital <= 0:
        raise ValueError("Available margin capital must be greater than zero.")

    project_cost = round(available_margin_capital / 0.10, 2)
    loan_amount = round(project_cost * 0.90, 2)

    return ProjectFinancials(
        margin_capital=available_margin_capital,
        project_cost=project_cost,
        loan_amount=loan_amount,
    )
