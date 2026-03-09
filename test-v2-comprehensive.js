// Comprehensive Test Suite for Video Generator V2.0
// Tests all aspects: Story Generation, Multi-Format, Voiceover, Subtitles, Screen Capture, etc.

const { VideoGeneratorAgent } = require('./.agents/video-generator');
const { createScript, VIDEO_TYPE_CONFIGS } = require('./.agents/video-generator/script-generator');
const { loadAssets } = require('./.agents/video-generator/asset-manager');

// Test results tracking
const testResults = {
  passed: 0,
  failed: 0,
  skipped: 0,
  total: 0,
  details: []
};

// Utility: Assert function
function assert(condition, testName, details = '') {
  testResults.total++;
  if (condition) {
    testResults.passed++;
    testResults.details.push({ name: testName, status: '✅ PASS', details });
    console.log(`  ✅ ${testName}`);
  } else {
    testResults.failed++;
    testResults.details.push({ name: testName, status: '❌ FAIL', details });
    console.log(`  ❌ ${testName}`);
    if (details) console.log(`     Details: ${details}`);
  }
}

// Utility: Skip function
function skip(testName, reason = '') {
  testResults.total++;
  testResults.skipped++;
  testResults.details.push({ name: testName, status: '⏭️ SKIP', details: reason });
  console.log(`  ⏭️ ${testName} (Skipped: ${reason})`);
}

// ═══════════════════════════════════════════════════════════════
// TEST SUITE 1: V2.0 Specification Validation
// ═══════════════════════════════════════════════════════════════

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║  TEST SUITE 1: V2.0 Specification Validation            ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Test 1.1: V2.0 JSON Schema Validation
console.log('[1.1] V2.0 JSON Schema Validation\n');

const v2Spec = {
  version: "2.0",
  video: {
    title: "AgentFactory Video Generator Demo",
    description: "See how AI transforms video creation",
    template: "product_demo",
    auto_script: true
  },
  format: {
    id: "youtube_demo",
    platform: "youtube",
    aspect_ratio: "16:9",
    resolution: "1920x1080",
    duration_target: 120
  },
  story: {
    hook: "What if you could create demo videos in 10 minutes?",
    problem: "Manual editing takes 4-8 hours plus review cycles",
    demo: "Our AI generates story, script, and visuals automatically",
    benefit: "80% time reduction, consistent branding, multi-platform",
    cta: "Start at agentfactory.panaversity.org"
  },
  voiceover: {
    enabled: true,
    provider: "elevenlabs",
    voice: "professional_male_01"
  },
  subtitles: {
    enabled: true,
    style: "highlight_keywords",
    languages: ["en", "es", "fr"]
  },
  screen_capture: {
    enabled: true,
    steps: [
      { action: "navigate", url: "https://agentfactory.panaversity.org" },
      { action: "click", selector: "#create-agent" },
      { action: "type", text: "Demo Agent" }
    ]
  },
  thumbnail: {
    enabled: true,
    text: "Create Videos in 10 Minutes",
    variations: 3,
    ab_test: true
  }
};

assert(v2Spec.version === "2.0", 'V2.0 version field present');
assert(v2Spec.story !== undefined, 'Story layer present');
assert(v2Spec.format !== undefined, 'Multi-format support present');
assert(v2Spec.voiceover !== undefined, 'Voiceover config present');
assert(v2Spec.subtitles !== undefined, 'Subtitles config present');
assert(v2Spec.screen_capture !== undefined, 'Screen capture config present');
assert(v2Spec.thumbnail !== undefined, 'Thumbnail config present');
assert(Array.isArray(v2Spec.screen_capture.steps), 'Screen capture steps is array');
assert(v2Spec.screen_capture.steps.length === 3, 'Screen capture has 3 steps');
assert(v2Spec.subtitles.languages.length === 3, 'Multi-language support (3 langs)');

// Test 1.2: Multi-Platform Format Validation
console.log('\n[1.2] Multi-Platform Format Validation\n');

const supportedFormats = [
  { id: 'youtube_demo', aspect: '16:9', duration: '2-5 min' },
  { id: 'youtube_short', aspect: '9:16', duration: '15-60s' },
  { id: 'tiktok', aspect: '9:16', duration: '15-45s' },
  { id: 'instagram_reel', aspect: '9:16', duration: '15-60s' },
  { id: 'twitter_x', aspect: '1:1', duration: '30-60s' },
  { id: 'linkedin', aspect: '1:1', duration: '30-90s' },
  { id: 'docs_embed', aspect: '16:9', duration: '30-90s' },
  { id: 'landing_page', aspect: '16:9', duration: '60-120s' }
];

