"use client";

import { useEffect, useState } from "react";
import { useAuthStatus } from "@/lib/auth-client";

// Fast authentication hook with localStorage caching
export function useFastAuth() {
  const [cachedAuthState, setCachedAuthState] = useState<boolean | null>(null);
  const { isAuthenticated, isLoading, session, user } = useAuthStatus();

  // Initialize from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cached = localStorage.getItem("auth-status");
      if (cached) {
        setCachedAuthState(cached === "true");
      }
    }
  }, []);

  // Update localStorage when auth state changes
  useEffect(() => {
    if (!isLoading && typeof window !== "undefined") {
      localStorage.setItem("auth-status", isAuthenticated.toString());
      setCachedAuthState(isAuthenticated);
    }
  }, [isAuthenticated, isLoading]);

  // Return cached state immediately if available, otherwise use the hook state
  const fastIsAuthenticated = cachedAuthState !== null ? cachedAuthState : isAuthenticated;
  const fastIsLoading = cachedAuthState === null && isLoading;

  return {
    isAuthenticated: fastIsAuthenticated,
    isLoading: fastIsLoading,
    session,
    user,
    // Indicate if we're using cached data
    isCached: cachedAuthState !== null && isLoading,
  };
}
