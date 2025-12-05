"use client"

import { observer } from "mobx-react-lite"
import { Expense } from "../store/Expense"
import { formatCurrency } from "../utils/formatters"

export const ExpenseListItem = observer(({ 
  expense, 
  isSelected, 
  onClick 
}: { 
  expense: Expense
  isSelected: boolean
  onClick: () => void
}) => {
  return (
    <div
      onClick={onClick}
      className={`
        rounded-lg cursor-pointer transition-all overflow-hidden
        ${isSelected 
          ? 'ring-2 ring-green-600 shadow-md' 
          : 'border border-gray-200 hover:border-green-300 hover:shadow-sm'
        }
      `}
    >
      {/* Header Row */}
      <div className="grid grid-cols-4 gap-4 bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-600 border-b border-gray-200">
        <div>Prodotto</div>
        <div className="text-center">Anno 1</div>
        <div className="text-center">Anno 2</div>
        <div className="text-center">Anno 3</div>
      </div>
      
      {/* Data Row */}
      <div className="grid grid-cols-4 gap-4 bg-white px-4 py-3 items-center">
        <div className="font-medium text-gray-900 text-sm">{expense.name}</div>
        <div className="text-center text-sm text-gray-900 font-medium">
          {formatCurrency(expense.totalYear1)}
        </div>
        <div className="text-center text-sm text-gray-900 font-medium">
          {formatCurrency(expense.totalYear2)}
        </div>
        <div className="text-center text-sm text-gray-900 font-medium">
          {formatCurrency(expense.totalYear3)}
        </div>
      </div>
    </div>
  )
})
