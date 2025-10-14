import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Server-side authentication utility to verify if a user is logged in
 * This should be used in server components, API routes, and server actions
 * to ensure proper authentication verification
 */
export async function getServerSession() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });
    return session;
  } catch (error) {
    console.error("Failed to get server session:", error);
    return null;
  }
}

/**
 * Require authentication for a page/route
 * Redirects to sign-in page if user is not authenticated
 * Returns the session if user is authenticated
 */
export async function requireAuth() {
  const session = await getServerSession();
  
  if (!session) {
    redirect("/sign-in");
  }
  
  return session;
}

/**
 * Redirect authenticated users away from auth pages
 * Useful for sign-in and sign-up pages
 */
export async function redirectIfAuthenticated(redirectTo: string = "/") {
  const session = await getServerSession();
  
  if (session) {
    redirect(redirectTo);
  }
}

/**
 * Check if user is authenticated without redirecting
 * Returns boolean indicating authentication status
 */
export async function isAuthenticated(): Promise<boolean> {
  const session = await getServerSession();
  return !!session;
}

/**
 * Get the current user from the session
 * Returns null if not authenticated
 */
export async function getCurrentUser() {
  const session = await getServerSession();
  return session?.user || null;
}
