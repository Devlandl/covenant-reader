"use client";

import { useMutation, useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Star } from "lucide-react";

interface VerseRowProps {
  book: string;
  bookSlug: string;
  chapter: number;
  verse: number;
  text: string;
  fontClass: string;
  highlighted: boolean;
  onToggleHighlight: () => void;
}

export default function VerseRow({
  book, bookSlug, chapter, verse, text, fontClass, highlighted, onToggleHighlight,
}: VerseRowProps) {
  const isFav = useQuery(api.favorites.isFavorited, { book: bookSlug, chapter, verse });
  const toggleFav = useMutation(api.favorites.toggle);

  const handleFavorite = () => {
    toggleFav({ book: bookSlug, chapter, verse, text, reference: `${book} ${chapter}:${verse}` });
  };

  return (
    <div className={`flex gap-2 items-start p-1 rounded-md transition-colors ${highlighted ? "bg-cr-gold/20" : "hover:bg-cr-gold/5"}`}>
      <span className="font-[family-name:var(--font-cinzel)] text-[10px] font-semibold text-cr-gold min-w-[20px] pt-1 shrink-0">{verse}</span>
      <span className={`flex-1 leading-relaxed cursor-pointer ${fontClass}`} onClick={onToggleHighlight}>{text}</span>
      <button onClick={handleFavorite} className={`shrink-0 p-0.5 transition-all ${isFav ? "text-cr-gold opacity-100" : "opacity-25 hover:opacity-60"}`}>
        <Star className="w-4 h-4" fill={isFav ? "currentColor" : "none"} />
      </button>
    </div>
  );
}
