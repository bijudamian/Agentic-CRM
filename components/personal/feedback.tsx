"use client"

import { useState } from "react"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, MessageSquare, ThumbsUp, Plus, Building2 } from "lucide-react"

const pendingReviews = [
  {
    id: "1",
    service: "Web Development Project",
    business: "TechCorp Solutions",
    date: "Dec 5, 2025",
    type: "service",
  },
  { id: "2", service: "Spa Treatment", business: "Wellness Center", date: "Dec 3, 2025", type: "service" },
]

const submittedReviews = [
  {
    id: "1",
    service: "Consulting Session",
    business: "Business Advisors",
    date: "Nov 28, 2025",
    rating: 5,
    comment: "Excellent advice and very professional service.",
  },
  {
    id: "2",
    service: "Training Course",
    business: "Learning Hub",
    date: "Nov 15, 2025",
    rating: 4,
    comment: "Great content but could be more interactive.",
  },
  {
    id: "3",
    service: "Annual Subscription",
    business: "CloudServices Pro",
    date: "Oct 20, 2025",
    rating: 5,
    comment: "Best value for money. Highly recommended!",
  },
]

/**
 * Component for users to provide feedback on services and the app.
 * Allows rating services and writing reviews.
 */
export function PersonalFeedback() {
  const [selectedRating, setSelectedRating] = useState(0)
  const [hoverRating, setHoverRating] = useState(0)

  return (
    <div className="space-y-6">
      <PageHeader title="Feedback" description="Rate services and share your experiences">
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              App Feedback
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>App Feedback</DialogTitle>
              <DialogDescription>Help us improve by sharing your thoughts about the app</DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>How would you rate your overall experience?</Label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setSelectedRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-1"
                    >
                      <Star
                        className={`h-8 w-8 ${star <= (hoverRating || selectedRating)
                            ? "fill-yellow-500 text-yellow-500"
                            : "text-muted-foreground/30"
                          }`}
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="feedback">Your Feedback</Label>
                <Textarea id="feedback" placeholder="Tell us what you think..." rows={4} />
              </div>
            </div>
            <DialogFooter>
              <Button>Submit Feedback</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold">4.7</p>
              <p className="text-sm text-muted-foreground">Avg. Rating Given</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">{submittedReviews.length}</p>
              <p className="text-sm text-muted-foreground">Reviews Given</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center mx-auto mb-3">
                <ThumbsUp className="h-6 w-6 text-blue-500" />
              </div>
              <p className="text-2xl font-bold">{pendingReviews.length}</p>
              <p className="text-sm text-muted-foreground">Pending Reviews</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending Reviews</TabsTrigger>
          <TabsTrigger value="submitted">My Reviews</TabsTrigger>
        </TabsList>

        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Reviews</CardTitle>
              <CardDescription>Services waiting for your feedback</CardDescription>
            </CardHeader>
            <CardContent>
              {pendingReviews.length > 0 ? (
                <div className="space-y-4">
                  {pendingReviews.map((review) => (
                    <div key={review.id} className="p-4 rounded-lg border bg-card">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-medium">{review.service}</p>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                            <Building2 className="h-4 w-4" />
                            {review.business}
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">Completed: {review.date}</p>
                        </div>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm">Leave Review</Button>
                          </DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Review {review.service}</DialogTitle>
                              <DialogDescription>Share your experience with {review.business}</DialogDescription>
                            </DialogHeader>
                            <div className="space-y-4 py-4">
                              <div className="space-y-2">
                                <Label>Rating</Label>
                                <div className="flex gap-1">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                      key={star}
                                      type="button"
                                      onClick={() => setSelectedRating(star)}
                                      onMouseEnter={() => setHoverRating(star)}
                                      onMouseLeave={() => setHoverRating(0)}
                                      className="p-1"
                                    >
                                      <Star
                                        className={`h-8 w-8 ${star <= (hoverRating || selectedRating)
                                            ? "fill-yellow-500 text-yellow-500"
                                            : "text-muted-foreground/30"
                                          }`}
                                      />
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="comment">Your Review</Label>
                                <Textarea id="comment" placeholder="Tell us about your experience..." rows={4} />
                              </div>
                            </div>
                            <DialogFooter>
                              <Button>Submit Review</Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">No pending reviews</div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="submitted">
          <Card>
            <CardHeader>
              <CardTitle>Your Reviews</CardTitle>
              <CardDescription>Reviews you've submitted</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {submittedReviews.map((review) => (
                  <div key={review.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="font-medium">{review.service}</p>
                        <div className="flex items-center gap-1 text-sm text-muted-foreground">
                          <Building2 className="h-4 w-4" />
                          {review.business}
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < review.rating ? "fill-yellow-500 text-yellow-500" : "text-muted-foreground/30"}`}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm mb-2">{review.comment}</p>
                    <p className="text-xs text-muted-foreground">{review.date}</p>
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
