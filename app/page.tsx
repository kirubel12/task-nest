import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { redirectIfAuthenticated } from "@/lib/auth-server";
import Link from "next/link";

export default async function Home() {
  // Redirect authenticated users to dashboard
  await redirectIfAuthenticated("/dashboard");
  
  return (
    <div>
      <Header />
      <Hero />
      
      {/* Call to Action Section for Unauthenticated Users */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto text-center">
          <div className="bg-card rounded-lg p-6 border">
            <h2 className="text-xl font-semibold mb-4">Get Started</h2>
            <div className="space-y-4">
              <div className="text-muted-foreground">
                Sign in to access your dashboard and manage your tasks.
              </div>
              <div className="space-x-4">
                <Link 
                  href="/sign-in" 
                  className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up" 
                  className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                >
                  Sign Up
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
