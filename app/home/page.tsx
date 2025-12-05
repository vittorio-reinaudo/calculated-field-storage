"use client";

import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center p-8">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-900 mb-4">
            📊 Financial Planning Dashboard
          </h1>
          <p className="text-xl text-gray-600">
            Confronto tra MobX e Zustand per State Management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* MobX Card */}
          <Link href="/mobx">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-blue-500">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🔵</div>
                <h2 className="text-3xl font-bold text-gray-900">MobX</h2>
                <p className="text-gray-500 text-sm mt-2">Reactive State Management</p>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Computed values automatici</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Re-render granulare</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>OOP con classi</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Mutazioni dirette</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-blue-600 text-white rounded-lg font-medium">
                  Apri Demo →
                </span>
              </div>
            </div>
          </Link>

          {/* Zustand Card */}
          <Link href="/zustand">
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 cursor-pointer border-2 border-transparent hover:border-green-500">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4">🟢</div>
                <h2 className="text-3xl font-bold text-gray-900">Zustand</h2>
                <p className="text-gray-500 text-sm mt-2">Minimalist State Management</p>
              </div>
              
              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>API semplicissima</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Bundle size minimo (~1KB)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Immutabilità esplicita</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Hook-based</span>
                </div>
              </div>

              <div className="mt-6 text-center">
                <span className="inline-block px-4 py-2 bg-green-600 text-white rounded-lg font-medium">
                  Apri Demo →
                </span>
              </div>
            </div>
          </Link>
        </div>

        {/* Info Box */}
        <div className="mt-12 bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-xl font-bold text-gray-900 mb-3">
            ℹ️ Cosa Include Questo Progetto
          </h3>
          <div className="space-y-2 text-gray-700">
            <p>• <strong>MobX Implementation:</strong> Classi observable, computed values cachati, observer pattern</p>
            <p>• <strong>Zustand Implementation:</strong> Hook-based, immutable updates, selectors</p>
            <p>• <strong>Stessa Funzionalità:</strong> Gestione spese multi-anno con metriche calcolate</p>
            <p>• <strong>API Mock:</strong> Fetch, save, delete con delay simulato</p>
          </div>
        </div>

        {/* Documentation Link */}
        <div className="mt-8 text-center">
          <a 
            href="/MOBX_VS_ZUSTAND.md" 
            target="_blank"
            className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <span>📖</span>
            <span className="underline">Leggi la documentazione completa del confronto</span>
          </a>
        </div>
      </div>
    </div>
  );
}

