import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Instagram } from "lucide-react";

export default function PrizeClaimModal({ onClose, prizeAmount }: { onClose?: () => void; prizeAmount?: number }) {
  const handleFollowInstagram = () => {
    console.log("Follow Instagram clicked");
    window.open("https://instagram.com/myusername", "_blank");
  };

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="bg-chart-4/10 p-4 rounded-full">
              <Trophy className="h-12 w-12 text-chart-4 fill-chart-4" />
            </div>
          </div>
          <CardTitle className="text-2xl font-display">Congratulations! 🎉</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center space-y-2">
            <p className="text-lg">You won the prize!</p>
            <p className="text-3xl font-display font-bold text-primary" data-testid="text-prize-amount">
              ${prizeAmount || 100}
            </p>
          </div>

          <div className="bg-muted rounded-xl p-4 space-y-3">
            <p className="text-sm font-medium text-center">How to claim your prize:</p>
            <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
              <li>Follow us on Instagram @myusername</li>
              <li>Send us a DM with your winning proof</li>
              <li>We'll send your prize within 24 hours!</li>
            </ol>
          </div>

          <div className="space-y-2">
            <Button 
              className="w-full gap-2" 
              onClick={handleFollowInstagram}
              data-testid="button-follow-instagram"
            >
              <Instagram className="h-5 w-5" />
              Follow on Instagram
            </Button>
            <Button 
              variant="outline" 
              className="w-full" 
              onClick={onClose}
              data-testid="button-close"
            >
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
