// Zustand Store - Expense Model e Store

export interface Metric {
  id: number;
  name: string;
  value: number;
}

export interface ExpenseData {
  id: number;
  name: string;
  metrics: Metric[];
  basePrice: number;
  priceMult2: number;
  priceMult3: number;
  qtyMult2: number;
  qtyMult3: number;
}

// Helper per calcoli (non reattivi, calcolati on-demand)
export class ExpenseCalculator {
  static getPriceYear1(expense: ExpenseData): number {
    return expense.basePrice;
  }

  static getPriceYear2(expense: ExpenseData): number {
    return ExpenseCalculator.getPriceYear1(expense) * expense.priceMult2;
  }

  static getPriceYear3(expense: ExpenseData): number {
    return ExpenseCalculator.getPriceYear2(expense) * expense.priceMult3;
  }

  static getQtyYear1(expense: ExpenseData): number {
    if (!Array.isArray(expense.metrics) || expense.metrics.length === 0)
      return 0;
    return expense.metrics.reduce((acc, metric) => acc * metric.value, 1);
  }

  static getQtyYear2(expense: ExpenseData): number {
    return ExpenseCalculator.getQtyYear1(expense) * expense.qtyMult2;
  }

  static getQtyYear3(expense: ExpenseData): number {
    return ExpenseCalculator.getQtyYear2(expense) * expense.qtyMult3;
  }

  static getTotalYear1(expense: ExpenseData): number {
    return (
      ExpenseCalculator.getPriceYear1(expense) *
      ExpenseCalculator.getQtyYear1(expense)
    );
  }

  static getTotalYear2(expense: ExpenseData): number {
    return (
      ExpenseCalculator.getPriceYear2(expense) *
      ExpenseCalculator.getQtyYear2(expense)
    );
  }

  static getTotalYear3(expense: ExpenseData): number {
    return (
      ExpenseCalculator.getPriceYear3(expense) *
      ExpenseCalculator.getQtyYear3(expense)
    );
  }

  static toJSON(expense: ExpenseData) {
    return {
      id: expense.id,
      name: expense.name,
      metrics: expense.metrics,
      basePrice: expense.basePrice,
      priceMult2: expense.priceMult2,
      priceMult3: expense.priceMult3,
      qtyMult2: expense.qtyMult2,
      qtyMult3: expense.qtyMult3,
    };
  }
}
