'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// Import dynamique des composants d'édition pour éviter les erreurs SSR
const RichTextEditor = dynamic(() => import('@/components/admin/RichTextEditor'), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 animate-pulse">Chargement de l'éditeur...</div>
})

const VisualPageEditor = dynamic(() => import('@/components/admin/VisualPageEditor'), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 animate-pulse">Chargement de l'éditeur visuel...</div>
})

const ModularEditor = dynamic(() => import('@/components/admin/ModularEditor'), {
  ssr: false,
  loading: () => <div className="border rounded-md p-4 animate-pulse">Chargement de l'éditeur modulaire...</div>
})

// Style global pour Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css'

// Liste des emails autorisés à accéder au dashboard
const AUTHORIZED_EMAILS = ['loic.nowakowski@gmail.com'] // Email administrateur unique

// Interface pour les données de page
interface PageData {
  id: string
  slug: string
  title: string
  content: any // Peut contenir du HTML et JSON
}

// Types d'éditeurs disponibles
type EditorType = 'rich' | 'visual' | 'modular'

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
  const [editorMode, setEditorMode] = useState<EditorType>('modular') // Par défaut, utiliser l'éditeur modulaire
  const [isEditing, setIsEditing] = useState(false) // Mode édition en plein écran
  
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
    setIsEditing(false) // Désactiver l'édition en plein écran
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

  // Fonction pour sauvegarder depuis les éditeurs visuels
  const saveVisualPage = async (id: string, title: string, htmlContent: string) => {
    setSaving(true)
    setSaveSuccess(false)
    setSaveError(false)

    // Préparer les données à sauvegarder
    const pageData = {
      title,
      content: {
        html: htmlContent,
        updatedAt: new Date().toISOString()
      }
    }

    const { error } = await supabase
      .from('pages')
      .update(pageData)
      .eq('id', id)

    setSaving(false)
    
    if (error) {
      console.error('Erreur lors de la sauvegarde:', error)
      setSaveError(true)
      return false
    }

    setSaveSuccess(true)
    await loadPages() // Recharger les pages pour mettre à jour la liste
    setIsEditing(false) // Sortir du mode édition
    return true
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
        html: '<div class="container mx-auto p-4"><h1 class="text-3xl font-bold mb-4">Titre de la page</h1><p class="mb-4">Contenu de la page à modifier...</p></div>',
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

  // Fonction pour lancer l'édition d'une page
  const startEditing = (page: PageData, mode: EditorType) => {
    setSelectedPage(page)
    setEditorMode(mode)
    setIsEditing(true)
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

  // Si mode édition, afficher l'éditeur en plein écran
  if (isEditing && selectedPage) {
    if (editorMode === 'visual') {
      return (
        <div className="min-h-screen p-4">
          <VisualPageEditor 
            pageData={selectedPage}
            onSave={saveVisualPage}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )
    } else if (editorMode === 'modular') {
      return (
        <div className="min-h-screen p-4">
          <ModularEditor 
            pageData={selectedPage}
            onSave={saveVisualPage}
            onCancel={() => setIsEditing(false)}
          />
        </div>
      )
    }
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
            <div className="space-y-1">
              <p className="text-sm text-gray-500 mb-2">Cliquez sur une page pour la modifier :</p>
              <ul className="space-y-1 mb-4">
                {pages.map(page => (
                  <li key={page.id} className="border-b pb-2 mb-2 last:border-0">
                    <div className={`text-left rounded ${selectedPage?.id === page.id ? 'font-medium text-blue-600' : ''}`}>
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="block">{page.title}</span>
                          <span className="text-gray-500 text-xs">/{page.slug}</span>
                        </div>
                        <div className="flex gap-1">
                          {/* Bouton d'édition standard */}
                          <button
                            onClick={() => selectPage(page)}
                            className="p-1 text-gray-500 hover:text-blue-600"
                            title="Voir les options d'édition"
                          >
                            <i className="fas fa-edit text-sm"></i>
                          </button>
                          
                          {/* Bouton d'édition modulaire */}
                          <button
                            onClick={() => startEditing(page, 'modular')}
                            className="p-1 text-gray-500 hover:text-green-600"
                            title="Éditer avec l'éditeur modulaire"
                          >
                            <i className="fas fa-th-large text-sm"></i>
                          </button>
                          
                          {/* Bouton de prévisualisation */}
                          <a
                            href={`/${page.slug}`}
                            target="_blank"
                            className="p-1 text-gray-500 hover:text-purple-600"
                            title="Voir la page sur le site"
                          >
                            <i className="fas fa-eye text-sm"></i>
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
                {pages.length === 0 && (
                  <li className="text-gray-500 italic px-3 py-2">
                    Aucune page trouvée. Créez votre première page.
                  </li>
                )}
              </ul>
            </div>
          </div>

          {/* Options d'édition à droite */}
          <div className="lg:col-span-3">
            {selectedPage ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold">Édition de "{selectedPage.title}"</h3>
                    <p className="text-sm text-gray-500">Choisissez comment modifier cette page</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-8">
                  <h4 className="text-lg font-semibold mb-6">Choisissez un mode d'édition :</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Option d'édition modulaire */}
                    <div 
                      className="border rounded-lg p-6 hover:shadow-md cursor-pointer transition-shadow bg-blue-50"
                      onClick={() => startEditing(selectedPage, 'modular')}
                    >
                      <div className="text-center mb-4">
                        <i className="fas fa-th-large text-4xl text-blue-600"></i>
                      </div>
                      <h5 className="font-medium text-center mb-2">Éditeur Modulaire</h5>
                      <p className="text-sm text-gray-600 text-center">
                        Utilisez des blocs prédéfinis pour construire votre page visuellement.
                      </p>
                      <div className="mt-4 text-center">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                          Commencer
                        </button>
                      </div>
                    </div>
                    
                    {/* Option d'édition visuelle avancée */}
                    <div 
                      className="border rounded-lg p-6 hover:shadow-md cursor-pointer transition-shadow"
                      onClick={() => startEditing(selectedPage, 'visual')}
                    >
                      <div className="text-center mb-4">
                        <i className="fas fa-palette text-4xl text-green-600"></i>
                      </div>
                      <h5 className="font-medium text-center mb-2">Éditeur Visuel</h5>
                      <p className="text-sm text-gray-600 text-center">
                        Éditeur type WordPress avec personnalisation libre.
                      </p>
                      <div className="mt-4 text-center">
                        <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                          Commencer
                        </button>
                      </div>
                    </div>
                    
                    {/* Option d'édition texte riche */}
                    <div 
                      className="border rounded-lg p-6 hover:shadow-md cursor-pointer transition-shadow"
                      onClick={() => {
                        setEditorMode('rich')
                        selectPage(selectedPage)
                      }}
                    >
                      <div className="text-center mb-4">
                        <i className="fas fa-paragraph text-4xl text-gray-600"></i>
                      </div>
                      <h5 className="font-medium text-center mb-2">Éditeur Basique</h5>
                      <p className="text-sm text-gray-600 text-center">
                        Éditeur de texte riche basique pour des modifications simples.
                      </p>
                      <div className="mt-4 text-center">
                        <button className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
                          Commencer
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Instructions et conseils */}
                  <div className="mt-8 bg-gray-50 p-4 rounded-md">
                    <h5 className="font-medium mb-2 flex items-center">
                      <i className="fas fa-lightbulb text-yellow-500 mr-2"></i> Conseils
                    </h5>
                    <ul className="text-sm text-gray-600 space-y-2 list-disc pl-5">
                      <li>L'<strong>éditeur modulaire</strong> est recommandé pour la plupart des cas d'utilisation.</li>
                      <li>Utilisez l'<strong>éditeur visuel</strong> uniquement si vous avez besoin de personnalisations avancées.</li>
                      <li>L'<strong>éditeur basique</strong> est utile pour de simples corrections de texte.</li>
                      <li>Prévisualisez toujours vos modifications avant de publier.</li>
                    </ul>
                  </div>
                </div>

                {/* Éditeur de texte riche si sélectionné */}
                {editorMode === 'rich' && (
                  <div className="bg-white rounded-lg shadow-lg p-8 mt-6">
                    <h4 className="text-lg font-semibold mb-4">Édition de texte</h4>
                    
                    <div className="mb-4">
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
                )}
              </div>
            ) : (
              <div className="bg-gray-50 rounded-md p-8 text-center">
                <p className="mb-4 text-gray-600">Sélectionnez une page à modifier ou créez-en une nouvelle</p>
                <div className="bg-blue-50 p-4 rounded-md text-blue-800 text-sm">
                  <h3 className="font-bold mb-2"><i className="fas fa-lightbulb text-yellow-500 mr-2"></i> Astuce</h3>
                  <p>Vous pouvez maintenant modifier vos pages avec l'éditeur modulaire qui vous permet d'ajouter facilement des blocs de contenu prédéfinis tout en maintenant une cohérence visuelle !</p>
                </div>
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