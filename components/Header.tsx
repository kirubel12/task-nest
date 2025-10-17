"use client"
import * as React from "react"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import Link from "next/link"
import { useSession } from "@/lib/auth-client"
import UserButton from "@/components/UserButton"
import { usePathname } from "next/navigation"
import { NotificationCard } from "./notification-card"

interface NavigationItem {
  title: string
  href: string
  description?: string
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    description: "Overview of your tasks and progress",
  },
  {
    title: "Tasks",
    href: "/tasks",
    description: "Manage your to-do list and deadlines",
  },
  {
    title: "Projects",
    href: "/projects",
    description: "Organize your work into projects",
  },
  {
    title: "Calendar",
    href: "/calendar",
    description: "Schedule and plan your time",
  },
]

export const Header: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const { data: session } = useSession()
  const pathname = usePathname()
  const isAuthenticated = !!session?.user

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-auto">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-sm font-bold">TN</span>
          </div>
          <Link href="/" className="text-xl font-semibold">TaskNest</Link>
        </div>

        {/* Desktop Navigation - Only visible when authenticated */}
        {isAuthenticated && (
          <NavigationMenu className="hidden md:flex mx-6">
            <NavigationMenuList>
              {navigationItems.map((item) => {
                const isActive = pathname === item.href
                return (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuLink
                      href={item.href}
                      className={`${navigationMenuTriggerStyle()} transition-all duration-200 ${isActive
                        ? 'bg-secondary text-accent-foreground font-medium'
                        : 'hover:bg-accent/80 hover:text-accent-foreground'
                        }`}
                    >
                      {item.title}
                    </NavigationMenuLink>
                  </NavigationMenuItem>
                )
              })}
            </NavigationMenuList>
          </NavigationMenu>
        )}

        {/* User Section */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Authentication UI */}
          {isAuthenticated ? (
            <div className="flex items-center gap-6">
              <NotificationCard />
              <UserButton />
            </div>
          ) : (
            /* Unauthenticated User - Show Login and Sign Up buttons */
            <>
              <Button variant="outline" size="sm" className="hidden sm:flex h-9">
                <Link href="/sign-in" className="flex items-center justify-center">
                  Sign In
                </Link>
              </Button>
              <Button variant="default" size="sm" className="h-9">
                <Link href="/sign-up" className="flex items-center justify-center">
                  create an account
                </Link>
              </Button>
            </>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden h-9 w-9"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav className="container py-4">
              {/* Navigation Items - Only visible when authenticated */}
              {isAuthenticated ? (
                <div className="space-y-2">
                  {navigationItems.map((item) => {
                    const isActive = pathname === item.href
                    return (
                      <Link
                        key={item.title}
                        href={item.href}
                        className={`block rounded-md px-3 py-2 text-sm font-medium transition-all duration-200 ${isActive
                          ? 'bg-secondary text-accent-foreground font-medium'
                          : 'hover:bg-accent/80 hover:text-accent-foreground'
                          }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )
                  })}
                </div>
              ) : (
                <div className="mt-4 flex flex-col w-full gap-2">
                  <Button className="w-full">
                    <Link href="/sign-in" className="w-full flex items-center justify-center">
                      Sign In
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Link href="/sign-up" className="w-full flex items-center justify-center">
                      create an account                    </Link>
                  </Button>
                </div>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header