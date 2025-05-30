import { Metadata } from "next";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import DashboardStats from "@/components/admin/DashboardStats";
import RecentProjects from "@/components/admin/RecentProjects";
import ClientEnquiries from "@/components/admin/ClientEnquiries";

export const metadata: Metadata = {
  title: "Dashboard | Admin",
  description: "Interior Design Portfolio Admin Dashboard",
};

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect("/admin/login");
  }
  
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
      <p className="text-gray-500">
        Welcome back, {session.user.name}
      </p>
       <div className="space-y-6">
      <ClientEnquiries /> 
   
      <DashboardStats />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentProjects />
      </div>
     </div>
    </div>
  );
}