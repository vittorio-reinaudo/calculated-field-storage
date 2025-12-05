import { makeAutoObservable, runInAction } from "mobx";
import { Expense } from "./Expense";
import { fetchExpenses } from "../api/expenses";

export class ExpenseStore {
  expenses: Expense[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  // Carica le spese dall'API
  async loadExpenses() {
    this.isLoading = true;
    this.error = null;

    try {
      const result = await fetchExpenses();

      runInAction(() => {
        if (result.success && result.data) {
          this.expenses = result.data.map((data) => new Expense(data));
        } else {
          this.error = result.message || "Errore nel caricamento delle spese";
        }
        this.isLoading = false;
      });
    } catch (error) {
      runInAction(() => {
        this.error = "Errore di connessione al server";
        this.isLoading = false;
        console.error("Load expenses error:", error);
      });
    }
  }

  // Livello 3: Totali generali (computed globali)
  get grandTotalYear1() {
    return this.expenses.reduce((sum, e) => sum + e.totalYear1, 0);
  }

  get grandTotalYear2() {
    return this.expenses.reduce((sum, e) => sum + e.totalYear2, 0);
  }

  get grandTotalYear3() {
    return this.expenses.reduce((sum, e) => sum + e.totalYear3, 0);
  }

  // Actions
  addExpense() {
    const newExpense = new Expense({
      name: "Nuova Spesa",
      metrics: [{ id: Math.random(), name: "Quantità base", value: 10 }],
      basePrice: 50,
      priceMult2: 1.1,
      priceMult3: 1.1,
      qtyMult2: 1.0,
      qtyMult3: 1.0,
    });
    this.expenses.push(newExpense);
    return newExpense.id;
  }

  removeExpense(id: number) {
    this.expenses = this.expenses.filter((e) => e.id !== id);
  }

  getExpenseById(id: number) {
    return this.expenses.find((e) => e.id === id);
  }
}

// Singleton store instance
export const expenseStore = new ExpenseStore();
