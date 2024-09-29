import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground py-4 px-6 flex items-center justify-between">
      <Link href="/" className="text-2xl font-bold">
        AI Media Generation
      </Link>
      <nav className="hidden md:flex items-center gap-6">
        <Link href="/generate-story" className="hover:underline">
          Generate Story
        </Link>
        <Link href="/generate-image" className="hover:underline">
          Generate Image
        </Link>
        <Link href="/generate-video" className="hover:underline">
          Generate Video
        </Link>
        <Link href="/generate-audio" className="hover:underline">
          Generate Audio
        </Link>
      </nav>
    </header>
  )
}
