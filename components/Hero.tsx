import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle2, Users, Zap } from "lucide-react"

export const Hero = () => {
  return (
    <section className="relative min-h-screen bg-background">
      {/* Main Hero Content */}
      <div className="container mx-auto px-4 pt-20 pb-16 lg:pt-12 lg:pb-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          {/* Left Column - Headline & CTA */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl font-bold tracking-tight text-foreground lg:text-7xl text-balance">
                The complete platform to manage projects.
              </h1>
              <p className="text-lg text-muted-foreground lg:text-xl leading-relaxed max-w-xl">
                Your team's toolkit to create workspaces and collaborate with colleagues. Organize tasks, track
                progress, and ship faster with Task Nest.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
              <Button size="lg" className="text-base font-medium">
                Get started free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right Column - Feature Highlights */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="rounded-full bg-primary/10 p-2">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-1">Team Collaboration</h3>
                  <p className="text-sm text-muted-foreground">
                    Create workspaces and invite colleagues to collaborate in real-time
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="rounded-full bg-accent/10 p-2">
                  <CheckCircle2 className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-1">Task Management</h3>
                  <p className="text-sm text-muted-foreground">
                    Organize projects with boards, lists, and cards like Jira
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 rounded-lg bg-card border border-border">
                <div className="rounded-full bg-primary/10 p-2">
                  <Zap className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-card-foreground mb-1">Ship Faster</h3>
                  <p className="text-sm text-muted-foreground">
                    Streamline workflows and boost productivity with automated tracking
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

     

    
    </section>
  )
}
