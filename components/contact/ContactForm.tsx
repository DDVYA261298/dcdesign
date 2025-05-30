"use client";

import React, { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted:", formData);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        alert("Message sent successfully!");
        setFormData({ name: "", email: "", message: "" }); // ✅ Reset the form
      } else {
        alert("Failed to send message.");
      }
    } catch (error) {
      console.error("Error submitting contact:", error);
      alert("Something went wrong.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto space-y-6 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Get in Touch</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        className="w-full border border-gray-300 p-3 rounded"
        onChange={handleChange}
        value={formData.name} // ✅ controlled input
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        className="w-full border border-gray-300 p-3 rounded"
        onChange={handleChange}
        value={formData.email} // ✅ controlled input
        required
      />

      <textarea
        name="message"
        placeholder="Your Message"
        className="w-full border border-gray-300 p-3 rounded h-32"
        onChange={handleChange}
        value={formData.message} // ✅ controlled input
        required
      />

      <button
        type="submit"
        className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-700 transition"
      >
        Send Message
      </button>
    </form>
  );
};

export default ContactForm;
