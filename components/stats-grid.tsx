import { Card } from "@/components/ui/card"
import { CheckCircle2, Clock, AlertCircle, TrendingUp } from "lucide-react"

export function StatsGrid() {
  const stats = [
    {
      label: "Completed Tasks",
      value: "24",
      icon: CheckCircle2,
      color: "text-emerald-500",
      bgColor: "bg-emerald-50 dark:bg-emerald-950",
    },
    {
      label: "In Progress",
      value: "8",
      icon: Clock,
      color: "text-blue-500",
      bgColor: "bg-blue-50 dark:bg-blue-950",
    },
    {
      label: "Overdue",
      value: "2",
      icon: AlertCircle,
      color: "text-orange-500",
      bgColor: "bg-orange-50 dark:bg-orange-950",
    },
    {
      label: "Completion Rate",
      value: "92%",
      icon: TrendingUp,
      color: "text-purple-500",
      bgColor: "bg-purple-50 dark:bg-purple-950",
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.label} className="border-border bg-card p-6">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                <p className="mt-2 text-3xl font-bold text-foreground">{stat.value}</p>
              </div>
              <div className={`rounded-lg p-3 ${stat.bgColor}`}>
                <Icon className={`h-6 w-6 ${stat.color}`} />
              </div>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
