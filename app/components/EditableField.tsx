"use client"

import { useState } from "react"

export const EditableField = ({ 
  label, 
  value, 
  onChange, 
  type = "number",
  step = "0.01",
  info
}: { 
  label: string
  value: string | number
  onChange: (value: string) => void
  type?: string
  step?: string
  info?: string
}) => {
  const [showInfo, setShowInfo] = useState(false)

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
        {label}
        {info && (
          <button
            type="button"
            onMouseEnter={() => setShowInfo(true)}
            onMouseLeave={() => setShowInfo(false)}
            className="text-gray-400 hover:text-gray-600 relative"
          >
            <span className="text-xs">ⓘ</span>
            {showInfo && (
              <div className="absolute left-0 top-6 bg-gray-900 text-white text-xs rounded-lg p-3 w-64 z-10 shadow-lg">
                {info}
                <div className="absolute -top-1 left-2 w-2 h-2 bg-gray-900 transform rotate-45"></div>
              </div>
            )}
          </button>
        )}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        step={step}
        className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-gray-900 font-medium"
      />
    </div>
  )
}
