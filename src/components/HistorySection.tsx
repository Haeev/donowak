export default function HistorySection() {
  return (
    <div className="py-12">
      <h2 className="text-3xl font-bold mb-8 text-center">Notre histoire</h2>
      
      <div className="bg-white rounded-lg shadow-lg p-8 mb-12 relative overflow-hidden">
        {/* Cercle décoratif */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-100 -mt-16 -mr-16 z-0 opacity-50"></div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-semibold mb-6 text-blue-900">Fondation et vision</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="md:col-span-2">
              <p className="text-gray-700 mb-4">
                Fondée en 2020, Donowak est née de la passion de ses fondateurs pour les technologies audiovisuelles et de leur volonté de proposer des solutions d'intégration sur mesure aux entreprises de toutes tailles.
              </p>
              <p className="text-gray-700 mb-4">
                Notre vision était simple mais ambitieuse : rendre accessibles les technologies audiovisuelles professionnelles à toutes les entreprises, quelle que soit leur taille, et offrir un service d'excellence de bout en bout.
              </p>
              <p className="text-gray-700">
                Dès nos débuts, nous avons mis l'accent sur la qualité, la fiabilité et l'innovation, des valeurs qui continuent de guider notre développement aujourd'hui.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">2020</span>
              </div>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-6 text-blue-900">Développement et expertise</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="order-2 md:order-1 flex items-center justify-center">
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">2020-2023</span>
              </div>
            </div>
            <div className="order-1 md:order-2 md:col-span-2">
              <p className="text-gray-700 mb-4">
                Au fil des années, nous avons développé une expertise reconnue dans le domaine de l'intégration audiovisuelle professionnelle, en nous adaptant constamment aux évolutions technologiques et aux besoins spécifiques de nos clients.
              </p>
              <p className="text-gray-700 mb-4">
                Nous avons constitué une équipe de professionnels passionnés et expérimentés, chacun expert dans son domaine, pour offrir à nos clients un service complet et de qualité.
              </p>
              <p className="text-gray-700">
                Notre approche sur mesure et notre engagement envers l'excellence nous ont permis de bâtir des relations durables avec nos clients et de développer notre réputation dans le secteur.
              </p>
            </div>
          </div>
          
          <h3 className="text-2xl font-semibold mb-6 text-blue-900">Aujourd'hui et demain</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2">
              <p className="text-gray-700 mb-4">
                Aujourd'hui, Donowak est fière de compter parmi ses clients des entreprises de renom, des institutions éducatives et des organismes publics qui nous font confiance pour leurs projets d'équipement audiovisuel.
              </p>
              <p className="text-gray-700 mb-4">
                Notre engagement envers l'innovation nous pousse à rester à l'avant-garde des technologies audiovisuelles pour offrir à nos clients les solutions les plus performantes et les plus adaptées à leurs besoins.
              </p>
              <p className="text-gray-700">
                L'avenir s'annonce passionnant pour Donowak, avec de nouveaux défis à relever et de nouvelles opportunités à saisir pour continuer à transformer les espaces de travail et améliorer la communication de nos clients.
              </p>
            </div>
            <div className="flex items-center justify-center">
              <div className="w-full h-48 bg-gray-200 rounded-lg flex items-center justify-center">
                <span className="text-gray-500">2023+</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 