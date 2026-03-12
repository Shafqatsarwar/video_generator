
const { VideoGeneratorAgent } = require('./.agents/video-generator/index');

async function main() {
  const agent = new VideoGeneratorAgent();
  
  const spec = {
    title: "Excellence Links: Project Achievement",
    description: "A breakthrough in automated video generation using local skills and logic, focusing on execution without heavy LLM reliance.",
    keyPoints: [
      "Local Skill Integration",
      "Deterministic Logic Execution",
      "Asset Management Automation",
      "High Performance Rendering"
    ],
    videoType: "product-overview",
    useAI: false,
    branding: {
      name: "Excellence Links",
      website: "excellencelinks.com",
      primaryColor: "#facc15"
    }
  };

  try {
    const outputPath = await agent.generateDemoVideo(spec);
    console.log("SUCCESS: Video created at " + outputPath);
  } catch (err) {
    console.error("FAILURE: " + err.message);
    process.exit(1);
  }
}

main();
