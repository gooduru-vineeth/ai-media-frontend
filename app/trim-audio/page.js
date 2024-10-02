'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function TrimAudio() {
  const [file, setFile] = useState(null);
  const [startMs, setStartMs] = useState('');
  const [endMs, setEndMs] = useState('');
  const [trimmedAudioUrl, setTrimmedAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setTrimmedAudioUrl(null);
    setIsLoading(true);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('start_ms', startMs);
    formData.append('end_ms', endMs);

    try {
      const response = await fetch('https://8zdhdl5q-8000.inc1.devtunnels.ms/api/trim-audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setTrimmedAudioUrl(url);
    } catch (error) {
      console.error('Error:', error);
      setError('An error occurred while trimming the audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trim Audio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="file">Audio File</Label>
          <Input 
            id="file"
            type="file" 
            onChange={(e) => setFile(e.target.files[0])} 
            accept="audio/*" 
            required 
          />
        </div>
        <div>
          <Label htmlFor="startMs">Start Time (ms)</Label>
          <Input 
            id="startMs"
            type="number" 
            placeholder="Start Time (ms)" 
            value={startMs} 
            onChange={(e) => setStartMs(e.target.value)} 
            required 
          />
        </div>
        <div>
          <Label htmlFor="endMs">End Time (ms)</Label>
          <Input 
            id="endMs"
            type="number" 
            placeholder="End Time (ms)" 
            value={endMs} 
            onChange={(e) => setEndMs(e.target.value)} 
            required 
          />
        </div>
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Trimming...' : 'Trim Audio'}
        </Button>
      </form>
      {isLoading && (
        <div className="mt-4 text-blue-500">
          Please wait, trimming audio...
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
      {trimmedAudioUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Trimmed Audio:</h2>
          <audio controls src={trimmedAudioUrl}>
            Your browser does not support the audio element.
          </audio>
          <Button 
            onClick={() => {
              const a = document.createElement('a');
              a.href = trimmedAudioUrl;
              a.download = 'trimmed_audio.mp3';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            className="mt-2"
          >
            Download Trimmed Audio
          </Button>
        </div>
      )}
    </div>
  );
}
