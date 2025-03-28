export default function ValuesSection() {
  const values = [
    {
      title: "Excellence",
      description: "Nous nous engageons à fournir des solutions de la plus haute qualité, en utilisant les meilleures technologies disponibles et en assurant une installation et un service irréprochables.",
      icon: "🌟"
    },
    {
      title: "Innovation",
      description: "Nous restons constamment à l'affût des dernières avancées technologiques pour proposer à nos clients des solutions innovantes et performantes.",
      icon: "💡"
    },
    {
      title: "Écoute client",
      description: "Nous prenons le temps d'écouter et de comprendre les besoins spécifiques de chaque client pour proposer des solutions parfaitement adaptées à leurs attentes et contraintes.",
      icon: "👂"
    },
    {
      title: "Durabilité",
      description: "Nous privilégions des solutions durables et évolutives, conçues pour s'adapter aux besoins futurs de nos clients et respectueuses de l'environnement.",
      icon: "🌱"
    }
  ]

  return (
    <div className="py-12 bg-blue-50 rounded-lg">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">Nos valeurs</h2>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto text-center mb-12">
          Chez Donowak, nous sommes guidés par des valeurs fortes qui définissent notre approche et notre engagement envers nos clients.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-5xl mb-4 text-center">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-3 text-center">{value.title}</h3>
              <p className="text-gray-600 text-center">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 