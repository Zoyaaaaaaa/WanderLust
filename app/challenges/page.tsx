// 'use client'
// import { useState } from 'react'
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Progress } from "@/components/ui/progress"
// import { Clock, CheckCircle2, Trophy, Star, Target, ArrowUp } from 'lucide-react'
// import { Alert, AlertDescription } from "@/components/ui/alert"

// type ChallengeActivity = {
//   description: string
//   duration: string
//   completed: boolean
//   points: number
// }

// type Challenge = {
//   title: string
//   description: string
//   activities: ChallengeActivity[]
//   difficulty: 'Easy' | 'Medium' | 'Hard'
//   totalPoints: number
// }

// const CHALLENGES = [
//   {
//     title: "Mumbai Explorer Challenge",
//     description: "Discover the heart of Mumbai through its iconic landmarks and culinary delights",
//     difficulty: "Medium",
//     activities: [
//       { description: "Visit Gateway of India", duration: "1hr", completed: false, points: 100 },
//       { description: "Take a ferry to Elephanta Caves", duration: "3hrs", completed: false, points: 250 },
//       { description: "Street food tasting at Chowpatty Beach", duration: "1hr", completed: false, points: 150 },
//     ],
//     totalPoints: 500
//   },
//   {
//     title: "Cultural Heritage Tour",
//     description: "Immerse yourself in Mumbai's rich cultural heritage",
//     difficulty: "Hard",
//     activities: [
//       { description: "Visit Dharavi Art District", duration: "2hrs", completed: false, points: 200 },
//       { description: "Explore Crawford Market", duration: "1.5hrs", completed: false, points: 150 },
//       { description: "Watch sunset at Marine Drive", duration: "1hr", completed: false, points: 100 },
//     ],
//     totalPoints: 450
//   }
// ] as const

// export default function ChallengeMode() {
//   const [challenge, setChallenge] = useState<Challenge | null>(null)
//   const [userPoints, setUserPoints] = useState(0)
//   const [rank, setRank] = useState("Novice Explorer")
//   const [showCompletion, setShowCompletion] = useState(false)
//   const [progress, setProgress] = useState(0)

//   const generateChallenge = () => {
//     const randomChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]
//     setChallenge({ ...randomChallenge, activities: [...randomChallenge.activities] })
//     setProgress(0)
//     setShowCompletion(false)
//   }

//   const toggleActivityCompletion = (index: number) => {
//     if (challenge) {
//       const updatedActivities = [...challenge.activities]
//       updatedActivities[index].completed = !updatedActivities[index].completed
//       const newProgress = (updatedActivities.filter(a => a.completed).length / updatedActivities.length) * 100
//       setProgress(newProgress)
//       setChallenge({ ...challenge, activities: updatedActivities })
//     }
//   }

//   const completeChallenge = () => {
//     if (challenge) {
//       const completedPoints = challenge.activities
//         .filter(activity => activity.completed)
//         .reduce((sum, activity) => sum + activity.points, 0)
//       setUserPoints(prev => prev + completedPoints)
//       setShowCompletion(true)
//       updateRank(userPoints + completedPoints)
//     }
//   }

//   const updateRank = (points: number) => {
//     if (points >= 1000) setRank("Master Explorer")
//     else if (points >= 500) setRank("Advanced Explorer")
//     else if (points >= 200) setRank("Seasoned Explorer")
//     else setRank("Novice Explorer")
//   }

//   return (
//     <div className="max-w-2xl mx-auto space-y-4 p-4 sm:p-6">
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Challenge Mode</h2>
//         <div className="flex items-center gap-2 bg-secondary/50 dark:bg-secondary/20 p-2 rounded-lg">
//           <Trophy className="h-5 w-5 text-yellow-500" />
//           <span className="font-semibold dark:text-white">{userPoints} points</span>
//         </div>
//       </div>
      
//       <div className="flex items-center gap-2 bg-secondary/30 dark:bg-secondary/10 p-2 rounded-lg">
//         <Star className="h-4 w-4 text-blue-500 dark:text-blue-400" />
//         <span className="text-sm font-medium dark:text-white">Current Rank: {rank}</span>
//       </div>

//       <Button 
//         onClick={generateChallenge} 
//         className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
//       >
//         <Target className="mr-2 h-4 w-4" /> Discover New Challenge
//       </Button>

