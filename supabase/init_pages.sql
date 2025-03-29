-- Script SQL pour initialiser les pages de base du site Donowak
-- À exécuter directement dans la console SQL de Supabase

-- Activer le mode super utilisateur pour ignorer les RLS
BEGIN;
SET LOCAL ROLE postgres;

-- Vider la table si nécessaire (optionnel)
-- TRUNCATE public.pages;

-- Insert pour la page d'accueil
INSERT INTO public.pages (slug, title, content) 
VALUES (
  'accueil', 
  'Accueil',
  jsonb_build_object(
    'html', '<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Bienvenue chez Donowak</h1>
  
  <div class="bg-white rounded-lg shadow-md p-8 mb-12">
    <h2 class="text-2xl font-semibold mb-4">Spécialistes en intégration audiovisuelle</h2>
    <p class="mb-4">Donowak est votre partenaire de confiance pour tous vos projets d''intégration audiovisuelle professionnelle. Nous proposons des solutions sur mesure adaptées à vos besoins spécifiques.</p>
    <p class="mb-4">Que vous soyez une entreprise, une institution éducative ou un particulier, notre équipe d''experts vous accompagne de la conception à la mise en œuvre de votre projet.</p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
    <div class="bg-blue-50 rounded-lg p-6 shadow-sm">
      <h3 class="text-xl font-semibold mb-3">Équipements de qualité</h3>
      <p>Nous travaillons avec les meilleurs fournisseurs du marché pour vous garantir des solutions durables et performantes.</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-6 shadow-sm">
      <h3 class="text-xl font-semibold mb-3">Installation professionnelle</h3>
      <p>Notre équipe d''experts assure une installation impeccable et vous forme à l''utilisation de vos nouveaux équipements.</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-6 shadow-sm">
      <h3 class="text-xl font-semibold mb-3">Service après-vente</h3>
      <p>Nous restons à votre disposition après l''installation pour vous accompagner et répondre à vos questions.</p>
    </div>
  </div>
  
  <div class="text-center">
    <a href="/contact" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-block font-medium">Contactez-nous</a>
  </div>
</div>',
    'updatedAt', NOW()
  )
)
ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content;

-- Insert pour la page prestations
INSERT INTO public.pages (slug, title, content) 
VALUES (
  'prestations', 
  'Nos Prestations',
  jsonb_build_object(
    'html', '<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">Nos Prestations</h1>
  
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Intégration Audiovisuelle</h2>
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-xl font-semibold mb-3">Installation d''écrans</h3>
      <p class="mb-4">Nous proposons l''installation d''écrans de toutes tailles pour répondre à vos besoins spécifiques : écrans interactifs, murs d''écrans, affichage dynamique, etc.</p>
      <p>Notre équipe s''occupe de tout, de la conception à l''installation, en passant par le choix des équipements les plus adaptés à votre environnement.</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-xl font-semibold mb-3">Barres de visioconférence</h3>
      <p class="mb-4">Des solutions complètes pour vos réunions à distance comprenant caméras HD, microphones et haut-parleurs de qualité professionnelle.</p>
      <p>Compatibles avec tous les logiciels de visioconférence du marché (Teams, Zoom, Meet, etc.)</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-xl font-semibold mb-3">Équipements de salles de réunion</h3>
      <p class="mb-4">Nous équipons vos salles de réunion avec des solutions audiovisuelles complètes : vidéoprojecteurs, systèmes de sonorisation, solutions de partage sans fil, systèmes de contrôle centralisés.</p>
      <p>Nos installations sont pensées pour être à la fois performantes et simples d''utilisation.</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-3">Affichage dynamique</h3>
      <p class="mb-4">Solutions d''affichage dynamique pour diffuser vos contenus promotionnels, informatifs ou décoratifs sur des écrans placés à des endroits stratégiques.</p>
      <p>Nous proposons également des logiciels de gestion de contenu simples à utiliser pour mettre à jour vos affichages en temps réel.</p>
    </div>
  </section>

  <section>
    <h2 class="text-2xl font-semibold mb-4">Services Complémentaires</h2>
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-xl font-semibold mb-3">Formation</h3>
      <p>Nous proposons des sessions de formation pour vous permettre de maîtriser pleinement vos nouveaux équipements.</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-3">Audit matériel</h3>
      <p>Nos experts peuvent réaliser un audit complet de vos installations existantes et vous recommander des solutions d''amélioration adaptées à vos besoins et à votre budget.</p>
    </div>
  </section>
</div>',
    'updatedAt', NOW()
  )
)
ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content;

