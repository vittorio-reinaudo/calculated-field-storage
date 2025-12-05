# 📊 Financial Planning Dashboard - MobX vs Zustand

Progetto comparativo che implementa lo stesso sistema di gestione spese multi-anno usando due diverse librerie di state management: **MobX** e **Zustand**.

## 🚀 Quick Start

```bash
# Installa dipendenze
pnpm install

# Avvia il server
pnpm dev

# Apri nel browser
http://localhost:3000
```

## 📁 Struttura Progetto

```
app/
├── page.tsx                    # Home con scelta tra MobX/Zustand
├── mobx/page.tsx              # Implementazione MobX
├── zustand/page.tsx           # Implementazione Zustand
│
├── store/                     # MobX Store
│   ├── Expense.ts            # Classe con makeAutoObservable
│   └── ExpenseStore.ts       # Store singleton
│
├── zustand-store/            # Zustand Store
│   ├── ExpenseModel.ts       # Plain interfaces + Calculator
│   └── useExpenseStore.ts    # Hook store
│
├── components/               # MobX Components (observer)
│   ├── ExpenseList.tsx
│   ├── ExpenseDetailPanel.tsx
│   ├── YearSection.tsx
│   └── ...
│
├── zustand-components/       # Zustand Components (hook-based)
│   ├── ZExpenseList.tsx
│   ├── ZExpenseDetailPanel.tsx
│   ├── ZYearSection.tsx
│   └── ...
│
├── api/                      # API Mock Services
│   └── expenses.ts
│
└── utils/                    # Utilities
    └── formatters.ts
```

## 🎯 Funzionalità

### Sistema di Gestione Spese Multi-Anno

- ✅ **Metriche Anno 1:** Nome + Valore (moltiplicazione automatica → quantità)
- ✅ **Anno 2 & 3:** Prezzo/Quantità sincronizzati con moltiplicatori YoY
- ✅ **Calcoli Nested:** 
  - Livello 1: Prezzi & Quantità per anno
  - Livello 2: Totali per spesa
  - Livello 3: Totali generali
- ✅ **CRUD Completo:** Aggiungi, Modifica, Elimina spese/metriche
- ✅ **API Integration:** Fetch, Save, Delete con mock delay
- ✅ **Loading & Error States**
- ✅ **UI Responsive:** Layout 2 colonne (master-detail)

## 🔵 MobX Implementation

### Route
```
http://localhost:3000/mobx
```

### Caratteristiche
- **OOP con Classi:** `class Expense` + `class ExpenseStore`
- **Reactive Programming:** `makeAutoObservable(this)`
- **Computed Values:** Getters automaticamente cached
- **Mutazioni Dirette:** `expense.basePrice = 100`
- **Observer Pattern:** `observer(() => ...)`
- **Re-rendering Granulare:** Automatico

### Code Example
```typescript
class Expense {
  basePrice = 0
  
  constructor() {
    makeAutoObservable(this)
  }
  
  get priceYear1() {
    return this.basePrice  // Auto-cached
  }
}

export const ExpenseList = observer(() => {
  return <div>{expenseStore.expenses.map(...)}</div>
})
```

## 🟢 Zustand Implementation

### Route
```
http://localhost:3000/zustand
```

### Caratteristiche
- **Plain Objects:** Interfaces + Helper functions
- **Hook-Based:** `useExpenseStore()`
- **Immutable Updates:** Spread operators
- **Computed On-Demand:** `ExpenseCalculator.getPriceYear1(expense)`
- **Selector Support:** Ottimizzazione manuale
- **Minimal Bundle:** ~1KB

### Code Example
```typescript
interface ExpenseData {
  basePrice: number
}

export const useExpenseStore = create((set, get) => ({
  expenses: [],
  updateBasePrice: (id, price) => {
    set(state => ({
      expenses: state.expenses.map(e =>
        e.id === id ? { ...e, basePrice: price } : e
      )
    }))
  }
}))

export const ZExpenseList = () => {
  const { expenses } = useExpenseStore()
  return <div>{expenses.map(...)}</div>
}
```

## 📊 Confronto

| Feature | MobX | Zustand |
|---------|------|---------|
| **API Complexity** | Media | Semplice |
| **Bundle Size** | ~16KB | ~1KB |
| **Learning Curve** | Ripida | Bassa |
| **Boilerplate** | Medio | Minimo |
| **Computed Cache** | ✅ Automatico | ❌ Manuale |
| **Re-render Opt** | ✅ Automatico | ⚠️ Manuale |
| **OOP Support** | ✅ Classi | ❌ Plain objects |
| **Immutability** | ⚠️ Mutazioni dirette | ✅ Esplicita |
| **DevTools** | ✅ | ✅ |
| **TypeScript** | ✅ | ✅ |

## 🎓 Quando Usare Cosa

### Usa MobX se:
- Hai domini complessi con molte derivazioni
- Vuoi computed values automatici e cached
- Preferisci OOP e mutazioni dirette
- Vuoi re-rendering granulare senza configurazione

### Usa Zustand se:
- Vuoi semplicità e minimalismo
- Hai state relativamente semplice
- Preferisci immutabilità esplicita
- Vuoi bundle size minimo
- Sei nuovo a state management

## 📖 Documentazione

Leggi il confronto completo in [`MOBX_VS_ZUSTAND.md`](./MOBX_VS_ZUSTAND.md)

## 🛠️ Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS v4**
- **MobX 6.15**
- **Zustand 5.0**

## 🧪 Test

```bash
# Apri home e scegli implementazione
http://localhost:3000

# Test MobX
http://localhost:3000/mobx

# Test Zustand
http://localhost:3000/zustand
```

### Cosa Testare

1. **Aggiungi nuova spesa** → Verifica che appaia nella lista
2. **Modifica metrica** → Verifica aggiornamento quantità Anno 1
3. **Modifica moltiplicatore** → Verifica sincronizzazione con valore
4. **Modifica valore diretto** → Verifica aggiornamento moltiplicatore
5. **Click Conferma** → Verifica chiamata API e messaggio successo
6. **Elimina metrica** → Verifica ricalcolo quantità
7. **Elimina spesa** → Verifica rimozione dalla lista

## 📝 Note Implementazione

### MobX
- Usa `makeAutoObservable()` per reattività automatica
- Computed values innestati: `priceYear2` dipende da `priceYear1`
- Observer pattern su tutti i componenti che leggono observable
- `runInAction()` per aggiornamenti async

### Zustand
- Store unico con `create()`
- Actions immutabili con spread operator
- Calculator helper per computed values
- Hook selector per ottimizzazione: `useExpenseStore(state => state.expenses)`

## 🤝 Contribuire

Il progetto è a scopo educativo per confrontare approcci diversi allo state management.

## 📄 License

MIT

## 👤 Author

Vittorio Reinaudo - POC comparativa MobX vs Zustand
