"use client"

import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { DollarSign, Users, TrendingUp, Package, ArrowRight, Plus, Calendar, Clock } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const recentLeads = [
  { id: "1", name: "Alice Johnson", email: "alice@example.com", status: "new", value: 5000 },
  { id: "2", name: "Bob Smith", email: "bob@example.com", status: "contacted", value: 12000 },
  { id: "3", name: "Carol White", email: "carol@example.com", status: "qualified", value: 8500 },
  { id: "4", name: "David Brown", email: "david@example.com", status: "proposal", value: 15000 },
]

const upcomingTasks = [
  { id: "1", title: "Review marketing campaign", dueDate: "Today, 2:00 PM", priority: "high" },
  { id: "2", title: "Client meeting - Project X", dueDate: "Today, 4:30 PM", priority: "medium" },
  { id: "3", title: "Approve invoice #1234", dueDate: "Tomorrow, 10:00 AM", priority: "low" },
]

const topServices = [
  { name: "Web Development", revenue: 45000, percentage: 35 },
  { name: "Mobile App Development", revenue: 32000, percentage: 25 },
  { name: "UI/UX Design", revenue: 28000, percentage: 22 },
  { name: "Consulting", revenue: 23000, percentage: 18 },
]

import { useAuth } from "@/lib/auth-context"

/**
 * Main dashboard view for business accounts.
 * Displays key metrics, recent leads, upcoming tasks, and revenue breakdown.
 * 
 * @returns The rendered business dashboard component.
 */
export function BusinessDashboard() {
  const { businessProfile } = useAuth()

  return (
    <div className="space-y-6">
      <PageHeader
        title="Business Dashboard"
        description={`Welcome back${businessProfile?.ownerName ? `, ${businessProfile.ownerName}` : ""}! Here's an overview of your business performance.`}
      >
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Lead
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$128,430"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          description="vs last month"
        />
        <StatCard
          title="Active Leads"
          value="24"
          icon={TrendingUp}
          trend={{ value: 8.2, isPositive: true }}
          description="vs last month"
        />
        <StatCard title="Employees" value="12" icon={Users} description="Active team members" />
        <StatCard title="Services" value="8" icon={Package} description="Active services" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Leads</CardTitle>
              <CardDescription>Your latest potential customers</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentLeads.map((lead) => (
                <div
                  key={lead.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={`/.jpg?height=40&width=40&query=${lead.name}`} />
                      <AvatarFallback>
                        {lead.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium text-sm">{lead.name}</p>
                      <p className="text-xs text-muted-foreground">{lead.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium">${lead.value.toLocaleString()}</span>
                    <StatusBadge
                      status={lead.status}
                      variant={
                        lead.status === "new"
                          ? "info"
                          : lead.status === "contacted"
                            ? "warning"
                            : lead.status === "qualified"
                              ? "success"
                              : "default"
                      }
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Upcoming Tasks</CardTitle>
              <CardDescription>Your scheduled activities</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                  <div
                    className={`mt-1 h-2 w-2 rounded-full ${task.priority === "high"
                      ? "bg-red-500"
                      : task.priority === "medium"
                        ? "bg-yellow-500"
                        : "bg-green-500"
                      }`}
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{task.title}</p>
                    <div className="flex items-center gap-1 mt-1 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {task.dueDate}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue by Service</CardTitle>
            <CardDescription>Performance breakdown this month</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {topServices.map((service) => (
                <div key={service.name} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{service.name}</span>
                    <span className="text-sm text-muted-foreground">
                      ${service.revenue.toLocaleString()} ({service.percentage}%)
                    </span>
                  </div>
                  <Progress value={service.percentage} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-2">
            <Button variant="outline" className="justify-start bg-transparent">
              <Plus className="mr-2 h-4 w-4" />
              Add New Lead
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Calendar className="mr-2 h-4 w-4" />
              Schedule Meeting
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <DollarSign className="mr-2 h-4 w-4" />
              Create Invoice
            </Button>
            <Button variant="outline" className="justify-start bg-transparent">
              <Package className="mr-2 h-4 w-4" />
              Add Service
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
