// import React, { useState, useEffect } from 'react';
// import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
// import { Badge } from '@/components/ui/badge';
// import { Clock, MapPin, Trophy, Star, Users, Sparkles, ChevronRight } from 'lucide-react';
// import { createClient } from '@supabase/supabase-js';
// import { v4 as uuidv4 } from 'uuid';

// const GenerateQuestPage = () => {
//   const [cityInput, setCityInput] = useState('');
//   const [themeInput, setThemeInput] = useState('');
//   const [durationHours, setDurationHours] = useState('2');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [generating, setGenerating] = useState(false);
//   const [generatedQuest, setGeneratedQuest] = useState(null);
//   const [accessToken, setAccessToken] = useState('');

//   useEffect(() => {
//     const fetchUser = async () => {
//       const supabase = createClient();
//       const { data: { session }, error } = await supabase.auth.getSession();
      
//       if (error || !session) {
//         window.location.href = "/sign-in";
//         return;
//       }
      
//       setAccessToken(session.access_token);
//     };
//     fetchUser();
//   }, []);

//   const generateQuest = async () => {
//     if (!cityInput.trim()) {
//       setErrorMessage('Please enter a city name');
//       return;
//     }

//     setGenerating(true);
//     setErrorMessage('');

//     try {
//       const response = await fetch('/api/generate-quests', {
//         method: 'POST',
//         headers: { 
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${accessToken}`
//         },
//         body: JSON.stringify({
//           city: cityInput.trim(),
//           theme: themeInput.trim(),
//           duration: parseInt(durationHours),
//         }),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.error || 'Failed to generate quest');
//       }

//       const data = await response.json();
//       setGeneratedQuest(data.quest);
//     } catch (error) {
//       setErrorMessage(error instanceof Error ? error.message : 'Error generating quest');
//     } finally {
//       setGenerating(false);
//     }
//   };

//   const calculateProgress = (steps) => {
//     if (!steps?.length) return 0;
//     return Math.round((steps.filter(s => s.completed).length / steps.length) * 100);
//   };

//   const toggleStepComplete = (stepId) => {
//     if (!generatedQuest) return;
//     setGeneratedQuest({
//       ...generatedQuest,
//       steps: generatedQuest.steps.map(step => 
//         step.id === stepId ? { ...step, completed: !step.completed } : step
//       )
//     });
//   };

//   return (
//     <div className="min-h-screen bg-black text-white p-4 md:p-6">
//       <Card className="max-w-3xl mx-auto bg-gray-900 border-purple-500/30">
//         <CardHeader className="border-b border-purple-500/20">
//           <CardTitle className="text-xl md:text-2xl font-bold text-purple-300 flex items-center gap-2">
//             <Trophy className="h-6 w-6" />
//             Adventure Quest Generator
//           </CardTitle>
//         </CardHeader>
//         <CardContent className="p-4 md:p-6">
//           <div className="space-y-4">
//             <div className="grid gap-4 md:grid-cols-3">
//               <div>
//                 <input
//                   type="text"
//                   className="w-full p-3 rounded-lg bg-gray-800 border border-purple-500/30 text-white placeholder-gray-400"
//                   value={cityInput}
//                   onChange={(e) => setCityInput(e.target.value)}
//                   placeholder="Enter city"
//                 />
//               </div>
//               <div>
//                 <input
//                   type="text"
//                   className="w-full p-3 rounded-lg bg-gray-800 border border-purple-500/30 text-white placeholder-gray-400"
//                   value={themeInput}
//                   onChange={(e) => setThemeInput(e.target.value)}
//                   placeholder="Theme (optional)"
//                 />
//               </div>
//               <div>
//                 <select
//                   value={durationHours}
//                   onChange={(e) => setDurationHours(e.target.value)}
//                   className="w-full p-3 rounded-lg bg-gray-800 border border-purple-500/30 text-white"
//                 >
//                   <option value="1">1 hour</option>
//                   <option value="2">2 hours</option>
//                   <option value="3">3 hours</option>
//                   <option value="4">4 hours</option>
//                   <option value="6">6 hours</option>
//                 </select>
//               </div>
//             </div>

//             <button
//               onClick={generateQuest}
//               className="w-full p-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-medium transition-colors"
//               disabled={generating}
//             >
//               {generating ? 'Crafting Your Quest...' : 'Generate Quest'}
//             </button>

//             {errorMessage && (
//               <div className="p-3 bg-red-900/50 border border-red-500/30 rounded-lg text-red-200">
//                 {errorMessage}
//               </div>
//             )}

//             {generatedQuest && (
//               <div className="mt-6 space-y-6">
//                 <div className="space-y-4">
//                   <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
//                     <div>
//                       <h2 className="text-xl md:text-2xl font-bold text-purple-300">{generatedQuest.title}</h2>
//                       <p className="text-gray-400 mt-1">{generatedQuest.description}</p>
//                     </div>
//                     <div className="flex items-center gap-3">
//                       <div className="flex items-center gap-2">
//                         <Clock className="h-4 w-4 text-purple-300" />
//                         <span className="text-sm text-purple-300">{generatedQuest.duration} hours</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Star className="h-4 w-4 text-purple-300" />
//                         <span className="text-sm text-purple-300">{generatedQuest.difficulty}</span>
//                       </div>
//                       <Badge className="bg-purple-600">{generatedQuest.theme}</Badge>
//                     </div>
//                   </div>

//                   <div className="h-2 w-full bg-gray-800 rounded-full">
//                     <div 
//                       className="h-full bg-purple-500 rounded-full transition-all duration-500"
//                       style={{ width: `${calculateProgress(generatedQuest.steps)}%` }}
//                     />
//                   </div>

//                   <div className="space-y-4">
//                     {generatedQuest.steps.map((step, index) => (
//                       <Card 
//                         key={step.id}
//                         className={`bg-gray-800 border-purple-500/20 transition-all ${
//                           step.completed ? 'opacity-75' : ''
//                         }`}
//                       >
//                         <CardContent className="p-4">
//                           <div className="flex items-start gap-4">
//                             <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-600 flex items-center justify-center">
//                               <span className="font-bold">{index + 1}</span>
//                             </div>
//                             <div className="flex-1 space-y-2">
//                               <div className="flex flex-wrap items-start justify-between gap-4">
//                                 <div>
//                                   <h3 className="text-lg font-semibold text-purple-200">{step.title}</h3>
//                                   <p className="text-gray-300 text-sm mt-1">{step.description}</p>
//                                 </div>
//                                 <button
//                                   onClick={() => toggleStepComplete(step.id)}
//                                   className={`p-2 rounded-lg transition-colors ${
//                                     step.completed 
//                                       ? 'bg-purple-600 text-white' 
//                                       : 'bg-gray-700 text-purple-300 hover:bg-gray-600'
//                                   }`}
//                                 >
//                                   {step.completed ? 'Completed!' : 'Mark Complete'}
//                                 </button>
//                               </div>
//                               <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
//                                 <div className="flex items-center gap-1">
//                                   <Clock className="h-4 w-4" />
//                                   {step.duration} mins
//                                 </div>
//                                 <div className="flex items-center gap-1">
//                                   <MapPin className="h-4 w-4" />
//                                   {step.location}
//                                 </div>
//                                 {step.recommendedGroup && (
//                                   <div className="flex items-center gap-1">
//                                     <Users className="h-4 w-4" />
//                                     {step.recommendedGroup}
//                                   </div>
//                                 )}
//                               </div>
//                               {step.tips && (
//                                 <div className="mt-2 p-2 bg-gray-900 rounded-lg">
//                                   <p className="text-sm text-purple-200">💡 {step.tips}</p>
//                                 </div>
//                               )}
//                             </div>
//                           </div>
//                         </CardContent>
//                       </Card>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default GenerateQuestPage;