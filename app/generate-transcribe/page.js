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
  { code: 'ml-IN', name: 'Malayalam (India)' },
  { code: 'mr-IN', name: 'Marathi (India)' },
  { code: 'od-IN', name: 'Odiya (India)' },
  { code: 'pa-IN', name: 'Punjabi (India)' },
  { code: 'gu-IN', name: 'Gujarati (India)' },
  { code: 'en-IN', name: 'English (India)' },
];

export default function GenerateTranscribe() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [languageCode, setLanguageCode] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setTranscript('');
    setLanguageCode('');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('prompt', '');
    formData.append('model', 'saaras:v1');

    try {
      const response = await fetch('https://8zdhdl5q-8000.inc1.devtunnels.ms/api/speech-to-text-translate', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setTranscript(data.transcript);
      setLanguageCode(data.language_code);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while processing the audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const getLanguageName = (code) => {
    const language = LANGUAGE_CODES.find(lang => lang.code === code);
    return language ? language.name : 'Unknown Language';
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Generate Transcribe</h1>
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
        <Button type="submit" disabled={isLoading || !file}>
          {isLoading ? 'Processing...' : 'Generate Transcribe'}
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
          <h2 className="text-xl font-semibold mt-4 mb-2">Detected Language:</h2>
          <p className="p-4 bg-gray-100 rounded">
            {getLanguageName(languageCode)} 
            {languageCode !== getLanguageName(languageCode) && ` (${languageCode})`}
          </p>
        </div>
      )}
    </div>
  );
}
