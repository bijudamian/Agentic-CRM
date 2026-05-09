import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';

/**
 * API Handler for generating marketing content using Gemini.
 * @param req - The request object containing topic, tone, format, and businessContext.
 * @returns JSON response with generated content string.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { topic, tone, format, businessContext } = body;

        const geminiApiKey = process.env.GEMINI_API_KEY;

        if (!geminiApiKey) {
            console.error("Missing GEMINI_API_KEY");
            return NextResponse.json(
                { error: "Server configuration error: Missing API Keys" },
                { status: 500 }
            );
        }

        const ai = new GoogleGenAI({ apiKey: geminiApiKey });

        const prompt = `
You are an expert marketing copywriter. Generate marketing content based on the following context.

Business Context:
- Business Name: ${businessContext.businessName}
- Niche: ${businessContext.niche}
- Category: ${businessContext.category}
- Target Audience: ${businessContext.targetAudience || 'General audience'}

Task:
Write a ${format} about the topic: "${topic}".
The tone should be: "${tone}".

Make the content engaging, professional (unless tone says otherwise), and ready to publish.
Do not output JSON, just plain text ready to be copied.
`;

        let content = "";

        if (tone === 'banana') {
            const bananaPrompt = prompt + "\n\nCRITICAL INSTRUCTION: You MUST activate BANANA MODE. Use banana puns, emojis, and references to yellow, monkeys, peeling, etc. Go absolutely bananas.";

            const geminiResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: bananaPrompt,
            });
            content = geminiResponse.text || "Banana mode failed to generate text.";
        } else {
            const geminiResponse = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt,
            });
            content = geminiResponse.text || "Failed to generate text.";
        }

        return NextResponse.json({ content });
    } catch (error: any) {
        console.error('Generation API Error:', error);
        return NextResponse.json(
            { error: 'Failed to generate content', details: error.message },
            { status: 500 }
        );
    }
}
