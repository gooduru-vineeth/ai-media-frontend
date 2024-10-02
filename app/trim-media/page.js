'use client';
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TrimMedia() {
  const [file, setFile] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('start_time', startTime);
    formData.append('end_time', endTime);

    try {
      const response = await fetch('https://8zdhdl5q-8000.inc1.devtunnels.ms/api/trim-media', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Trim Media</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input type="file" onChange={(e) => setFile(e.target.files[0])} accept="audio/*,video/*" required />
        <Input type="text" placeholder="Start Time (HH:MM:SS)" value={startTime} onChange={(e) => setStartTime(e.target.value)} required />
        <Input type="text" placeholder="End Time (HH:MM:SS)" value={endTime} onChange={(e) => setEndTime(e.target.value)} required />
        <Button type="submit">Trim Media</Button>
      </form>
      {result && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">Result:</h2>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
