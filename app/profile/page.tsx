'use client'

import { useEffect, useState } from 'react';
import { Profile, UpdateProfileRequest } from '@/types/profile';
import { Trophy, Activity, Sparkle, ChevronUp } from 'lucide-react';
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const ProfilePage = () => {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(0);
  const [completedActivities, setCompletedActivities] = useState(0);
  const [achievements, setAchievements] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch('/api/profile');
        const data = await res.json();
        if (res.ok) {
          setProfile(data);
          setUsername(data.username);
          setPoints(data.points);
          setCompletedActivities(data.completed_activities);
          setAchievements(data.achievements.join(', '));
          setAvatarUrl(data.avatar_url || '');
        } else {
          setError(data.message || "Failed to fetch profile data");
        }
      } catch (error) {
        setError("Something went wrong while fetching profile data.");
      }
    };

    fetchProfile();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const updatedProfile: UpdateProfileRequest = {
      username,
      points,
      completed_activities: completedActivities,
      achievements: achievements ? achievements.split(',').map(item => item.trim()) : [],
      avatar_url: avatarUrl,
    };

    try {
      const res = await fetch('/api/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfile),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess("Profile updated successfully!");
        setError('');
      } else {
        setSuccess('');
        setError(data.message || "Failed to update profile.");
      }
    } catch (error) {
      setError("Something went wrong. Please try again later.");
      setSuccess('');
    }
  };

  if (!profile) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-xl text-primary font-semibold">
          Loading profile...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background px-4 py-8">
      <Card className="max-w-xl mx-auto border-0 shadow-xl overflow-hidden bg-card/50 backdrop-blur">
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 p-6 sm:p-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-grid-white/10 mask-gradient"></div>
          <div className="relative flex flex-col items-center space-y-4">
            <div className="relative group">
              <div className="absolute inset-0 bg-blue-500/40 rounded-full blur-lg group-hover:bg-blue-400/50 transition-colors"></div>
              <img
                src={avatarUrl || "https://gravatar.com/avatar/1f82b0492a0a938288c2d5b70534a1fb?s=400&d=robohash&r=x"}
                alt={profile.username}
                className="relative h-24 w-24 sm:h-32 sm:w-32 rounded-full object-cover border-4 border-white/20 shadow-xl"
              />
              <div className="absolute -bottom-2 right-0 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-3 py-1 rounded-full text-sm shadow-lg backdrop-blur-sm">
                <div className="flex items-center gap-1">
                  <Sparkle className="w-4 h-4" />
                  <span>Level {Math.floor(points / 100)}</span>
                </div>
              </div>
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-bold text-white">{profile.username}</h3>
              <p className="text-blue-200">Adventure Seeker</p>
            </div>
          </div>
        </div>

        {error && (
          <Alert variant="destructive" className="rounded-none border-l-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert className="rounded-none border-l-4 border-green-500 bg-green-500/10">
            <AlertDescription className="text-green-400">{success}</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-3 p-4 sm:p-6">
          <Card className="bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Trophy className="w-4 h-4 text-blue-400" />
                <div className="text-sm font-medium">Total Points</div>
              </div>
              <div className="text-2xl font-bold mt-1">{points}</div>
            </CardContent>
          </Card>
          <Card className="bg-card/50 hover:bg-card/80 transition-colors">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-blue-400" />
                <div className="text-sm font-medium">Activities</div>
              </div>
              <div className="text-2xl font-bold mt-1">{completedActivities}</div>
            </CardContent>
          </Card>
        </div>

        <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Username</label>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-card"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Points</label>
                <Input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(Number(e.target.value))}
                  className="bg-card"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Activities</label>
                <Input
                  type="number"
                  value={completedActivities}
                  onChange={(e) => setCompletedActivities(Number(e.target.value))}
                  className="bg-card"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Achievements</label>
              <Textarea
                value={achievements}
                onChange={(e) => setAchievements(e.target.value)}
                className="bg-card"
                rows={3}
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Avatar URL</label>
              <Input
                type="text"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="bg-card"
              />
            </div>
          </div>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg transition duration-200 transform hover:scale-[1.02] hover:shadow-blue-500/20"
          >
            Save Changes
          </Button>
        </form>
      </Card>
    </div>
  );
};

export default ProfilePage;
