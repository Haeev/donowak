'use client'

import { useState } from 'react'
import Link from 'next/link'

interface BlogPost {
  id: number
  title: string
  excerpt: string
  category: string
  date: string
  slug: string
}

export default function BlogGrid() {
  const [activeCategory, setActiveCategory] = useState('all')
  
  // Données fictives pour les articles - à remplacer par des données réelles de Supabase
  const posts: BlogPost[] = [
    {
      id: 1,
      title: "Comment choisir le bon écran interactif pour votre entreprise",
      excerpt: "Découvrez les critères essentiels pour sélectionner l'écran interactif qui correspond parfaitement à vos besoins professionnels.",
      category: "conseils",
      date: "28 mars 2025",
      slug: "choisir-ecran-interactif-entreprise"
    },
    {
      id: 2,
      title: "Les nouvelles technologies de visioconférence en 2025",
      excerpt: "Un aperçu des dernières innovations en matière de visioconférence qui révolutionnent la collaboration à distance.",
      category: "tendances",
      date: "15 mars 2025",
      slug: "nouvelles-technologies-visioconference-2025"
    },
    {
      id: 3,
      title: "Comment nous avons transformé les salles de réunion de l'entreprise XYZ",
      excerpt: "Découvrez comment notre solution d'intégration audiovisuelle a amélioré la productivité et la collaboration chez ce client.",
      category: "cas-client",
      date: "2 mars 2025",
      slug: "transformation-salles-reunion-xyz"
    },
    {
      id: 4,
      title: "5 astuces pour optimiser l'acoustique de vos salles de réunion",
      excerpt: "Des conseils pratiques pour améliorer la qualité audio lors de vos réunions et visioconférences.",
      category: "conseils",
      date: "20 février 2025",
      slug: "astuces-optimiser-acoustique-salles-reunion"
    },
    {
      id: 5,
      title: "L'impact de l'intelligence artificielle sur les systèmes audiovisuels",
      excerpt: "Comment l'IA transforme les équipements audiovisuels et ouvre de nouvelles possibilités pour les entreprises.",
      category: "tendances",
      date: "10 février 2025",
      slug: "impact-ia-systemes-audiovisuels"
    },
    {
      id: 6,
      title: "Étude de cas : Déploiement d'un système d'affichage dynamique pour une chaîne de retail",
      excerpt: "Comment nous avons aidé une chaîne de magasins à améliorer leur communication client grâce à l'affichage dynamique.",
      category: "cas-client",
      date: "1 février 2025",
      slug: "etude-cas-affichage-dynamique-retail"
    }
  ]
  
  const categories = [
    { id: 'all', name: 'Tous les articles' },
    { id: 'conseils', name: 'Conseils & Astuces' },
    { id: 'tendances', name: 'Tendances' },
    { id: 'cas-client', name: 'Cas clients' }
  ]
  
  const filteredPosts = activeCategory === 'all' 
    ? posts 
    : posts.filter(post => post.category === activeCategory)
  
  // Fonction pour générer un placeholder pour les images manquantes
  const getPlaceholderImage = (index: number) => {
    const colors = ['#2563EB', '#4F46E5', '#7C3AED', '#9333EA', '#C026D3', '#DB2777']
    return `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='${colors[index % colors.length].replace('#', '%23')}'/%3E%3Ctext x='50%25' y='50%25' font-size='32' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3EArticle ${index + 1}%3C/text%3E%3C/svg%3E`
  }
  
  return (
    <div className="py-12">
      {/* Filtres */}
      <div className="flex flex-wrap justify-center mb-12 gap-4">
        {categories.map(category => (
          <button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            className={`px-6 py-2 rounded-full transition-colors ${
              activeCategory === category.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
            }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      
      {/* Grille d'articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, index) => (
          <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
            <Link href={`/blog/${post.slug}`}>
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={getPlaceholderImage(index)} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">
                    {categories.find(c => c.id === post.category)?.name.replace('Tous les ', '') || post.category}
                  </span>
                  <span className="text-gray-500 text-sm ml-auto">{post.date}</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 hover:text-blue-600 transition-colors">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <span className="text-blue-600 font-medium hover:underline">Lire la suite</span>
              </div>
            </Link>
          </div>
        ))}
      </div>
      
      {/* Message si aucun article ne correspond au filtre */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-16 text-gray-500">
          <p>Aucun article ne correspond à cette catégorie.</p>
        </div>
      )}
      
      {/* Pagination simple - à améliorer avec des données réelles */}
      <div className="flex justify-center mt-12">
        <div className="inline-flex rounded-md shadow">
          <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium rounded-l-md text-gray-700 hover:bg-gray-50">
            Précédent
          </button>
          <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            1
          </button>
          <button className="py-2 px-4 border border-gray-300 bg-blue-600 text-sm font-medium text-white">
            2
          </button>
          <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
            3
          </button>
          <button className="py-2 px-4 border border-gray-300 bg-white text-sm font-medium rounded-r-md text-gray-700 hover:bg-gray-50">
            Suivant
          </button>
        </div>
      </div>
    </div>
  )
} 