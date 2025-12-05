"use client"

import { useState } from "react"
import { ExpenseList } from "./components/ExpenseList"
import { GrandTotals } from "./components/GrandTotals"
import { ExpenseDetailPanel } from "./components/ExpenseDetailPanel"

export default function FinancialPlanningDashboard() {
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-[#e8f0e8]">
      {/* Main Content - Two Columns */}
      <main className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px] mx-auto">
          {/* Colonna Sinistra */}
          <div className="space-y-6">
            <ExpenseList
              selectedExpenseId={selectedExpenseId}
              onSelectExpense={setSelectedExpenseId}
            />
            <GrandTotals />
          </div>

          {/* Colonna Destra */}
          <div>
            <ExpenseDetailPanel
              expenseId={selectedExpenseId}
              onDeselect={() => setSelectedExpenseId(null)}
            />
          </div>
        </div>
      </main>
    </div>
  )
}
