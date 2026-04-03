"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AppLayout from "@/components/layout/AppLayout";
import { generatePlan, getPlanDay } from "@/lib/reading-plans";
import Link from "next/link";

export default function PlanPage() {
  const profile = useQuery(api.userProfiles.get);
  const progress = useQuery(api.readingProgress.list);

  if (!profile?.selectedPlan || !profile?.planStartDate) {
    return (
      <AppLayout>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
          <span className="text-4xl mb-4">📅</span>
          <h2 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-cr-royal mb-2">No Plan Selected</h2>
          <p className="text-sm text-cr-ink-soft mb-4">Go to your Profile to choose a reading plan.</p>
          <Link href="/profile" className="bg-gradient-to-r from-cr-gold to-cr-gold-light text-cr-royal px-6 py-2 rounded-lg font-[family-name:var(--font-cinzel)] text-sm font-semibold">
            Set Up Profile
          </Link>
        </div>
      </AppLayout>
    );
  }

  const plan = generatePlan(profile.selectedPlan);
  const currentDay = getPlanDay(profile.planStartDate);
  const completedDates = new Set(progress?.map((p) => p.date) ?? []);

  return (
    <AppLayout>
      <div className="bg-gradient-to-r from-cr-royal to-cr-royal-mid p-4">
        <h1 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-cr-gold-light">Reading Plan</h1>
        <p className="text-xs text-white/60 italic">Day {currentDay} of {plan.length} — {profile.selectedPlan} plan</p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {plan.map((day) => {
          const dateStr = new Date(profile.planStartDate! + (day.day - 1) * 86400000).toISOString().split("T")[0];
          const done = completedDates.has(dateStr);
          const isToday = day.day === currentDay;

          return (
            <div key={day.day} className={`flex items-center gap-3 px-4 py-3 border-b border-cr-gold/15 ${isToday ? "bg-cr-royal/5" : ""}`}>
              <span className="font-[family-name:var(--font-cinzel)] text-xs font-semibold text-cr-royal-light min-w-[54px]">Day {day.day}</span>
              <span className="flex-1 text-sm text-cr-ink-mid">
                {day.book} {day.chapters.length === 1 ? day.chapters[0] : `${day.chapters[0]}-${day.chapters[day.chapters.length - 1]}`}
              </span>
              <span className="text-base">{done ? "✅" : isToday ? "📖" : "⬜"}</span>
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
