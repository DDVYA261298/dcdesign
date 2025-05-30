import { Metadata } from "next";
import Link from "next/link";
import EmployeesTable from "@/components/admin/EmployeesTable";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const metadata: Metadata = {
  title: "Manage Team | Admin",
  description: "Manage team members",
};

export default function AdminEmployees() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        {/* <h1 className="text-3xl font-bold text-gray-900">Team Members</h1> */}
        {/* <Link href="/admin/employees/new">
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            <span>Add Team Member</span>
          </Button>
        </Link> */}
      </div>
      
      <EmployeesTable />
    </div>
  );
}