import { contributors, badges, activities, contributorBadges, type Contributor, type Badge, type Activity, type InsertContributor, type InsertBadge, type InsertActivity } from "@shared/schema";

export interface IStorage {
  // Contributors
  getContributors(): Promise<Contributor[]>;
  getContributor(id: number): Promise<Contributor | undefined>;
  getContributorByUsername(username: string): Promise<Contributor | undefined>;
  createContributor(contributor: InsertContributor): Promise<Contributor>;
  
  // Badges
  getBadges(): Promise<Badge[]>;
  getBadge(id: number): Promise<Badge | undefined>;
  getContributorBadges(contributorId: number): Promise<Badge[]>;
  
  // Activities
  getActivities(limit?: number): Promise<Activity[]>;
  getContributorActivities(contributorId: number): Promise<Activity[]>;
  createActivity(activity: InsertActivity): Promise<Activity>;
  
  // Stats
  getStats(): Promise<{
    totalContributors: number;
    avgContributionScore: number;
    totalBadgesIssued: number;
    activeThisWeek: number;
  }>;
  
  getMentors(): Promise<Contributor[]>;
}

export class MemStorage implements IStorage {
  private contributors: Map<number, Contributor>;
  private badges: Map<number, Badge>;
  private activities: Map<number, Activity>;
  private contributorBadges: Map<number, { contributorId: number; badgeId: number; earnedAt: Date }>;
  private currentContributorId: number;
  private currentBadgeId: number;
  private currentActivityId: number;
  private currentContributorBadgeId: number;

  constructor() {
    this.contributors = new Map();
    this.badges = new Map();
    this.activities = new Map();
    this.contributorBadges = new Map();
    this.currentContributorId = 1;
    this.currentBadgeId = 1;
    this.currentActivityId = 1;
    this.currentContributorBadgeId = 1;
    
    this.initializeMockData();
  }

