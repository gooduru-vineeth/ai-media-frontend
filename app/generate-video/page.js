

'use client'

import { useState, useRef } from 'react'
import { Button } from "@/components/ui/button"

export default function GenerateVideoPage() {
  const [text, setText] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [error, setError] = useState(null)
  const videoRef = useRef(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setVideoUrl('')
    setError(null)

    try {
      const response = await fetch('/api/generate-video', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      })
      
      if (!response.ok) {
        throw new Error('Failed to generate video')
      }

      const data = await response.json()
      setVideoUrl(data.videoUrl)
    } catch (error) {
      console.error('Error generating video:', error)
      setError('An error occurred while generating the video. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Generate Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Video Description
          </label>
          <textarea
            id="text"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Describe the video you want to generate..."
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
          {isLoading ? 'Generating...' : 'Generate Video'}
        </Button>
      </form>

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Generating your video... This may take a few minutes.</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {videoUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Your Generated Video</h2>
          <div className="bg-gray-100 p-6 rounded-lg shadow-inner">
            <video ref={videoRef} controls className="w-full">
              <source src={videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <div className="mt-4 flex justify-center">
              <Button
                onClick={() => videoRef.current.play()}
                className="mr-2"
              >
                Play
              </Button>
              <Button
                onClick={() => videoRef.current.pause()}
                variant="outline"
              >
                Pause
              </Button>
            </div>
            <div className="mt-4">
              <a
                href={videoUrl}
                download="generated_video.mp4"
                className="text-blue-500 hover:underline"
              >
                Download Video
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
