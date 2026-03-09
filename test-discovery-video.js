// Test script for Discovery Explainer Video
const { VideoGeneratorAgent } = require('./.agents/video-generator');

async function generateDiscoveryVideo() {
  console.log('╔══════════════════════════════════════════════════════════╗');
  console.log('║   Discovery Explainer Video - Test Generation           ║');
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
    title: 'Building the Video Generator: Discovery Phase Explained',
    description: 'A deep dive into the discovery process for the AgentFactory Video Generator project',
    videoType: 'tutorial',
    keyPoints: [
      'Discovery Phase purpose: Understand the problem before building the solution',
      '4 stakeholder groups interviewed: Marketing, DevRel, End Users, DevOps',
      'Current process: 4-8 hours manual editing + 2-5 days review cycle',
      'Target improvement: 80% reduction in production time',
      'Market research: Evaluated Synthesia, Loom, Descript, chose Remotion',
      'Technology stack: React-based, programmatic, version-control friendly',
      '8 functional requirements and 5 non-functional requirements defined',
      'Risk assessment: Technical and business risks identified and mitigated',
      '12-week timeline: Discovery → Specification → Implementation → Launch'
    ],
    duration: 180,
    targetAudience: 'Project stakeholders, developers, students learning SDD',
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
    console.log('This video explains the SDD methodology and discovery process.');
    console.log('Next steps:');
    console.log('  1. Review the generated video');
    console.log('  2. Add educational voiceover');
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
  generateDiscoveryVideo()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
}

module.exports = { generateDiscoveryVideo };
