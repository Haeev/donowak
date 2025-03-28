import PageContent from '@/components/PageContent'
import HistorySection from '@/components/HistorySection'
import TeamSection from '@/components/TeamSection'
import ValuesSection from '@/components/ValuesSection'
import CTASection from '@/components/CTASection'

export default function AProposPage() {
  return (
    <div className="min-h-screen">
      {/* En-tête de la page */}
      <div className="bg-blue-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold mb-4">À Propos de Donowak</h1>
          <p className="text-xl max-w-3xl mx-auto text-blue-100">
            Découvrez notre histoire, notre équipe et nos valeurs.
          </p>
        </div>
      </div>
      
      {/* Contenu principal */}
      <div className="container mx-auto px-4 py-16">
        {/* Section Histoire */}
        <HistorySection />
        
        {/* Section Équipe */}
        <TeamSection />
        
        {/* Section Valeurs */}
        <ValuesSection />
        
        {/* Contenu dynamique chargé depuis Supabase */}
        <div className="mt-16">
          <PageContent slug="a-propos" fallbackContent={<></>} />
        </div>
      </div>
      
      {/* Section CTA */}
      <CTASection />
    </div>
  )
} 