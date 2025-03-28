// Script pour initialiser les pages de base dans Supabase
require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@supabase/supabase-js')

// Initialiser le client Supabase
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error("❌ Les variables d'environnement Supabase ne sont pas définies.")
  console.log("Assurez-vous d'avoir un fichier .env.local avec NEXT_PUBLIC_SUPABASE_URL et NEXT_PUBLIC_SUPABASE_ANON_KEY.")
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Liste des pages à créer avec leur contenu par défaut
const defaultPages = [
  {
    slug: 'accueil',
    title: 'Accueil',
    content: {
      html: `
<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8 text-center">Bienvenue chez Donowak</h1>
  
  <div class="bg-white rounded-lg shadow-md p-8 mb-12">
    <h2 class="text-2xl font-semibold mb-4">Spécialistes en intégration audiovisuelle</h2>
    <p class="mb-4">Donowak est votre partenaire de confiance pour tous vos projets d'intégration audiovisuelle professionnelle. Nous proposons des solutions sur mesure adaptées à vos besoins spécifiques.</p>
    <p class="mb-4">Que vous soyez une entreprise, une institution éducative ou un particulier, notre équipe d'experts vous accompagne de la conception à la mise en œuvre de votre projet.</p>
  </div>
  
  <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
    <div class="bg-blue-50 rounded-lg p-6 shadow-sm">
      <h3 class="text-xl font-semibold mb-3">Équipements de qualité</h3>
      <p>Nous travaillons avec les meilleurs fournisseurs du marché pour vous garantir des solutions durables et performantes.</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-6 shadow-sm">
      <h3 class="text-xl font-semibold mb-3">Installation professionnelle</h3>
      <p>Notre équipe d'experts assure une installation impeccable et vous forme à l'utilisation de vos nouveaux équipements.</p>
    </div>
    <div class="bg-blue-50 rounded-lg p-6 shadow-sm">
      <h3 class="text-xl font-semibold mb-3">Service après-vente</h3>
      <p>Nous restons à votre disposition après l'installation pour vous accompagner et répondre à vos questions.</p>
    </div>
  </div>
  
  <div class="text-center">
    <a href="/contact" class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 inline-block font-medium">Contactez-nous</a>
  </div>
</div>
      `,
      updatedAt: new Date().toISOString()
    }
  },
  {
    slug: 'prestations',
    title: 'Nos Prestations',
    content: {
      html: `
<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">Nos Prestations</h1>
  
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Intégration Audiovisuelle</h2>
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-xl font-semibold mb-3">Installation d'écrans</h3>
      <p class="mb-4">Nous proposons l'installation d'écrans de toutes tailles pour répondre à vos besoins spécifiques : écrans interactifs, murs d'écrans, affichage dynamique, etc.</p>
      <p>Notre équipe s'occupe de tout, de la conception à l'installation, en passant par le choix des équipements les plus adaptés à votre environnement.</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-xl font-semibold mb-3">Barres de visioconférence</h3>
      <p class="mb-4">Des solutions complètes pour vos réunions à distance comprenant caméras HD, microphones et haut-parleurs de qualité professionnelle.</p>
      <p>Compatibles avec tous les logiciels de visioconférence du marché (Teams, Zoom, Meet, etc.)</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6 mb-6">
      <h3 class="text-xl font-semibold mb-3">Équipements de salles de réunion</h3>
      <p class="mb-4">Nous équipons vos salles de réunion avec des solutions audiovisuelles complètes : vidéoprojecteurs, systèmes de sonorisation, solutions de partage sans fil, systèmes de contrôle centralisés.</p>
      <p>Nos installations sont pensées pour être à la fois performantes et simples d'utilisation.</p>
    </div>
    
    <div class="bg-white rounded-lg shadow-md p-6">
      <h3 class="text-xl font-semibold mb-3">Affichage dynamique</h3>
      <p class="mb-4">Solutions d'affichage dynamique pour diffuser vos contenus promotionnels, informatifs ou décoratifs sur des écrans placés à des endroits stratégiques.</p>
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
      <p>Nos experts peuvent réaliser un audit complet de vos installations existantes et vous recommander des solutions d'amélioration adaptées à vos besoins et à votre budget.</p>
    </div>
  </section>
</div>
      `,
      updatedAt: new Date().toISOString()
    }
  },
  {
    slug: 'realisations',
    title: 'Nos Réalisations',
    content: {
      html: `
<div class="container mx-auto px-4 py-12">
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
        <p class="text-gray-600 mb-4">Solution d'affichage dynamique pour l'accueil et les espaces communs.</p>
        <p class="italic text-sm text-gray-500">Réalisé en décembre 2024</p>
      </div>
    </div>
  </div>
  
  <div class="text-center">
    <p class="mb-6">Vous souhaitez voir d'autres exemples de nos réalisations ou discuter de votre projet ?</p>
    <a href="/contact" class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 inline-block">Contactez-nous</a>
  </div>
</div>
      `,
      updatedAt: new Date().toISOString()
    }
  },
  {
    slug: 'a-propos',
    title: 'À Propos',
    content: {
      html: `
<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">À Propos de Donowak</h1>
  
  <section class="mb-12">
    <h2 class="text-2xl font-semibold mb-4">Notre Histoire</h2>
    <div class="bg-white rounded-lg shadow-md p-6">
      <p class="mb-4">Fondée en 2020, Donowak est née de la passion de ses fondateurs pour les technologies audiovisuelles et de leur volonté de proposer des solutions d'intégration sur mesure aux entreprises de toutes tailles.</p>
      <p class="mb-4">Au fil des années, nous avons développé une expertise reconnue dans le domaine de l'intégration audiovisuelle professionnelle, en nous adaptant constamment aux évolutions technologiques et aux besoins spécifiques de nos clients.</p>
      <p>Aujourd'hui, Donowak est fière de compter parmi ses clients des entreprises de renom, des institutions éducatives et des organismes publics qui nous font confiance pour leurs projets d'équipement audiovisuel.</p>
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
      
      <p>Chaque membre de notre équipe partage les mêmes valeurs d'excellence, de professionnalisme et d'innovation qui font la réputation de Donowak.</p>
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
          <p>Nous restons constamment à l'affût des dernières avancées technologiques pour proposer à nos clients des solutions innovantes et performantes.</p>
        </div>
        
        <div>
          <h3 class="text-xl font-semibold mb-2">Écoute client</h3>
          <p class="mb-4">Nous prenons le temps d'écouter et de comprendre les besoins spécifiques de chaque client pour proposer des solutions parfaitement adaptées à leurs attentes et contraintes.</p>
          
          <h3 class="text-xl font-semibold mb-2">Durabilité</h3>
          <p>Nous privilégions des solutions durables et évolutives, conçues pour s'adapter aux besoins futurs de nos clients et respectueuses de l'environnement.</p>
        </div>
      </div>
    </div>
  </section>
</div>
      `,
      updatedAt: new Date().toISOString()
    }
  },
  {
    slug: 'blog',
    title: 'Blog',
    content: {
      html: `
<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">Blog</h1>
  
  <p class="text-lg mb-8">Découvrez nos derniers articles, conseils et actualités dans le domaine de l'intégration audiovisuelle.</p>
  
  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    <!-- Article 1 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">[Image de l'article]</span>
      </div>
      <div class="p-6">
        <span class="text-blue-600 text-sm font-medium">Conseils</span>
        <h2 class="text-xl font-semibold mt-1 mb-2">Comment choisir le bon écran interactif pour votre entreprise</h2>
        <p class="text-gray-600 mb-4">Découvrez les critères essentiels pour sélectionner l'écran interactif qui correspond parfaitement à vos besoins professionnels.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">28 mars 2025</span>
          <a href="#" class="text-blue-600 font-medium hover:underline">Lire la suite</a>
        </div>
      </div>
    </div>
    
    <!-- Article 2 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">[Image de l'article]</span>
      </div>
      <div class="p-6">
        <span class="text-blue-600 text-sm font-medium">Tendances</span>
        <h2 class="text-xl font-semibold mt-1 mb-2">Les nouvelles technologies de visioconférence en 2025</h2>
        <p class="text-gray-600 mb-4">Un aperçu des dernières innovations en matière de visioconférence qui révolutionnent la collaboration à distance.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">15 mars 2025</span>
          <a href="#" class="text-blue-600 font-medium hover:underline">Lire la suite</a>
        </div>
      </div>
    </div>
    
    <!-- Article 3 -->
    <div class="bg-white rounded-lg shadow-md overflow-hidden">
      <div class="h-48 bg-gray-200 flex items-center justify-center">
        <span class="text-gray-500">[Image de l'article]</span>
      </div>
      <div class="p-6">
        <span class="text-blue-600 text-sm font-medium">Cas client</span>
        <h2 class="text-xl font-semibold mt-1 mb-2">Comment nous avons transformé les salles de réunion de l'entreprise XYZ</h2>
        <p class="text-gray-600 mb-4">Découvrez comment notre solution d'intégration audiovisuelle a amélioré la productivité et la collaboration chez ce client.</p>
        <div class="flex justify-between items-center">
          <span class="text-sm text-gray-500">2 mars 2025</span>
          <a href="#" class="text-blue-600 font-medium hover:underline">Lire la suite</a>
        </div>
      </div>
    </div>
  </div>
  
  <div class="mt-12 text-center">
    <p class="mb-4">Plus d'articles seront publiés prochainement. Restez informés !</p>
    <button class="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">S'abonner à la newsletter</button>
  </div>
</div>
      `,
      updatedAt: new Date().toISOString()
    }
  },
  {
    slug: 'contact',
    title: 'Contact',
    content: {
      html: `
<div class="container mx-auto px-4 py-12">
  <h1 class="text-4xl font-bold mb-8">Contactez-nous</h1>
  
  <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
    <!-- Informations de contact -->
    <div>
      <div class="bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-semibold mb-6">Nos coordonnées</h2>
        
        <div class="mb-6">
          <h3 class="font-semibold text-lg mb-2">Adresse</h3>
          <p class="text-gray-600">
            123 Avenue des Technologies<br>
            75000 Paris<br>
            France
          </p>
        </div>
        
        <div class="mb-6">
          <h3 class="font-semibold text-lg mb-2">Téléphone</h3>
          <p class="text-gray-600">+33 (0)1 23 45 67 89</p>
        </div>
        
        <div class="mb-6">
          <h3 class="font-semibold text-lg mb-2">Email</h3>
          <p class="text-gray-600">contact@donowak.com</p>
        </div>
        
        <div>
          <h3 class="font-semibold text-lg mb-2">Horaires</h3>
          <p class="text-gray-600">
            Lundi - Vendredi : 9h00 - 18h00<br>
            Samedi - Dimanche : Fermé
          </p>
        </div>
      </div>
      
      <div class="mt-8 bg-white rounded-lg shadow-md p-8">
        <h2 class="text-2xl font-semibold mb-6">Nous trouver</h2>
        <div class="h-64 bg-gray-200 flex items-center justify-center rounded">
          <span class="text-gray-500">[Carte Google Maps]</span>
        </div>
      </div>
    </div>
    
    <!-- Formulaire de contact -->
    <div class="bg-white rounded-lg shadow-md p-8">
      <h2 class="text-2xl font-semibold mb-6">Envoyez-nous un message</h2>
      
      <form>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label for="nom" class="block text-sm font-medium text-gray-700 mb-1">Nom</label>
            <input type="text" id="nom" name="nom" class="w-full border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
          
          <div>
            <label for="prenom" class="block text-sm font-medium text-gray-700 mb-1">Prénom</label>
            <input type="text" id="prenom" name="prenom" class="w-full border-gray-300 rounded-md shadow-sm p-2" required />
          </div>
        </div>
        
        <div class="mb-6">
          <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input type="email" id="email" name="email" class="w-full border-gray-300 rounded-md shadow-sm p-2" required />
        </div>
        
        <div class="mb-6">
          <label for="telephone" class="block text-sm font-medium text-gray-700 mb-1">Téléphone</label>
          <input type="tel" id="telephone" name="telephone" class="w-full border-gray-300 rounded-md shadow-sm p-2" />
        </div>
        
        <div class="mb-6">
          <label for="sujet" class="block text-sm font-medium text-gray-700 mb-1">Sujet</label>
          <select id="sujet" name="sujet" class="w-full border-gray-300 rounded-md shadow-sm p-2">
            <option value="">Sélectionnez un sujet</option>
            <option value="devis">Demande de devis</option>
            <option value="information">Demande d'information</option>
            <option value="support">Support technique</option>
            <option value="autre">Autre</option>
          </select>
        </div>
        
        <div class="mb-6">
          <label for="message" class="block text-sm font-medium text-gray-700 mb-1">Message</label>
          <textarea id="message" name="message" rows="6" class="w-full border-gray-300 rounded-md shadow-sm p-2" required></textarea>
        </div>
        
        <div class="mb-8">
          <label class="flex items-center">
            <input type="checkbox" name="rgpd" class="rounded text-blue-600" required />
            <span class="ml-2 text-sm text-gray-600">J'accepte que mes données soient traitées pour répondre à ma demande de contact.</span>
          </label>
        </div>
        
        <button type="submit" class="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 font-medium">
          Envoyer le message
        </button>
      </form>
    </div>
  </div>
</div>
      `,
      updatedAt: new Date().toISOString()
    }
  }
]