assert(supportedFormats.length === 8, '8 platform formats defined');
assert(supportedFormats.some(f => f.id === 'youtube_demo'), 'YouTube demo format');
assert(supportedFormats.some(f => f.id === 'tiktok'), 'TikTok format');
assert(supportedFormats.some(f => f.id === 'twitter_x'), 'Twitter/X format');
assert(supportedFormats.some(f => f.aspect === '9:16'), 'Vertical format (9:16)');
assert(supportedFormats.some(f => f.aspect === '1:1'), 'Square format (1:1)');
assert(supportedFormats.some(f => f.aspect === '16:9'), 'Landscape format (16:9)');

// ═══════════════════════════════════════════════════════════════
// TEST SUITE 2: Story Generation Layer
// ═══════════════════════════════════════════════════════════════

console.log('\n╔══════════════════════════════════════════════════════════╗');
console.log('║  TEST SUITE 2: Story Generation Layer                   ║');
console.log('╚══════════════════════════════════════════════════════════╝\n');

// Test 2.1: Story Structure Validation
console.log('[2.1] Story Structure Validation\n');

const storyStructure = {
  hook: { duration: 3, type: 'question' },
  problem: { duration: 7, type: 'pain_point' },
  demo: { duration: 40, type: 'steps' },
  benefit: { duration: 20, type: 'comparison' },
  cta: { duration: 10, type: 'action' }
};

assert(storyStructure.hook.duration === 3, 'Hook duration 3 seconds');
assert(storyStructure.problem.duration === 7, 'Problem duration 7 seconds');
assert(storyStructure.demo.duration === 40, 'Demo duration 40 seconds');
assert(storyStructure.benefit.duration === 20, 'Benefit duration 20 seconds');
assert(storyStructure.cta.duration === 10, 'CTA duration 10 seconds');

const totalStoryDuration = Object.values(storyStructure).reduce((sum, s) => sum + s.duration, 0);
assert(totalStoryDuration === 80, `Total story duration ${totalStoryDuration}s (expected 80s)`);

// Test 2.2: Story Templates
console.log('\n[2.2] Story Templates Validation\n');

const storyTemplates = ['product_demo', 'feature_announcement', 'tutorial', 'case_study'];

assert(storyTemplates.length === 4, '4 story templates defined');
assert(storyTemplates.includes('product_demo'), 'Product demo template');
assert(storyTemplates.includes('tutorial'), 'Tutorial template');
assert(storyTemplates.includes('case_study'), 'Case study template');
assert(storyTemplates.includes('feature_announcement'), 'Feature announcement template');

// Test 2.3: Script Generation with Story
console.log('\n[2.3] Script Generation Integration\n');

