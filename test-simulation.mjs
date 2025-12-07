// test-simulation.mjs
// Run with: node test-simulation.mjs

async function main() {
    console.log("🚀 Starting Simulation Test (Perplexity Skipped, Gemini Only)...\n");

    const mockData = {
        businessProfile: {
            businessName: "Test Coffee Shop",
            niche: "Coffee",
            category: "Food & Beverage",
            address: { city: "Seattle" }
        },
        marketingConfig: {
            goal: "Increase Awareness",
            budget: "$5000",
            channels: ["Social Media"]
        },
        simulatePerplexity: true // Force AI to skip Perplexity
    };

    try {
        const response = await fetch("http://localhost:3000/api/marketing/research", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(mockData)
        });

        const data = await response.json();

        console.log("---------------------------------------------------");
        console.log("HTTP Status:", response.status);

        if (response.ok) {
            console.log("\n✅ SUCCESS — Gemini Parsed Output:\n");
            console.log(JSON.stringify(data, null, 2));
        } else {
            console.log("\n❌ ERROR OUTPUT:\n");
            console.log(data);
        }

        console.log("---------------------------------------------------\n");

    } catch (error) {
        console.error("\n🔥 Request Failed — Is your dev server running on localhost:3000?\n");
        console.error(error);
    }
}

main();
