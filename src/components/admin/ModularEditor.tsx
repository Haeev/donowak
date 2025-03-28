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
  
  // Initialiser les modules à partir du contenu existant
  useEffect(() => {
    if (pageData.content?.modules) {
      setModules(pageData.content.modules)
    } else {
      // Analyser le HTML existant pour extraire les sections
      const parser = new DOMParser()
      const doc = parser.parseFromString(pageData.content?.html || '', 'text/html')
      const sections = doc.querySelectorAll('section, .module-section')
      
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
  }
  
  const handleDrop = (e: React.DragEvent, position: number) => {
    e.preventDefault()
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
    <div className="w-full bg-white shadow-md rounded-lg overflow-hidden">
      {/* En-tête avec titre et actions */}
      <div className="border-b bg-gray-50 p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
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
              className="bg-white text-gray-700 border border-gray-300 py-2 px-4 rounded shadow-sm hover:bg-gray-50"
              disabled={saving}
            >
              Annuler
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className={`bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded shadow-sm ${saving ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {saving ? 'Sauvegarde...' : 'Sauvegarder'}
            </button>
          </div>
        </div>
      </div>

      {/* Barre d'outils */}
      <div className="border-b bg-white p-3 flex space-x-4 items-center">
        <div className="font-medium text-gray-700">Disposition :</div>
        <div className="flex border rounded overflow-hidden">
          <button 
            className={`px-3 py-1 text-sm ${currentLayout === '1-column' ? 'bg-blue-50 text-blue-700 border-r' : 'bg-white text-gray-700 border-r hover:bg-gray-50'}`}
            onClick={() => setCurrentLayout('1-column')}
          >
            1 colonne
          </button>
          <button 
            className={`px-3 py-1 text-sm ${currentLayout === '2-columns' ? 'bg-blue-50 text-blue-700 border-r' : 'bg-white text-gray-700 border-r hover:bg-gray-50'}`}
            onClick={() => setCurrentLayout('2-columns')}
          >
            2 colonnes
          </button>
          <button 
            className={`px-3 py-1 text-sm ${currentLayout === '3-columns' ? 'bg-blue-50 text-blue-700' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
            onClick={() => setCurrentLayout('3-columns')}
          >
            3 colonnes
          </button>
        </div>
      </div>

      {/* Message d'erreur */}
      {error && (
        <div className="p-3 m-4 bg-red-50 text-red-700 rounded-md border border-red-200">
          {error}
        </div>
      )}

      <div className="flex h-[calc(100vh-250px)]">
        {/* Panneau des modules */}
        <div className="w-64 bg-gray-50 border-r p-4 overflow-y-auto">
          <h3 className="font-medium text-gray-700 mb-3">Modules disponibles</h3>
          
          <div className="space-y-2">
            {modulesList.map((moduleType: ModuleType) => (
              <div 
                key={moduleType.type}
                className="bg-white border rounded p-3 cursor-move hover:shadow-sm transition-shadow"
                draggable
                onDragStart={() => handleDragStart({...moduleType, isTemplate: true})}
              >
                <div className="flex items-center">
                  <div className="mr-2 text-blue-500">
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
          
          <div className="mt-4 p-3 bg-blue-50 text-blue-800 rounded-md text-sm">
            <p className="font-medium mb-1">Comment utiliser :</p>
            <ol className="list-decimal ml-4 space-y-1">
              <li>Glissez-déposez les modules dans la zone d'édition</li>
              <li>Modifiez leur contenu en cliquant dessus</li>
              <li>Réorganisez les modules avec les flèches</li>
            </ol>
          </div>
        </div>
        
        {/* Zone d'édition */}
        <div className="flex-grow p-6 bg-gray-100 overflow-y-auto">
          <div className={`mx-auto ${
            currentLayout === '1-column' ? 'max-w-4xl' : 
            currentLayout === '2-columns' ? 'max-w-5xl' : 
            'max-w-6xl'
          }`}>
            {/* Zone de dépôt initiale */}
            {modules.length === 0 && (
              <div 
                className="border-2 border-dashed border-gray-300 rounded-lg p-10 text-center bg-white"
                onDragOver={(e) => handleDragOver(e, 0)}
                onDrop={(e) => handleDrop(e, 0)}
              >
                <div className="text-gray-500">
                  <i className="fas fa-plus-circle text-3xl mb-2"></i>
                  <p>Glissez et déposez des modules ici pour créer votre page</p>
                </div>
              </div>
            )}
            
            {/* Liste des modules */}
            {modules.map((module, index) => (
              <div key={module.id} className="mb-4">
                {/* Zone de dépôt avant le module */}
                <div 
                  className="h-4 w-full relative"
                  onDragOver={(e) => handleDragOver(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                >
                  <div className="absolute inset-0 m-auto h-1 w-full bg-transparent hover:bg-blue-300 transition-colors"></div>
                </div>
                
                {/* Module */}
                <div 
                  className="border bg-white rounded-lg shadow-sm overflow-hidden"
                  draggable
                  onDragStart={() => handleDragStart(module)}
                >
                  {/* Barre d'outils du module */}
                  <div className="flex items-center justify-between bg-gray-50 border-b p-2">
                    <div className="flex items-center text-sm text-gray-700">
                      <i className={`fas ${modulesList.find((m: ModuleType) => m.type === module.type)?.icon || 'fa-cube'} mr-2`}></i>
                      <span>{modulesList.find((m: ModuleType) => m.type === module.type)?.name || 'Module'}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <button 
                        onClick={() => moveModule(module.id, 'up')} 
                        disabled={index === 0}
                        className={`p-1 rounded hover:bg-gray-200 ${index === 0 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}`}
                        title="Déplacer vers le haut"
                      >
                        <i className="fas fa-arrow-up"></i>
                      </button>
                      <button 
                        onClick={() => moveModule(module.id, 'down')} 
                        disabled={index === modules.length - 1}
                        className={`p-1 rounded hover:bg-gray-200 ${index === modules.length - 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700'}`}
                        title="Déplacer vers le bas"
                      >
                        <i className="fas fa-arrow-down"></i>
                      </button>
                      <button 
                        onClick={() => removeModule(module.id)}
                        className="p-1 rounded hover:bg-red-100 text-red-600"
                        title="Supprimer"
                      >
                        <i className="fas fa-trash"></i>
                      </button>
                    </div>
                  </div>
                  
                  {/* Contenu du module */}
                  <div className="p-4">
                    {/* Afficher le contenu du module selon son type */}
                    {module.type === 'text' && (
                      <div 
                        className="min-h-[100px] prose max-w-none"
                        contentEditable
                        suppressContentEditableWarning={true}
                        onBlur={(e) => updateModuleContent(module.id, e.currentTarget.innerHTML)}
                        dangerouslySetInnerHTML={{ __html: module.content }}
                      ></div>
                    )}
                    
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
                    className="h-4 w-full relative mt-2"
                    onDragOver={(e) => handleDragOver(e, index + 1)}
                    onDrop={(e) => handleDrop(e, index + 1)}
                  >
                    <div className="absolute inset-0 m-auto h-1 w-full bg-transparent hover:bg-blue-300 transition-colors"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ModularEditor 