import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export function TeamMembers() {
  const members = [
    { name: "Sarah Chen", role: "Designer", avatar: "SC", color: "bg-blue-500" },
    { name: "Alex Johnson", role: "Developer", avatar: "AJ", color: "bg-purple-500" },
    { name: "Maria Garcia", role: "PM", avatar: "MG", color: "bg-pink-500" },
    { name: "James Wilson", role: "QA", avatar: "JW", color: "bg-green-500" },
  ]

  return (
    <Card className="border-border bg-card p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Team Members</h3>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
          <Plus className="h-4 w-4" />
        </Button>
      </div>
      <div className="space-y-3">
        {members.map((member) => (
          <div
            key={member.name}
            className="flex items-center justify-between rounded-lg p-3 hover:bg-muted/50 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div
                className={`h-10 w-10 rounded-full ${member.color} flex items-center justify-center text-white font-semibold text-sm`}
              >
                {member.avatar}
              </div>
              <div>
                <p className="font-medium text-foreground text-sm">{member.name}</p>
                <p className="text-xs text-muted-foreground">{member.role}</p>
              </div>
            </div>
            <div className="h-2 w-2 rounded-full bg-green-500"></div>
          </div>
        ))}
      </div>
    </Card>
  )
}
