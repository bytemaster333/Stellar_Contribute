import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Charts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contribution Trends Chart */}
      <Card className="bg-dark-700 border-dark-600">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-dark-50">Weekly Contribution Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-stellar-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-line text-stellar-500 text-2xl"></i>
              </div>
              <p className="text-dark-200">Interactive chart visualization</p>
              <p className="text-dark-300 text-sm mt-1">Chart.js or Recharts integration</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Badge Distribution Chart */}
      <Card className="bg-dark-700 border-dark-600">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-dark-50">Badge Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-soroban-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-chart-pie text-soroban-500 text-2xl"></i>
              </div>
              <p className="text-dark-200">Donut chart visualization</p>
              <p className="text-dark-300 text-sm mt-1">Badge distribution by type</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
