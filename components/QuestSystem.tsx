'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Clock } from 'lucide-react'

type Quest = {
  title: string
  duration: string
  difficulty: 'Easy' | 'Medium' | 'Hard'
  steps: string[]
}

const dummyQuest: Quest = {
  title: "Evening Explorer",
  duration: "3hrs",
  difficulty: "Medium",
  steps: [
    "Coffee at Starbucks Churchgate",
    "Find street art in Kala Ghoda",
    "Dinner at Baghdadi"
  ]
}

export default function QuestSystem() {
  const [quest, setQuest] = useState<Quest | null>(null)

  const generateQuest = () => {
    setQuest(dummyQuest)
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Quest System</h2>
      <Button onClick={generateQuest} className="w-full">Generate Quest</Button>
      {quest && (
        <Card className="bg-card text-card-foreground">
          <CardHeader>
            <CardTitle>{quest.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                <span>{quest.duration}</span>
              </div>
              <span>{quest.difficulty}</span>
            </div>
            <ol className="list-decimal list-inside space-y-2">
              {quest.steps.map((step, index) => (
                <li key={index} className="flex items-center">
                  <span className="mr-2">{step}</span>
                  <CheckCircle className="h-5 w-5 text-muted-foreground" />
                </li>
              ))}
            </ol>
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="w-full">Start Quest</Button>
          </CardFooter>
        </Card>
      )}
    </div>
  )
}

