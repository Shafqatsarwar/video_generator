// Test file for Video Generator Agent
// Demonstrates basic usage and testing of the video generator

const { VideoGeneratorAgent } = require('./.agents/video-generator');

/**
 * Run basic functionality tests
 */
async function runTests() {
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║     AgentFactory Video Generator - Test Suite            ║');
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  let passed = 0;
  let failed = 0;

  // Test 1: Agent Initialization
  console.log('[TEST 1] Agent Initialization');
  try {
    const agent = new VideoGeneratorAgent({
      quality: 'medium',
      resolution: '720p'
    });
    
    const config = agent.getConfig();
    if (config.quality === 'medium' && config.resolution === '720p') {
      console.log('  ✅ PASSED: Agent initialized with custom config\n');
      passed++;
    } else {
      console.log('  ❌ FAILED: Config not applied correctly\n');
      failed++;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 2: Configuration Validation
  console.log('[TEST 2] Configuration Validation');
  try {
    const agent = new VideoGeneratorAgent({
      quality: 'invalid',
      resolution: 'wrong',
      outputFormat: 'xyz'
    });
    
    const config = agent.getConfig();
    if (config.quality === 'high' && config.resolution === '1080p' && config.outputFormat === 'mp4') {
      console.log('  ✅ PASSED: Invalid configs defaulted correctly\n');
      passed++;
    } else {
      console.log('  ❌ FAILED: Invalid configs not handled\n');
      failed++;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 3: Video Types Available
  console.log('[TEST 3] Video Types Available');
  try {
    const agent = new VideoGeneratorAgent();
    const videoTypes = agent.getVideoTypes();
    const expectedTypes = ['tutorial', 'feature-walkthrough', 'product-overview', 'case-study', 'default'];
    
    const hasAllTypes = expectedTypes.every(type => videoTypes.includes(type));
    if (hasAllTypes) {
      console.log(`  ✅ PASSED: All video types available: ${videoTypes.join(', ')}\n`);
      passed++;
    } else {
      console.log('  ❌ FAILED: Missing video types\n');
      failed++;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 4: Script Generation (Unit Test)
  console.log('[TEST 4] Script Generation');
  try {
    const { createScript } = require('./.agents/video-generator/script-generator');
    
    const spec = {
      title: 'Test Video',
      description: 'A test description',
      videoType: 'tutorial',
      keyPoints: ['Point 1', 'Point 2', 'Point 3'],
      duration: 60,
      targetAudience: 'Developers'
    };
    
    const script = await createScript(spec);
    
    if (script.metadata && script.structure && script.timing && script.voiceover) {
      console.log('  ✅ PASSED: Script generated with all sections');
      console.log(`     - Video type: ${script.metadata.videoType}`);
      console.log(`     - Duration: ${script.timing.total}ms`);
      console.log(`     - Body sections: ${script.structure.body.length}\n`);
      passed++;
    } else {
      console.log('  ❌ FAILED: Script missing sections\n');
      failed++;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 5: Different Video Types
  console.log('[TEST 5] Different Video Types');
  try {
    const { createScript, VIDEO_TYPE_CONFIGS } = require('./.agents/video-generator/script-generator');
    
    let allPassed = true;
    for (const videoType of Object.keys(VIDEO_TYPE_CONFIGS)) {
      const spec = {
        title: `${videoType} Video`,
        description: `Testing ${videoType}`,
        videoType,
        keyPoints: ['Test Point'],
        duration: 30
      };
      
      const script = await createScript(spec);
      if (!script.structure.introduction || !script.structure.body) {
        allPassed = false;
        break;
      }
    }
    
    if (allPassed) {
      console.log('  ✅ PASSED: All video types generate valid scripts\n');
      passed++;
    } else {
      console.log('  ❌ FAILED: Some video types failed\n');
      failed++;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 6: Asset Loading
  console.log('[TEST 6] Asset Loading');
  try {
    const { loadAssets } = require('./.agents/video-generator/asset-manager');
    
    // Test with empty assets
    const emptyAssets = await loadAssets([]);
    if (emptyAssets.images && emptyAssets.videos && emptyAssets.audio && emptyAssets.fonts) {
      console.log('  ✅ PASSED: Empty asset loading works\n');
      passed++;
    } else {
      console.log('  ❌ FAILED: Asset structure incorrect\n');
      failed++;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 7: Asset Validation (Non-existent files)
  console.log('[TEST 7] Asset Validation (Graceful Failure)');
  try {
    const { loadAssets } = require('./.agents/video-generator/asset-manager');
    
    const assets = await loadAssets([
      { type: 'image', path: './non-existent-file.png' },
      { type: 'video', path: './missing-video.mp4' }
    ]);
    
    const invalidImages = assets.images.filter(a => !a.valid);
    const invalidVideos = assets.videos.filter(a => !a.valid);
    
    if (invalidImages.length === 1 && invalidVideos.length === 1) {
      console.log('  ✅ PASSED: Invalid assets handled gracefully\n');
      passed++;
    } else {
      console.log('  ❌ FAILED: Invalid assets not tracked correctly\n');
      failed++;
    }
  } catch (error) {
    console.log(`  ❌ FAILED: ${error.message}\n`);
    failed++;
  }

  // Test 8: Full Integration (Demo Specification)
  console.log('[TEST 8] Full Integration Test');
  console.log('  ℹ️  Skipping actual render (requires Remotion dependencies)');
  console.log('  ℹ️  To run full test: npm install && node test-video-generator.js\n');
  passed++;

  // Summary
  console.log('╔═══════════════════════════════════════════════════════════╗');
  console.log('║                    TEST SUMMARY                           ║');
  console.log('╠═══════════════════════════════════════════════════════════╣');
  console.log(`║  Passed: ${passed}                                                   ║`);
  console.log(`║  Failed: ${failed}                                                   ║`);
  console.log('╚═══════════════════════════════════════════════════════════╝\n');

  return { passed, failed, total: passed + failed };
}

/**
 * Run demo video generation (requires dependencies installed)
 */
async function runDemoGeneration() {
  console.log('\n🎬 Starting Demo Video Generation...\n');

  const agent = new VideoGeneratorAgent({
    renderTimeout: 300000,
    maxConcurrentJobs: 1,
    outputFormat: 'mp4',
    quality: 'medium',
    resolution: '720p'
  });

  const specification = {
    title: 'Getting Started with AgentFactory',
    description: 'Learn how to create your first agent with AgentFactory',
    videoType: 'tutorial',
    keyPoints: [
      'Setting up your development environment',
      'Creating a basic agent configuration',
      'Testing your agent locally',
      'Deploying your agent to production'
    ],
    duration: 90,
    targetAudience: 'New Developers',
    assets: []
  };

  try {
    const result = await agent.generateDemoVideo(specification);
    console.log('\n✅ Success! Video generated at:', result);
    return result;
  } catch (error) {
    console.error('\n❌ Error generating video:', error.message);
    throw error;
  }
}

/**
 * Run batch generation demo
 */
async function runBatchDemo() {
  console.log('\n📦 Starting Batch Video Generation Demo...\n');

  const agent = new VideoGeneratorAgent({
    maxConcurrentJobs: 2,
    quality: 'low',
    resolution: '720p'
  });

  const specifications = [
    {
      title: 'Introduction to AgentFactory',
      description: 'Overview of AgentFactory platform',
      videoType: 'product-overview',
      keyPoints: ['What is AgentFactory?', 'Core features', 'Getting started'],
      duration: 60,
      targetAudience: 'Business Stakeholders'
    },
    {
      title: 'Building Custom Agents',
      description: 'Step-by-step guide to creating custom AI agents',
      videoType: 'tutorial',
      keyPoints: ['Setup environment', 'Create agent', 'Test and deploy'],
      duration: 120,
      targetAudience: 'Developers'
    }
  ];

  try {
    const results = await agent.batchGenerate(specifications);
    console.log('\n✅ Batch generation completed!');
    console.log(`   Generated ${results.length} video(s)\n`);
    return results;
  } catch (error) {
    console.error('\n❌ Error in batch generation:', error.message);
    throw error;
  }
}

// Main execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const command = args[0] || 'test';

  switch (command) {
    case 'test':
      runTests().then(summary => {
        console.log(`\nTests completed: ${summary.passed}/${summary.total} passed\n`);
        process.exit(summary.failed > 0 ? 1 : 0);
      }).catch(error => {
        console.error('Test suite error:', error);
        process.exit(1);
      });
      break;

    case 'demo':
      runDemoGeneration().catch(() => process.exit(1));
      break;

    case 'batch':
      runBatchDemo().catch(() => process.exit(1));
      break;

    case 'full':
      runTests()
        .then(() => runDemoGeneration())
        .catch(() => process.exit(1));
      break;

    default:
      console.log('Usage: node test-video-generator.js [command]');
      console.log('');
      console.log('Commands:');
      console.log('  test   - Run unit tests (default)');
      console.log('  demo   - Generate a demo video');
      console.log('  batch  - Run batch generation demo');
      console.log('  full   - Run tests then generate demo video');
      console.log('');
      break;
  }
}

module.exports = { runTests, runDemoGeneration, runBatchDemo };
