"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { StatCard } from "@/components/ui/stat-card"
import { Progress } from "@/components/ui/progress"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Download,
  TrendingUp,
  DollarSign,
  Users,
  Megaphone,
  Star,
  Wallet,
  BarChart3,
  PieChart,
  LineChart,
} from "lucide-react"

const salesData = [
  { month: "Jan", revenue: 45000 },
  { month: "Feb", revenue: 52000 },
  { month: "Mar", revenue: 48000 },
  { month: "Apr", revenue: 61000 },
  { month: "May", revenue: 55000 },
  { month: "Jun", revenue: 67000 },
  { month: "Jul", revenue: 72000 },
  { month: "Aug", revenue: 69000 },
  { month: "Sep", revenue: 78000 },
  { month: "Oct", revenue: 82000 },
  { month: "Nov", revenue: 91000 },
  { month: "Dec", revenue: 128000 },
]

const serviceMetrics = [
  { name: "Web Development", revenue: 45000, sessions: 120, satisfaction: 4.8 },
  { name: "Mobile App Development", revenue: 38000, sessions: 85, satisfaction: 4.6 },
  { name: "UI/UX Design", revenue: 28000, sessions: 95, satisfaction: 4.7 },
  { name: "Consulting", revenue: 17000, sessions: 42, satisfaction: 4.9 },
]

const marketingMetrics = {
  totalCampaigns: 24,
  totalReach: 125000,
  engagement: 8.5,
  conversions: 1250,
}

const walletSummary = {
  totalIncome: 838000,
  totalExpenses: 312000,
  netProfit: 526000,
  pendingPayments: 45000,
}

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader title="Reports & Analytics" description="Comprehensive analytics of all business activities">
        <div className="flex items-center gap-2">
          <Select defaultValue="december">
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="december">December 2025</SelectItem>
              <SelectItem value="november">November 2025</SelectItem>
              <SelectItem value="q4">Q4 2025</SelectItem>
              <SelectItem value="year">Year 2025</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </PageHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Revenue"
          value="$838K"
          icon={DollarSign}
          trend={{ value: 23.5, isPositive: true }}
          description="YTD performance"
        />
        <StatCard
          title="Total Customers"
          value="1,248"
          icon={Users}
          trend={{ value: 18.2, isPositive: true }}
          description="vs last year"
        />
        <StatCard title="Avg. Satisfaction" value="4.7" icon={Star} description="out of 5 stars" />
        <StatCard
          title="Net Profit"
          value="$526K"
          icon={Wallet}
          trend={{ value: 15.8, isPositive: true }}
          description="YTD"
        />
      </div>

      <Tabs defaultValue="sales" className="space-y-4">
        <TabsList>
          <TabsTrigger value="sales" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Sales
          </TabsTrigger>
          <TabsTrigger value="service" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Service
          </TabsTrigger>
          <TabsTrigger value="marketing" className="flex items-center gap-2">
            <Megaphone className="h-4 w-4" />
            Marketing
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="wallet" className="flex items-center gap-2">
            <Wallet className="h-4 w-4" />
            Wallet
          </TabsTrigger>
        </TabsList>

        <TabsContent value="sales">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Trend</CardTitle>
                <CardDescription>Monthly revenue for 2025</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {salesData.slice(-6).map((item) => (
                    <div key={item.month} className="flex items-center gap-4">
                      <span className="w-12 text-sm font-medium">{item.month}</span>
                      <Progress value={(item.revenue / 128000) * 100} className="flex-1 h-3" />
                      <span className="w-20 text-sm text-right">${(item.revenue / 1000).toFixed(0)}K</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Sales Summary</CardTitle>
                <CardDescription>Key metrics overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Deals Closed</p>
                      <p className="text-2xl font-bold">156</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-green-500/10 flex items-center justify-center">
                      <TrendingUp className="h-6 w-6 text-green-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm text-muted-foreground">Average Deal Size</p>
                      <p className="text-2xl font-bold">$5,372</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-blue-500/10 flex items-center justify-center">
                      <DollarSign className="h-6 w-6 text-blue-500" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-muted/50">
                    <div>
                      <p className="text-sm text-muted-foreground">Conversion Rate</p>
                      <p className="text-2xl font-bold">24.8%</p>
                    </div>
                    <div className="h-12 w-12 rounded-lg bg-purple-500/10 flex items-center justify-center">
                      <PieChart className="h-6 w-6 text-purple-500" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="service">
          <Card>
            <CardHeader>
              <CardTitle>Service Performance</CardTitle>
              <CardDescription>Revenue and satisfaction by service type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {serviceMetrics.map((service) => (
                  <div key={service.name} className="p-4 rounded-lg border bg-card">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="font-medium">{service.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                        <span className="font-medium">{service.satisfaction}</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Revenue</p>
                        <p className="text-lg font-bold">${(service.revenue / 1000).toFixed(0)}K</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Sessions</p>
                        <p className="text-lg font-bold">{service.sessions}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="marketing">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{marketingMetrics.totalCampaigns}</p>
                  <p className="text-sm text-muted-foreground">Total Campaigns</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{(marketingMetrics.totalReach / 1000).toFixed(0)}K</p>
                  <p className="text-sm text-muted-foreground">Total Reach</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{marketingMetrics.engagement}%</p>
                  <p className="text-sm text-muted-foreground">Engagement Rate</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="text-center">
                  <p className="text-3xl font-bold">{marketingMetrics.conversions.toLocaleString()}</p>
                  <p className="text-sm text-muted-foreground">Conversions</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardContent className="py-12 text-center text-muted-foreground">
              Feedback analytics and trends visualization
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="wallet">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Financial Summary</CardTitle>
                <CardDescription>Year-to-date overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-green-500/10">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Income</p>
                      <p className="text-2xl font-bold text-green-500">
                        ${(walletSummary.totalIncome / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-red-500/10">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Expenses</p>
                      <p className="text-2xl font-bold text-red-500">
                        ${(walletSummary.totalExpenses / 1000).toFixed(0)}K
                      </p>
                    </div>
                    <LineChart className="h-8 w-8 text-red-500" />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-primary/10">
                    <div>
                      <p className="text-sm text-muted-foreground">Net Profit</p>
                      <p className="text-2xl font-bold text-primary">${(walletSummary.netProfit / 1000).toFixed(0)}K</p>
                    </div>
                    <Wallet className="h-8 w-8 text-primary" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>Outstanding receivables</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-center h-48">
                  <div className="text-center">
                    <p className="text-4xl font-bold">${(walletSummary.pendingPayments / 1000).toFixed(0)}K</p>
                    <p className="text-muted-foreground mt-2">Awaiting collection</p>
                    <Button className="mt-4">View Details</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
