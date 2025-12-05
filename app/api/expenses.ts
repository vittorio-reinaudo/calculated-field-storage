// API Placeholder functions per le chiamate al backend

export interface ExpenseData {
  id: number
  name: string
  metrics: Array<{ id: number; name: string; value: number }>
  basePrice: number
  priceMult2: number
  priceMult3: number
  qtyMult2: number
  qtyMult3: number
}

/**
 * Salva/Aggiorna una spesa con tutte le sue metriche
 */
export async function saveExpense(expense: ExpenseData): Promise<{ success: boolean; message: string }> {
  // Simula una chiamata API con delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  console.log('API CALL: Saving expense', expense)
  
  // TODO: Implementare chiamata reale al backend
  // const response = await fetch('/api/expenses', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(expense)
  // })
  // return await response.json()
  
  return {
    success: true,
    message: 'Spesa salvata con successo'
  }
}

/**
 * Elimina una spesa
 */
export async function deleteExpense(expenseId: number): Promise<{ success: boolean; message: string }> {
  // Simula una chiamata API con delay
  await new Promise(resolve => setTimeout(resolve, 500))
  
  console.log('API CALL: Deleting expense', expenseId)
  
  // TODO: Implementare chiamata reale al backend
  // const response = await fetch(`/api/expenses/${expenseId}`, {
  //   method: 'DELETE'
  // })
  // return await response.json()
  
  return {
    success: true,
    message: 'Spesa eliminata con successo'
  }
}

/**
 * Elimina una metrica da una spesa
 */
export async function deleteMetric(
  expenseId: number, 
  metricId: number
): Promise<{ success: boolean; message: string }> {
  // Simula una chiamata API con delay
  await new Promise(resolve => setTimeout(resolve, 300))
  
  console.log('API CALL: Deleting metric', { expenseId, metricId })
  
  // TODO: Implementare chiamata reale al backend
  // const response = await fetch(`/api/expenses/${expenseId}/metrics/${metricId}`, {
  //   method: 'DELETE'
  // })
  // return await response.json()
  
  return {
    success: true,
    message: 'Metrica eliminata con successo'
  }
}

