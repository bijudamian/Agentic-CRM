"use client"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Search,
  Users,
  UserPlus,
  MessageCircle,
  Heart,
  MoreHorizontal,
  Globe,
  Lock,
  Calendar,
  MapPin,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const friends = [
  {
    id: "1",
    name: "Alice Johnson",
    status: "online",
    mutualFriends: 12,
    avatar: "/friend-1.jpg",
  },
  {
    id: "2",
    name: "Bob Williams",
    status: "offline",
    mutualFriends: 8,
    avatar: "/friend-2.jpg",
  },
  {
    id: "3",
    name: "Carol Martinez",
    status: "online",
    mutualFriends: 5,
    avatar: "/friend-3.jpg",
  },
  {
    id: "4",
    name: "David Lee",
    status: "away",
    mutualFriends: 3,
    avatar: "/friend-4.jpg",
  },
]

const groups = [
  {
    id: "1",
    name: "Tech Enthusiasts",
    description: "A community for technology lovers",
    members: 1234,
    isPublic: true,
    joined: true,
    avatar: "/group-tech.jpg",
  },
  {
    id: "2",
    name: "Fitness Community",
    description: "Share fitness tips and workouts",
    members: 567,
    isPublic: true,
    joined: true,
    avatar: "/group-fitness.jpg",
  },
  {
    id: "3",
    name: "Book Club",
    description: "Monthly book discussions",
    members: 89,
    isPublic: false,
    joined: false,
    avatar: "/group-books.jpg",
  },
  {
    id: "4",
    name: "Photography",
    description: "Share your best shots",
    members: 432,
    isPublic: true,
    joined: false,
    avatar: "/group-photo.jpg",
  },
]

const suggestions = [
  { id: "1", name: "Emma Davis", mutualFriends: 15, avatar: "/suggestion-1.jpg" },
  { id: "2", name: "Frank Wilson", mutualFriends: 8, avatar: "/suggestion-2.jpg" },
  { id: "3", name: "Grace Taylor", mutualFriends: 6, avatar: "/suggestion-3.jpg" },
]

const upcomingEvents = [
  {
    id: "1",
    title: "Tech Meetup December",
    group: "Tech Enthusiasts",
    date: "Dec 15, 2025",
    location: "Virtual",
    attendees: 45,
  },
  {
    id: "2",
    title: "Fitness Challenge Kickoff",
    group: "Fitness Community",
    date: "Jan 1, 2026",
    location: "City Park",
    attendees: 28,
  },
]

export default function CommunityPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Community" description="Connect with friends and join groups" />

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{friends.length}</p>
              <p className="text-sm text-muted-foreground">Friends</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                <Heart className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Groups Joined</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <MessageCircle className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-2xl font-bold">5</p>
              <p className="text-sm text-muted-foreground">New Messages</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center mx-auto mb-3">
                <Calendar className="h-6 w-6 text-purple-500" />
              </div>
              <p className="text-2xl font-bold">2</p>
              <p className="text-sm text-muted-foreground">Upcoming Events</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="friends" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="friends">Friends</TabsTrigger>
            <TabsTrigger value="groups">Groups</TabsTrigger>
            <TabsTrigger value="events">Events</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search community..." className="pl-9 w-64" />
          </div>
        </div>

        <TabsContent value="friends">
          <div className="grid gap-6 lg:grid-cols-3">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle>Your Friends</CardTitle>
                <CardDescription>People you're connected with</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {friends.map((friend) => (
                    <div key={friend.id} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <Avatar className="h-10 w-10">
                            <AvatarImage src={friend.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {friend.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <span
                            className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                              friend.status === "online"
                                ? "bg-green-500"
                                : friend.status === "away"
                                  ? "bg-yellow-500"
                                  : "bg-gray-400"
                            }`}
                          />
                        </div>
                        <div>
                          <p className="font-medium">{friend.name}</p>
                          <p className="text-sm text-muted-foreground">{friend.mutualFriends} mutual friends</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <MessageCircle className="h-4 w-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Send Message</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Remove Friend</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Suggestions</CardTitle>
                <CardDescription>People you may know</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {suggestions.map((suggestion) => (
                    <div key={suggestion.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={suggestion.avatar || "/placeholder.svg"} />
                          <AvatarFallback>
                            {suggestion.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-sm">{suggestion.name}</p>
                          <p className="text-xs text-muted-foreground">{suggestion.mutualFriends} mutual</p>
                        </div>
                      </div>
                      <Button size="sm" variant="outline">
                        <UserPlus className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="groups">
          <div className="grid gap-4 md:grid-cols-2">
            {groups.map((group) => (
              <Card key={group.id}>
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-14 w-14 rounded-lg">
                      <AvatarImage src={group.avatar || "/placeholder.svg"} />
                      <AvatarFallback className="rounded-lg">{group.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">{group.name}</h4>
                        {group.isPublic ? (
                          <Globe className="h-4 w-4 text-muted-foreground" />
                        ) : (
                          <Lock className="h-4 w-4 text-muted-foreground" />
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{group.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{group.members.toLocaleString()} members</span>
                        <Button size="sm" variant={group.joined ? "secondary" : "default"}>
                          {group.joined ? "Joined" : "Join"}
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="events">
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Community Events</CardTitle>
              <CardDescription>Events from your groups</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div key={event.id} className="p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold mb-1">{event.title}</h4>
                        <p className="text-sm text-muted-foreground mb-2">Hosted by {event.group}</p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {event.date}
                          </div>
                          <div className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            {event.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <Users className="h-4 w-4" />
                            {event.attendees} attending
                          </div>
                        </div>
                      </div>
                      <Button size="sm">RSVP</Button>
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
