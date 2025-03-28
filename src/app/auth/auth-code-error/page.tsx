import React from 'react';

export default function AuthCodeErrorPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <h1 className="text-2xl font-bold text-red-600">Erreur d'authentification</h1>
        <p className="text-gray-700">
          Une erreur s'est produite lors de la tentative de connexion.
          Veuillez réessayer ou contacter le support si le problème persiste.
        </p>
        <a href="/login" className="text-indigo-600 hover:text-indigo-500">
          Retourner à la page de connexion
        </a>
      </div>
    </div>
  );
} 