"use client";

import { useExpenseStore } from "../zustand-store/useExpenseStore";
import { ZExpenseListItem } from "./ZExpenseListItem";

export const ZExpenseList = ({ 
  selectedExpenseId, 
  onSelectExpense 
}: { 
  selectedExpenseId: number | null;
  onSelectExpense: (id: number) => void;
}) => {
  const { expenses, addExpense } = useExpenseStore();

  const handleAddExpense = () => {
    const newId = addExpense();
    onSelectExpense(newId);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4 pb-3 border-b-2 border-black">
        <h2 className="text-xl font-bold text-black uppercase">Spese</h2>
        <button
          onClick={handleAddExpense}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium flex items-center gap-2"
        >
          <span>+</span>
          <span>Aggiungi nuovo</span>
        </button>
      </div>
      <div className="space-y-3">
        {expenses.map((expense) => (
          <ZExpenseListItem
            key={expense.id}
            expense={expense}
            isSelected={selectedExpenseId === expense.id}
            onClick={() => onSelectExpense(expense.id)}
          />
        ))}
      </div>
    </div>
  );
};

