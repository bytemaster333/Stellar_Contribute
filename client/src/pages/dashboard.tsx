import { useState } from "react";
import Navigation from "@/components/navigation";
import StatsCards from "@/components/dashboard/stats-cards";
import ActivityFeed from "@/components/dashboard/activity-feed";
import Charts from "@/components/dashboard/charts";
import LeaderboardTable from "@/components/leaderboard/leaderboard-table";
import ProfileView from "@/components/profile/profile-view";
import BadgeExplorer from "@/components/badges/badge-explorer";
import GlobalMap from "@/components/map/global-map";
import MentorDirectory from "@/components/mentors/mentor-directory";

type Section = 'dashboard' | 'leaderboard' | 'profile' | 'badges' | 'map' | 'mentors';

export default function Dashboard() {
  const [activeSection, setActiveSection] = useState<Section>('dashboard');

  const renderSection = () => {
    switch (activeSection) {
      case 'dashboard':
        return (
          <div className="space-y-8">
            <StatsCards />
            <Charts />
            <ActivityFeed />
          </div>
        );
      case 'leaderboard':
        return <LeaderboardTable />;
      case 'profile':
        return <ProfileView />;
      case 'badges':
        return <BadgeExplorer />;
      case 'map':
        return <GlobalMap />;
      case 'mentors':
        return <MentorDirectory />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-dark-800">
      {/* Header */}
      <header className="bg-dark-700 border-b border-dark-600 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-stellar-500 rounded-full flex items-center justify-center">
                  <i className="fas fa-star text-white text-sm"></i>
                </div>
                <h1 className="text-xl font-bold text-dark-50">StellaRank</h1>
              </div>
              <span className="text-dark-200 text-sm">Stellar Contributor Reputation</span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-stellar-500 hover:bg-stellar-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                <i className="fas fa-plus mr-2"></i>Connect Wallet
              </button>
            </div>
          </div>
        </div>
      </header>

      <Navigation activeSection={activeSection} onSectionChange={setActiveSection} />

      {/* Mock Data Warning Banner */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 mx-auto max-w-7xl mt-4 rounded-lg">
        <div className="px-4 py-3 sm:px-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <i className="fas fa-exclamation-triangle text-yellow-400"></i>
            </div>
            <div className="ml-3">
              <p className="text-sm text-yellow-200">
                <strong>Demo Mode:</strong> This application displays mock data for demonstration purposes. 
                All contributor statistics, badges, and activities are simulated examples.
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderSection()}
      </main>
    </div>
  );
}
