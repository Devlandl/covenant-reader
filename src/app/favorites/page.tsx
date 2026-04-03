"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import AppLayout from "@/components/layout/AppLayout";
import { Heart } from "lucide-react";

export default function FavoritesPage() {
  const favs = useQuery(api.favorites.list);

  return (
    <AppLayout>
      <div className="bg-gradient-to-r from-cr-royal to-cr-royal-mid p-4">
        <h1 className="font-[family-name:var(--font-cinzel)] text-lg font-bold text-cr-gold-light">Favorite Verses</h1>
        <p className="text-xs text-white/60 italic">{favs?.length ?? 0} saved</p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {(!favs || favs.length === 0) ? (
          <div className="text-center py-20">
            <Heart className="w-10 h-10 mx-auto text-cr-gold/30 mb-3" />
            <p className="text-sm text-cr-ink-soft">No favorites yet. Star a verse in the Bible reader to save it here.</p>
          </div>
        ) : (
          favs.map((fav) => (
            <div key={fav._id} className="bg-white rounded-xl border-l-4 border-cr-gold p-3 shadow-sm">
              <p className="font-[family-name:var(--font-cinzel)] text-xs font-semibold text-cr-gold">{fav.reference}</p>
              <p className="text-sm text-cr-ink-mid mt-1 leading-relaxed italic">&ldquo;{fav.text}&rdquo;</p>
            </div>
          ))
        )}
      </div>
    </AppLayout>
  );
}
