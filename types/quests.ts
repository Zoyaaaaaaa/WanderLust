// types/quests.ts

export interface QuestStep {
    id: string;
    title: string;
    description: string;
    duration: number; // in minutes
    location: string;
    completed?: boolean;
    tips?: string;
    recommendedGroup?: string;
    requirements?: string[];
  }
  
  export interface Quest {
    id: string;
    title: string;
    description: string;
    city: string;
    theme: string;
    duration: number; // in hours
    difficulty: 'Easy' | 'Moderate' | 'Challenging';
    steps: QuestStep[];
    totalRewards?: number;
    completionCriteria?: string[];
    tags?: string[];
    imageUrl?: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  export interface QuestProgress {
    questId: string;
    userId: string;
    completedSteps: string[]; // Array of step IDs
    startedAt: Date;
    lastUpdated: Date;
    completed: boolean;
    completedAt?: Date;
  }
  
  export interface QuestGenerationParams {
    city: string;
    theme?: string;
    duration: number;
    preferences?: {
      difficulty?: 'Easy' | 'Moderate' | 'Challenging';
      groupSize?: number;
      budget?: 'Low' | 'Medium' | 'High';
      accessibility?: boolean;
      indoor?: boolean;
      timeOfDay?: 'Morning' | 'Afternoon' | 'Evening' | 'Night';
    };
  }
  
  export interface QuestTheme {
    id: string;
    name: string;
    description: string;
    suggestedDuration: number;
    recommendedGroupSize: string;
    categories: string[];
    defaultStepTemplates: Partial<QuestStep>[];
  }
  
  export interface UserQuestStats {
    userId: string;
    totalQuestsStarted: number;
    totalQuestsCompleted: number;
    favoriteThemes: string[];
    totalTimeSpent: number; // in minutes
    achievements: string[];
    level: number;
    experience: number;
  }
  
  export type QuestDifficulty = 'Easy' | 'Moderate' | 'Challenging';
  
  export interface QuestReward {
    id: string;
    questId: string;
    type: 'Points' | 'Badge' | 'Achievement' | 'Unlock';
    value: number;
    description: string;
    conditions: string[];
  }
  
  export interface QuestFilter {
    city?: string;
    theme?: string[];
    duration?: {
      min?: number;
      max?: number;
    };
    difficulty?: QuestDifficulty[];
    groupSize?: number;
    timeOfDay?: string[];
    indoor?: boolean;
    accessibility?: boolean;
    budget?: string[];
  }