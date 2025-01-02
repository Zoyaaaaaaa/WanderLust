import { Button } from "@/components/ui/button"
import { MapPin, User, Users, Trophy, Zap } from 'lucide-react'

export default function Home() {
  return (
    <div className="space-y-6">
      <Button className="w-full py-8 text-xl bg-primary text-primary-foreground hover:bg-primary/90" size="lg">
        Generate a Wander
      </Button>
      <div className="grid grid-cols-2 gap-4">
        <Button variant="outline" className="flex flex-col items-center py-4">
          <MapPin className="h-6 w-6 mb-2" />
          Quest
        </Button>
        <Button variant="outline" className="flex flex-col items-center py-4">
          <User className="h-6 w-6 mb-2" />
          Profile
        </Button>
        <Button variant="outline" className="flex flex-col items-center py-4">
          <Users className="h-6 w-6 mb-2" />
          Community
        </Button>
        <Button variant="outline" className="flex flex-col items-center py-4">
          <Trophy className="h-6 w-6 mb-2" />
          Challenges
        </Button>
      </div>
    </div>
  )
}

