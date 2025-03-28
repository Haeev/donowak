import { type NextRequest, NextResponse } from 'next/server'
import { updateSession } from '@/utils/supabase/middleware' // Utilitaire Supabase pour le middleware

export async function middleware(request: NextRequest) {
  // Met à jour la session utilisateur en utilisant les cookies
  const { supabase, response } = await updateSession(request)

  // Récupère l'utilisateur actuel après le rafraîchissement de la session
  const { data: { user } } = await supabase.auth.getUser()

  // Protège la route /dashboard
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    // Redirige vers la page de login si l'utilisateur n'est pas connecté
    // et tente d'accéder au dashboard
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    return Response.redirect(url)
  }

  // Si l'utilisateur est connecté et essaie d'accéder à /login, rediriger vers /dashboard ? (Optionnel)
  // if (user && request.nextUrl.pathname.startsWith('/login')) {
  //   const url = request.nextUrl.clone()
  //   url.pathname = '/dashboard'
  //   return Response.redirect(url)
  // }

  // Retourne la réponse (peut contenir des cookies de session mis à jour)
  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).)*',
    // Ajout explicite pour s'assurer que les routes protégées sont incluses
    '/dashboard/:path*',
    '/login', // Inclure /login pour la redirection optionnelle si déjà connecté
  ],
} 