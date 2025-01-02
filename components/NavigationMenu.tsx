
// import { MapPin, User, Users, Trophy, Menu, X } from 'lucide-react';
// import { EnvVarWarning } from "@/components/env-var-warning";
// import HeaderAuth from "@/components/header-auth";
// import { ThemeSwitcher } from "@/components/theme-switcher";
// import { hasEnvVars } from "@/utils/supabase/check-env-vars";
// import Link from "next/link";

// export default function Navbar() {
//   const navItems = [
//     { href: '/', label: 'Home', icon: MapPin },
//     { href: '/activity', label: 'Activity', icon: MapPin },
//     { href: '/community', label: 'Community', icon: Users },
//     { href: '/challenges', label: 'Challenges', icon: Trophy },
//   ];

//   return (
//     <nav className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900">
//       <div className="container mx-auto px-4">
//         <div className="flex h-16 items-center justify-between">
//           <div className="flex gap-6 items-center">
//             <Link href="/" className="flex items-center gap-2">
//               <MapPin className="h-6 w-6 text-blue-400" />
//               <span className="text-lg font-bold text-blue-100">Wanderlust</span>
//             </Link>

//             <div className="hidden md:flex gap-6">
//               {navItems.map((item) => (
//                 <Link
//                   key={item.label}
//                   href={item.href}
//                   className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-blue-400 transition-colors"
//                 >
//                   <item.icon className="h-4 w-4" />
//                   <span>{item.label}</span>
//                 </Link>
//               ))}
//             </div>
//           </div>

//           <div className="flex items-center gap-4">
//             {/* <ThemeSwitcher /> */}
//             <div className="h-6 w-px bg-gray-700" />
//             <div className="flex items-center gap-2">
//               {!hasEnvVars ? <EnvVarWarning /> : (
//                 <div className="flex items-center gap-4">
//                   <HeaderAuth />
//                   <Link href="/profile" className="hidden sm:flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-blue-400">
//                     <User className="h-4 w-4" />
//                   </Link>
//                 </div>
//               )}
//             </div>
//             <label htmlFor="mobile-menu" className="md:hidden">
//               <Menu className="h-6 w-6 text-blue-100 cursor-pointer hover:text-blue-400" />
//             </label>
//           </div>
//         </div>
//       </div>

//       <input type="checkbox" id="mobile-menu" className="hidden peer" />
      
//       <div className="md:hidden fixed inset-0 bg-black/50 opacity-0 peer-checked:opacity-100 pointer-events-none peer-checked:pointer-events-auto transition-all">
//         <div className="absolute right-0 top-0 h-full w-72 bg-gray-900 shadow-xl translate-x-full peer-checked:translate-x-0 transition-transform">
//           <div className="flex items-center justify-between p-4 border-b border-gray-700">
//             <h2 className="text-lg font-semibold text-blue-100">Menu</h2>
//             <label htmlFor="mobile-menu" className="p-2 hover:bg-gray-800 rounded-lg cursor-pointer">
//               <X className="h-6 w-6 text-blue-100 hover:text-blue-400" />
//             </label>
//           </div>
          
//           <div className="p-4 space-y-1">
//             {navItems.map((item) => (
//               <Link
//                 key={item.label}
//                 href={item.href}
//                 className="flex items-center gap-3 px-4 py-3 text-blue-100 hover:bg-gray-800 hover:text-blue-400 rounded-lg transition-colors"
//               >
//                 <item.icon className="h-5 w-5" />
//                 <span>{item.label}</span>
//               </Link>
//             ))}
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

import { MapPin, User, Users, Trophy, Menu, Globe2Icon } from 'lucide-react';
import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import Link from "next/link";

export default function Navbar() {
  const navItems = [
    { href: '/activity', label: 'Activity', icon: MapPin },
    { href: '/profile', label: 'Profile', icon: User },
    { href: '/community', label: 'Community', icon: Users },
    { href: '/challenges', label: 'Challenges', icon: Trophy },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-700 bg-gray-900">
      <div className="container mx-auto px-2">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Globe2Icon className="h-6 w-6 text-blue-400" />
            <span className="text-lg font-bold text-blue-100">WanderLust</span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="flex items-center gap-2 text-sm font-medium text-blue-100 hover:text-blue-400 transition-colors"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-right gap-6">
            {!hasEnvVars ? <EnvVarWarning /> : <HeaderAuth />}
          </div>

          {/* Mobile & Auth */}
          <div className="flex items-center gap-1 ">
            {/* <ThemeSwitcher /> */}
           
            <div className="flex md:hidden gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="p-2 text-blue-100 hover:text-blue-400 transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}