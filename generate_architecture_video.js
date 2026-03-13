const { VideoGeneratorAgent } = require('./.agents/video-generator/index');

async function main() {
  const agent = new VideoGeneratorAgent();
  
  const spec = {
    title: "Excellence Links: Architecture Overview",
    description: "A two-part system featuring a core script-based generator and a Next.js graphical interface.",
    keyPoints: [
      "Core Video Generator Terminal Mode",
      "Next.js Interactive GUI Dashboard",
      "Offline Deterministic Skills Logic",
      "LLM Agent Supervisor for Enhancements"
    ],
    videoType: "feature-walkthrough",
    duration: 60,
    useAI: false, // Pure logic, no LLM required for the base generation
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
