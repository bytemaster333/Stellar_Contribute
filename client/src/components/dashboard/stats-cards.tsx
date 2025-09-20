import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function StatsCards() {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["/api/stats"],
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="bg-dark-700 border-dark-600">
            <CardContent className="p-6">
              <Skeleton className="h-12 w-full" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Contributors",
      value: stats?.totalContributors?.toLocaleString() || "0",
      icon: "fas fa-users",
      iconBg: "bg-stellar-500/20",
      iconColor: "text-stellar-500",
      change: "+12%",
      changeText: "vs last month"
    },
    {
      title: "Avg Contribution Score",
      value: stats?.avgContributionScore?.toString() || "0",
      icon: "fas fa-chart-bar",
      iconBg: "bg-soroban-500/20",
      iconColor: "text-soroban-500",
      change: "+8%",
      changeText: "vs last month"
    },
    {
      title: "Badges Issued",
      value: stats?.totalBadgesIssued?.toLocaleString() || "0",
      icon: "fas fa-medal",
      iconBg: "bg-yellow-500/20",
      iconColor: "text-yellow-500",
      change: "+15%",
      changeText: "vs last month"
    },
    {
      title: "Active This Week",
      value: stats?.activeThisWeek?.toLocaleString() || "0",
      icon: "fas fa-clock",
      iconBg: "bg-green-500/20",
      iconColor: "text-green-500",
      change: "+5%",
      changeText: "vs last week"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index} className="bg-dark-700 border-dark-600">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-dark-200 text-sm font-medium">{stat.title}</p>
                <p className="text-2xl font-bold text-dark-50 mt-1">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 ${stat.iconBg} rounded-lg flex items-center justify-center`}>
                <i className={`${stat.icon} ${stat.iconColor} text-xl`}></i>
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <span className="text-green-400">↗ {stat.change}</span>
              <span className="text-dark-200 ml-2">{stat.changeText}</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
