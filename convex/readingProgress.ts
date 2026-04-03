import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return ctx.db
      .query("readingProgress")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const getStreak = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return 0;
    const entries = await ctx.db
      .query("readingProgress")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();
    if (entries.length === 0) return 0;

    const dates = [...new Set(entries.map((e) => e.date))].sort().reverse();
    const today = new Date().toISOString().split("T")[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split("T")[0];

    if (dates[0] !== today && dates[0] !== yesterday) return 0;

    let streak = 1;
    for (let i = 1; i < dates.length; i++) {
      const prev = new Date(dates[i - 1]);
      const curr = new Date(dates[i]);
      const diffDays = (prev.getTime() - curr.getTime()) / 86400000;
      if (diffDays === 1) streak++;
      else break;
    }
    return streak;
  },
});

export const complete = mutation({
  args: {
    planId: v.string(),
    book: v.string(),
    chapter: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const date = new Date().toISOString().split("T")[0];
    await ctx.db.insert("readingProgress", {
      userId: identity.subject,
      planId: args.planId,
      date,
      book: args.book,
      chapter: args.chapter,
      completedAt: Date.now(),
    });
  },
});