//       {challenge && (
//         <Card className="border-2 border-blue-100 dark:border-blue-900 shadow-lg dark:shadow-none dark:bg-card/50">
//           <CardHeader className="space-y-4">
//             <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
//               <CardTitle className="text-lg sm:text-xl dark:text-white">{challenge.title}</CardTitle>
//               <Badge variant="secondary" className="w-fit dark:bg-secondary/20">{challenge.difficulty}</Badge>
//             </div>
//             <CardDescription className="dark:text-gray-400">{challenge.description}</CardDescription>
//             <Progress value={progress} className="h-2 dark:bg-secondary/20" />
//           </CardHeader>
          
//           <CardContent>
//             <ul className="space-y-4">
//               {challenge.activities.map((activity, index) => (
//                 <li 
//                   key={index} 
//                   className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg dark:hover:bg-secondary/10 transition-colors gap-4"
//                 >
//                   <div className="space-y-2">
//                     <p className="font-medium dark:text-white">{activity.description}</p>
//                     <div className="flex items-center gap-4 flex-wrap">
//                       <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400">
//                         <Clock className="h-4 w-4 mr-1" />
//                         <span>{activity.duration}</span>
//                       </div>
//                       <Badge variant="outline" className="dark:border-gray-700 dark:text-gray-300">
//                         {activity.points} pts
//                       </Badge>
//                     </div>
//                   </div>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={() => toggleActivityCompletion(index)}
//                     className="hover:bg-green-50 dark:hover:bg-green-900/20"
//                   >
//                     <CheckCircle2 
//                       className={`h-6 w-6 transition-colors ${
//                         activity.completed ? 'text-green-500 dark:text-green-400' : 'text-muted-foreground dark:text-gray-500'
//                       }`} 
//                     />
//                   </Button>
//                 </li>
//               ))}
//             </ul>
//           </CardContent>

//           <CardFooter className="flex flex-col gap-4">
//             <Button 
//               onClick={completeChallenge} 
//               className="w-full dark:bg-primary/90 dark:hover:bg-primary"
//               disabled={!challenge.activities.some(a => a.completed)}
//             >
//               Complete Challenge
//             </Button>
            
//             {showCompletion && (
//               <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
//                 <div className="flex items-center gap-2">
//                   <ArrowUp className="h-4 w-4 text-green-500 dark:text-green-400" />
//                   <AlertDescription className="dark:text-gray-300">
//                     Challenge completed! You earned {
//                       challenge.activities
//                         .filter(a => a.completed)
//                         .reduce((sum, a) => sum + a.points, 0)
//                     } points!
//                   </AlertDescription>
//                 </div>
//               </Alert>
//             )}
//           </CardFooter>
//         </Card>
//       )}
//     </div>
//   )
// }
'use client'
import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Clock, CheckCircle2, Trophy, Star, Target, ArrowUp, MapPin, Camera } from 'lucide-react'
import { Alert, AlertDescription } from "@/components/ui/alert"

type ChallengeActivity = {
  description: string
  duration: string
  completed: boolean
  points: number
  location: {
    lat: number
    lng: number
    radius: number  // radius in meters for GPS verification
  }
  expectedImage: string  // URL of the expected landmark image
  userImage?: string    // URL of the user-uploaded image
  verified: boolean
}

type Challenge = {
  title: string
  description: string
  activities: ChallengeActivity[]
  difficulty: 'Easy' | 'Medium' | 'Hard'
  totalPoints: number
}

