export default function PrestationsPage() {
  return (
    <div className="min-h-screen p-8">
      <h1 className="text-3xl font-bold mb-8">Nos Prestations</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Intégration Audiovisuelle</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Installation d&apos;écrans</li>
          <li>Barres de visioconférence</li>
          <li>Équipements de salles de réunion</li>
          <li>Affichage dynamique</li>
        </ul>
        {/* Placeholder pour description détaillée */}
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Services Complémentaires</h2>
        <ul className="list-disc list-inside space-y-2">
          <li>Formation</li>
          <li>Audit matériel</li>
          {/* Ajouter d'autres services si nécessaire */}
        </ul>
         {/* Placeholder pour description détaillée */}
      </section>
    </div>
  );
} 