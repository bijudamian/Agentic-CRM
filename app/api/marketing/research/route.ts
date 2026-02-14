import { z } from "zod"
import { Perplexity } from "@perplexity-ai/perplexity_ai"
import { GoogleGenAI } from "@google/genai"
import { fail, logError, logInfo, ok, requestId } from "@/lib/api/http"
import { serverEnv } from "@/lib/env"

const researchRequestSchema = z.object({
  businessProfile: z.object({
    businessName: z.string().min(1),
    niche: z.string().min(1),
    category: z.string().min(1),
    address: z.object({ city: z.string().optional() }).optional(),
  }),
  marketingConfig: z
    .object({
      goal: z.string().optional(),
      budget: z.string().optional(),
      channels: z.array(z.string()).optional(),
    })
    .optional(),
  simulatePerplexity: z.boolean().optional().default(false),
})

export async function POST(req: Request) {
  const rid = requestId()

  try {
    const body = await req.json()
    const parsed = researchRequestSchema.safeParse(body)

    if (!parsed.success) {
      return fail("Invalid request payload", "VALIDATION_ERROR", 400, {
        rid,
        issues: parsed.error.flatten(),
      })
    }

    const { businessProfile, marketingConfig, simulatePerplexity } = parsed.data

    const perplexityApiKey = serverEnv.PERPLEXITY_API_KEY
    const geminiApiKey = serverEnv.GEMINI_API_KEY

    if ((!perplexityApiKey && !simulatePerplexity) || !geminiApiKey) {
      return fail("Server configuration error: Missing API keys", "SERVER_CONFIG_ERROR", 500, { rid })
    }

    let rawResearchText = ""

    if (simulatePerplexity) {
      logInfo("marketing.research", "Simulation mode enabled", { rid })
      rawResearchText = `
[SIMULATED RESEARCH OUTPUT FOR TESTING]

Executive Summary:
The market for specific ${businessProfile.niche} in ${businessProfile.address?.city || "the region"} is growing steadily. Key opportunities exist in digital channels.

Competitors:
1. Big Corp Inc: Strong brand presence but slow customer service.
2. Local Hero Ltd: Great local loyalty but poor online website.
3. Budget Options LLC: Very cheap prices but low quality products.

Trends:
- Increasing demand for eco-friendly options.
- Shift towards mobile-first shopping experiences.
- Rise of subscription models in this sector.

Strategy:
- Focus on Instagram reels to capture younger audience.
- Launch a "Green" product line to address eco-trends.
- Improve website load speed for mobile users.
- Partner with local influencers for authenticity.
`
    } else {
      const perplexityClient = new Perplexity({ apiKey: perplexityApiKey! })
      const budget = marketingConfig?.budget || "Not specified"
      const channels = Array.isArray(marketingConfig?.channels) ? marketingConfig.channels.join(", ") : "None specified"

      const researchSystemPrompt = `You are a world-class marketing researcher.
Conduct a thorough deep-dive analysis based on the user's business details.
Focus on finding REAL, current competitors and ACTUAL market trends from the live web.

Provide a comprehensive, detailed report covering:
1. Executive Summary
2. Detailed Competitor Analysis (Strengths/Weaknesses)
3. Key Market Trends
4. Strategic Recommendations

Do NOT output JSON. Just provide high-quality, dense information in plain text.`

      const researchUserPrompt = `
Business Name: ${businessProfile.businessName}
Niche/Category: ${businessProfile.niche} (${businessProfile.category})
Marketing Goal: ${marketingConfig?.goal || "Deep Market Analysis"}
Target Audience: People interested in ${businessProfile.niche}
Budget: ${budget}
Channels: ${channels}

Conduct deep research now.
`

      logInfo("marketing.research", "Starting Perplexity research", { rid, businessName: businessProfile.businessName })
      const pplxResponse = await perplexityClient.chat.completions.create({
        model: "sonar-pro",
        messages: [
          { role: "system", content: researchSystemPrompt },
          { role: "user", content: researchUserPrompt },
        ],
        stream: true,
        web_search_options: {
          search_type: "pro",
        },
      })

      for await (const chunk of pplxResponse) {
        const piece = chunk.choices[0]?.delta?.content
        if (piece) rawResearchText += piece
      }
    }

    const ai = new GoogleGenAI({ apiKey: geminiApiKey! })
    const parsingPrompt = `
You are a strict JSON extraction engine.

You will be given a FULL raw marketing research report and return ONLY this JSON shape:
{
  "summary": "A high-level executive summary (max 3 sentences)",
  "competitors": [{ "name": "Name", "strength": "Key strength", "weakness": "Key weakness" }],
  "trends": ["Trend 1", "Trend 2", "Trend 3"],
  "strategy": ["Specific actionable strategy step 1", "Step 2", "Step 3", "Step 4"]
}

Rules:
- Always include all 4 top-level keys.
- Return raw JSON only.

Raw Report:
"""
${rawResearchText}
"""
`

    let report: {
      summary: string
      competitors: { name: string; strength: string; weakness: string }[]
      trends: string[]
      strategy: string[]
    } | null = null

    try {
      const geminiResponse = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: parsingPrompt,
        config: {
          responseMimeType: "application/json",
        },
      })
      const parsedJsonText = geminiResponse.text ?? null
      report = parsedJsonText ? JSON.parse(parsedJsonText) : null
    } catch {
      report = null
    }

    if (!report) {
      report = {
        summary: "Research completed, but structured JSON parsing failed. Showing raw report text under strategy.",
        competitors: [],
        trends: [],
        strategy: [rawResearchText || "No data received."],
      }
    }

    logInfo("marketing.research", "Research complete", { rid })
    return ok({ ...report, rid })
  } catch (error: any) {
    logError("marketing.research", "Research API Error", { rid, error })
    return fail("Failed to complete research", "INTERNAL_ERROR", 500, {
      rid,
      details: error?.message,
    })
  }
}
