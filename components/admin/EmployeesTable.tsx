"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, Plus } from "lucide-react";
import AddEditEmployeeModal from "./AddEditEmployeeModal";
import Image from "next/image";

interface Employee {
  _id: string;
  name: string;
  department: string;
  role: string;        // ✅ Add this line
  bio: string;
  image?: string;
}


export default function EmployeesTable() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [mode, setMode] = useState<"create" | "edit">("create");

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    const res = await fetch("/api/employees");
    const data = await res.json();
    setEmployees(data);
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;
    const res = await fetch(`/api/employees/${id}`, { method: "DELETE" });
    if (res.ok) fetchEmployees();
  };

  const openCreateModal = () => {
    setMode("create");
    setSelectedEmployee(null);
    setIsModalOpen(true);
  };

  const openEditModal = (employee: Employee) => {
    setMode("edit");
    setSelectedEmployee(employee);
    setIsModalOpen(true);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employees</h2>
        <Button onClick={openCreateModal} className="flex items-center gap-2">
          <Plus className="w-4 h-4" /> Add Employee
        </Button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Photo</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">role</th>
                <th className="px-4 py-2 text-left">Department</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((employee) => (
                <tr key={employee._id} className="border-t">
                  <td className="px-4 py-2">
                    {employee.image ? (
                      <Image
                        src={employee.image}
                        alt={employee.name}
                        width={40}
                        height={40}
                        className="rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="px-4 py-2">{employee.name}</td>
                  <td className="px-4 py-2">{employee.role}</td>
                  <td className="px-4 py-2">{employee.department}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <Button size="sm" variant="outline" onClick={() => openEditModal(employee)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleDelete(employee._id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <AddEditEmployeeModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        initialData={selectedEmployee}
        onSuccess={fetchEmployees}
      />
    </div>
  );
}
