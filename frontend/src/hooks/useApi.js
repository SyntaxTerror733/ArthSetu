import { useState, useCallback } from 'react';
import { calculateFinancials, getFeasibilityReport } from '../lib/api';

/**
 * Generic React hook for executing async API functions with state management.
 * 
 * @param {Function} apiFunc - Async function to execute
 * @returns {Object} { data, loading, error, execute, reset }
 */
export function useApi(apiFunc) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const execute = useCallback(
    async (...args) => {
      setLoading(true);
      setError(null);
      try {
        const result = await apiFunc(...args);
        setData(result);
        return result;
      } catch (err) {
        const errObj = err instanceof Error ? err : new Error(String(err));
        setError(errObj);
        throw errObj;
      } finally {
        setLoading(false);
      }
    },
    [apiFunc]
  );

  const reset = useCallback(() => {
    setData(null);
    setLoading(false);
    setError(null);
  }, []);

  return { data, loading, error, execute, reset };
}

/**
 * Custom hook for calculating project financials.
 * 
 * @returns {Object} { calculate, execute, data, loading, error, reset }
 */
export function useCalculateFinancials() {
  const { execute, data, loading, error, reset } = useApi(calculateFinancials);
  return {
    calculate: execute,
    execute,
    data,
    loading,
    error,
    reset,
  };
}

/**
 * Custom hook for fetching district feasibility reports.
 * 
 * @returns {Object} { getReport, execute, data, loading, error, reset }
 */
export function useFeasibilityReport() {
  const { execute, data, loading, error, reset } = useApi(getFeasibilityReport);
  return {
    getReport: execute,
    execute,
    data,
    loading,
    error,
    reset,
  };
}
