'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'

// Interface pour les articles de blog
interface BlogPost {
  id: number
  title: string
  content: string
  excerpt: string
  category: string
  date: string
  slug: string
  author: string
}

export default function BlogPostPage() {
  const params = useParams()
  const slug = params.slug as string
  
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  
  // Données fictives pour l'exemple - à remplacer par des données réelles de Supabase
  useEffect(() => {
    // Simulation de chargement d'un article
    setLoading(true)
    setError(false)
    
    // Données d'exemple pour la démo
    const samplePosts: Record<string, BlogPost> = {
      'choisir-ecran-interactif-entreprise': {
        id: 1,
        title: "Comment choisir le bon écran interactif pour votre entreprise",
        excerpt: "Découvrez les critères essentiels pour sélectionner l'écran interactif qui correspond parfaitement à vos besoins professionnels.",
        content: `
          <p>Avec l'essor des espaces de travail collaboratifs, les écrans interactifs sont devenus indispensables dans les entreprises modernes. Mais face à la multitude d'options disponibles sur le marché, comment faire le bon choix ?</p>
          
          <h2>1. Définir vos besoins spécifiques</h2>
          <p>Avant tout achat, posez-vous les bonnes questions :</p>
          <ul>
            <li>Quelle est la taille de votre salle ?</li>
            <li>Combien de personnes utiliseront l'écran simultanément ?</li>
            <li>Quelles applications allez-vous principalement utiliser ?</li>
            <li>Avez-vous besoin de fonctionnalités spécifiques (visioconférence, partage sans fil, etc.) ?</li>
          </ul>
          
          <h2>2. Choisir la bonne taille</h2>
          <p>La taille de l'écran doit être adaptée à votre espace :</p>
          <ul>
            <li>Petite salle (jusqu'à 6 personnes) : 55" à 65"</li>
            <li>Salle moyenne (6-12 personnes) : 75" à 86"</li>
            <li>Grande salle (plus de 12 personnes) : 86" et plus</li>
          </ul>
          
          <h2>3. Résolution et qualité d'image</h2>
          <p>Pour un confort visuel optimal, privilégiez au minimum une résolution 4K (3840 x 2160 pixels), surtout pour les écrans de grande taille.</p>
          
          <h2>4. Considérer le nombre de points de contact</h2>
          <p>Si plusieurs personnes sont susceptibles d'utiliser l'écran simultanément, optez pour un modèle offrant au moins 20 points de contact.</p>
          
          <h2>5. Connectivité et compatibilité</h2>
          <p>Assurez-vous que l'écran dispose des ports nécessaires (HDMI, USB, etc.) et qu'il est compatible avec vos systèmes existants.</p>
          
          <h2>6. Logiciel embarqué</h2>
          <p>Certains écrans interactifs sont équipés de logiciels préinstallés qui facilitent la collaboration. Évaluez ces outils pour déterminer s'ils répondent à vos besoins.</p>
          
          <h2>7. Support et maintenance</h2>
          <p>Optez pour un fournisseur offrant un bon service après-vente et des garanties étendues.</p>
          
          <h2>Conclusion</h2>
          <p>Investir dans un écran interactif de qualité peut transformer vos réunions et améliorer la collaboration au sein de votre entreprise. Chez Donowak, nous vous accompagnons dans le choix, l'installation et la prise en main de votre nouvel équipement.</p>
          
          <p>N'hésitez pas à nous contacter pour obtenir des conseils personnalisés adaptés à vos besoins spécifiques.</p>
        `,
        category: "conseils",
        date: "28 mars 2025",
        slug: "choisir-ecran-interactif-entreprise",
        author: "Jean Dupont"
      }
    }
    
    // Simuler un délai de chargement
    setTimeout(() => {
      if (samplePosts[slug]) {
        setPost(samplePosts[slug])
        setLoading(false)
      } else {
        setError(true)
        setLoading(false)
      }
    }, 500)
  }, [slug])
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          <div className="animate-pulse">
            <div className="h-10 bg-gray-200 rounded w-3/4 mb-6"></div>
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-5/6 mb-6"></div>
            <div className="h-6 bg-gray-200 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-4/5 mb-6"></div>
          </div>
        </div>
      </div>
    )
  }
  
  if (error || !post) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-semibold mb-4">Article non trouvé</h1>
          <p className="text-gray-600 mb-8">
            L'article que vous recherchez n'existe pas ou a été déplacé.
          </p>
          <Link 
            href="/blog"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md"
          >
            Retour au blog
          </Link>
        </div>
      </div>
    )
  }
  
  return (
    <div>
      {/* En-tête de l'article */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="mb-4">
              <Link 
                href="/blog"
                className="text-blue-200 hover:text-white flex items-center"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Retour au blog
              </Link>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-blue-200">
              <span className="mr-4">{post.date}</span>
              <span className="mr-4">Par {post.author}</span>
              <span className="bg-blue-700 text-white px-2 py-1 rounded-full text-xs">
                {post.category.charAt(0).toUpperCase() + post.category.slice(1).replace('-', ' ')}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Contenu de l'article */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto">
          {/* Image principale */}
          <div className="mb-8 rounded-lg overflow-hidden shadow-lg">
            <img 
              src={`data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='400' viewBox='0 0 800 400'%3E%3Crect width='800' height='400' fill='%232563EB'/%3E%3Ctext x='50%25' y='50%25' font-size='32' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3EImage de l'article%3C/text%3E%3C/svg%3E`} 
              alt={post.title} 
              className="w-full h-auto"
            />
          </div>
          
          {/* Contenu */}
          <div 
            className="prose prose-lg max-w-none prose-headings:text-blue-900 prose-headings:font-bold prose-a:text-blue-600"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
          
          {/* Partage et actions */}
          <div className="mt-12 pt-8 border-t">
            <div className="flex flex-wrap justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold mb-2">Partagez cet article</h3>
                <div className="flex space-x-4">
                  <button className="text-blue-600 hover:text-blue-800">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                  </button>
                  <button className="text-blue-400 hover:text-blue-600">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723 10.054 10.054 0 01-3.127 1.184 4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.937 4.937 0 004.604 3.417 9.868 9.868 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.054 0 13.999-7.496 13.999-13.986 0-.209 0-.42-.015-.63a9.936 9.936 0 002.46-2.548l-.047-.02z" />
                    </svg>
                  </button>
                  <button className="text-blue-500 hover:text-blue-700">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </button>
                </div>
              </div>
              
              <Link
                href="/contact"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors mt-4 sm:mt-0"
              >
                Contactez-nous
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 