import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function GlobalMap() {
  const [viewMode, setViewMode] = useState<'heatmap' | 'pins'>('heatmap');

  const regionData = [
    { name: "North America", flag: "🇺🇸", contributors: 3847, color: "stellar-500", position: "col-span-2" },
    { name: "Europe", flag: "🇪🇺", contributors: 4234, color: "soroban-500", position: "col-span-2" },
    { name: "Asia Pacific", flag: "🌏", contributors: 2987, color: "green-500", position: "col-span-2" },
    { name: "South America", flag: "🇧🇷", contributors: 1456, color: "yellow-500", position: "col-span-2" },
    { name: "Africa", flag: "🌍", contributors: 892, color: "orange-500", position: "col-span-2" },
    { name: "Oceania", flag: "🇦🇺", contributors: 324, color: "blue-500", position: "col-span-2" }
  ];

  const topCountries = [
    { flag: "🇺🇸", name: "United States", contributors: 1847, color: "stellar-400" },
    { flag: "🇩🇪", name: "Germany", contributors: 1234, color: "soroban-400" },
    { flag: "🇮🇳", name: "India", contributors: 987, color: "green-400" }
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-dark-50 mb-2">Global Contributions</h2>
        <p className="text-dark-200">Stellar contributors from around the world</p>
      </div>

      <Card className="bg-dark-700 border-dark-600">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-dark-50">Geographic Distribution</CardTitle>
            <div className="flex items-center space-x-4">
              <Button
                variant={viewMode === 'heatmap' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('heatmap')}
                className={viewMode === 'heatmap' ? 'bg-stellar-500 hover:bg-stellar-600' : ''}
              >
                <i className="fas fa-fire mr-2"></i>Heatmap
              </Button>
              <Button
                variant={viewMode === 'pins' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('pins')}
                className={viewMode === 'pins' ? 'bg-stellar-500 hover:bg-stellar-600' : ''}
              >
                <i className="fas fa-map-pin mr-2"></i>Pins
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* World map placeholder with contributor data */}
          <div className="bg-dark-600 rounded-lg h-96 flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 stellar-gradient opacity-10"></div>
            
            {/* Mock world regions with contributor counts */}
            <div className="relative z-10 grid grid-cols-6 gap-4 w-full h-full p-8">
              {regionData.map((region, index) => (
                <div key={region.name} className={`${region.position} flex flex-col justify-center space-y-2`}>
                  <div className={`bg-${region.color}/30 rounded-lg p-3 text-center hover:bg-${region.color}/40 transition-colors cursor-pointer`}>
                    <div className="text-2xl mb-2">{region.flag}</div>
                    <p className="text-dark-50 font-semibold text-sm">{region.name}</p>
                    <p className={`text-${region.color} text-xs`}>{region.contributors.toLocaleString()} contributors</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Top Countries Stats */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            {topCountries.map((country, index) => (
              <div key={country.name} className="bg-dark-600/50 rounded-lg p-4 hover:bg-dark-600/70 transition-colors cursor-pointer">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{country.flag}</span>
                  <div>
                    <p className="text-dark-50 font-medium">{country.name}</p>
                    <p className={`text-${country.color} text-sm`}>{country.contributors.toLocaleString()} contributors</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
