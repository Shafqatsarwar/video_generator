// Test script for Part 3 Announcement Video
const { VideoGeneratorAgent } = require('./.agents/video-generator');

async function generatePart3Video() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   Part 3 Announcement Video - Test Generation           ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  const agent = new VideoGeneratorAgent({
    renderTimeout: 300000,
    maxConcurrentJobs: 1,
    outputFormat: 'mp4',
    quality: 'medium',
    resolution: '720p',
    fps: 30
  });

  const specification = {
    title: 'AgentFactory Part 3: Business Domain Agent Workflows',
    description: 'Announcing the definitive guide to enterprise AI agents',
    videoType: 'product-overview',
    keyPoints: [
      'Part 3 focuses on enterprise business workflows — 16 chapters across 7 domains',
      'Translate your expertise into SKILL.md libraries for AI agents',
      'Build production-ready agents for CFO, Legal, Sales, HR, Supply Chain',
      'Governance framework: AI executes, professionals judge',
      'Platform-agnostic deployment — works with Claude, Gemini, Copilot',
      'Validated agent configurations ready for organizational use'
    ],
    duration: 120,
    targetAudience: 'Enterprise professionals, C-suite executives, AI engineers',
    assets: []
  };

  try {
    console.log('Starting video generation...\n');
    console.log('Specification:');
    console.log(`  Title: ${specification.title}`);
    console.log(`  Duration: ${specification.duration}s`);
    console.log(`  Type: ${specification.videoType}`);
    console.log(`  Key Points: ${specification.keyPoints.length}`);
    console.log('');

    const outputPath = await agent.generateDemoVideo(specification);

    console.log('\n✅ Test video generated successfully!');
    console.log(`   Output: ${outputPath}\n`);
    console.log('Next steps:');
    console.log('  1. Review the generated video');
    console.log('  2. Add professional voiceover');
    console.log('  3. Add background music');
    console.log('  4. Create final 1080p version\n');
    
    return outputPath;
  } catch (error) {
    console.error('\n❌ Video generation failed:', error.message);
    console.error('\nThis is expected if Remotion dependencies are not fully installed.');
    console.error('Run: npm install to install all dependencies.\n');
    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  generatePart3Video()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { generatePart3Video };
