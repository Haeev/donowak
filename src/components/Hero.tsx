'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    // Animations d'apparition au chargement
    setIsVisible(true)
  }, [])

  return (
    <div className="relative bg-gradient-to-r from-blue-900 to-blue-700 text-white">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative container mx-auto px-4 py-24 min-h-[80vh] flex items-center">
        <div className="max-w-2xl">
          <div className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Solutions d'intégration audiovisuelle professionnelles
            </h1>
            <p className="text-xl mb-8 text-blue-100">
              Donowak transforme vos espaces de travail avec des solutions audiovisuelles innovantes et performantes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/prestations"
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md font-medium transition-colors text-center"
              >
                Nos prestations
              </Link>
              <Link 
                href="/contact"
                className="bg-white hover:bg-gray-100 text-blue-900 py-3 px-8 rounded-md font-medium transition-colors text-center"
              >
                Nous contacter
              </Link>
            </div>
          </div>
        </div>
      </div>
      
      {/* Vague décorative en bas du héros */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320" className="w-full">
          <path 
            fill="#ffffff" 
            fillOpacity="1" 
            d="M0,128L48,144C96,160,192,192,288,192C384,192,480,160,576,154.7C672,149,768,171,864,154.7C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z">
          </path>
        </svg>
      </div>
    </div>
  )
} 