import TicTacToe from "../TicTacToe";

export default function TicTacToeExample() {
  return <TicTacToe onClose={() => console.log("Close game")} />;
}
