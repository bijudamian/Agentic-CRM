"use client"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Plus,
  Search,
  Users,
  Calendar,
  DollarSign,
  ClipboardList,
  MoreHorizontal,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const employees = [
  {
    id: "1",
    name: "Sarah Miller",
    email: "sarah@techcorp.com",
    role: "Senior Developer",
    department: "Engineering",
    status: "active",
    avatar: "/professional-woman-diverse.png",
  },
  {
    id: "2",
    name: "James Wilson",
    email: "james@techcorp.com",
    role: "Designer",
    department: "Design",
    status: "active",
    avatar: "/professional-man.jpg",
  },
  {
    id: "3",
    name: "Emily Chen",
    email: "emily@techcorp.com",
    role: "Marketing Manager",
    department: "Marketing",
    status: "active",
    avatar: "/asian-woman-professional.png",
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael@techcorp.com",
    role: "Sales Rep",
    department: "Sales",
    status: "inactive",
    avatar: "/professional-man-glasses.png",
  },
]

const tasks = [
  {
    id: "1",
    title: "Complete project proposal",
    assignee: "Sarah Miller",
    dueDate: "Dec 10, 2025",
    status: "in-progress",
    priority: "high",
  },
  {
    id: "2",
    title: "Design new landing page",
    assignee: "James Wilson",
    dueDate: "Dec 12, 2025",
    status: "pending",
    priority: "medium",
  },
  {
    id: "3",
    title: "Marketing campaign review",
    assignee: "Emily Chen",
    dueDate: "Dec 8, 2025",
    status: "completed",
    priority: "high",
  },
  {
    id: "4",
    title: "Client presentation",
    assignee: "Michael Brown",
    dueDate: "Dec 15, 2025",
    status: "pending",
    priority: "low",
  },
]

const attendance = [
  { id: "1", name: "Sarah Miller", checkIn: "09:00 AM", checkOut: "06:00 PM", status: "present", hoursWorked: 9 },
  { id: "2", name: "James Wilson", checkIn: "09:15 AM", checkOut: "05:45 PM", status: "present", hoursWorked: 8.5 },
  { id: "3", name: "Emily Chen", checkIn: "08:45 AM", checkOut: "-", status: "present", hoursWorked: 0 },
  { id: "4", name: "Michael Brown", checkIn: "-", checkOut: "-", status: "absent", hoursWorked: 0 },
]

const payroll = [
  { id: "1", name: "Sarah Miller", baseSalary: 8000, incentives: 1200, deductions: 800, netPay: 8400 },
  { id: "2", name: "James Wilson", baseSalary: 6500, incentives: 800, deductions: 650, netPay: 6650 },
  { id: "3", name: "Emily Chen", baseSalary: 7000, incentives: 1500, deductions: 700, netPay: 7800 },
  { id: "4", name: "Michael Brown", baseSalary: 5500, incentives: 500, deductions: 550, netPay: 5450 },
]

export default function EmployeesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Employees" description="Manage your team members and their activities">
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Add Employee
        </Button>
      </PageHeader>

      <Tabs defaultValue="directory" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="directory" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Directory
            </TabsTrigger>
            <TabsTrigger value="tasks" className="flex items-center gap-2">
              <ClipboardList className="h-4 w-4" />
              Tasks
            </TabsTrigger>
            <TabsTrigger value="attendance" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Attendance
            </TabsTrigger>
            <TabsTrigger value="payroll" className="flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Payroll
            </TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search employees..." className="pl-9 w-64" />
          </div>
        </div>

        <TabsContent value="directory">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {employees.map((employee) => (
              <Card key={employee.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={employee.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {employee.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{employee.name}</h4>
                        <p className="text-sm text-muted-foreground">{employee.role}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>View Profile</DropdownMenuItem>
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Assign Task</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Department</span>
                      <span>{employee.department}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Email</span>
                      <span className="truncate max-w-[150px]">{employee.email}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Status</span>
                      <StatusBadge
                        status={employee.status}
                        variant={employee.status === "active" ? "success" : "error"}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tasks">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Task Assignments</CardTitle>
                <CardDescription>Track and manage employee tasks</CardDescription>
              </div>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div key={task.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          task.status === "completed"
                            ? "bg-green-500/10"
                            : task.status === "in-progress"
                              ? "bg-blue-500/10"
                              : "bg-yellow-500/10"
                        }`}
                      >
                        {task.status === "completed" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : task.status === "in-progress" ? (
                          <Clock className="h-4 w-4 text-blue-500" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{task.title}</p>
                        <p className="text-sm text-muted-foreground">Assigned to: {task.assignee}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm">Due: {task.dueDate}</p>
                        <StatusBadge
                          status={task.priority}
                          variant={task.priority === "high" ? "error" : task.priority === "medium" ? "warning" : "info"}
                        />
                      </div>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Today's Attendance</CardTitle>
              <CardDescription>December 7, 2025</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {attendance.map((record) => (
                  <div key={record.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full ${
                          record.status === "present" ? "bg-green-500/10" : "bg-red-500/10"
                        }`}
                      >
                        {record.status === "present" ? (
                          <CheckCircle2 className="h-4 w-4 text-green-500" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-500" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">{record.name}</p>
                        <StatusBadge
                          status={record.status}
                          variant={record.status === "present" ? "success" : "error"}
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-8 text-sm">
                      <div className="text-center hidden sm:block">
                        <p className="text-muted-foreground">Check In</p>
                        <p className="font-medium">{record.checkIn}</p>
                      </div>
                      <div className="text-center hidden sm:block">
                        <p className="text-muted-foreground">Check Out</p>
                        <p className="font-medium">{record.checkOut}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-muted-foreground">Hours</p>
                        <p className="font-medium">{record.hoursWorked}h</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payroll">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Payroll & Incentives</CardTitle>
                <CardDescription>December 2025 payroll summary</CardDescription>
              </div>
              <Button variant="outline">Process Payroll</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payroll.map((record) => (
                  <div key={record.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-medium">{record.name}</p>
                      <p className="text-lg font-bold text-primary">${record.netPay.toLocaleString()}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Base Salary</p>
                        <p className="font-medium">${record.baseSalary.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Incentives</p>
                        <p className="font-medium text-green-500">+${record.incentives.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Deductions</p>
                        <p className="font-medium text-red-500">-${record.deductions.toLocaleString()}</p>
                      </div>
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
