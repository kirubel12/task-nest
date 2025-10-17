import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ArrowRight, Folder } from "lucide-react"

export function ProjectsSection() {
  const projects = [
    {
      name: "Website Redesign",
      status: "In Progress",
      team: [
        { name: "John Doe", avatar: "/avatars/john.jpg" },
        { name: "Jane Smith", avatar: "/avatars/jane.jpg" },
        { name: "Mike Johnson", avatar: "/avatars/mike.jpg" },
        { name: "Sarah Wilson", avatar: "/avatars/sarah.jpg" },
      ],
    },
    {
      name: "Mobile App",
      status: "Planning",
      team: [
        { name: "Alex Brown", avatar: "/avatars/alex.jpg" },
        { name: "Emily Davis", avatar: "/avatars/emily.jpg" },
        { name: "Chris Lee", avatar: "/avatars/chris.jpg" },
      ],
    },
    {
      name: "API Integration",
      status: "Completed",
      team: [
        { name: "David Kim", avatar: "/avatars/david.jpg" },
        { name: "Lisa Wang", avatar: "/avatars/lisa.jpg" },
      ],
    },
  ]

  return (
    <Card className="border-border bg-card p-6 lg:col-span-2">
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Active Projects</h3>
        <Button variant="ghost" size="sm" className="text-primary hover:text-primary">
          View All <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="space-y-4">
        {projects.map((project) => (
          <div key={project.name} className="border-b border-border pb-4 last:border-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-primary/10 p-2">
                  <Folder className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{project.name}</p>
                  <span className={`text-xs font-medium px-2 py-1 rounded ${project.status === "Completed"
                      ? "bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300"
                      : project.status === "In Progress"
                        ? "bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300"
                        : "bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300"
                    }`}>
                    {project.status}
                  </span>
                </div>
              </div>
              <div className="flex items-center -space-x-2">
                {project.team.map((member, index) => (
                  <Avatar key={member.name} className="h-8 w-8 border-2 border-background">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="text-xs">
                      {member.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
