"use client"

import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Switch } from "@/components/ui/switch"
import { Mail, Phone, MapPin, Calendar, Upload, Edit, Bell, Shield, Heart } from "lucide-react"

const preferences = [
  { id: "1", category: "Technology", enabled: true },
  { id: "2", category: "Health & Wellness", enabled: true },
  { id: "3", category: "Food & Dining", enabled: false },
  { id: "4", category: "Travel", enabled: true },
  { id: "5", category: "Entertainment", enabled: false },
]

export function PersonalProfile() {
  return (
    <div className="space-y-6">
      <PageHeader title="Personal Profile" description="Manage your personal information and preferences">
        <Button>
          <Edit className="mr-2 h-4 w-4" />
          Edit Profile
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src="/user-avatar.png" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">John Doe</h3>
              <p className="text-sm text-muted-foreground">ID: USR-2024-001</p>
              <Badge className="mt-2" variant="secondary">
                Premium Member
              </Badge>
              <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                <Upload className="mr-2 h-4 w-4" />
                Change Photo
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>john.doe@example.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 987-6543</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>New York, USA</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>Member since Jan 2024</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <Tabs defaultValue="personal" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="personal">Personal Info</TabsTrigger>
                <TabsTrigger value="preferences">Preferences</TabsTrigger>
                <TabsTrigger value="notifications">Notifications</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="personal" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" defaultValue="John" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" defaultValue="Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" defaultValue="john.doe@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" defaultValue="+1 (555) 987-6543" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" defaultValue="456 Park Avenue, Apt 12B, New York, NY 10022" />
                  </div>
                </div>
                <Button>Save Changes</Button>
              </TabsContent>

              <TabsContent value="preferences" className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Interest Categories</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select categories to receive personalized offers and recommendations
                  </p>
                </div>
                <div className="space-y-4">
                  {preferences.map((pref) => (
                    <div key={pref.id} className="flex items-center justify-between p-3 rounded-lg border bg-card">
                      <div className="flex items-center gap-3">
                        <Heart className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{pref.category}</span>
                      </div>
                      <Switch defaultChecked={pref.enabled} />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="notifications" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Bell className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive push notifications on your device</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates via email</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="font-medium">Security Alerts</p>
                        <p className="text-sm text-muted-foreground">Get notified about security events</p>
                      </div>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
    </div>
  )
}
