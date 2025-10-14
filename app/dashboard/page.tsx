import { Header } from "@/components/Header";
import { requireAuth } from "@/lib/auth-server";

export default async function DashboardPage() {
  // This will redirect to sign-in if user is not authenticated
  const session = await requireAuth();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="bg-card rounded-lg p-6 border">
          <h2 className="text-xl font-semibold mb-4">Welcome back, {session.user.name}!</h2>
          <p className="text-muted-foreground mb-4">
            This is a protected route that requires authentication. 
            You can only see this page because you are logged in.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="bg-primary/10 rounded-lg p-4">
              <h3 className="font-semibold text-primary">Tasks</h3>
              <p className="text-sm text-muted-foreground">Manage your to-do list</p>
            </div>
            <div className="bg-secondary/10 rounded-lg p-4">
              <h3 className="font-semibold text-secondary-foreground">Projects</h3>
              <p className="text-sm text-muted-foreground">Organize your work</p>
            </div>
            <div className="bg-accent/10 rounded-lg p-4">
              <h3 className="font-semibold text-accent-foreground">Calendar</h3>
              <p className="text-sm text-muted-foreground">Schedule your time</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
