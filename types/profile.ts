// types/profile.ts

// Interface for the profile data response (GET response)
export interface Profile {
    id: string;
    user_id: string;
    username: string;
    points: number;
    completed_activities: number;
    achievements: string[];
    avatar_url: string | null;
    created_at: string;
  }
  
  // Interface for the body of the request (POST request)
  export interface UpdateProfileRequest {
    username?: string;
    points?: number;
    completed_activities?: number;
    achievements?: string[];
    avatar_url?: string;
  }
  