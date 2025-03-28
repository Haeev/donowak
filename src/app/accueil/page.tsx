import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Accueil',
  description: 'Donowak - Spécialiste de l\'intégration audiovisuelle pour les entreprises. Installation d\'écrans, barres de visioconférence, équipements de salles de réunion, affichage dynamique.'
}

export default function AccueilPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-900 to-indigo-900 text-white py-24 md:py-32 overflow-hidden">
        {/* Effet de particules/formes */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 rounded-full bg-blue-400"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-indigo-500"></div>
          <div className="absolute top-40 right-1/4 w-48 h-48 rounded-full bg-purple-500"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 md:pr-12 mb-12 md:mb-0">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Solutions d'intégration audiovisuelle professionnelles
              </h1>
              <p className="text-lg md:text-xl text-blue-100 mb-8 max-w-xl">
                Transformez vos espaces de travail avec des solutions audiovisuelles sur mesure pour améliorer la collaboration et la communication.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact" className="px-8 py-3 bg-white text-blue-900 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-lg">
                  Nous contacter
                </Link>
                <Link href="/prestations" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition duration-300">
                  Nos services
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <div className="bg-white p-2 rounded-lg shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1606857521015-7f9fcf423740?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Salle de réunion moderne avec système audiovisuel" 
                    className="w-full h-auto rounded"
                  />
                </div>
                {/* Badge flottant */}
                <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white px-4 py-2 rounded-lg shadow-lg">
                  <span className="font-semibold">+250 projets réalisés</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Logos de clients */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <h2 className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">Ils nous font confiance</h2>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {/* Remplacer par de vrais logos de clients */}
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo</div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo</div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo</div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo</div>
            <div className="w-24 h-12 bg-gray-200 rounded flex items-center justify-center">Logo</div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Nos services d'intégration audiovisuelle</h2>
            <p className="text-lg text-gray-600">
              Des solutions complètes pour répondre à tous vos besoins audiovisuels professionnels
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-blue-100 flex items-center justify-center">
                <i className="fas fa-desktop text-5xl text-blue-500"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Installation d'écrans</h3>
                <p className="text-gray-600 mb-4">
                  Écrans interactifs, murs d'images et solutions d'affichage pour tous vos espaces professionnels.
                </p>
                <Link href="/prestations" className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-indigo-100 flex items-center justify-center">
                <i className="fas fa-video text-5xl text-indigo-500"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Visioconférence</h3>
                <p className="text-gray-600 mb-4">
                  Solutions de visioconférence avancées avec barres vidéo et systèmes audio intégrés.
                </p>
                <Link href="/prestations" className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-purple-100 flex items-center justify-center">
                <i className="fas fa-users text-5xl text-purple-500"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Salles de réunion</h3>
                <p className="text-gray-600 mb-4">
                  Équipement complet pour salles de réunion, salles de conférence et espaces collaboratifs.
                </p>
                <Link href="/prestations" className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            {/* Service 4 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-green-100 flex items-center justify-center">
                <i className="fas fa-tv text-5xl text-green-500"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Affichage dynamique</h3>
                <p className="text-gray-600 mb-4">
                  Solutions d'affichage dynamique pour communiquer efficacement avec vos clients et collaborateurs.
                </p>
                <Link href="/prestations" className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            {/* Service 5 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-red-100 flex items-center justify-center">
                <i className="fas fa-graduation-cap text-5xl text-red-500"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Formation</h3>
                <p className="text-gray-600 mb-4">
                  Formation complète pour vous permettre d'utiliser efficacement vos équipements audiovisuels.
                </p>
                <Link href="/prestations" className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
            
            {/* Service 6 */}
            <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
              <div className="h-48 bg-yellow-100 flex items-center justify-center">
                <i className="fas fa-tools text-5xl text-yellow-600"></i>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-gray-900">Maintenance & SAV</h3>
                <p className="text-gray-600 mb-4">
                  Services de maintenance préventive et corrective pour assurer la longévité de vos équipements.
                </p>
                <Link href="/prestations" className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center">
                  En savoir plus <i className="fas fa-arrow-right ml-2"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section Pourquoi nous choisir */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1674&q=80" 
                alt="Équipe de professionnels Donowak" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Pourquoi choisir Donowak ?</h2>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-check text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Expertise technique</h3>
                    <p className="text-gray-600">Notre équipe d'experts cumule plus de 15 ans d'expérience dans l'intégration audiovisuelle.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-check text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Solutions sur mesure</h3>
                    <p className="text-gray-600">Nous concevons des solutions personnalisées adaptées à vos besoins spécifiques et à votre budget.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-check text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Service complet</h3>
                    <p className="text-gray-600">De la conception à la maintenance, en passant par l'installation et la formation, nous vous accompagnons à chaque étape.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                    <i className="fas fa-check text-blue-600"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Support réactif</h3>
                    <p className="text-gray-600">Notre équipe de support technique est disponible pour vous aider rapidement en cas de besoin.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-900">Ce que nos clients disent</h2>
            <p className="text-lg text-gray-600">
              Découvrez les retours d'expérience de nos clients satisfaits
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Témoignage 1 */}
            <div className="bg-gray-50 p-8 rounded-lg relative">
              <div className="absolute -top-4 left-8 text-5xl text-blue-500 opacity-20">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="italic mb-6 text-gray-700 relative z-10">
                "Donowak a transformé notre salle de conférence avec une solution audiovisuelle performante et intuitive. L'équipe a été professionnelle du début à la fin."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Jean Dupont</p>
                  <p className="text-sm text-gray-600">Directeur, Entreprise XYZ</p>
                </div>
              </div>
            </div>
            
            {/* Témoignage 2 */}
            <div className="bg-gray-50 p-8 rounded-lg relative">
              <div className="absolute -top-4 left-8 text-5xl text-blue-500 opacity-20">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="italic mb-6 text-gray-700 relative z-10">
                "Le système d'affichage dynamique installé par Donowak a considérablement amélioré notre communication interne. Un service client exceptionnel."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Marie Martin</p>
                  <p className="text-sm text-gray-600">Responsable Marketing, Société ABC</p>
                </div>
              </div>
            </div>
            
            {/* Témoignage 3 */}
            <div className="bg-gray-50 p-8 rounded-lg relative">
              <div className="absolute -top-4 left-8 text-5xl text-blue-500 opacity-20">
                <i className="fas fa-quote-left"></i>
              </div>
              <p className="italic mb-6 text-gray-700 relative z-10">
                "La maintenance préventive proposée par Donowak nous a permis d'éviter de nombreux problèmes techniques et d'assurer la continuité de nos services."
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold">Pierre Lefort</p>
                  <p className="text-sm text-gray-600">DSI, Groupe DEF</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à transformer vos espaces de travail ?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Contactez-nous dès aujourd'hui pour discuter de votre projet et recevoir un devis personnalisé.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="px-8 py-3 bg-white text-blue-700 rounded-lg font-semibold hover:bg-blue-50 transition duration-300 shadow-lg">
                Demander un devis
              </Link>
              <Link href="/realisations" className="px-8 py-3 bg-transparent border-2 border-white text-white rounded-lg font-semibold hover:bg-white/10 transition duration-300">
                Voir nos réalisations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
} 