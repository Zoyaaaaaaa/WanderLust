// // import { generateObject } from 'ai';
// // import { createOpenAI as createGroq } from '@ai-sdk/openai';
// // import { z } from 'zod';
// // import { NextRequest, NextResponse } from 'next/server';

// // // Validate environment variables
// // if (!process.env.GROQ_API_KEY) {
// //   throw new Error('GROQ_API_KEY is not set in environment variables');
// // }

// // // Initialize the Groq AI instance
// // const groq = createGroq({
// //   baseURL: 'https://api.groq.com/openai/v1',
// //   apiKey: process.env.GROQ_API_KEY,
// // });

// // // Define a comprehensive Zod schema for activity generation
// // const ActivitySchema = z.object({
// //   activities: z.array(
// //     z.object({
// //       name: z.string().min(3, "Activity name must be at least 3 characters"),
// //       category: z.enum(['Food', 'Culture', 'Adventure']),
// //       difficulty: z.enum(['Easy', 'Medium', 'Hard']),
// //       timeEstimate: z.string().regex(/^(\d+)([hms])$/, "Time estimate must be in a valid format like '30m', '2h'"),
// //       description: z.string().min(10, "Description must be at least 10 characters"),
// //       location: z.string().min(5, "Location must be specified"),
// //     })
// //   ).min(1, "At least one activity is required"),
// // });

// // export async function POST(req: NextRequest) {
// //   try {
// //     // Parse the request body
// //     const body = await req.json();
// //     const { city } = body;

// //     // Validate input city
// //     if (!city || typeof city !== 'string' || city.trim().length < 3) {
// //       return NextResponse.json(
// //         { error: 'A valid city name is required' }, 
// //         { status: 400 }
// //       );
// //     }

// //     // Generate activities based on the city
// //     const { object } = await generateObject({
// //       model: groq('llama-3.1-70b-versatile'),
// //       schema: ActivitySchema,
// //       prompt: `Generate a list of activities in ${city}. 
// //         Each activity must include:
// //         - A meaningful name
// //         - Category: Food, Culture, or Adventure
// //         - Difficulty level: Easy, Medium, or Hard
// //         - Time estimate (e.g., 30m for 30 minutes, 2h for 2 hours)
// //         - Detailed description
// //         - Specific location within the city`,
// //     });

// //     // Validate the generated activities against the schema
// //     ActivitySchema.parse(object);
// //     console.log(object);

// //     // Here, you would insert the activities into the database.
// //     // Assuming you have a database function like `insertActivities`:
// //     // await insertActivities(object.activities);

// //     // Return the generated activities
// //     return NextResponse.json(object, { status: 200 });
// //   } catch (error) {
// //     console.error('Activity generation error:', error);

// //     // Handle different types of errors
// //     if (error instanceof z.ZodError) {
// //       return NextResponse.json(
// //         { 
// //           error: 'Invalid activities generated', 
// //           details: error.errors.map(e => e.message) 
// //         }, 
// //         { status: 422 }
// //       );
// //     }

// //     return NextResponse.json(
// //       { 
// //         error: 'Failed to generate activities', 
// //         details: error instanceof Error ? error.message : 'Unknown error' 
// //       }, 
// //       { status: 500 }
// //     );
// //   }
// // }
// import { generateObject } from 'ai';
// import { createOpenAI as createGroq } from '@ai-sdk/openai';
// import { z } from 'zod';
// import { NextRequest, NextResponse } from 'next/server';

// // Validate environment variables
// if (!process.env.GROQ_API_KEY) {
//   throw new Error('GROQ_API_KEY is not set in environment variables');
// }

// // Initialize Groq AI instance
// const groq = createGroq({
//   baseURL: 'https://api.groq.com/openai/v1',
//   apiKey: process.env.GROQ_API_KEY,
// });

// // Define a comprehensive Zod schema for activity generation
// const ActivitySchema = z.object({
//   activities: z.array(
//     z.object({
//       name: z.string().min(3, 'Activity name must be at least 3 characters'),
//       category: z.enum(['Food', 'Culture', 'Adventure']),
//       difficulty: z.enum(['Easy', 'Medium', 'Hard']),
//       time_estimate: z.string().regex(/^(\d+)([hms])$/, "Time estimate must be in a valid format like '30m', '2h'"),
//       description: z.string().min(10, 'Description must be at least 10 characters'),
//       location: z.string().min(5, 'Location must be specified'),
//     })
//   ).min(1, 'At least one activity is required'),
// });

