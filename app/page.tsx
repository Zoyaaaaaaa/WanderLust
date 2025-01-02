import { EnvVarWarning } from "@/components/env-var-warning";
import HeaderAuth from "@/components/header-auth";
import Landing from "@/components/Landing";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { Award, Compass, Heart, Link, Menu, User } from "lucide-react";

const navItems = [
  { name: "Discover", href: "/discover", icon: Compass },
  { name: "Adventures", href: "/adventures", icon: Compass },
  { name: "Achievements", href: "/achievements", icon: Award },
  { name: "Favorites", href: "/favorites", icon: Heart },
];

export default function Home() {
  return (
    <main className="flex-1 w-full flex flex-col gap-6 px-4">

    {/* Main Content */}
    <Landing />

  </main>
  );
}
