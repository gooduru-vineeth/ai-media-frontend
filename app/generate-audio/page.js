'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"

export default function GenerateAudioPage() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [error, setError] = useState(null)
  const audioRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setAudioUrl('')
    setError(null)

    try {
      const response = await fetch('/api/generate-audio', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate audio')
      }

      const data = await response.json()
      setAudioUrl(data.audioUrl)
    } catch (error) {
      console.error('Error generating audio:', error)
      setError('An error occurred while generating the audio. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Generate Audio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Text to Convert
          </label>
          <textarea
            id="text"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the text you want to convert to audio..."
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
          {isLoading ? 'Generating...' : 'Generate Audio'}
        </Button>
      </form>

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Converting text to audio...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {audioUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Generated Audio</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <audio ref={audioRef} controls className="w-full">
              <source src={audioUrl} type="audio/mpeg" />
              Your browser does not support the audio element.
            </audio>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => audioRef.current.play()}
                className="mr-2"
              >
                Play
              </Button>
              <Button
                onClick={() => audioRef.current.pause()}
                variant="outline"
              >
                Pause
              </Button>
            </div>
            <div className="mt-4">
              <a
                href={audioUrl}
                download="generated_audio.mp3"
                className="text-blue-500 hover:underline"
              >
                Download Audio
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
