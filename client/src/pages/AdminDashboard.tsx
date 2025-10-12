import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, DollarSign } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function AdminDashboard({ onLogout }: { onLogout?: () => void }) {
  const [dailyPrize, setDailyPrize] = useState("100");
  const [weeklyPrize, setWeeklyPrize] = useState("500");
  const [monthlyPrize, setMonthlyPrize] = useState("2000");
  const [annualPrize, setAnnualPrize] = useState("10000");

  const handleSave = () => {
    console.log("Prizes updated:", {
      daily: dailyPrize,
      weekly: weeklyPrize,
      monthly: monthlyPrize,
      annual: annualPrize,
    });
    alert("Prize amounts updated successfully!");
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-primary/10 p-2 rounded-full">
            <Shield className="h-5 w-5 text-primary" />
          </div>
          <h1 className="text-xl font-display font-bold">Admin Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button variant="outline" onClick={onLogout} data-testid="button-logout">
            Logout
          </Button>
        </div>
      </header>

      <div className="p-4 max-w-4xl mx-auto space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Prize Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="daily">Daily Prize ($)</Label>
                <Input
                  id="daily"
                  type="number"
                  value={dailyPrize}
                  onChange={(e) => setDailyPrize(e.target.value)}
                  data-testid="input-daily-prize"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weekly">Weekly Prize ($)</Label>
                <Input
                  id="weekly"
                  type="number"
                  value={weeklyPrize}
                  onChange={(e) => setWeeklyPrize(e.target.value)}
                  data-testid="input-weekly-prize"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="monthly">Monthly Prize ($)</Label>
                <Input
                  id="monthly"
                  type="number"
                  value={monthlyPrize}
                  onChange={(e) => setMonthlyPrize(e.target.value)}
                  data-testid="input-monthly-prize"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="annual">Annual Prize ($)</Label>
                <Input
                  id="annual"
                  type="number"
                  value={annualPrize}
                  onChange={(e) => setAnnualPrize(e.target.value)}
                  data-testid="input-annual-prize"
                />
              </div>
            </div>

            <Button 
              className="w-full rounded-full" 
              onClick={handleSave}
              data-testid="button-save-prizes"
            >
              Save Prize Amounts
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Current Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-display font-bold">1,234</p>
                <p className="text-sm text-muted-foreground">Total Couples</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-display font-bold">567</p>
                <p className="text-sm text-muted-foreground">Active Today</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-display font-bold">89</p>
                <p className="text-sm text-muted-foreground">Games Played</p>
              </div>
              <div className="text-center p-4 bg-muted rounded-lg">
                <p className="text-2xl font-display font-bold">12,345</p>
                <p className="text-sm text-muted-foreground">Messages Sent</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
