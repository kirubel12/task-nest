"use server";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { z } from "zod";

// Validation schemas
const signUpSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  username: z.string().min(3, "Username must be at least 3 characters").optional(),
});

const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional().default(true),
});

// Types for better type safety
type SignUpData = z.infer<typeof signUpSchema>;
type SignInData = z.infer<typeof signInSchema>;

type AuthActionResult = {
  success: boolean;
  error?: string;
  data?: any;
};

/**
 * Register a new user with email and password
 */
export async function registerUser(data: SignUpData): Promise<AuthActionResult> {
  try {
    // Validate input data
    const validatedData = signUpSchema.parse(data);

    // Call Better Auth API to register user
    const result = await auth.api.signUpEmail({
      body: {
        name: validatedData.name,
        email: validatedData.email,
        password: validatedData.password,
        username: validatedData.username,
      },
    });

    if (result.token === null) {
      return {
        success: false,
        error: "Registration failed",
      };
    }

    return {
      success: true,
      data: result.user,
    };
  } catch (error) {
    console.error("Registration error:", error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Invalid input data",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred during registration",
    };
  }
}

/**
 * Sign in user with email and password
 */
export async function loginUser(data: SignInData): Promise<AuthActionResult> {
  try {
    // Validate input data
    const validatedData = signInSchema.parse(data);

    // Call Better Auth API to sign in user
    const result = await auth.api.signInEmail({
      body: {
        email: validatedData.email,
        password: validatedData.password,
        rememberMe: validatedData.rememberMe,
      },
    });

    if (result.token === null) {
      return {
        success: false,
        error: "Login failed",
      };
    }

    return {
      success: true,
      data: result.user,
    };
  } catch (error) {
    console.error("Login error:", error);
    
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: error.errors[0]?.message || "Invalid input data",
      };
    }

    return {
      success: false,
      error: "An unexpected error occurred during login",
    };
  }
}

/**
 * Sign out the current user
 */
export async function logoutUser(): Promise<AuthActionResult> {
  try {
    const result = await auth.api.signOut({
      headers: await headers(),
    });

    if (!result.success) {
      return {
        success: false,
        error: "Logout failed",
      };
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("Logout error:", error);
    return {
      success: false,
      error: "An unexpected error occurred during logout",
    };
  }
}

/**
 * Get the current authenticated user session
 */
export async function getAuthenticatedUser() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    return session;
  } catch (error) {
    console.error("Get session error:", error);
    return null;
  }
}

/**
 * Check if user is authenticated (returns boolean)
 */
export async function isAuthenticated(): Promise<boolean> {
  try {
    const session = await getAuthenticatedUser();
    return !!session?.user;
  } catch (error) {
    console.error("Authentication check error:", error);
    return false;
  }
}

/**
 * Server action to register user and redirect on success
 */
export async function registerAndRedirect(formData: FormData) {
  const data = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    username: formData.get("username") as string,
  };

  const result = await registerUser(data);

  if (result.success) {
    redirect("/dashboard");
  } else {
    throw new Error(result.error);
  }
}

/**
 * Server action to login user and redirect on success
 */
export async function loginAndRedirect(formData: FormData) {
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    rememberMe: formData.get("rememberMe") === "on",
  };

  const result = await loginUser(data);

  if (result.success) {
    redirect("/dashboard");
  } else {
    throw new Error(result.error);
  }
}

/**
 * Server action to logout user and redirect to home
 */
export async function logoutAndRedirect() {
  const result = await logoutUser();

  if (result.success) {
    redirect("/");
  } else {
    throw new Error(result.error);
  }
}