-- Insert pour la page réalisations
INSERT INTO public.pages (slug, title, content) 
VALUES (
  'realisations', 
  'Nos Réalisations',
  jsonb_build_object(
    'html', '<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">Nos Réalisations</h1>
  
  <p class="text-lg mb-8">Découvrez quelques-uns de nos projets récents qui témoignent de notre savoir-faire et de notre expertise en intégration audiovisuelle.</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
    <!-- Projet 1 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">[Image du projet 1]</span>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">Salle de conférence entreprise XYZ</h3>
        <p class="text-gray-600 mb-4">Installation complète avec écran interactif, système de visioconférence et sonorisation.</p>
        <p class="italic text-sm text-gray-500">Réalisé en février 2025</p>
      </div>
    </div>
    
    <!-- Projet 2 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">[Image du projet 2]</span>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">Centre de formation ABC</h3>
        <p class="text-gray-600 mb-4">Déploiement de 8 écrans interactifs dans des salles de formation.</p>
        <p class="italic text-sm text-gray-500">Réalisé en janvier 2025</p>
      </div>
    </div>
    
    <!-- Projet 3 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">[Image du projet 3]</span>
      </div>
      <div class="p-6">
        <h3 class="text-xl font-semibold mb-2">Siège social entreprise DEF</h3>
        <p class="text-gray-600 mb-4">Solution d''affichage dynamique pour l''accueil et les espaces communs.</p>
        <p class="italic text-sm text-gray-500">Réalisé en décembre 2024</p>
      </div>
    </div>
  </div>
  
  <div class="text-center">
    <p class="mb-6">Vous souhaitez voir d''autres exemples de nos réalisations ou discuter de votre projet ?</p>
    <a href="/contact" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block">Contactez-nous</a>
  </div>
</div>',
    'updatedAt', NOW()
  )
)
ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content;

-- Insert pour la page à propos
INSERT INTO public.pages (slug, title, content) 
VALUES (
  'a-propos', 
  'À Propos',
  jsonb_build_object(
    'html', '<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">À Propos de Donowak</h1>
  
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Notre Histoire</h2>
    <div class="bg-white rounded-lg shadow-md p-6">
      <p class="mb-4">Fondée en 2020, Donowak est née de la passion de ses fondateurs pour les technologies audiovisuelles et de leur volonté de proposer des solutions d''intégration sur mesure aux entreprises de toutes tailles.</p>
      <p class="mb-4">Au fil des années, nous avons développé une expertise reconnue dans le domaine de l''intégration audiovisuelle professionnelle, en nous adaptant constamment aux évolutions technologiques et aux besoins spécifiques de nos clients.</p>
      <p>Aujourd''hui, Donowak est fière de compter parmi ses clients des entreprises de renom, des institutions éducatives et des organismes publics qui nous font confiance pour leurs projets d''équipement audiovisuel.</p>
    </div>
  </section>
  
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Notre Équipe</h2>
    <div class="bg-white rounded-lg shadow-md p-6">
      <p class="mb-6">Notre équipe est composée de professionnels passionnés et expérimentés, chacun expert dans son domaine :</p>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
        <!-- Membre 1 -->
        <div class="text-center">
          <div class="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
            <span class="text-gray-500">[Photo]</span>
          </div>
          <h3 class="font-semibold">Nom Prénom</h3>
          <p class="text-gray-600">Fondateur & Directeur</p>
        </div>
        
        <!-- Membre 2 -->
        <div class="text-center">
          <div class="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
            <span class="text-gray-500">[Photo]</span>
          </div>
          <h3 class="font-semibold">Nom Prénom</h3>
          <p class="text-gray-600">Responsable Technique</p>
        </div>
        
        <!-- Membre 3 -->
        <div class="text-center">
          <div class="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4 flex items-center justify-center">
            <span class="text-gray-500">[Photo]</span>
          </div>
          <h3 class="font-semibold">Nom Prénom</h3>
          <p class="text-gray-600">Chargé de Projets</p>
        </div>
      </div>
      
      <p>Chaque membre de notre équipe partage les mêmes valeurs d''excellence, de professionnalisme et d''innovation qui font la réputation de Donowak.</p>
    </div>
  </section>
  
  <section>
    <h2 class="text-2xl font-semibold mb-4">Nos Valeurs</h2>
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 class="text-xl font-semibold mb-2">Excellence</h3>
          <p class="mb-4">Nous nous engageons à fournir des solutions de la plus haute qualité, en utilisant les meilleures technologies disponibles et en assurant une installation et un service irréprochables.</p>
          
          <h3 class="text-xl font-semibold mb-2">Innovation</h3>
          <p>Nous restons constamment à l''affût des dernières avancées technologiques pour proposer à nos clients des solutions innovantes et performantes.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold mb-2">Écoute client</h3>
          <p class="mb-4">Nous prenons le temps d''écouter et de comprendre les besoins spécifiques de chaque client pour proposer des solutions parfaitement adaptées à leurs attentes et contraintes.</p>
          
          <h3 class="text-xl font-semibold mb-2">Durabilité</h3>
          <p>Nous privilégions des solutions durables et évolutives, conçues pour s''adapter aux besoins futurs de nos clients et respectueuses de l''environnement.</p>
        </div>
      </div>
    </div>
  </section>
</div>',
    'updatedAt', NOW()
  )
)
ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content;

