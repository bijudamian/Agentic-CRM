"use client"

import { PageHeader } from "@/components/ui/page-header"
import { StatCard } from "@/components/ui/stat-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/ui/status-badge"
import { ShoppingBag, Calendar, Tag, Heart, ArrowRight, Star, Clock } from "lucide-react"

const recentActivities = [
  {
    id: "1",
    type: "purchase",
    title: "Premium Subscription",
    description: "Annual plan renewed",
    date: "Dec 5, 2025",
    status: "completed",
  },
  {
    id: "2",
    type: "booking",
    title: "Spa Appointment",
    description: "Full body massage - 90 mins",
    date: "Dec 10, 2025",
    status: "upcoming",
  },
  {
    id: "3",
    type: "event",
    title: "Workshop: AI Basics",
    description: "Online webinar",
    date: "Dec 15, 2025",
    status: "upcoming",
  },
]

const personalizedOffers = [
  {
    id: "1",
    title: "20% Off Spa Services",
    business: "Wellness Center",
    validUntil: "Dec 31, 2025",
    discount: 20,
  },
  {
    id: "2",
    title: "Free Consultation",
    business: "Tech Solutions Inc",
    validUntil: "Jan 15, 2026",
    discount: 100,
  },
  {
    id: "3",
    title: "Buy 1 Get 1 Free",
    business: "Coffee House",
    validUntil: "Dec 20, 2025",
    discount: 50,
  },
]

const communityGroups = [
  { id: "1", name: "Tech Enthusiasts", members: 1234, joined: true },
  { id: "2", name: "Fitness Community", members: 567, joined: true },
  { id: "3", name: "Book Club", members: 89, joined: false },
]

/**
 * Main dashboard view for personal accounts.
 * Displays personal activities, offers, and community groups.
 * 
 * @returns The rendered personal dashboard component.
 */
export function PersonalDashboard() {
  return (
    <div className="space-y-6">
      <PageHeader title="Personal Dashboard" description="Welcome back! Here's what's happening in your world." />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total Purchases" value="23" icon={ShoppingBag} description="This year" />
        <StatCard title="Upcoming Events" value="5" icon={Calendar} description="Next 30 days" />
        <StatCard title="Active Offers" value="8" icon={Tag} description="Personalized for you" />
        <StatCard title="Communities" value="4" icon={Heart} description="Groups joined" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Activities</CardTitle>
              <CardDescription>Your purchases and bookings</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start gap-4 p-3 rounded-lg bg-muted/50">
                  <div
                    className={`p-2 rounded-lg ${activity.type === "purchase"
                        ? "bg-green-500/10"
                        : activity.type === "booking"
                          ? "bg-blue-500/10"
                          : "bg-purple-500/10"
                      }`}
                  >
                    {activity.type === "purchase" ? (
                      <ShoppingBag className="h-4 w-4 text-green-500" />
                    ) : activity.type === "booking" ? (
                      <Calendar className="h-4 w-4 text-blue-500" />
                    ) : (
                      <Star className="h-4 w-4 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <p className="font-medium text-sm">{activity.title}</p>
                      <StatusBadge
                        status={activity.status}
                        variant={activity.status === "completed" ? "success" : "info"}
                      />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">{activity.description}</p>
                    <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {activity.date}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Personalized Offers</CardTitle>
              <CardDescription>Exclusive deals for you</CardDescription>
            </div>
            <Button variant="ghost" size="sm">
              View all
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {personalizedOffers.map((offer) => (
                <div key={offer.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium">{offer.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{offer.business}</p>
                    </div>
                    <div className="bg-primary/10 text-primary px-2 py-1 rounded-md text-sm font-medium">
                      {offer.discount}% OFF
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <span className="text-xs text-muted-foreground">Valid until {offer.validUntil}</span>
                    <Button size="sm" variant="outline">
                      Claim
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Your Communities</CardTitle>
            <CardDescription>Groups you're part of</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            Explore More
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {communityGroups.map((group) => (
              <div key={group.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">{group.name}</p>
                    <p className="text-xs text-muted-foreground">{group.members.toLocaleString()} members</p>
                  </div>
                </div>
                <Button className="w-full mt-4" variant={group.joined ? "secondary" : "default"} size="sm">
                  {group.joined ? "Joined" : "Join"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
