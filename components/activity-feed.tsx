import { Card } from "@/components/ui/card"
import { MessageSquare, CheckCircle2, Folder, User } from "lucide-react"

export function ActivityFeed() {
  const activities = [
    {
      type: "comment",
      user: "Sarah",
      action: "commented on",
      target: "Website Redesign",
      time: "2h ago",
      icon: MessageSquare,
      color: "text-blue-500",
    },
    {
      type: "complete",
      user: "Alex",
      action: "completed",
      target: "API Integration",
      time: "4h ago",
      icon: CheckCircle2,
      color: "text-green-500",
    },
    {
      type: "project",
      user: "Maria",
      action: "created",
      target: "Mobile App v2",
      time: "1d ago",
      icon: Folder,
      color: "text-purple-500",
    },
    {
      type: "member",
      user: "James",
      action: "joined",
      target: "Design Team",
      time: "2d ago",
      icon: User,
      color: "text-orange-500",
    },
  ]

  return (
    <Card className="border-border bg-card p-6">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Activity Feed</h3>
      <div className="space-y-4">
        {activities.map((activity, idx) => {
          const Icon = activity.icon
          return (
            <div key={idx} className="flex gap-3 pb-4 last:pb-0 border-b border-border last:border-0">
              <div
                className={`rounded-lg p-2 h-fit ${activity.color.replace("text-", "bg-").replace("-500", "-100")} dark:${activity.color.replace("text-", "bg-").replace("-500", "-950")}`}
              >
                <Icon className={`h-4 w-4 ${activity.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm text-foreground">
                  <span className="font-semibold">{activity.user}</span> {activity.action}{" "}
                  <span className="font-semibold">{activity.target}</span>
                </p>
                <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
