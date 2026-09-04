const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';

/**
 * Helper to handle fetch HTTP responses.
 * Parses JSON response or throws a detailed Error if the response is not OK.
 */
async function handleResponse(response) {
  if (!response.ok) {
    let errorMessage = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const errorData = await response.json();
      if (errorData && errorData.detail) {
        errorMessage = typeof errorData.detail === 'string'
          ? errorData.detail
          : JSON.stringify(errorData.detail);
      } else if (errorData && errorData.message) {
        errorMessage = errorData.message;
      }
    } catch {
      // Fallback to default status message if JSON parsing fails
    }
    throw new Error(errorMessage);
  }
  return await response.json();
}

/**
 * Calculates project financials, matched scheme details, and repayment schedule.
 * @param {number|string} marginCapital - Beneficiary's margin capital contribution
 * @returns {Promise<Object>} Calculated financial metrics, scheme details, and schedule
 */
export async function calculateFinancials(marginCapital) {
  const response = await fetch(`${BASE_URL}/api/calculate`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      available_margin_capital: Number(marginCapital),
    }),
  });
  return handleResponse(response);
}

/**
 * Fetches feasibility report for a given district and business category.
 * @param {string} district - District name
 * @param {string} businessCategory - Business sector/category
 * @returns {Promise<Object>} Feasibility report object
 */
export async function getFeasibilityReport(district, businessCategory) {
  const response = await fetch(`${BASE_URL}/api/feasibility-report`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      district,
      business_category: businessCategory,
    }),
  });
  return handleResponse(response);
}

/**
 * Sends a follow-up chat question regarding a feasibility report.
 * @param {string} district - District name
 * @param {string} businessCategory - Business category
 * @param {string} question - User question string
 * @param {Object} report - Feasibility report dictionary
 * @returns {Promise<Object>} Object with `{ answer: string }`
 */
export async function askChatQuestion(district, businessCategory, question, report) {
  const response = await fetch(`${BASE_URL}/api/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      district,
      business_category: businessCategory,
      question,
      report: report || {},
    }),
  });
  return handleResponse(response);
}

