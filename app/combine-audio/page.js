'use client';
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from 'lucide-react';

export default function CombineAudio() {
  const [files, setFiles] = useState([]);
  const [combinedAudioUrl, setCombinedAudioUrl] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setFiles(prevFiles => [...prevFiles, ...newFiles]);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (index) => {
    setFiles(prevFiles => prevFiles.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setCombinedAudioUrl(null);
    setIsLoading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });

    try {
      const response = await fetch('https://8zdhdl5q-8000.inc1.devtunnels.ms/api/combine-audio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setCombinedAudioUrl(url);
    } catch (error) {
      console.error('Error:', error);
      setError(`Error combining audio files: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Combine Audio</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Audio Files
          </Button>
          <Input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            accept="audio/*" 
            multiple
            className="hidden"
          />
          <span className="text-sm text-gray-500">
            {files.length} file{files.length !== 1 ? 's' : ''} selected
          </span>
        </div>
        <div className="space-y-2 max-h-60 overflow-y-auto border p-2 rounded">
          {files.length === 0 ? (
            <p className="text-gray-500 text-center">No files selected</p>
          ) : (
            files.map((file, index) => (
              <div key={index} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span className="truncate flex-grow mr-2">{file.name}</span>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFile(index)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))
          )}
        </div>
        <Button type="submit" disabled={files.length < 2 || isLoading}>
          {isLoading ? 'Combining...' : 'Combine Audio'}
        </Button>
      </form>
      {isLoading && (
        <div className="mt-4 text-blue-500">
          Please wait, combining audio files...
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
      {combinedAudioUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Combined Audio:</h2>
          <audio controls src={combinedAudioUrl}>
            Your browser does not support the audio element.
          </audio>
          <Button 
            onClick={() => {
              const a = document.createElement('a');
              a.href = combinedAudioUrl;
              a.download = 'combined_audio.mp3';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            className="mt-2"
          >
            Download Combined Audio
          </Button>
        </div>
      )}
    </div>
  );
}
