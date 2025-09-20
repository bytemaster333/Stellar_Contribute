import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function BadgeExplorer() {
  const { data: badges, isLoading } = useQuery({
    queryKey: ["/api/badges"],
  });

  if (isLoading) {
    return (
      <div>
        <div className="mb-6">
          <Skeleton className="h-8 w-64 mb-2" />
          <Skeleton className="h-4 w-96" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="bg-dark-700 border-dark-600">
              <CardContent className="p-6">
                <Skeleton className="h-32 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-blue-500/20 text-blue-400';
      case 'uncommon': return 'bg-green-500/20 text-green-400';
      case 'rare': return 'bg-purple-500/20 text-purple-400';
      case 'legendary': return 'bg-yellow-500/20 text-yellow-400';
      default: return 'bg-gray-500/20 text-gray-400';
    }
  };

  const getIconColor = (color: string) => {
    return color.replace('500', '500');
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark-50 mb-2">Badge Explorer</h2>
        <p className="text-dark-200">Discover all available badges and their requirements</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges?.map((badge: any) => (
          <Card 
            key={badge.id} 
            className={`bg-dark-700 border-dark-600 hover:border-${badge.color} transition-colors cursor-pointer`}
          >
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className={`w-12 h-12 bg-${badge.color}/20 rounded-xl flex items-center justify-center`}>
                  <i className={`${badge.icon} text-${badge.color} text-xl`}></i>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-50">{badge.name}</h3>
                  <p className={`text-sm text-${badge.color}`}>{badge.requirement}</p>
                </div>
              </div>
              <p className="text-dark-200 text-sm mb-4">{badge.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-dark-300 text-sm">{badge.earnedCount} earned</span>
                <Badge className={`${getRarityColor(badge.rarity)} border-0`}>
                  {badge.rarity}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
