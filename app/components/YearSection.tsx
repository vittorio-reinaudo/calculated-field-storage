"use client"

import { observer } from "mobx-react-lite"
import { useState } from "react"
import { Expense } from "../store/Expense"
import { EditableField } from "./EditableField"
import { ComputedField } from "./ComputedField"
import { MetricItem } from "./MetricItem"

export const YearSection = observer(({ 
  expense, 
  year 
}: { 
  expense: Expense
  year: 1 | 2 | 3
}) => {
  const [isOpen, setIsOpen] = useState(year === 1)

  const toggleOpen = () => setIsOpen(!isOpen)

  if (year === 1) {
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
        {/* Header */}
        <button
          onClick={toggleOpen}
          className="w-full bg-green-200 hover:bg-green-300 px-4 py-3 flex justify-between items-center transition-colors"
        >
          <span className="font-bold text-gray-900 text-lg">Anno 1</span>
          <span className="text-gray-700 text-xl">{isOpen ? '∧' : '∨'}</span>
        </button>
        
        {/* Content */}
        {isOpen && (
          <div className="bg-white p-6 space-y-6">
            {/* Metriche Section */}
            <div>
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase">Metriche</h3>
                <button
                  onClick={() => expense.addMetric()}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <span>+</span>
                  <span>Aggiungi</span>
                </button>
              </div>
              
              <div className="space-y-2">
                {expense.metrics.map((metric) => (
                  <MetricItem key={metric.id} expense={expense} metric={metric} />
                ))}
                
                {expense.metrics.length === 0 && (
                  <div className="text-center py-6 text-gray-400 text-sm">
                    Nessuna metrica. Clicca &quot;Aggiungi&quot; per iniziare.
                  </div>
                )}
              </div>
              
              {/* Info box about quantity calculation */}
              {expense.metrics.length > 0 && (
                <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="text-xs text-gray-700">
                    <span className="font-semibold">ℹ️ Quantità: </span>
                    Le quantità sono calcolate automaticamente dalle metriche sopra e non possono essere modificate.
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    Calcolo: {expense.metrics.map(m => m.value).join(' × ')} = <strong>{expense.qtyYear1.toLocaleString('it-IT')}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Prezzo e Quantità */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
              <EditableField
                label="Prezzo unitario"
                value={expense.basePrice}
                onChange={(val) => expense.basePrice = Number(val)}
              />
              <ComputedField
                label="Quantità"
                value={expense.qtyYear1}
              />
            </div>
          </div>
        )}
      </div>
    )
  }

  if (year === 2) {
    const prevPrice = expense.priceYear1
    const prevQty = expense.qtyYear1
    
    return (
      <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
        {/* Header */}
        <button
          onClick={toggleOpen}
          className="w-full bg-green-200 hover:bg-green-300 px-4 py-3 flex justify-between items-center transition-colors"
        >
          <span className="font-bold text-gray-900 text-lg">Anno 2</span>
          <span className="text-gray-700 text-xl">{isOpen ? '∧' : '∨'}</span>
        </button>
        
        {/* Content */}
        {isOpen && (
          <div className="bg-white p-6 space-y-4">
            {/* Info Text */}
            <div className="text-sm text-gray-700 mb-4">
              Il prezzo unitario dell&apos;Anno 1 è: <strong>{prevPrice.toFixed(2)}€</strong>
              <br />
              La quantità dell&apos;Anno 1 è: <strong>{prevQty.toLocaleString('it-IT')}</strong>.
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {/* Colonna Prezzo */}
              <div className="space-y-4">
                <EditableField
                  label="Prezzo unitario"
                  value={expense.priceYear2.toFixed(2)}
                  onChange={(val) => {
                    const newPrice = Number(val)
                    if (expense.priceYear1 !== 0) {
                      expense.priceMult2 = newPrice / expense.priceYear1
                    }
                  }}
                />
                <EditableField
                  label="Moltiplicatore (YoY)"
                  value={expense.priceMult2.toFixed(2)}
                  onChange={(val) => expense.priceMult2 = Number(val)}
                  info="I moltiplicatori mostrano come cambia un valore da un anno al successivo (YoY)"
                />
              </div>
              
              {/* Colonna Quantità */}
              <div className="space-y-4">
                <EditableField
                  label="Quantità"
                  value={expense.qtyYear2.toFixed(0)}
                  onChange={(val) => {
                    const newQty = Number(val)
                    if (expense.qtyYear1 !== 0) {
                      expense.qtyMult2 = newQty / expense.qtyYear1
                    }
                  }}
                />
                <EditableField
                  label="Moltiplicatore (YoY)"
                  value={expense.qtyMult2.toFixed(2)}
                  onChange={(val) => expense.qtyMult2 = Number(val)}
                  info="Se il moltiplicatore è maggiore di 1 significa crescita, se è minore di 1 indica una diminuzione"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  // year === 3
  const prevPrice = expense.priceYear2
  const prevQty = expense.qtyYear2
  
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden mb-3">
      {/* Header */}
      <button
        onClick={toggleOpen}
        className="w-full bg-green-200 hover:bg-green-300 px-4 py-3 flex justify-between items-center transition-colors"
      >
        <span className="font-bold text-gray-900 text-lg">Anno 3</span>
        <span className="text-gray-700 text-xl">{isOpen ? '∧' : '∨'}</span>
      </button>
      
      {/* Content */}
      {isOpen && (
        <div className="bg-white p-6 space-y-4">
          {/* Info Text */}
          <div className="text-sm text-gray-700 mb-4">
            Il prezzo unitario dell&apos;Anno 2 è: <strong>{prevPrice.toFixed(2)}€</strong>
            <br />
            La quantità dell&apos;Anno 2 è: <strong>{prevQty.toLocaleString('it-IT')}</strong>.
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {/* Colonna Prezzo */}
            <div className="space-y-4">
              <EditableField
                label="Prezzo unitario"
                value={expense.priceYear3.toFixed(2)}
                onChange={(val) => {
                  const newPrice = Number(val)
                  if (expense.priceYear2 !== 0) {
                    expense.priceMult3 = newPrice / expense.priceYear2
                  }
                }}
              />
              <EditableField
                label="Moltiplicatore (YoY)"
                value={expense.priceMult3.toFixed(2)}
                onChange={(val) => expense.priceMult3 = Number(val)}
                info="I moltiplicatori mostrano come cambia un valore da un anno al successivo (YoY)"
              />
            </div>
            
            {/* Colonna Quantità */}
            <div className="space-y-4">
              <EditableField
                label="Quantità"
                value={expense.qtyYear3.toFixed(0)}
                onChange={(val) => {
                  const newQty = Number(val)
                  if (expense.qtyYear2 !== 0) {
                    expense.qtyMult3 = newQty / expense.qtyYear2
                  }
                }}
              />
              <EditableField
                label="Moltiplicatore (YoY)"
                value={expense.qtyMult3.toFixed(2)}
                onChange={(val) => expense.qtyMult3 = Number(val)}
                info="Se il moltiplicatore è maggiore di 1 significa crescita, se è minore di 1 indica una diminuzione"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  )
})
