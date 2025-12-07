// /app/dashboard/research/route.ts
import { NextResponse } from "next/server";
import { Perplexity } from "@perplexity-ai/perplexity_ai";
import { GoogleGenAI } from "@google/genai";

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { businessProfile, marketingConfig, simulatePerplexity } = body;

        const perplexityApiKey = process.env.PERPLEXITY_API_KEY;
        const geminiApiKey = process.env.GEMINI_API_KEY;

        if ((!perplexityApiKey && !simulatePerplexity) || !geminiApiKey) {
            console.error("Missing API Keys");
            return NextResponse.json(
                { error: "Server configuration error: Missing API Keys" },
                { status: 500 }
            );
        }

        let rawResearchText = "";

        // --- STEP 1: Research (Perplexity OR Simulation) ---
        if (simulatePerplexity) {
            console.log(
                "[Research] SIMULATION MODE: Skipping Perplexity API cost."
            );
            rawResearchText = `
[SIMULATED RESEARCH OUTPUT FOR TESTING]

Executive Summary:
The market for specific ${businessProfile.niche} in ${businessProfile.address?.city || "the region"
                } is growing steadily. Key opportunities exist in digital channels.

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
      `;
        } else {
            const perplexityClient = new Perplexity({ apiKey: perplexityApiKey! });

            const budget = marketingConfig?.budget || "Not specified";
            const channels = Array.isArray(marketingConfig?.channels)
                ? marketingConfig.channels.join(", ")
                : "None specified";

            console.log(
                `[Research] Starting deep research for: ${businessProfile.businessName}`
            );

            const researchSystemPrompt = `You are a world-class marketing researcher.
Conduct a thorough deep-dive analysis based on the user's business details.
Focus on finding REAL, current competitors and ACTUAL market trends from the live web.

Provide a comprehensive, detailed report covering:
1. Executive Summary
2. Detailed Competitor Analysis (Strengths/Weaknesses)
3. Key Market Trends
4. Strategic Recommendations

Do NOT output JSON. Just provide high-quality, dense information in plain text.`;

            const researchUserPrompt = `
Business Name: ${businessProfile.businessName}
Niche/Category: ${businessProfile.niche} (${businessProfile.category})
Marketing Goal: ${marketingConfig?.goal || "Deep Market Analysis"}
Target Audience: People interested in ${businessProfile.niche}
Budget: ${budget}
Channels: ${channels}

Conduct deep research now.
`;

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
            });

            for await (const chunk of pplxResponse) {
                const piece = chunk.choices[0]?.delta?.content;
                if (piece) rawResearchText += piece;
            }
            console.log(
                `[Research] Perplexity completed. Length: ${rawResearchText.length} chars.`
            );
        }

        // --- STEP 2: Parse with Gemini into your ResearchReport shape ---
        const ai = new GoogleGenAI({ apiKey: geminiApiKey! });

        const parsingPrompt = `
You are a strict JSON extraction engine.

You will be given a FULL raw marketing research report (including executive summary, competitors, trends, strategy, etc).
Read the ENTIRE report carefully and then return ONLY a JSON object in this EXACT shape:

{
  "summary": "A high-level executive summary (max 3 sentences)",
  "competitors": [
    { "name": "Name", "strength": "Key strength", "weakness": "Key weakness" }
  ],
  "trends": ["Trend 1", "Trend 2", "Trend 3"],
  "strategy": [
    "Specific actionable strategy step 1",
    "Step 2",
    "Step 3",
    "Step 4"
  ]
}

Rules:
- Always include ALL 4 top-level keys: "summary", "competitors", "trends", "strategy".
- If you can't find some section, still return the key with an empty array (e.g. "competitors": []).
- "summary" MUST be max 3 sentences and truly capture the full report, not just one section.
- "competitors" must be derived from ALL competitor info in the report (merge duplicates, be concise).
- "trends" must be the MOST important market/consumer/industry trends mentioned in the report.
- "strategy" must be concrete, actionable recommendations derived from the whole report, tailored to the business.
- Do NOT include any markdown, code fences, commentary, or extra fields. Return ONLY raw JSON.

Raw Report:
"""
${rawResearchText}
"""
`;

        let parsedJsonText: string | null = null;

        try {
            const geminiResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: parsingPrompt,
                config: {
                    // Forces JSON-only output
                    responseMimeType: "application/json",
                },
            });

            // In @google/genai, text is a string property
            parsedJsonText = geminiResponse.text ?? null;
            console.log("[Research] Gemini Parsing complete.");
        } catch (geminiError) {
            console.warn(
                "[Research] Gemini Parsing Failed. Falling back to raw text.",
                geminiError
            );
        }

        let report: {
            summary: string;
            competitors: { name: string; strength: string; weakness: string }[];
            trends: string[];
            strategy: string[];
        } | null = null;

        if (parsedJsonText) {
            try {
                report = JSON.parse(parsedJsonText);
            } catch (e) {
                console.error("JSON parse failed on Gemini output", e);
            }
        }

        // Final fallback if Gemini/JSON fails
        if (!report) {
            report = {
                summary:
                    "Research completed, but structured JSON parsing failed. Showing raw report text under 'strategy'.",
                competitors: [],
                trends: [],
                strategy: [rawResearchText || "No data received."],
            };
        }

        return NextResponse.json(report);
    } catch (error: any) {
        console.error("Research API Error:", error);
        return NextResponse.json(
            {
                error: "Failed to complete research",
                details: error.message,
            },
            { status: 500 }
        );
    }
}