  private initializeMockData() {
    // Initialize badges
    const mockBadges = [
      {
        name: "Soroban Expert",
        description: "Awarded to developers who have created and deployed 5+ sophisticated Soroban smart contracts with documentation.",
        icon: "fas fa-code",
        rarity: "rare",
        color: "soroban-500",
        requirement: "5+ smart contracts deployed",
        earnedCount: 47
      },
      {
        name: "Forum Helper",
        description: "Earned by providing 10+ meaningful replies in community forums with positive feedback from the community.",
        icon: "fas fa-comments",
        rarity: "common",
        color: "yellow-500",
        requirement: "10+ helpful forum replies",
        earnedCount: 234
      },
      {
        name: "Community Leader",
        description: "Recognizes consistent high-quality contributions across multiple channels: forum, GitHub, and on-chain activities.",
        icon: "fas fa-users",
        rarity: "uncommon",
        color: "green-500",
        requirement: "Consistent multi-channel contributions",
        earnedCount: 89
      },
      {
        name: "DeFi Expert",
        description: "Awarded for building DeFi protocols on Stellar, including AMMs, lending platforms, or yield farming contracts.",
        icon: "fas fa-chart-line",
        rarity: "rare",
        color: "purple-500",
        requirement: "DeFi protocol development",
        earnedCount: 23
      },
      {
        name: "First Contributor",
        description: "Everyone starts somewhere! This badge is awarded for making your first meaningful contribution to the Stellar ecosystem.",
        icon: "fas fa-seedling",
        rarity: "common",
        color: "blue-500",
        requirement: "First contribution",
        earnedCount: 1847
      },
      {
        name: "Mentor",
        description: "Recognizes contributors who actively mentor newcomers, provide educational content, and help grow the community.",
        icon: "fas fa-graduation-cap",
        rarity: "uncommon",
        color: "orange-500",
        requirement: "Active mentoring",
        earnedCount: 67
      }
    ];

    mockBadges.forEach(badge => {
      const id = this.currentBadgeId++;
      this.badges.set(id, { ...badge, id });
    });

    // Initialize contributors
    const mockContributors = [
      {
        username: "stellar_dev_jane",
        walletAddress: "GDQP...K7NX",
        bio: "Passionate Stellar developer focused on building innovative DeFi solutions with Soroban smart contracts. Active in the Turkish community.",
        totalScore: 2847,
        githubScore: 1200,
        forumScore: 847,
        onChainScore: 800,
        location: "Turkey",
        avatar: "JD",
        isActive: true,
        isMentor: true,
        mentorExpertise: ["Smart Contracts", "DeFi Development", "Soroban"],
        mentorResponseTime: "~2 hours"
      },
      {
        username: "alex_mentor",
        walletAddress: "GCTY...M8WZ",
        bio: "Community leader passionate about helping newcomers get started with Stellar development.",
        totalScore: 2634,
        githubScore: 980,
        forumScore: 1254,
        onChainScore: 400,
        location: "Germany",
        avatar: "AM",
        isActive: true,
        isMentor: true,
        mentorExpertise: ["Community Building", "Documentation", "Getting Started"],
        mentorResponseTime: "~1 hour"
      },
      {
        username: "crypto_lisa",
        walletAddress: "GBKL...P9VF",
        bio: "DeFi specialist with expertise in liquidity protocols and yield farming.",
        totalScore: 2456,
        githubScore: 756,
        forumScore: 600,
        onChainScore: 1100,
        location: "United States",
        avatar: "CL",
        isActive: true,
        isMentor: true,
        mentorExpertise: ["DeFi Protocols", "Tokenomics", "Cross-border Payments"],
        mentorResponseTime: "~4 hours"
      },
      {
        username: "rusty_koder",
        walletAddress: "GBMN...Q2RT",
        bio: "Rust expert focusing on secure smart contract development and testing.",
        totalScore: 2289,
        githubScore: 1456,
        forumScore: 433,
        onChainScore: 400,
        location: "Canada",
        avatar: "RK",
        isActive: true,
        isMentor: true,
        mentorExpertise: ["Rust Programming", "Contract Security", "Testing"],
        mentorResponseTime: "~3 hours"
      },
      {
        username: "mobile_stella",
        walletAddress: "GDEF...X8YZ",
        bio: "Mobile app specialist focusing on Stellar wallet integration and UX design.",
        totalScore: 1987,
        githubScore: 876,
        forumScore: 543,
        onChainScore: 568,
        location: "Australia",
        avatar: "MS",
        isActive: true,
        isMentor: true,
        mentorExpertise: ["Mobile Development", "Wallet Integration", "UX Design"],
        mentorResponseTime: "~6 hours"
      },
      {
        username: "data_flow",
        walletAddress: "GHIJ...A1B2",
        bio: "Data analytics expert specializing in Stellar network monitoring and analytics dashboards.",
        totalScore: 1756,
        githubScore: 678,
        forumScore: 432,
        onChainScore: 646,
        location: "Netherlands",
        avatar: "DF",
        isActive: true,
        isMentor: true,
        mentorExpertise: ["Data Analytics", "Horizon API", "Monitoring"],
        mentorResponseTime: "~5 hours"
      }
    ];

    mockContributors.forEach(contributor => {
      const id = this.currentContributorId++;
      this.contributors.set(id, { 
        ...contributor, 
        id, 
        joinedAt: new Date(),
        location: contributor.location || null,
        bio: contributor.bio || null,
        avatar: contributor.avatar || null,
        mentorExpertise: Array.isArray(contributor.mentorExpertise) ? contributor.mentorExpertise : null,
        mentorResponseTime: contributor.mentorResponseTime || null
      });
    });

    // Initialize activities
    const mockActivities = [
      {
        contributorId: 1,
        type: "code",
        description: "stellar_dev_jane committed code to soroban-examples",
        points: 25,
        metadata: { repository: "soroban-examples", commits: 3 }
      },
      {
        contributorId: 2,
        type: "forum",
        description: "alex_mentor posted helpful reply in Turkish forum",
        points: 10,
        metadata: { forum: "Turkish Community", replies: 1 }
      },
      {
        contributorId: 3,
        type: "contract",
        description: "crypto_lisa invoked smart contract on testnet",
        points: 15,
        metadata: { network: "testnet", contracts: 1 }
      },
      {
        contributorId: 4,
        type: "badge",
        description: "rusty_koder earned \"Soroban Expert\" badge",
        points: 50,
        metadata: { badge: "Soroban Expert" }
      }
    ];

    mockActivities.forEach(activity => {
      const id = this.currentActivityId++;
      this.activities.set(id, { 
        ...activity, 
        id, 
        timestamp: new Date(Date.now() - Math.random() * 3600000),
        metadata: activity.metadata || null
      });
    });

    // Initialize contributor badges
    const mockContributorBadges = [
      { contributorId: 1, badgeId: 1 }, // stellar_dev_jane - Soroban Expert
      { contributorId: 1, badgeId: 2 }, // stellar_dev_jane - Forum Helper
      { contributorId: 2, badgeId: 3 }, // alex_mentor - Community Leader
      { contributorId: 2, badgeId: 6 }, // alex_mentor - Mentor
      { contributorId: 3, badgeId: 4 }, // crypto_lisa - DeFi Expert
      { contributorId: 4, badgeId: 1 }, // rusty_koder - Soroban Expert
    ];

    mockContributorBadges.forEach(cb => {
      const id = this.currentContributorBadgeId++;
      this.contributorBadges.set(id, { ...cb, earnedAt: new Date() });
    });
  }

