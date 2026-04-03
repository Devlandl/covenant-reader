"use client";

import { UserButton } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home, BookOpen, CalendarCheck, TrendingUp, Heart,
  Lock, Award, Search, Settings, User,
} from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", icon: Home, label: "Home" },
  { href: "/bible", icon: BookOpen, label: "Bible" },
  { href: "/plan", icon: CalendarCheck, label: "Plan" },
  { href: "/progress", icon: TrendingUp, label: "Progress" },
  { href: "/favorites", icon: Heart, label: "Favorites" },
  { href: "/vault", icon: Lock, label: "Vault" },
  { href: "/badges", icon: Award, label: "Badges" },
  { href: "/search", icon: Search, label: "Search" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 bg-gradient-to-r from-cr-royal to-cr-royal-mid shadow-lg">
      <div className="flex items-center justify-between px-4 py-2">
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-cr-gold text-lg">✝</span>
          <span className="font-[family-name:var(--font-cinzel)] text-sm font-bold text-cr-gold-light tracking-wider">
            COVENANT READER
          </span>
        </Link>
        <UserButton />
      </div>
      <div className="flex overflow-x-auto scrollbar-hide px-1 pb-2 gap-0.5">
        {NAV_ITEMS.map(({ href, icon: Icon, label }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg min-w-[54px] transition-colors ${
                active ? "bg-cr-gold/25" : "hover:bg-white/10"
              }`}
            >
              <Icon className={`w-4 h-4 ${active ? "text-cr-gold-light" : "text-white/60"}`} />
              <span className={`font-[family-name:var(--font-cinzel)] text-[7.5px] font-semibold tracking-wide uppercase ${
                active ? "text-cr-gold-light" : "text-white/55"
              }`}>
                {label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
