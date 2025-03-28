'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'

// Liste des emails autorisés à accéder au dashboard
const AUTHORIZED_EMAILS = ['loic.nowakowski@gmail.com'] // Email administrateur unique

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    async function checkUser() {
      const { data: { user }, error } = await supabase.auth.getUser()
      
      if (error || !user) {
        // Si une erreur se produit ou aucun utilisateur n'est trouvé,
        // rediriger vers la page de login
        router.push('/login')
        return
      }
      
      // Vérifier si l'email de l'utilisateur est dans la liste des emails autorisés
      if (user.email && AUTHORIZED_EMAILS.includes(user.email)) {
        setUser(user)
        setAuthorized(true)
        setLoading(false)
      } else {
        // L'utilisateur est connecté mais n'est pas autorisé
        console.error("Accès non autorisé")
        await supabase.auth.signOut() // Déconnecter l'utilisateur non autorisé
        router.push('/') // Rediriger vers la page d'accueil
      }
    }
    
    checkUser()
  }, [router, supabase.auth])

  if (loading) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <p>Chargement du dashboard...</p>
      </div>
    )
  }

  if (!authorized) {
    return (
      <div className="min-h-screen p-8 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Accès non autorisé</h2>
          <p className="mb-4">Vous n'êtes pas autorisé à accéder à cette section.</p>
          <button 
            onClick={() => router.push('/')}
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
          >
            Retourner à l'accueil
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard Administrateur</h1>
      <p className="mb-4">Bienvenue, {user?.email} !</p>
      
      {/* Bouton de déconnexion */}
      <button 
        onClick={async () => {
          await supabase.auth.signOut()
          router.push('/login')
        }}
        className="mb-8 bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
      >
        Se déconnecter
      </button>

      {/* Sections de gestion */}
      <div className="mt-8 space-y-4">
        <section className="p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Gestion du Contenu des Pages</h2>
          {/* Placeholder pour l'interface de gestion des pages */}
          <p className="text-gray-600">Fonctionnalité à venir...</p>
        </section>
        <section className="p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Gestion du Blog</h2>
          {/* Placeholder pour l'interface de gestion du blog */}
          <p className="text-gray-600">Fonctionnalité à venir...</p>
        </section>
        <section className="p-4 border rounded bg-gray-50">
          <h2 className="text-xl font-semibold mb-2">Gestion des Contacts</h2>
          {/* Placeholder pour l'interface de gestion des contacts */}
          <p className="text-gray-600">Fonctionnalité à venir...</p>
        </section>
      </div>
    </div>
  )
} 