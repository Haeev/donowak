'use client'

import { useState } from 'react'
import Image from 'next/image'

interface Project {
  id: number
  title: string
  description: string
  image: string
  category: string
  date: string
}

export default function ProjectGallery() {
  // État pour le filtrage des projets
  const [activeFilter, setActiveFilter] = useState('all')
  
  // Données de projets fictifs - à remplacer par des données réelles stockées dans Supabase
  const projects: Project[] = [
    {
      id: 1,
      title: "Salle de conférence Entreprise XYZ",
      description: "Installation complète avec écran interactif 86\", système de visioconférence et sonorisation.",
      image: "/realisations/placeholder-project-1.jpg",
      category: "salle-conference",
      date: "Février 2025"
    },
    {
      id: 2,
      title: "Centre de formation ABC",
      description: "Déploiement de 8 écrans interactifs dans des salles de formation.",
      image: "/realisations/placeholder-project-2.jpg",
      category: "education",
      date: "Janvier 2025"
    },
    {
      id: 3,
      title: "Siège social Entreprise DEF",
      description: "Solution d'affichage dynamique pour l'accueil et les espaces communs.",
      image: "/realisations/placeholder-project-3.jpg",
      category: "affichage",
      date: "Décembre 2024"
    },
    {
      id: 4,
      title: "Showroom Entreprise GHI",
      description: "Installation d'un mur d'écrans LED pour l'espace d'exposition.",
      image: "/realisations/placeholder-project-4.jpg",
      category: "affichage",
      date: "Novembre 2024"
    },
    {
      id: 5,
      title: "Salles de réunion Entreprise JKL",
      description: "Équipement de 5 salles de réunion avec systèmes de présentation sans fil.",
      image: "/realisations/placeholder-project-5.jpg",
      category: "salle-conference",
      date: "Octobre 2024"
    },
    {
      id: 6,
      title: "Université MNO",
      description: "Modernisation des amphithéâtres avec systèmes audiovisuels avancés.",
      image: "/realisations/placeholder-project-6.jpg",
      category: "education",
      date: "Septembre 2024"
    }
  ]
  
  // Catégories de filtrage
  const categories = [
    { id: 'all', name: 'Tous les projets' },
    { id: 'salle-conference', name: 'Salles de conférence' },
    { id: 'education', name: 'Éducation' },
    { id: 'affichage', name: 'Affichage dynamique' }
  ]
  
  // Projets filtrés en fonction de la catégorie sélectionnée
  const filteredProjects = activeFilter === 'all' 
    ? projects 
    : projects.filter(project => project.category === activeFilter)
  
  // Fonction pour générer un placeholder pour les images manquantes
  const getPlaceholderImage = (index: number) => {
    const colors = ['#2563EB', '#4F46E5', '#7C3AED', '#9333EA', '#C026D3', '#DB2777']
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='${colors[index % colors.length].replace('#', '%23')}'/%3E%3Ctext x='50%25' y='50%25' font-size='28' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3EProjet ${index + 1}%3C/text%3E%3C/svg%3E`
  }

  return (
    <div className="py-12">
      {/* Filtres */}
      <div className="flex flex-wrap justify-center mb-12 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveFilter(category.id)}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeFilter === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Grille de projets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project, index) => (
          <div key={project.id} className="group bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
            <div className="relative h-64 overflow-hidden">
              <Image
                src={getPlaceholderImage(index)}
                alt={project.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{project.date}</span>
                <span className="text-xs font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full">
                  {categories.find(c => c.id === project.category)?.name.replace('Salles de ', '').replace('Affichage dynamique', 'Affichage') || project.category}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Message si aucun projet ne correspond au filtre */}
      {filteredProjects.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>Aucun projet ne correspond à ce filtre.</p>
        </div>
      )}
    </div>
  )
} 