// // POST endpoint to generate activities
// export async function POST(req: NextRequest) {
//   try {
//     // Parse the request body
//     const body = await req.json();
//     const { city } = body;

//     // Validate input city
//     if (!city || typeof city !== 'string' || city.trim().length < 3) {
//       return NextResponse.json({ error: 'A valid city name is required' }, { status: 400 });
//     }

//     // Generate activities using Groq
//     const { object } = await generateObject({
//       model: groq('llama-3.1-70b-versatile'),
//       schema: ActivitySchema,
//       prompt: `Generate a list of activities in ${city}. 
//         Each activity must include:
//         - A meaningful name
//         - Category: Food, Culture, or Adventure
//         - Difficulty level: Easy, Medium, or Hard
//         - Time estimate (e.g., 30m for 30 minutes, 2h for 2 hours)
//         - Detailed description
//         - Specific location within the city`,
//     });
//     console.log(object);
//     // Validate generated activities against the schema
//     ActivitySchema.parse(object);

//     // Return the generated activities without saving to the database
//     return NextResponse.json({ activities: object.activities }, { status: 200 });
    
//   } catch (error) {
//     console.error('Activity generation error:', error);

//     if (error instanceof z.ZodError) {
//       return NextResponse.json(
//         {
//           error: 'Invalid activities generated',
//           details: error.errors.map((e) => e.message),
//         },
//         { status: 422 }
//       );
//     }

//     return NextResponse.json(
//       {
//         error: 'Failed to generate activities',
//         details: error instanceof Error ? error.message : 'Unknown error',
//       },
//       { status: 500 }
//     );
//   }
// }

import { generateObject } from 'ai';
import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { boolean, z } from 'zod';
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from "@/utils/supabase/client";
import { cookies } from 'next/headers';

// Validate environment variables
if (!process.env.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is not set in environment variables');
}

// Initialize Groq AI instance
const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY,
});

// Define a comprehensive Zod schema for activity generation
const ActivitySchema = z.object({
  activities: z.array(
    z.object({
      name: z.string().min(3, 'Activity name must be at least 3 characters'),
      category: z.enum(['Food', 'Culture', 'Adventure']),
      difficulty: z.enum(['Easy', 'Medium', 'Hard']),
      time_estimate: z.string().regex(/^(\d+)([hms])$/, "Time estimate must be in a valid format like '30m', '2h'"),
      description: z.string().min(10, 'Description must be at least 10 characters'),
      location: z.string().min(5, 'Location must be specified'),
    })
  ).min(1, 'At least one activity is required'),
});

export async function POST(req: NextRequest) {
  try {
    // Get authentication token from request header
    const authHeader = req.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Missing authorization header' }, { status: 401 });
    }

    // Initialize Supabase with cookies
    const supabase = createClient();

    // Verify the session
    const { data: { user }, error: authError } = await supabase.auth.getUser(
      authHeader.replace('Bearer ', '')
    );

    if (authError || !user) {
      return NextResponse.json({ error: 'Invalid session' }, { status: 401 });
    }

    const body = await req.json();
    const { city, locality } = body;

    if (!city?.trim()) {
      return NextResponse.json({ error: 'City is required' }, { status: 400 });
    }

    const location = locality ? `${city.trim()}, ${locality.trim()}` : city.trim();

    const { object } = await generateObject({
      model: groq('llama-3.1-70b-versatile'),
      schema: ActivitySchema,
      prompt: `Generate a list of activities in ${location}. 
        Each activity must include:
        - A meaningful name
        - Category: Food, Culture, or Adventure
        - Difficulty level: Easy, Medium, or Hard
        - Time estimate (e.g., 30m for 30 minutes, 2h for 2 hours)
        - Detailed description
        - Specific location within the city`,
    });

    // Validate and save activities
    ActivitySchema.parse(object);
    
    const { error: insertError } = await supabase
      .from('activities')
      .insert(object.activities.map(activity => ({
        ...activity,
        user_id: user.id,
        completed:false
      })));

    if (insertError) throw insertError;

    return NextResponse.json({ activities: object.activities });
    
  } catch (error) {
    console.error('Error:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({
        error: 'Invalid activities generated',
        details: error.errors
      }, { status: 422 });
    }

    return NextResponse.json({
      error: 'Failed to generate activities',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}