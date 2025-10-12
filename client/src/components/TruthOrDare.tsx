import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const truths = [
  "What's your biggest secret?",
  "Who was your first crush?",
  "What's the most embarrassing thing you've done?",
  "What's something you've never told me?",
  "What's your biggest fear?",
];

const dares = [
  "Send a funny selfie",
  "Share your most embarrassing photo",
  "Do 10 pushups on video call",
  "Sing your favorite song",
  "Tell me your funniest joke",
];

export default function TruthOrDare({ onClose }: { onClose?: () => void }) {
  const [currentQuestion, setCurrentQuestion] = useState<string>("");
  const [type, setType] = useState<"truth" | "dare" | null>(null);

  const handleTruth = () => {
    const random = truths[Math.floor(Math.random() * truths.length)];
    setCurrentQuestion(random);
    setType("truth");
    console.log("Truth selected:", random);
  };

  const handleDare = () => {
    const random = dares[Math.floor(Math.random() * dares.length)];
    setCurrentQuestion(random);
    setType("dare");
    console.log("Dare selected:", random);
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center font-display">Truth or Dare</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {currentQuestion ? (
          <div className="bg-primary/10 rounded-xl p-6 min-h-[120px] flex items-center justify-center">
            <p className="text-center text-lg font-medium" data-testid="text-question">
              {currentQuestion}
            </p>
          </div>
        ) : (
          <div className="bg-muted rounded-xl p-6 min-h-[120px] flex items-center justify-center">
            <p className="text-center text-muted-foreground">
              Choose Truth or Dare to get started
            </p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          <Button 
            onClick={handleTruth} 
            variant="outline" 
            className="h-16"
            data-testid="button-truth"
          >
            Truth
          </Button>
          <Button 
            onClick={handleDare} 
            className="h-16"
            data-testid="button-dare"
          >
            Dare
          </Button>
        </div>

        <Button onClick={onClose} variant="ghost" className="w-full" data-testid="button-close">
          Close
        </Button>
      </CardContent>
    </Card>
  );
}
