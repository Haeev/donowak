'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Cette page secrète redirigeant vers le login du dashboard
// N'est accessible que si on connaît l'URL exacte
export default function SecretAdminRoute() {
  const router = useRouter()
  
  useEffect(() => {
    // Redirection immédiate vers la page de login
    router.push('/login')
  }, [router])
  
  // Affichage pendant la redirection
  return (
    <div className="min-h-screen flex items-center justify-center">
      <p>Redirection...</p>
    </div>
  )
} 