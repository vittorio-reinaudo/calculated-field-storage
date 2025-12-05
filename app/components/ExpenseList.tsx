"use client"

import { observer } from "mobx-react-lite"
import { expenseStore } from "../store/ExpenseStore"
import { ExpenseListItem } from "./ExpenseListItem"

export const ExpenseList = observer(({ 
  selectedExpenseId, 
  onSelectExpense 
}: { 
  selectedExpenseId: number | null
  onSelectExpense: (id: number) => void
}) => {
  const handleAddExpense = () => {
    const newId = expenseStore.addExpense()
    onSelectExpense(newId)
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Obiettivi di vendita</h2>
        <button
          onClick={handleAddExpense}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <span>+</span>
          <span>Aggiungi nuovo</span>
        </button>
      </div>
      <div className="space-y-3">
        {expenseStore.expenses.map((expense) => (
          <ExpenseListItem
            key={expense.id}
            expense={expense}
            isSelected={selectedExpenseId === expense.id}
            onClick={() => onSelectExpense(expense.id)}
          />
        ))}
      </div>
    </div>
  )
})
