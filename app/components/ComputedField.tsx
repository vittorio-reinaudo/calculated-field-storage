import { formatNumber } from "../utils/formatters"

export const ComputedField = ({ 
  label, 
  value,
  isCurrency = false
}: { 
  label: string
  value: number
  isCurrency?: boolean
}) => {
  const displayValue = isCurrency ? `${formatNumber(value)}€` : formatNumber(value, 0)
  
  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {label}
        <span className="text-xs text-gray-500 italic">(calcolato)</span>
      </label>
      <div className="px-3 py-2 bg-gray-50 text-gray-600 rounded-lg border border-gray-200 font-medium">
        {displayValue}
      </div>
    </div>
  )
}
