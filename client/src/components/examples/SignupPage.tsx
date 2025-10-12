import SignupPage from "../../pages/SignupPage";

export default function SignupPageExample() {
  return <SignupPage onSignup={() => console.log("Signup successful")} onSwitchToLogin={() => console.log("Switch to login")} />;
}
