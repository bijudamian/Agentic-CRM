"use client"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  LogIn,
  LogOut,
  Search,
  Wrench,
  DollarSign,
  Users,
  Clock,
  ShoppingCart,
  MoreHorizontal,
  Plus,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const employeeStatus = [
  {
    id: "1",
    name: "Sarah Miller",
    role: "Senior Developer",
    signedIn: true,
    signInTime: "09:00 AM",
    currentTask: "Project Alpha - Development",
  },
  {
    id: "2",
    name: "James Wilson",
    role: "Designer",
    signedIn: true,
    signInTime: "09:15 AM",
    currentTask: "UI Redesign - Dashboard",
  },
  { id: "3", name: "Emily Chen", role: "Marketing Manager", signedIn: false, signInTime: null, currentTask: null },
  {
    id: "4",
    name: "Michael Brown",
    role: "Sales Rep",
    signedIn: true,
    signInTime: "08:45 AM",
    currentTask: "Client Meeting - Enterprise Corp",
  },
]

const activeServices = [
  {
    id: "1",
    customer: "Tech Startup Inc",
    service: "Web Development",
    employee: "Sarah Miller",
    status: "in-progress",
    startTime: "10:00 AM",
    estimatedEnd: "02:00 PM",
  },
  {
    id: "2",
    customer: "Global Solutions",
    service: "UI/UX Design",
    employee: "James Wilson",
    status: "in-progress",
    startTime: "11:00 AM",
    estimatedEnd: "04:00 PM",
  },
  {
    id: "3",
    customer: "Innovation Labs",
    service: "Consulting",
    employee: "Michael Brown",
    status: "completed",
    startTime: "09:00 AM",
    estimatedEnd: "11:00 AM",
  },
]

const crossSellOpportunities = [
  {
    id: "1",
    customer: "Tech Startup Inc",
    currentService: "Web Development",
    recommendedService: "SEO Package",
    probability: 85,
    value: 2000,
  },
  {
    id: "2",
    customer: "Global Solutions",
    currentService: "UI/UX Design",
    recommendedService: "Brand Identity",
    probability: 72,
    value: 3500,
  },
  {
    id: "3",
    customer: "Innovation Labs",
    currentService: "Consulting",
    recommendedService: "Training Workshop",
    probability: 60,
    value: 1500,
  },
]

const serviceBilling = [
  {
    id: "1",
    service: "Web Development",
    customer: "Tech Startup Inc",
    hours: 40,
    rate: 150,
    total: 6000,
    status: "pending",
  },
  {
    id: "2",
    service: "UI/UX Design",
    customer: "Global Solutions",
    hours: 25,
    rate: 120,
    total: 3000,
    status: "invoiced",
  },
  { id: "3", service: "Consulting", customer: "Innovation Labs", hours: 8, rate: 200, total: 1600, status: "paid" },
]

export default function ServicePage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Service" description="Manage service delivery and employee activities">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Service
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Active Services" value="3" icon={Wrench} description="in progress" />
        <StatCard title="Employees Working" value="3" icon={Users} description="currently signed in" />
        <StatCard
          title="Today's Revenue"
          value="$10.6K"
          icon={DollarSign}
          trend={{ value: 12.5, isPositive: true }}
          description="from services"
        />
        <StatCard title="Avg. Service Time" value="3.5h" icon={Clock} description="per service" />
      </div>

      <Tabs defaultValue="status" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="status">Employee Status</TabsTrigger>
            <TabsTrigger value="services">Active Services</TabsTrigger>
            <TabsTrigger value="crosssell">Cross-Sell</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 w-64" />
          </div>
        </div>

        <TabsContent value="status">
          <Card>
            <CardHeader>
              <CardTitle>Employee Sign-in Status</CardTitle>
              <CardDescription>Current status of all team members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {employeeStatus.map((employee) => (
                  <div key={employee.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={`/.jpg?height=40&width=40&query=${employee.name}`} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{employee.name}</p>
                          <Badge variant={employee.signedIn ? "default" : "secondary"} className="text-xs">
                            {employee.signedIn ? "Online" : "Offline"}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      {employee.signedIn && (
                        <div className="text-right hidden sm:block">
                          <p className="text-sm">Since {employee.signInTime}</p>
                          <p className="text-xs text-muted-foreground">{employee.currentTask}</p>
                        </div>
                      )}
                      <Button variant={employee.signedIn ? "destructive" : "default"} size="sm">
                        {employee.signedIn ? (
                          <>
                            <LogOut className="mr-2 h-4 w-4" />
                            Sign Out
                          </>
                        ) : (
                          <>
                            <LogIn className="mr-2 h-4 w-4" />
                            Sign In
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="services">
          <Card>
            <CardHeader>
              <CardTitle>Active Services</CardTitle>
              <CardDescription>Services currently being delivered</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeServices.map((service) => (
                  <div key={service.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-lg ${service.status === "completed" ? "bg-green-500/10" : "bg-blue-500/10"}`}
                      >
                        <Wrench
                          className={`h-5 w-5 ${service.status === "completed" ? "text-green-500" : "text-blue-500"}`}
                        />
                      </div>
                      <div>
                        <p className="font-medium">{service.service}</p>
                        <p className="text-sm text-muted-foreground">{service.customer}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm">Assigned: {service.employee}</p>
                        <p className="text-xs text-muted-foreground">
                          {service.startTime} - {service.estimatedEnd}
                        </p>
                      </div>
                      <StatusBadge
                        status={service.status.replace("-", " ")}
                        variant={service.status === "completed" ? "success" : "info"}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="crosssell">
          <Card>
            <CardHeader>
              <CardTitle>Cross-Sell Opportunities</CardTitle>
              <CardDescription>AI-recommended upsell opportunities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {crossSellOpportunities.map((opportunity) => (
                  <div
                    key={opportunity.id}
                    className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium">{opportunity.customer}</p>
                        <p className="text-sm text-muted-foreground">Current: {opportunity.currentService}</p>
                      </div>
                      <Badge variant="secondary">{opportunity.probability}% match</Badge>
                    </div>
                    <div className="mt-4 p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <div className="flex items-center gap-2">
                        <ShoppingCart className="h-4 w-4 text-primary" />
                        <span className="font-medium text-sm">Recommended: {opportunity.recommendedService}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Potential value: ${opportunity.value.toLocaleString()}
                      </p>
                    </div>
                    <div className="mt-3 flex gap-2">
                      <Button size="sm">Create Offer</Button>
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Service Billing</CardTitle>
                <CardDescription>Track service-based billing and payments</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Entry
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {serviceBilling.map((billing) => (
                  <div key={billing.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div>
                      <p className="font-medium">{billing.service}</p>
                      <p className="text-sm text-muted-foreground">{billing.customer}</p>
                    </div>
                    <div className="flex items-center gap-6">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm">
                          {billing.hours}h × ${billing.rate}/h
                        </p>
                        <p className="font-medium">${billing.total.toLocaleString()}</p>
                      </div>
                      <StatusBadge
                        status={billing.status}
                        variant={
                          billing.status === "paid" ? "success" : billing.status === "invoiced" ? "info" : "warning"
                        }
                      />
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Create Invoice</DropdownMenuItem>
                          <DropdownMenuItem>Mark as Paid</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
