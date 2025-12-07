"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { DataTable } from "@/components/ui/data-table"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Plus, Search, TrendingUp, DollarSign, Users, FileText, MoreHorizontal, Edit, Eye, Send } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const leads = [
  {
    id: "1",
    name: "Alice Johnson",
    company: "Tech Startup Inc",
    email: "alice@techstartup.com",
    phone: "+1 555-0101",
    status: "new",
    value: 15000,
    source: "Website",
  },
  {
    id: "2",
    name: "Bob Williams",
    company: "Global Solutions",
    email: "bob@globalsolutions.com",
    phone: "+1 555-0102",
    status: "contacted",
    value: 25000,
    source: "Referral",
  },
  {
    id: "3",
    name: "Carol Martinez",
    company: "Innovation Labs",
    email: "carol@innovationlabs.com",
    phone: "+1 555-0103",
    status: "qualified",
    value: 50000,
    source: "LinkedIn",
  },
  {
    id: "4",
    name: "David Lee",
    company: "Enterprise Corp",
    email: "david@enterprisecorp.com",
    phone: "+1 555-0104",
    status: "proposal",
    value: 75000,
    source: "Conference",
  },
  {
    id: "5",
    name: "Emma Davis",
    company: "Future Systems",
    email: "emma@futuresystems.com",
    phone: "+1 555-0105",
    status: "closed",
    value: 40000,
    source: "Website",
  },
]

const invoices = [
  {
    id: "INV-001",
    customerName: "Tech Startup Inc",
    amount: 15000,
    status: "paid",
    dueDate: "Dec 1, 2025",
    createdAt: "Nov 15, 2025",
  },
  {
    id: "INV-002",
    customerName: "Global Solutions",
    amount: 25000,
    status: "sent",
    dueDate: "Dec 15, 2025",
    createdAt: "Dec 1, 2025",
  },
  {
    id: "INV-003",
    customerName: "Innovation Labs",
    amount: 50000,
    status: "overdue",
    dueDate: "Nov 30, 2025",
    createdAt: "Nov 1, 2025",
  },
  {
    id: "INV-004",
    customerName: "Enterprise Corp",
    amount: 75000,
    status: "draft",
    dueDate: "Dec 20, 2025",
    createdAt: "Dec 5, 2025",
  },
]

const pipelineStages = [
  { stage: "New", count: 8, value: 120000, color: "bg-blue-500" },
  { stage: "Contacted", count: 12, value: 280000, color: "bg-yellow-500" },
  { stage: "Qualified", count: 6, value: 350000, color: "bg-orange-500" },
  { stage: "Proposal", count: 4, value: 420000, color: "bg-purple-500" },
  { stage: "Closed", count: 15, value: 890000, color: "bg-green-500" },
]

export default function SalesPage() {
  const totalPipelineValue = pipelineStages.reduce((sum, stage) => sum + stage.value, 0)

  return (
    <div className="space-y-6">
      <PageHeader title="Sales" description="Manage your leads, pipeline, and invoices">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Lead
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Pipeline Value"
          value={`$${(totalPipelineValue / 1000).toFixed(0)}K`}
          icon={TrendingUp}
          trend={{ value: 15.3, isPositive: true }}
          description="vs last month"
        />
        <StatCard
          title="Total Revenue"
          value="$890K"
          icon={DollarSign}
          trend={{ value: 8.7, isPositive: true }}
          description="closed deals"
        />
        <StatCard title="Active Leads" value="30" icon={Users} description="in pipeline" />
        <StatCard title="Pending Invoices" value="$100K" icon={FileText} description="awaiting payment" />
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Sales Pipeline</CardTitle>
          <CardDescription>Track your deals through each stage</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pipelineStages.map((stage) => (
              <div key={stage.stage} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-3 w-3 rounded-full ${stage.color}`} />
                    <span className="font-medium">{stage.stage}</span>
                    <span className="text-sm text-muted-foreground">({stage.count} leads)</span>
                  </div>
                  <span className="font-medium">${(stage.value / 1000).toFixed(0)}K</span>
                </div>
                <Progress value={(stage.value / totalPipelineValue) * 100} className="h-2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="leads" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="leads">Leads</TabsTrigger>
            <TabsTrigger value="invoices">Invoices</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search..." className="pl-9 w-64" />
          </div>
        </div>

        <TabsContent value="leads">
          <Card>
            <CardHeader>
              <CardTitle>Lead Management</CardTitle>
              <CardDescription>Track and manage your sales leads</CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable
                data={leads}
                columns={[
                  {
                    key: "name",
                    header: "Contact",
                    cell: (item) => (
                      <div className="flex items-center gap-3">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={`/.jpg?height=32&width=32&query=${item.name}`} />
                          <AvatarFallback>
                            {item.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{item.name}</p>
                          <p className="text-xs text-muted-foreground">{item.company}</p>
                        </div>
                      </div>
                    ),
                  },
                  { key: "email", header: "Email", className: "hidden md:table-cell" },
                  { key: "source", header: "Source", className: "hidden sm:table-cell" },
                  {
                    key: "value",
                    header: "Value",
                    cell: (item) => `$${item.value.toLocaleString()}`,
                  },
                  {
                    key: "status",
                    header: "Status",
                    cell: (item) => (
                      <StatusBadge
                        status={item.status}
                        variant={
                          item.status === "new"
                            ? "info"
                            : item.status === "contacted"
                              ? "warning"
                              : item.status === "qualified"
                                ? "success"
                                : item.status === "proposal"
                                  ? "default"
                                  : "success"
                        }
                      />
                    ),
                  },
                  {
                    key: "actions",
                    header: "",
                    cell: () => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Lead
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Send Email
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invoices">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Invoices</CardTitle>
                <CardDescription>Manage billing and payments</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Invoice
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable
                data={invoices}
                columns={[
                  { key: "id", header: "Invoice #" },
                  { key: "customerName", header: "Customer" },
                  {
                    key: "amount",
                    header: "Amount",
                    cell: (item) => `$${item.amount.toLocaleString()}`,
                  },
                  { key: "dueDate", header: "Due Date", className: "hidden sm:table-cell" },
                  {
                    key: "status",
                    header: "Status",
                    cell: (item) => (
                      <StatusBadge
                        status={item.status}
                        variant={
                          item.status === "paid"
                            ? "success"
                            : item.status === "sent"
                              ? "info"
                              : item.status === "overdue"
                                ? "error"
                                : "default"
                        }
                      />
                    ),
                  },
                  {
                    key: "actions",
                    header: "",
                    cell: () => (
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            View Invoice
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Send className="mr-2 h-4 w-4" />
                            Send Reminder
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ),
                  },
                ]}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
