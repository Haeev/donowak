'use client'

import { useEffect, useState } from 'react'
import { modulesList, ModuleType } from './ModulesConfig'

// Définir le type du module
interface Module {
  id: string;
  type: string;
  content: string;
  position: number;
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
  const [title, setTitle] = useState(pageData.title)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [modules, setModules] = useState<Array<any>>([])
  const [draggedModule, setDraggedModule] = useState<any>(null)
  const [currentLayout, setCurrentLayout] = useState('1-column') // '1-column', '2-columns', '3-columns'
  const [activeTab, setActiveTab] = useState('modules') // 'modules', 'settings'
  const [showPreview, setShowPreview] = useState(false)
  
  // Initialiser les modules à partir du contenu existant
  useEffect(() => {
    if (pageData.content?.modules) {
      setModules(pageData.content.modules)
    } else {
      // Analyser le HTML existant pour extraire les sections
      try {
        // Utiliser DOMParser seulement côté client
        const parser = new DOMParser()
        const doc = parser.parseFromString(pageData.content?.html || '', 'text/html')
        const sections = doc.querySelectorAll('section, .module-section, .container div > *')
        
        const extractedModules: any[] = []
        sections.forEach((section, index) => {
          extractedModules.push({
            id: `legacy-module-${index}`,
            type: 'html',
            content: section.outerHTML,
            position: index
          })
        })
        
        if (extractedModules.length > 0) {
          setModules(extractedModules)
        } else {
          // Si aucun contenu n'est trouvé, ajouter un module texte par défaut
          setModules([{
            id: 'default-text',
            type: 'text',
            content: '<h1>Titre de la page</h1><p>Contenu par défaut</p>',
            position: 0
          }])
        }
      } catch (error) {
        console.error("Erreur lors de l'analyse du HTML:", error)
        // Fallback avec un module par défaut
        setModules([{
          id: 'default-text',
          type: 'text',
          content: '<h1>Titre de la page</h1><p>Contenu par défaut</p>',
          position: 0
        }])
      }
    }
  }, [pageData.content])

  // Fonction pour ajouter un module
  const addModule = (moduleType: string) => {
    const moduleConfig = modulesList.find((m: ModuleType) => m.type === moduleType)
    if (!moduleConfig) return
    
    const newModule = {
      id: `module-${Date.now()}`,
      type: moduleType,
      content: moduleConfig.defaultContent,
      position: modules.length
    }
    
    setModules([...modules, newModule])
  }
  
  // Fonction pour supprimer un module
  const removeModule = (moduleId: string) => {
    setModules(modules.filter(m => m.id !== moduleId))
  }
  
  // Fonction pour déplacer un module
  const moveModule = (moduleId: string, direction: 'up' | 'down') => {
    const moduleIndex = modules.findIndex(m => m.id === moduleId)
    if (moduleIndex === -1) return
    
    const newModules = [...modules]
    
    if (direction === 'up' && moduleIndex > 0) {
      const temp = newModules[moduleIndex]
      newModules[moduleIndex] = newModules[moduleIndex - 1]
      newModules[moduleIndex - 1] = temp
    } else if (direction === 'down' && moduleIndex < modules.length - 1) {
      const temp = newModules[moduleIndex]
      newModules[moduleIndex] = newModules[moduleIndex + 1]
      newModules[moduleIndex + 1] = temp
    }
    
    // Mettre à jour les positions
    newModules.forEach((module, index) => {
      module.position = index
    })
    
    setModules(newModules)
  }
  
  // Fonction pour mettre à jour le contenu d'un module
  const updateModuleContent = (moduleId: string, newContent: string) => {
    setModules(modules.map((m: Module) => m.id === moduleId ? { ...m, content: newContent } : m))
  }
  
  // Fonction pour gérer le glisser-déposer
  const handleDragStart = (module: any) => {
    setDraggedModule(module)
  }
  
  const handleDragOver = (e: React.DragEvent, position: number) => {
    e.preventDefault()
    // Ajouter une classe de survol
    if (e.currentTarget.classList) {
      e.currentTarget.classList.add('bg-indigo-100')
    }
  }
  
  const handleDragLeave = (e: React.DragEvent) => {
    // Supprimer la classe de survol
    if (e.currentTarget.classList) {
      e.currentTarget.classList.remove('bg-indigo-100')
    }
  }
  
  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault()
    
    // Supprimer la classe de survol
    if (e.currentTarget.classList) {
      e.currentTarget.classList.remove('bg-indigo-100')
    }
    
