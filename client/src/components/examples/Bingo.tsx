import Bingo from "../Bingo";

export default function BingoExample() {
  return <Bingo onClose={() => console.log("Close game")} />;
}
