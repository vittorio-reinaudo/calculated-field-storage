// API Placeholder functions per le chiamate al backend

export interface ExpenseData {
  id: number;
  name: string;
  metrics: Array<{ id: number; name: string; value: number }>;
  basePrice: number;
  priceMult2: number;
  priceMult3: number;
  qtyMult2: number;
  qtyMult3: number;
}

/**
 * Recupera tutte le spese dal backend
 */
export async function fetchExpenses(): Promise<{
  success: boolean;
  data: ExpenseData[];
  message?: string;
}> {
  // Simula una chiamata API con delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  console.log("API CALL: Fetching all expenses");

  // TODO: Implementare chiamata reale al backend
  // const response = await fetch('/api/expenses', {
  //   method: 'GET',
  //   headers: { 'Content-Type': 'application/json' }
  // })
  // return await response.json()

  // Mock data iniziali
  const mockData: ExpenseData[] = [
    {
      id: 1,
      name: "Servizio lunghissimissimo",
      metrics: [
        { id: 1, name: "Sedute", value: 64 },
        { id: 2, name: "Turni", value: 8 },
        { id: 3, name: "Giorni di apertura", value: 100 },
      ],
      basePrice: 10,
      priceMult2: 1.1,
      priceMult3: 1.1,
      qtyMult2: 1.15,
      qtyMult3: 1.15,
    },
    {
      id: 2,
      name: "Licenze Software",
      metrics: [
        { id: 4, name: "Utenti", value: 50 },
        { id: 5, name: "Postazioni", value: 10 },
      ],
      basePrice: 20,
      priceMult2: 1.05,
      priceMult3: 1.05,
      qtyMult2: 1.0,
      qtyMult3: 1.2,
    },
    {
      id: 3,
      name: "Supporto Tecnico",
      metrics: [
        { id: 6, name: "Ore mensili", value: 12 },
        { id: 7, name: "Mesi", value: 12 },
      ],
      basePrice: 150,
      priceMult2: 1.08,
      priceMult3: 1.08,
      qtyMult2: 1.0,
      qtyMult3: 1.0,
    },
  ];

  return {
    success: true,
    data: mockData,
  };
}

/**
 * Salva/Aggiorna una spesa con tutte le sue metriche
 */
export async function saveExpense(
  expense: ExpenseData
): Promise<{ success: boolean; message: string }> {
  // Simula una chiamata API con delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  console.log("API CALL: Saving expense", expense);

  // TODO: Implementare chiamata reale al backend
  // const response = await fetch('/api/expenses', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(expense)
  // })
  // return await response.json()

  return {
    success: true,
    message: "Spesa salvata con successo",
  };
}

/**
 * Elimina una spesa
 */
export async function deleteExpense(
  expenseId: number
): Promise<{ success: boolean; message: string }> {
  // Simula una chiamata API con delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  console.log("API CALL: Deleting expense", expenseId);

  // TODO: Implementare chiamata reale al backend
  // const response = await fetch(`/api/expenses/${expenseId}`, {
  //   method: 'DELETE'
  // })
  // return await response.json()

  return {
    success: true,
    message: "Spesa eliminata con successo",
  };
}

/**
 * Elimina una metrica da una spesa
 */
export async function deleteMetric(
  expenseId: number,
  metricId: number
): Promise<{ success: boolean; message: string }> {
  // Simula una chiamata API con delay
  await new Promise((resolve) => setTimeout(resolve, 300));

  console.log("API CALL: Deleting metric", { expenseId, metricId });

  // TODO: Implementare chiamata reale al backend
  // const response = await fetch(`/api/expenses/${expenseId}/metrics/${metricId}`, {
  //   method: 'DELETE'
  // })
  // return await response.json()

  return {
    success: true,
    message: "Metrica eliminata con successo",
  };
}
