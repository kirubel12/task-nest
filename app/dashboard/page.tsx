import { WelcomeSection } from "@/components/welcome-section"
import { StatsGrid } from "@/components/stats-grid"
import { ProjectsSection } from "@/components/projects-section"
import { TasksSection } from "@/components/tasks-section"
import { ActivityFeed } from "@/components/activity-feed"
import { QuickActions } from "@/components/quick-actions"
import { TeamMembers } from "@/components/team-members"
import { UpcomingDeadlines } from "@/components/upcoming-deadlines"
import { PerformanceChart } from "@/components/performance-chart"
import Header from "@/components/Header"

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-background">
      <Header />
      <div className="container mx-auto py-8">
        <WelcomeSection />
        <StatsGrid />

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <ProjectsSection />
          <TasksSection />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-4">
          <QuickActions />
          <UpcomingDeadlines />
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-3">
          <PerformanceChart />
          <TeamMembers />
          <ActivityFeed />
        </div>
      </div>
    </main>
  )
}
