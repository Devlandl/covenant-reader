import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  userProfiles: defineTable({
    userId: v.string(),
    avatar: v.string(),
    displayName: v.string(),
    selectedPlan: v.optional(v.union(v.literal("3-month"), v.literal("6-month"), v.literal("12-month"))),
    planStartDate: v.optional(v.number()),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  userSettings: defineTable({
    userId: v.string(),
    darkMode: v.boolean(),
    fontSize: v.union(v.literal("small"), v.literal("medium"), v.literal("large")),
    reminderEnabled: v.boolean(),
    reminderTime: v.string(),
    createdAt: v.number(),
  }).index("by_userId", ["userId"]),

  readingProgress: defineTable({
    userId: v.string(),
    planId: v.string(),
    date: v.string(),
    book: v.string(),
    chapter: v.number(),
    completedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_date", ["userId", "date"])
    .index("by_userId_planId", ["userId", "planId"]),

  favorites: defineTable({
    userId: v.string(),
    book: v.string(),
    chapter: v.number(),
    verse: v.number(),
    text: v.string(),
    reference: v.string(),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_ref", ["userId", "book", "chapter", "verse"]),

  prayerEntries: defineTable({
    userId: v.string(),
    title: v.string(),
    body: v.string(),
    linkedVerse: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  }).index("by_userId", ["userId"]),

  vaultPin: defineTable({
    userId: v.string(),
    pinHash: v.string(),
  }).index("by_userId", ["userId"]),

  badges: defineTable({
    userId: v.string(),
    badgeId: v.string(),
    earnedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_badgeId", ["userId", "badgeId"]),
});
