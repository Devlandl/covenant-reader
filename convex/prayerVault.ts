import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getPin = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return null;
    return ctx.db
      .query("vaultPin")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first();
  },
});

export const setPin = mutation({
  args: { pinHash: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const existing = await ctx.db
      .query("vaultPin")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, { pinHash: args.pinHash });
      return;
    }
    await ctx.db.insert("vaultPin", {
      userId: identity.subject,
      pinHash: args.pinHash,
    });
  },
});

export const listEntries = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    const entries = await ctx.db
      .query("prayerEntries")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();
    return entries.sort((a, b) => b.createdAt - a.createdAt);
  },
});

export const createEntry = mutation({
  args: {
    title: v.string(),
    body: v.string(),
    linkedVerse: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    return ctx.db.insert("prayerEntries", {
      userId: identity.subject,
      ...args,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

export const updateEntry = mutation({
  args: {
    id: v.id("prayerEntries"),
    title: v.string(),
    body: v.string(),
    linkedVerse: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const { id, ...fields } = args;
    await ctx.db.patch(id, { ...fields, updatedAt: Date.now() });
  },
});

export const deleteEntry = mutation({
  args: { id: v.id("prayerEntries") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    await ctx.db.delete(args.id);
  },
});
