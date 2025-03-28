interface ServiceItemProps {
  title: string
  description: string
  icon: string
  features?: string[]
  imageUrl?: string
  isReversed?: boolean
}

function ServiceItem({ title, description, icon, features, imageUrl, isReversed = false }: ServiceItemProps) {
  return (
    <div className={`flex flex-col ${isReversed ? 'lg:flex-row-reverse' : 'lg:flex-row'} bg-white rounded-lg shadow-lg overflow-hidden mb-12`}>
      {/* Image du service */}
      <div className="lg:w-2/5 bg-gray-200 flex items-center justify-center">
        {imageUrl ? (
          <img src={imageUrl} alt={title} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full min-h-[300px] flex items-center justify-center">
            <span className="text-6xl">{icon}</span>
          </div>
        )}
      </div>
      
      {/* Contenu du service */}
      <div className="lg:w-3/5 p-8">
        <h3 className="text-2xl font-bold mb-4">{title}</h3>
        <p className="text-gray-700 mb-6">{description}</p>
        
        {features && features.length > 0 && (
          <div>
            <h4 className="font-semibold mb-3">Ce que nous proposons :</h4>
            <ul className="space-y-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <span className="text-blue-600 mr-2">✓</span>
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  )
}

export default function ServiceSection() {
  const services = [
    {
      title: "Installation d'écrans interactifs",
      description: "Transformez vos salles de réunion et espaces collaboratifs avec nos solutions d'écrans interactifs haute définition.",
      icon: "🖥️",
      features: [
        "Écrans interactifs de différentes tailles (55\" à 98\")",
        "Installation et configuration complètes",
        "Formation à l'utilisation",
        "Intégration avec vos systèmes existants"
      ]
    },
    {
      title: "Solutions de visioconférence",
      description: "Optimisez vos réunions à distance avec nos systèmes de visioconférence professionnels.",
      icon: "📹",
      features: [
        "Barres de visioconférence tout-en-un",
        "Systèmes de caméras PTZ (Pan-Tilt-Zoom)",
        "Solutions audio haute performance",
        "Compatibilité avec toutes les plateformes (Teams, Zoom, Meet, etc.)"
      ],
      isReversed: true
    },
    {
      title: "Affichage dynamique",
      description: "Communiquez efficacement avec vos clients et collaborateurs grâce à nos solutions d'affichage dynamique.",
      icon: "📱",
      features: [
        "Écrans professionnels pour l'affichage continu",
        "Logiciels de gestion de contenu intuitifs",
        "Diffusion centralisée ou multi-sites",
        "Planification et automatisation des contenus"
      ]
    },
    {
      title: "Équipement de salles de réunion",
      description: "Des solutions complètes pour rendre vos réunions plus productives et collaboratives.",
      icon: "🔊",
      features: [
        "Systèmes de présentation sans fil",
        "Solutions de réservation de salles",
        "Sonorisation adaptée à l'acoustique de vos salles",
        "Systèmes de contrôle centralisés"
      ],
      isReversed: true
    }
  ]

  return (
    <div className="py-12">
      <div className="space-y-8">
        {services.map((service, index) => (
          <ServiceItem
            key={index}
            title={service.title}
            description={service.description}
            icon={service.icon}
            features={service.features}
            isReversed={service.isReversed}
          />
        ))}
      </div>
      
      {/* Services complémentaires */}
      <div className="mt-16">
        <h2 className="text-2xl font-bold mb-8">Services complémentaires</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🛠️</div>
            <h3 className="text-xl font-semibold mb-3">Maintenance et support</h3>
            <p className="text-gray-600">
              Nous assurons la maintenance et le support technique de vos installations pour garantir leur bon fonctionnement sur le long terme.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">📋</div>
            <h3 className="text-xl font-semibold mb-3">Audit et conseil</h3>
            <p className="text-gray-600">
              Nos experts réalisent un audit complet de vos besoins et vous conseillent sur les solutions les plus adaptées à votre environnement.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">👨‍🏫</div>
            <h3 className="text-xl font-semibold mb-3">Formation</h3>
            <p className="text-gray-600">
              Nous formons vos équipes à l'utilisation optimale de vos équipements pour en exploiter tout le potentiel.
            </p>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow">
            <div className="text-4xl mb-4">🔄</div>
            <h3 className="text-xl font-semibold mb-3">Mise à niveau</h3>
            <p className="text-gray-600">
              Nous vous accompagnons dans la mise à niveau de vos installations existantes pour intégrer les dernières technologies.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 