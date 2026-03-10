/**
 * Final Integration Test: Gemini AI + Rendering Engine
 */
const { VideoGeneratorAgent } = require('./.agents/video-generator/index');

async function verifyFinalIntegration() {
    console.log("╔══════════════════════════════════════════════════════════╗");
    console.log("║   Gemini AI + Video Engine: Final Integration Test      ║");
    console.log("╚══════════════════════════════════════════════════════════╝\n");

    const agent = new VideoGeneratorAgent({
        quality: 'low', // Low for fast verification
        resolution: '720p',
        fps: 30
    });

    const specification = {
        title: "The Intelligence of Gemini",
        description: "Testing the deep integration of Gemini AI into the Agentic Video Engine",
        videoType: "product-overview",
        duration: 30,
        targetAudience: "AI Researchers",
        keyPoints: [
            "Natural Language Storytelling",
            "Context-Aware Script Synthesis",
            "Dynamic Narrative Branching"
        ],
        useAI: true // Enable Gemini!
    };

    try {
        console.log("Starting verification...");
        const outputPath = await agent.generateDemoVideo(specification);
        console.log(`\n✅ Final verification successful!`);
        console.log(`   Output rendered with Gemini script: ${outputPath}`);
    } catch (error) {
        console.error(`\n❌ Final verification failed: ${error.message}`);
        process.exit(1);
    }
}

verifyFinalIntegration();
