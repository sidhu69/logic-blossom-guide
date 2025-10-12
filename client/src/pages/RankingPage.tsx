import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, X } from "lucide-react";

type Couple = {
  id: string;
  name1: string;
  name2: string;
  avatar1: string;
  avatar2: string;
  points: number;
  rank: number;
};

export default function RankingPage({ onClose, prizeAmount }: { onClose?: () => void; prizeAmount?: number }) {
  const [activeTab, setActiveTab] = useState("daily");

  const mockCouples: Couple[] = Array.from({ length: 50 }, (_, i) => ({
    id: `${i + 1}`,
    name1: `User ${i * 2 + 1}`,
    name2: `User ${i * 2 + 2}`,
    avatar1: "",
    avatar2: "",
    points: 1000 - i * 15,
    rank: i + 1,
  }));

  const getRankColor = (rank: number) => {
    if (rank === 1) return "text-chart-4";
    if (rank === 2) return "text-[hsl(0_0%_70%)]";
    if (rank === 3) return "text-[hsl(30_75%_50%)]";
    return "";
  };

  const getRankBadge = (rank: number) => {
    if (rank === 1) return <Trophy className="h-4 w-4 text-chart-4 fill-chart-4" />;
    if (rank === 2) return <Trophy className="h-4 w-4 text-[hsl(0_0%_70%)] fill-[hsl(0_0%_70%)]" />;
    if (rank === 3) return <Trophy className="h-4 w-4 text-[hsl(30_75%_50%)] fill-[hsl(30_75%_50%)]" />;
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-10 bg-background border-b p-4 flex items-center justify-between">
        <h1 className="text-xl font-display font-bold">Leaderboard</h1>
        <Button size="icon" variant="ghost" onClick={onClose} data-testid="button-close">
          <X className="h-5 w-5" />
        </Button>
      </header>

      {prizeAmount && (
        <div className="bg-primary/10 border-b p-4">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">Daily Prize</p>
            <p className="text-2xl font-display font-bold text-primary" data-testid="text-prize-amount">
              ${prizeAmount}
            </p>
            <p className="text-xs text-muted-foreground mt-1">Resets at 12:00 AM</p>
          </div>
        </div>
      )}

      <Tabs value={activeTab} onValueChange={setActiveTab} className="p-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="daily" data-testid="tab-daily">Daily</TabsTrigger>
          <TabsTrigger value="weekly" data-testid="tab-weekly">Weekly</TabsTrigger>
          <TabsTrigger value="monthly" data-testid="tab-monthly">Monthly</TabsTrigger>
          <TabsTrigger value="annually" data-testid="tab-annually">Annually</TabsTrigger>
        </TabsList>

        <TabsContent value={activeTab} className="mt-4 space-y-3">
          {mockCouples.map((couple) => (
            <Card key={couple.id} className={couple.rank <= 3 ? "border-primary/50" : ""}>
              <CardContent className="p-4 flex items-center gap-4">
                <div className={`text-2xl font-display font-bold w-8 text-center ${getRankColor(couple.rank)}`}>
                  {couple.rank}
                </div>

                <div className="flex items-center -space-x-2">
                  <Avatar className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={couple.avatar1} />
                    <AvatarFallback className="bg-primary/10 text-primary text-sm">
                      {couple.name1[0]}
                    </AvatarFallback>
                  </Avatar>
                  <Avatar className="h-10 w-10 border-2 border-background">
                    <AvatarImage src={couple.avatar2} />
                    <AvatarFallback className="bg-chart-2/10 text-chart-2 text-sm">
                      {couple.name2[0]}
                    </AvatarFallback>
                  </Avatar>
                </div>

                <div className="flex-1">
                  <p className="font-semibold text-sm" data-testid={`couple-name-${couple.id}`}>
                    {couple.name1} & {couple.name2}
                  </p>
                  <p className="text-xs text-muted-foreground" data-testid={`couple-points-${couple.id}`}>
                    {couple.points} points
                  </p>
                </div>

                {getRankBadge(couple.rank)}
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
