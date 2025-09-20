import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceToNow } from "date-fns";

export default function ActivityFeed() {
  const { data: activities, isLoading } = useQuery({
    queryKey: ["/api/activities"],
  });

  const { data: contributors } = useQuery({
    queryKey: ["/api/contributors"],
  });

  if (isLoading) {
    return (
      <Card className="bg-dark-700 border-dark-600">
        <CardHeader>
          <CardTitle className="text-dark-50">Recent Activity</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  const getActivityTypeInfo = (type: string) => {
    switch (type) {
      case 'code':
        return { bg: 'bg-green-500', icon: 'fas fa-code', label: 'Code Contribution' };
      case 'forum':
        return { bg: 'bg-blue-500', icon: 'fas fa-comments', label: 'Forum Help' };
      case 'contract':
        return { bg: 'bg-purple-500', icon: 'fas fa-link', label: 'On-Chain Activity' };
      case 'badge':
        return { bg: 'bg-yellow-500', icon: 'fas fa-medal', label: 'Badge Earned' };
      default:
        return { bg: 'bg-gray-500', icon: 'fas fa-circle', label: 'Activity' };
    }
  };

  const getContributorInfo = (contributorId: number) => {
    const contributor = contributors?.find((c: any) => c.id === contributorId);
    return {
      username: contributor?.username || 'Unknown',
      avatar: contributor?.avatar || 'U'
    };
  };

  return (
    <Card className="bg-dark-700 border-dark-600">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-dark-50">Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities?.map((activity: any) => {
            const typeInfo = getActivityTypeInfo(activity.type);
            const contributorInfo = getContributorInfo(activity.contributorId);
            
            return (
              <div key={activity.id} className="flex items-center space-x-4 p-3 bg-dark-600/50 rounded-lg">
                <div className={`w-10 h-10 ${typeInfo.bg} rounded-full flex items-center justify-center text-white font-semibold`}>
                  {contributorInfo.avatar}
                </div>
                <div className="flex-1">
                  <p className="text-dark-50 font-medium">{activity.description}</p>
                  <p className="text-dark-200 text-sm">
                    {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })} • +{activity.points} points
                  </p>
                </div>
                <div className={`${typeInfo.bg}/20 text-${typeInfo.bg.split('-')[1]}-400 px-2 py-1 rounded text-xs font-medium`}>
                  {typeInfo.label}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}
