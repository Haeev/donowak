'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Import dynamique de l'éditeur pour éviter les erreurs SSR
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 animate-pulse">Chargement de l'éditeur...</div>
})

// Liste des emails autorisés à accéder au dashboard
const AUTHORIZED_EMAILS = ['loic.nowakowski@gmail.com'] // Email administrateur unique

// Interface pour les données de page
interface PageData {
  id: string
  slug: string
  title: string
  content: any // Peut contenir du HTML et JSON
}

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [authorized, setAuthorized] = useState(false)
  const [activeTab, setActiveTab] = useState('pages') // 'pages', 'blog', 'contacts'
  const [pages, setPages] = useState<PageData[]>([])
  const [selectedPage, setSelectedPage] = useState<PageData | null>(null)
  const [editedContent, setEditedContent] = useState('')
  const [editedTitle, setEditedTitle] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [saveError, setSaveError] = useState(false)
  
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

  // Chargement des pages depuis Supabase
  useEffect(() => {
    if (authorized && activeTab === 'pages') {
      loadPages()
    }
  }, [authorized, activeTab])

  async function loadPages() {
    const { data, error } = await supabase
      .from('pages')
      .select('*')
      .order('title')
    
    if (error) {
      console.error('Erreur lors du chargement des pages:', error)
      return
    }

    setPages(data || [])
  }

  // Fonctions pour la gestion des pages
  const selectPage = (page: PageData) => {
    setSelectedPage(page)
    setEditedTitle(page.title)
    setEditedContent(page.content?.html || '')
  }

  const savePage = async () => {
    if (!selectedPage) return

    setSaving(true)
    setSaveSuccess(false)
    setSaveError(false)

    // Préparer les données à sauvegarder
    const pageData = {
      title: editedTitle,
      content: {
        html: editedContent,
        updatedAt: new Date().toISOString()
      }
    }

    const { error } = await supabase
      .from('pages')
      .update(pageData)
      .eq('id', selectedPage.id)

    setSaving(false)
    
    if (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      setSaveError(true)
      return
    }

    setSaveSuccess(true)
    loadPages() // Recharger les pages pour mettre à jour la liste
  }

  const createNewPage = async () => {
    // Demander le slug pour la nouvelle page
    const slug = prompt('Entrez le slug de la nouvelle page (ex: a-propos, prestations):')
    if (!slug) return
    
    // Vérifier si le slug existe déjà
    const { data } = await supabase
      .from('pages')
      .select('id')
      .eq('slug', slug)
      .single()
    
    if (data) {
      alert('Ce slug existe déjà. Veuillez en choisir un autre.')
      return
    }
    
    // Créer la nouvelle page
    const newPage = {
      slug,
      title: 'Nouvelle page',
      content: {
        html: '<p>Contenu de la page à modifier...</p>',
        updatedAt: new Date().toISOString()
      }
    }
    
    const { data: createdPage, error } = await supabase
      .from('pages')
      .insert([newPage])
      .select()
    
    if (error) {
      console.error('Erreur lors de la création de la page:', error)
      alert('Erreur lors de la création de la page')
      return
    }
    
    loadPages()
    if (createdPage && createdPage.length > 0) {
      selectPage(createdPage[0])
    }
  }

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard Administrateur</h1>
        <div className="flex items-center gap-4">
          <p className="text-gray-600">Connecté en tant que {user?.email}</p>
          <button 
            onClick={async () => {
              await supabase.auth.signOut()
              router.push('/login')
            }}
            className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
          >
            Se déconnecter
          </button>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex mb-8 border-b">
        <button
          onClick={() => setActiveTab('pages')}
          className={`py-2 px-4 font-medium ${activeTab === 'pages' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
        >
          Gestion des Pages
        </button>
        <button
          onClick={() => setActiveTab('blog')}
          className={`py-2 px-4 font-medium ${activeTab === 'blog' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
        >
          Gestion du Blog
        </button>
        <button
          onClick={() => setActiveTab('contacts')}
          className={`py-2 px-4 font-medium ${activeTab === 'contacts' ? 'border-b-2 border-blue-500 text-blue-500' : 'text-gray-600'}`}
        >
          Demandes de Contact
        </button>
      </div>

      {/* Contenu dynamique selon l'onglet actif */}
      {activeTab === 'pages' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Liste des pages à gauche */}
          <div className="lg:col-span-1 bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Pages du site</h2>
              <button 
                onClick={createNewPage}
                className="bg-green-500 hover:bg-green-600 text-white p-1 rounded text-sm flex items-center"
              >
                <span className="px-1">+ Nouvelle</span>
              </button>
            </div>
            <ul className="space-y-2">
              {pages.map(page => (
                <li key={page.id}>
                  <button
                    onClick={() => selectPage(page)}
                    className={`w-full text-left px-3 py-2 rounded ${selectedPage?.id === page.id ? 'bg-blue-100 font-medium' : 'hover:bg-gray-100'}`}
                  >
                    {page.title} <span className="text-gray-500 text-sm">({page.slug})</span>
                  </button>
                </li>
              ))}
              {pages.length === 0 && (
                <li className="text-gray-500 italic px-3 py-2">
                  Aucune page trouvée. Créez votre première page.
                </li>
              )}
            </ul>
          </div>

          {/* Éditeur à droite */}
          <div className="lg:col-span-3">
            {selectedPage ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-grow">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Titre de la page
                    </label>
                    <input
                      type="text"
                      value={editedTitle}
                      onChange={(e) => setEditedTitle(e.target.value)}
                      className="w-full border-gray-300 rounded-md shadow-sm p-2"
                    />
                  </div>
                  <div className="ml-4 text-sm text-gray-500 flex items-center">
                    Slug: <span className="font-mono ml-1">{selectedPage.slug}</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Contenu de la page
                  </label>
                  <RichTextEditor
                    initialContent={editedContent}
                    onChange={setEditedContent}
                    height="400px"
                  />
                </div>

                <div className="flex justify-end mt-4 space-x-3">
                  {saveSuccess && (
                    <span className="text-green-600 flex items-center px-3">
                      ✓ Sauvegardé avec succès!
                    </span>
                  )}
                  {saveError && (
                    <span className="text-red-600 flex items-center px-3">
                      Erreur lors de la sauvegarde
                    </span>
                  )}
                  <button
                    onClick={savePage}
                    disabled={saving}
                    className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {saving ? 'Sauvegarde...' : 'Sauvegarder les modifications'}
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-gray-50 rounded-md p-8 text-center">
                <p className="text-gray-600">Sélectionnez une page à modifier ou créez-en une nouvelle</p>
              </div>
            )}
          </div>
        </div>
      )}

      {activeTab === 'blog' && (
        <div className="bg-gray-50 rounded-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Gestion des Articles de Blog</h2>
          <p className="text-gray-600">Fonctionnalité à venir prochainement...</p>
        </div>
      )}

      {activeTab === 'contacts' && (
        <div className="bg-gray-50 rounded-md p-8 text-center">
          <h2 className="text-xl font-semibold mb-4">Demandes de Contact</h2>
          <p className="text-gray-600">Fonctionnalité à venir prochainement...</p>
        </div>
      )}
    </div>
  )
} 