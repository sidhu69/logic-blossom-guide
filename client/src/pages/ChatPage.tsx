import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { 
  Send, 
  Image as ImageIcon, 
  Camera, 
  Gamepad2, 
  Music, 
  Video,
  Trophy,
  BarChart3
} from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

type Message = {
  id: string;
  text: string;
  sender: "me" | "partner";
  timestamp: Date;
};

export default function ChatPage({ 
  isWinner, 
  onShowRanking, 
  onShowPrizeClaim,
  onShowGames,
  onShowMusic,
  onShowVideo
}: { 
  isWinner?: boolean;
  onShowRanking?: () => void;
  onShowPrizeClaim?: () => void;
  onShowGames?: () => void;
  onShowMusic?: () => void;
  onShowVideo?: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Hey! 💕", sender: "partner", timestamp: new Date() },
    { id: "2", text: "Hi babe! How are you?", sender: "me", timestamp: new Date() },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    
    const message: Message = {
      id: Date.now().toString(),
      text: newMessage,
      sender: "me",
      timestamp: new Date(),
    };
    setMessages([...messages, message]);
    setNewMessage("");
    console.log("Message sent:", message);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <header className="flex items-center justify-between p-4 border-b">
        <div className="flex items-center gap-3">
          <div className="flex items-center -space-x-2">
            <Avatar className="h-9 w-9 border-2 border-background">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary/10 text-primary">J</AvatarFallback>
            </Avatar>
            <Avatar className="h-9 w-9 border-2 border-background">
              <AvatarImage src="" />
              <AvatarFallback className="bg-chart-2/10 text-chart-2">S</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <h2 className="font-semibold" data-testid="text-couple-name">Waiting for partner to join...</h2>
            <p className="text-xs text-muted-foreground">Online</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isWinner && (
            <Button 
              size="icon" 
              variant="ghost"
              onClick={onShowPrizeClaim}
              data-testid="button-trophy"
            >
              <Trophy className="h-5 w-5 text-chart-4" />
            </Button>
          )}
          <Button 
            size="icon" 
            variant="ghost"
            onClick={onShowRanking}
            data-testid="button-ranking"
          >
            <BarChart3 className="h-5 w-5" />
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[75%] rounded-3xl px-4 py-2 ${
                message.sender === "me"
                  ? "bg-primary text-primary-foreground rounded-br-md"
                  : "bg-card text-card-foreground rounded-bl-md"
              }`}
              data-testid={`message-${message.id}`}
            >
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t bg-card">
        <div className="p-2 flex gap-2 overflow-x-auto">
          <Button 
            size="icon" 
            variant="ghost" 
            className="shrink-0"
            data-testid="button-photo"
          >
            <ImageIcon className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="shrink-0"
            data-testid="button-camera"
          >
            <Camera className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="shrink-0"
            onClick={onShowGames}
            data-testid="button-games"
          >
            <Gamepad2 className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="shrink-0"
            onClick={onShowMusic}
            data-testid="button-music"
          >
            <Music className="h-5 w-5" />
          </Button>
          <Button 
            size="icon" 
            variant="ghost" 
            className="shrink-0"
            onClick={onShowVideo}
            data-testid="button-video"
          >
            <Video className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="p-4 flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
            data-testid="input-message"
          />
          <Button 
            size="icon"
            onClick={handleSend}
            data-testid="button-send"
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
