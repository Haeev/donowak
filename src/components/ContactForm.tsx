'use client'

import { useState, FormEvent } from 'react'
import { createClient } from '@/utils/supabase/client'

export default function ContactForm() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    sujet: '',
    message: '',
    rgpd: false
  })
  
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)
  const [submitError, setSubmitError] = useState('')
  
  const supabase = createClient()
  
  const validateForm = () => {
    const newErrors: Record<string, string> = {}
    
    if (!formData.nom.trim()) {
      newErrors.nom = 'Veuillez entrer votre nom'
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Veuillez entrer votre email'
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Veuillez entrer un email valide'
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Veuillez entrer votre message'
    }
    
    if (!formData.rgpd) {
      newErrors.rgpd = 'Vous devez accepter la politique de confidentialité'
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }
  
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: checked
    }))
  }
  
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }
    
    setIsSubmitting(true)
    setSubmitSuccess(false)
    setSubmitError('')
    
    try {
      // Enregistrer le message de contact dans Supabase
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            nom: formData.nom,
            email: formData.email,
            telephone: formData.telephone,
            sujet: formData.sujet,
            message: formData.message,
            date: new Date().toISOString()
          }
        ])
      
      if (error) {
        throw new Error('Erreur lors de l\'envoi du message')
      }
      
      // Réinitialiser le formulaire
      setFormData({
        nom: '',
        email: '',
        telephone: '',
        sujet: '',
        message: '',
        rgpd: false
      })
      
      setSubmitSuccess(true)
    } catch (error) {
      console.error('Erreur de soumission:', error)
      setSubmitError('Une erreur est survenue lors de l\'envoi du message. Veuillez réessayer ultérieurement.')
    } finally {
      setIsSubmitting(false)
    }
  }
  
  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      {submitSuccess ? (
        <div className="text-center py-8">
          <div className="text-green-500 text-5xl mb-4">✓</div>
          <h3 className="text-2xl font-bold mb-4">Message envoyé avec succès !</h3>
          <p className="mb-6 text-gray-600">
            Merci pour votre message. Nous vous répondrons dans les plus brefs délais.
          </p>
          <button
            onClick={() => setSubmitSuccess(false)}
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Envoyer un autre message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-1">
              Nom complet <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="nom"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              className={`w-full border rounded-md shadow-sm p-3 ${errors.nom ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.nom && <p className="mt-1 text-sm text-red-500">{errors.nom}</p>}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full border rounded-md shadow-sm p-3 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
            </div>
            
            <div>
              <label htmlFor="telephone" className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                id="telephone"
                name="telephone"
                value={formData.telephone}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-md shadow-sm p-3"
              />
            </div>
          </div>
          
          <div>
            <label htmlFor="sujet" className="block text-sm font-medium text-gray-700 mb-1">
              Sujet
            </label>
            <select
              id="sujet"
              name="sujet"
              value={formData.sujet}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md shadow-sm p-3"
            >
              <option value="">Sélectionnez un sujet</option>
              <option value="devis">Demande de devis</option>
              <option value="information">Demande d'information</option>
              <option value="support">Support technique</option>
              <option value="autre">Autre</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
              Message <span className="text-red-500">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={6}
              value={formData.message}
              onChange={handleChange}
              className={`w-full border rounded-md shadow-sm p-3 ${errors.message ? 'border-red-500' : 'border-gray-300'}`}
            ></textarea>
            {errors.message && <p className="mt-1 text-sm text-red-500">{errors.message}</p>}
          </div>
          
          <div>
            <label className="flex items-start">
              <input
                type="checkbox"
                name="rgpd"
                checked={formData.rgpd}
                onChange={handleCheckboxChange}
                className={`rounded mt-1 ${errors.rgpd ? 'border-red-500' : 'border-gray-300'}`}
              />
              <span className="ml-2 text-sm text-gray-600">
                J'accepte que mes données soient traitées pour répondre à ma demande de contact conformément à la politique de confidentialité. <span className="text-red-500">*</span>
              </span>
            </label>
            {errors.rgpd && <p className="mt-1 text-sm text-red-500">{errors.rgpd}</p>}
          </div>
          
          {submitError && (
            <div className="p-3 bg-red-100 text-red-700 rounded-md">
              {submitError}
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full bg-blue-600 text-white px-6 py-3 rounded-md font-medium transition-colors ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-blue-700'
              }`}
            >
              {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
            </button>
          </div>
          
          <p className="text-xs text-gray-500 mt-4">
            Les champs marqués d'un <span className="text-red-500">*</span> sont obligatoires.
          </p>
        </form>
      )}
    </div>
  )
} 