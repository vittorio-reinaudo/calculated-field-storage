"use client"

import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Expense, Metric } from "../store/Expense"
import { deleteMetric } from "../api/expenses"

export const MetricItem = observer(({ 
  expense,
  metric
}: { 
  expense: Expense
  metric: Metric
}) => {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async () => {
    if (!confirm(`Eliminare la metrica "${metric.name}"?`)) {
      return
    }

    setIsDeleting(true)

    try {
      const result = await deleteMetric(expense.id, metric.id)
      
      if (result.success) {
        expense.removeMetric(metric.id)
      } else {
        alert('Errore durante l\'eliminazione')
      }
    } catch (error) {
      console.error('Delete metric error:', error)
      alert('Errore di connessione')
    } finally {
      setIsDeleting(false)
    }
  }

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
          onChange={(e) => expense.updateMetricName(metric.id, e.target.value)}
          placeholder="Nome metrica"
          className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm text-gray-900"
        />
        <input
          type="number"
          value={metric.value}
          onChange={(e) => expense.updateMetricValue(metric.id, Number(e.target.value))}
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
  )
})
