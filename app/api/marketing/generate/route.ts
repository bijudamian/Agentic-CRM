import { z } from "zod"
import { fail, logError, logInfo, ok, requestId } from "@/lib/api/http"

const generateSchema = z.object({
  topic: z.string().min(2),
  tone: z.enum(["professional", "friendly", "persuasive", "banana"]),
  format: z.enum(["social_post", "email", "ad_copy"]),
  businessContext: z.object({
    businessName: z.string().min(1),
    niche: z.string().min(1),
    ownerName: z.string().min(1).optional().default("Team"),
  }),
})

/**
 * API Handler for generating marketing content.
 * Enterprise improvements:
 * - Runtime schema validation
 * - Structured error responses
 * - Request correlation ID for observability
 */
export async function POST(req: Request) {
  const rid = requestId()

  try {
    const payload = await req.json()
    const parsed = generateSchema.safeParse(payload)

    if (!parsed.success) {
      return fail("Invalid request payload", "VALIDATION_ERROR", 400, {
        rid,
        issues: parsed.error.flatten(),
      })
    }

    const { topic, tone, format, businessContext } = parsed.data

    // Simulate AI generation delay
    await new Promise((resolve) => setTimeout(resolve, 800))

    let content = ""
    const intro = `Here is a ${tone} ${format.replace("_", " ")} about ${topic} for ${businessContext.businessName}:`

    if (format === "social_post") {
      content = `${intro}\n\n🚀 Exciting news from ${businessContext.businessName}!\n\nWe are talking about ${topic} today. It's a game changer for the ${businessContext.niche} industry.\n\nKey takeaways:\n• Point 1 about ${topic}\n• Point 2 for better results\n• Point 3 to get started\n\n#${businessContext.niche.replace(/\s+/g, "")} #Growth #${topic.replace(/\s+/g, "")}`
    } else if (format === "email") {
      content = `Subject: Let's talk about ${topic}\n\nHi [Name],\n\n${intro}\n\nAt ${businessContext.businessName}, we believe in staying ahead. That's why we're focusing on ${topic} to help you succeed.\n\nDid you know that... [AI Generated Insight]\n\nReady to learn more? Reply to this email!\n\nBest,\n${businessContext.ownerName}`
    } else {
      content = `${intro}\n\n[Ad Copy]\n${businessContext.businessName} helps customers win in ${businessContext.niche}. Start today.`
    }

    if (tone === "banana") {
      content = `🍌 BANANA MODE ACTIVATED 🍌\n\n${content}\n\nStay yellow and mellow! 🍌`
    }

    logInfo("marketing.generate", "Content generated", { rid, format, tone })
    return ok({ content, rid })
  } catch (error) {
    logError("marketing.generate", "Generation API error", { rid, error })
    return fail("Failed to generate content", "INTERNAL_ERROR", 500, { rid })
  }
}
