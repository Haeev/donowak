export default function FeatureSection() {
  const features = [
    {
      icon: "🖥️", 
      title: "Écrans interactifs",
      description: "Installation d'écrans interactifs pour vos salles de réunion et espaces collaboratifs."
    },
    {
      icon: "📹", 
      title: "Visioconférence",
      description: "Solutions complètes pour vos réunions à distance avec caméras HD et systèmes audio professionnels."
    },
    {
      icon: "🔊", 
      title: "Sonorisation",
      description: "Systèmes de sonorisation adaptés à tous types d'espaces pour une qualité audio optimale."
    },
    {
      icon: "📱", 
      title: "Affichage dynamique",
      description: "Solutions d'affichage dynamique pour diffuser vos contenus promotionnels ou informatifs."
    }
  ]

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Nos services d'intégration audiovisuelle</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
              <div className="text-4xl mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a 
            href="/prestations" 
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white py-3 px-8 rounded-md font-medium transition-colors"
          >
            Découvrir toutes nos prestations
          </a>
        </div>
      </div>
    </section>
  )
} 