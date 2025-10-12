import SpaceSelectionPage from "../../pages/SpaceSelectionPage";

export default function SpaceSelectionPageExample() {
  return (
    <SpaceSelectionPage 
      onCreateSpace={() => console.log("Create space clicked")} 
      onJoinSpace={() => console.log("Join space clicked")} 
    />
  );
}
