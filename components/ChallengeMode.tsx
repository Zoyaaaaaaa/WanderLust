'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CheckCircle2 } from 'lucide-react'

type ChallengeActivity = {
  description: string
  duration: string
  completed: boolean
}

type Challenge = {
  title: string
  activities: ChallengeActivity[]
}

const dummyChallenge: Challenge = {
  title: "Mumbai Explorer Challenge",
  activities: [
    { description: "Visit Gateway of India", duration: "1hr", completed: false },
    { description: "Take a ferry to Elephanta Caves", duration: "3hrs", completed: false },
    { description: "Street food tasting at Chowpatty Beach", duration: "1hr", completed: false },
  ]
}

export default function ChallengeMode() {
  const [challenge, setChallenge] = useState<Challenge | null>(null)

  const generateChallenge = () => {
    setChallenge(dummyChallenge)
  }

  const toggleActivityCompletion = (index: number) => {
    if (challenge) {
      const updatedActivities = [...challenge.activities]
      updatedActivities[index].completed = !updatedActivities[index].completed
      setChallenge({ ...challenge, activities: updatedActivities })
    }
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Challenge Mode</h2>
      <Button onClick={generateChallenge} className="w-full">Generate Challenge</Button>
      {challenge && (
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>{challenge.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {challenge.activities.map((activity, index) => (
                <li key={index} className="flex items-center justify-between">
                  <div>
                    <p>{activity.description}</p>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Clock className="h-4 w-4 mr-1" />
                      <span>{activity.duration}</span>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => toggleActivityCompletion(index)}
                  >
                    <CheckCircle2 className={`h-6 w-6 ${activity.completed ? 'text-green-500' : 'text-muted-foreground'}`} />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Complete Challenge</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

