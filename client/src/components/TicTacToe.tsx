import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { X as XIcon, Circle } from "lucide-react";

type Player = "X" | "O" | null;

export default function TicTacToe({ onClose }: { onClose?: () => void }) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");

  const handleClick = (index: number) => {
    if (board[index] || checkWinner()) return;

    const newBoard = [...board];
    newBoard[index] = currentPlayer;
    setBoard(newBoard);
    setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
    console.log(`Player ${currentPlayer} marked position ${index}`);
  };

  const checkWinner = () => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8],
      [0, 3, 6], [1, 4, 7], [2, 5, 8],
      [0, 4, 8], [2, 4, 6]
    ];

    for (const [a, b, c] of lines) {
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {
        return board[a];
      }
    }
    return null;
  };

  const winner = checkWinner();
  const isDraw = !winner && board.every(cell => cell !== null);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setCurrentPlayer("X");
    console.log("Game reset");
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center font-display">Tic Tac Toe</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-2">
          {board.map((cell, index) => (
            <button
              key={index}
              onClick={() => handleClick(index)}
              className="aspect-square bg-muted rounded-lg flex items-center justify-center hover-elevate active-elevate-2 transition-all"
              data-testid={`cell-${index}`}
            >
              {cell === "X" && <XIcon className="h-12 w-12 text-primary" />}
              {cell === "O" && <Circle className="h-12 w-12 text-chart-2" />}
            </button>
          ))}
        </div>

        <div className="text-center space-y-2">
          {winner && (
            <p className="text-lg font-semibold" data-testid="text-winner">
              Player {winner} wins!
            </p>
          )}
          {isDraw && (
            <p className="text-lg font-semibold" data-testid="text-draw">
              It's a draw!
            </p>
          )}
          {!winner && !isDraw && (
            <p className="text-muted-foreground" data-testid="text-current-player">
              Current Player: {currentPlayer}
            </p>
          )}
        </div>

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
