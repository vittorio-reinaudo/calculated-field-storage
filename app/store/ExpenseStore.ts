import { makeAutoObservable } from "mobx"
import { Expense } from "./Expense"

export class ExpenseStore {
  expenses: Expense[] = []

  constructor() {
    makeAutoObservable(this)
    
    // TODO: chiamata API per ottenere le spese
    this.expenses = [
      new Expense({
        name: "Servizio lunghissimissimo",
        metrics: [
          { id: 1, name: "Sedute", value: 64 },
          { id: 2, name: "Turni", value: 8 },
          { id: 3, name: "Giorni di apertura", value: 100 }
        ],
        basePrice: 10,
        priceMult2: 1.1,
        priceMult3: 1.1,
        qtyMult2: 1.15,
        qtyMult3: 1.15,
      }),
      new Expense({
        name: "Licenze Software",
        metrics: [
          { id: 4, name: "Utenti", value: 50 },
          { id: 5, name: "Postazioni", value: 10 }
        ],
        basePrice: 20,
        priceMult2: 1.05,
        priceMult3: 1.05,
        qtyMult2: 1.0,
        qtyMult3: 1.2,
      }),
      new Expense({
        name: "Supporto Tecnico",
        metrics: [
          { id: 6, name: "Ore mensili", value: 12 },
          { id: 7, name: "Mesi", value: 12 }
        ],
        basePrice: 150,
        priceMult2: 1.08,
        priceMult3: 1.08,
        qtyMult2: 1.0,
        qtyMult3: 1.0,
      }),
    ]
  }

  get grandTotalYear1() {
    return this.expenses.reduce((sum, e) => sum + e.totalYear1, 0)
  }

  get grandTotalYear2() {
    return this.expenses.reduce((sum, e) => sum + e.totalYear2, 0)
  }

  get grandTotalYear3() {
    return this.expenses.reduce((sum, e) => sum + e.totalYear3, 0)
  }

  // Actions
  addExpense() {
    // TODO: aggiungere i default per una nuova spesa
    const newExpense = new Expense({
      name: "Nuova Spesa",
      metrics: [
        { id: Math.random(), name: "Quantità base", value: 10 }
      ],
      basePrice: 50,
      priceMult2: 1.1,
      priceMult3: 1.1,
      qtyMult2: 1.0,
      qtyMult3: 1.0,
    })
    this.expenses.push(newExpense)
    return newExpense.id
  }

  removeExpense(id: number) {
    this.expenses = this.expenses.filter((e) => e.id !== id)
  }

  getExpenseById(id: number) {
    return this.expenses.find((e) => e.id === id)
  }
}

// Singleton store instance
export const expenseStore = new ExpenseStore()
