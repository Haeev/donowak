'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'

interface PageContentProps {
  slug: string
  fallbackContent?: React.ReactNode
}

export default function PageContent({ slug, fallbackContent }: PageContentProps) {
  const [content, setContent] = useState<string>('')
  const [title, setTitle] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<boolean>(false)
  const supabase = createClient()

  useEffect(() => {
    async function fetchPageContent() {
      setLoading(true)
      setError(false)

      const { data, error } = await supabase
        .from('pages')
        .select('title, content')
        .eq('slug', slug)
        .single()

      if (error) {
        console.error('Erreur lors du chargement de la page:', error)
        setError(true)
        setLoading(false)
        return
      }

      if (data) {
        setTitle(data.title || '')
        setContent(data.content?.html || '')
      }
      
      setLoading(false)
    }

    fetchPageContent()
  }, [slug, supabase])

  if (loading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 bg-gray-200 rounded w-3/4 mb-4"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
      </div>
    )
  }

  if (error || !content) {
    return (
      <>
        {fallbackContent || (
          <div className="py-8 text-center">
            <h1 className="text-2xl font-semibold mb-4">{title || 'Page non trouvée'}</h1>
            <p className="text-gray-600">
              Le contenu de cette page n&apos;est pas disponible pour le moment.
            </p>
          </div>
        )}
      </>
    )
  }

  return (
    <div>
      {title && <h1 className="text-3xl font-bold mb-6">{title}</h1>}
      <div 
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </div>
  )
} 