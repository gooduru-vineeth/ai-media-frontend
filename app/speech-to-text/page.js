'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const LANGUAGE_CODES = [
  { code: 'hi-IN', name: 'Hindi (India)' },
  { code: 'bn-IN', name: 'Bengali (India)' },
  { code: 'ta-IN', name: 'Tamil (India)' },
  { code: 'te-IN', name: 'Telugu (India)' },
  { code: 'kn-IN', name: 'Kannada (India)' },
  { code: 'ml-IN', name: 'Malyalam (India)' },
  { code: 'mr-IN', name: 'Marathi (India)' },
  { code: 'od-IN', name: 'Odiya (India)' },
  { code: 'pa-IN', name: 'Punjabi (India)' },
  { code: 'gu-IN', name: 'Gujarati (India)' },
  // Add more language codes as needed
];

export default function SpeechToText() {
  const [file, setFile] = useState(null);
  const [languageCode, setLanguageCode] = useState('hi-IN');
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTranscript('');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('language_code', languageCode);
    formData.append('model', 'saarika:v1');

    try {
      const response = await fetch('https://8zdhdl5q-8000.inc1.devtunnels.ms/api/speech-to-text', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTranscript(data.transcript);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing the audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h1 className="text-2xl font-bold mb-4">Speech to Text</h1>
      <div className="absolute top-0 right-0 text-xs text-gray-500 bg-gray-100 p-2 rounded">
        Note: Max audio length: 30 seconds
      </div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="audioFile">Audio File</Label>
          <Input 
            id="audioFile" 
            type="file" 
            accept="audio/*"
            onChange={(e) => setFile(e.target.files[0])}
            required 
          />
        </div>
        <div>
          <Label htmlFor="languageCode">Output Language</Label>
          <select
            id="languageCode"
            value={languageCode}
            onChange={(e) => setLanguageCode(e.target.value)}
            className="w-full p-2 border rounded"
            required
          >
            {LANGUAGE_CODES.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" disabled={isLoading || !file}>
          {isLoading ? 'Processing...' : 'Convert to Text'}
        </Button>
      </form>
      
      {isLoading && (
        <div className="mt-4 text-blue-500">
          Please wait, processing audio...
        </div>
      )}
      
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
      
      {transcript && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Transcript:</h2>
          <p className="p-4 bg-gray-100 rounded">{transcript}</p>
        </div>
      )}
    </div>
  );
}
