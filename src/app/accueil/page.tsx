import PageContent from '@/components/PageContent'

export default function AccueilPage() {
  // Ce contenu de secours s'affichera uniquement si la page n'est pas trouvée dans Supabase
  const fallbackContent = (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Accueil Donowak</h1>
      <p className="mb-8">Bienvenue sur le site de Donowak, votre partenaire en intégration audiovisuelle.</p>

      {/* Section Présentation Courte */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nos Services</h2>
        <p>Présentation rapide des services principaux...</p>
      </section>

      {/* Section Appel à l'action */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>
        <p>Appel à l&apos;action vers les services ou la prise de contact...</p>
      </section>
    </div>
  )

  return (
    <div className="min-h-screen">
      {/* Charge le contenu dynamique de la page "accueil" depuis Supabase */}
      <PageContent slug="accueil" fallbackContent={fallbackContent} />
    </div>
  )
} 