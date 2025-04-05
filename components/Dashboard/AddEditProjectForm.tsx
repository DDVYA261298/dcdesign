"use client";

import { useState, useEffect } from "react";

interface Project {
  id?: string;
  title: string;
  client: string;
  status: string;
  description: string;
  image: string; // For simplicity, using one image
}

export default function AddProjectPage() {
  const [newProject, setNewProject] = useState<Project>({
    title: "",
    client: "",
    status: "",
    description: "",
    image: "",
  });

  const [message, setMessage] = useState<string>("");

  const handleProjectChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewProject((prev) => ({ ...prev, [name]: value }));
  };

  const handleStatusChange = (value: string) => {
    setNewProject((prev) => ({ ...prev, status: value }));
  };

  const handleAddOrEditProject = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      ...newProject,
      images: [newProject.image], // Backend expects images as array
    };

    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setMessage("✅ Project added successfully!");
        setNewProject({
          title: "",
          client: "",
          status: "",
          description: "",
          image: "",
        });
      } else {
        const errorData = await res.json();
        setMessage(`❌ Error: ${errorData.message || "Something went wrong"}`);
      }
    } catch (error) {
      setMessage("❌ Network Error");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Add New Project</h1>

      {message && (
        <div
          className={`mb-4 p-3 rounded-md ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-800"
              : "bg-red-100 text-red-800"
          }`}
        >
          {message}
        </div>
      )}

      <form
        onSubmit={handleAddOrEditProject}
        className="space-y-4 bg-white shadow-md rounded-lg p-6 dark:bg-gray-800"
      >
        <input
          id="title"
          name="title"
          value={newProject.title}
          onChange={handleProjectChange}
          placeholder="Project Title"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        />

        <input
          id="client"
          name="client"
          value={newProject.client}
          onChange={handleProjectChange}
          placeholder="Client Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        />

        <textarea
          id="description"
          name="description"
          value={newProject.description}
          onChange={handleProjectChange}
          placeholder="Project Description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        />

        <input
          id="image"
          name="image"
          value={newProject.image}
          onChange={handleProjectChange}
          placeholder="Image URL"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        />

        <select
          name="status"
          value={newProject.status}
          onChange={(e) => handleStatusChange(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
          required
        >
          <option value="">Select Status</option>
          <option value="completed">Completed</option>
          <option value="in-progress">In Progress</option>
        </select>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition dark:bg-blue-700 dark:hover:bg-blue-800"
        >
          {newProject.id ? "Update Project" : "Add Project"}
        </button>
      </form>
    </div>
  );
}
