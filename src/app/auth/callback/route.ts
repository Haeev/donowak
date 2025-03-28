import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Utiliser l'origine fournie par la requête si disponible, sinon l'URL du site par défaut
      const redirectUrl = new URL(next, origin || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
      return NextResponse.redirect(redirectUrl.toString());
    }
  }

  // return the user to an error page with instructions
  const errorUrl = new URL('/auth/auth-code-error', origin || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000');
  return NextResponse.redirect(errorUrl.toString());
} 