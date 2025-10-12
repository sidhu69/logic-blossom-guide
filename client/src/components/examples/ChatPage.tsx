import ChatPage from "../../pages/ChatPage";

export default function ChatPageExample() {
  return (
    <ChatPage 
      isWinner={true}
      onShowRanking={() => console.log("Show ranking")}
      onShowPrizeClaim={() => console.log("Show prize claim")}
      onShowGames={() => console.log("Show games")}
      onShowMusic={() => console.log("Show music")}
      onShowVideo={() => console.log("Show video")}
    />
  );
}
