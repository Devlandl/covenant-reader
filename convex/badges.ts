import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const list = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return ctx.db
      .query("badges")
      .withIndex("by_userId", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const award = mutation({
  args: { badgeId: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");
    const existing = await ctx.db
      .query("badges")
      .withIndex("by_userId_badgeId", (q) =>
        q.eq("userId", identity.subject).eq("badgeId", args.badgeId)
      )
      .first();
    if (existing) return "already_earned";
    await ctx.db.insert("badges", {
      userId: identity.subject,
      badgeId: args.badgeId,
      earnedAt: Date.now(),
    });
    return "awarded";
  },
});
