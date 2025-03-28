'use client'

import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import 'grapesjs/dist/css/grapes.min.css'

// Import uniquement côté client pour éviter les erreurs SSR
const loadGrapesJS = async () => {
  const grapesjs = (await import('grapesjs')).default
  await import('grapesjs-preset-webpage')
  return grapesjs
}

interface VisualPageEditorProps {
  pageData: {
    id: string
    slug: string
    title: string
    content: any
  }
  onSave: (id: string, title: string, htmlContent: string) => Promise<boolean>
  onCancel: () => void
}

const VisualPageEditor = ({ pageData, onSave, onCancel }: VisualPageEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const editorInstance = useRef<any>(null)
  const [title, setTitle] = useState(pageData.title)
  const [saving, setSaving] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [error, setError] = useState('')
  const [isFullscreen, setIsFullscreen] = useState(false)
  
  // Initialiser l'éditeur une fois que le composant est monté côté client
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Cette fonction va initialiser l'éditeur GrapesJS
  useEffect(() => {
    if (!isMounted || !editorRef.current) return

    let editor: any = null
    
    const initEditor = async () => {
      try {
        const grapesjs = await loadGrapesJS()
        
        // Charger le contenu HTML initial
        const initialContent = pageData.content?.html || '<div class="container"><h1>Contenu de la page</h1><p>Commencez à éditer cette page</p></div>'
        
        // Configurer et initialiser l'éditeur
        editor = grapesjs.init({
          container: editorRef.current!,
          height: '70vh',
          width: 'auto',
          storageManager: false,
          deviceManager: {
            devices: [
              { name: 'Desktop', width: '', },
              { name: 'Tablette', width: '768px', },
              { name: 'Mobile', width: '320px', }
            ]
          },
          panels: { defaults: [] },
          styleManager: { sectors: [] },
          plugins: ['gjs-preset-webpage'],
          pluginsOpts: {
            'gjs-preset-webpage': {
              // Options des plugins
              modalImportTitle: 'Importer du contenu',
              modalImportLabel: 'Collez ou importez votre code HTML ici',
              modalImportContent: '',
            }
          },
          canvas: {
            styles: [
              // Inclure les styles de Tailwind pour le rendu
              'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
            ],
          },
        })

        // Personnaliser l'interface de l'éditeur
        editor.Panels.addPanel({
          id: 'panel-top',
          el: '.panel-top',
        })

        editor.Panels.addPanel({
          id: 'basic-actions',
          el: '.panel-basic-actions',
          buttons: [
            {
              id: 'visibility',
              active: true,
              className: 'btn-toggle-borders',
              label: '<i class="fa fa-square-o"></i>',
              command: 'sw-visibility',
            },
            {
              id: 'preview',
              className: 'btn-preview',
              label: '<i class="fa fa-eye"></i>',
              command: 'preview',
            },
            {
              id: 'fullscreen',
              className: 'btn-fullscreen',
              label: '<i class="fa fa-expand"></i>',
              command: {
                run: (editor: any) => {
                  setIsFullscreen(true)
                  editor.refresh()
                },
                stop: (editor: any) => {
                  setIsFullscreen(false)
                  editor.refresh()
                }
              }
            },
            {
              id: 'undo',
              className: 'btn-undo',
              label: '<i class="fa fa-undo"></i>',
              command: 'undo',
            },
            {
              id: 'redo',
              className: 'btn-redo',
              label: '<i class="fa fa-repeat"></i>',
              command: 'redo',
            },
          ],
        })

        // Charger le contenu dans l'éditeur
        editor.setComponents(initialContent)
        
        // Stocker l'instance pour utilisation ultérieure
        editorInstance.current = editor
      } catch (err) {
        console.error('Erreur lors de l\'initialisation de l\'éditeur:', err)
        setError('Impossible de charger l\'éditeur. Veuillez réessayer.')
      }
    }

    initEditor()

    // Nettoyage lors du démontage du composant
    return () => {
      if (editorInstance.current) {
        editorInstance.current.destroy()
        editorInstance.current = null
      }
    }
  }, [isMounted, pageData.content?.html])

  // Fonction pour sauvegarder le contenu
  const handleSave = async () => {
    if (!editorInstance.current) return
    
    setSaving(true)
    setError('')
    
    try {
      // Récupérer le HTML de l'éditeur
      const htmlContent = editorInstance.current.getHtml()
      const css = editorInstance.current.getCss()
      
      // Ajouter le CSS en ligne (optionnel, selon vos besoins)
      const completeHtml = css 
        ? `${htmlContent}<style>${css}</style>` 
        : htmlContent
      
      // Appeler la fonction de sauvegarde passée en prop
      const success = await onSave(pageData.id, title, completeHtml)
      
      if (!success) {
        setError('Erreur lors de la sauvegarde. Veuillez réessayer.')
      }
    } catch (err) {
      console.error('Erreur lors de la sauvegarde:', err)
      setError('Une erreur est survenue lors de la sauvegarde.')
    } finally {
      setSaving(false)
    }
  }

  if (!isMounted) {
    return (
      <div className="w-full p-4 text-center">
        <div className="animate-pulse flex space-x-4">
          <div className="flex-1 space-y-6 py-1">
            <div className="h-4 bg-gray-200 rounded"></div>
            <div className="space-y-3">
              <div className="h-4 bg-gray-200 rounded"></div>
              <div className="h-4 bg-gray-200 rounded"></div>
            </div>
          </div>
        </div>
        <p className="mt-4">Chargement de l'éditeur visuel...</p>
      </div>
    )
  }

  return (
    <div className={`w-full ${isFullscreen ? 'fixed inset-0 bg-white z-50 p-4' : ''}`}>
      {/* En-tête avec titre et actions */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex-grow">
          <label htmlFor="page-title" className="block text-sm font-medium text-gray-700 mb-1">
            Titre de la page
          </label>
          <input
            id="page-title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-md shadow-sm p-2"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onCancel}
            className="bg-gray-100 text-gray-700 border border-gray-300 py-2 px-4 rounded hover:bg-gray-200"
            disabled={saving}
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded flex items-center ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {saving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}

      {/* Interface de l'éditeur */}
      <div className="gjs-editor-wrapper border rounded-md overflow-hidden">
        {/* Panneaux d'outils personnalisés */}
        <div className="panel-top flex bg-gray-100 border-b p-2 items-center">
          <div className="panel-basic-actions flex space-x-2">
            <button className="p-2 rounded hover:bg-gray-200" title="Afficher/masquer les bordures">
              <i className="fas fa-border-none"></i> Bordures
            </button>
            <button className="p-2 rounded hover:bg-gray-200" title="Prévisualiser">
              <i className="fas fa-eye"></i> Aperçu
            </button>
            <button className="p-2 rounded hover:bg-gray-200" title="Plein écran">
              <i className="fas fa-expand"></i> Plein écran
            </button>
            <button className="p-2 rounded hover:bg-gray-200" title="Annuler">
              <i className="fas fa-undo"></i> Annuler
            </button>
            <button className="p-2 rounded hover:bg-gray-200" title="Rétablir">
              <i className="fas fa-redo"></i> Rétablir
            </button>
          </div>
          <div className="ml-auto text-sm">
            <span className="text-gray-500">Slug: </span>
            <span className="font-mono">{pageData.slug}</span>
          </div>
        </div>
        
        {/* Conteneur de l'éditeur GrapesJS */}
        <div ref={editorRef} className="gjs-editor"></div>
      </div>
    </div>
  )
}

// Exporter avec dynamic pour éviter les problèmes SSR
export default dynamic(() => Promise.resolve(VisualPageEditor), {
  ssr: false
}) 