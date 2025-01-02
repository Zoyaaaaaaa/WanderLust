import { MapPin } from 'lucide-react'

export default function Header() {
  return (
    <header className="bg-primary text-primary-foreground p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Wanderlust</h1>
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2" />
          <span>Churchgate, Mumbai</span>
        </div>
      </div>
    </header>
  )
}

