"use client";

import { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { expenseStore } from "../store/ExpenseStore";
import { ExpenseList } from "../components/ExpenseList";
import { GrandTotals } from "../components/GrandTotals";
import { ExpenseDetailPanel } from "../components/ExpenseDetailPanel";

const MobXFinancialPlanningPage = observer(() => {
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(
    null
  );

  useEffect(() => {
    // Carica le spese all'avvio
    expenseStore.loadExpenses();
  }, []);

  if (expenseStore.isLoading) {
    return (
      <div className="min-h-screen bg-[#e8f0e8] flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin text-6xl mb-4">⏳</div>
          <h2 className="text-2xl font-bold text-gray-900">
            Caricamento in corso...
          </h2>
          <p className="text-gray-600 mt-2">
            Recupero delle spese dal server
          </p>
        </div>
      </div>
    );
  }

  if (expenseStore.error) {
    return (
      <div className="min-h-screen bg-[#e8f0e8] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border-2 border-red-300">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Errore di caricamento
          </h2>
          <p className="text-gray-700 mb-4">{expenseStore.error}</p>
          <button
            onClick={() => expenseStore.loadExpenses()}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
          >
            Riprova
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#e8f0e8]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 py-4 px-8">
        <div className="max-w-[1600px] mx-auto">
          <h1 className="text-3xl font-bold text-gray-900">
            📊 Financial Planning Dashboard (MobX)
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Implementazione con MobX reactive state management
          </p>
        </div>
      </header>

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
  );
});

export default MobXFinancialPlanningPage;

