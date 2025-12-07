"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, Rocket, Target, DollarSign, Share2, BarChart2 } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/lib/auth-context"
import { updateBusinessProfile } from "@/lib/firestore"
import { toast } from "sonner"

const marketingSchema = z.object({
    goal: z.string().min(1, "Please select a primary goal"),
    budget: z.string().min(1, "Please enter your budget"),
    channels: z.array(z.string()).min(1, "Select at least one channel"),
    tools: z.array(z.string()).min(1, "Select at least one tool"),
})

type MarketingFormData = z.infer<typeof marketingSchema>

/**
 * Component for setting up the business marketing profile.
 * Collects goals, budget, channels, and tools.
 */
export function MarketingSetup() {
    const { user, refreshBusinessProfile } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = useForm<MarketingFormData>({
        resolver: zodResolver(marketingSchema),
        defaultValues: {
            channels: [],
            tools: [],
        },
    })

    // Watch array fields for manual checkbox handling if needed
    const selectedChannels = watch("channels")
    const selectedTools = watch("tools")

    const onSubmit = async (data: MarketingFormData) => {
        if (!user) return

        setIsLoading(true)
        try {
            // Update the business profile in Firestore with marketing data
            await updateBusinessProfile(user.uid, {
                marketing: data,
            })
            // Refresh local profile state to reflect changes
            await refreshBusinessProfile()
            toast.success("Marketing profile set up successfully!")
        } catch (error) {
            console.error("Error updating profile:", error)
            toast.error("Failed to save marketing settings")
        } finally {
            setIsLoading(false)
        }
    }

    const handleCheckboxChange = (field: "channels" | "tools", value: string, checked: boolean) => {
        const current = field === "channels" ? selectedChannels : selectedTools
        if (checked) {
            setValue(field, [...current, value])
        } else {
            setValue(
                field,
                current.filter((item) => item !== value)
            )
        }
    }

    return (
        <Card className="max-w-2xl mx-auto border-dashed">
            <CardHeader className="text-center">
                <div className="mx-auto w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Rocket className="w-6 h-6 text-primary" />
                </div>
                <CardTitle className="text-2xl">Setup Marketing Analytics</CardTitle>
                <CardDescription>
                    Tell us about your marketing goals to get personalized insights and content recommendations.
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
                <CardContent className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid gap-2">
                            <Label>Primary Marketing Goal</Label>
                            <Select onValueChange={(val) => setValue("goal", val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your main objective" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="brand_awareness">Brand Awareness</SelectItem>
                                    <SelectItem value="lead_generation">Lead Generation</SelectItem>
                                    <SelectItem value="sales_conversion">Increase Sales</SelectItem>
                                    <SelectItem value="customer_retention">Customer Retention</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.goal && <p className="text-sm text-red-500">{errors.goal.message}</p>}
                        </div>

                        <div className="grid gap-2">
                            <Label>Monthly Budget Range</Label>
                            <Select onValueChange={(val) => setValue("budget", val)}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select your budget" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="0-500">$0 - $500</SelectItem>
                                    <SelectItem value="500-2000">$500 - $2,000</SelectItem>
                                    <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                                    <SelectItem value="5000+">$5,000+</SelectItem>
                                </SelectContent>
                            </Select>
                            {errors.budget && <p className="text-sm text-red-500">{errors.budget.message}</p>}
                        </div>

                        <div className="space-y-3">
                            <Label>Active Channels</Label>
                            <div className="grid grid-cols-2 gap-4">
                                {["Facebook", "Instagram", "LinkedIn", "Twitter", "Email", "SEO"].map((channel) => (
                                    <div key={channel} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`channel-${channel}`}
                                            checked={selectedChannels.includes(channel)}
                                            onCheckedChange={(checked) => handleCheckboxChange("channels", channel, checked as boolean)}
                                        />
                                        <label
                                            htmlFor={`channel-${channel}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {channel}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.channels && <p className="text-sm text-red-500">{errors.channels.message}</p>}
                        </div>

                        <div className="space-y-3">
                            <Label>Analytics Tools</Label>
                            <div className="grid grid-cols-2 gap-4">
                                {["Google Analytics", "Facebook Pixel", "Mixpanel", "Hotjar", "None"].map((tool) => (
                                    <div key={tool} className="flex items-center space-x-2">
                                        <Checkbox
                                            id={`tool-${tool}`}
                                            checked={selectedTools.includes(tool)}
                                            onCheckedChange={(checked) => handleCheckboxChange("tools", tool, checked as boolean)}
                                        />
                                        <label
                                            htmlFor={`tool-${tool}`}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {tool}
                                        </label>
                                    </div>
                                ))}
                            </div>
                            {errors.tools && <p className="text-sm text-red-500">{errors.tools.message}</p>}
                        </div>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Saving Profile...
                            </>
                        ) : (
                            "Complete Setup"
                        )}
                    </Button>
                </CardFooter>
            </form>
        </Card>
    )
}
