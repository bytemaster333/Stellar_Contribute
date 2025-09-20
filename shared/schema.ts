import { pgTable, text, serial, integer, timestamp, boolean, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const contributors = pgTable("contributors", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  walletAddress: text("wallet_address").notNull(),
  bio: text("bio"),
  totalScore: integer("total_score").notNull().default(0),
  githubScore: integer("github_score").notNull().default(0),
  forumScore: integer("forum_score").notNull().default(0),
  onChainScore: integer("on_chain_score").notNull().default(0),
  location: text("location"),
  avatar: text("avatar"),
  joinedAt: timestamp("joined_at").notNull().defaultNow(),
  isActive: boolean("is_active").notNull().default(true),
  isMentor: boolean("is_mentor").notNull().default(false),
  mentorExpertise: json("mentor_expertise").$type<string[]>(),
  mentorResponseTime: text("mentor_response_time"),
});

export const badges = pgTable("badges", {
  id: serial("id").primaryKey(),
  name: text("name").notNull().unique(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  rarity: text("rarity").notNull(), // common, uncommon, rare, legendary
  color: text("color").notNull(),
  requirement: text("requirement").notNull(),
  earnedCount: integer("earned_count").notNull().default(0),
});

export const contributorBadges = pgTable("contributor_badges", {
  id: serial("id").primaryKey(),
  contributorId: integer("contributor_id").notNull(),
  badgeId: integer("badge_id").notNull(),
  earnedAt: timestamp("earned_at").notNull().defaultNow(),
});

export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  contributorId: integer("contributor_id").notNull(),
  type: text("type").notNull(), // code, forum, contract, badge
  description: text("description").notNull(),
  points: integer("points").notNull(),
  timestamp: timestamp("timestamp").notNull().defaultNow(),
  metadata: json("metadata").$type<Record<string, any>>(),
});

export const insertContributorSchema = createInsertSchema(contributors).omit({
  id: true,
  joinedAt: true,
});

export const insertBadgeSchema = createInsertSchema(badges).omit({
  id: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  timestamp: true,
});

export type InsertContributor = z.infer<typeof insertContributorSchema>;
export type Contributor = typeof contributors.$inferSelect;
export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type Badge = typeof badges.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
export type Activity = typeof activities.$inferSelect;
export type ContributorBadge = typeof contributorBadges.$inferSelect;
