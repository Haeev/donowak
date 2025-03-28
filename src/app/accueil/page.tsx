export default function AccueilPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-4">Accueil Donowak</h1>
      <p className="mb-8">Bienvenue sur le site de Donowak, votre partenaire en intégration audiovisuelle.</p>

      {/* Section Présentation Courte */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Nos Services</h2>
        {/* Placeholder pour contenu */}
        <p>Présentation rapide des services principaux...</p>
      </section>

      {/* Section Appel à l'action */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Contactez-nous</h2>
        {/* Placeholder pour bouton/formulaire */}
        <p>Appel à l&apos;action vers les services ou la prise de contact...</p>
      </section>
    </div>
  );
} 