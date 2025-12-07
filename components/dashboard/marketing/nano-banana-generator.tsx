"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Sparkles, Copy, Check, Banana } from "lucide-react"
import { toast } from "sonner"

export function NanoBananaGenerator() {
    const { businessProfile } = useAuth()
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState("")
    const [copied, setCopied] = useState(false)

    const [topic, setTopic] = useState("")
    const [tone, setTone] = useState("professional")
    const [format, setFormat] = useState("social_post")

    const handleGenerate = async () => {
        if (!topic) {
            toast.error("Please enter a topic")
            return
        }

        setLoading(true)
        setResult("")
        try {
            const response = await fetch("/api/marketing/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    topic,
                    tone,
                    format,
                    businessContext: businessProfile,
                }),
            })

            if (!response.ok) throw new Error("Generation failed")

            const data = await response.json()
            setResult(data.content)
            toast.success("Content generated successfully!")
        } catch (error) {
            toast.error("Failed to generate content")
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        navigator.clipboard.writeText(result)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
        toast.success("Copied to clipboard")
    }

    return (
        <div className="grid lg:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-yellow-500" />
                        Nano Banana Generator
                    </CardTitle>
                    <CardDescription>
                        Generate high-quality marketing content in seconds using our specific models.
                    </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2">
                        <Label>Topic or Idea</Label>
                        <Input
                            placeholder="e.g., New summer collection launch"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Tone</Label>
                        <Select value={tone} onValueChange={setTone}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="professional">Professional</SelectItem>
                                <SelectItem value="friendly">Friendly</SelectItem>
                                <SelectItem value="urgent">Urgent</SelectItem>
                                <SelectItem value="banana">Banana Mode 🍌</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Format</Label>
                        <Select value={format} onValueChange={setFormat}>
                            <SelectTrigger>
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="social_post">Social Media Post</SelectItem>
                                <SelectItem value="email">Email Campaign</SelectItem>
                                <SelectItem value="blog">Blog Outline</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
                <CardFooter>
                    <Button className="w-full" onClick={handleGenerate} disabled={loading}>
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Peeling ideas...
                            </>
                        ) : (
                            <>
                                <Banana className="mr-2 h-4 w-4" />
                                Generate Content
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>

            <Card className="h-full flex flex-col">
                <CardHeader>
                    <CardTitle>Result</CardTitle>
                </CardHeader>
                <CardContent className="flex-1 min-h-[300px]">
                    {result ? (
                        <Textarea
                            className="h-full min-h-[300px] resize-none font-sans text-base"
                            value={result}
                            readOnly
                        />
                    ) : (
                        <div className="h-full flex items-center justify-center text-muted-foreground border-2 border-dashed rounded-lg bg-muted/20">
                            <p>Generated content will appear here</p>
                        </div>
                    )}
                </CardContent>
                <CardFooter className="justify-end">
                    <Button variant="outline" onClick={handleCopy} disabled={!result}>
                        {copied ? (
                            <>
                                <Check className="mr-2 h-4 w-4" />
                                Copied
                            </>
                        ) : (
                            <>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy Text
                            </>
                        )}
                    </Button>
                </CardFooter>
            </Card>
        </div>
    )
}
