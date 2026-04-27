"use client";

import React, { useEffect, useState } from "react";

interface ContactMessage {
  id: number;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
}

export default function AdminContactPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchMessages = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/contact`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch contact messages");
      const data = await res.json();
      setMessages(data.contact_messages);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const markAsRead = async (id: number) => {
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/contact/${id}/read`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchMessages();
    } catch (err) {
      console.error(err);
      alert("Failed to mark as read");
    }
  };

  if (isLoading) return <div>Loading messages...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Contact Messages</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Sender</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {messages.map((msg) => (
              <tr key={msg.id} className={msg.is_read ? "bg-white" : "bg-blue-50"}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <div>{msg.name}</div>
                  <div className="text-xs text-gray-500 font-normal">{msg.email}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                  {msg.subject}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-sm truncate" title={msg.message}>
                  {msg.message}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {msg.is_read ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-800">Read</span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">New</span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(msg.created_at).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {!msg.is_read && (
                    <button
                      onClick={() => markAsRead(msg.id)}
                      className="text-[var(--color-brand-primary)] hover:underline"
                    >
                      Mark as read
                    </button>
                  )}
                </td>
              </tr>
            ))}
            {messages.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                  No contact messages found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
