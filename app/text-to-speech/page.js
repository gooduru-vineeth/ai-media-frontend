'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"

const LANGUAGES = [
  { code: 'hi-IN', name: 'Hindi (India)' },
  { code: 'en-US', name: 'English (US)' },
  { code: 'bn-IN', name: 'Bengali (India)' },
  { code: 'kn-IN', name: 'Kannada (India)' },
  { code: 'ml-IN', name: 'Malayalam (India)' },
  { code: 'mr-IN', name: 'Marathi  (India)' },
  { code: 'od-IN', name: 'Odia (India)' },
  { code: 'pa-IN', name: 'Punjabi (India)' },
  { code: 'ta-IN', name: 'Tamil (India)' },
  { code: 'te-IN', name: 'Telugu (India)' },
  { code: 'en-IN', name: 'English (India)' },
  { code: 'gu-IN', name: 'Gujarati (India)' },
  // Add more languages as needed
]

const SPEAKERS = [
  { id: 'meera', name: 'Meera' },
  { id: 'pavithra', name: 'Pavithra' },
  { id: 'maitreyi', name: 'Maitreyi' },
  { id: 'arvind', name: 'Arvind' },
  { id: 'amol', name: 'Amol' },
  { id: 'amartya ', name: 'Amartya ' }
  // Add more speakers as needed
]

export default function TextToSpeechPage() {

  const [inputs, setInputs] = useState([''])
  const [targetLanguageCode, setTargetLanguageCode] = useState('hi-IN')
  const [speaker, setSpeaker] = useState('meera')
  const [pitch, setPitch] = useState(0)
  const [pace, setPace] = useState(1.65)
  const [loudness, setLoudness] = useState(1.5)
  const [speechSampleRate, setSpeechSampleRate] = useState(8000)
  const [enablePreprocessing, setEnablePreprocessing] = useState(true)
  const [isLoading, setIsLoading] = useState(false)
  const [audioUrl, setAudioUrl] = useState('')
  const [error, setError] = useState(null)
  const [audioBlob, setAudioBlob] = useState(null)

  useEffect(() => {
    // Cleanup function to revoke the Blob URL when the component unmounts
    return () => {
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl)
      }
    }
  }, [audioUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setAudioUrl('')
    setError(null)

    try {
      const response = await fetch('https://8zdhdl5q-8000.inc1.devtunnels.ms/api/text-to-speech', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inputs,
          target_language_code: targetLanguageCode,
          speaker,
          pitch,
          pace,
          loudness,
          speech_sample_rate: speechSampleRate,
          enable_preprocessing: enablePreprocessing,
          model: "bulbul:v1"
        })
      })
      console.log(JSON.stringify({
        inputs,
        target_language_code: targetLanguageCode,
        speaker,
        pitch,
        pace,
        loudness,
        speech_sample_rate: speechSampleRate,
        enable_preprocessing: enablePreprocessing,
        model: "bulbul:v1"
      }))
      
      if (!response.ok) {
        throw new Error('Failed to convert text to speech')
      }

      const data = await response.json()
      console.log(data.audios)

      const binaryString = atob(data.audios[0])
      const len = binaryString.length
      const bytes = new Uint8Array(len)
      for (let i = 0; i < len; i++) {
        bytes[i] = binaryString.charCodeAt(i)
      }

      const blob = new Blob([bytes], { type: 'audio/wav' }) // Assuming WAV format, adjust if different
      
      // Create a URL for the Blob
      const url = URL.createObjectURL(blob)
      
      setAudioBlob(blob)
      setAudioUrl(url)
    } catch (error) {
      console.error('Error converting text to speech:', error)
      setError('An error occurred while converting text to speech. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-6 text-center">Text to Speech</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-1">
            Text to Convert
          </label>
          <textarea
            id="text"
            rows={4}
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            placeholder="Enter the text you want to convert to speech..."
            value={inputs[0]}
            onChange={(e) => setInputs([e.target.value])}
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
            value={targetLanguageCode}
            onChange={(e) => setTargetLanguageCode(e.target.value)}
          >
            {LANGUAGES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="speaker" className="block text-sm font-medium text-gray-700 mb-1">
            Speaker
          </label>
          <select
            id="speaker"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            value={speaker}
            onChange={(e) => setSpeaker(e.target.value)}
          >
            {SPEAKERS.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="pitch" className="block text-sm font-medium text-gray-700 mb-1">
            Pitch
          </label>
          <input
            type="number"
            id="pitch"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            value={pitch}
            onChange={(e) => setPitch(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="pace" className="block text-sm font-medium text-gray-700 mb-1">
            Pace
          </label>
          <input
            type="number"
            id="pace"
            step="0.01"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            value={pace}
            onChange={(e) => setPace(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="loudness" className="block text-sm font-medium text-gray-700 mb-1">
            Loudness
          </label>
          <input
            type="number"
            id="loudness"
            step="0.1"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            value={loudness}
            onChange={(e) => setLoudness(Number(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="speechSampleRate" className="block text-sm font-medium text-gray-700 mb-1">
            Speech Sample Rate
          </label>
          <input
            type="number"
            id="speechSampleRate"
            className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
            value={speechSampleRate}
            onChange={(e) => setSpeechSampleRate(Number(e.target.value))}
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            id="enablePreprocessing"
            checked={enablePreprocessing}
            onChange={(e) => setEnablePreprocessing(e.target.checked)}
            className="mr-2"
          />
          <label htmlFor="enablePreprocessing" className="text-sm font-medium text-gray-700">
            Enable Preprocessing
          </label>
        </div>
        <Button 
          type="submit" 
          className="w-full"
          disabled={isLoading}
        >
          {isLoading ? 'Converting...' : 'Convert to Speech'}
        </Button>
      </form>

      {isLoading && (
        <div className="mt-8 text-center">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Converting text to speech...</p>
        </div>
      )}

      {error && (
        <div className="mt-8 p-4 bg-red-100 border border-red-400 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {audioUrl && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Speech</h2>
          <audio controls className="w-full">
            <source src={audioUrl} type="audio/wav" />
            Your browser does not support the audio element.
          </audio>
          <Button 
            onClick={() => {
              const a = document.createElement('a')
              a.href = audioUrl
              a.download = 'generated_speech.wav'
              document.body.appendChild(a)
              a.click()
              document.body.removeChild(a)
            }}
            className="mt-4"
          >
            Download Audio
          </Button>
        </div>
      )}
    </div>
  )
}
