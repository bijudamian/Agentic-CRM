import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PageHeader } from "@/components/ui/page-header"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Mail, Phone, MapPin, Globe, CreditCard, Upload, Plus, Trash2, Edit } from "lucide-react"
import { useAuth } from "@/lib/auth-context"
import { businessDetailsSchema, type BusinessDetailsFormData } from "@/lib/schemas"
import { toast } from "sonner"
import type { BusinessCategory } from "@/lib/types"
import { updateBusinessProfile } from "@/lib/firestore"

const bankAccounts = [
  { id: "1", bankName: "Chase Bank", accountNumber: "****4532", type: "Checking", isPrimary: true },
  { id: "2", bankName: "Bank of America", accountNumber: "****7891", type: "Savings", isPrimary: false },
]

/**
 * Component for converting and managing business profile settings.
 * Includes tabs for general info, banking details, and other settings.
 */
export function BusinessProfile() {
  const { user, businessProfile, refreshBusinessProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BusinessDetailsFormData>({
    resolver: zodResolver(businessDetailsSchema),
    defaultValues: {
      businessName: businessProfile?.businessName || "",
      street: businessProfile?.address?.street || "",
      city: businessProfile?.address?.city || "",
      state: businessProfile?.address?.state || "",
      zipCode: businessProfile?.address?.zipCode || "",
      country: businessProfile?.address?.country || "",
      category: businessProfile?.category || "other",
      niche: businessProfile?.niche || "",
    },
  })

  // If loading or no profile, show loading state (simplification)
  if (!businessProfile) {
    return <div>Loading business profile...</div>
  }

  const onSubmit = async (data: BusinessDetailsFormData) => {
    if (!user) return
    setIsLoading(true)
    try {
      await updateBusinessProfile(user.uid, {
        businessName: data.businessName,
        address: {
          street: data.street,
          city: data.city,
          state: data.state,
          zipCode: data.zipCode,
          country: data.country
        },
        category: data.category as BusinessCategory,
        niche: data.niche
      })
      await refreshBusinessProfile()
      toast.success("Profile updated successfully")
      setIsEditing(false)
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <PageHeader title="Business Profile" description="Manage your business information and settings">
        <Button onClick={() => setIsEditing(!isEditing)} variant={isEditing ? "outline" : "default"}>
          <Edit className="mr-2 h-4 w-4" />
          {isEditing ? "Cancel Edit" : "Edit Profile"}
        </Button>
      </PageHeader>

      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardContent className="pt-6">
            <div className="flex flex-col items-center text-center">
              <Avatar className="h-24 w-24 mb-4">
                <AvatarImage src={`/.jpg?height=96&width=96&query=${businessProfile.businessName}`} />
                <AvatarFallback>{businessProfile.businessName?.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <h3 className="text-xl font-semibold">{businessProfile.businessName}</h3>
              <p className="text-sm text-muted-foreground">ID: {user?.uid?.substring(0, 8)}</p>
              <Badge className="mt-2" variant="secondary">
                {businessProfile.category}
              </Badge>
              <Button variant="outline" size="sm" className="mt-4 bg-transparent">
                <Upload className="mr-2 h-4 w-4" />
                Change Logo
              </Button>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <span>{businessProfile.email}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <span>+1 (555) 000-0000</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <span>{businessProfile.address.city}, {businessProfile.address.country}</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Globe className="h-4 w-4 text-muted-foreground" />
                <span>www.{businessProfile.businessName.toLowerCase().replace(/\s+/g, '')}.com</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <Tabs defaultValue="general" className="w-full">
            <CardHeader>
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="general">General</TabsTrigger>
                <TabsTrigger value="banking">Banking</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>
            </CardHeader>
            <CardContent>
              <TabsContent value="general" className="space-y-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        {...register("businessName")}
                        disabled={!isEditing}
                      />
                      {errors.businessName && (
                        <p className="text-sm text-red-500">{errors.businessName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="niche">Niche</Label>
                      <Input
                        id="niche"
                        {...register("niche")}
                        disabled={!isEditing}
                      />
                      {errors.niche && (
                        <p className="text-sm text-red-500">{errors.niche.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" value={businessProfile.email} disabled />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+1 (555) 000-0000" disabled={!isEditing} />
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="street">Street Address</Label>
                      <Input
                        id="street"
                        {...register("street")}
                        disabled={!isEditing}
                      />
                      {errors.street && (
                        <p className="text-sm text-red-500">{errors.street.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        {...register("city")}
                        disabled={!isEditing}
                      />
                      {errors.city && (
                        <p className="text-sm text-red-500">{errors.city.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input
                        id="state"
                        {...register("state")}
                        disabled={!isEditing}
                      />
                      {errors.state && (
                        <p className="text-sm text-red-500">{errors.state.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">Zip Code</Label>
                      <Input
                        id="zipCode"
                        {...register("zipCode")}
                        disabled={!isEditing}
                      />
                      {errors.zipCode && (
                        <p className="text-sm text-red-500">{errors.zipCode.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input
                        id="country"
                        {...register("country")}
                        disabled={!isEditing}
                      />
                      {errors.country && (
                        <p className="text-sm text-red-500">{errors.country.message}</p>
                      )}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Business Description</Label>
                      <Textarea
                        id="description"
                        defaultValue="We provide cutting-edge technology solutions for businesses of all sizes."
                        rows={4}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                  {isEditing && (
                    <Button type="submit" className="mt-4" disabled={isLoading}>
                      {isLoading ? "Saving..." : "Save Changes"}
                    </Button>
                  )}
                </form>
              </TabsContent>

              <TabsContent value="banking" className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Bank Accounts</h4>
                    <p className="text-sm text-muted-foreground">Manage your linked bank accounts</p>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Add Account
                  </Button>
                </div>

                <div className="space-y-3">
                  {bankAccounts.map((account) => (
                    <div key={account.id} className="flex items-center justify-between p-4 rounded-lg border bg-card">
                      <div className="flex items-center gap-4">
                        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                          <CreditCard className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{account.bankName}</p>
                            {account.isPrimary && (
                              <Badge variant="secondary" className="text-xs">
                                Primary
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">
                            {account.type} · {account.accountNumber}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Receive email updates about your business</p>
                    </div>
                    <Button variant="outline">Configure</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">API Access</p>
                      <p className="text-sm text-muted-foreground">Manage API keys and integrations</p>
                    </div>
                    <Button variant="outline">Manage</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">Data Export</p>
                      <p className="text-sm text-muted-foreground">Export your business data</p>
                    </div>
                    <Button variant="outline">Export</Button>
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
