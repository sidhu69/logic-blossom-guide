import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/hooks/useAuth";
import { useSpace } from "@/hooks/useSpace";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";

export default function JoinSpacePage({ onJoin }: { onJoin?: () => void }) {
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();
  const { joinSpace, space } = useSpace(user?.id ?? null);
  const { toast } = useToast();

  useEffect(() => {
    if (space) {
      onJoin?.();
    }
  }, [space, onJoin]);

  const handleJoin = async () => {
    if (!code || !user) return;

    setLoading(true);
    const { error } = await joinSpace(code.toUpperCase(), user.id);
    setLoading(false);

    if (error) {
      toast({
        title: "Failed to join space",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-display">Join Your Partner</CardTitle>
          <CardDescription>Enter the code your partner shared with you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="code">Space Code</Label>
            <Input
              id="code"
              type="text"
              placeholder="Enter code here"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="font-mono text-center text-lg tracking-wider"
              data-testid="input-space-code"
            />
          </div>
          <Button 
            className="w-full rounded-full" 
            onClick={handleJoin}
            disabled={!code || loading}
            data-testid="button-join"
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Joining...
              </>
            ) : (
              "Join Space"
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
