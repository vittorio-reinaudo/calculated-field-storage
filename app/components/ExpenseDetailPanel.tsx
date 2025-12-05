"use client"

import { observer } from "mobx-react-lite"
import { useState } from "react"
import { expenseStore } from "../store/ExpenseStore"
import { YearSection } from "./YearSection"
import { saveExpense, deleteExpense } from "../api/expenses"

export const ExpenseDetailPanel = observer(({ 
  expenseId,
  onDeselect
}: { 
  expenseId: number | null
  onDeselect: () => void
}) => {
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null)

  if (!expenseId) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 flex flex-col items-center justify-center min-h-[600px] border border-gray-200">
        <div className="text-center">
          <div className="text-6xl mb-4">📊</div>
          <h3 className="text-2xl font-semibold text-gray-400 mb-2">
            Nessuna spesa selezionata
          </h3>
          <p className="text-gray-400">
            Seleziona una spesa dalla lista per vedere i dettagli
          </p>
        </div>
      </div>
    )
  }

  const expense = expenseStore.getExpenseById(expenseId)
  
  if (!expense) {
    return (
      <div className="bg-white rounded-xl shadow-md p-12 border border-gray-200">
        <p className="text-red-600 font-bold">Spesa non trovata</p>
      </div>
    )
  }

  const handleSave = async () => {
    setIsSaving(true)
    setSaveMessage(null)
    
    try {
      const result = await saveExpense(expense.toJSON())
      
      if (result.success) {
        setSaveMessage({ type: 'success', text: result.message })
        setTimeout(() => setSaveMessage(null), 3000)
      } else {
        setSaveMessage({ type: 'error', text: 'Errore durante il salvataggio' })
      }
    } catch (error) {
      console.error('Save error:', error)
      setSaveMessage({ type: 'error', text: 'Errore di connessione' })
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!confirm(`Sei sicuro di voler eliminare "${expense.name}"?`)) {
      return
    }

    try {
      const result = await deleteExpense(expense.id)
      
      if (result.success) {
        expenseStore.removeExpense(expense.id)
        onDeselect()
      } else {
        alert('Errore durante l\'eliminazione')
      }
    } catch (error) {
      console.error('Delete error:', error)
      alert('Errore di connessione')
    }
  }

  return (
    <div className="bg-white rounded-xl shadow-md border border-gray-200">
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-1">Metriche</h2>
            <input
              type="text"
              value={expense.name}
              onChange={(e) => expense.name = e.target.value}
              className="text-lg font-semibold text-gray-700 border-2 border-transparent hover:border-gray-300 focus:border-green-500 focus:outline-none px-2 py-1 rounded w-full"
              placeholder="Nome spesa"
            />
          </div>
          <button
            onClick={handleDelete}
            className="ml-4 px-4 py-2 text-red-600 hover:text-red-700 transition-colors font-medium text-sm"
          >
            🗑️ Elimina
          </button>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 items-center">
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`
              px-6 py-2 rounded-lg font-semibold text-white transition-all
              ${isSaving 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 shadow-md hover:shadow-lg'
              }
            `}
          >
            {isSaving ? (
              <span className="flex items-center gap-2">
                <span className="animate-spin">⏳</span>
                Salvataggio...
              </span>
            ) : (
              'Conferma'
            )}
          </button>

          {/* Save Message */}
          {saveMessage && (
            <div className={`
              px-4 py-2 rounded-lg text-sm font-medium animate-fade-in
              ${saveMessage.type === 'success' 
                ? 'bg-green-100 text-green-800 border border-green-300' 
                : 'bg-red-100 text-red-800 border border-red-300'
              }
            `}>
              {saveMessage.type === 'success' ? '✓' : '✗'} {saveMessage.text}
            </div>
          )}
        </div>
      </div>

      {/* Year Sections */}
      <div className="p-6 max-h-[calc(100vh-250px)] overflow-y-auto">
        <YearSection expense={expense} year={1} />
        <YearSection expense={expense} year={2} />
        <YearSection expense={expense} year={3} />
      </div>
    </div>
  )
})
