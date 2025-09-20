import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function MentorDirectory() {
  const { data: mentors, isLoading } = useQuery({
    queryKey: ["/api/mentors"],
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
                <Skeleton className="h-48 w-full" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const getBadgeColors = (expertise: string[]) => {
    const colorMap: Record<string, string> = {
      "Smart Contracts": "soroban-500",
      "DeFi Development": "soroban-500",
      "Soroban": "soroban-500",
      "Community Building": "green-500",
      "Documentation": "blue-500",
      "Getting Started": "blue-500",
      "DeFi Protocols": "purple-500",
      "Tokenomics": "purple-500",
      "Cross-border Payments": "purple-500",
      "Rust Programming": "orange-500",
      "Contract Security": "red-500",
      "Testing": "yellow-500",
      "Mobile Development": "indigo-500",
      "Wallet Integration": "indigo-500",
      "UX Design": "pink-500",
      "Data Analytics": "teal-500",
      "Horizon API": "teal-500",
      "Monitoring": "teal-500"
    };
    return expertise.map(exp => colorMap[exp] || "gray-500");
  };

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark-50 mb-2">Mentor Directory</h2>
        <p className="text-dark-200">Connect with experienced Stellar contributors who are here to help</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mentors?.map((mentor: any) => (
          <Card key={mentor.id} className="bg-dark-700 border-dark-600 hover:border-stellar-500 transition-colors">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4 mb-4">
                <div className="w-16 h-16 bg-stellar-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                  {mentor.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-dark-50">{mentor.username}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge className="bg-orange-500/20 text-orange-400 border-0 text-xs">
                      Mentor
                    </Badge>
                    {mentor.mentorExpertise?.includes("Soroban") && (
                      <Badge className="bg-soroban-500/20 text-soroban-400 border-0 text-xs">
                        Soroban Expert
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mb-4">
                <p className="text-dark-200 text-sm mb-3">Expertise Areas:</p>
                <div className="flex flex-wrap gap-2">
                  {mentor.mentorExpertise?.map((expertise: string, index: number) => (
                    <Badge 
                      key={index} 
                      variant="secondary" 
                      className="bg-dark-600 text-dark-200 border-0 text-xs"
                    >
                      {expertise}
                    </Badge>
                  ))}
                </div>
              </div>

              <p className="text-dark-200 text-sm mb-4">
                {mentor.bio || "Experienced Stellar developer ready to help with your questions and projects."}
              </p>

              <div className="flex items-center justify-between">
                <div className="text-sm text-dark-300">
                  <span>Response time: {mentor.mentorResponseTime || "~4 hours"}</span>
                </div>
                <Button 
                  size="sm"
                  className="bg-stellar-500 hover:bg-stellar-600 text-white"
                >
                  Connect
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