// Fonction principale asynchrone
async function main() {
  console.log("🔎 Vérification des pages existantes dans Supabase...")
  
  try {
    // Vérifier les pages existantes
    const { data: existingPages, error } = await supabase
      .from('pages')
      .select('slug')
    
    if (error) {
      throw new Error(`Erreur lors de la récupération des pages : ${error.message}`)
    }
    
    const existingSlugs = (existingPages || []).map(page => page.slug)
    console.log(`📊 Pages existantes : ${existingSlugs.length ? existingSlugs.join(', ') : 'aucune'}`)
    
    // Filtrer les pages qui n'existent pas encore
    const pagesToCreate = defaultPages.filter(page => !existingSlugs.includes(page.slug))
    
    if (pagesToCreate.length === 0) {
      console.log("✅ Toutes les pages de base existent déjà. Aucune action nécessaire.")
      return
    }
    
    console.log(`🔄 Création de ${pagesToCreate.length} page(s) : ${pagesToCreate.map(p => p.slug).join(', ')}`)
    
    // Insérer les nouvelles pages
    const { data, error: insertError } = await supabase
      .from('pages')
      .insert(pagesToCreate)
    
    if (insertError) {
      throw new Error(`Erreur lors de la création des pages : ${insertError.message}`)
    }
    
    console.log(`✅ ${pagesToCreate.length} page(s) créée(s) avec succès !`)
    
    // Récupérer toutes les pages maintenant
    const { data: allPages, error: getAllError } = await supabase
      .from('pages')
      .select('slug, title')
      .order('title')
    
    if (getAllError) {
      throw new Error(`Erreur lors de la récupération de toutes les pages : ${getAllError.message}`)
    }
    
    console.log("📋 Liste complète des pages :")
    allPages.forEach(page => {
      console.log(`   - ${page.title} (/${page.slug})`)
    })
    
  } catch (error) {
    console.error(`❌ Erreur : ${error.message}`)
    process.exit(1)
  }
}

// Exécuter la fonction principale
main() 