    if (!draggedModule) return
    
    // Si c'est un nouveau module
    if (draggedModule.isTemplate) {
      const moduleConfig = modulesList.find(m => m.type === draggedModule.type)
      if (!moduleConfig) return
      
      const newModule = {
        id: `module-${Date.now()}`,
        type: draggedModule.type,
        content: moduleConfig.defaultContent,
        position: position
      }
      
      const newModules = [...modules]
      newModules.splice(position, 0, newModule)
      
      // Mettre à jour les positions
      newModules.forEach((module, index) => {
        module.position = index
      })
      
      setModules(newModules)
    } 
    // Si c'est un module existant qu'on déplace
    else {
      const moduleIndex = modules.findIndex(m => m.id === draggedModule.id)
      if (moduleIndex === -1) return
      
      const newModules = [...modules]
      const [movedModule] = newModules.splice(moduleIndex, 1)
      newModules.splice(position, 0, movedModule)
      
      // Mettre à jour les positions
      newModules.forEach((module, index) => {
        module.position = index
      })
      
      setModules(newModules)
    }
    
    setDraggedModule(null)
  }
  
  // Fonction pour générer le HTML final
  const generateHTML = () => {
    const sortedModules = [...modules].sort((a, b) => a.position - b.position)
    
    let html = '<div class="page-content">'
    
    sortedModules.forEach(module => {
      if (module.type === 'html') {
        html += module.content
      } else {
        // Wrapper chaque module dans une section avec une classe CSS correspondante
        html += `<section class="module module-${module.type}">${module.content}</section>`
      }
    })
    
    html += '</div>'
    return html
  }
  
  // Fonction pour sauvegarder
  const handleSave = async () => {
    setSaving(true)
    setError('')
    
    try {
      const htmlContent = generateHTML()
      
      // Sauvegarder à la fois le HTML et les données de modules pour l'édition future
      const pageContent = {
        html: htmlContent,
        modules: modules,
        updatedAt: new Date().toISOString()
      }
      
      const success = await onSave(pageData.id, title, JSON.stringify(pageContent))
      
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
  
  return (
    <div className="w-full h-screen bg-[#F5F6FA] flex flex-col">
      {/* Header */}
      <header className="bg-white py-3 px-4 border-b flex justify-between items-center shadow-sm z-10">
        <div className="flex items-center gap-3">
          <button 
            onClick={onCancel}
            className="text-gray-500 hover:text-gray-700 p-2 rounded-full hover:bg-gray-100"
          >
            <i className="fas fa-arrow-left"></i>
          </button>
          <h1 className="font-medium text-xl">Modifier: {title}</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg">
            <button 
              className={`px-3 py-1.5 rounded-md ${showPreview ? 'text-gray-700' : 'bg-white text-blue-700 shadow-sm'}`}
              onClick={() => setShowPreview(false)}
            >
              Éditer
            </button>
            <button 
              className={`px-3 py-1.5 rounded-md ${!showPreview ? 'text-gray-700' : 'bg-white text-blue-700 shadow-sm'}`}
              onClick={() => setShowPreview(true)}
            >
              Aperçu
            </button>
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={onCancel}
              className="text-gray-700 border border-gray-300 bg-white hover:bg-gray-50 px-4 py-2 rounded-lg"
              disabled={saving}
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-1"
            >
              {saving ? (
                <>
                  <i className="fas fa-circle-notch fa-spin"></i>
                  Sauvegarde...
                </>
              ) : (
                <>
                  <i className="fas fa-save"></i>
                  Sauvegarder
                </>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Contenu principal */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar des modules */}
        <div className="w-64 bg-white border-r overflow-y-auto p-4 flex flex-col h-full">
          <div className="flex border-b pb-3 mb-3">
            <button 
              className={`flex-1 text-center py-2 ${activeTab === 'modules' ? 'text-indigo-600 border-b-2 border-indigo-600 -mb-3' : 'text-gray-500'}`}
              onClick={() => setActiveTab('modules')}
            >
              Modules
            </button>
            <button 
              className={`flex-1 text-center py-2 ${activeTab === 'settings' ? 'text-indigo-600 border-b-2 border-indigo-600 -mb-3' : 'text-gray-500'}`}
              onClick={() => setActiveTab('settings')}
            >
              Paramètres
            </button>
          </div>
          
          {activeTab === 'modules' && (
            <div className="space-y-2 overflow-y-auto flex-grow">
              {modulesList.map((moduleType: ModuleType) => (
                <div 
                  key={moduleType.type}
                  className="bg-white border rounded-lg p-3 cursor-move hover:shadow-sm transition-shadow hover:border-indigo-300"
                  draggable
                  onDragStart={() => handleDragStart({...moduleType, isTemplate: true})}
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-indigo-500 bg-indigo-50 w-10 h-10 rounded-md flex items-center justify-center">
                      <i className={`fas ${moduleType.icon}`}></i>
                    </div>
                    <div>
                      <div className="font-medium text-sm">{moduleType.name}</div>
                      <div className="text-xs text-gray-500">{moduleType.description}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {activeTab === 'settings' && (
            <div className="space-y-4 overflow-y-auto flex-grow">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Titre de la page
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mise en page
                </label>
                <div className="flex border rounded overflow-hidden">
                  <button 
                    className={`flex-1 px-3 py-1.5 text-sm ${currentLayout === '1-column' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' : 'bg-white text-gray-700'}`}
                    onClick={() => setCurrentLayout('1-column')}
                  >
                    1 colonne
                  </button>
                  <button 
                    className={`flex-1 px-3 py-1.5 text-sm ${currentLayout === '2-columns' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' : 'bg-white text-gray-700'}`}
                    onClick={() => setCurrentLayout('2-columns')}
                  >
                    2 colonnes
                  </button>
                  <button 
                    className={`flex-1 px-3 py-1.5 text-sm ${currentLayout === '3-columns' ? 'bg-indigo-50 text-indigo-700 border-b-2 border-indigo-500' : 'bg-white text-gray-700'}`}
                    onClick={() => setCurrentLayout('3-columns')}
                  >
                    3 colonnes
                  </button>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-indigo-50 text-indigo-800 rounded-md text-sm">
                <h3 className="font-medium mb-1 flex items-center">
                  <i className="fas fa-lightbulb text-indigo-500 mr-2"></i> Astuce
                </h3>
                <p className="text-sm">
                  Les modifications seront visibles immédiatement après la sauvegarde.
                </p>
              </div>
            </div>
          )}
          
          <div className="border-t mt-3 pt-3">
            <p className="text-xs text-gray-500 text-center">
              Glissez-déposez les modules sur la page
            </p>
          </div>
        </div>

        {/* Zone d'édition */}
        <div className="flex-grow p-6 bg-[#F5F6FA] overflow-y-auto relative">
          {/* Affichage du contenu en mode édition */}
          {!showPreview && (
            <div className={`mx-auto ${
              currentLayout === '1-column' ? 'max-w-4xl' : 
              currentLayout === '2-columns' ? 'max-w-5xl' : 
              'max-w-6xl'
            }`}>
              {/* Zone de dépôt initiale */}
              {modules.length === 0 && (
                <div 
                  className="border-2 border-dashed border-indigo-300 rounded-lg p-10 text-center bg-white"
                  onDragOver={(e) => handleDragOver(e, 0)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, 0)}
                >
                  <div className="text-indigo-500">
                    <i className="fas fa-plus-circle text-4xl mb-3"></i>
                    <p className="text-gray-600 text-lg font-medium">Glissez et déposez des modules ici pour créer votre page</p>
                    <p className="text-gray-500 text-sm mt-2">Ou sélectionnez un module dans le menu de gauche</p>
                  </div>
                </div>
              )}
              
              {/* Liste des modules */}
              {modules.map((module, index) => (
                <div key={module.id} className="mb-6">
                  {/* Zone de dépôt avant le module */}
                  <div 
                    className="h-10 w-full relative -mb-2 z-10"
                    onDragOver={(e) => handleDragOver(e, index)}
                    onDragLeave={handleDragLeave}
                    onDrop={(e) => handleDrop(e, index)}
                  >
                    <div className="absolute inset-0 m-auto h-4 w-full rounded-md transition-colors"></div>
                  </div>
                  
                  {/* Module */}
                  <div 
                    className="border bg-white rounded-lg shadow-sm overflow-hidden group"
                    draggable
                    onDragStart={() => handleDragStart(module)}
                  >
                    {/* Barre d'outils du module */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 absolute top-2 right-2 z-20 bg-white shadow-md rounded-lg p-1 flex space-x-1">
                      <button 
                        onClick={() => moveModule(module.id, 'up')} 
                        disabled={index === 0}
                        className={`p-1.5 rounded-md hover:bg-gray-100 ${index === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}`}
                        title="Déplacer vers le haut"
                      >
                        <i className="fas fa-arrow-up text-sm"></i>
                      </button>
                      <button 
                        onClick={() => moveModule(module.id, 'down')} 
                        disabled={index === modules.length - 1}
                        className={`p-1.5 rounded-md hover:bg-gray-100 ${index === modules.length - 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-700'}`}
                        title="Déplacer vers le bas"
                      >
                        <i className="fas fa-arrow-down text-sm"></i>
                      </button>
                      <button 
                        onClick={() => removeModule(module.id)}
                        className="p-1.5 rounded-md hover:bg-red-50 text-red-600"
                        title="Supprimer"
                      >
                        <i className="fas fa-trash text-sm"></i>
                      </button>
                    </div>
                    
                    {/* Icône de type de module */}
                    <div className="absolute top-2 left-2 z-20 bg-indigo-50 text-indigo-600 rounded-md p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <i className={`fas ${modulesList.find((m: ModuleType) => m.type === module.type)?.icon || 'fa-cube'} text-sm`}></i>
                    </div>
                    
                    {/* Contenu du module */}
                    <div className="p-6 relative">
                      <div className="absolute inset-0 bg-indigo-50 opacity-0 group-hover:opacity-5 pointer-events-none"></div>
                      
                      {/* Type Texte */}
                      {module.type === 'text' && (
                        <div 
                          className="min-h-[100px] prose max-w-none"
                          contentEditable
                          suppressContentEditableWarning={true}
                          onBlur={(e) => updateModuleContent(module.id, e.currentTarget.innerHTML)}
                          dangerouslySetInnerHTML={{ __html: module.content }}
                        ></div>
                      )}
                      
                      {/* Type Image */}
                      {module.type === 'image' && (
                        <div className="text-center">
                          {module.content ? (
                            <div className="relative group">
                              <img 
                                src={module.content} 
                                alt="" 
                                className="max-w-full mx-auto"
                              />
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                <button 
                                  className="bg-white text-gray-800 px-3 py-1 rounded-md shadow-sm"
                                  onClick={() => {
                                    const url = prompt('Entrez l\'URL de l\'image:', module.content)
                                    if (url) updateModuleContent(module.id, url)
                                  }}
                                >
                                  Modifier
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button 
                              className="bg-gray-100 border border-dashed border-gray-300 rounded-lg p-8 w-full text-gray-500 hover:bg-gray-50"
                              onClick={() => {
                                const url = prompt('Entrez l\'URL de l\'image:')
                                if (url) updateModuleContent(module.id, url)
                              }}
                            >
                              <i className="fas fa-image text-3xl mb-2"></i>
                              <p>Cliquez pour ajouter une image</p>
                            </button>
                          )}
                        </div>
                      )}
                      
                      {/* Type Vidéo */}
                      {module.type === 'video' && (
                        <div className="text-center">
                          {module.content ? (
                            <div className="relative group">
                              <iframe 
                                src={module.content} 
                                className="w-full aspect-video" 
                                frameBorder="0" 
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                allowFullScreen
                              ></iframe>
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 flex items-center justify-center transition-all opacity-0 group-hover:opacity-100">
                                <button 
                                  className="bg-white text-gray-800 px-3 py-1 rounded-md shadow-sm"
                                  onClick={() => {
                                    const url = prompt('Entrez l\'URL de la vidéo YouTube, Vimeo, etc.:', module.content)
                                    if (url) updateModuleContent(module.id, url)
                                  }}
                                >
                                  Modifier
                                </button>
                              </div>
                            </div>
                          ) : (
                            <button 
                              className="bg-gray-100 border border-dashed border-gray-300 rounded-lg p-8 w-full text-gray-500 hover:bg-gray-50"
                              onClick={() => {
                                const url = prompt('Entrez l\'URL de la vidéo YouTube, Vimeo, etc.:')
                                if (url) updateModuleContent(module.id, url)
                              }}
                            >
                              <i className="fas fa-video text-3xl mb-2"></i>
                              <p>Cliquez pour ajouter une vidéo</p>
                            </button>
                          )}
                        </div>
                      )}
                      
                      {/* Type Galerie */}
                      {module.type === 'gallery' && (
                        <div>
                          {module.content ? (
                            <div 
                              contentEditable
                              suppressContentEditableWarning={true}
                              onBlur={(e) => updateModuleContent(module.id, e.currentTarget.innerHTML)}
                              dangerouslySetInnerHTML={{ __html: module.content }}
                            ></div>
                          ) : (
                            <button 
                              className="bg-gray-100 border border-dashed border-gray-300 rounded-lg p-8 w-full text-gray-500 hover:bg-gray-50"
                              onClick={() => updateModuleContent(module.id, `
                                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                                  <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
                                  <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
                                  <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
                                  <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
                                  <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
                                  <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
                                </div>
                              `)}
                            >
                              <i className="fas fa-images text-3xl mb-2"></i>
                              <p>Cliquez pour ajouter une galerie</p>
                            </button>
                          )}
                        </div>
                      )}
                      
                      {/* Type Testimonial */}
                      {module.type === 'testimonial' && (
                        <div>
                          {module.content ? (
                            <div 
                              contentEditable
                              suppressContentEditableWarning={true}
                              onBlur={(e) => updateModuleContent(module.id, e.currentTarget.innerHTML)}
                              dangerouslySetInnerHTML={{ __html: module.content }}
                            ></div>
                          ) : (
                            <button 
                              className="bg-gray-100 border border-dashed border-gray-300 rounded-lg p-8 w-full text-gray-500 hover:bg-gray-50"
                              onClick={() => updateModuleContent(module.id, `
                                <div class="bg-gray-50 p-6 rounded-lg">
                                  <p class="italic mb-4">"Ce service a transformé notre façon de travailler. L'équipe a été professionnelle et attentive à nos besoins spécifiques."</p>
                                  <div class="flex items-center">
                                    <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
                                    <div>
                                      <p class="font-medium">Nom du Client</p>
                                      <p class="text-sm text-gray-600">Poste, Entreprise</p>
                                    </div>
                                  </div>
                                </div>
                              `)}
                            >
                              <i className="fas fa-quote-right text-3xl mb-2"></i>
                              <p>Cliquez pour ajouter un témoignage</p>
                            </button>
                          )}
                        </div>
                      )}
                      
                      {/* Type CTA */}
                      {module.type === 'cta' && (
                        <div>
                          {module.content ? (
                            <div 
                              contentEditable
                              suppressContentEditableWarning={true}
                              onBlur={(e) => updateModuleContent(module.id, e.currentTarget.innerHTML)}
                              dangerouslySetInnerHTML={{ __html: module.content }}
                            ></div>
                          ) : (
                            <button 
                              className="bg-gray-100 border border-dashed border-gray-300 rounded-lg p-8 w-full text-gray-500 hover:bg-gray-50"
                              onClick={() => updateModuleContent(module.id, `
                                <div class="bg-indigo-600 text-white rounded-lg p-8 text-center">
                                  <h3 class="text-2xl font-bold mb-4">Prêt à passer à l'action?</h3>
                                  <p class="mb-6">Contactez-nous dès aujourd'hui pour une consultation gratuite</p>
                                  <a href="/contact" class="inline-block bg-white text-indigo-600 font-bold py-3 px-6 rounded-lg hover:bg-indigo-50 transition-colors">Nous contacter</a>
                                </div>
                              `)}
                            >
                              <i className="fas fa-bullhorn text-3xl mb-2"></i>
                              <p>Cliquez pour ajouter un appel à l'action</p>
                            </button>
                          )}
                        </div>
                      )}
                      
                      {/* Type HTML générique */}
                      {module.type === 'html' && (
                        <div 
                          className="min-h-[100px]"
                          dangerouslySetInnerHTML={{ __html: module.content }}
                        ></div>
                      )}
                      
                      {/* Ajouter d'autres types de modules selon les besoins */}
                    </div>
                  </div>
                  
                  {/* Zone de dépôt après le dernier module */}
                  {index === modules.length - 1 && (
                    <div 
                      className="h-20 w-full relative mt-2"
                      onDragOver={(e) => handleDragOver(e, index + 1)}
                      onDragLeave={handleDragLeave}
                      onDrop={(e) => handleDrop(e, index + 1)}
                    >
                      <div className="absolute inset-0 m-auto h-4 w-full rounded-md transition-colors"></div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          {/* Mode aperçu */}
          {showPreview && (
            <div className="w-full bg-white border rounded-lg p-4 shadow-sm">
              <div dangerouslySetInnerHTML={{ __html: generateHTML() }}></div>
            </div>
          )}
        </div>
      </div>
      
      {/* Message d'erreur flottant */}
      {error && (
        <div className="fixed bottom-4 right-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg shadow-lg z-50 flex items-center">
          <i className="fas fa-exclamation-circle mr-2"></i>
          {error}
          <button 
            className="ml-3 text-red-500 hover:text-red-700"
            onClick={() => setError('')}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>
      )}
    </div>
  )
}

export default ModularEditor 