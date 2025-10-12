import CreateSpacePage from "../../pages/CreateSpacePage";

export default function CreateSpacePageExample() {
  return <CreateSpacePage onWaitingForPartner={() => console.log("Waiting for partner")} />;
}
