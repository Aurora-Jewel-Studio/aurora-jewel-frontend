"use client";

import React, { useEffect, useState } from "react";

interface BespokeRequest {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  budget: string;
  description: string;
  status: string;
  created_at: string;
}

export default function AdminBespokePage() {
  const [requests, setRequests] = useState<BespokeRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRequests = async () => {
    try {
      const token = localStorage.getItem("admin_token");
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/bespoke`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Failed to fetch bespoke requests");
      const data = await res.json();
      setRequests(data.bespoke_requests);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const updateStatus = async (id: number, status: string) => {
    try {
      const token = localStorage.getItem("admin_token");
      await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/bespoke/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      });
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (isLoading) return <div>Loading bespoke requests...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Bespoke Requests</h1>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden border">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Client</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Budget</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Vision</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.map((req) => (
              <tr key={req.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {req.first_name} {req.last_name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div>{req.email}</div>
                  <div className="text-xs">{req.phone}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {req.budget || "N/A"}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={req.description}>
                  {req.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <select
                    value={req.status}
                    onChange={(e) => updateStatus(req.id, e.target.value)}
                    className="text-sm border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  >
                    <option value="pending">Pending</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(req.created_at).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {requests.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">
                  No bespoke requests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
