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
    version: '2.0',
    title: 'AgentFactory Part 3: Business Domain Agent Workflows',
    description: 'Announcing the definitive guide to enterprise AI agents',
    videoType: 'product-overview',
    story: {
      hook: "What if your business domain expertise could be instantly translated into production-ready AI agents?",
      problem: "Enterprise workflows are complex, and generic AI often fails to capture the nuances of CFO, Legal, and Supply Chain operations.",
      benefit: "AgentFactory Part 3 provides 16 chapters of validated workflows across 7 domains, reducing production time by 80%.",
      cta: "Visit agentfactory.panaversity.org to launch your first enterprise agent factory."
    },
    keyPoints: [
      'Focus on 16 enterprise chapters across 7 business domains',
      'Translate expertise into standardized SKILL.md libraries',
      'Build specialized agents for CFO, Legal, Sales, and HR',
      'Unified governance framework: AI executes, professionals judge',
      'Platform-agnostic deployment for Claude, Gemini, and Copilot'
    ],
    duration: 90,
    targetAudience: 'Enterprise professionals, C-suite executives, and AI engineers',
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
