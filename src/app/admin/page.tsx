"use client";

import React, { useEffect, useState } from "react";
import { formatPrice } from "@/lib/data";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { Package, DollarSign, Sparkles, ShoppingBag } from "lucide-react";

interface AnalyticsData {
  totalRevenue: number;
  orderStatuses: { name: string; value: number }[];
  revenueByDate: { date: string; revenue: string }[];
  totalProducts: number;
  pendingBespoke: number;
}

const COLORS = ['#011B12', '#4ade80', '#facc15', '#f87171', '#60a5fa'];

export default function AdminDashboardPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = localStorage.getItem("admin_token");
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000"}/api/analytics`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Failed to fetch analytics");
        const json = await res.json();
        
        // Format dates for the chart
        const formattedDateData = json.revenueByDate.map((item: any) => ({
          ...item,
          date: new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' }),
          revenue: parseInt(item.revenue)
        }));

        setData({
          ...json,
          revenueByDate: formattedDateData
        });
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (isLoading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!data) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-serif font-bold text-gray-900">Dashboard Overview</h1>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{formatPrice(data.totalRevenue)}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full text-green-600">
              <DollarSign size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Orders</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">
                {data.orderStatuses.reduce((acc, curr) => acc + curr.value, 0)}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full text-blue-600">
              <ShoppingBag size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Products</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{data.totalProducts}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full text-purple-600">
              <Package size={24} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Bespoke</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{data.pendingBespoke}</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full text-yellow-600">
              <Sparkles size={24} />
            </div>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Revenue (Last 7 Days)</h2>
          <div className="h-80">
            {data.revenueByDate.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data.revenueByDate} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: any) => [formatPrice(Number(value) || 0), 'Revenue']}
                  />
                  <Line type="monotone" dataKey="revenue" stroke="#011B12" strokeWidth={3} dot={{ r: 4, fill: '#011B12' }} activeDot={{ r: 6 }} />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">No revenue data available</div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Orders by Status</h2>
          <div className="h-80">
            {data.orderStatuses.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={data.orderStatuses}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {data.orderStatuses.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-gray-500">No order data available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
