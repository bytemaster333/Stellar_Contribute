import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardTable() {
  const [searchTerm, setSearchTerm] = useState("");
  const [timeFilter, setTimeFilter] = useState("all-time");

  const { data: contributors, isLoading } = useQuery({
    queryKey: ["/api/contributors"],
  });

  const { data: allBadges } = useQuery({
    queryKey: ["/api/badges"],
  });

  const filteredContributors = contributors?.filter((contributor: any) =>
    contributor.username.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getRankEmoji = (rank: number) => {
    switch (rank) {
      case 1: return "🥇";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "";
    }
  };

  const getContributorBadges = async (contributorId: number) => {
    // This would normally be fetched, but for demo we'll show some badges
    const badgeMap: Record<number, string[]> = {
      1: ["Soroban Expert", "Forum Helper"],
      2: ["Community Leader", "Mentor"],
      3: ["DeFi Expert"],
      4: ["Soroban Expert"],
    };
    return badgeMap[contributorId] || [];
  };

  if (isLoading) {
    return (
      <Card className="bg-dark-700 border-dark-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <Skeleton className="h-6 w-48" />
            <div className="flex space-x-4">
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(10)].map((_, i) => (
              <Skeleton key={i} className="h-16 w-full" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="bg-dark-700 border-dark-600">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-xl font-semibold text-dark-50">Contributor Leaderboard</CardTitle>
          <div className="flex items-center space-x-4">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-32 bg-dark-600 border-dark-500 text-dark-50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-dark-600 border-dark-500">
                <SelectItem value="all-time">All Time</SelectItem>
                <SelectItem value="this-month">This Month</SelectItem>
                <SelectItem value="this-week">This Week</SelectItem>
              </SelectContent>
            </Select>
            <Input
              placeholder="Search contributors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-64 bg-dark-600 border-dark-500 text-dark-50"
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader className="bg-dark-600">
              <TableRow className="border-dark-600 hover:bg-dark-600">
                <TableHead className="text-dark-200">Rank</TableHead>
                <TableHead className="text-dark-200">Contributor</TableHead>
                <TableHead className="text-dark-200">Wallet Address</TableHead>
                <TableHead className="text-dark-200">Total Score</TableHead>
                <TableHead className="text-dark-200">GitHub</TableHead>
                <TableHead className="text-dark-200">Forum</TableHead>
                <TableHead className="text-dark-200">On-Chain</TableHead>
                <TableHead className="text-dark-200">Badges</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContributors?.map((contributor: any, index: number) => (
                <TableRow key={contributor.id} className="border-dark-600 hover:bg-dark-600/50">
                  <TableCell>
                    <span className={`font-bold text-lg ${index < 3 ? 'text-yellow-400' : 'text-dark-200'}`}>
                      {getRankEmoji(index + 1)} {index + 1}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-stellar-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {contributor.avatar}
                      </div>
                      <div>
                        <div className="text-sm font-medium text-dark-50">{contributor.username}</div>
                        <div className="text-sm text-dark-200">{contributor.bio?.split('.')[0] || 'Developer'}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-dark-200 font-mono">{contributor.walletAddress}</span>
                  </TableCell>
                  <TableCell>
                    <span className="text-lg font-bold text-stellar-400">{contributor.totalScore.toLocaleString()}</span>
                  </TableCell>
                  <TableCell className="text-dark-50">{contributor.githubScore}</TableCell>
                  <TableCell className="text-dark-50">{contributor.forumScore}</TableCell>
                  <TableCell className="text-dark-50">{contributor.onChainScore}</TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {contributor.mentorExpertise?.slice(0, 2).map((expertise: string, i: number) => (
                        <Badge key={i} variant="secondary" className="text-xs">
                          {expertise}
                        </Badge>
                      ))}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
