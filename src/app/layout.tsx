import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from 'next/link';
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Donowak - Intégration Audiovisuelle Professionnelle",
  description: "Donowak propose des solutions d'intégration audiovisuelle sur mesure : installation d'écrans, visioconférence, salles de réunion, affichage dynamique.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${inter.className} antialiased`}>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between items-center">
            <Link href="/accueil" className="text-xl font-bold">Donowak</Link>
            <ul className="flex space-x-4">
              <li><Link href="/accueil" className="hover:text-gray-300">Accueil</Link></li>
              <li><Link href="/prestations" className="hover:text-gray-300">Prestations</Link></li>
              <li><Link href="/realisations" className="hover:text-gray-300">Réalisations</Link></li>
              <li><Link href="/a-propos" className="hover:text-gray-300">À Propos</Link></li>
              <li><Link href="/blog" className="hover:text-gray-300">Blog</Link></li>
              <li><Link href="/contact" className="hover:text-gray-300">Contact</Link></li>
              {/* Le lien vers le dashboard a été délibérément supprimé pour des raisons de sécurité */}
            </ul>
          </nav>
        </header>
        <main className="container mx-auto py-8">
          {children}
        </main>
        <footer className="bg-gray-200 text-center p-4 mt-8">
          <p>&copy; {new Date().getFullYear()} Donowak. Tous droits réservés.</p>
        </footer>
      </body>
    </html>
  );
}
