import PageContent from '@/components/PageContent'
import BlogGrid from '@/components/BlogGrid'

export default function BlogPage() {
  return (
    <div className="min-h-screen">
      {/* En-tête de la page */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Blog</h1>
          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            Découvrez nos articles, conseils et actualités dans le domaine de l'intégration audiovisuelle.
          </p>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-16">
        {/* Grille d'articles */}
        <BlogGrid />
        
        {/* Newsletter */}
        <div className="bg-blue-50 rounded-lg p-8 mt-16 text-center">
          <h2 className="text-2xl font-bold mb-4">Restez informé</h2>
          <p className="text-lg mb-6">
            Abonnez-vous à notre newsletter pour recevoir nos derniers articles et actualités.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="Votre adresse email"
              className="flex-grow px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors whitespace-nowrap"
            >
              S'abonner
            </button>
          </form>
          <p className="text-sm text-gray-500 mt-4">
            En vous abonnant, vous acceptez de recevoir nos communications. Vous pourrez vous désabonner à tout moment.
          </p>
        </div>
        
        {/* Contenu dynamique chargé depuis Supabase */}
        <div className="mt-16">
          <PageContent slug="blog" fallbackContent={<></>} />
        </div>
      </div>
    </div>
  )
} 