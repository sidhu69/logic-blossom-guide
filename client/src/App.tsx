import { useState } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/components/ThemeProvider";

import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import OnboardingPage from "@/pages/OnboardingPage";
import SpaceSelectionPage from "@/pages/SpaceSelectionPage";
import CreateSpacePage from "@/pages/CreateSpacePage";
import JoinSpacePage from "@/pages/JoinSpacePage";
import ChatPage from "@/pages/ChatPage";
import RankingPage from "@/pages/RankingPage";
import AdminLoginPage from "@/pages/AdminLoginPage";
import AdminDashboard from "@/pages/AdminDashboard";
import TicTacToe from "@/components/TicTacToe";
import Bingo from "@/components/Bingo";
import TruthOrDare from "@/components/TruthOrDare";
import PrizeClaimModal from "@/components/PrizeClaimModal";

type View = 
  | "login" 
  | "signup" 
  | "onboarding" 
  | "spaceSelection" 
  | "createSpace" 
  | "joinSpace" 
  | "chat" 
  | "ranking"
  | "adminLogin"
  | "adminDashboard";

type GameView = "tictactoe" | "bingo" | "truthordare" | null;

function App() {
  const [currentView, setCurrentView] = useState<View>("login");
  const [showGame, setShowGame] = useState<GameView>(null);
  const [showPrizeClaim, setShowPrizeClaim] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleLogin = () => {
    setCurrentView("onboarding");
  };

  const handleSignup = () => {
    setCurrentView("onboarding");
  };

  const handleOnboardingComplete = () => {
    setCurrentView("spaceSelection");
  };

  const handleCreateSpace = () => {
    setCurrentView("createSpace");
  };

  const handleJoinSpace = () => {
    setCurrentView("joinSpace");
  };

  const handleSpaceCreated = () => {
    setCurrentView("chat");
  };

  const handleSpaceJoined = () => {
    setCurrentView("chat");
  };

  const handleAdminLogin = () => {
    setIsAdmin(true);
    setCurrentView("adminDashboard");
  };

  const handleAdminLogout = () => {
    setIsAdmin(false);
    setCurrentView("adminLogin");
  };

  const renderView = () => {
    if (isAdmin) {
      if (currentView === "adminLogin") {
        return <AdminLoginPage onLogin={handleAdminLogin} />;
      }
      return <AdminDashboard onLogout={handleAdminLogout} />;
    }

    switch (currentView) {
      case "login":
        return (
          <LoginPage 
            onLogin={handleLogin} 
            onSwitchToSignup={() => setCurrentView("signup")} 
          />
        );
      case "signup":
        return (
          <SignupPage 
            onSignup={handleSignup} 
            onSwitchToLogin={() => setCurrentView("login")} 
          />
        );
      case "onboarding":
        return <OnboardingPage onComplete={handleOnboardingComplete} />;
      case "spaceSelection":
        return (
          <SpaceSelectionPage 
            onCreateSpace={handleCreateSpace} 
            onJoinSpace={handleJoinSpace} 
          />
        );
      case "createSpace":
        return <CreateSpacePage onWaitingForPartner={handleSpaceCreated} />;
      case "joinSpace":
        return <JoinSpacePage onJoin={handleSpaceJoined} />;
      case "chat":
        return (
          <ChatPage 
            isWinner={true}
            onShowRanking={() => setCurrentView("ranking")}
            onShowPrizeClaim={() => setShowPrizeClaim(true)}
            onShowGames={() => setShowGame("tictactoe")}
            onShowMusic={() => console.log("Show music player")}
            onShowVideo={() => console.log("Show video player")}
          />
        );
      case "ranking":
        return (
          <RankingPage 
            onClose={() => setCurrentView("chat")} 
            prizeAmount={1000} 
          />
        );
      case "adminLogin":
        return <AdminLoginPage onLogin={handleAdminLogin} />;
      default:
        return <LoginPage onLogin={handleLogin} onSwitchToSignup={() => setCurrentView("signup")} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          {renderView()}
          
          {showGame === "tictactoe" && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <TicTacToe onClose={() => setShowGame(null)} />
            </div>
          )}
          
          {showGame === "bingo" && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <Bingo onClose={() => setShowGame(null)} />
            </div>
          )}
          
          {showGame === "truthordare" && (
            <div className="fixed inset-0 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
              <TruthOrDare onClose={() => setShowGame(null)} />
            </div>
          )}
          
          {showPrizeClaim && (
            <PrizeClaimModal 
              onClose={() => setShowPrizeClaim(false)} 
              prizeAmount={1000} 
            />
          )}
          
          <Toaster />
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
