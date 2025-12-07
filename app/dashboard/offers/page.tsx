"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, Tag, Gift, Percent, Clock, Star, Building2 } from "lucide-react"

const personalizedOffers = [
  {
    id: "1",
    title: "30% Off Premium Services",
    description: "Get 30% off on all premium consulting services. Limited time offer for valued members.",
    business: "TechCorp Solutions",
    discount: 30,
    validUntil: "Dec 31, 2025",
    category: "Technology",
    isNew: true,
  },
  {
    id: "2",
    title: "Free Wellness Consultation",
    description: "Complimentary 30-minute wellness consultation with our expert therapists.",
    business: "Wellness Center",
    discount: 100,
    validUntil: "Jan 15, 2026",
    category: "Health",
    isNew: true,
  },
  {
    id: "3",
    title: "Buy 1 Get 1 Free",
    description: "Purchase any training course and get another one absolutely free.",
    business: "Learning Hub",
    discount: 50,
    validUntil: "Dec 20, 2025",
    category: "Education",
    isNew: false,
  },
  {
    id: "4",
    title: "20% Member Discount",
    description: "Exclusive 20% discount for premium members on all products.",
    business: "Digital Store",
    discount: 20,
    validUntil: "Dec 25, 2025",
    category: "Shopping",
    isNew: false,
  },
]

const exclusiveDeals = [
  {
    id: "1",
    title: "VIP Access - Tech Conference",
    description: "Early bird VIP tickets at 40% off for our premium members.",
    business: "TechEvents Inc",
    discount: 40,
    validUntil: "Dec 15, 2025",
    limited: true,
    spotsLeft: 12,
  },
  {
    id: "2",
    title: "Annual Subscription Deal",
    description: "Get 3 months free when you subscribe to the annual plan.",
    business: "CloudServices Pro",
    discount: 25,
    validUntil: "Jan 1, 2026",
    limited: true,
    spotsLeft: 50,
  },
]

const savedOffers = [
  {
    id: "1",
    title: "15% Off Next Purchase",
    business: "Fashion Outlet",
    discount: 15,
    validUntil: "Dec 31, 2025",
    savedOn: "Dec 1, 2025",
  },
  {
    id: "2",
    title: "Free Shipping",
    business: "Online Marketplace",
    discount: 0,
    validUntil: "Dec 20, 2025",
    savedOn: "Nov 28, 2025",
  },
]

export default function OffersPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Offers" description="Personalized offers and exclusive deals just for you" />

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                <Tag className="h-6 w-6 text-primary" />
              </div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-sm text-muted-foreground">Active Offers</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center mx-auto mb-3">
                <Gift className="h-6 w-6 text-green-500" />
              </div>
              <p className="text-2xl font-bold">$450</p>
              <p className="text-sm text-muted-foreground">Total Savings</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="h-12 w-12 rounded-lg bg-yellow-500/10 flex items-center justify-center mx-auto mb-3">
                <Star className="h-6 w-6 text-yellow-500" />
              </div>
              <p className="text-2xl font-bold">3</p>
              <p className="text-sm text-muted-foreground">Exclusive Deals</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="personalized" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <TabsList>
            <TabsTrigger value="personalized">For You</TabsTrigger>
            <TabsTrigger value="exclusive">Exclusive</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input placeholder="Search offers..." className="pl-9 w-64" />
          </div>
        </div>

        <TabsContent value="personalized">
          <div className="grid gap-4 md:grid-cols-2">
            {personalizedOffers.map((offer) => (
              <Card key={offer.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-2">
                        {offer.isNew && (
                          <Badge variant="default" className="text-xs">
                            New
                          </Badge>
                        )}
                        <Badge variant="secondary" className="text-xs">
                          {offer.category}
                        </Badge>
                      </div>
                      <div className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
                        {offer.discount}% OFF
                      </div>
                    </div>
                    <h3 className="font-semibold text-lg mb-2">{offer.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Building2 className="h-4 w-4" />
                      {offer.business}
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        Valid until {offer.validUntil}
                      </div>
                      <Button size="sm">Claim Offer</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="exclusive">
          <Card>
            <CardHeader>
              <CardTitle>Exclusive Deals</CardTitle>
              <CardDescription>Limited time offers for premium members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exclusiveDeals.map((deal) => (
                  <div key={deal.id} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold">{deal.title}</h4>
                          <Badge variant="destructive" className="text-xs">
                            Limited
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{deal.description}</p>
                        <div className="flex items-center gap-4 text-sm">
                          <span className="text-muted-foreground">{deal.business}</span>
                          <span className="text-primary font-medium">{deal.spotsLeft} spots left</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-md text-lg font-bold mb-2">
                          {deal.discount}% OFF
                        </div>
                        <Button size="sm">Get Deal</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved">
          <Card>
            <CardHeader>
              <CardTitle>Saved Offers</CardTitle>
              <CardDescription>Offers you've saved for later</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {savedOffers.map((offer) => (
                  <div
                    key={offer.id}
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Percent className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{offer.title}</p>
                        <p className="text-sm text-muted-foreground">{offer.business}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right hidden sm:block">
                        <p className="text-sm">Valid until {offer.validUntil}</p>
                        <p className="text-xs text-muted-foreground">Saved on {offer.savedOn}</p>
                      </div>
                      <Button size="sm">Use Now</Button>
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
