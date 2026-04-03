"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";

export default function SettingsPage() {
  const settings = useQuery(api.userSettings.get);
  const saveSettings = useMutation(api.userSettings.save);

  const [darkMode, setDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium");
  const [reminderEnabled, setReminderEnabled] = useState(false);
  const [reminderTime, setReminderTime] = useState("08:00");

  useEffect(() => {
    if (settings) {
      setDarkMode(settings.darkMode);
      setFontSize(settings.fontSize);
      setReminderEnabled(settings.reminderEnabled);
      setReminderTime(settings.reminderTime);
    }
  }, [settings]);

  const save = (overrides: Partial<{ darkMode: boolean; fontSize: "small" | "medium" | "large"; reminderEnabled: boolean; reminderTime: string }>) => {
    saveSettings({
      darkMode: overrides.darkMode ?? darkMode,
      fontSize: overrides.fontSize ?? fontSize,
      reminderEnabled: overrides.reminderEnabled ?? reminderEnabled,
      reminderTime: overrides.reminderTime ?? reminderTime,
    });
  };

  return (
    <AppLayout>
      <div className="bg-gradient-to-r from-cr-royal to-cr-royal-mid p-4">
        <h1 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-cr-gold-light">Settings</h1>
      </div>

      <div className="p-3 space-y-2">
        {/* Dark Mode */}
        <div className="bg-white rounded-xl border border-cr-gold/30 p-3.5 flex items-center justify-between">
          <div>
            <p className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-cr-royal">Dark Mode</p>
            <p className="text-xs text-cr-ink-soft">Switch to dark parchment theme</p>
          </div>
          <label className="relative w-11 h-6 cursor-pointer">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => { setDarkMode(e.target.checked); save({ darkMode: e.target.checked }); }}
              className="sr-only peer"
            />
            <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-cr-royal-mid transition-colors" />
            <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
          </label>
        </div>

        {/* Font Size */}
        <div className="bg-white rounded-xl border border-cr-gold/30 p-3.5">
          <p className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-cr-royal mb-2">Font Size</p>
          <div className="flex gap-2">
            {(["small", "medium", "large"] as const).map((size) => (
              <button
                key={size}
                onClick={() => { setFontSize(size); save({ fontSize: size }); }}
                className={`flex-1 py-2 rounded-lg font-[family-name:var(--font-cinzel)] text-xs font-semibold capitalize transition-all ${
                  fontSize === size
                    ? "bg-cr-royal-mid text-white"
                    : "bg-cr-parchment text-cr-royal border border-cr-gold/30"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Daily Reminder */}
        <div className="bg-white rounded-xl border border-cr-gold/30 p-3.5">
          <div className="flex items-center justify-between mb-2">
            <div>
              <p className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-cr-royal">Daily Reminder</p>
              <p className="text-xs text-cr-ink-soft">Get notified to read</p>
            </div>
            <label className="relative w-11 h-6 cursor-pointer">
              <input
                type="checkbox"
                checked={reminderEnabled}
                onChange={(e) => { setReminderEnabled(e.target.checked); save({ reminderEnabled: e.target.checked }); }}
                className="sr-only peer"
              />
              <div className="w-full h-full bg-gray-300 rounded-full peer-checked:bg-cr-royal-mid transition-colors" />
              <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-5" />
            </label>
          </div>
          {reminderEnabled && (
            <input
              type="time"
              value={reminderTime}
              onChange={(e) => { setReminderTime(e.target.value); save({ reminderTime: e.target.value }); }}
              className="w-full px-3 py-2 border border-cr-gold/30 rounded-lg bg-cr-parchment text-sm"
            />
          )}
        </div>
      </div>
    </AppLayout>
  );
}
