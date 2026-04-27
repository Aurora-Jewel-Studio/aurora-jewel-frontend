"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Package, Mail, Sparkles, LogOut, LayoutDashboard } from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if token exists
    const token = localStorage.getItem("admin_token");
    
    // If not authenticated and trying to access an admin page (other than login)
    if (!token && !pathname.includes("/admin/login")) {
      router.push("/admin/login");
    } else if (token) {
      setIsAuthenticated(true);
    }
    
    setIsChecking(false);
  }, [pathname, router]);

  if (isChecking) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  // If not authenticated and on login page, just render children without sidebar
  if (!isAuthenticated || pathname.includes("/admin/login")) {
    return <div className="min-h-screen bg-gray-50">{children}</div>;
  }

  const handleLogout = () => {
    localStorage.removeItem("admin_token");
    setIsAuthenticated(false);
    router.push("/admin/login");
  };

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Products", href: "/admin/products", icon: Package },
    { name: "Orders", href: "/admin/orders", icon: Package },
    { name: "Bespoke Requests", href: "/admin/bespoke", icon: Sparkles },
    { name: "Contact Messages", href: "/admin/contact", icon: Mail },
  ];

  return (
    <div className="min-h-screen flex bg-gray-100 text-gray-900">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r shadow-sm flex flex-col">
        <div className="h-16 flex items-center px-6 border-b">
          <h1 className="font-serif text-xl font-bold">Aurora Admin</h1>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));
            
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-[var(--color-brand-primary)] text-white"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                <Icon size={18} />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 w-full rounded-lg text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
