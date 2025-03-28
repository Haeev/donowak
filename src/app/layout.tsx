import './globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | Donowak - Intégration Audiovisuelle',
    default: 'Donowak - Solutions d\'intégration audiovisuelle professionnelles',
  },
  description: 'Donowak - Spécialiste de l\'intégration audiovisuelle pour les entreprises. Installation d\'écrans, barres de visioconférence, équipements de salles de réunion, affichage dynamique.',
  metadataBase: new URL('https://www.donowak.com'),
  openGraph: {
    title: 'Donowak - Solutions d\'intégration audiovisuelle professionnelles',
    description: 'Spécialiste de l\'intégration audiovisuelle pour les entreprises. Installation d\'écrans, barres de visioconférence, équipements de salles de réunion, affichage dynamique.',
    url: 'https://www.donowak.com',
    siteName: 'Donowak',
    locale: 'fr_FR',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className="scroll-smooth">
      <body className="min-h-screen bg-white font-sans">
        {/* Header */}
        <header className="fixed top-0 left-0 right-0 bg-white bg-opacity-95 shadow-sm z-40 transition-all duration-300">
          <div className="container mx-auto px-4 md:px-6">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <a href="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-800 bg-clip-text text-transparent">
                  Donowak
                </span>
              </a>

              {/* Navigation principale */}
              <nav className="hidden md:flex items-center space-x-1">
                <a href="/" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Accueil
                </a>
                <a href="/prestations" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Prestations
                </a>
                <a href="/realisations" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Réalisations
                </a>
                <a href="/a-propos" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  À propos
                </a>
                <a href="/blog" className="px-3 py-2 text-gray-700 hover:text-blue-600 transition-colors font-medium">
                  Blog
                </a>
                <a href="/contact" className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Contact
                </a>
              </nav>
              
              {/* Menu Mobile */}
              <div className="md:hidden">
                <button className="p-2 text-gray-700 focus:outline-none" id="mobile-menu-button">
                  <i className="fas fa-bars text-xl"></i>
                </button>
              </div>
            </div>
          </div>
          
          {/* Menu mobile (caché par défaut) */}
          <div className="md:hidden bg-white p-4 hidden shadow-lg" id="mobile-menu">
            <nav className="flex flex-col space-y-2">
              <a href="/" className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                Accueil
              </a>
              <a href="/prestations" className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                Prestations
              </a>
              <a href="/realisations" className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                Réalisations
              </a>
              <a href="/a-propos" className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                À propos
              </a>
              <a href="/blog" className="px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg">
                Blog
              </a>
              <a href="/contact" className="px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-center mt-2">
                Contact
              </a>
            </nav>
          </div>
        </header>
        
        {/* Contenu principal avec marge pour le header fixe */}
        <main className="pt-24 flex-grow overflow-hidden">
          {children}
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12 mt-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Logo et description */}
              <div className="md:col-span-1">
                <div className="mb-4">
                  <span className="text-2xl font-bold text-white">Donowak</span>
                </div>
                <p className="text-gray-400 mb-4">
                  Solutions d'intégration audiovisuelle professionnelles pour les entreprises.
                </p>
                <div className="flex space-x-3">
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <i className="fab fa-linkedin text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                  <a href="#" className="text-gray-400 hover:text-white transition-colors">
                    <i className="fab fa-facebook text-xl"></i>
                  </a>
                </div>
              </div>
              
              {/* Liens rapides */}
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Liens Rapides</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="/" className="text-gray-400 hover:text-white transition-colors">Accueil</a>
                  </li>
                  <li>
                    <a href="/prestations" className="text-gray-400 hover:text-white transition-colors">Prestations</a>
                  </li>
                  <li>
                    <a href="/realisations" className="text-gray-400 hover:text-white transition-colors">Réalisations</a>
                  </li>
                  <li>
                    <a href="/a-propos" className="text-gray-400 hover:text-white transition-colors">À propos</a>
                  </li>
                  <li>
                    <a href="/blog" className="text-gray-400 hover:text-white transition-colors">Blog</a>
                  </li>
                  <li>
                    <a href="/contact" className="text-gray-400 hover:text-white transition-colors">Contact</a>
                  </li>
                </ul>
              </div>
              
              {/* Services */}
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Nos Services</h3>
                <ul className="space-y-2">
                  <li><a href="/prestations" className="text-gray-400 hover:text-white transition-colors">Installation d'écrans</a></li>
                  <li><a href="/prestations" className="text-gray-400 hover:text-white transition-colors">Barres de visioconférence</a></li>
                  <li><a href="/prestations" className="text-gray-400 hover:text-white transition-colors">Équipements de salles de réunion</a></li>
                  <li><a href="/prestations" className="text-gray-400 hover:text-white transition-colors">Affichage dynamique</a></li>
                  <li><a href="/prestations" className="text-gray-400 hover:text-white transition-colors">Formation</a></li>
                  <li><a href="/prestations" className="text-gray-400 hover:text-white transition-colors">Audit matériel</a></li>
                </ul>
              </div>
              
              {/* Contact */}
              <div className="md:col-span-1">
                <h3 className="text-lg font-semibold mb-4">Contact</h3>
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <i className="fas fa-envelope text-blue-500 mt-1 mr-3"></i>
                    <span className="text-gray-400">contact@donowak.com</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-phone text-blue-500 mt-1 mr-3"></i>
                    <span className="text-gray-400">+33 (0)1 23 45 67 89</span>
                  </li>
                  <li className="flex items-start">
                    <i className="fas fa-map-marker-alt text-blue-500 mt-1 mr-3"></i>
                    <span className="text-gray-400">123 Rue de l'Exemple, 75000 Paris, France</span>
                  </li>
                </ul>
              </div>
            </div>
            
            {/* Séparateur */}
            <hr className="my-8 border-gray-800" />
            
            {/* Copyright et mentions légales */}
            <div className="flex flex-col md:flex-row md:justify-between items-center">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                &copy; {new Date().getFullYear()} Donowak. Tous droits réservés.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Mentions Légales
                </a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                  Politique de Confidentialité
                </a>
                <a href="#" className="text-gray-500 hover:text-white text-sm transition-colors">
                  CGV
                </a>
              </div>
            </div>
          </div>
        </footer>

        {/* Script pour le menu mobile */}
        <script dangerouslySetInnerHTML={{
          __html: `
            document.addEventListener('DOMContentLoaded', function() {
              const mobileMenuButton = document.getElementById('mobile-menu-button');
              const mobileMenu = document.getElementById('mobile-menu');
              
              if (mobileMenuButton && mobileMenu) {
                mobileMenuButton.addEventListener('click', function() {
                  if (mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.remove('hidden');
                  } else {
                    mobileMenu.classList.add('hidden');
                  }
                });
              }
              
              // Header scroll effect
              const header = document.querySelector('header');
              window.addEventListener('scroll', function() {
                if (window.scrollY > 50) {
                  header.classList.add('shadow-md');
                  header.classList.add('bg-opacity-98');
                } else {
                  header.classList.remove('shadow-md');
                  header.classList.remove('bg-opacity-98');
                }
              });
            });
          `
        }} />
      </body>
    </html>
  )
}
