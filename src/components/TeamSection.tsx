'use client'

import { useState } from 'react'

interface TeamMember {
  id: number
  name: string
  position: string
  bio: string
  image: string
}

export default function TeamSection() {
  const [activeMember, setActiveMember] = useState<TeamMember | null>(null)
  
  // Données fictives de l'équipe - à remplacer par des données réelles
  const teamMembers: TeamMember[] = [
    {
      id: 1,
      name: "Jean Dupont",
      position: "Fondateur & Directeur",
      bio: "Fort de 15 ans d'expérience dans le secteur audiovisuel, Jean a fondé Donowak en 2020 avec la vision de rendre les technologies audiovisuelles professionnelles accessibles à toutes les entreprises. Son expertise et sa passion pour l'innovation technologique guident l'entreprise.",
      image: "/team/placeholder-1.jpg"
    },
    {
      id: 2,
      name: "Marie Laurent",
      position: "Responsable Technique",
      bio: "Marie supervise tous les aspects techniques des projets, de la conception à l'installation. Ingénieure en électronique de formation, elle possède une connaissance approfondie des systèmes audiovisuels et veille à la qualité de chaque installation.",
      image: "/team/placeholder-2.jpg"
    },
    {
      id: 3,
      name: "Thomas Moreau",
      position: "Chargé de Projets",
      bio: "Thomas assure la coordination des projets de A à Z et sert de point de contact principal pour nos clients. Sa rigueur et son sens de l'organisation garantissent une exécution fluide de chaque projet dans le respect des délais.",
      image: "/team/placeholder-3.jpg"
    },
    {
      id: 4,
      name: "Sophie Legrand",
      position: "Spécialiste Marketing",
      bio: "Sophie est responsable de la communication et du marketing de Donowak. Elle met en valeur notre expertise et nos réalisations, et s'assure que notre message atteint efficacement notre audience cible.",
      image: "/team/placeholder-4.jpg"
    }
  ]
  
  // Fonction pour générer un placeholder pour les images manquantes
  const getPlaceholderImage = (index: number) => {
    const colors = ['#2563EB', '#4F46E5', '#7C3AED', '#9333EA', '#C026D3', '#DB2777']
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='${colors[index % colors.length].replace('#', '%23')}'/%3E%3Ctext x='50%25' y='50%25' font-size='32' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3E${teamMembers[index].name.charAt(0)}${teamMembers[index].name.split(' ')[1].charAt(0)}%3C/text%3E%3C/svg%3E`
  }
  
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Notre équipe</h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
        Notre équipe est composée de professionnels passionnés et expérimentés, chacun expert dans son domaine.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        {teamMembers.map((member, index) => (
          <div 
            key={member.id} 
            className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
            onClick={() => setActiveMember(member)}
          >
            <div className="h-64 overflow-hidden">
              <img 
                src={getPlaceholderImage(index)} 
                alt={member.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-6 text-center">
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <p className="text-blue-600">{member.position}</p>
            </div>
          </div>
        ))}
      </div>
      
      {/* Modal pour afficher la bio complète */}
      {activeMember && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full overflow-hidden">
            <div className="flex items-start justify-between p-6 border-b">
              <h3 className="text-xl font-semibold">{activeMember.name}</h3>
              <button 
                onClick={() => setActiveMember(null)}
                className="text-gray-400 hover:text-gray-500 focus:outline-none"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="flex flex-col sm:flex-row gap-6">
                <div className="sm:w-1/3">
                  <img 
                    src={getPlaceholderImage(teamMembers.findIndex(m => m.id === activeMember.id))} 
                    alt={activeMember.name}
                    className="w-full h-auto rounded-lg"
                  />
                </div>
                <div className="sm:w-2/3">
                  <p className="text-blue-600 font-medium mb-4">{activeMember.position}</p>
                  <p className="text-gray-700">{activeMember.bio}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 px-6 py-4 flex justify-end">
              <button
                onClick={() => setActiveMember(null)}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 