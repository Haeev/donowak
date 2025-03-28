import { createClient } from '@supabase/supabase-js'

// Récupérer les variables d'environnement
// Assurez-vous que ces variables sont définies dans votre fichier .env.local
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Vérifier si les variables sont bien définies
if (!supabaseUrl) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_URL');
}
if (!supabaseAnonKey) {
  throw new Error('Missing environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY');
}

// Créer et exporter le client Supabase
export const supabase = createClient(supabaseUrl, supabaseAnonKey) 