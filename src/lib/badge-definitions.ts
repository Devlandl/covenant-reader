export const BADGE_DEFINITIONS = [
  { id: "first-steps", name: "First Steps", icon: "🌱", description: "Complete your first reading", trigger: "reading_count_1" },
  { id: "week-warrior", name: "Week Warrior", icon: "🔥", description: "7-day reading streak", trigger: "streak_7" },
  { id: "bookworm", name: "Bookworm", icon: "📖", description: "Read 10 chapters", trigger: "chapters_10" },
  { id: "faithful", name: "Faithful", icon: "⭐", description: "30-day reading streak", trigger: "streak_30" },
  { id: "prayer-warrior", name: "Prayer Warrior", icon: "🙏", description: "Write 10 prayer journal entries", trigger: "prayers_10" },
  { id: "scholar", name: "Scholar", icon: "🎓", description: "Read 50 chapters", trigger: "chapters_50" },
  { id: "devoted", name: "Devoted", icon: "👑", description: "100-day reading streak", trigger: "streak_100" },
  { id: "completionist", name: "Completionist", icon: "🏆", description: "Finish a reading plan", trigger: "plan_complete" },
] as const;

export type BadgeId = (typeof BADGE_DEFINITIONS)[number]["id"];
