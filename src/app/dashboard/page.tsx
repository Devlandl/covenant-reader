"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import { Flame, BookOpen, Heart } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import { VOTD_VERSES } from "@/lib/topics";

export default function DashboardPage() {
  const { user } = useUser();
  const profile = useQuery(api.userProfiles.get);
  const streak = useQuery(api.readingProgress.getStreak);
  const progress = useQuery(api.readingProgress.list);
  const favs = useQuery(api.favorites.list);

  const dayOfYear = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
  );
  const votd = VOTD_VERSES[dayOfYear % VOTD_VERSES.length];

  const chaptersRead = progress?.length ?? 0;
  const favCount = favs?.length ?? 0;
  const displayName = profile?.displayName || user?.firstName || "Reader";

  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });

  const stats = [
    { label: "Streak", value: streak ?? 0, suffix: streak === 1 ? " day" : " days", icon: Flame, color: "text-cr-gold" },
    { label: "Chapters", value: chaptersRead, suffix: "", icon: BookOpen, color: "text-cr-royal-light" },
    { label: "Favorites", value: favCount, suffix: "", icon: Heart, color: "text-red-400" },
  ];

  return (
    <AppLayout>
      {/* Hero */}
      <div className="bg-gradient-to-br from-cr-royal to-cr-royal-mid p-5 relative overflow-hidden">
        <p className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-white">
          Welcome back, {displayName}
        </p>
        <p className="text-sm text-white/60 italic mb-4">{dateStr}</p>
        <div className="bg-white/10 border border-cr-gold/40 rounded-xl p-4">
          <p className="font-[family-name:var(--font-cinzel)] text-[9px] font-semibold text-cr-gold tracking-widest mb-1.5">
            VERSE OF THE DAY
          </p>
          <p className="text-base italic text-white/90 leading-relaxed mb-1.5">
            &ldquo;{votd.text}&rdquo;
          </p>
          <p className="font-[family-name:var(--font-cinzel)] text-xs font-semibold text-cr-gold-light">
            {votd.ref}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2 p-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-cr-gold/30 rounded-xl p-3 text-center shadow-sm">
            <s.icon className={`w-5 h-5 mx-auto mb-1 ${s.color}`} />
            <p className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-cr-royal">
              {s.value}{s.suffix}
            </p>
            <p className="text-[10px] text-cr-ink-soft">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="px-3 pb-2">
        <p className="font-[family-name:var(--font-cinzel)] text-[10px] font-semibold text-cr-royal-light tracking-widest uppercase px-1 mb-2">
          Quick Actions
        </p>
      </div>
      <div className="grid grid-cols-2 gap-2 px-3 pb-4">
        {[
          { href: "/bible", icon: "📖", label: "Continue Reading" },
          { href: "/plan", icon: "📅", label: "Today's Plan" },
          { href: "/favorites", icon: "⭐", label: "Favorites" },
          { href: "/vault", icon: "🔒", label: "Prayer Vault" },
        ].map((q) => (
          <Link
            key={q.href}
            href={q.href}
            className="bg-white border border-cr-gold/30 rounded-xl p-3 text-center hover:bg-cr-parchment transition-colors shadow-sm"
          >
            <span className="text-2xl mb-1 block">{q.icon}</span>
            <span className="font-[family-name:var(--font-cinzel)] text-[10px] font-semibold text-cr-royal-mid tracking-wide">
              {q.label}
            </span>
          </Link>
        ))}
      </div>

      {/* How It Works */}
      <div className="px-3 pb-4">
        <p className="font-[family-name:var(--font-cinzel)] text-[10px] font-semibold text-cr-royal-light tracking-widest uppercase px-1 mb-3">
          How It Works
        </p>
        <div className="space-y-2">
          {[
            { num: "1", title: "Pick a Plan", desc: "Choose 3, 6, or 12-month reading plan" },
            { num: "2", title: "Read Daily", desc: "Follow your daily assignment and check it off" },
            { num: "3", title: "Grow in Faith", desc: "Track your streak, earn badges, save favorite verses" },
          ].map((step) => (
            <div key={step.num} className="flex items-start gap-3 bg-white border border-cr-gold/20 rounded-lg p-3 shadow-sm">
              <span className="font-[family-name:var(--font-cinzel)] text-sm font-bold text-cr-gold bg-cr-royal w-7 h-7 rounded-full flex items-center justify-center shrink-0">
                {step.num}
              </span>
              <div>
                <p className="font-[family-name:var(--font-cinzel)] text-xs font-semibold text-cr-royal">{step.title}</p>
                <p className="text-xs text-cr-ink-soft">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
