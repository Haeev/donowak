/**
 * ModuleBlocks.ts
 * 
 * Ce fichier contient la définition des blocs modulaires pour l'éditeur visuel.
 * Chaque bloc est défini avec son HTML, son CSS, et ses propriétés.
 */

// Types pour les blocs modulaires
export interface ModuleBlock {
  id: string;
  label: string;
  category: string;
  content: string;
  css?: string;
  attributes?: Record<string, any>;
  gridClass: string; // Classe pour le système de grille (1x1, 2x1, etc.)
}

// Fonction pour générer des styles CSS pour les modules
const generateModuleCSS = () => `
.module {
  padding: 2rem;
  margin-bottom: 1.5rem;
  border-radius: 0.5rem;
  background-color: #ffffff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.grid-1x1 { grid-column: span 1; grid-row: span 1; }
.grid-2x1 { grid-column: span 2; grid-row: span 1; }
.grid-1x2 { grid-column: span 1; grid-row: span 2; }
.grid-2x2 { grid-column: span 2; grid-row: span 2; }
.grid-3x1 { grid-column: span 3; grid-row: span 1; }
.grid-3x2 { grid-column: span 3; grid-row: span 2; }
.grid-4x1 { grid-column: span 4; grid-row: span 1; }
.grid-4x2 { grid-column: span 4; grid-row: span 2; }
.grid-full { grid-column: 1 / -1; }

/* Styles de base pour les modules */
.module-title {
  font-size: 1.875rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #1e3a8a;
}

.module-subtitle {
  font-size: 1.25rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
  color: #1e40af;
}

.module-text {
  font-size: 1rem;
  line-height: 1.625;
  color: #374151;
}

.module-image {
  width: 100%;
  height: auto;
  object-fit: cover;
  border-radius: 0.375rem;
}

.module-btn {
  display: inline-block;
  padding: 0.625rem 1.25rem;
  background-color: #2563eb;
  color: white;
  font-weight: 500;
  border-radius: 0.375rem;
  text-decoration: none;
  transition: background-color 0.2s;
}

.module-btn:hover {
  background-color: #1d4ed8;
}

/* Styles spécifiques pour les types de modules */
.hero-module {
  padding: 4rem 2rem;
  text-align: center;
  background-color: #1e3a8a;
  color: white;
  border-radius: 0.5rem;
}

.feature-module {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.testimonial-module {
  background-color: #f9fafb;
  border-left: 4px solid #2563eb;
}

.stats-module {
  display: flex;
  justify-content: space-around;
  text-align: center;
}

.gallery-module {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1rem;
}

.cta-module {
  background-color: #dbeafe;
  text-align: center;
  padding: 3rem 2rem;
}

.team-module {
  text-align: center;
}

.contact-module {
  background-color: #f9fafb;
}

.faq-module .faq-item {
  border-bottom: 1px solid #e5e7eb;
  padding-bottom: 1rem;
  margin-bottom: 1rem;
}
`;

