"use client";

import { useState } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { TOPICS } from "@/lib/topics";

const TOPIC_NAMES = Object.keys(TOPICS);

export default function SearchPage() {
  const [active, setActive] = useState(TOPIC_NAMES[0]);
  const verses = TOPICS[active] ?? [];

  return (
    <AppLayout>
      <div className="bg-gradient-to-r from-cr-royal to-cr-royal-mid p-4">
        <h1 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-cr-gold-light">Topic Search</h1>
        <p className="text-xs text-white/60 italic">Find verses by what you need</p>
      </div>

      <div className="flex overflow-x-auto scrollbar-hide gap-1.5 p-3">
        {TOPIC_NAMES.map((topic) => (
          <button key={topic} onClick={() => setActive(topic)} className={`flex-none px-3 py-1.5 rounded-full font-[family-name:var(--font-cinzel)] text-[10px] font-semibold border transition-all capitalize ${active === topic ? "bg-cr-royal-mid text-white border-cr-royal-mid" : "bg-cr-parchment text-cr-royal border-cr-gold/30 hover:border-cr-gold"}`}>
            {topic}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto">
        {verses.map((v, i) => (
          <div key={i} className="px-4 py-3 border-b border-cr-gold/15 hover:bg-cr-gold/5 transition-colors">
            <p className="font-[family-name:var(--font-cinzel)] text-sm font-semibold text-cr-royal">{v.r}</p>
            <p className="text-sm text-cr-ink-mid mt-1 leading-relaxed italic">&ldquo;{v.t}&rdquo;</p>
          </div>
        ))}
      </div>
    </AppLayout>
  );
}
