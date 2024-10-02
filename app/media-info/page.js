'use client';
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function MediaInfo() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setResult(null);
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResult(null);
    setError(null);

    if (!file) {
      setError('Please select a file');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('https://8zdhdl5q-8000.inc1.devtunnels.ms/api/media-info', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
      setError(`Error getting media info: ${error.message}`);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Media Info</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Media File
          </Button>
          <Input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            accept="audio/*,video/*"
            className="hidden"
          />
          <span className="text-sm text-gray-500">
            {file ? file.name : 'No file selected'}
          </span>
        </div>
        <Button type="submit" disabled={!file}>Get Media Info</Button>
      </form>
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Media Information:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto max-h-96">
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
