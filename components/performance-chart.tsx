import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"

export function PerformanceChart() {
  const weekData = [
    { day: "Mon", tasks: 12, completed: 10 },
    { day: "Tue", tasks: 15, completed: 13 },
    { day: "Wed", tasks: 18, completed: 16 },
    { day: "Thu", tasks: 14, completed: 12 },
    { day: "Fri", tasks: 20, completed: 18 },
    { day: "Sat", tasks: 8, completed: 7 },
    { day: "Sun", tasks: 5, completed: 5 },
  ]

  const maxTasks = Math.max(...weekData.map((d) => d.tasks))

  return (
    <Card className="border-border bg-card p-6 lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Weekly Performance</h3>
        <div className="flex items-center gap-2 text-green-600 dark:text-green-400">
          <TrendingUp className="h-4 w-4" />
          <span className="text-sm font-semibold">+12%</span>
        </div>
      </div>

      <div className="flex items-end justify-between gap-2 h-48">
        {weekData.map((data) => (
          <div key={data.day} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full flex gap-1">
              <div
                className="flex-1 bg-primary/20 rounded-t-sm"
                style={{ height: `${(data.completed / maxTasks) * 160}px` }}
              ></div>
              <div
                className="flex-1 bg-primary rounded-t-sm"
                style={{ height: `${(data.tasks / maxTasks) * 160}px` }}
              ></div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">{data.day}</span>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary/20"></div>
          <span className="text-muted-foreground">Completed</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="h-3 w-3 rounded-sm bg-primary"></div>
          <span className="text-muted-foreground">Total Tasks</span>
        </div>
      </div>
    </Card>
  )
}