// Définition des blocs modulaires
export const moduleBlocks: ModuleBlock[] = [
  // Module Titre + Texte (1x1)
  {
    id: 'text-module',
    label: 'Texte simple',
    category: 'Texte',
    gridClass: 'grid-1x1',
    content: `
      <div class="module text-module" data-gjs-editable="true" data-gjs-type="module">
        <h3 class="module-title" data-gjs-editable="true">Titre du module</h3>
        <div class="module-text" data-gjs-editable="true">
          <p>Contenu textuel éditable. Remplacez ce texte par votre contenu.</p>
        </div>
      </div>
    `
  },
  
  // Module Image (1x1)
  {
    id: 'image-module',
    label: 'Image',
    category: 'Médias',
    gridClass: 'grid-1x1',
    content: `
      <div class="module image-module" data-gjs-editable="true" data-gjs-type="module">
        <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%232563EB'/%3E%3Ctext x='50%25' y='50%25' font-size='28' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3EImage%3C/text%3E%3C/svg%3E" 
          alt="Image" class="module-image" data-gjs-editable="true" data-gjs-type="image" />
      </div>
    `
  },
  
  // Module Fonctionnalité (icône + titre + texte) (1x1)
  {
    id: 'feature-module',
    label: 'Fonctionnalité',
    category: 'Fonctionnalités',
    gridClass: 'grid-1x1',
    content: `
      <div class="module feature-module" data-gjs-editable="true" data-gjs-type="module">
        <div class="text-5xl text-blue-600 mb-4">🚀</div>
        <h3 class="module-subtitle" data-gjs-editable="true">Titre de la fonctionnalité</h3>
        <div class="module-text" data-gjs-editable="true">
          <p>Description de la fonctionnalité en quelques lignes.</p>
        </div>
      </div>
    `
  },
  
  // Module Témoignage (1x1)
  {
    id: 'testimonial-module',
    label: 'Témoignage',
    category: 'Témoignages',
    gridClass: 'grid-1x1',
    content: `
      <div class="module testimonial-module" data-gjs-editable="true" data-gjs-type="module">
        <div class="text-blue-600 text-2xl mb-4">"</div>
        <p class="module-text mb-4" data-gjs-editable="true">Citation du client qui a apprécié vos services et souhaite partager son expérience positive.</p>
        <div class="flex items-center">
          <div class="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
            <span>AB</span>
          </div>
          <div>
            <p class="font-medium" data-gjs-editable="true">Nom du client</p>
            <p class="text-sm text-gray-600" data-gjs-editable="true">Poste, Entreprise</p>
          </div>
        </div>
      </div>
    `
  },
  
  // Module Call-to-Action (2x1)
  {
    id: 'cta-module',
    label: 'Appel à l\'action',
    category: 'Mise en avant',
    gridClass: 'grid-2x1',
    content: `
      <div class="module cta-module" data-gjs-editable="true" data-gjs-type="module">
        <h3 class="module-title" data-gjs-editable="true">Prêt à commencer ?</h3>
        <p class="module-text mb-6" data-gjs-editable="true">Contactez-nous dès aujourd'hui pour discuter de votre projet.</p>
        <a href="/contact" class="module-btn" data-gjs-editable="true">Nous contacter</a>
      </div>
    `
  },
  
  // Module Hero avec image de fond (4x2 ou full)
  {
    id: 'hero-module',
    label: 'Bannière principale',
    category: 'Mise en avant',
    gridClass: 'grid-full',
    content: `
      <div class="module hero-module" data-gjs-editable="true" data-gjs-type="module">
        <h1 class="text-4xl md:text-5xl font-bold mb-6" data-gjs-editable="true">Titre principal</h1>
        <p class="text-xl mb-8 text-blue-100 max-w-3xl mx-auto" data-gjs-editable="true">Sous-titre ou description captivante de votre entreprise ou service.</p>
        <div>
          <a href="/contact" class="module-btn bg-white text-blue-900 mr-4" data-gjs-editable="true">Nous contacter</a>
          <a href="/prestations" class="module-btn bg-transparent border-2 border-white" data-gjs-editable="true">Nos services</a>
        </div>
      </div>
    `
  },
  
  // Module Statistiques (2x1)
  {
    id: 'stats-module',
    label: 'Statistiques',
    category: 'Données',
    gridClass: 'grid-2x1',
    content: `
      <div class="module stats-module" data-gjs-editable="true" data-gjs-type="module">
        <div class="text-center">
          <p class="text-4xl font-bold text-blue-600" data-gjs-editable="true">100+</p>
          <p class="text-gray-600" data-gjs-editable="true">Clients satisfaits</p>
        </div>
        <div class="text-center">
          <p class="text-4xl font-bold text-blue-600" data-gjs-editable="true">250+</p>
          <p class="text-gray-600" data-gjs-editable="true">Projets réalisés</p>
        </div>
        <div class="text-center">
          <p class="text-4xl font-bold text-blue-600" data-gjs-editable="true">10+</p>
          <p class="text-gray-600" data-gjs-editable="true">Années d'expérience</p>
        </div>
      </div>
    `
  },
  
  // Module Galerie d'images (2x2)
  {
    id: 'gallery-module',
    label: 'Galerie d\'images',
    category: 'Médias',
    gridClass: 'grid-2x2',
    content: `
      <div class="module gallery-module" data-gjs-editable="true" data-gjs-type="module">
        <h3 class="module-title mb-6" data-gjs-editable="true">Galerie de projets</h3>
        <div class="grid grid-cols-2 gap-4">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%232563EB'/%3E%3Ctext x='50%25' y='50%25' font-size='28' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3EImage 1%3C/text%3E%3C/svg%3E" 
            alt="Image 1" class="module-image" data-gjs-editable="true" data-gjs-type="image" />
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%232563EB'/%3E%3Ctext x='50%25' y='50%25' font-size='28' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3EImage 2%3C/text%3E%3C/svg%3E" 
            alt="Image 2" class="module-image" data-gjs-editable="true" data-gjs-type="image" />
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%232563EB'/%3E%3Ctext x='50%25' y='50%25' font-size='28' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3EImage 3%3C/text%3E%3C/svg%3E" 
            alt="Image 3" class="module-image" data-gjs-editable="true" data-gjs-type="image" />
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%232563EB'/%3E%3Ctext x='50%25' y='50%25' font-size='28' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3EImage 4%3C/text%3E%3C/svg%3E" 
            alt="Image 4" class="module-image" data-gjs-editable="true" data-gjs-type="image" />
        </div>
      </div>
    `
  },
  
  // Module FAQ (2x1)
  {
    id: 'faq-module',
    label: 'FAQ',
    category: 'Texte',
    gridClass: 'grid-2x1',
    content: `
      <div class="module faq-module" data-gjs-editable="true" data-gjs-type="module">
        <h3 class="module-title mb-6" data-gjs-editable="true">Questions fréquentes</h3>
        <div class="faq-item" data-gjs-editable="true">
          <h4 class="font-semibold mb-2" data-gjs-editable="true">Question 1 ?</h4>
          <p class="module-text" data-gjs-editable="true">Réponse à la première question que vos clients pourraient se poser.</p>
        </div>
        <div class="faq-item" data-gjs-editable="true">
          <h4 class="font-semibold mb-2" data-gjs-editable="true">Question 2 ?</h4>
          <p class="module-text" data-gjs-editable="true">Réponse à la deuxième question que vos clients pourraient se poser.</p>
        </div>
      </div>
    `
  },
  
  // Module Équipe (2x1)
  {
    id: 'team-module',
    label: 'Membre d\'équipe',
    category: 'Personnes',
    gridClass: 'grid-1x1',
    content: `
      <div class="module team-module" data-gjs-editable="true" data-gjs-type="module">
        <div class="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 overflow-hidden">
          <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200' viewBox='0 0 200 200'%3E%3Crect width='200' height='200' fill='%232563EB'/%3E%3Ctext x='50%25' y='50%25' font-size='28' text-anchor='middle' fill='white' font-family='system-ui, sans-serif' dominant-baseline='middle'%3EPhoto%3C/text%3E%3C/svg%3E" 
            alt="Membre de l'équipe" class="w-full h-full object-cover" data-gjs-editable="true" data-gjs-type="image" />
        </div>
        <h3 class="module-subtitle" data-gjs-editable="true">Nom du membre</h3>
        <p class="text-blue-600 mb-2" data-gjs-editable="true">Poste / Fonction</p>
        <p class="module-text" data-gjs-editable="true">Brève description ou bio du membre de l'équipe.</p>
      </div>
    `
  },
  
  // Module Séparateur (full)
  {
    id: 'divider-module',
    label: 'Séparateur',
    category: 'Structure',
    gridClass: 'grid-full',
    content: `
      <div class="module divider-module py-4" data-gjs-editable="true" data-gjs-type="module">
        <hr class="border-t border-gray-300" />
      </div>
    `
  },
  
  // Module Vidéo (2x1)
  {
    id: 'video-module',
    label: 'Vidéo',
    category: 'Médias',
    gridClass: 'grid-2x1',
    content: `
      <div class="module video-module" data-gjs-editable="true" data-gjs-type="module">
        <h3 class="module-title mb-4" data-gjs-editable="true">Titre de la vidéo</h3>
        <div class="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg flex items-center justify-center">
          <div class="text-center p-8">
            <p class="text-gray-500 mb-2">Intégrez ici une vidéo YouTube, Vimeo ou autre</p>
            <p class="text-sm text-gray-400">(Remplacez ce placeholder par un code d'intégration vidéo)</p>
          </div>
        </div>
      </div>
    `
  },
  
  // Module Citation (1x1)
  {
    id: 'quote-module',
    label: 'Citation',
    category: 'Texte',
    gridClass: 'grid-1x1',
    content: `
      <div class="module quote-module" data-gjs-editable="true" data-gjs-type="module">
        <blockquote class="text-xl italic border-l-4 border-blue-500 pl-4 py-2 mb-4" data-gjs-editable="true">
          "Cette citation inspirante ou pertinente pour votre entreprise peut mettre en valeur votre philosophie ou expertise."
        </blockquote>
        <p class="text-right font-medium" data-gjs-editable="true">- Auteur de la citation</p>
      </div>
    `
  },
  
  // Module Processus/Étapes (2x1)
  {
    id: 'process-module',
    label: 'Processus',
    category: 'Fonctionnalités',
    gridClass: 'grid-2x1',
    content: `
      <div class="module process-module" data-gjs-editable="true" data-gjs-type="module">
        <h3 class="module-title mb-6" data-gjs-editable="true">Notre processus</h3>
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/3 mb-4 md:mb-0 px-3" data-gjs-editable="true">
            <div class="text-2xl font-bold text-blue-600 mb-2">1</div>
            <h4 class="font-semibold mb-2" data-gjs-editable="true">Étape 1</h4>
            <p class="text-gray-600" data-gjs-editable="true">Description de la première étape du processus.</p>
          </div>
          <div class="w-full md:w-1/3 mb-4 md:mb-0 px-3" data-gjs-editable="true">
            <div class="text-2xl font-bold text-blue-600 mb-2">2</div>
            <h4 class="font-semibold mb-2" data-gjs-editable="true">Étape 2</h4>
            <p class="text-gray-600" data-gjs-editable="true">Description de la deuxième étape du processus.</p>
          </div>
          <div class="w-full md:w-1/3 px-3" data-gjs-editable="true">
            <div class="text-2xl font-bold text-blue-600 mb-2">3</div>
            <h4 class="font-semibold mb-2" data-gjs-editable="true">Étape 3</h4>
            <p class="text-gray-600" data-gjs-editable="true">Description de la troisième étape du processus.</p>
          </div>
        </div>
      </div>
    `
  }
];

// Exporter le CSS pour les modules
export const moduleStylesCss = generateModuleCSS();

// Fonction pour organiser les modules par catégorie
export function getModulesByCategory() {
  const categorized: Record<string, ModuleBlock[]> = {};
  
  moduleBlocks.forEach(block => {
    if (!categorized[block.category]) {
      categorized[block.category] = [];
    }
    categorized[block.category].push(block);
  });
  
  return categorized;
} 