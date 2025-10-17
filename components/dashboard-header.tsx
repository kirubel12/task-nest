import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DashboardHeader() {
  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
            TN
          </div>
          <h1 className="text-xl font-bold text-foreground">TaskNest</h1>
        </div>

        <nav className="hidden items-center gap-1 md:flex">
          <Button variant="ghost" className="text-foreground">
            Dashboard
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Tasks
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Projects
          </Button>
          <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
            Calendar
          </Button>
        </nav>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}
