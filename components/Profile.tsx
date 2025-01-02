'use client'

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const dummyProfile = {
  username: "MumbaiExplorer",
  points: 750,
  completedActivities: 15,
  achievements: ["Mumbai Foodie", "Urban Explorer", "Culture Vulture"]
}

export default function Profile() {
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold">Your Profile</h2>
      <div className="flex items-center space-x-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src="/placeholder.svg?height=80&width=80" alt={dummyProfile.username} />
          <AvatarFallback>{dummyProfile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-2xl font-bold">{dummyProfile.username}</h3>
          <p className="text-muted-foreground">Adventure Seeker</p>
        </div>
      </div>
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p>Points: {dummyProfile.points}</p>
          <p>Completed Activities: {dummyProfile.completedActivities}</p>
        </CardContent>
      </Card>
      <Card className="bg-card text-card-foreground">
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-2">
          {dummyProfile.achievements.map((achievement, index) => (
            <Badge key={index} variant="secondary">{achievement}</Badge>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}

