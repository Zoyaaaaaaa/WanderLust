'use client'

import { useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Utensils, Palette, Compass, Clock, BarChart } from "lucide-react";
import React from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// Define activity types
interface Activity {
  id: string;
  category: "Food" | "Culture" | "Adventure";
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  time_estimate: string;
  user_id: string;
}

const categoryIcons = {
  Food: Utensils,
  Culture: Palette,
  Adventure: Compass,
};

export default function ActivityDisplay({ userId }: { userId: string }) {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchActivities = async () => {
      setLoading(true);
      const { data, error } = await supabase
        .from("activities")
        .select("*")
        .eq("user_id", userId);

      if (error) {
        console.error("Error fetching activities:", error);
      } else {
        setActivities(data || []);
      }
      setLoading(false);
    };

    fetchActivities();
  }, [userId]);

  return (
    <div className="space-y-6 p-4">
      <h2 className="text-2xl font-bold text-center">Your Activities</h2>

      {loading ? (
        <p className="text-center">Loading activities...</p>
      ) : activities.length === 0 ? (
        <p className="text-center text-muted-foreground">No activities found. Start by adding some!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity) => (
            <Card key={activity.id} className="bg-card text-card-foreground shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center">
                  {categoryIcons[activity.category] &&
                    React.createElement(categoryIcons[activity.category], {
                      className: "h-6 w-6 mr-2",
                    })}
                  <span className="text-lg font-semibold">{activity.category}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-md mb-4 text-muted-foreground">{activity.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{activity.time_estimate}</span>
                  </div>
                  <div className="flex items-center">
                    <BarChart className="h-5 w-5 mr-2 text-muted-foreground" />
                    <span>{activity.difficulty}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">Start Activity</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
