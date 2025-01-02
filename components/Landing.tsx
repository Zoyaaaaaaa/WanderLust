'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Trophy, Users, Award, Coffee, Camera, Star, Heart } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const features = [
  {
    icon: <MapPin className="w-6 h-6" />,
    title: "Activity Generation",
    description: "Create, share, and complete activities while earning points. Track your activities via your profile."
  },
  {
    icon: <Users className="w-6 h-6" />,
    title: "User Profiles",
    description: "Showcase your progress, update personal details, and track your achievements."
  },
  {
    icon: <Trophy className="w-6 h-6" />,
    title: "Achievements & Recognition",
    description: "Complete challenges, earn points, and unlock achievements to gain recognition within the community."
  },
];

const futureFeatures = [
  { icon: <Award className="w-6 h-6" />, title: "Enhanced Challenge Verification", description: "Advanced GPS, video uploads, and time-based tasks for accurate verification." },
  { icon: <Star className="w-6 h-6" />, title: "Leaderboards & Social Feeds", description: "See top performers, follow others' journeys, and interact in real-time." },
  { icon: <Heart className="w-6 h-6" />, title: "Collaborative Projects", description: "Work on social initiatives like cleanups and charity events to amplify your impact." },
  { icon: <Camera className="w-6 h-6" />, title: "Personalized Activity Suggestions", description: "AI-driven activity recommendations based on your interests and past experiences." },
];

const Landing = () => {
  return (
    <div className="min-h-screen bg-[#0A0B0F] overflow-hidden">
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-16 relative">
        {/* Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />
          <div className="absolute top-1/2 -left-40 w-96 h-96 bg-yellow-500/5 rounded-full blur-3xl" />
        </div>

        {/* Hero Section with Image Space */}
        <section className="text-center py-24 md:py-32 relative">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="relative z-10"
          >
            <div className="mb-12 mx-auto w-full max-w-3xl aspect-[16/9] relative overflow-hidden rounded-2xl">
              <Image
                src="/Travelers.gif"
                alt="Adventure Image"
                width={1280}
                height={720}
                className="object-cover rounded-2xl"
                unoptimized

              />
               
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0F] via-transparent to-transparent" />
            </div>

            <h2 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-white via-blue-100 to-blue-200 text-transparent bg-clip-text mb-6">
              Discover Hidden Gems
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto leading-relaxed">
              Explore local wonders, complete personalized challenges, and earn recognition while connecting with fellow adventurers.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/activity" 
                className="px-8 py-4 bg-[#4169E1] text-white rounded-2xl text-lg font-medium inline-flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <Trophy className="w-5 h-5" />
                Start Your Adventure
              </Link>
            </motion.div>
          </motion.div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
            Features of Wanderlust
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                <div className="relative bg-gray-900/90 backdrop-blur-xl rounded-2xl p-8 border border-gray-800/50 hover:border-gray-700/50 transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                    {feature.icon}
                  </div>
                  <h3 className="font-bold text-white mb-3 text-xl">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Future Features Section */}
        <section id="future-features" className="py-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
          <div className="relative bg-gray-900/30 backdrop-blur-xl rounded-3xl mb-16 border border-gray-800/50 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5" />
            <div className="relative p-16">
              <h2 className="text-3xl font-bold text-white mb-12 text-center bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
                What's Coming to Wanderlust
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {futureFeatures.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="group relative"
                  >
                    <div className="absolute inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative bg-gray-900/50 rounded-2xl p-6 border border-gray-800/50 hover:border-gray-700/50 transition-all">
                      <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 mb-4 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h3 className="font-bold text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-400">{feature.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-16">
          <h2 className="text-3xl font-bold text-white mb-12 text-center bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
            How Wanderlust Works
          </h2>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-3xl blur-3xl" />
            <div className="relative bg-gray-900/30 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-800/50 p-12">
              <ol className="space-y-8">
                {[
                  { icon: <MapPin />, text: "Choose your adventure category: Food, Culture, or Adventure" },
                  { icon: <Coffee />, text: "Receive a personalized quest with multiple stops" },
                  { icon: <Camera />, text: "Explore and complete activities at each location" },
                  { icon: <Award />, text: "Earn achievements and share your experiences" }
                ].map((step, index) => (
                  <motion.li 
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-center gap-6 group"
                  >
                    <div className="relative">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur opacity-30 group-hover:opacity-50 transition-opacity" />
                      <div className="relative w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 flex-shrink-0 group-hover:scale-110 transition-transform border border-gray-800/50">
                        {step.icon}
                      </div>
                    </div>
                    <span className="text-gray-300 text-lg">{step.text}</span>
                  </motion.li>
                ))}
              </ol>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 text-center relative">
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0B0F] to-transparent pointer-events-none" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="relative z-10"
          >
            <h2 className="text-4xl font-bold text-white mb-6 bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
              Join Wanderlust today and unlock a world of local adventures waiting to be discovered.
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                href="/sign-up" 
                className="px-8 py-4 bg-[#4169E1] text-white rounded-2xl text-lg font-medium inline-flex items-center gap-2 hover:bg-blue-600 transition-all shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40"
              >
                <Star className="w-5 h-5" />
                Let's Explore
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </main>
    </div>
  );
};

export default Landing;

