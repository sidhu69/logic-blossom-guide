import PrizeClaimModal from "../PrizeClaimModal";

export default function PrizeClaimModalExample() {
  return <PrizeClaimModal onClose={() => console.log("Close modal")} prizeAmount={1000} />;
}
