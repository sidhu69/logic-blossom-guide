import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";

export default function CreateSpacePage({ onWaitingForPartner }: { onWaitingForPartner?: () => void }) {
  const [copied, setCopied] = useState(false);
  const spaceCode = "cowif89f92ofj28";

  const handleCopy = () => {
    navigator.clipboard.writeText(spaceCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    console.log("Code copied:", spaceCode);
  };

  const handleContinue = () => {
    console.log("Waiting for partner with code:", spaceCode);
    onWaitingForPartner?.();
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center space-y-2">
          <CardTitle className="text-2xl font-display">Your Space Code</CardTitle>
          <CardDescription>Share this code with your partner to connect</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="bg-muted rounded-xl p-6 text-center">
            <div className="font-mono text-2xl font-bold mb-4 tracking-wider" data-testid="text-space-code">
              {spaceCode}
            </div>
            <Button
              variant="outline"
              className="w-full"
              onClick={handleCopy}
              data-testid="button-copy-code"
            >
              {copied ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Copied!
                </>
              ) : (
                <>
                  <Copy className="h-4 w-4 mr-2" />
                  Copy Code
                </>
              )}
            </Button>
          </div>
          <Button 
            className="w-full rounded-full" 
            onClick={handleContinue}
            data-testid="button-continue"
          >
            Continue to Chat
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
