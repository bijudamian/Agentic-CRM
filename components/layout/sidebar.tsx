"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  User,
  Package,
  Users,
  Megaphone,
  TrendingUp,
  Wrench,
  MessageSquare,
  BarChart3,
  HelpCircle,
  ShoppingBag,
  Tag,
  Heart,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

const businessNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  { title: "Management", href: "/dashboard/management", icon: Package },
  { title: "Employees", href: "/dashboard/employees", icon: Users },
  { title: "Marketing", href: "/dashboard/marketing", icon: Megaphone },
  { title: "Sales", href: "/dashboard/sales", icon: TrendingUp },
  { title: "Service", href: "/dashboard/service", icon: Wrench },
  { title: "Feedback", href: "/dashboard/feedback", icon: MessageSquare },
  { title: "Reports", href: "/dashboard/reports", icon: BarChart3 },
  { title: "Support", href: "/dashboard/support", icon: HelpCircle },
]

const personalNavItems = [
  { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { title: "Profile", href: "/dashboard/profile", icon: User },
  { title: "Activities", href: "/dashboard/activities", icon: ShoppingBag },
  { title: "Offers", href: "/dashboard/offers", icon: Tag },
  { title: "Community", href: "/dashboard/community", icon: Heart },
  { title: "Feedback", href: "/dashboard/feedback", icon: MessageSquare },
  { title: "Support", href: "/dashboard/support", icon: HelpCircle },
]

export function Sidebar() {
  const pathname = usePathname()
  const { mode, sidebarOpen, setSidebarOpen } = useStore()

  const navItems = mode === "business" ? businessNavItems : personalNavItems

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-screen border-r border-sidebar-border bg-sidebar transition-all duration-300",
          sidebarOpen ? "w-64" : "w-16",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
          {sidebarOpen && (
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
                <Sparkles className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="font-semibold text-sidebar-foreground">Agentic CRM</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={cn("text-sidebar-foreground", !sidebarOpen && "mx-auto")}
          >
            {sidebarOpen ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </Button>
        </div>

        <ScrollArea className="h-[calc(100vh-4rem)]">
          <nav className="flex flex-col gap-1 p-2">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              const NavLink = (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground",
                  )}
                >
                  <item.icon className={cn("h-5 w-5 shrink-0", isActive && "text-sidebar-primary")} />
                  {sidebarOpen && <span>{item.title}</span>}
                </Link>
              )

              if (!sidebarOpen) {
                return (
                  <Tooltip key={item.href}>
                    <TooltipTrigger asChild>{NavLink}</TooltipTrigger>
                    <TooltipContent side="right">{item.title}</TooltipContent>
                  </Tooltip>
                )
              }

              return NavLink
            })}
          </nav>
        </ScrollArea>
      </aside>
    </TooltipProvider>
  )
}
