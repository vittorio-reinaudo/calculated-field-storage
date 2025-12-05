import { create } from "zustand";
import { ExpenseData, ExpenseCalculator } from "./ExpenseModel";
import { fetchExpenses } from "../api/expenses";

interface ExpenseStoreState {
  // State
  expenses: ExpenseData[];
  isLoading: boolean;
  error: string | null;

  // Computed (come getters)
  getGrandTotalYear1: () => number;
  getGrandTotalYear2: () => number;
  getGrandTotalYear3: () => number;

  // Actions
  loadExpenses: () => Promise<void>;
  addExpense: () => number;
  removeExpense: (id: number) => void;
  getExpenseById: (id: number) => ExpenseData | undefined;

  // Update actions
  updateExpenseName: (id: number, name: string) => void;
  updateExpenseBasePrice: (id: number, price: number) => void;
  updateExpensePriceMult2: (id: number, mult: number) => void;
  updateExpensePriceMult3: (id: number, mult: number) => void;
  updateExpenseQtyMult2: (id: number, mult: number) => void;
  updateExpenseQtyMult3: (id: number, mult: number) => void;

  // Metric actions
  addMetric: (expenseId: number) => void;
  removeMetric: (expenseId: number, metricId: number) => void;
  updateMetricName: (expenseId: number, metricId: number, name: string) => void;
  updateMetricValue: (
    expenseId: number,
    metricId: number,
    value: number
  ) => void;
}

export const useExpenseStore = create<ExpenseStoreState>((set, get) => ({
  // Initial state
  expenses: [],
  isLoading: false,
  error: null,

  // Computed getters
  getGrandTotalYear1: () => {
    const expenses = get().expenses;
    return expenses.reduce(
      (sum, e) => sum + ExpenseCalculator.getTotalYear1(e),
      0
    );
  },

  getGrandTotalYear2: () => {
    const expenses = get().expenses;
    return expenses.reduce(
      (sum, e) => sum + ExpenseCalculator.getTotalYear2(e),
      0
    );
  },

  getGrandTotalYear3: () => {
    const expenses = get().expenses;
    return expenses.reduce(
      (sum, e) => sum + ExpenseCalculator.getTotalYear3(e),
      0
    );
  },

  // Load expenses from API
  loadExpenses: async () => {
    set({ isLoading: true, error: null });

    try {
      const result = await fetchExpenses();

      if (result.success && result.data) {
        set({ expenses: result.data, isLoading: false });
      } else {
        set({
          error: result.message || "Errore nel caricamento delle spese",
          isLoading: false,
        });
      }
    } catch (error) {
      set({
        error: "Errore di connessione al server",
        isLoading: false,
      });
      console.error("Load expenses error:", error);
    }
  },

  // Add new expense
  addExpense: () => {
    const newExpense: ExpenseData = {
      id: Math.random(),
      name: "Nuova Spesa",
      metrics: [{ id: Math.random(), name: "Quantità base", value: 10 }],
      basePrice: 50,
      priceMult2: 1.1,
      priceMult3: 1.1,
      qtyMult2: 1.0,
      qtyMult3: 1.0,
    };

    set((state) => ({
      expenses: [...state.expenses, newExpense],
    }));

    return newExpense.id;
  },

  // Remove expense
  removeExpense: (id: number) => {
    set((state) => ({
      expenses: state.expenses.filter((e) => e.id !== id),
    }));
  },

  // Get expense by ID
  getExpenseById: (id: number) => {
    return get().expenses.find((e) => e.id === id);
  },

  // Update expense name
  updateExpenseName: (id: number, name: string) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, name } : e
      ),
    }));
  },

  // Update base price
  updateExpenseBasePrice: (id: number, price: number) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, basePrice: price } : e
      ),
    }));
  },

  // Update price multipliers
  updateExpensePriceMult2: (id: number, mult: number) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, priceMult2: mult } : e
      ),
    }));
  },

  updateExpensePriceMult3: (id: number, mult: number) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, priceMult3: mult } : e
      ),
    }));
  },

  // Update quantity multipliers
  updateExpenseQtyMult2: (id: number, mult: number) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, qtyMult2: mult } : e
      ),
    }));
  },

  updateExpenseQtyMult3: (id: number, mult: number) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === id ? { ...e, qtyMult3: mult } : e
      ),
    }));
  },

  // Add metric to expense
  addMetric: (expenseId: number) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === expenseId
          ? {
              ...e,
              metrics: [
                ...e.metrics,
                { id: Math.random(), name: "Nuova metrica", value: 1 },
              ],
            }
          : e
      ),
    }));
  },

  // Remove metric from expense
  removeMetric: (expenseId: number, metricId: number) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === expenseId
          ? {
              ...e,
              metrics: e.metrics.filter((m) => m.id !== metricId),
            }
          : e
      ),
    }));
  },

  // Update metric name
  updateMetricName: (expenseId: number, metricId: number, name: string) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === expenseId
          ? {
              ...e,
              metrics: e.metrics.map((m) =>
                m.id === metricId ? { ...m, name } : m
              ),
            }
          : e
      ),
    }));
  },

  // Update metric value
  updateMetricValue: (expenseId: number, metricId: number, value: number) => {
    set((state) => ({
      expenses: state.expenses.map((e) =>
        e.id === expenseId
          ? {
              ...e,
              metrics: e.metrics.map((m) =>
                m.id === metricId ? { ...m, value } : m
              ),
            }
          : e
      ),
    }));
  },
}));

