import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donowak - Intégration Audiovisuelle Professionnelle",
  description: "Donowak propose des solutions d'intégration audiovisuelle sur mesure : installation d'écrans, visioconférence, salles de réunion, affichage dynamique.",
  keywords: "intégration audiovisuelle, écrans interactifs, visioconférence, affichage dynamique, solutions audiovisuelles professionnelles",
  authors: [{ name: "Donowak" }],
  creator: "Donowak",
  publisher: "Donowak",
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://donowak.fr",
    siteName: "Donowak",
    title: "Donowak - Intégration Audiovisuelle Professionnelle",
    description: "Solutions d'intégration audiovisuelle sur mesure pour entreprises et institutions",
    images: [
      {
        url: "/opengraph-image.jpg",
        width: 1200,
        height: 630,
        alt: "Donowak - Intégration Audiovisuelle Professionnelle"
      }
    ]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Font Awesome pour les icônes */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
          integrity="sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${inter.className} antialiased`}>
        <Navigation />
        <main className="pt-24">
          {children}
        </main>
        <footer className="bg-gray-800 text-white text-center p-8 mt-16">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8 text-left">
              <div>
                <h3 className="text-xl font-semibold mb-4">Donowak</h3>
                <p className="text-gray-300">
                  Votre partenaire de confiance pour tous vos projets d'intégration audiovisuelle professionnelle.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Contact</h3>
                <p className="text-gray-300 mb-2">contact@donowak.fr</p>
                <p className="text-gray-300">+33 (0)1 23 45 67 89</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4">Liens rapides</h3>
                <ul className="space-y-2 text-gray-300">
                  <li><a href="/prestations" className="hover:text-blue-400 transition-colors">Prestations</a></li>
                  <li><a href="/realisations" className="hover:text-blue-400 transition-colors">Réalisations</a></li>
                  <li><a href="/contact" className="hover:text-blue-400 transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-gray-700">
              <p>&copy; {new Date().getFullYear()} Donowak. Tous droits réservés.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
