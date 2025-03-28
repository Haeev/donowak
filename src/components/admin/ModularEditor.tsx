'use client'

import { useEffect, useRef, useState } from 'react'
import { moduleBlocks, moduleStylesCss } from './ModuleBlocks'
import 'grapesjs/dist/css/grapes.min.css'

// Import dynamique de GrapesJS pour éviter les erreurs SSR
const loadGrapesJS = async () => {
  const grapesjs = (await import('grapesjs')).default
  await import('grapesjs-preset-webpage')
  return grapesjs
}

interface ModularEditorProps {
  pageData: {
    id: string
    slug: string
    title: string
    content: any
  }
  onSave: (id: string, title: string, htmlContent: string) => Promise<boolean>
  onCancel: () => void
}

const ModularEditor = ({ pageData, onSave, onCancel }: ModularEditorProps) => {
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

  // Cette fonction va initialiser l'éditeur GrapesJS avec notre configuration personnalisée
  useEffect(() => {
    if (!isMounted || !editorRef.current) return

    let editor: any = null
    
    const initEditor = async () => {
      try {
        const grapesjs = await loadGrapesJS()
        
        // Charger le contenu HTML initial
        const initialContent = pageData.content?.html || `
          <div class="container mx-auto px-4 py-8 module-grid">
            <h1 data-gjs-editable="true">Titre de la page</h1>
            <p data-gjs-editable="true">Ajoutez du contenu à cette page en utilisant les modules disponibles.</p>
          </div>
        `
        
        // Configurer et initialiser l'éditeur
        editor = grapesjs.init({
          container: editorRef.current!,
          height: '80vh',
          width: 'auto',
          storageManager: false,
          deviceManager: {
            devices: [
              { name: 'Desktop', width: '', },
              { name: 'Tablette', width: '768px', },
              { name: 'Mobile', width: '320px', }
            ]
          },
          blockManager: {
            appendTo: '#blocks',
            blocks: []
          },
          layerManager: {
            appendTo: '.layers-container'
          },
          panels: { 
            defaults: [] 
          },
          styleManager: {
            appendTo: '.styles-container',
            sectors: [
              {
                name: 'Dimensions',
                open: false,
                properties: [
                  {
                    name: 'Padding',
                    property: 'padding',
                    type: 'composite',
                    properties: [
                      { name: 'Top', property: 'padding-top' },
                      { name: 'Right', property: 'padding-right' },
                      { name: 'Bottom', property: 'padding-bottom' },
                      { name: 'Left', property: 'padding-left' }
                    ],
                  },
                  {
                    name: 'Margin',
                    property: 'margin',
                    type: 'composite',
                    properties: [
                      { name: 'Top', property: 'margin-top' },
                      { name: 'Right', property: 'margin-right' },
                      { name: 'Bottom', property: 'margin-bottom' },
                      { name: 'Left', property: 'margin-left' }
                    ],
                  }
                ]
              },
              {
                name: 'Texte',
                open: false,
                properties: [
                  { name: 'Taille', property: 'font-size' },
                  { name: 'Poids', property: 'font-weight' },
                  { name: 'Couleur', property: 'color', type: 'color' },
                  { name: 'Alignement', property: 'text-align' },
                  { name: 'Interligne', property: 'line-height' }
                ]
              },
              {
                name: 'Couleurs',
                open: false,
                properties: [
                  { name: 'Couleur de fond', property: 'background-color', type: 'color' },
                  { name: 'Couleur de bordure', property: 'border-color', type: 'color' }
                ]
              },
              {
                name: 'Bordures',
                open: false,
                properties: [
                  { name: 'Largeur', property: 'border-width' },
                  { name: 'Style', property: 'border-style' },
                  { name: 'Rayon', property: 'border-radius' }
                ]
              }
            ]
          },
          plugins: ['gjs-preset-webpage'],
          pluginsOpts: {
            'gjs-preset-webpage': {
              modalImportTitle: 'Importer du contenu',
              modalImportLabel: 'Collez ou importez votre code HTML ici',
              modalImportContent: '',
            }
          },
          canvas: {
            styles: [
              // Inclure Tailwind et nos styles de modules
              'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css',
              { name: 'module-styles', content: moduleStylesCss }
            ],
          },
          // Utiliser le système de grille
          gridSystem: {
            rows: 12,
            columns: 12,
            cellHeight: 80,
            responsive: true
          }
        })

        // Ajouter les blocs modulaires
        moduleBlocks.forEach(blockData => {
          editor.BlockManager.add(blockData.id, {
            label: blockData.label,
            category: blockData.category,
            content: blockData.content,
            attributes: {
              class: blockData.gridClass
            }
          })
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

        // Ajouter le comportement de grille
        editor.on('component:selected', (component: any) => {
          // Mettre à jour le panneau de style avec les options de grille
          if (component.get('type') === 'module') {
            // Ajouter les options spécifiques aux modules
          }
        })

        // Désactiver certaines fonctionnalités pour maintenir la cohérence du design
        editor.on('component:drag:start', (component: any) => {
          // Permettre uniquement le déplacement des composants de type module
          if (component.get('type') !== 'module') {
            return false
          }
        })

        // Limiter les éditions aux éléments marqués comme éditables
        editor.on('component:selected', (component: any) => {
          const isEditable = component.get('attributes')['data-gjs-editable'] === 'true'
          if (!isEditable && component.get('type') !== 'module') {
            // Désactiver l'édition pour les éléments non éditables
            component.set('editable', false)
          }
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
      const css = editorInstance.current.getCss({ avoidProtected: true })
      
      // Ajouter le CSS en ligne si nécessaire (optionnel)
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
        <p className="mt-4">Chargement de l'éditeur modulaire...</p>
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
        
        <div className="flex h-[80vh]">
          {/* Panneau latéral pour les blocs et styles */}
          <div className="w-64 bg-gray-100 border-r overflow-auto">
            <div className="p-3">
              <h3 className="font-medium mb-2">Modules disponibles</h3>
              <div id="blocks" className="overflow-auto"></div>
            </div>
            
            <div className="border-t p-3">
              <h3 className="font-medium mb-2">Propriétés</h3>
              <div className="styles-container overflow-auto"></div>
            </div>
            
            <div className="border-t p-3">
              <h3 className="font-medium mb-2">Structure</h3>
              <div className="layers-container overflow-auto"></div>
            </div>
          </div>
          
          {/* Conteneur de l'éditeur GrapesJS */}
          <div className="flex-grow">
            <div ref={editorRef} className="gjs-editor"></div>
          </div>
        </div>
      </div>
      
      {/* Instructions d'aide */}
      <div className="mt-4 bg-blue-50 p-3 rounded-md text-sm text-blue-800">
        <p className="font-medium mb-1"><i className="fas fa-info-circle mr-1"></i> Comment utiliser l'éditeur :</p>
        <ol className="list-decimal ml-5 space-y-1">
          <li>Glissez-déposez les modules depuis le panneau latéral vers la page</li>
          <li>Cliquez sur un élément pour modifier son contenu ou ses propriétés</li>
          <li>Utilisez les poignées pour réorganiser les modules</li>
          <li>Seules les zones marquées comme éditables peuvent être modifiées</li>
        </ol>
      </div>
    </div>
  )
}

// Exporter avec dynamic pour éviter les problèmes SSR
export default ModularEditor 