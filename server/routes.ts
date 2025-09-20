import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Contributors
  app.get("/api/contributors", async (req, res) => {
    try {
      const contributors = await storage.getContributors();
      res.json(contributors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contributors" });
    }
  });

  app.get("/api/contributors/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const contributor = await storage.getContributor(id);
      if (!contributor) {
        return res.status(404).json({ error: "Contributor not found" });
      }
      res.json(contributor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contributor" });
    }
  });

  app.get("/api/contributors/username/:username", async (req, res) => {
    try {
      const contributor = await storage.getContributorByUsername(req.params.username);
      if (!contributor) {
        return res.status(404).json({ error: "Contributor not found" });
      }
      res.json(contributor);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contributor" });
    }
  });

  app.get("/api/contributors/:id/badges", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const badges = await storage.getContributorBadges(id);
      res.json(badges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contributor badges" });
    }
  });

  app.get("/api/contributors/:id/activities", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const activities = await storage.getContributorActivities(id);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch contributor activities" });
    }
  });

  // Badges
  app.get("/api/badges", async (req, res) => {
    try {
      const badges = await storage.getBadges();
      res.json(badges);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch badges" });
    }
  });

  // Activities
  app.get("/api/activities", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
      const activities = await storage.getActivities(limit);
      res.json(activities);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch activities" });
    }
  });

  // Stats
  app.get("/api/stats", async (req, res) => {
    try {
      const stats = await storage.getStats();
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Mentors
  app.get("/api/mentors", async (req, res) => {
    try {
      const mentors = await storage.getMentors();
      res.json(mentors);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch mentors" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
