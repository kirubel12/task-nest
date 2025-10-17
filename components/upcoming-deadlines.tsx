import { Card } from "@/components/ui/card"
import { Calendar, AlertCircle } from "lucide-react"

export function UpcomingDeadlines() {
  const deadlines = [
    { task: "Website Launch", date: "Tomorrow", priority: "high", daysLeft: 1 },
    { task: "Client Presentation", date: "Dec 20", priority: "high", daysLeft: 3 },
    { task: "Design Review", date: "Dec 22", priority: "medium", daysLeft: 5 },
    { task: "Documentation", date: "Dec 25", priority: "low", daysLeft: 8 },
  ]

  return (
    <Card className="border-border bg-card p-6 lg:col-span-3">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Upcoming Deadlines</h3>
        <Calendar className="h-5 w-5 text-muted-foreground" />
      </div>
      <div className="space-y-3">
        {deadlines.map((deadline) => (
          <div
            key={deadline.task}
            className="flex items-center justify-between rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`rounded-full p-2 ${
                  deadline.priority === "high"
                    ? "bg-red-100 dark:bg-red-950"
                    : deadline.priority === "medium"
                      ? "bg-yellow-100 dark:bg-yellow-950"
                      : "bg-green-100 dark:bg-green-950"
                }`}
              >
                <AlertCircle
                  className={`h-4 w-4 ${
                    deadline.priority === "high"
                      ? "text-red-600 dark:text-red-400"
                      : deadline.priority === "medium"
                        ? "text-yellow-600 dark:text-yellow-400"
                        : "text-green-600 dark:text-green-400"
                  }`}
                />
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{deadline.task}</p>
                <p className="text-xs text-muted-foreground">{deadline.date}</p>
              </div>
            </div>
            <span className="text-xs font-semibold text-muted-foreground bg-muted px-2 py-1 rounded">
              {deadline.daysLeft}d
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
