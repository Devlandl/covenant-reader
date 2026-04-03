"use client";

import { useState, useEffect } from "react";
import { Download, X } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt(): Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

export default function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
      setShow(true);
    };
    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const install = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    setDeferredPrompt(null);
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 bg-cr-royal text-white rounded-xl p-4 shadow-lg flex items-center justify-between z-50 max-w-md mx-auto border border-cr-gold/30">
      <div className="flex items-center gap-3">
        <Download className="w-5 h-5 text-cr-gold" />
        <div>
          <p className="font-[family-name:var(--font-cinzel)] text-sm font-semibold">Install Covenant Reader</p>
          <p className="text-xs text-white/70">Add to your home screen</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={install} className="bg-cr-gold text-cr-royal px-3 py-1.5 rounded-lg text-xs font-semibold">
          Install
        </button>
        <button onClick={() => setShow(false)} className="text-white/50 hover:text-white">
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
