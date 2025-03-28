import Link from 'next/link'

export default function CTASection() {
  return (
    <section className="py-16 px-4 bg-gradient-to-r from-blue-700 to-blue-900 text-white">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">Prêt à transformer vos espaces de travail ?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Contactez-nous dès aujourd'hui pour discuter de votre projet d'intégration audiovisuelle et bénéficier de conseils d'experts.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              href="/contact"
              className="bg-white text-blue-900 hover:bg-gray-100 font-medium py-3 px-8 rounded-md transition-colors"
            >
              Demander un devis
            </Link>
            <Link
              href="/realisations"
              className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-medium py-3 px-8 rounded-md transition-colors"
            >
              Voir nos réalisations
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 