import { NextResponse } from 'next/server';

/**
 * API Handler for generating marketing content.
 * @mock This is currently a mock implementation that simulates AI generation with delays.
 * @param req - The request object containing topic, tone, format, etc.
 * @returns JSON response with generated content string.
 */
export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { topic, tone, format, businessContext } = body;

        // Simulate AI Generation Delay
        await new Promise((resolve) => setTimeout(resolve, 1500));

        let content = "";

        // Simple "Nano Banana" Simulation Logic
        const intro = `Here is a ${tone} ${format} about ${topic} for ${businessContext.businessName}:`;

        if (format === 'social_post') {
            content = `${intro}\n\n🚀 Exciting news from ${businessContext.businessName}! \n\nWe are talking about ${topic} today. It's a game changer for the ${businessContext.niche} industry.\n\nKey takeaways:\n• Point 1 about ${topic}\n• Point 2 for better results\n• Point 3 to get started\n\n#${businessContext.niche} #Growth #${topic.replace(/\s+/g, '')}`;
        } else if (format === 'email') {
            content = `Subject: Let's talk about ${topic}\n\nHi [Name],\n\n${intro}\n\nAt ${businessContext.businessName}, we believe in staying ahead. That's why we're focusing on ${topic} to help you succeed.\n\nDid you know that... [AI Generated Insight]\n\nReady to learn more? Reply to this email!\n\nBest,\n${businessContext.ownerName}`;
        } else {
            content = `${intro}\n\n[Content for ${topic} goes here...]\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`;
        }

        if (tone === 'banana') {
            content = `🍌 BANANA MODE ACTIVATED 🍌\n\n${content}\n\nStay yellow and mellow! 🍌`;
        }

        return NextResponse.json({ content });
    } catch (error) {
        console.error('Generation API Error:', error);
        return NextResponse.json({ error: 'Failed to generate content' }, { status: 500 });
    }
}