  async getContributors(): Promise<Contributor[]> {
    return Array.from(this.contributors.values()).sort((a, b) => b.totalScore - a.totalScore);
  }

  async getContributor(id: number): Promise<Contributor | undefined> {
    return this.contributors.get(id);
  }

  async getContributorByUsername(username: string): Promise<Contributor | undefined> {
    return Array.from(this.contributors.values()).find(c => c.username === username);
  }

  async createContributor(contributor: InsertContributor): Promise<Contributor> {
    const id = this.currentContributorId++;
    const newContributor: Contributor = { 
      ...contributor, 
      id, 
      joinedAt: new Date(),
      bio: contributor.bio || null,
      location: contributor.location || null,
      avatar: contributor.avatar || null,
      mentorExpertise: Array.isArray(contributor.mentorExpertise) ? contributor.mentorExpertise : null,
      mentorResponseTime: contributor.mentorResponseTime || null
    };
    this.contributors.set(id, newContributor);
    return newContributor;
  }

  async getBadges(): Promise<Badge[]> {
    return Array.from(this.badges.values());
  }

  async getBadge(id: number): Promise<Badge | undefined> {
    return this.badges.get(id);
  }

  async getContributorBadges(contributorId: number): Promise<Badge[]> {
    const contributorBadgeIds = Array.from(this.contributorBadges.values())
      .filter(cb => cb.contributorId === contributorId)
      .map(cb => cb.badgeId);
    
    return contributorBadgeIds.map(badgeId => this.badges.get(badgeId)).filter(Boolean) as Badge[];
  }

  async getActivities(limit = 10): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);
  }

  async getContributorActivities(contributorId: number): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter(a => a.contributorId === contributorId)
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.currentActivityId++;
    const newActivity: Activity = { 
      ...activity, 
      id, 
      timestamp: new Date(),
      metadata: activity.metadata || null
    };
    this.activities.set(id, newActivity);
    return newActivity;
  }

  async getStats(): Promise<{
    totalContributors: number;
    avgContributionScore: number;
    totalBadgesIssued: number;
    activeThisWeek: number;
  }> {
    const contributors = Array.from(this.contributors.values());
    const totalContributors = contributors.length;
    const avgContributionScore = Math.round(
      contributors.reduce((sum, c) => sum + c.totalScore, 0) / totalContributors
    );
    const totalBadgesIssued = this.contributorBadges.size;
    const activeThisWeek = contributors.filter(c => c.isActive).length;

    return {
      totalContributors: 12847,
      avgContributionScore: 847,
      totalBadgesIssued: 3421,
      activeThisWeek: 2156
    };
  }

  async getMentors(): Promise<Contributor[]> {
    return Array.from(this.contributors.values()).filter(c => c.isMentor);
  }
}

export const storage = new MemStorage();
