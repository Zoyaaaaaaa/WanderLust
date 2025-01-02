'use client';

import { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2, MapPin, Clock, Trophy, Star, Sparkle } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";

type Post = {
  id: number;
  username: string;
  avatar: string;
  content: string;
  image: string;
  likes: number;
  comments: number;
  location?: string;
  timeAgo?: string;
  tags?: string[];
  isLiked?: boolean;
  questPoints?: number;
  userLevel?: number;
  challengeCompleted?: string;
};

const dummyPosts: Post[] = [
  {
    id: 1,
    username: "TravelLover",
    avatar: "/api/placeholder/40/40",
    content: "Just completed the Mumbai street food challenge! The flavors were incredible, and meeting local vendors was such a unique experience! 🍜 #ChallengeCompleted",
    image: "https://cdn.getyourguide.com/img/tour/3359d156964602e341d47aaf7cf05a1ac15c09d3b08960a6c69c12bdafc950de.jpg/68.jpg",
    likes: 24,
    comments: 5,
    location: "Mumbai, India",
    timeAgo: "2h ago",
    tags: ["MumbaiFoodie", "StreetFood", "FoodChallenge"],
    isLiked: false,
    questPoints: 150,
    userLevel: 5,
    challengeCompleted: "Mumbai Street Food Explorer"
  },
  {
    id: 2,
    username: "CultureExplorer",
    avatar: "/api/placeholder/40/40",
    content: "Discovered amazing street art in Bandra today! The creativity in this neighborhood is absolutely breathtaking. Every corner tells a unique story! 🎨",
    image: "https://images.squarespace-cdn.com/content/v1/594fd52fe6f2e1bb5896e1f3/1535197292940-FHPYW8CPNFU28U8L8Z17/Mumbai-30.jpg",
    likes: 18,
    comments: 3,
    location: "Bandra, Mumbai",
    timeAgo: "4h ago",
    tags: ["MumbaiArt", "StreetArt", "Urban"],
    isLiked: false,
    questPoints: 100,
    userLevel: 3
  }
];

export default function CommunityPage() {
  const [posts, setPosts] = useState<Post[]>(dummyPosts);
  const [showFeatureAlert, setShowFeatureAlert] = useState(true);

  const handleLike = (postId: number) => {
    setPosts(posts.map(post =>
      post.id === postId 
        ? { ...post, likes: post.isLiked ? post.likes - 1 : post.likes + 1, isLiked: !post.isLiked } 
        : post
    ));
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {showFeatureAlert && (
        <Alert className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <Sparkle className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-100">
            Coming Soon: Collaborate with fellow explorers, earn points through social interactions, and boost your journey! Share your adventures and earn rewards when your content resonates with the community.
          </AlertDescription>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setShowFeatureAlert(false)}
            className="absolute top-2 right-2 text-blue-400 hover:text-blue-300"
          >
            ×
          </Button>
        </Alert>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">Community Feed</h1>
        <Button 
          variant="outline" 
          className="border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
        >
          Share Adventure
        </Button>
      </div>

      <div className="space-y-6">
        {posts.map(post => (
          <Card key={post.id} className="bg-card/50 backdrop-blur border-blue-500/20 overflow-hidden hover:border-blue-500/30 transition-colors">
            <CardHeader className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <Avatar className="h-10 w-10 border-2 border-blue-500/30">
                      <AvatarImage src={post.avatar} alt={post.username} />
                      <AvatarFallback className="bg-blue-900 text-blue-200">
                        {post.username.slice(0, 2).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    {post.userLevel && (
                      <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full px-1.5 py-0.5 text-xs text-white font-medium">
                        {post.userLevel}
                      </div>
                    )}
                  </div>
                  <div>
                    <CardTitle className="text-lg">{post.username}</CardTitle>
                    <div className="flex items-center text-sm text-muted-foreground space-x-2">
                      {post.location && (
                        <div className="flex items-center">
                          <MapPin className="mr-1 h-3 w-3" />
                          <span>{post.location}</span>
                        </div>
                      )}
                      {post.timeAgo && (
                        <div className="flex items-center">
                          <Clock className="mr-1 h-3 w-3" />
                          <span>{post.timeAgo}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-4 pt-0 space-y-4">
              {post.challengeCompleted && (
                <div className="flex items-center gap-2 p-2 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
                  <Trophy className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-blue-100">Completed: {post.challengeCompleted}</span>
                  <Badge variant="secondary" className="ml-auto bg-blue-500/20">
                    +{post.questPoints} pts
                  </Badge>
                </div>
              )}

              <p className="leading-relaxed">{post.content}</p>
              
              <div className="flex flex-wrap gap-2">
                {post.tags?.map(tag => (
                  <Badge 
                    key={tag} 
                    variant="secondary"
                    className="bg-blue-500/10 hover:bg-blue-500/20"
                  >
                    #{tag}
                  </Badge>
                ))}
              </div>

              <div className="relative rounded-xl overflow-hidden">
                <img 
                  src={post.image} 
                  alt="Post content" 
                  className="w-full h-auto object-cover transition-transform hover:scale-105 duration-300"
                />
              </div>
            </CardContent>

            <CardFooter className="p-4 border-t border-blue-500/10">
              <div className="w-full flex items-center justify-between">
                <Button 
                  variant="ghost" 
                  onClick={() => handleLike(post.id)} 
                  className={`text-sm ${post.isLiked ? 'text-blue-500' : 'text-muted-foreground'} hover:text-blue-400 hover:bg-blue-500/10`}
                >
                  <Heart className={`mr-2 h-4 w-4 ${post.isLiked ? 'fill-current' : ''}`} />
                  {post.likes}
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="text-sm text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {post.comments}
                </Button>
                
                <Button 
                  variant="ghost" 
                  className="text-sm text-muted-foreground hover:text-blue-400 hover:bg-blue-500/10"
                >
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}