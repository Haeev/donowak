export interface ModuleType {
  type: string;
  name: string;
  description: string;
  icon: string;
  defaultContent: string;
}

export const modulesList: ModuleType[] = [
  {
    type: 'text',
    name: 'Texte',
    description: 'Paragraphes, titres et texte enrichi',
    icon: 'fa-paragraph',
    defaultContent: `
      <h2>Titre de section</h2>
      <p>Votre contenu ici. Cliquez pour modifier ce texte.</p>
    `
  },
  {
    type: 'image',
    name: 'Image',
    description: 'Image unique avec légende optionnelle',
    icon: 'fa-image',
    defaultContent: 'https://via.placeholder.com/800x400?text=Votre+Image+Ici'
  },
  {
    type: 'gallery',
    name: 'Galerie',
    description: 'Collection d\'images en grille',
    icon: 'fa-images',
    defaultContent: `
      <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
        <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
        <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
        <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
        <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
        <div><img src="https://via.placeholder.com/300" alt="" class="w-full"></div>
      </div>
    `
  },
  {
    type: 'video',
    name: 'Vidéo',
    description: 'Vidéo YouTube ou autre embed',
    icon: 'fa-video',
    defaultContent: 'https://www.youtube.com/embed/dQw4w9WgXcQ'
  },
  {
    type: 'cta',
    name: 'Appel à l\'action',
    description: 'Bouton ou bannière CTA',
    icon: 'fa-bullhorn',
    defaultContent: `
      <div class="bg-blue-600 text-white rounded-lg p-8 text-center">
        <h3 class="text-2xl font-bold mb-4">Prêt à passer à l'action?</h3>
        <p class="mb-6">Contactez-nous dès aujourd'hui pour une consultation gratuite</p>
        <a href="/contact" class="inline-block bg-white text-blue-600 font-bold py-3 px-6 rounded-lg hover:bg-blue-50 transition-colors">Nous contacter</a>
      </div>
    `
  },
  {
    type: 'testimonial',
    name: 'Témoignage',
    description: 'Citation d\'un client satisfait',
    icon: 'fa-quote-right',
    defaultContent: `
      <div class="bg-gray-50 p-6 rounded-lg">
        <p class="italic mb-4">"Ce service a transformé notre façon de travailler. L'équipe a été professionnelle et attentive à nos besoins spécifiques."</p>
        <div class="flex items-center">
          <div class="w-10 h-10 bg-gray-300 rounded-full mr-3"></div>
          <div>
            <p class="font-medium">Nom du Client</p>
            <p class="text-sm text-gray-600">Poste, Entreprise</p>
          </div>
        </div>
      </div>
    `
  },
  {
    type: 'features',
    name: 'Caractéristiques',
    description: 'Liste de fonctionnalités ou services',
    icon: 'fa-list-check',
    defaultContent: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <div class="text-blue-600 mb-3"><i class="fas fa-check-circle text-2xl"></i></div>
          <h3 class="font-bold mb-2">Fonctionnalité 1</h3>
          <p class="text-gray-600">Description de la fonctionnalité ou du service proposé.</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <div class="text-blue-600 mb-3"><i class="fas fa-check-circle text-2xl"></i></div>
          <h3 class="font-bold mb-2">Fonctionnalité 2</h3>
          <p class="text-gray-600">Description de la fonctionnalité ou du service proposé.</p>
        </div>
        <div class="p-4 bg-white rounded-lg shadow-sm">
          <div class="text-blue-600 mb-3"><i class="fas fa-check-circle text-2xl"></i></div>
          <h3 class="font-bold mb-2">Fonctionnalité 3</h3>
          <p class="text-gray-600">Description de la fonctionnalité ou du service proposé.</p>
        </div>
      </div>
    `
  },
  {
    type: 'stats',
    name: 'Statistiques',
    description: 'Chiffres et statistiques importantes',
    icon: 'fa-chart-simple',
    defaultContent: `
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        <div class="p-4">
          <p class="text-4xl font-bold text-blue-600">250+</p>
          <p class="text-gray-600">Projets Réalisés</p>
        </div>
        <div class="p-4">
          <p class="text-4xl font-bold text-blue-600">15</p>
          <p class="text-gray-600">Années d'Expérience</p>
        </div>
        <div class="p-4">
          <p class="text-4xl font-bold text-blue-600">95%</p>
          <p class="text-gray-600">Clients Satisfaits</p>
        </div>
        <div class="p-4">
          <p class="text-4xl font-bold text-blue-600">24/7</p>
          <p class="text-gray-600">Support Client</p>
        </div>
      </div>
    `
  },
  {
    type: 'team',
    name: 'Équipe',
    description: 'Présentation des membres de l\'équipe',
    icon: 'fa-users',
    defaultContent: `
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div class="text-center">
          <div class="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 class="font-bold">Nom Prénom</h3>
          <p class="text-gray-600">Fonction</p>
        </div>
        <div class="text-center">
          <div class="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 class="font-bold">Nom Prénom</h3>
          <p class="text-gray-600">Fonction</p>
        </div>
        <div class="text-center">
          <div class="w-32 h-32 bg-gray-300 rounded-full mx-auto mb-4"></div>
          <h3 class="font-bold">Nom Prénom</h3>
          <p class="text-gray-600">Fonction</p>
        </div>
      </div>
    `
  },
  {
    type: 'contact',
    name: 'Contact',
    description: 'Informations de contact',
    icon: 'fa-address-card',
    defaultContent: `
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 class="text-xl font-bold mb-4">Contactez-nous</h3>
          <ul class="space-y-3">
            <li class="flex items-start">
              <i class="fas fa-envelope text-blue-600 mt-1 mr-3"></i>
              <span>contact@donowak.com</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-phone text-blue-600 mt-1 mr-3"></i>
              <span>+33 (0)1 23 45 67 89</span>
            </li>
            <li class="flex items-start">
              <i class="fas fa-map-marker-alt text-blue-600 mt-1 mr-3"></i>
              <span>123 Rue de l'Exemple, 75000 Paris, France</span>
            </li>
          </ul>
        </div>
        <div>
          <h3 class="text-xl font-bold mb-4">Horaires d'ouverture</h3>
          <ul class="space-y-2">
            <li class="flex justify-between">
              <span>Lundi - Vendredi:</span>
              <span>9h00 - 18h00</span>
            </li>
            <li class="flex justify-between">
              <span>Samedi:</span>
              <span>10h00 - 16h00</span>
            </li>
            <li class="flex justify-between">
              <span>Dimanche:</span>
              <span>Fermé</span>
            </li>
          </ul>
        </div>
      </div>
    `
  },
  {
    type: 'divider',
    name: 'Séparateur',
    description: 'Ligne horizontale de séparation',
    icon: 'fa-grip-lines',
    defaultContent: `<hr class="my-8 border-t border-gray-300">`
  }
]; 