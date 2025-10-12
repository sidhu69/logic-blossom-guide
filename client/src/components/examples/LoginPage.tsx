import LoginPage from "../../pages/LoginPage";

export default function LoginPageExample() {
  return <LoginPage onLogin={() => console.log("Login successful")} onSwitchToSignup={() => console.log("Switch to signup")} />;
}
