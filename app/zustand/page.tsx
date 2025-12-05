"use client";

import { useEffect, useState } from "react";
import { useExpenseStore } from "../zustand-store/useExpenseStore";
import { ZExpenseList } from "../zustand-components/ZExpenseList";
import { ZGrandTotals } from "../zustand-components/ZGrandTotals";
import { ZExpenseDetailPanel } from "../zustand-components/ZExpenseDetailPanel";

export default function ZustandFinancialPlanningPage() {
  const [selectedExpenseId, setSelectedExpenseId] = useState<number | null>(null);
  const { isLoading, error, loadExpenses } = useExpenseStore();

  useEffect(() => {
    // Carica le spese all'avvio
    loadExpenses();
  }, [loadExpenses]);

  if (isLoading) {
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

  if (error) {
    return (
      <div className="min-h-screen bg-[#e8f0e8] flex items-center justify-center">
        <div className="text-center bg-white p-8 rounded-xl shadow-lg border-2 border-red-300">
          <div className="text-6xl mb-4">❌</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Errore di caricamento
          </h2>
          <p className="text-gray-700 mb-4">{error}</p>
          <button
            onClick={() => loadExpenses()}
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
            📊 Financial Planning Dashboard (Zustand)
          </h1>
          <p className="text-gray-600 text-sm mt-1">
            Implementazione con Zustand state management
          </p>
        </div>
      </header>

      {/* Main Content - Two Columns */}
      <main className="p-6 lg:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-[1600px] mx-auto">
          {/* Colonna Sinistra */}
          <div className="space-y-6">
            <ZExpenseList
              selectedExpenseId={selectedExpenseId}
              onSelectExpense={setSelectedExpenseId}
            />
            <ZGrandTotals />
          </div>

          {/* Colonna Destra */}
          <div>
            <ZExpenseDetailPanel
              expenseId={selectedExpenseId}
              onDeselect={() => setSelectedExpenseId(null)}
            />
          </div>
        </div>
      </main>
    </div>
  );
}

