'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"

const LANGUAGES = [
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  // Add more languages as needed
]

export default function TranslateTextPage() {
  const [inputText, setInputText] = useState('')
  const [targetLanguage, setTargetLanguage] = useState('es')
  const [isLoading, setIsLoading] = useState(false)
  const [translatedText, setTranslatedText] = useState('')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setTranslatedText('')
    setError(null)

    try {
      const response = await fetch('/api/translate-text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText, targetLanguage })
      })
      
      if (!response.ok) {
        throw new Error('Failed to translate text')
      }

      const data = await response.json()
      setTranslatedText(data.translatedText)
    } catch (error) {
      console.error('Error translating text:', error)
      setError('An error occurred while translating the text. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Translate Text</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="inputText" className="block text-sm font-medium text-gray-700 mb-1">
            Text to Translate
          </label>
          <textarea
            id="inputText"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter text to translate..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="targetLanguage" className="block text-sm font-medium text-gray-700 mb-1">
            Target Language
          </label>
          <select
            id="targetLanguage"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Translating...' : 'Translate'}
        </Button>
      </form>

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Translating...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {translatedText && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Translated Text</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <p className="text-gray-800">{translatedText}</p>
          </div>
        </div>
      )}
    </div>
  )
}
