"use client";

import { useState, useEffect } from "react";
import AdminAuth from "@/components/blog/AdminAuth";
import AdminPanel from "@/components/blog/AdminPanel";

export default function AdminPageContent() {
  const [adminKey, setAdminKey] = useState<string | null>(null);

  // Restore admin key from sessionStorage on mount
  useEffect(() => {
    const stored = sessionStorage.getItem("blog_admin_key");
    if (stored) {
      setAdminKey(stored);
    }
  }, []);

  const handleAuthenticated = (key: string) => {
    sessionStorage.setItem("blog_admin_key", key);
    setAdminKey(key);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("blog_admin_key");
    setAdminKey(null);
  };

  if (!adminKey) {
    return <AdminAuth onAuthenticated={handleAuthenticated} />;
  }

  return <AdminPanel adminKey={adminKey} onLogout={handleLogout} />;
}
