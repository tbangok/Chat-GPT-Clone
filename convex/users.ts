import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

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
