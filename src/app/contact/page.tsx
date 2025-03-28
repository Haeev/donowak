// Note: Ce composant est pour l'instant côté client pour la gestion du formulaire
'use client'; // Décommenter si besoin d'interactions client

import PageContent from '@/components/PageContent'
import ContactForm from '@/components/ContactForm'

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-16">
      <h1 className="text-4xl font-bold mb-8 text-center">Contactez-nous</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
        {/* Informations de contact */}
        <div>
          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-semibold mb-6">Nos coordonnées</h2>
            
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <span className="text-blue-600 mr-3"><i className="fas fa-map-marker-alt"></i></span>
                Adresse
              </h3>
              <p className="text-gray-600 ml-8">
                123 Avenue des Technologies<br />
                75000 Paris<br />
                France
              </p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <span className="text-blue-600 mr-3"><i className="fas fa-phone"></i></span>
                Téléphone
              </h3>
              <p className="text-gray-600 ml-8">+33 (0)1 23 45 67 89</p>
            </div>
            
            <div className="mb-6">
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <span className="text-blue-600 mr-3"><i className="fas fa-envelope"></i></span>
                Email
              </h3>
              <p className="text-gray-600 ml-8">contact@donowak.fr</p>
            </div>
            
            <div>
              <h3 className="font-semibold text-lg mb-2 flex items-center">
                <span className="text-blue-600 mr-3"><i className="fas fa-clock"></i></span>
                Horaires
              </h3>
              <p className="text-gray-600 ml-8">
                Lundi - Vendredi : 9h00 - 18h00<br />
                Samedi - Dimanche : Fermé
              </p>
            </div>
          </div>
          
          {/* Carte à intégrer ultérieurement */}
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6">Nous trouver</h2>
            <div className="h-64 bg-gray-200 flex items-center justify-center rounded">
              <span className="text-gray-500">Carte Google Maps à intégrer</span>
            </div>
          </div>
        </div>
        
        {/* Formulaire de contact */}
        <div>
          <ContactForm />
        </div>
      </div>
      
      {/* Contenu dynamique chargé depuis Supabase */}
      <PageContent slug="contact" className="mt-12" fallbackContent={<></>} />
    </div>
  )
} 