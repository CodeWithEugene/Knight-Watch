import { mutation, query } from './_generated/server';
import { v } from 'convex/values';

const RESET_TOKEN_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Public: request a password reset. Always succeeds (no account enumeration):
 * looks up the user internally and stores a single-use token only if found.
 * Returns whether a token was created — the API route only uses this to
 * decide whether to send an email, and always responds generically.
 */
export const requestPasswordReset = mutation({
  args: { email: v.string(), tokenHash: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query('users')
      .withIndex('by_email', (q) => q.eq('email', args.email))
      .first();
    if (!user) return { created: false };

    // Invalidate any previous unused tokens for this user.
    const previous = await ctx.db
      .query('passwordResetTokens')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .collect();
    const now = Date.now();
    for (const t of previous) {
      if (!t.usedAt) await ctx.db.patch(t._id, { usedAt: now });
    }

    await ctx.db.insert('passwordResetTokens', {
      userId: user._id,
      tokenHash: args.tokenHash,
      expiresAt: now + RESET_TOKEN_TTL_MS,
      createdAt: now,
    });
    return { created: true };
  },
});

/** Public: check whether a reset token is still valid (for the reset form UX). */
export const validateResetToken = query({
  args: { tokenHash: v.string() },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query('passwordResetTokens')
      .withIndex('by_tokenHash', (q) => q.eq('tokenHash', args.tokenHash))
      .first();
    if (!record || record.usedAt || record.expiresAt < Date.now()) {
      return { valid: false };
    }
    return { valid: true };
  },
});

/**
 * Public: atomically consume a valid token and set the new password hash.
 * Validation and consumption happen in one mutation (no TOCTOU gap).
 */
export const resetPasswordWithToken = mutation({
  args: { tokenHash: v.string(), passwordHash: v.string() },
  handler: async (ctx, args) => {
    const record = await ctx.db
      .query('passwordResetTokens')
      .withIndex('by_tokenHash', (q) => q.eq('tokenHash', args.tokenHash))
      .first();
    if (!record || record.usedAt || record.expiresAt < Date.now()) {
      throw new Error('Reset link is invalid or has expired');
    }
    const now = Date.now();
    await ctx.db.patch(record._id, { usedAt: now });
    const user = await ctx.db.get(record.userId);
    if (!user) throw new Error('Reset link is invalid or has expired');
    await ctx.db.patch(record.userId, { passwordHash: args.passwordHash });
    return { ok: true, email: user.email };
  },
});
