'use client'

import { useEditor, EditorContent, Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import { useState } from 'react'

interface RichTextEditorProps {
  initialContent: string
  onChange: (html: string) => void
  height?: string
}

// Barre d'outils personnalisée pour l'éditeur
const MenuBar = ({ editor }: { editor: Editor | null }) => {
  const [imageUrl, setImageUrl] = useState('')

  if (!editor) {
    return null
  }

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run()
      setImageUrl('')
    }
  }

  const setLink = () => {
    const url = window.prompt('URL:')
    if (url) {
      editor.chain().focus().setLink({ href: url }).run()
    }
  }

  return (
    <div className="border-b border-gray-200 mb-4 pb-2 flex flex-wrap gap-1">
      {/* Formatage de texte */}
      <button
        onClick={() => editor.chain().focus().toggleBold().run()}
        className={`p-2 rounded ${editor.isActive('bold') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Gras"
      >
        <strong>B</strong>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleItalic().run()}
        className={`p-2 rounded ${editor.isActive('italic') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Italique"
      >
        <em>I</em>
      </button>
      <button
        onClick={() => editor.chain().focus().toggleStrike().run()}
        className={`p-2 rounded ${editor.isActive('strike') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Barré"
      >
        <s>S</s>
      </button>

      <span className="mx-1 text-gray-300">|</span>

      {/* Titres */}
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Titre 1"
      >
        H1
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Titre 2"
      >
        H2
      </button>
      <button
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        className={`p-2 rounded ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Titre 3"
      >
        H3
      </button>

      <span className="mx-1 text-gray-300">|</span>

      {/* Listes */}
      <button
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        className={`p-2 rounded ${editor.isActive('bulletList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Liste à puces"
      >
        • Liste
      </button>
      <button
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        className={`p-2 rounded ${editor.isActive('orderedList') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Liste numérotée"
      >
        1. Liste
      </button>

      <span className="mx-1 text-gray-300">|</span>

      {/* Liens et images */}
      <button
        onClick={setLink}
        className={`p-2 rounded ${editor.isActive('link') ? 'bg-gray-200' : 'hover:bg-gray-100'}`}
        title="Ajouter un lien"
      >
        🔗
      </button>

      <div className="flex items-center ml-2">
        <input
          type="text"
          value={imageUrl}
          onChange={e => setImageUrl(e.target.value)}
          placeholder="URL de l'image"
          className="border rounded-l px-2 py-1 text-sm w-40"
        />
        <button
          onClick={addImage}
          className="bg-blue-500 text-white px-2 py-1 rounded-r text-sm"
          title="Insérer une image"
        >
          📷
        </button>
      </div>
    </div>
  )
}

export default function RichTextEditor({ initialContent, onChange, height = '300px' }: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: initialContent,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML())
    },
  })

  return (
    <div className="border rounded-md overflow-hidden">
      <MenuBar editor={editor} />
      <EditorContent 
        editor={editor} 
        className="p-4 prose max-w-none focus:outline-none" 
        style={{ minHeight: height, maxHeight: 'calc(2 * ' + height + ')', overflowY: 'auto' }}
      />
    </div>
  )
} 