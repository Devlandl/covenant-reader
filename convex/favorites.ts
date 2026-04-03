import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const favs = await ctx.db
      .query("favorites")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();
    return favs.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const isFavorited = query({
  args: { book: v.string(), chapter: v.number(), verse: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return false;
    const fav = await ctx.db
      .query("favorites")
      .withIndex("by_userId_ref", (q) =>
        q.eq("userId", identity.subject).eq("book", args.book).eq("chapter", args.chapter).eq("verse", args.verse)
      )
      .first();
    return !!fav;
  },
});

export const toggle = mutation({
  args: {
    book: v.string(),
    chapter: v.number(),
    verse: v.number(),
    text: v.string(),
    reference: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const existing = await ctx.db
      .query("favorites")
      .withIndex("by_userId_ref", (q) =>
        q.eq("userId", identity.subject).eq("book", args.book).eq("chapter", args.chapter).eq("verse", args.verse)
      )
      .first();
    if (existing) {
      await ctx.db.delete(existing._id);
      return "removed";
    }
    await ctx.db.insert("favorites", {
      userId: identity.subject,
      ...args,
      createdAt: Date.now(),
    });
    return "added";
  },
});
