import { BIBLE_BOOKS } from "./bible-books";

export interface DailyReading {
  day: number;
  book: string;
  bookSlug: string;
  chapters: number[];
}

export function generatePlan(duration: "3-month" | "6-month" | "12-month"): DailyReading[] {
  const totalDays = duration === "3-month" ? 90 : duration === "6-month" ? 180 : 365;

  // Flatten all chapters into a sequential list
  const allChapters: { book: string; bookSlug: string; chapter: number }[] = [];
  for (const b of BIBLE_BOOKS) {
    for (let c = 1; c <= b.chapters; c++) {
      allChapters.push({ book: b.name, bookSlug: b.slug, chapter: c });
    }
  }

  const chaptersPerDay = Math.ceil(allChapters.length / totalDays);
  const plan: DailyReading[] = [];

  for (let day = 0; day < totalDays; day++) {
    const start = day * chaptersPerDay;
    const end = Math.min(start + chaptersPerDay, allChapters.length);
    if (start >= allChapters.length) break;

    const dayChapters = allChapters.slice(start, end);
    // Group by book
    const bookGroups = new Map<string, { book: string; bookSlug: string; chapters: number[] }>();
    for (const ch of dayChapters) {
      const existing = bookGroups.get(ch.bookSlug);
      if (existing) {
        existing.chapters.push(ch.chapter);
      } else {
        bookGroups.set(ch.bookSlug, { book: ch.book, bookSlug: ch.bookSlug, chapters: [ch.chapter] });
      }
    }

    // For simplicity, use the first book group as the primary reading
    const first = bookGroups.values().next().value;
    if (first) {
      plan.push({
        day: day + 1,
        book: first.book,
        bookSlug: first.bookSlug,
        chapters: first.chapters,
      });
    }
  }

  return plan;
}

export function getPlanDay(startDate: number): number {
  return Math.floor((Date.now() - startDate) / 86400000) + 1;
}
