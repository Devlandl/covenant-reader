"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AppLayout from "@/components/layout/AppLayout";
import { BADGE_DEFINITIONS } from "@/lib/badge-definitions";

export default function BadgesPage() {
  const earned = useQuery(api.badges.list);
  const earnedIds = new Set(earned?.map((b) => b.badgeId) ?? []);

  return (
    <AppLayout>
      <div className="bg-gradient-to-r from-cr-royal to-cr-royal-mid p-4">
        <h1 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-cr-gold-light">Achievements</h1>
        <p className="text-xs text-white/60 italic">{earnedIds.size} of {BADGE_DEFINITIONS.length} earned</p>
      </div>

      <div className="grid grid-cols-2 gap-2.5 p-3">
        {BADGE_DEFINITIONS.map((badge) => {
          const isEarned = earnedIds.has(badge.id);
          return (
            <div key={badge.id} className={`bg-white rounded-xl border-2 p-4 text-center transition-all ${isEarned ? "border-cr-gold bg-gradient-to-b from-cr-gold/5 to-white" : "border-cr-gold/30 opacity-50 grayscale-50"}`}>
              <span className="text-4xl block mb-2">{badge.icon}</span>
              <p className="font-[family-name:var(--font-cinzel)] text-xs font-semibold text-cr-royal mb-1">{badge.name}</p>
              <p className="text-[11px] text-cr-ink-soft leading-snug">{badge.description}</p>
              {isEarned && <p className="font-[family-name:var(--font-cinzel)] text-[9px] text-cr-gold uppercase tracking-wider mt-1.5 font-semibold">Earned</p>}
            </div>
          );
        })}
      </div>
    </AppLayout>
  );
}
