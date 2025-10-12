import AdminDashboard from "../../pages/AdminDashboard";

export default function AdminDashboardExample() {
  return <AdminDashboard onLogout={() => console.log("Admin logged out")} />;
}
