'use client'

import React from 'react'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import { createClient } from '@/utils/supabase/client' // Chemin vers votre client Supabase côté client

export default function LoginPage() {
  const supabase = createClient() // Crée le client Supabase pour le navigateur

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion au Dashboard
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            Réservé à l&apos;administration
          </p>
        </div>
        <Auth
          supabaseClient={supabase}
          appearance={{ theme: ThemeSupa }}
          providers={[]} // Pas de fournisseurs OAuth
          view="sign_in" // Force l'affichage de la vue de connexion uniquement
          showLinks={false} // Masque les liens (dont "S'inscrire")
          redirectTo={`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`} // URL de callback après connexion
        />
      </div>
    </div>
  )
} 