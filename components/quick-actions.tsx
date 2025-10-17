import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus, FileText, Users, Calendar } from "lucide-react"

export function QuickActions() {
  const actions = [
    { icon: Plus, label: "New Task", color: "text-blue-500", bgColor: "bg-blue-50 dark:bg-blue-950" },
    { icon: FileText, label: "New Project", color: "text-purple-500", bgColor: "bg-purple-50 dark:bg-purple-950" },
    { icon: Users, label: "Invite Team", color: "text-green-500", bgColor: "bg-green-50 dark:bg-green-950" },
    { icon: Calendar, label: "Schedule", color: "text-orange-500", bgColor: "bg-orange-50 dark:bg-orange-950" },
  ]

  return (
    <Card className="border-border bg-card p-6 lg:col-span-1">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Quick Actions</h3>
      <div className="space-y-3">
        {actions.map((action) => {
          const Icon = action.icon
          return (
            <Button
              key={action.label}
              variant="outline"
              className="w-full justify-start gap-3 border-border hover:bg-muted bg-transparent"
            >
              <div className={`rounded-lg p-2 ${action.bgColor}`}>
                <Icon className={`h-4 w-4 ${action.color}`} />
              </div>
              <span className="text-sm font-medium">{action.label}</span>
            </Button>
          )
        })}
      </div>
    </Card>
  )
}
