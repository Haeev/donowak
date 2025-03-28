'use client'

import { useState } from 'react'

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  
  const testimonials = [
    {
      quote: "L'équipe de Donowak a su comprendre parfaitement nos besoins et nous a proposé une solution sur mesure pour équiper nos salles de réunion. Le résultat est à la hauteur de nos attentes.",
      author: "Sophie Martin",
      position: "Directrice des Opérations, Entreprise XYZ",
      image: "/testimonials/placeholder.jpg" // À remplacer par de vraies images
    },
    {
      quote: "Professionnalisme et qualité sont les maîtres mots pour décrire notre collaboration avec Donowak. Leur expertise nous a permis d'optimiser nos espaces de travail.",
      author: "Thomas Dubois",
      position: "Responsable IT, Société ABC",
      image: "/testimonials/placeholder.jpg"
    },
    {
      quote: "Nous avons été impressionnés par la qualité du service, de l'étude initiale à l'installation finale. Je recommande vivement Donowak pour tous vos projets d'intégration audiovisuelle.",
      author: "Laura Petit",
      position: "Chargée de Projets, Entreprise LMN",
      image: "/testimonials/placeholder.jpg"
    }
  ]

  // Navigation vers le témoignage précédent
  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  // Navigation vers le témoignage suivant
  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Ce que nos clients disent</h2>
        
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Contrôles pour la navigation */}
            <button 
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 lg:-translate-x-16 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none z-10"
              aria-label="Précédent"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            
            <button 
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 lg:translate-x-16 bg-white rounded-full p-2 shadow-md hover:bg-gray-100 focus:outline-none z-10"
              aria-label="Suivant"
            >
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            
            {/* Témoignage actif */}
            <div className="bg-white rounded-xl shadow-lg p-8">
              <div className="flex flex-col items-center text-center">
                <svg className="w-12 h-12 text-blue-600 mb-6" fill="currentColor" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 8v6c0 3.314-2.686 6-6 6H4v2c0 3.314 2.686 6 6 6h2c3.314 0 6-2.686 6-6v-8c0-3.314-2.686-6-6-6h-2zm16 0v6c0 3.314-2.686 6-6 6h0v2c0 3.314 2.686 6 6 6h2c3.314 0 6-2.686 6-6v-8c0-3.314-2.686-6-6-6h-2z" />
                </svg>
                <p className="text-xl mb-6">{testimonials[activeIndex].quote}</p>
                <div className="flex flex-col items-center">
                  <div className="w-16 h-16 rounded-full bg-gray-300 mb-4">
                    {/* Image à remplacer */}
                  </div>
                  <p className="font-semibold">{testimonials[activeIndex].author}</p>
                  <p className="text-gray-600 text-sm">{testimonials[activeIndex].position}</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Indicateurs */}
          <div className="flex justify-center mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 mx-1 rounded-full focus:outline-none ${
                  activeIndex === index ? 'bg-blue-600' : 'bg-gray-300'
                }`}
                aria-label={`Témoignage ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
} 