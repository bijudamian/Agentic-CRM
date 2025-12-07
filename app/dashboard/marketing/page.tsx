"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatusBadge } from "@/components/ui/status-badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Plus,
  Sparkles,
  Calendar,
  Send,
  CheckCircle2,
  Clock,
  Instagram,
  Facebook,
  MessageCircle,
  Twitter,
  MoreHorizontal,
  Edit,
  Trash2,
  Loader2,
  LayoutDashboard,
  BrainCircuit,
} from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth } from "@/lib/auth-context"
import { MarketingSetup } from "@/components/dashboard/marketing-setup"
import { ResearchTab } from "@/components/dashboard/marketing/research-tab"
import { NanoBananaGenerator } from "@/components/dashboard/marketing/nano-banana-generator"


const contentItems = [
  {
    id: "1",
    title: "New Year Sale Announcement",
    content: "Start the year right with amazing deals...",
    channel: "whatsapp",
    status: "approved",
    scheduledAt: "Jan 1, 2026, 10:00 AM",
    createdAt: "Dec 5, 2025",
  },
  {
    id: "2",
    title: "Product Launch Teaser",
    content: "Something exciting is coming...",
    channel: "instagram",
    status: "pending",
    scheduledAt: null,
    createdAt: "Dec 6, 2025",
  },
  {
    id: "3",
    title: "Customer Success Story",
    content: "See how Company X grew 200%...",
    channel: "facebook",
    status: "draft",
    scheduledAt: null,
    createdAt: "Dec 7, 2025",
  },
  {
    id: "4",
    title: "Holiday Greetings",
    content: "Wishing you a wonderful holiday season...",
    channel: "twitter",
    status: "published",
    scheduledAt: null,
    createdAt: "Dec 1, 2025",
  },
]

const channelIcons = {
  whatsapp: MessageCircle,
  instagram: Instagram,
  facebook: Facebook,
  twitter: Twitter,
}

const channelColors = {
  whatsapp: "text-green-500",
  instagram: "text-pink-500",
  facebook: "text-blue-500",
  twitter: "text-sky-500",
}

export default function MarketingPage() {
  const { businessProfile, loading } = useAuth()
  const [isGenerating, setIsGenerating] = useState(false)

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (!businessProfile?.marketing) {
    return <MarketingSetup />
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Marketing" description="Create and manage your marketing content with AI assistance">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Create Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Create Marketing Content</DialogTitle>
              <DialogDescription>Create AI-generated content for your marketing campaigns</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Enter content title..." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="channel">Channel</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select channel" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="instagram">Instagram</SelectItem>
                    <SelectItem value="facebook">Facebook</SelectItem>
                    <SelectItem value="twitter">Twitter</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="prompt">Describe your content</Label>
                <Textarea id="prompt" placeholder="E.g., Create a promotional post for our holiday sale..." rows={3} />
              </div>
              <Button className="w-full" variant="secondary" onClick={() => setIsGenerating(true)}>
                <Sparkles className="mr-2 h-4 w-4" />
                Generate with AI
              </Button>
              <div className="space-y-2">
                <Label htmlFor="content">Generated Content</Label>
                <Textarea id="content" placeholder="AI-generated content will appear here..." rows={5} />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline">Save as Draft</Button>
              <Button>Submit for Approval</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
          <TabsTrigger value="overview">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="generator">
            <Sparkles className="mr-2 h-4 w-4" />
            Generator
          </TabsTrigger>
          <TabsTrigger value="research">
            <BrainCircuit className="mr-2 h-4 w-4" />
            Research
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mx-auto mb-3">
                    <Clock className="h-6 w-6 text-yellow-500" />
                  </div>
                  <p className="text-2xl font-bold">3</p>
                  <p className="text-sm text-muted-foreground">Pending Approval</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                    <CheckCircle2 className="h-6 w-6 text-green-500" />
                  </div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                    <Calendar className="h-6 w-6 text-blue-500" />
                  </div>
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Scheduled</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Send className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-2xl font-bold">48</p>
                  <p className="text-sm text-muted-foreground">Published</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="all" className="space-y-4">
            <TabsList>
              <TabsTrigger value="all">All Content</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="approved">Approved</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <Card>
                <CardHeader>
                  <CardTitle>Marketing Content</CardTitle>
                  <CardDescription>Manage all your marketing content in one place</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {contentItems.map((item) => {
                      const ChannelIcon = channelIcons[item.channel as keyof typeof channelIcons]
                      return (
                        <div
                          key={item.id}
                          className="flex items-start justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                        >
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-2 rounded-lg bg-muted ${channelColors[item.channel as keyof typeof channelColors]}`}
                            >
                              <ChannelIcon className="h-5 w-5" />
                            </div>
                            <div>
                              <div className="flex items-center gap-2">
                                <p className="font-medium">{item.title}</p>
                                <StatusBadge
                                  status={item.status}
                                  variant={
                                    item.status === "published"
                                      ? "success"
                                      : item.status === "approved"
                                        ? "info"
                                        : item.status === "pending"
                                          ? "warning"
                                          : "default"
                                  }
                                />
                              </div>
                              <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{item.content}</p>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <span>Created: {item.createdAt}</span>
                                {item.scheduledAt && <span>Scheduled: {item.scheduledAt}</span>}
                              </div>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              {item.status === "pending" && (
                                <DropdownMenuItem>
                                  <CheckCircle2 className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                              )}
                              {item.status === "approved" && (
                                <DropdownMenuItem>
                                  <Calendar className="mr-2 h-4 w-4" />
                                  Schedule
                                </DropdownMenuItem>
                              )}
                              <DropdownMenuItem className="text-destructive">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="draft">
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Filter showing draft content only
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="pending">
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Filter showing pending content only
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="approved">
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Filter showing approved content only
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="scheduled">
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  Filter showing scheduled content only
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="generator">
          <NanoBananaGenerator />
        </TabsContent>

        <TabsContent value="research">
          <ResearchTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
