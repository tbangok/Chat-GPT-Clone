import { v } from "convex/values";
import { internalMutation, mutation, query } from "./_generated/server";

export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Cant call user without authenticated user!");
    }

    //check if user is already stored
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      const chat = await ctx.db
        .query("chats")
        .withIndex("by_userId", (q) => q.eq("userId", user._id))
        .first();

      if (chat === null) {
        const chatId = await ctx.db.insert("chats", {
          userId: user._id,
          title: "New chat",
        });
      }
      return user._id;
    }

    const userId = await ctx.db.insert("users", {
      tokenIdentifier: identity.tokenIdentifier,
      model: "gpt-3.5-turbo-1106",
    });

    await ctx.db.insert("chats", { userId, title: "New chat" });
    return userId;
  },
});

export const selectGPT = mutation({
  args: {
    model: v.union(
      v.literal("gpt-3.5-turbo-1106"),
      v.literal("gpt-4-0125-preview")
    ),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Cant select GPT without user!");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user === null) {
      throw Error("User not found");
    }

    await ctx.db.patch(user._id, {
      model: args.model,
    });
    return user._id;
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Cant select GPT without user!");
    }

    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();
  },
});

//update subcription
export const updateSubcription = internalMutation({
  args: {
    subscriptionId: v.string(),
    endsOn: v.number(),
    userId: v.id("users"),
  },
  handler: async (ctx, { subscriptionId, endsOn, userId }) => {
    await ctx.db.patch(userId, {
      subscriptionId: subscriptionId,
      endsOn: endsOn,
    });
  },
});

//update sub by id
export const updateSubcriptionBySubId = internalMutation({
  args: {
    subscriptionId: v.string(),
    endsOn: v.number(),
  },
  handler: async (ctx, { subscriptionId, endsOn }) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_subscriptionId", (q) =>
        q.eq("subscriptionId", subscriptionId)
      )
      .unique();

    if (!user) {
      throw Error("User not found");
    }

    await ctx.db.patch(user._id, {
      endsOn: endsOn,
    });
  },
});