-- Insert pour la page contact
INSERT INTO public.pages (slug, title, content) 
VALUES (
  'contact', 
  'Contact',
  jsonb_build_object(
    'html', '<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Contactez-nous</h1>
  
  <div class="max-w-4xl mx-auto">
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-4">Nos Coordonnées</h2>
        
        <div class="space-y-4">
          <div class="flex items-start">
            <div class="text-blue-600 mr-4">
              <i class="fas fa-map-marker-alt text-xl"></i>
            </div>
            <div>
              <h3 class="font-medium">Adresse</h3>
              <p class="text-gray-600">123 Rue de l''Exemple<br>75000 Paris<br>France</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="text-blue-600 mr-4">
              <i class="fas fa-phone text-xl"></i>
            </div>
            <div>
              <h3 class="font-medium">Téléphone</h3>
              <p class="text-gray-600">+33 (0)1 23 45 67 89</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="text-blue-600 mr-4">
              <i class="fas fa-envelope text-xl"></i>
            </div>
            <div>
              <h3 class="font-medium">Email</h3>
              <p class="text-gray-600">contact@donowak.com</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="text-blue-600 mr-4">
              <i class="fas fa-clock text-xl"></i>
            </div>
            <div>
              <h3 class="font-medium">Horaires d''ouverture</h3>
              <p class="text-gray-600">Lundi - Vendredi: 9h00 - 18h00<br>Samedi: 10h00 - 16h00<br>Dimanche: Fermé</p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-2xl font-semibold mb-4">Formulaire de Contact</h2>
        
        <form>
          <div class="mb-4">
            <label for="name" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input 
              type="text" 
              id="name" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Votre nom"
            />
          </div>
          
          <div class="mb-4">
            <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input 
              type="email" 
              id="email" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Votre email"
            />
          </div>
          
          <div class="mb-4">
            <label for="phone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
            <input 
              type="tel" 
              id="phone" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Votre numéro de téléphone"
            />
          </div>
          
          <div class="mb-4">
            <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea 
              id="message" 
              rows="4" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500" 
              placeholder="Votre message"
            ></textarea>
          </div>
          
          <div class="text-right">
            <button 
              type="submit" 
              class="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
            >
              Envoyer
            </button>
          </div>
        </form>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h2 class="text-2xl font-semibold mb-4">Nous Trouver</h2>
      <div class="h-64 bg-gray-200 rounded-md flex items-center justify-center">
        <p class="text-gray-500">Carte Google Maps ici</p>
      </div>
    </div>
  </div>
</div>',
    'updatedAt', NOW()
  )
)
ON CONFLICT (slug) DO UPDATE 
SET 
  title = EXCLUDED.title,
  content = EXCLUDED.content;

-- Terminer la transaction
COMMIT; 