import TruthOrDare from "../TruthOrDare";

export default function TruthOrDareExample() {
  return <TruthOrDare onClose={() => console.log("Close game")} />;
}
