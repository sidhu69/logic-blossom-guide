import RankingPage from "../../pages/RankingPage";

export default function RankingPageExample() {
  return <RankingPage onClose={() => console.log("Close ranking")} prizeAmount={1000} />;
}