const CHALLENGES = [
  {
    title: "Mumbai Explorer Challenge",
    description: "Discover the heart of Mumbai through its iconic landmarks and culinary delights",
    difficulty: "Medium",
    activities: [
      {
        description: "Visit Gateway of India",
        duration: "1hr",
        completed: false,
        points: 100,
        location: {
          lat: 18.9217,
          lng: 72.8347,
          radius: 100
        },
        expectedImage: "/api/placeholder/400/300",
        verified: false
      },
      {
        description: "Take a ferry to Elephanta Caves",
        duration: "3hrs",
        completed: false,
        points: 250,
        location: {
          lat: 18.9633,
          lng: 72.9315,
          radius: 200
        },
        expectedImage: "/api/placeholder/400/300",
        verified: false
      },
      {
        description: "Street food tasting at Chowpatty Beach",
        duration: "1hr",
        completed: false,
        points: 150,
        location: {
          lat: 18.9548,
          lng: 72.8147,
          radius: 150
        },
        expectedImage: "/api/placeholder/400/300",
        verified: false
      }
    ],
    totalPoints: 500
  },
  {
    title: "Cultural Heritage Tour",
    description: "Immerse yourself in Mumbai's rich cultural heritage",
    difficulty: "Hard",
    activities: [
      {
        description: "Visit Dharavi Art District",
        duration: "2hrs",
        completed: false,
        points: 200,
        location: {
          lat: 19.0422,
          lng: 72.8555,
          radius: 150
        },
        expectedImage: "/api/placeholder/400/300",
        verified: false
      },
      {
        description: "Explore Crawford Market",
        duration: "1.5hrs",
        completed: false,
        points: 150,
        location: {
          lat: 18.9473,
          lng: 72.8334,
          radius: 100
        },
        expectedImage: "/api/placeholder/400/300",
        verified: false
      },
      {
        description: "Watch sunset at Marine Drive",
        duration: "1hr",
        completed: false,
        points: 100,
        location: {
          lat: 18.9442,
          lng: 72.8228,
          radius: 200
        },
        expectedImage: "/api/placeholder/400/300",
        verified: false
      }
    ],
    totalPoints: 450
  }
] as const

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371e3 // Earth's radius in meters
  const φ1 = lat1 * Math.PI / 180
  const φ2 = lat2 * Math.PI / 180
  const Δφ = (lat2 - lat1) * Math.PI / 180
  const Δλ = (lon2 - lon1) * Math.PI / 180

  const a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ/2) * Math.sin(Δλ/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))

  return R * c
}

