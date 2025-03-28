-- Table pour gérer le contenu des pages modifiables
CREATE TABLE pages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- Identifiant unique pour l'URL (ex: 'accueil', 'a-propos')
  title TEXT NOT NULL,
  -- Utilisation de JSONB pour stocker du contenu structuré (ex: sections, textes, images)
  content JSONB,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Table pour les articles de blog
CREATE TABLE blog_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL, -- Identifiant unique pour l'URL de l'article
  title TEXT NOT NULL,
  -- Contenu principal de l'article, idéalement en Markdown
  content TEXT,
  -- URL d'une image de couverture optionnelle
  cover_image_url TEXT,
  -- Statut de publication (brouillon, publié)
  status TEXT DEFAULT 'draft' NOT NULL CHECK (status IN ('draft', 'published')),
  published_at TIMESTAMPTZ, -- Date de publication effective
  -- Clé étrangère vers la table auth.users si vous voulez lier à un auteur (optionnel pour l'instant)
  -- author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- Activer Row Level Security (RLS) pour les tables (important pour la sécurité)
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

-- Politiques RLS de base (à affiner plus tard) :
-- Permettre la lecture publique des pages et articles publiés
CREATE POLICY "Allow public read access to pages" ON pages
  FOR SELECT USING (true);

CREATE POLICY "Allow public read access to published blog posts" ON blog_posts
  FOR SELECT USING (status = 'published');

-- Permettre aux utilisateurs authentifiés (admin futurs) de tout faire (à restreindre !)
-- Note : Pour l'instant, on permet à tous les utilisateurs authentifiés.
-- Il faudra ajouter une vérification de rôle 'admin' plus tard.
CREATE POLICY "Allow full access for authenticated users" ON pages
  FOR ALL USING (auth.role() = 'authenticated'); -- A CHANGER PLUS TARD POUR ROLE ADMIN

CREATE POLICY "Allow full access for authenticated users" ON blog_posts
  FOR ALL USING (auth.role() = 'authenticated'); -- A CHANGER PLUS TARD POUR ROLE ADMIN

-- Fonction utilitaire pour mettre à jour automatiquement 'updated_at'
CREATE OR REPLACE FUNCTION public.handle_updated_at()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$function$;

-- Trigger pour mettre à jour 'updated_at' sur la table 'pages'
CREATE TRIGGER on_pages_updated
  BEFORE UPDATE ON public.pages
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();

-- Trigger pour mettre à jour 'updated_at' sur la table 'blog_posts'
CREATE TRIGGER on_blog_posts_updated
  BEFORE UPDATE ON public.blog_posts
  FOR EACH ROW EXECUTE FUNCTION public.handle_updated_at();
