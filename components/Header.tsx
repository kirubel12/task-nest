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

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        {/* Logo */}
        <div className="flex items-center gap-2 mr-auto">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground">
            <span className="text-sm font-bold">TN</span>
          </div>
          <span className="text-xl font-semibold">TaskNest</span>
        </div>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden md:flex mx-6">
          <NavigationMenuList>
            {navigationItems.map((item) => (
              <NavigationMenuItem key={item.title}>
                <NavigationMenuLink
                  href={item.href}
                  className={navigationMenuTriggerStyle()}
                >
                  {item.title}
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>

        {/* User Section */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Login Button */}
          <Button variant="outline" size="sm" className="hidden sm:flex h-9 w-[70px]">
            Login
          </Button>

          {/* Get Started Button */}
          <Button variant="default" size="sm" className="h-9 w-[100px]">
            Get started
          </Button>

         
         
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
              <div className="space-y-2">
                {navigationItems.map((item) => (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="block rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.title}
                  </Link>
                ))}
              </div>
              <div className="mt-4 flex flex-col w-full gap-2">
                <Button>
                  <Link href="/sign-in">
                    Login
                  </Link>
                </Button>
  
              </div>
            </nav>
          </div>
        </div>
      )}
    </header>
  )
}

export default Header