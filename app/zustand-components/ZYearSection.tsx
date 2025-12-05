"use client";

import { useState } from "react";
import { ExpenseData, ExpenseCalculator } from "../zustand-store/ExpenseModel";
import { useExpenseStore } from "../zustand-store/useExpenseStore";
import { ZMetricItem } from "./ZMetricItem";

export const ZYearSection = ({ 
  expense, 
  year 
}: { 
  expense: ExpenseData;
  year: 1 | 2 | 3;
}) => {
  const [isOpen, setIsOpen] = useState(year === 1);
  const {
    updateExpenseBasePrice,
    updateExpensePriceMult2,
    updateExpensePriceMult3,
    updateExpenseQtyMult2,
    updateExpenseQtyMult3,
    addMetric,
  } = useExpenseStore();

  const toggleOpen = () => setIsOpen(!isOpen);

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
                  onClick={() => addMetric(expense.id)}
                  className="px-3 py-1 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-1"
                >
                  <span>+</span>
                  <span>Aggiungi</span>
                </button>
              </div>
              
              <div className="space-y-2">
                {expense.metrics.map((metric) => (
                  <ZMetricItem key={metric.id} expense={expense} metric={metric} />
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
                    Calcolo: {expense.metrics.map(m => m.value).join(' × ')} = <strong>{ExpenseCalculator.getQtyYear1(expense).toLocaleString('it-IT')}</strong>
                  </div>
                </div>
              )}
            </div>

            {/* Prezzo e Quantità */}
            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Prezzo unitario</label>
                <input
                  type="number"
                  step="0.01"
                  value={expense.basePrice}
                  onChange={(e) => updateExpenseBasePrice(expense.id, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                  Quantità
                  <span className="text-xs text-gray-500 italic">(calcolato)</span>
                </label>
                <div className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg border border-gray-200 font-medium">
                  {ExpenseCalculator.getQtyYear1(expense).toFixed(0)}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  if (year === 2) {
    const prevPrice = ExpenseCalculator.getPriceYear1(expense);
    const prevQty = ExpenseCalculator.getQtyYear1(expense);
    const currentPrice = ExpenseCalculator.getPriceYear2(expense);
    const currentQty = ExpenseCalculator.getQtyYear2(expense);
    
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
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Prezzo unitario</label>
                  <input
                    type="number"
                    step="0.01"
                    value={currentPrice.toFixed(2)}
                    onChange={(e) => {
                      const newPrice = Number(e.target.value);
                      if (prevPrice !== 0) {
                        updateExpensePriceMult2(expense.id, newPrice / prevPrice);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Moltiplicatore (YoY)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={expense.priceMult2.toFixed(2)}
                    onChange={(e) => updateExpensePriceMult2(expense.id, Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                  />
                </div>
              </div>
              
              {/* Colonna Quantità */}
              <div className="space-y-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Quantità</label>
                  <input
                    type="number"
                    step="1"
                    value={currentQty.toFixed(0)}
                    onChange={(e) => {
                      const newQty = Number(e.target.value);
                      if (prevQty !== 0) {
                        updateExpenseQtyMult2(expense.id, newQty / prevQty);
                      }
                    }}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium text-gray-700">Moltiplicatore (YoY)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={expense.qtyMult2.toFixed(2)}
                    onChange={(e) => updateExpenseQtyMult2(expense.id, Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // year === 3
  const prevPrice = ExpenseCalculator.getPriceYear2(expense);
  const prevQty = ExpenseCalculator.getQtyYear2(expense);
  const currentPrice = ExpenseCalculator.getPriceYear3(expense);
  const currentQty = ExpenseCalculator.getQtyYear3(expense);
  
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
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Prezzo unitario</label>
                <input
                  type="number"
                  step="0.01"
                  value={currentPrice.toFixed(2)}
                  onChange={(e) => {
                    const newPrice = Number(e.target.value);
                    if (prevPrice !== 0) {
                      updateExpensePriceMult3(expense.id, newPrice / prevPrice);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Moltiplicatore (YoY)</label>
                <input
                  type="number"
                  step="0.01"
                  value={expense.priceMult3.toFixed(2)}
                  onChange={(e) => updateExpensePriceMult3(expense.id, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                />
              </div>
            </div>
            
            {/* Colonna Quantità */}
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Quantità</label>
                <input
                  type="number"
                  step="1"
                  value={currentQty.toFixed(0)}
                  onChange={(e) => {
                    const newQty = Number(e.target.value);
                    if (prevQty !== 0) {
                      updateExpenseQtyMult3(expense.id, newQty / prevQty);
                    }
                  }}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                />
              </div>
              <div className="space-y-1">
                <label className="text-sm font-medium text-gray-700">Moltiplicatore (YoY)</label>
                <input
                  type="number"
                  step="0.01"
                  value={expense.qtyMult3.toFixed(2)}
                  onChange={(e) => updateExpenseQtyMult3(expense.id, Number(e.target.value))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

