"use client"

import { observer } from "mobx-react-lite"
import { expenseStore } from "../store/ExpenseStore"
import { formatCurrency } from "../utils/formatters"

export const GrandTotals = observer(() => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Ricavi totali</h2>
        <button className="text-green-600 border border-green-600 rounded-full px-3 py-1 text-xs font-medium hover:bg-green-50 transition-colors flex items-center gap-1">
          <span className="text-sm">ⓘ</span>
          <span>Spiegazione</span>
        </button>
      </div>
      
      {/* Header Row */}
      <div className="grid grid-cols-3 gap-4 bg-green-700 text-white px-4 py-3 rounded-t-lg font-semibold text-sm">
        <div>Anno 1</div>
        <div>Anno 2</div>
        <div>Anno 3</div>
      </div>
      
      {/* Values Row */}
      <div className="grid grid-cols-3 gap-4 bg-white border-x border-b border-gray-200 px-4 py-4 rounded-b-lg">
        <div className="text-gray-900 font-semibold text-base">
          {formatCurrency(expenseStore.grandTotalYear1)}
        </div>
        <div className="text-gray-900 font-semibold text-base">
          {formatCurrency(expenseStore.grandTotalYear2)}
        </div>
        <div className="text-gray-900 font-semibold text-base">
          {formatCurrency(expenseStore.grandTotalYear3)}
        </div>
      </div>
    </div>
  )
})
