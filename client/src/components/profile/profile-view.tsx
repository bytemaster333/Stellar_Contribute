import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export default function ProfileView() {
  // For demo, showing first contributor profile
  const { data: contributors, isLoading: contributorsLoading } = useQuery({
    queryKey: ["/api/contributors"],
  });

  const { data: badges } = useQuery({
    queryKey: ["/api/badges"],
  });

  const { data: activities } = useQuery({
    queryKey: ["/api/activities"],
  });

  const contributor = contributors?.[0]; // Show first contributor as example

  if (contributorsLoading || !contributor) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-1">
          <Card className="bg-dark-700 border-dark-600">
            <CardContent className="p-6">
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
        <div className="lg:col-span-2 space-y-8">
          <Card className="bg-dark-700 border-dark-600">
            <CardContent className="p-6">
              <Skeleton className="h-32 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const contributorBadges = [
    { name: "Soroban Expert", description: "Advanced smart contract development", icon: "fas fa-code", color: "soroban-500" },
    { name: "Forum Helper", description: "100+ helpful forum replies", icon: "fas fa-comments", color: "yellow-500" },
    { name: "Community Leader", description: "Active community engagement", icon: "fas fa-users", color: "green-500" }
  ];

  const contributorActivities = activities?.filter((activity: any) => activity.contributorId === contributor.id) || [];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Profile Info */}
      <div className="lg:col-span-1">
        <Card className="bg-dark-700 border-dark-600">
          <CardContent className="p-6">
            <div className="text-center">
              <div className="w-24 h-24 bg-stellar-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                {contributor.avatar}
              </div>
              <h2 className="text-xl font-bold text-dark-50">{contributor.username}</h2>
              <p className="text-dark-200 mt-1">Senior Developer</p>
              <p className="text-dark-300 text-sm font-mono mt-2">{contributor.walletAddress}</p>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="text-center">
                <p className="text-2xl font-bold text-stellar-400">{contributor.totalScore.toLocaleString()}</p>
                <p className="text-dark-200 text-sm">Total Score</p>
              </div>
              
              <div className="border-t border-dark-600 pt-4">
                <p className="text-dark-200 text-sm mb-2">Bio</p>
                <p className="text-dark-50 text-sm">{contributor.bio}</p>
              </div>

              <div className="border-t border-dark-600 pt-4">
                <p className="text-dark-200 text-sm mb-3">Badges Earned</p>
                <div className="space-y-2">
                  {contributorBadges.map((badge, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className={`w-8 h-8 bg-${badge.color}/20 rounded-lg flex items-center justify-center`}>
                        <i className={`${badge.icon} text-${badge.color} text-sm`}></i>
                      </div>
                      <div>
                        <p className="text-dark-50 text-sm font-medium">{badge.name}</p>
                        <p className="text-dark-300 text-xs">{badge.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline & Summary */}
      <div className="lg:col-span-2 space-y-8">
        {/* AI Summary */}
        <Card className="bg-dark-700 border-dark-600">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-dark-50">
              <i className="fas fa-robot text-stellar-500 mr-2"></i>AI Contribution Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-dark-600/50 rounded-lg p-4">
              <p className="text-dark-50 leading-relaxed">
                <strong>{contributor.username}</strong> is a highly active contributor focused on Soroban smart contract development and Turkish community support. 
                Their contributions show expertise in DeFi protocols, with significant GitHub activity and consistent forum engagement. 
                Key strengths include smart contract optimization, developer documentation, and multilingual community support.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Contribution Heatmap */}
        <Card className="bg-dark-700 border-dark-600">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-dark-50">Contribution Timeline</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <div className="grid grid-cols-53 gap-1 w-max">
                {[...Array(371)].map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-sm ${
                      Math.random() > 0.7 ? 'contribution-day-3' :
                      Math.random() > 0.5 ? 'contribution-day-2' :
                      Math.random() > 0.3 ? 'contribution-day-1' :
                      'contribution-day-0'
                    }`}
                  ></div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-between mt-4 text-sm text-dark-200">
              <span>Less</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 contribution-day-0 rounded-sm"></div>
                <div className="w-3 h-3 contribution-day-1 rounded-sm"></div>
                <div className="w-3 h-3 contribution-day-2 rounded-sm"></div>
                <div className="w-3 h-3 contribution-day-3 rounded-sm"></div>
              </div>
              <span>More</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-dark-700 border-dark-600">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-dark-50">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {contributorActivities.slice(0, 3).map((activity: any) => (
                <div key={activity.id} className="flex items-start space-x-4 p-3 bg-dark-600/50 rounded-lg">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                    <i className="fas fa-code text-white text-xs"></i>
                  </div>
                  <div className="flex-1">
                    <p className="text-dark-50 text-sm">{activity.description}</p>
                    <p className="text-dark-300 text-xs mt-1">
                      {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
