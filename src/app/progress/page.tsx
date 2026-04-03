"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AppLayout from "@/components/layout/AppLayout";
import { BookOpen, Flame, Calendar, Heart } from "lucide-react";

export default function ProgressPage() {
  const streak = useQuery(api.readingProgress.getStreak);
  const progress = useQuery(api.readingProgress.list);
  const favs = useQuery(api.favorites.list);
  const earnedBadges = useQuery(api.badges.list);

  const chaptersRead = progress?.length ?? 0;
  const totalChapters = 1189;
  const pct = Math.round((chaptersRead / totalChapters) * 100);
  const uniqueDays = new Set(progress?.map((p) => p.date) ?? []).size;

  const stats = [
    { label: "Chapters Read", value: chaptersRead, emoji: "📖" },
    { label: "Current Streak", value: `${streak ?? 0} days`, emoji: "🔥" },
    { label: "Days Active", value: uniqueDays, emoji: "📅" },
    { label: "Verses Saved", value: favs?.length ?? 0, emoji: "⭐" },
  ];

  return (
    <AppLayout>
      <div className="bg-gradient-to-br from-cr-royal to-cr-royal-mid p-6 text-center">
        <p className="font-[family-name:var(--font-cinzel)] text-5xl font-bold text-white">{pct}%</p>
        <p className="text-xs text-white/60 mt-1">of the Bible read</p>
        <div className="bg-white/15 rounded-full h-3 overflow-hidden mt-3">
          <div className="bg-gradient-to-r from-cr-gold-light to-cr-gold h-full rounded-full transition-all duration-1000" style={{ width: `${pct}%` }} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-cr-gold/30 rounded-xl p-4 text-center shadow-sm">
            <span className="text-xl mb-1 block">{s.emoji}</span>
            <p className="font-[family-name:var(--font-cinzel)] text-2xl font-bold text-cr-royal">{s.value}</p>
            <p className="text-xs text-cr-ink-soft mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="px-3 pb-4">
        <p className="font-[family-name:var(--font-cinzel)] text-[10px] font-semibold text-cr-royal-light tracking-widest uppercase px-1 mb-2">Badges Earned</p>
        <p className="text-sm text-cr-ink-soft px-1">{earnedBadges?.length ?? 0} badges earned — visit the Badges page to see all achievements.</p>
      </div>
    </AppLayout>
  );
}
