"use client";

import { useUser } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";

const AVATARS = ["👤", "✝", "📖", "🕊️", "⛪", "🙏", "👑", "🌟"];

export default function ProfilePage() {
  const { user } = useUser();
  const profile = useQuery(api.userProfiles.get);
  const saveProfile = useMutation(api.userProfiles.save);
  const progress = useQuery(api.readingProgress.list);

  const [avatar, setAvatar] = useState("👤");
  const [displayName, setDisplayName] = useState("");
  const [selectedPlan, setSelectedPlan] = useState<"3-month" | "6-month" | "12-month" | undefined>();

  useEffect(() => {
    if (profile) {
      setAvatar(profile.avatar);
      setDisplayName(profile.displayName);
      setSelectedPlan(profile.selectedPlan ?? undefined);
    } else if (user) {
      setDisplayName(user.firstName ?? "Reader");
    }
  }, [profile, user]);

  const handleSave = () => {
    saveProfile({
      avatar,
      displayName,
      selectedPlan,
      planStartDate: profile?.planStartDate ?? (selectedPlan ? Date.now() : undefined),
    });
  };

  const chaptersRead = progress?.length ?? 0;

  return (
    <AppLayout>
      <div className="bg-gradient-to-br from-cr-royal to-cr-royal-mid p-6 text-center relative overflow-hidden">
        <span className="absolute top-2 right-5 text-6xl opacity-5 text-white">✝</span>
        <p className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-cr-gold-light tracking-wide mb-1">Your Profile</p>
        <p className="text-sm italic text-white/60">Customize your reading experience</p>
      </div>

      <div className="p-3 space-y-3">
        {/* Avatar */}
        <div className="bg-white rounded-xl border border-cr-gold/30 p-4">
          <p className="font-[family-name:var(--font-cinzel)] text-[10px] font-semibold text-cr-royal-light tracking-wider uppercase mb-2">Avatar</p>
          <div className="grid grid-cols-4 gap-2">
            {AVATARS.map((a) => (
              <button key={a} onClick={() => setAvatar(a)} className={`text-4xl p-2 rounded-full border-2 transition-all ${avatar === a ? "border-cr-gold" : "border-transparent"}`}>
                {a}
              </button>
            ))}
          </div>
        </div>

        {/* Display Name */}
        <div className="bg-white rounded-xl border border-cr-gold/30 p-4">
          <label className="font-[family-name:var(--font-cinzel)] text-[10px] font-semibold text-cr-royal-light tracking-wider uppercase block mb-1.5">Display Name</label>
          <input value={displayName} onChange={(e) => setDisplayName(e.target.value)} className="w-full px-3 py-2.5 border border-cr-gold/30 rounded-lg bg-cr-parchment text-sm" />
        </div>

        {/* Reading Plan */}
        <div className="bg-white rounded-xl border border-cr-gold/30 p-4">
          <p className="font-[family-name:var(--font-cinzel)] text-[10px] font-semibold text-cr-royal-light tracking-wider uppercase mb-2">Reading Plan</p>
          <div className="flex gap-2">
            {([
              { id: "3-month" as const, months: 3, label: "Intensive" },
              { id: "6-month" as const, months: 6, label: "Balanced" },
              { id: "12-month" as const, months: 12, label: "Steady" },
            ]).map((plan) => (
              <button key={plan.id} onClick={() => setSelectedPlan(plan.id)} className={`flex-1 border-2 rounded-xl p-3 text-center transition-all ${selectedPlan === plan.id ? "border-cr-gold bg-cr-gold/10" : "border-cr-gold/30 bg-cr-parchment"}`}>
                <p className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-cr-royal">{plan.months}</p>
                <p className="text-[11px] text-cr-ink-soft">months</p>
                <p className="font-[family-name:var(--font-cinzel)] text-[9px] text-cr-gold uppercase tracking-wide mt-1 font-semibold">{plan.label}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Completion Badge */}
        {profile?.planStartDate && (
          <div className="bg-gradient-to-r from-cr-royal to-cr-royal-mid rounded-xl p-3 flex items-center gap-3">
            <span className="text-2xl">📖</span>
            <div>
              <p className="text-sm text-white/80">Started {new Date(profile.planStartDate).toLocaleDateString()}</p>
              <p className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-cr-gold-light">{chaptersRead} chapters read</p>
            </div>
          </div>
        )}

        {/* Save */}
        <button onClick={handleSave} className="w-full bg-gradient-to-r from-cr-gold to-cr-gold-light text-cr-royal py-3 rounded-xl font-[family-name:var(--font-cinzel)] text-sm font-semibold shadow-md">
          Save Profile
        </button>
      </div>
    </AppLayout>
  );
}
