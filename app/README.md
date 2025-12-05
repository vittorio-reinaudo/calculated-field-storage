# Financial Planning Dashboard - Struttura Progetto

## 📁 Organizzazione File

```
app/
├── page.tsx                      # Pagina principale (Dashboard container)
├── store/                        # MobX Store
│   ├── Expense.ts               # Classe modello per singola spesa
│   └── ExpenseStore.ts          # Store globale + singleton instance
├── components/                   # Componenti UI React
│   ├── ExpenseList.tsx          # Lista spese (colonna sinistra)
│   ├── ExpenseListItem.tsx      # Singolo item nella lista
│   ├── GrandTotals.tsx          # Box totali generali
│   ├── ExpenseDetailPanel.tsx   # Pannello dettaglio (colonna destra)
│   ├── YearSection.tsx          # Sezione anno con campi
│   ├── EditableField.tsx        # Campo input editabile
│   └── ComputedField.tsx        # Campo calcolato read-only
└── utils/                        # Utilities
    └── formatters.ts            # Funzioni formattazione numeri/valute
```

## 🏗️ Architettura

### Store Layer (MobX)

**Expense.ts**
- Modello singola spesa con proprietà observable
- Computed properties innestati per calcoli automatici
- 3 livelli di computed: prezzi/quantità → totali → grand totals

**ExpenseStore.ts**
- Store globale con array di expenses
- Computed per totali generali
- Actions: add, remove, getById
- Export singleton instance

### Component Layer (React + Observer)

**Componenti Container:**
- `page.tsx`: Layout principale con stato selezione
- `ExpenseList`: Lista spese con bottone aggiungi
- `ExpenseDetailPanel`: Pannello dettaglio con 3 sezioni anno

**Componenti Presentazionali:**
- `ExpenseListItem`: Card spesa cliccabile (observer)
- `GrandTotals`: Display totali generali (observer)
- `YearSection`: Sezione anno con campi (observer)
- `EditableField`: Input editabile con icona
- `ComputedField`: Display read-only con badge AUTO

### Utils Layer

**formatters.ts**
- `formatCurrency()`: Formattazione € con locale IT
- `formatNumber()`: Formattazione numeri con decimali

## 🎨 Design System

### Schema Colori
- **Background**: Grigio chiaro (`bg-gray-100`)
- **Card**: Bianco con bordi grigi
- **Testi**: Tutti neri (`text-black`)
- **Bordi**: Grigi/Neri con spessore 2px
- **Accenti**: Nero per header e bottoni primari
- **Stati**: Grigio scuro per hover/focus

### Icone
- ✏️ Campi editabili
- 🔒 Campi computed (auto-calcolati)
- 📊 Placeholder dashboard
- 🗑️ Elimina

### Typography
- **Header**: Font-size 2xl-4xl, bold
- **Titoli sezioni**: Font-size xl, uppercase, bold
- **Testi**: Font-size base, medium/bold
- **Valori**: Font-size xl-2xl per importi importanti

## 🔄 Flusso Dati

```
User Input (EditableField)
    ↓
Expense Observable Property
    ↓
MobX Computed (livello 1: prezzi/quantità)
    ↓
MobX Computed (livello 2: totali per spesa)
    ↓
MobX Computed (livello 3: totali generali)
    ↓
Observer Components Re-render (granulare)
```

## 🚀 Performance

- **Observer granulari**: Ogni componente è wrappato con `observer()`
- **Re-render ottimizzati**: Solo i componenti che leggono dati modificati si aggiornano
- **Computed caching**: MobX cache automaticamente i computed values
- **Nesting efficiente**: I computed dipendenti si aggiornano in cascata

## 📦 Dipendenze

- `mobx`: State management reattivo
- `mobx-react-lite`: Binding React con hook observer
- `next.js`: Framework React
- `tailwindcss`: Utility-first CSS

## 🎯 Pattern Utilizzati

1. **Singleton Pattern**: Store globale unico
2. **Observer Pattern**: MobX reactive programming
3. **Computed Properties**: Valori derivati automatici
4. **Component Composition**: Componenti piccoli e riutilizzabili
5. **Separation of Concerns**: Store, UI, Utils separati

