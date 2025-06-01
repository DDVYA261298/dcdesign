import { Metadata } from "next";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/auth";
import AdminSidebar from "@/components/admin/AdminSidebar";
import { headers } from "next/headers"; // ✅ Correct import

export const metadata: Metadata = {
  title: "Admin Dashboard | Interior Design Portfolio",
  description: "Manage your portfolio content",
};

export const dynamic = "force-dynamic"; // ✅ Makes `headers()` async-safe

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  const headerList = await headers(); // ✅ await is now required
  const pathname = headerList.get("x-pathname") || "";

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
