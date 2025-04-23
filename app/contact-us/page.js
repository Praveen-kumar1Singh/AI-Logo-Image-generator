"use client";

import { useState } from "react";

export default function ContactUsPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await res.json();

      if (res.status === 200) {
        setStatus("✅ Message sent successfully!");
        setName("");
        setEmail("");
        setMessage("");
      } else if (res.status === 404) {
        setStatus("⚠️ User not found. Please register first.");
      } else {
        setStatus(data.message || "❌ Error sending message.");
      }
    } catch (error) {
      console.error("Submit error:", error);
      setStatus("❌ Something went wrong. Please try again.");
    }

    setLoading(false);
  };

  return (
    <main className="p-8 max-w-4xl mx-auto text-gray-800 dark:text-gray-200">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex flex-col space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Your Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Your Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-col space-y-2">
          <label htmlFor="message" className="text-sm font-medium">
            Your Message
          </label>
          <textarea
            id="message"
            name="message"
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows="5"
            className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {status && (
          <div
            className={`text-sm font-medium ${
              status.includes("Error") || status.includes("❌") || status.includes("⚠️")
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            {status}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          {loading ? "Sending..." : "Send Message"}
        </button>
      </form>
    </main>
  );
}
