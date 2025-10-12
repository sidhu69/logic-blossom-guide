import { useState, useEffect } from "react";
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
import { useAuth } from "@/hooks/useAuth";
import { useSpace } from "@/hooks/useSpace";
import { useRealtimeMessages } from "@/hooks/useRealtimeMessages";

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
  const { user } = useAuth();
  const { space } = useSpace(user?.id ?? null);
  const { messages, loading, sendMessage } = useRealtimeMessages(space?.id ?? null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    // Scroll to bottom on new messages
    const messagesContainer = document.getElementById('messages-container');
    if (messagesContainer) {
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || !user || !space) return;
    
    await sendMessage(newMessage, user.id);
    setNewMessage("");
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
            <h2 className="font-semibold" data-testid="text-couple-name">
              {space?.name || "Loading..."}
            </h2>
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

      <div id="messages-container" className="flex-1 overflow-y-auto p-4 space-y-4">
        {loading ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">Loading messages...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No messages yet. Say hi! 👋</p>
          </div>
        ) : (
          messages.map((message) => {
            const isMe = message.sender_id === user?.id;
            return (
              <div
                key={message.id}
                className={`flex ${isMe ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-3xl px-4 py-2 ${
                    isMe
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-card-foreground rounded-bl-md"
                  }`}
                  data-testid={`message-${message.id}`}
                >
                  {message.content}
                </div>
              </div>
            );
          })
        )}
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
