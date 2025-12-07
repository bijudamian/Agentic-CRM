"use client"

import { useState } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, BrainCircuit, Target, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react"
import { toast } from "sonner"
import { Badge } from "@/components/ui/badge"

interface ResearchReport {
    summary: string
    competitors: { name: string; strength: string; weakness: string }[]
    trends: string[]
    strategy: string[]
}

export function ResearchTab() {
    const { businessProfile } = useAuth()
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState<ResearchReport | null>(null)
    const [error, setError] = useState<string | null>(null)
    const [simulate, setSimulate] = useState(false)

    const handleResearch = async () => {
        if (!businessProfile?.marketing) return

        setLoading(true)
        setError(null)
        try {
            const response = await fetch("/api/marketing/research", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    businessProfile: businessProfile,
                    marketingConfig: businessProfile.marketing,
                    simulatePerplexity: simulate
                }),
            })

            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.error || data.details || "Research failed")
            }

            console.log("Research Data:", data)
            setReport(data)
            toast.success("Deep research complete!")
        } catch (err: any) {
            console.error("Research Error:", err)
            setError(err.message || "Something went wrong")
            toast.error("Failed to conduct research")
        } finally {
            setLoading(false)
        }
    }

    if (!businessProfile?.marketing) {
        return (
            <Card>
                <CardContent className="pt-6 text-center">
                    <p className="text-muted-foreground">Please setup your marketing profile first.</p>
                </CardContent>
            </Card>
        )
    }

    return (
        <div className="space-y-6">
            {!report && (
                <Card className="text-center py-12 border-dashed">
                    <CardHeader>
                        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                            <BrainCircuit className="w-8 h-8 text-primary" />
                        </div>
                        <CardTitle className="text-2xl">AI Deep Research</CardTitle>
                        <CardDescription className="max-w-md mx-auto mt-2">
                            Analyze your market, competitors, and trends using advanced AI models.
                            We'll use your business profile and marketing goals to generate a strategic report.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col items-center gap-4">
                            <Button size="lg" onClick={handleResearch} disabled={loading}>
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        {simulate ? "Simulating Research..." : `Analyzing ${businessProfile.niche} Market...`}
                                    </>
                                ) : (
                                    <>
                                        <Target className="mr-2 h-4 w-4" />
                                        Start Research
                                    </>
                                )}
                            </Button>

                            <div className="flex items-center gap-2">
                                <label className="text-xs text-muted-foreground flex items-center gap-2 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={simulate}
                                        onChange={(e) => setSimulate(e.target.checked)}
                                        className="rounded border-gray-300 text-primary focus:ring-primary h-4 w-4"
                                    />
                                    Simulate (Save Perplexity Credits)
                                </label>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}

            {error && (
                <Card className="border-destructive/50 bg-destructive/10">
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2 text-destructive font-bold mb-2">
                            <AlertTriangle className="h-5 w-5" />
                            Research Error
                        </div>
                        <p className="text-sm">{error}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                            Tip: If this is a server configuration error, try restarting your dev server to load the new API key.
                        </p>
                    </CardContent>
                </Card>
            )}

            {report && (
                <div className="space-y-6">
                    <Card className="bg-primary/5 border-primary/20">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Lightbulb className="h-5 w-5 text-primary" />
                                Executive Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-lg leading-relaxed">{report.summary || "No summary available."}</p>
                        </CardContent>
                    </Card>

                    <div className="grid md:grid-cols-2 gap-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <AlertTriangle className="h-5 w-5 text-orange-500" />
                                    Competitor Analysis
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {report.competitors?.length ? report.competitors.map((comp, i) => (
                                        <div key={i} className="p-3 bg-muted rounded-lg space-y-2">
                                            <div className="font-semibold flex items-center justify-between">
                                                {comp.name}
                                            </div>
                                            <div className="grid grid-cols-2 gap-2 text-sm">
                                                <div className="text-green-600">
                                                    <span className="font-bold">Strength:</span> {comp.strength}
                                                </div>
                                                <div className="text-red-500">
                                                    <span className="font-bold">Weakness:</span> {comp.weakness}
                                                </div>
                                            </div>
                                        </div>
                                    )) : <p className="text-muted-foreground">No competitor data found.</p>}
                                </div>
                            </CardContent>
                        </Card>

                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <TrendingUp className="h-5 w-5 text-blue-500" />
                                        Key Trends
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-2">
                                        {report.trends?.length ? report.trends.map((trend, i) => (
                                            <li key={i} className="flex items-start gap-2">
                                                <Badge variant="outline" className="mt-0.5">{i + 1}</Badge>
                                                <span className="text-sm">{trend}</span>
                                            </li>
                                        )) : <li className="text-muted-foreground">No trends identified.</li>}
                                    </ul>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Target className="h-5 w-5 text-green-500" />
                                        Recommended Strategy
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ul className="space-y-3">
                                        {report.strategy?.length ? report.strategy.map((item, i) => (
                                            <li key={i} className="flex items-start gap-2 text-sm">
                                                <span className="text-primary font-bold">•</span>
                                                {item}
                                            </li>
                                        )) : <li className="text-muted-foreground">No strategy recommendations.</li>}
                                    </ul>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="flex justify-end">
                        <Button variant="outline" onClick={() => setReport(null)}>Reset Research</Button>
                    </div>
                </div>
            )}

            {/* Debugging: Show raw report if present but UI might be broken */}
            {report && (
                <div className="mt-8 p-4 border rounded-lg bg-muted/50">
                    <h3 className="text-xs font-bold mb-2 uppercase text-muted-foreground">Debug Info (Raw Data)</h3>
                    <pre className="text-xs overflow-auto max-h-64 whitespace-pre-wrap font-mono">
                        {JSON.stringify(report, null, 2)}
                    </pre>
                </div>
            )}
        </div>
    )
}
