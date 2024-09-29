'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"

export default function GenerateImagePage() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [imageUrl, setImageUrl] = useState('')
  const [error, setError] = useState(null)
  const imageRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setImageUrl('')
    setError(null)

    try {
      const response = await fetch('/api/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate image')
      }

      const data = await response.json()
      setImageUrl(data.imageUrl)
    } catch (error) {
      console.error('Error generating image:', error)
      setError('An error occurred while generating the image. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (imageRef.current) {
      const observer = new ResizeObserver(entries => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect
          imageRef.current.style.maxHeight = `${Math.min(height, window.innerHeight * 0.7)}px`
        }
      })

      observer.observe(imageRef.current.parentElement)

      return () => {
        observer.disconnect()
      }
    }
  }, [imageUrl])

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Generate Image</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Image Description
          </label>
          <textarea
            id="text"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Describe the image you want to generate..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Generating...' : 'Generate Image'}
        </Button>
      </form>

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Creating your image...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {imageUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Generated Image</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <div className="flex justify-center items-center">
              <img
                ref={imageRef}
                src={imageUrl}
                alt="Generated image"
                className="max-w-full rounded-lg"
                style={{ maxHeight: '70vh', objectFit: 'contain' }}
              />
            </div>
            <div className="mt-4">
              <a
                href={imageUrl}
                download="generated_image.png"
                className="text-blue-500 hover:underline"
              >
                Download Image
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
