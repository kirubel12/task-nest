"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useSession } from "@/lib/auth-client";

interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  session: any;
  user: any;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  session: null,
  user: null,
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isPending } = useSession();
  const [cachedAuth, setCachedAuth] = useState<boolean | null>(null);

  // Initialize from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("auth-status");
      if (cached) {
        setCachedAuth(cached === "true");
      }
    }
  }, []);

  // Update cache when session changes
  useEffect(() => {
    if (!isPending && typeof window !== "undefined") {
      const isAuth = !!session?.session?.token;
      localStorage.setItem("auth-status", isAuth.toString());
      setCachedAuth(isAuth);
    }
  }, [session, isPending]);

  const isAuthenticated = cachedAuth !== null ? cachedAuth : !!session?.session?.token;
  const isLoading = cachedAuth === null && isPending;

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isLoading,
        session,
        user: session?.user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
