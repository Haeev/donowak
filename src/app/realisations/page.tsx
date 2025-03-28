import PageContent from '@/components/PageContent'
import ProjectGallery from '@/components/ProjectGallery'

export default function RealisationsPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-4 text-center">Nos Réalisations</h1>
      <p className="text-xl text-gray-600 text-center mb-12 max-w-3xl mx-auto">
        Découvrez quelques-uns de nos projets récents qui témoignent de notre expertise en intégration audiovisuelle professionnelle.
      </p>
      
      {/* Galerie de projets */}
      <ProjectGallery />
      
      {/* Contenu dynamique chargé depuis Supabase */}
      <div className="mt-16">
        <PageContent slug="realisations" fallbackContent={<></>} />
      </div>
      
      {/* Section CTA */}
      <div className="bg-blue-50 rounded-lg p-8 mt-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Vous avez un projet d'intégration audiovisuelle ?</h2>
        <p className="text-lg mb-6">
          Notre équipe d'experts est à votre disposition pour vous accompagner dans sa réalisation.
        </p>
        <a 
          href="/contact" 
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-md font-medium transition-colors"
        >
          Contactez-nous
        </a>
      </div>
    </div>
  )
} 