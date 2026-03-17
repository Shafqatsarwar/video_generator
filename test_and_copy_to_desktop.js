
const { VideoGeneratorAgent } = require('./.agents/video-generator/index');
const fs = require('fs');
const path = require('path');

async function main() {
  const desktopPath = "C:\\Users\\khans\\OneDrive\\Desktop";
  const agent = new VideoGeneratorAgent();
  
  const spec = {
    title: "Excellence Links | Desktop Delivery Test",
    description: "This is an automated test ensuring the generation engine can flawlessly deliver results directly to the user's workspace.",
    keyPoints: [
      "Engine Integrity Verified",
      "Dynamic Asset Syncing",
      "Desktop Auto-Export",
      "Evaluation Metrics Active"
    ],
    videoType: "product-overview",
    useAI: true,
    branding: {
      name: "Excellence Links",
      website: "excellencelinks.com",
      primaryColor: "#facc15"
    }
  };

  try {
    console.log("🚀 Starting generation and delivery to desktop...");
    const result = await agent.generateDemoVideo(spec);
    const sourcePath = result.outputPath;
    const fileName = path.basename(sourcePath);
    const destinationPath = path.join(desktopPath, fileName);

    console.log(`📦 Generation complete. Accuracy: ${result.assessment.accuracy * 100}%`);
    console.log(`🚚 Copying file to: ${destinationPath}`);
    
    fs.copyFileSync(sourcePath, destinationPath);
    
    console.log("✅ SUCCESS: Video is now on your Desktop!");
  } catch (err) {
    console.error("❌ FAILURE: " + err.message);
    process.exit(1);
  }
}

main();
