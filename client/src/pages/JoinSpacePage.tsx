import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function JoinSpacePage({ onJoin }: { onJoin?: () => void }) {
  const [code, setCode] = useState("");

  const handleJoin = () => {
    console.log("Joining space with code:", code);
    onJoin?.();
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
            disabled={!code}
            data-testid="button-join"
          >
            Join Space
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
