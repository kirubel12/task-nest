import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Circle, ArrowRight } from "lucide-react"

export function TasksSection() {
  const tasks = [
    { id: 1, title: "Review design mockups", completed: true, priority: "high" },
    { id: 2, title: "Update documentation", completed: false, priority: "medium" },
    { id: 3, title: "Fix critical bugs", completed: false, priority: "high" },
    { id: 4, title: "Client presentation prep", completed: true, priority: "medium" },
  ]

  return (
    <Card className="border-border bg-card p-6">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Important Tasks</h3>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {tasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-lg border border-border p-3 hover:bg-muted/50 transition-colors"
          >
            <button className="flex-shrink-0 text-muted-foreground hover:text-primary">
              {task.completed ? <CheckCircle2 className="h-5 w-5 text-emerald-500" /> : <Circle className="h-5 w-5" />}
            </button>
            <div className="flex-1 min-w-0">
              <p
                className={`text-sm font-medium ${task.completed ? "line-through text-muted-foreground" : "text-foreground"}`}
              >
                {task.title}
              </p>
            </div>
            <span
              className={`flex-shrink-0 text-xs font-medium px-2 py-1 rounded ${task.priority === "high"
                ? "bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300"
                : "bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300"
                }`}
            >
              {task.priority}
            </span>
          </div>
        ))}
      </div>
    </Card>
  )
}
