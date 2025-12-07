"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { StatCard } from "@/components/ui/stat-card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Search, Star, ThumbsUp, MessageSquare, TrendingUp, Filter } from "lucide-react"

const feedbackStats = {
  averageRating: 4.6,
  totalReviews: 248,
  positivePercentage: 92,
  responseRate: 85,
}

const ratingDistribution = [
  { stars: 5, count: 156, percentage: 63 },
  { stars: 4, count: 52, percentage: 21 },
  { stars: 3, count: 25, percentage: 10 },
  { stars: 2, count: 10, percentage: 4 },
  { stars: 1, count: 5, percentage: 2 },
]

const recentFeedback = [
  {
    id: "1",
    customerName: "Alice Johnson",
    service: "Web Development",
    rating: 5,
    comment: "Excellent work! The team delivered beyond expectations. Highly recommended.",
    date: "Dec 6, 2025",
    responded: true,
  },
  {
    id: "2",
    customerName: "Bob Williams",
    service: "UI/UX Design",
    rating: 4,
    comment: "Great design work, minor revisions needed but overall satisfied.",
    date: "Dec 5, 2025",
    responded: true,
  },
  {
    id: "3",
    customerName: "Carol Martinez",
    service: "Consulting",
    rating: 5,
    comment: "Very insightful consultation. Helped us identify key areas for improvement.",
    date: "Dec 4, 2025",
    responded: false,
  },
  {
    id: "4",
    customerName: "David Lee",
    service: "Mobile App Development",
    rating: 3,
    comment: "Good work but took longer than expected. Communication could be better.",
    date: "Dec 3, 2025",
    responded: true,
  },
]

export function BusinessFeedback() {
  return (
    <div className="space-y-6">
      <PageHeader title="Feedback & Reviews" description="Monitor customer satisfaction and ratings">
        <Button variant="outline">
          <Filter className="mr-2 h-4 w-4" />
          Filter
        </Button>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Average Rating" value={feedbackStats.averageRating} icon={Star} description="out of 5 stars" />
        <StatCard
          title="Total Reviews"
          value={feedbackStats.totalReviews}
          icon={MessageSquare}
          trend={{ value: 12, isPositive: true }}
          description="this month"
        />
        <StatCard
          title="Positive Feedback"
          value={`${feedbackStats.positivePercentage}%`}
          icon={ThumbsUp}
          description="4+ star ratings"
        />
        <StatCard
          title="Response Rate"
          value={`${feedbackStats.responseRate}%`}
          icon={TrendingUp}
          description="reviews responded"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>Breakdown of customer ratings</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {ratingDistribution.map((rating) => (
                <div key={rating.stars} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-16">
                    <span className="text-sm font-medium">{rating.stars}</span>
                    <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                  </div>
                  <Progress value={rating.percentage} className="flex-1 h-2" />
                  <span className="text-sm text-muted-foreground w-12">{rating.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Feedback</CardTitle>
              <CardDescription>Latest customer reviews</CardDescription>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search reviews..." className="pl-9 w-48" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentFeedback.map((feedback) => (
                <div key={feedback.id} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`/.jpg?height=40&width=40&query=${feedback.customerName}`}
                        />
                        <AvatarFallback>
                          {feedback.customerName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-medium">{feedback.customerName}</p>
                        <p className="text-sm text-muted-foreground">{feedback.service}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${i < feedback.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"}`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-3 text-sm">{feedback.comment}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">{feedback.date}</span>
                    {feedback.responded ? (
                      <span className="text-xs text-green-500 flex items-center gap-1">
                        <ThumbsUp className="h-3 w-3" />
                        Responded
                      </span>
                    ) : (
                      <Button size="sm" variant="outline">
                        Respond
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
