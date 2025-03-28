import PageContent from '@/components/PageContent'
import ServiceSection from '@/components/ServiceSection'
import CTASection from '@/components/CTASection'

export default function PrestationsPage() {
  return (
    <div className="min-h-screen">
      {/* En-tête de la page */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">Nos Prestations</h1>
          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            Découvrez nos solutions d'intégration audiovisuelle professionnelles pour transformer vos espaces de travail et optimiser votre communication.
          </p>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-16">
        {/* Section des services */}
        <ServiceSection />
        
        {/* Contenu dynamique chargé depuis Supabase */}
        <div className="mt-16">
          <PageContent slug="prestations" fallbackContent={<></>} />
        </div>
      </div>
      
      {/* Section CTA */}
      <CTASection />
    </div>
  )
} 