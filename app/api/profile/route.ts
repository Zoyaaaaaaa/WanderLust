// import { NextRequest, NextResponse } from 'next/server';
// import { createClient } from '@/utils/supabase/server';
// import { UpdateProfileRequest } from "@/types/profile"; 
// export async function GET(req: NextResponse) {
//   const supabase = await createClient();

//   // Get the user ID from the session
//   const { data: { user } } = await supabase.auth.getUser();

//   // Check if the user is logged in
//   if (!user) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   // Fetch profile data from the 'profiles' table using the user_id
//   const { data, error } = await supabase
//     .from("profiles")
//     .select("*")
//     .eq("user_id", user.id)
//     .single(); // Get single result

//   if (error) {
//     return NextResponse.json({ message: "Error fetching profile data" }, { status: 500 });
//   }

//   return NextResponse.json(data);
// }
// // Import the UpdateProfileRequest interface

// // Handle POST request to update user profile
// export async function POST(req: NextRequest) {
 
//     const supabase = await createClient();
//   // Parse the incoming request body
//   const { username, points, completed_activities, achievements, avatar_url }: UpdateProfileRequest = await req.json();

//   // Get the user ID from the session
//   const { data: { user } } = await supabase.auth.getUser();

//   // Check if the user is logged in
//   if (!user) {
//     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
//   }

//   // Validate that at least one field is provided to update
//   if (!username && !points && !completed_activities && !achievements && !avatar_url) {
//     return NextResponse.json({ message: "No data provided to update" }, { status: 400 });
//   }

//   // Build the update object
//   const updateData: { [key: string]: any } = {};
//   if (username) updateData.username = username;
//   if (points) updateData.points = points;
//   if (completed_activities) updateData.completed_activities = completed_activities;
//   if (achievements) updateData.achievements = achievements;
//   if (avatar_url) updateData.avatar_url = avatar_url;

//   // Update profile in the database
//   const { data, error } = await supabase
//     .from("profiles")
//     .update(updateData)
//     .eq("user_id", user.id);

//   if (error) {
//     return NextResponse.json({ message: "Error updating profile", error: error.message }, { status: 500 });
//   }

//   // Return the updated profile data
//   return NextResponse.json(data, { status: 200 });
// }

import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';
import { UpdateProfileRequest } from "@/types/profile"; 

export async function GET(req: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", user.id)
    .single();

  if (error) {
    return NextResponse.json({ message: "Error fetching profile data" }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  const supabase = await createClient();
  const { username, points, completed_activities, achievements, avatar_url }: UpdateProfileRequest = await req.json();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  if (!username && !points && !completed_activities && !achievements && !avatar_url) {
    return NextResponse.json({ message: "No data provided to update" }, { status: 400 });
  }

  const updateData: { [key: string]: any } = {};
  if (username) updateData.username = username;
  if (points) updateData.points = points;
  if (completed_activities) updateData.completed_activities = completed_activities;
  if (achievements) updateData.achievements = achievements;
  if (avatar_url) updateData.avatar_url = avatar_url;

  const { data, error } = await supabase
    .from("profiles")
    .update(updateData)
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ message: "Error updating profile", error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 200 });
}
