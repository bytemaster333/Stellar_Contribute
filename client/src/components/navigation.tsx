interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: any) => void;
}

export default function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-chart-line' },
    { id: 'leaderboard', label: 'Leaderboard', icon: 'fas fa-trophy' },
    { id: 'profile', label: 'Profile', icon: 'fas fa-user' },
    { id: 'badges', label: 'Badges', icon: 'fas fa-medal' },
    { id: 'map', label: 'Global Map', icon: 'fas fa-globe' },
    { id: 'mentors', label: 'Mentors', icon: 'fas fa-graduation-cap' },
  ];

  return (
    <nav className="bg-dark-700 border-b border-dark-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8 overflow-x-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onSectionChange(item.id)}
              className={`nav-tab ${activeSection === item.id ? 'active' : ''}`}
            >
              <i className={`${item.icon} mr-2`}></i>
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
}
