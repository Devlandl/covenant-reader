import Link from "next/link";
import { BookOpen, CalendarCheck, Heart, Lock, Award, Search } from "lucide-react";

export default function Home() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Covenant Reader",
    applicationCategory: "ReligiousApplication",
    operatingSystem: "Web, iOS, Android",
    description: "Your daily Bible companion — KJV reading plans, prayer vault, and achievements.",
    url: "https://covenant-reader.tvrapp.app",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    author: { "@type": "Organization", name: "TVR App Store" },
  };

  const features = [
    { icon: BookOpen, title: "Full KJV Bible", desc: "All 66 books with clean, readable typography and verse highlighting." },
    { icon: CalendarCheck, title: "Reading Plans", desc: "3, 6, or 12-month plans with daily assignments and streak tracking." },
    { icon: Heart, title: "Save Favorites", desc: "Bookmark verses you love and build your personal collection." },
    { icon: Lock, title: "Prayer Vault", desc: "PIN-locked private journal for prayers and reflections." },
    { icon: Award, title: "Earn Badges", desc: "Stay motivated with achievements for streaks and milestones." },
    { icon: Search, title: "Topic Search", desc: "Find verses by topic — strength, anxiety, healing, love, and more." },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <div className="min-h-screen bg-gradient-to-b from-cr-royal to-cr-royal-mid text-white flex flex-col">
        <section className="flex-1 flex flex-col items-center justify-center px-6 py-24 text-center">
          <span className="text-4xl mb-4">✝</span>
          <h1 className="font-[family-name:var(--font-cinzel)] text-4xl sm:text-5xl font-bold leading-tight mb-4">
            Covenant <span className="text-cr-gold-light">Reader</span>
          </h1>
          <p className="text-lg text-white/70 font-[family-name:var(--font-crimson)] italic max-w-md mb-10">
            Your daily Bible companion — read, pray, grow.
          </p>
          <Link
            href="/dashboard"
            className="inline-block bg-gradient-to-r from-cr-gold to-cr-gold-light text-cr-royal font-[family-name:var(--font-cinzel)] font-semibold text-lg px-8 py-4 rounded-xl hover:shadow-lg transition-all"
          >
            Start Reading — Free
          </Link>
        </section>

        <section className="px-6 pb-20 max-w-2xl mx-auto w-full">
          <h2 className="font-[family-name:var(--font-cinzel)] text-center text-2xl font-semibold mb-8 text-cr-gold-light">
            Features
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {features.map((f, i) => (
              <div key={i} className="bg-white/10 border border-cr-gold/20 rounded-xl p-4">
                <f.icon className="w-6 h-6 text-cr-gold mb-2" />
                <h3 className="font-[family-name:var(--font-cinzel)] text-sm font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-white/60">{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
