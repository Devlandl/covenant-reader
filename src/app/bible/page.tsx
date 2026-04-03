"use client";

import { useState, useEffect } from "react";
import { BIBLE_BOOKS, loadChapter } from "@/lib/bible-books";
import { ChevronLeft, ChevronRight, Type } from "lucide-react";
import AppLayout from "@/components/layout/AppLayout";
import VerseRow from "@/components/bible/VerseRow";

type FontSize = "normal" | "lg" | "xl";

export default function BiblePage() {
  const [bookIdx, setBookIdx] = useState(0);
  const [chapter, setChapter] = useState(1);
  const [verses, setVerses] = useState<{ verse: number; text: string }[]>([]);
  const [loading, setLoading] = useState(true);
  const [fontSize, setFontSize] = useState<FontSize>("normal");
  const [highlighted, setHighlighted] = useState<Set<number>>(new Set());

  const book = BIBLE_BOOKS[bookIdx];

  useEffect(() => {
    setLoading(true);
    loadChapter(book.slug, chapter).then((data) => {
      setVerses(data || []);
      setLoading(false);
      setHighlighted(new Set());
      window.scrollTo({ top: 0 });
    });
  }, [book.slug, chapter]);

  const cycleFontSize = () => {
    setFontSize((prev) => (prev === "normal" ? "lg" : prev === "lg" ? "xl" : "normal"));
  };

  const prevChapter = () => {
    if (chapter > 1) {
      setChapter(chapter - 1);
    } else if (bookIdx > 0) {
      setBookIdx(bookIdx - 1);
      setChapter(BIBLE_BOOKS[bookIdx - 1].chapters);
    }
  };

  const nextChapter = () => {
    if (chapter < book.chapters) {
      setChapter(chapter + 1);
    } else if (bookIdx < BIBLE_BOOKS.length - 1) {
      setBookIdx(bookIdx + 1);
      setChapter(1);
    }
  };

  const toggleHighlight = (v: number) => {
    setHighlighted((prev) => {
      const next = new Set(prev);
      if (next.has(v)) next.delete(v);
      else next.add(v);
      return next;
    });
  };

  const fontClass = fontSize === "lg" ? "text-xl" : fontSize === "xl" ? "text-2xl" : "text-[17px]";

  return (
    <AppLayout>
      <div className="sticky top-0 z-10 bg-white border-b border-cr-gold/30 p-2.5 flex gap-2 items-center">
        <select
          value={bookIdx}
          onChange={(e) => { setBookIdx(Number(e.target.value)); setChapter(1); }}
          className="flex-1 px-2 py-1.5 border border-cr-gold/30 rounded-lg font-[family-name:var(--font-cinzel)] text-xs text-cr-royal bg-cr-parchment"
        >
          {BIBLE_BOOKS.map((b, i) => (
            <option key={b.slug} value={i}>{b.name}</option>
          ))}
        </select>
        <select
          value={chapter}
          onChange={(e) => setChapter(Number(e.target.value))}
          className="w-16 px-2 py-1.5 border border-cr-gold/30 rounded-lg font-[family-name:var(--font-cinzel)] text-xs text-cr-royal bg-cr-parchment"
        >
          {Array.from({ length: book.chapters }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
          ))}
        </select>
        <button onClick={cycleFontSize} className="px-2.5 py-1.5 border border-cr-gold/30 rounded-lg bg-cr-parchment">
          <Type className="w-4 h-4 text-cr-royal" />
        </button>
      </div>

      <div className="flex-1 p-4 bg-cr-cream">
        <h1 className="font-[family-name:var(--font-cinzel)] text-xl font-bold text-cr-royal text-center mb-1">{book.name}</h1>
        <p className="font-[family-name:var(--font-cinzel)] text-xs text-cr-gold text-center tracking-wider mb-4">CHAPTER {chapter}</p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-2 border-cr-royal border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-0.5">
            {verses.map((v) => (
              <VerseRow
                key={v.verse}
                book={book.name}
                bookSlug={book.slug}
                chapter={chapter}
                verse={v.verse}
                text={v.text}
                fontClass={fontClass}
                highlighted={highlighted.has(v.verse)}
                onToggleHighlight={() => toggleHighlight(v.verse)}
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex justify-between p-2.5 bg-white border-t border-cr-gold/30">
        <button onClick={prevChapter} className="flex items-center gap-1 px-3 py-2 border border-cr-gold/30 rounded-lg font-[family-name:var(--font-cinzel)] text-xs font-semibold text-cr-royal">
          <ChevronLeft className="w-4 h-4" /> Prev
        </button>
        <button onClick={nextChapter} className="flex items-center gap-1 px-3 py-2 border border-cr-gold/30 rounded-lg font-[family-name:var(--font-cinzel)] text-xs font-semibold text-cr-royal">
          Next <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </AppLayout>
  );
}
