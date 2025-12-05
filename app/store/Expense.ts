import { makeAutoObservable } from "mobx";

export interface Metric {
  id: number;
  name: string;
  value: number;
}

export class Expense {
  id = Math.random();
  name = "";
  metrics: Metric[] = [];
  basePrice = 0;
  priceMult2 = 1.1;
  priceMult3 = 1.1;
  qtyMult2 = 1.0;
  qtyMult3 = 1.0;

  constructor(data?: Partial<Expense>) {
    makeAutoObservable(this);
    if (data) {
      // Handle metrics separately to ensure it's an array
      if (data.metrics) {
        this.metrics = [...data.metrics];
        delete data.metrics;
      }
      Object.assign(this, data);
    }
  }

  // Actions per gestire le metriche
  // TODO: aggiungere i default per una nuova metrica
  addMetric() {
    this.metrics.push({
      id: Math.random(),
      name: "Nuova metrica",
      value: 1,
    });
  }

  removeMetric(id: number) {
    this.metrics = this.metrics.filter((m) => m.id !== id);
  }

  updateMetricName(id: number, name: string) {
    const metric = this.metrics.find((m) => m.id === id);
    if (metric) metric.name = name;
  }

  updateMetricValue(id: number, value: number) {
    const metric = this.metrics.find((m) => m.id === id);
    if (metric) metric.value = value;
  }

  // Serializza l'expense per l'API
  toJSON() {
    return {
      id: this.id,
      name: this.name,
      metrics: this.metrics,
      basePrice: this.basePrice,
      priceMult2: this.priceMult2,
      priceMult3: this.priceMult3,
      qtyMult2: this.qtyMult2,
      qtyMult3: this.qtyMult3,
    };
  }

  get priceYear1() {
    return this.basePrice;
  }

  get priceYear2() {
    return this.priceYear1 * this.priceMult2;
  }

  get priceYear3() {
    return this.priceYear2 * this.priceMult3;
  }

  // La quantità dell'anno 1 è la moltiplicazione di tutte le metriche
  get qtyYear1() {
    if (!Array.isArray(this.metrics) || this.metrics.length === 0) return 0;
    return this.metrics.reduce((acc, metric) => acc * metric.value, 1);
  }

  get qtyYear2() {
    return this.qtyYear1 * this.qtyMult2;
  }

  get qtyYear3() {
    return this.qtyYear2 * this.qtyMult3;
  }

  // Livello 2: Totali per spesa per anno (computed)
  get totalYear1() {
    return this.priceYear1 * this.qtyYear1;
  }

  get totalYear2() {
    return this.priceYear2 * this.qtyYear2;
  }

  get totalYear3() {
    return this.priceYear3 * this.qtyYear3;
  }
}
