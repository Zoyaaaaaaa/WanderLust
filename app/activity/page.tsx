'use client'
import React, { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Clock, MapPin, Sparkles } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { createClient } from "@/utils/supabase/client";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Activity {
  id: string;
  name: string;
  category: 'Food' | 'Culture' | 'Adventure';
  difficulty: 'Easy' | 'Medium' | 'Hard';
  time_estimate: string;
  description: string;
  location: string;
  completed?: boolean;
}

interface Challenge {
  title: string;
  activities: Activity[];
}

const GenerateActivityPage = () => {
  const [cityInput, setCityInput] = useState('');
  const [localityInput, setLocalityInput] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [generating, setGenerating] = useState(false);
  const [generatedChallenge, setGeneratedChallenge] = useState<Challenge | null>(null);
  const [accessToken, setAccessToken] = useState<string>('');
  const [showWelcomeAlert, setShowWelcomeAlert] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error || !session) {
        window.location.href = "/sign-in";
        return;
      }
      
      setAccessToken(session.access_token);
    };
    fetchUser();
  }, []);

  const generateChallenge = async () => {
    if (!cityInput.trim()) {
      setErrorMessage('Please enter a city name');
      return;
    }

    setGenerating(true);
    setErrorMessage('');

    try {
      const response = await fetch('/api/generate-activities', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({
          city: cityInput.trim(),
          locality: localityInput.trim(),
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate activities');
      }

      const data = await response.json();

      if (data.activities) {
        const challengeData: Challenge = {
          title: `Explore ${cityInput}${localityInput ? `, ${localityInput}` : ''}`,
          activities: data.activities.map((activity: Activity) => ({
            ...activity,
            id: uuidv4(),
          })),
        };
        setGeneratedChallenge(challengeData);
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Error generating challenge');
    } finally {
      setGenerating(false);
    }
  };

  const toggleActivityComplete = (activityId: string) => {
    if (!generatedChallenge) return;
    setGeneratedChallenge({
      ...generatedChallenge,
      activities: generatedChallenge.activities.map(activity => 
        activity.id === activityId ? { ...activity, completed: !activity.completed } : activity
      )
    });
  };

  const calculateProgress = () => {
    if (!generatedChallenge?.activities.length) return 0;
    return Math.round((generatedChallenge.activities.filter(a => a.completed).length / generatedChallenge.activities.length) * 100);
  };

  return (
    <div className="max-w-2xl mx-auto p-4 space-y-6">
      {showWelcomeAlert && (
        <Alert className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20">
          <Sparkles className="h-4 w-4 text-blue-400" />
          <AlertDescription className="text-blue-100">
            Ready to discover your next adventure? Let's create a personalized journey just for you!
          </AlertDescription>
          <button 
            onClick={() => setShowWelcomeAlert(false)}
            className="absolute top-2 right-2 text-blue-400 hover:text-blue-300"
          >
            ×
          </button>
        </Alert>
      )}

      <Card className="bg-card/50 backdrop-blur border-blue-500/20 overflow-hidden hover:border-blue-500/30 transition-colors">
        <CardHeader className="border-b border-blue-500/20">
          <CardTitle className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-400" />
            Adventure Generator
          </CardTitle>
        </CardHeader>

        <CardContent className="p-4 md:p-6">
          <div className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-blue-950/50 border border-blue-500/30 text-white placeholder-blue-300/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  placeholder="Enter city"
                />
              </div>
              <div>
                <input
                  type="text"
                  className="w-full p-3 rounded-lg bg-blue-950/50 border border-blue-500/30 text-white placeholder-blue-300/50 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition"
                  value={localityInput}
                  onChange={(e) => setLocalityInput(e.target.value)}
                  placeholder="Enter locality (optional)"
                />
              </div>
            </div>

            <button
              onClick={generateChallenge}
              className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={generating}
            >
              {generating ? 'Crafting Your Adventure...' : 'Generate Adventure'}
            </button>

            {errorMessage && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-200">
                {errorMessage}
              </div>
            )}

            {generatedChallenge && (
              <div className="mt-6 space-y-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <h2 className="text-lg md:text-xl font-bold text-blue-300">{generatedChallenge.title}</h2>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-blue-300">{calculateProgress()}% Complete</span>
                    <div className="h-2 w-24 bg-blue-950/50 rounded-full">
                      <div 
                        className="h-full bg-blue-500 rounded-full transition-all duration-500"
                        style={{ width: `${calculateProgress()}%` }}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-4">
                  {generatedChallenge.activities.map((activity) => (
                    <Card 
                      key={activity.id} 
                      className={`bg-card/50 backdrop-blur border-blue-500/20 overflow-hidden hover:border-blue-500/30 transition-colors ${
                        activity.completed ? 'opacity-75' : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="flex-1 space-y-3">
                            <div className="flex flex-wrap items-center gap-2">
                              <h3 className="text-lg font-semibold text-blue-200">{activity.name}</h3>
                              <Badge className="bg-blue-500/20 text-blue-200 hover:bg-blue-500/30">{activity.category}</Badge>
                              <Badge className="bg-blue-500/10 text-blue-200 hover:bg-blue-500/20">{activity.difficulty}</Badge>
                            </div>
                            <p className="text-blue-100 text-sm md:text-base">{activity.description}</p>
                            <div className="flex flex-wrap items-center gap-4 text-sm text-blue-300">
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />
                                {activity.time_estimate}
                              </div>
                              <div className="flex items-center gap-1">
                                <MapPin className="h-4 w-4" />
                                {activity.location}
                              </div>
                            </div>
                          </div>
                          <button
                            onClick={() => toggleActivityComplete(activity.id)}
                            className={`p-2 rounded-full transition-colors ${
                              activity.completed 
                                ? 'bg-blue-500 text-white' 
                                : 'bg-blue-500/20 text-blue-300 hover:bg-blue-500/30'
                            }`}
                          >
                            <Check className="h-5 w-5" />
                          </button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GenerateActivityPage;
