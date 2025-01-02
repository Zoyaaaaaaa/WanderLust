// import DeployButton from "@/components/deploy-button";
// import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
// import { ThemeSwitcher } from "@/components/theme-switcher";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
// import { Geist } from "next/font/google";
// import { ThemeProvider } from "next-themes";
// import Link from "next/link";
// import "./globals.css";

// const defaultUrl = process.env.VERCEL_URL
//   ? `https://${process.env.VERCEL_URL}`
//   : "http://localhost:3000";

// export const metadata = {
//   metadataBase: new URL(defaultUrl),
//   title: "Next.js and Supabase Starter Kit",
//   description: "The fastest way to build apps with Next.js and Supabase",
// };

// const geistSans = Geist({
//   display: "swap",
//   subsets: ["latin"],
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en" className={geistSans.className} suppressHydrationWarning>
//       <body className="bg-background text-foreground">
//         <ThemeProvider
//           attribute="class"
//           defaultTheme="system"
//           enableSystem
//           disableTransitionOnChange
//         >
//           <main className="min-h-screen flex flex-col items-center">
//             <div className="flex-1 w-full flex flex-col gap-20 items-center">
//               <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
//                 <div className="w-full max-w-5xl flex justify-between items-center p-3 px-5 text-sm">
//                   <div className="flex gap-5 items-center font-semibold">
//                     <Link href={"/"}>Next.js Supabase Starter</Link>
//                     <div className="flex items-center gap-2">
//                       <DeployButton />
//                     </div>
//                   </div>
//                   {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
//                 </div>
//               </nav>
//               <div className="flex flex-col gap-20 max-w-5xl p-5">
//                 {children}
//               </div>

//               <footer className="w-full flex items-center justify-center border-t mx-auto text-center text-xs gap-8 py-16">
//                 <p>
//                   Powered by{" "}
//                   <a
//                     href="https://supabase.com/?utm_source=create-next-app&utm_medium=template&utm_term=nextjs"
//                     target="_blank"
//                     className="font-bold hover:underline"
//                     rel="noreferrer"
//                   >
//                     Supabase
//                   </a>
//                 </p>
//                 <ThemeSwitcher />
//               </footer>
//             </div>
//           </main>
//         </ThemeProvider>
//       </body>
//     </html>
//   );
// }

import { MapPin, User, Users, Trophy, Menu, X } from 'lucide-react';
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Geist } from "next/font/google";
import { ThemeProvider } from "next-themes";
import Link from "next/link";
import "./globals.css";
import Navbar from '@/components/NavigationMenu';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Wanderlust - Your Adventure Companion",
  description: "Discover local adventures with AI-powered recommendations",
};

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const navItems = [
    { href: '/', label: 'Home', icon: MapPin },
    { href: '/activity', label: 'Activity', icon: MapPin },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/challenges', label: 'Challenges', icon: Trophy },
  ];

  return (
    <html lang="en" className={geistSans.className} suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="min-h-screen flex flex-col bg-gray-950">
            {/* Navbar */}

            <Navbar/>

            {/* Main Content */}
            <div className="flex-1 w-full flex flex-col items-center justify-center">
              {/* <div className="w-full max-w-7xl p-4 md:p-6 lg:p-8"> */}
                {children}
              {/* </div> */}
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 text-white border-t border-gray-700">
              <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-center">
                <div className="text-center md:text-left mb-4 md:mb-0">
                  <h3 className="text-2xl font-serif font-bold text-white">Wanderlust</h3>
                  <p className="text-gray-300">Discover your city like never before</p>
                </div>
                <nav>
                  <ul className="flex flex-wrap justify-center gap-6">
                    <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">About</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Contact</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Privacy Policy</a></li>
                    <li><a href="#" className="text-gray-300 hover:text-blue-400 transition-colors">Terms of Service</a></li>
                  </ul>
                </nav>
              </div>
            </footer>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}