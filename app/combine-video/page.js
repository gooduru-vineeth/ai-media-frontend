'use client';
import { useState, useRef } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { X } from 'lucide-react';

export default function CombineVideo() {
  const [files, setFiles] = useState([]);
  const [combinedVideoUrl, setCombinedVideoUrl] = useState(null);
  const [error, setError] = useState(null);
  const [preserveAudio, setPreserveAudio] = useState(true);
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
    setCombinedVideoUrl(null);
    setIsLoading(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('preserve_audio', preserveAudio);

    try {
      const response = await fetch('https://8zdhdl5q-8000.inc1.devtunnels.ms/api/combine-videos', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setCombinedVideoUrl(url);
    } catch (error) {
      console.error('Error:', error);
      setError(`Error combining video files: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Combine Video</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center space-x-2">
          <Button
            type="button"
            onClick={() => fileInputRef.current?.click()}
          >
            Select Video Files
          </Button>
          <Input 
            type="file" 
            ref={fileInputRef}
            onChange={handleFileChange} 
            accept="video/*" 
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
        <div className="flex items-center space-x-2">
          <Checkbox
            id="preserveAudio"
            checked={preserveAudio}
            onCheckedChange={setPreserveAudio}
          />
          <Label htmlFor="preserveAudio">Preserve Audio</Label>
        </div>
        <Button type="submit" disabled={files.length < 2 || isLoading}>
          {isLoading ? 'Combining...' : 'Combine Video'}
        </Button>
      </form>
      {isLoading && (
        <div className="mt-4 text-blue-500">
          Please wait, combining videos...
        </div>
      )}
      {error && (
        <div className="mt-4 text-red-500">
          {error}
        </div>
      )}
      {combinedVideoUrl && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Combined Video:</h2>
          <video controls src={combinedVideoUrl} className="w-full">
            Your browser does not support the video element.
          </video>
          <Button 
            onClick={() => {
              const a = document.createElement('a');
              a.href = combinedVideoUrl;
              a.download = 'combined_video.mp4';
              document.body.appendChild(a);
              a.click();
              document.body.removeChild(a);
            }}
            className="mt-2"
          >
            Download Combined Video
          </Button>
        </div>
      )}
    </div>
  );
}
