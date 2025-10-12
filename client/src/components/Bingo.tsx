import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from "lucide-react";

export default function Bingo({ onClose }: { onClose?: () => void }) {
  const [marked, setMarked] = useState<boolean[]>(Array(25).fill(false));
  const numbers = Array.from({ length: 25 }, (_, i) => i + 1);

  const handleMark = (index: number) => {
    const newMarked = [...marked];
    newMarked[index] = !newMarked[index];
    setMarked(newMarked);
    console.log(`Cell ${index} ${newMarked[index] ? 'marked' : 'unmarked'}`);
  };

  const checkBingo = () => {
    for (let i = 0; i < 5; i++) {
      if (marked.slice(i * 5, i * 5 + 5).every(m => m)) return true;
      if ([0, 1, 2, 3, 4].map(j => marked[j * 5 + i]).every(m => m)) return true;
    }
    if ([0, 6, 12, 18, 24].every(i => marked[i])) return true;
    if ([4, 8, 12, 16, 20].every(i => marked[i])) return true;
    return false;
  };

  const hasBingo = checkBingo();

  const resetGame = () => {
    setMarked(Array(25).fill(false));
    console.log("Bingo reset");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center font-display">Bingo</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-5 gap-2">
          {numbers.map((num, index) => (
            <button
              key={index}
              onClick={() => handleMark(index)}
              className={`aspect-square rounded-lg flex items-center justify-center font-semibold transition-all ${
                marked[index]
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted hover-elevate active-elevate-2"
              }`}
              data-testid={`bingo-cell-${index}`}
            >
              {marked[index] ? <Check className="h-5 w-5" /> : num}
            </button>
          ))}
        </div>

        {hasBingo && (
          <div className="text-center">
            <p className="text-2xl font-display font-bold text-primary" data-testid="text-bingo">
              BINGO! 🎉
            </p>
          </div>
        )}

        <div className="flex gap-2">
          <Button onClick={resetGame} variant="outline" className="flex-1" data-testid="button-reset">
            Reset
          </Button>
          <Button onClick={onClose} className="flex-1" data-testid="button-close">
            Close
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
