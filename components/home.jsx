/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/mouRRTTW9sR
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Crimson_Text } from 'next/font/google'
import { Yeseva_One } from 'next/font/google'

crimson_text({
  subsets: ['latin'],
  display: 'swap',
})

yeseva_one({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import { Button } from "@/components/ui/button"

function getRandomLightColor() {
  const hue = Math.floor(Math.random() * 360);
  return `hsl(${hue}, 70%, 90%)`;
}

export function Home() {
  return (
    (<div className="flex flex-col min-h-screen">
      <main className="flex-1 py-10 px-4 md:px-8">
        <section className="mb-10">
          <h1 className="text-3xl font-bold mb-4">Welcome to our AI Media Generation</h1>
          <p className="text-muted-foreground mb-6">
            Generate text, image, video and audio with AI.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/generate-story"
              className="p-4 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: getRandomLightColor() }}
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Generate Story</h2>
              <p className="text-muted-foreground">Generate a story with AI.</p>
            </Link>
            <Link
              href="/generate-image"
              className="p-4 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: getRandomLightColor() }}
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Generate Image</h2>
              <p className="text-muted-foreground">Generate an image with AI.</p>
            </Link>
            <Link
              href="/generate-video"
              className="p-4 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: getRandomLightColor() }}
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Generate Video</h2>
              <p className="text-muted-foreground">Generate a video with AI.</p>
            </Link>
            <Link
              href="/generate-audio"
              className="p-4 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: getRandomLightColor() }}
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Generate Audio</h2>
              <p className="text-muted-foreground">
                Generate an audio with AI.
              </p>
            </Link>
            <Link
              href="/translate-text"
              className="p-4 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: getRandomLightColor() }}
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Translate Text</h2>
              <p className="text-muted-foreground">
                Translate text with AI.
              </p>
            </Link>
            <Link
              href="/text-to-speech"
              className="p-4 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: getRandomLightColor() }}
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Text to Speech</h2>
              <p className="text-muted-foreground">
                Convert text to speech with AI.
              </p>
            </Link>
            <Link
              href="/speech-to-text"
              className="p-4 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: getRandomLightColor() }}
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Speech to Text</h2>
              <p className="text-muted-foreground">
                Convert speech to text with AI.
              </p>
            </Link>
            <Link
              href="/generate-transcribe"
              className="p-4 rounded-lg hover:opacity-90 transition"
              style={{ backgroundColor: getRandomLightColor() }}
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Generate Transcribe</h2>
              <p className="text-muted-foreground">
                Transcribe from audio using AI.
              </p>
            </Link>
          </div>
        </section>

        <hr className="my-10 border-t border-gray-200" />

        <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Useful Tools</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* <Link
              href="/trim-media"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Trim Media</h2>
              <p className="text-muted-foreground">Trim your audio or video files.</p>
            </Link> */}
            <Link
              href="/trim-audio"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Trim Audio</h2>
              <p className="text-muted-foreground">Cut and edit your audio files.</p>
            </Link>
            <Link
              href="/trim-video"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Trim Video</h2>
              <p className="text-muted-foreground">Edit and shorten your video clips.</p>
            </Link>
            <Link
              href="/combine-audio"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Combine Audio</h2>
              <p className="text-muted-foreground">Merge multiple audio files into one.</p>
            </Link>
            <Link
              href="/combine-video"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Combine Video</h2>
              <p className="text-muted-foreground">Merge multiple video files into one.</p>
            </Link>
            {/* <Link
              href="/media-info"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <h2 className="text-xl font-bold mb-2">Media Info</h2>
              <p className="text-muted-foreground">Get detailed information about your media files.</p>
            </Link> */}
          </div>
        </section>

        {/* <hr className="my-10 border-t border-gray-200" /> */}

        {/* <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Use Case</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Link
              href="/use-case/paris"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Paris"
                className="rounded-lg mb-4 w-full aspect-[3/2] object-cover"
                width="300"
                height="200" />
              <h3 className="text-xl font-bold mb-2">Paris</h3>
              <p className="text-muted-foreground">
                Explore the City of Light with its iconic landmarks and vibrant culture.
              </p>
            </Link>
            <Link
              href="/use-case/tokyo"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Tokyo"
                className="rounded-lg mb-4 w-full aspect-[3/2] object-cover"
                width="300"
                height="200" />
              <h3 className="text-xl font-bold mb-2">Tokyo</h3>
              <p className="text-muted-foreground">
                Experience the unique blend of modern and traditional in the Japanese capital.
              </p>
            </Link>
            <Link
              href="/use-case/sydney"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Sydney"
                className="rounded-lg mb-4 w-full aspect-[3/2] object-cover"
                width="300"
                height="200" />
              <h3 className="text-xl font-bold mb-2">Sydney</h3>
              <p className="text-muted-foreground">
                Discover the iconic landmarks and vibrant culture of Australia's largest city.
              </p>
            </Link>
          </div>
        </section>

        <hr className="my-10 border-t border-gray-200" /> */}

        {/* <section className="mb-10">
          <h2 className="text-2xl font-bold mb-4">Blogs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/blog/how-to-get-started"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Article 1"
                className="rounded-lg mb-4 w-full aspect-[3/2] object-cover"
                width="300"
                height="200" />
              <h3 className="text-xl font-bold mb-2">How to get started with AI-Media</h3>
              <p className="text-muted-foreground">
                Learn how to use the AI-Media to meet your diverse needs.
              </p>
            </Link>
            <Link
              href="/blog/top-travel-destinations-2024"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Article 2"
                className="rounded-lg mb-4 w-full aspect-[3/2] object-cover"
                width="300"
                height="200" />
              <h3 className="text-xl font-bold mb-2">Top Travel Destinations for 2024</h3>
              <p className="text-muted-foreground">
                Discover the hottest travel destinations to add to your bucket list.
              </p>
            </Link>
            <Link
              href="/blog/travel-tips"
              className="bg-muted p-4 rounded-lg hover:bg-muted/80 transition"
              prefetch={false}>
              <img
                src="/placeholder.svg"
                alt="Article 3"
                className="rounded-lg mb-4 w-full aspect-[3/2] object-cover"
                width="300"
                height="200" />
              <h3 className="text-xl font-bold mb-2">Travel Tips for a Stress-Free Trip</h3>
              <p className="text-muted-foreground">
                Get expert advice on how to plan and enjoy a hassle-free vacation.
              </p>
            </Link>
          </div>
        </section> */}
      </main>
    </div>)
  );
}

function MenuIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>)
  );
}