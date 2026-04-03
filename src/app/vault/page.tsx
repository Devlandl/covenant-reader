"use client";

import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AppLayout from "@/components/layout/AppLayout";
import { Lock, Plus, X, Trash2 } from "lucide-react";

async function hashPin(pin: string): Promise<string> {
  const data = new TextEncoder().encode(pin);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

export default function VaultPage() {
  const pinData = useQuery(api.prayerVault.getPin);
  const entries = useQuery(api.prayerVault.listEntries);
  const setPinMut = useMutation(api.prayerVault.setPin);
  const createEntry = useMutation(api.prayerVault.createEntry);
  const deleteEntry = useMutation(api.prayerVault.deleteEntry);

  const [unlocked, setUnlocked] = useState(false);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");
  const [showNew, setShowNew] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [linkedVerse, setLinkedVerse] = useState("");

  const handleKeyPress = async (digit: string) => {
    if (digit === "clear") { setPin(""); setError(""); return; }
    const next = pin + digit;
    setPin(next);
    setError("");
    if (next.length === 4) {
      const hashed = await hashPin(next);
      if (!pinData) {
        await setPinMut({ pinHash: hashed });
        setUnlocked(true);
      } else if (pinData.pinHash === hashed) {
        setUnlocked(true);
      } else {
        setError("Wrong PIN");
        setPin("");
      }
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !body.trim()) return;
    await createEntry({ title, body, linkedVerse: linkedVerse || undefined });
    setTitle("");
    setBody("");
    setLinkedVerse("");
    setShowNew(false);
  };

  if (pinData === undefined) return null;

  if (!unlocked) {
    return (
      <AppLayout>
        <div className="flex-1 bg-gradient-to-b from-[#1a0a2e] to-cr-royal flex flex-col items-center justify-center p-5">
          <p className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-cr-gold-light tracking-wider mb-1">Prayer Vault</p>
          <p className="text-sm italic text-white/60 mb-5">{pinData ? "Enter your PIN" : "Create a 4-digit PIN"}</p>
          <div className="flex gap-3.5 mb-4">
            {[0, 1, 2, 3].map((i) => (
              <div key={i} className={`w-4.5 h-4.5 rounded-full border-2 border-cr-gold transition-all ${i < pin.length ? "bg-cr-gold shadow-[0_0_8px_rgba(201,168,76,0.5)]" : ""}`} />
            ))}
          </div>
          {error && <p className="text-red-400 text-xs mb-2">{error}</p>}
          <div className="grid grid-cols-3 gap-2.5 w-[210px] mt-2">
            {["1","2","3","4","5","6","7","8","9","clear","0","✝"].map((k) => (
              <button key={k} onClick={() => k !== "✝" && handleKeyPress(k)} className="bg-white/8 border border-cr-gold/30 rounded-xl py-3.5 font-[family-name:var(--font-cinzel)] text-lg font-semibold text-white hover:bg-cr-gold/20 transition-colors">
                {k === "clear" ? "C" : k}
              </button>
            ))}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="bg-gradient-to-r from-cr-royal to-cr-royal-mid p-3.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Lock className="w-4 h-4 text-cr-gold" />
          <span className="font-[family-name:var(--font-cinzel)] text-sm font-bold text-cr-gold-light">Prayer Vault</span>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowNew(true)} className="bg-cr-gold/20 text-cr-gold px-2.5 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
            <Plus className="w-3 h-3" /> New
          </button>
          <button onClick={() => { setUnlocked(false); setPin(""); }} className="text-white/50 text-xs">Lock</button>
        </div>
      </div>

      {showNew && (
        <div className="bg-cr-parchment border-b border-cr-gold/30 p-3 space-y-2">
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full px-3 py-2 border border-cr-gold/30 rounded-lg bg-white text-sm font-[family-name:var(--font-cinzel)]" />
          <textarea value={body} onChange={(e) => setBody(e.target.value)} placeholder="Your prayer..." rows={4} className="w-full px-3 py-2 border border-cr-gold/30 rounded-lg bg-white text-sm" />
          <input value={linkedVerse} onChange={(e) => setLinkedVerse(e.target.value)} placeholder="Link a verse (e.g. Psalm 23:1)" className="w-full px-3 py-2 border border-cr-gold/30 rounded-lg bg-white text-sm" />
          <div className="flex gap-2">
            <button onClick={handleSave} className="flex-1 bg-gradient-to-r from-cr-gold to-cr-gold-light text-cr-royal py-2 rounded-lg font-[family-name:var(--font-cinzel)] text-xs font-semibold">Save</button>
            <button onClick={() => setShowNew(false)} className="px-3 py-2 border border-cr-gold/30 rounded-lg text-xs"><X className="w-3 h-3" /></button>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-3 space-y-2.5">
        {(!entries || entries.length === 0) ? (
          <p className="text-center text-sm text-cr-ink-soft py-20">No entries yet. Tap &quot;New&quot; to start.</p>
        ) : (
          entries.map((e) => (
            <div key={e._id} className="bg-white rounded-xl border-l-4 border-cr-royal-mid p-3.5 shadow-sm">
              <div className="flex justify-between items-start">
                <p className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-cr-royal">{e.title}</p>
                <button onClick={() => deleteEntry({ id: e._id })} className="text-cr-ink-soft/40 hover:text-red-400"><Trash2 className="w-3.5 h-3.5" /></button>
              </div>
              <p className="text-sm text-cr-ink-mid mt-1 line-clamp-3">{e.body}</p>
              {e.linkedVerse && <p className="font-[family-name:var(--font-cinzel)] text-[10px] text-cr-gold mt-2">{e.linkedVerse}</p>}
              <p className="text-[10px] text-cr-ink-soft mt-2">{new Date(e.createdAt).toLocaleDateString()}</p>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
}
