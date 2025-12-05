"use client";

import { useState } from "react";
import { ExpenseData, Metric } from "../zustand-store/ExpenseModel";
import { useExpenseStore } from "../zustand-store/useExpenseStore";
import { deleteMetric } from "../api/expenses";

export const ZMetricItem = ({ 
  expense,
  metric
}: { 
  expense: ExpenseData;
  metric: Metric;
}) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { updateMetricName, updateMetricValue, removeMetric } = useExpenseStore();

  const handleDelete = async () => {
    if (!confirm(`Eliminare la metrica "${metric.name}"?`)) {
      return;
    }

    setIsDeleting(true);

    try {
      const result = await deleteMetric(expense.id, metric.id);
      
      if (result.success) {
        removeMetric(expense.id, metric.id);
      } else {
        alert("Errore durante l'eliminazione");
      }
    } catch (error) {
      console.error("Delete metric error:", error);
      alert("Errore di connessione");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={`
      flex items-center gap-3 p-3 bg-white rounded-lg border border-gray-200 
      hover:border-gray-300 transition-all
      ${isDeleting ? 'opacity-50 pointer-events-none' : ''}
    `}>
      <div className="flex-1 grid grid-cols-2 gap-3">
        <input
          type="text"
          value={metric.name}
          onChange={(e) => updateMetricName(expense.id, metric.id, e.target.value)}
          placeholder="Nome metrica"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-900"
        />
        <input
          type="number"
          value={metric.value}
          onChange={(e) => updateMetricValue(expense.id, metric.id, Number(e.target.value))}
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-900"
        />
      </div>
      <button
        onClick={handleDelete}
        disabled={isDeleting}
        className={`
          p-2 transition-colors
          ${isDeleting 
            ? 'text-gray-400 cursor-not-allowed' 
            : 'text-red-500 hover:text-red-700'
          }
        `}
        title="Rimuovi metrica"
      >
        {isDeleting ? '⏳' : '🗑️'}
      </button>
    </div>
  );
};