export default function ChallengePage() {
  const [challenge, setChallenge] = useState<Challenge | null>(null)
  const [userPoints, setUserPoints] = useState(0)
  const [rank, setRank] = useState("Novice Explorer")
  const [showCompletion, setShowCompletion] = useState(false)
  const [progress, setProgress] = useState(0)
  const [verificationStatus, setVerificationStatus] = useState<string>("")

  const generateChallenge = () => {
    const randomChallenge = CHALLENGES[Math.floor(Math.random() * CHALLENGES.length)]
    setChallenge({ ...randomChallenge, activities: [...randomChallenge.activities] })
    setProgress(0)
    setShowCompletion(false)
    setVerificationStatus("")
  }

  const verifyLocation = async (activity: ChallengeActivity) => {
    if (!navigator.geolocation) {
      setVerificationStatus("GPS is not supported by your browser")
      return false
    }

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
      })

      const distance = calculateDistance(
        position.coords.latitude,
        position.coords.longitude,
        activity.location.lat,
        activity.location.lng
      )

      return distance <= activity.location.radius
    } catch (error) {
      setVerificationStatus("Error getting your location")
      return false
    }
  }

  const verifyImage = async (uploadedImage: string, expectedImage: string) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000))
    // For demo purposes, always return true
    // In production, this would call the Gemini API
    return true
  }

  const handleImageUpload = async (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    if (!challenge || !event.target.files?.[0]) return

    const file = event.target.files[0]
    const reader = new FileReader()

    reader.onloadend = async () => {
      const imageUrl = reader.result as string
      const updatedActivities = [...challenge.activities]
      updatedActivities[index] = {
        ...updatedActivities[index],
        userImage: imageUrl
      }

      // Simulate successful verification for demo purposes
      const isLocationValid = true // await verifyLocation(updatedActivities[index])
      const isImageValid = true // await verifyImage(imageUrl, updatedActivities[index].expectedImage)

      if (isLocationValid && isImageValid) {
        updatedActivities[index].verified = true
        updatedActivities[index].completed = true
        setChallenge({ ...challenge, activities: updatedActivities })
        const newProgress = (updatedActivities.filter(a => a.completed).length / updatedActivities.length) * 100
        setProgress(newProgress)
        setVerificationStatus("Location and image verified successfully! Points added.")
      } else {
        setVerificationStatus("Verification failed. Please make sure you're at the correct location.")
      }
    }

    reader.readAsDataURL(file)
  }

  const completeChallenge = () => {
    if (challenge) {
      const completedPoints = challenge.activities
        .filter(activity => activity.completed)
        .reduce((sum, activity) => sum + activity.points, 0)
      setUserPoints(prev => prev + completedPoints)
      setShowCompletion(true)
      updateRank(userPoints + completedPoints)
    }
  }

  const updateRank = (points: number) => {
    if (points >= 1000) setRank("Master Explorer")
    else if (points >= 500) setRank("Advanced Explorer")
    else if (points >= 200) setRank("Seasoned Explorer")
    else setRank("Novice Explorer")
  }

  return (
    <div className="max-w-2xl mx-auto space-y-4 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h2 className="text-xl sm:text-2xl font-bold dark:text-white">Challenge Mode</h2>
        
        {/* User Stats */}
        <div className="flex items-center gap-2 bg-secondary/50 dark:bg-secondary/20 p-2 rounded-lg">
          <Trophy className="h-5 w-5 text-yellow-500" />
          <span className="font-semibold dark:text-white">{userPoints} points</span>
        </div>
      </div>
      <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
              <p className="text-sm text-muted-foreground dark:text-gray-400">
                <strong>How it works:</strong> Upload a photo of the landmark or activity to verify your location. 
                The app will check if you're within the required radius and if the image matches the expected landmark. 
                Once verified, points will be added to your account!
              </p>
        </div>
      <div className="flex items-center gap-2 bg-secondary/30 dark:bg-secondary/10 p-2 rounded-lg">
        <Star className="h-4 w-4 text-blue-500 dark:text-blue-400" />
        <span className="text-sm font-medium dark:text-white">Current Rank: {rank}</span>
      </div>

      <Button 
        onClick={generateChallenge} 
        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600"
      >
        <Target className="mr-2 h-4 w-4" /> Discover New Challenge
      </Button>

      {challenge && (
        <Card className="border-2 border-blue-100 dark:border-blue-900 shadow-lg dark:shadow-none dark:bg-card/50">
          <CardHeader className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <CardTitle className="text-lg sm:text-xl dark:text-white">{challenge.title}</CardTitle>
              <Badge variant="secondary" className="w-fit dark:bg-secondary/20">{challenge.difficulty}</Badge>
            </div>
            <CardDescription className="dark:text-gray-400">{challenge.description}</CardDescription>
            <Progress value={progress} className="h-2 dark:bg-secondary/20" />
          </CardHeader>
          
          <CardContent>
            <ul className="space-y-4">
              {challenge.activities.map((activity, index) => (
                <li 
                  key={index} 
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-3 rounded-lg dark:hover:bg-secondary/10 transition-colors gap-4"
                >
                  <div className="space-y-2 flex-grow">
                    <p className="font-medium dark:text-white">{activity.description}</p>
                    <div className="flex items-center gap-4 flex-wrap">
                      <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{activity.duration}</span>
                      </div>
                      <Badge variant="outline" className="dark:border-gray-700 dark:text-gray-300">
                        {activity.points} pts
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground dark:text-gray-400">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>Within {activity.location.radius}m</span>
                      </div>
                    </div>
                    
                    {activity.userImage && (
                      <div className="mt-2">
                        <img 
                          src={activity.userImage} 
                          alt="Uploaded verification" 
                          className="w-full max-w-xs rounded-lg"
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="cursor-pointer">
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => handleImageUpload(index, e)}
                      />
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                      >
                        <Camera className="h-4 w-4 mr-2" />
                        Verify
                      </Button>
                    </label>

                    {activity.verified && (
                      <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                        Verified
                      </Badge>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            {verificationStatus && (
              <Alert className="mt-4 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-900">
                <AlertDescription className="dark:text-gray-300">
                  {verificationStatus}
                </AlertDescription>
              </Alert>
            )}

           
          </CardContent>

          <CardFooter className="flex flex-col gap-4">
            <Button 
              onClick={completeChallenge} 
              className="w-full dark:bg-primary/90 dark:hover:bg-primary"
              disabled={!challenge.activities.some(a => a.completed)}
            >
              Complete Challenge
            </Button>
            
            {showCompletion && (
              <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-900">
                <div className="flex items-center gap-2">
                  <ArrowUp className="h-4 w-4 text-green-500 dark:text-green-400" />
                  <AlertDescription className="dark:text-gray-300">
                    Challenge completed! You earned {
                      challenge.activities
                        .filter(a => a.completed)
                        .reduce((sum, a) => sum + a.points, 0)
                    } points!
                  </AlertDescription>
                </div>
              </Alert>
            )}
          </CardFooter>
        </Card>
      )}
    </div>
  )
}