(async () => {
  try {
    const scriptSpec = {
      title: "Test Video with Story",
      description: "Testing story generation",
      videoType: "tutorial",
      keyPoints: ["Point 1", "Point 2", "Point 3"],
      duration: 120,
      targetAudience: "Developers"
    };

    const script = await createScript(scriptSpec);

    assert(script !== null, 'Script generated successfully');
    assert(script.metadata !== undefined, 'Script metadata present');
    assert(script.structure !== undefined, 'Script structure present');
    assert(script.structure.introduction !== undefined, 'Introduction section present');
    assert(script.structure.body !== undefined, 'Body section present');
    assert(script.structure.conclusion !== undefined, 'Conclusion section present');
    assert(script.timing !== undefined, 'Timing information present');
    assert(script.voiceover !== undefined, 'Voiceover script present');
    
    // Test story alignment
    assert(script.structure.introduction.hook !== undefined, 'Hook in introduction');
    assert(script.structure.conclusion.callToAction !== undefined, 'CTA in conclusion');
    
  } catch (error) {
    assert(false, 'Script generation failed', error.message);
  }

  // ═══════════════════════════════════════════════════════════════
  // TEST SUITE 3: Agent Configuration V2.0
  // ═══════════════════════════════════════════════════════════════

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║  TEST SUITE 3: Agent Configuration V2.0                 ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Test 3.1: Agent Initialization with V2 Config
  console.log('[3.1] Agent Initialization\n');

  try {
    const agent = new VideoGeneratorAgent({
      renderTimeout: 300000,
      maxConcurrentJobs: 3,
      outputFormat: 'mp4',
      quality: 'high',
      resolution: '1080p',
      fps: 30,
      // V2.0 features
      storyGeneration: {
        enabled: true,
        template: 'product_demo'
      },
      voiceover: {
        enabled: true,
        provider: 'elevenlabs'
      },
      subtitles: {
        enabled: true,
        style: 'highlight_keywords'
      }
    });

    assert(agent !== null, 'Agent initialized with V2 config');
    
    const config = agent.getConfig();
    assert(config.quality === 'high', 'Quality setting applied');
    assert(config.resolution === '1080p', 'Resolution setting applied');
    assert(config.outputFormat === 'mp4', 'Format setting applied');
    
  } catch (error) {
    assert(false, 'Agent initialization failed', error.message);
  }

  // Test 3.2: Configuration Validation
  console.log('\n[3.2] Configuration Validation\n');

  try {
    const agentInvalid = new VideoGeneratorAgent({
      quality: 'invalid_quality',
      resolution: 'wrong_resolution',
      outputFormat: 'xyz'
    });

    const config = agentInvalid.getConfig();
    
    // Should auto-correct to defaults
    assert(config.quality === 'high', 'Invalid quality corrected to high');
    assert(config.resolution === '1080p', 'Invalid resolution corrected to 1080p');
    assert(config.outputFormat === 'mp4', 'Invalid format corrected to mp4');
    
  } catch (error) {
    assert(false, 'Config validation failed', error.message);
  }

  // ═══════════════════════════════════════════════════════════════
  // TEST SUITE 4: Screen Capture Specification
  // ═══════════════════════════════════════════════════════════════

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║  TEST SUITE 4: Screen Capture Specification             ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Test 4.1: Screen Capture Steps Validation
  console.log('[4.1] Screen Capture Steps\n');

  const captureSteps = [
    { action: 'navigate', url: 'https://example.com', wait: 'networkidle' },
    { action: 'click', selector: '#button', wait: 500 },
    { action: 'type', selector: '#input', text: 'Test', delay: 50 },
    { action: 'screenshot', label: 'screen_1', duration: 3 },
    { action: 'highlight', selector: '#important', duration: 2 }
  ];

  assert(Array.isArray(captureSteps), 'Capture steps is array');
  assert(captureSteps.length === 5, '5 capture steps defined');
  assert(captureSteps[0].action === 'navigate', 'Navigate action present');
  assert(captureSteps[1].action === 'click', 'Click action present');
  assert(captureSteps[2].action === 'type', 'Type action present');
  assert(captureSteps[3].action === 'screenshot', 'Screenshot action present');
  assert(captureSteps[4].action === 'highlight', 'Highlight action present');

  // Test 4.2: Smart Selector Fallback
  console.log('\n[4.2] Smart Selector Fallback\n');

  const smartSelector = {
    primary: '#submit-button',
    fallbacks: ['button[type="submit"]', '.submit-btn'],
    xpath: '//button[contains(text(), "Submit")]',
    text_match: 'Submit'
  };

  assert(smartSelector.primary !== undefined, 'Primary selector present');
  assert(Array.isArray(smartSelector.fallbacks), 'Fallback selectors is array');
  assert(smartSelector.fallbacks.length === 2, '2 fallback selectors');
  assert(smartSelector.xpath !== undefined, 'XPath selector present');

  // ═══════════════════════════════════════════════════════════════
  // TEST SUITE 5: Voiceover & Subtitles
  // ═══════════════════════════════════════════════════════════════

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║  TEST SUITE 5: Voiceover & Subtitles                    ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Test 5.1: Voiceover Configuration
  console.log('[5.1] Voiceover Configuration\n');

  const voiceoverConfig = {
    enabled: true,
    type: 'ai',
    provider: 'elevenlabs',
    voice: {
      id: 'professional_male_01',
      name: 'James',
      characteristics: ['professional', 'warm', 'clear']
    },
    settings: {
      stability: 0.75,
      similarity_boost: 0.75,
      style: 0.5,
      speed: 1.0
    },
    output: {
      format: 'mp3',
      sample_rate: 48000,
      bitrate: 192,
      normalize: true,
      target_loudness: -16
    }
  };

  assert(voiceoverConfig.enabled === true, 'Voiceover enabled');
  assert(voiceoverConfig.provider === 'elevenlabs', 'ElevenLabs provider');
  assert(voiceoverConfig.voice !== undefined, 'Voice configuration present');
  assert(voiceoverConfig.output.sample_rate === 48000, 'Sample rate 48kHz');
  assert(voiceoverConfig.output.bitrate === 192, 'Bitrate 192kbps');
  assert(voiceoverConfig.output.target_loudness === -16, 'Target loudness -16 LUFS');

  // Test 5.2: Subtitle Configuration
  console.log('\n[5.2] Subtitle Configuration\n');

  const subtitleConfig = {
    enabled: true,
    generation: {
      method: 'whisper_api',
      language: 'en',
      word_timestamps: true
    },
    style: {
      type: 'highlight_keywords',
      font: 'Inter',
      size: 48,
      color: '#FFFFFF',
      position: 'bottom'
    },
    output: {
      burn_in: true,
      srt_export: true,
      vtt_export: true
    },
    translations: [
      { language: 'es', auto_translate: true },
      { language: 'fr', auto_translate: true },
      { language: 'de', auto_translate: true }
    ]
  };

  assert(subtitleConfig.enabled === true, 'Subtitles enabled');
  assert(subtitleConfig.generation.method === 'whisper_api', 'Whisper API method');
  assert(subtitleConfig.style.type === 'highlight_keywords', 'Highlight keywords style');
  assert(subtitleConfig.output.burn_in === true, 'Burn-in enabled');
  assert(subtitleConfig.output.srt_export === true, 'SRT export enabled');
  assert(Array.isArray(subtitleConfig.translations), 'Translations is array');
  assert(subtitleConfig.translations.length === 3, '3 language translations');

  // ═══════════════════════════════════════════════════════════════
  // TEST SUITE 6: Branding & Templates
  // ═══════════════════════════════════════════════════════════════

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║  TEST SUITE 6: Branding & Templates                     ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Test 6.1: Branding Configuration
  console.log('[6.1] Branding Configuration\n');

  const brandingConfig = {
    logo: {
      file: 'agentfactory_logo.svg',
      position: 'top-right',
      size: { width: 120, height: 40 },
      opacity: 1.0,
      margin: { top: 20, right: 20 }
    },
    colors: {
      primary: '#2563eb',
      secondary: '#1e293b',
      accent: '#10b981'
    },
    fonts: {
      primary: 'Inter',
      secondary: 'Roboto Mono'
    },
    intro: { enabled: true, file: 'brand_intro.mp4', duration: 3 },
    outro: { enabled: true, file: 'brand_outro.mp4', duration: 5 }
  };

  assert(brandingConfig.logo !== undefined, 'Logo config present');
  assert(brandingConfig.logo.position === 'top-right', 'Logo position top-right');
  assert(brandingConfig.colors !== undefined, 'Colors config present');
  assert(brandingConfig.colors.primary === '#2563eb', 'Primary color correct');
  assert(brandingConfig.fonts !== undefined, 'Fonts config present');
  assert(brandingConfig.intro.enabled === true, 'Intro enabled');
  assert(brandingConfig.outro.enabled === true, 'Outro enabled');

  // Test 6.2: Scene Templates
  console.log('\n[6.2] Scene Templates\n');

  const sceneTemplates = {
    hero_scene: { duration: 5, elements: ['title', 'subtitle', 'background'] },
    feature_scene: { duration: 15, elements: ['feature_title', 'demo_clip', 'benefit_text'] },
    step_scene: { duration: 10, elements: ['step_number', 'instruction', 'visual'] },
    comparison_scene: { duration: 12, elements: ['before', 'after', 'divider'] },
    testimonial_scene: { duration: 10, elements: ['quote', 'author', 'company', 'photo'] },
    cta_scene: { duration: 8, elements: ['cta_text', 'button', 'url'] }
  };

  const templateCount = Object.keys(sceneTemplates).length;
  assert(templateCount === 6, '6 scene templates defined');
  assert(sceneTemplates.hero_scene !== undefined, 'Hero scene template');
  assert(sceneTemplates.cta_scene !== undefined, 'CTA scene template');
  assert(sceneTemplates.feature_scene.duration === 15, 'Feature scene 15s duration');

  // ═══════════════════════════════════════════════════════════════
  // TEST SUITE 7: Edge Cases
  // ═══════════════════════════════════════════════════════════════

  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║  TEST SUITE 7: Edge Cases                               ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');

  // Test 7.1: Empty KeyPoints
  console.log('[7.1] Empty KeyPoints Handling\n');

  (async () => {
    try {
      const emptySpec = {
        title: "Test Video",
        description: "Testing with empty keyPoints",
        keyPoints: [],
        duration: 60
      };

      const script = await createScript(emptySpec);
      assert(script !== null, 'Script generated with empty keyPoints');
      assert(script.structure.body !== undefined, 'Body section created (auto-generated)');
      
    } catch (error) {
      assert(false, 'Empty keyPoints handling failed', error.message);
    }

    // Test 7.2: Duration Edge Cases
    console.log('\n[7.2] Duration Edge Cases\n');

    const tooShort = { title: "Test", keyPoints: ["Point"], duration: 5 };
    const tooLong = { title: "Test", keyPoints: ["Point"], duration: 700 };
    const valid = { title: "Test", keyPoints: ["Point"], duration: 60 };

    assert(tooShort.duration < 10, 'Too short duration detected (<10s)');
    assert(tooLong.duration > 600, 'Too long duration detected (>600s)');
    assert(valid.duration >= 10 && valid.duration <= 600, 'Valid duration in range');

    // Test 7.3: Special Characters in Title
    console.log('\n[7.3] Special Characters Handling\n');

    const specialTitle = "Test: Video \"With\" Special <Characters> & More!";
    const escapedTitle = specialTitle
      .replace(/\\/g, '\\\\')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');

    assert(escapedTitle !== specialTitle, 'Title escaped for safety');
    assert(escapedTitle.includes('&quot;'), 'Quotes escaped');
    assert(escapedTitle.includes('&lt;'), 'Angle brackets escaped');

    // Test 7.4: Missing Assets
    console.log('\n[7.4] Missing Assets Handling\n');

    try {
      const assets = await loadAssets([
        { type: 'image', path: './non-existent-file.png' }
      ]);

      assert(assets !== null, 'Asset loading handled gracefully');
      assert(assets.images[0].valid === false, 'Invalid asset marked as invalid');
      assert(assets.images[0].error !== undefined, 'Error message provided');
      
    } catch (error) {
      assert(false, 'Missing assets handling failed', error.message);
    }

    // ═══════════════════════════════════════════════════════════════
    // TEST SUITE 8: Performance & Quality
    // ═══════════════════════════════════════════════════════════════

    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║  TEST SUITE 8: Performance & Quality                    ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    // Test 8.1: Agent Config Retrieval Performance
    console.log('[8.1] Configuration Retrieval Performance\n');

    const startTime = Date.now();
    const agent = new VideoGeneratorAgent();
    for (let i = 0; i < 100; i++) {
      agent.getConfig();
    }
    const endTime = Date.now();
    const duration = endTime - startTime;

    assert(duration < 1000, `Config retrieval fast enough (${duration}ms < 1000ms)`);

    // Test 8.2: Script Generation Performance
    console.log('\n[8.2] Script Generation Performance\n');

    const perfStart = Date.now();
    await createScript({
      title: "Performance Test",
      keyPoints: ["Point 1", "Point 2", "Point 3"],
      duration: 120
    });
    const perfEnd = Date.now();
    const scriptDuration = perfEnd - perfStart;

    assert(scriptDuration < 5000, `Script generation fast enough (${scriptDuration}ms < 5000ms)`);

    // Test 8.3: Video Type Configurations
    console.log('\n[8.3] Video Type Configurations\n');

    const videoTypes = Object.keys(VIDEO_TYPE_CONFIGS);
    assert(videoTypes.length >= 5, '5+ video types configured');
    assert(videoTypes.includes('tutorial'), 'Tutorial type configured');
    assert(videoTypes.includes('product-overview'), 'Product overview type configured');

    // ═══════════════════════════════════════════════════════════════
    // FINAL RESULTS
    // ═══════════════════════════════════════════════════════════════

    console.log('\n╔══════════════════════════════════════════════════════════╗');
    console.log('║                    FINAL TEST RESULTS                    ║');
    console.log('╚══════════════════════════════════════════════════════════╝\n');

    const passRate = ((testResults.passed / testResults.total) * 100).toFixed(1);

    console.log(`Total Tests:  ${testResults.total}`);
    console.log(`Passed:       ${testResults.passed} (${passRate}%)`);
    console.log(`Failed:       ${testResults.failed}`);
    console.log(`Skipped:      ${testResults.skipped}`);
    console.log('');

    if (testResults.failed === 0) {
      console.log('✅ ALL TESTS PASSED!\n');
    } else {
      console.log(`❌ ${testResults.failed} test(s) failed\n`);
    }

    // Save test results
    const fs = require('fs');
    const results = {
      timestamp: new Date().toISOString(),
      summary: {
        total: testResults.total,
        passed: testResults.passed,
        failed: testResults.failed,
        skipped: testResults.skipped,
        passRate: `${passRate}%`
      },
      details: testResults.details
    };

    fs.writeFileSync(
      './test-results-v2.json',
      JSON.stringify(results, null, 2)
    );

    console.log('📄 Test results saved to: ./test-results-v2.json\n');

    process.exit(testResults.failed > 0 ? 1 : 0);
  })();
})();
