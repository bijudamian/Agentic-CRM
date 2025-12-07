"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/ui/stat-card"
import { StatusBadge } from "@/components/ui/status-badge"
import { Search, ShoppingBag, Calendar, Ticket, MoreHorizontal, Eye, Download, MapPin, Clock } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const purchases = [
  {
    id: "ORD-001",
    item: "Enterprise License",
    vendor: "TechCorp Solutions",
    amount: 999,
    date: "Dec 5, 2025",
    status: "completed",
  },
  {
    id: "ORD-002",
    item: "Annual Subscription",
    vendor: "Wellness Center",
    amount: 299,
    date: "Nov 28, 2025",
    status: "completed",
  },
  {
    id: "ORD-003",
    item: "Training Workshop",
    vendor: "Learning Hub",
    amount: 149,
    date: "Nov 15, 2025",
    status: "completed",
  },
  {
    id: "ORD-004",
    item: "Consulting Package",
    vendor: "Business Advisors",
    amount: 500,
    date: "Oct 20, 2025",
    status: "refunded",
  },
]

const bookings = [
  {
    id: "BK-001",
    service: "Spa Treatment",
    vendor: "Wellness Center",
    date: "Dec 10, 2025",
    time: "2:00 PM",
    status: "confirmed",
  },
  {
    id: "BK-002",
    service: "Dental Checkup",
    vendor: "SmileCare Clinic",
    date: "Dec 15, 2025",
    time: "10:30 AM",
    status: "pending",
  },
  {
    id: "BK-003",
    service: "Personal Training",
    vendor: "FitLife Gym",
    date: "Dec 8, 2025",
    time: "6:00 PM",
    status: "confirmed",
  },
]

const events = [
  {
    id: "EVT-001",
    name: "Tech Conference 2025",
    location: "Convention Center, NYC",
    date: "Dec 20, 2025",
    time: "9:00 AM",
    status: "registered",
  },
  {
    id: "EVT-002",
    name: "AI Workshop",
    location: "Online",
    date: "Dec 18, 2025",
    time: "2:00 PM",
    status: "registered",
  },
  {
    id: "EVT-003",
    name: "Networking Mixer",
    location: "Sky Lounge, Manhattan",
    date: "Jan 5, 2026",
    time: "7:00 PM",
    status: "pending",
  },
]

export default function ActivitiesPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Activities" description="Track your purchases, bookings, and events" />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Purchases" value="23" icon={ShoppingBag} description="this year" />
        <StatCard title="Active Bookings" value="3" icon={Calendar} description="upcoming" />
        <StatCard title="Events Registered" value="5" icon={Ticket} description="this month" />
        <StatCard title="Total Spent" value="$4.2K" icon={ShoppingBag} description="this year" />
      </div>

      <Tabs defaultValue="purchases" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="purchases" className="flex items-center gap-2">
              <ShoppingBag className="h-4 w-4" />
              Purchases
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Bookings
            </TabsTrigger>
            <TabsTrigger value="events" className="flex items-center gap-2">
              <Ticket className="h-4 w-4" />
              Events
            </TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search activities..." className="pl-9 w-64" />
          </div>
        </div>

        <TabsContent value="purchases">
          <Card>
            <CardHeader>
              <CardTitle>Purchase History</CardTitle>
              <CardDescription>All your transactions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {purchases.map((purchase) => (
                  <div
                    key={purchase.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <ShoppingBag className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{purchase.item}</p>
                        <p className="text-sm text-muted-foreground">{purchase.vendor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="font-medium">${purchase.amount}</p>
                        <p className="text-xs text-muted-foreground">{purchase.date}</p>
                      </div>
                      <StatusBadge
                        status={purchase.status}
                        variant={purchase.status === "completed" ? "success" : "warning"}
                      />
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
                            <Download className="mr-2 h-4 w-4" />
                            Download Receipt
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bookings">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Bookings</CardTitle>
              <CardDescription>Your scheduled appointments and services</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {bookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center">
                        <Calendar className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="font-medium">{booking.service}</p>
                        <p className="text-sm text-muted-foreground">{booking.vendor}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="font-medium">{booking.date}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {booking.time}
                        </div>
                      </div>
                      <StatusBadge
                        status={booking.status}
                        variant={booking.status === "confirmed" ? "success" : "warning"}
                      />
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Registered Events</CardTitle>
              <CardDescription>Events you've signed up for</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                        <Ticket className="h-5 w-5 text-purple-500" />
                      </div>
                      <div>
                        <p className="font-medium">{event.name}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <MapPin className="h-3 w-3" />
                          {event.location}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="font-medium">{event.date}</p>
                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock className="h-3 w-3" />
                          {event.time}
                        </div>
                      </div>
                      <StatusBadge
                        status={event.status}
                        variant={event.status === "registered" ? "success" : "warning"}
                      />
                      <Button variant="outline" size="sm">
                        View
                      </Button>
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
