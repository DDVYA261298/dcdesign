import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";


export const dynamic = "force-dynamic";


export const metadata: Metadata = {
  title: "Admin Dashboard | Interior Design Portfolio",
  description: "Manage your portfolio content",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  // ✅ Use headers() to check path
  const pathname = (typeof window === "undefined"
    ? require("next/headers").headers().get("x-pathname")
    : window.location.pathname) || "";

  // ✅ Skip redirect only for the login page
  const isLoginPage = pathname === "/admin/login";

  if (!session && !isLoginPage) {
    redirect("/admin/login");
  }
  
  return (
    <div className="flex h-screen bg-gray-100">
      <AdminSidebar />
      <div className="flex-1 overflow-auto">
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}