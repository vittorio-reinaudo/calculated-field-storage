# Confronto MobX vs Zustand - Financial Planning Dashboard

## 📁 Struttura File

### MobX Implementation (`/`)
```
app/
├── store/
│   ├── Expense.ts          # Classe con makeAutoObservable
│   └── ExpenseStore.ts     # Store singleton con computed
├── components/
│   ├── ExpenseList.tsx     # observer()
│   ├── YearSection.tsx     # observer()
│   └── ...
└── page.tsx                # observer() + useEffect
```

### Zustand Implementation (`/zustand`)
```
app/
├── zustand-store/
│   ├── ExpenseModel.ts     # Plain interfaces + ExpenseCalculator
│   └── useExpenseStore.ts  # create() hook
├── zustand-components/
│   ├── ZExpenseList.tsx    # useExpenseStore()
│   ├── ZYearSection.tsx    # useExpenseStore()
│   └── ...
└── zustand/page.tsx        # useExpenseStore() + useEffect
```

## 🔑 Differenze Chiave

### 1. **Definizione dello State**

**MobX:**
```typescript
class Expense {
  basePrice = 0
  
  constructor() {
    makeAutoObservable(this)  // Rende tutto observable/computed
  }
  
  get priceYear1() {          // Computed automatico
    return this.basePrice
  }
}
```

**Zustand:**
```typescript
interface ExpenseData {
  basePrice: number          // Plain data
}

class ExpenseCalculator {   // Helper statico
  static getPriceYear1(expense: ExpenseData) {
    return expense.basePrice
  }
}
```

### 2. **Store Globale**

**MobX:**
```typescript
export class ExpenseStore {
  expenses: Expense[] = []
  
  constructor() {
    makeAutoObservable(this)
  }
  
  get grandTotalYear1() {    // Computed reattivo
    return this.expenses.reduce(...)
  }
}

export const expenseStore = new ExpenseStore()  // Singleton
```

**Zustand:**
```typescript
export const useExpenseStore = create<State>((set, get) => ({
  expenses: [],
  
  getGrandTotalYear1: () => {  // Getter on-demand
    return get().expenses.reduce(...)
  },
  
  updateExpenseName: (id, name) => {
    set(state => ({
      expenses: state.expenses.map(e => 
        e.id === id ? { ...e, name } : e
      )
    }))
  }
}))
```

### 3. **Componenti Reattivi**

**MobX:**
```typescript
export const ExpenseList = observer(() => {
  return (
    <div>
      {expenseStore.expenses.map(expense => (
        <ExpenseRow expense={expense} />  // Props drilling
      ))}
    </div>
  )
})
```

**Zustand:**
```typescript
export const ZExpenseList = () => {
  const { expenses } = useExpenseStore()  // Hook selector
  
  return (
    <div>
      {expenses.map(expense => (
        <ZExpenseRow expense={expense} />
      ))}
    </div>
  )
}
```

### 4. **Aggiornamento State**

**MobX:**
```typescript
// Mutazione diretta (grazie a makeAutoObservable)
expense.basePrice = 100
expense.name = "Nuovo nome"

// O tramite action
expenseStore.removeExpense(id)
```

**Zustand:**
```typescript
// Sempre tramite actions immutabili
updateExpenseBasePrice(expenseId, 100)
updateExpenseName(expenseId, "Nuovo nome")

// Internamente usa spread operator
set(state => ({
  expenses: state.expenses.map(e =>
    e.id === id ? { ...e, basePrice: 100 } : e
  )
}))
```

### 5. **Computed Values**

**MobX:**
```typescript
get totalYear1() {
  return this.priceYear1 * this.qtyYear1  // Auto-cached
}

get grandTotalYear1() {
  return this.expenses.reduce(...)         // Auto-cached
}
```

**Zustand:**
```typescript
// Calcolati on-demand, no caching automatico
ExpenseCalculator.getTotalYear1(expense)

// Nel store
getGrandTotalYear1: () => {
  return get().expenses.reduce(...)
}
```

### 6. **Re-rendering Optimization**

**MobX:**
- ✅ Re-render granulare automatico
- ✅ Solo componenti che leggono dati modificati si ri-renderizzano
- ✅ observer() gestisce tutto

**Zustand:**
- ⚠️ Selector manuale per ottimizzazione
- ⚠️ Tutti i componenti che usano lo store si ri-renderizzano di default
- ✅ Puoi usare selector specifici: `useExpenseStore(state => state.expenses)`

## 📊 Vantaggi/Svantaggi

### MobX

**✅ Vantaggi:**
- Codice più conciso (mutazioni dirette)
- Computed values automatici e cached
- Re-rendering granulare out-of-the-box
- OOP familiare (classi, getters)
- Perfetto per domini complessi con molte derivazioni

**❌ Svantaggi:**
- Curva di apprendimento più ripida
- "Magic" sotto il cofano (proxy, decorators)
- Debug più difficile
- Bundle size leggermente maggiore

### Zustand

**✅ Vantaggi:**
- API semplicissima (solo create + hook)
- No boilerplate
- Immutabilità esplicita (più prevedibile)
- Bundle size minimo (~1KB)
- DevTools integrato
- Perfetto per state semplice/medio

**❌ Svantaggi:**
- Computed values manuali (no caching automatico)
- Più codice per update complessi (spread operator)
- Selector manuale per ottimizzazione
- No support OOP nativo

## 🎯 Quando Usare Cosa

### Usa MobX quando:
- Hai un dominio complesso con molte derivazioni
- Vuoi re-rendering granulare automatico
- Preferisci OOP e mutazioni dirette
- Hai esperienza con reactive programming

### Usa Zustand quando:
- Vuoi semplicità e minimalismo
- Hai state relativamente semplice
- Preferisci immutabilità esplicita
- Vuoi bundle size minimo
- Sei nuovo a state management

## 🔄 Migration Path

**Da MobX a Zustand:**
1. Converti classi in plain objects
2. Sposta computed in helper functions
3. Sostituisci observer() con useStore()
4. Converti mutazioni in set() immutabili

**Da Zustand a MobX:**
1. Converti plain objects in classi
2. Aggiungi makeAutoObservable()
3. Converti helper functions in getter
4. Sostituisci useStore() con observer()

## 📝 Note Implementation

### MobX Implementation
- **File:** `app/page.tsx` (root)
- **Route:** `http://localhost:3000/`
- **Observer granulare:** ✅
- **Computed caching:** ✅

### Zustand Implementation
- **File:** `app/zustand/page.tsx`
- **Route:** `http://localhost:3000/zustand`
- **Hook-based:** ✅
- **Immutable updates:** ✅

## 🚀 Test Entrambe

```bash
# MobX version
http://localhost:3000/

# Zustand version
http://localhost:3000/zustand
```

Entrambe implementazioni hanno:
- ✅ Stessa UI
- ✅ Stesse funzionalità
- ✅ Stesso flusso dati
- ✅ API calls identiche
- ✅ Calcoli nested identici

