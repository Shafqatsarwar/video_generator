// Renderer for Video Generator Agent
// Uses Remotion to render video compositions

const { bundle } = require('@remotion/bundler');
const { getCompositions, renderMedia } = require('@remotion/renderer');
const os = require('os');
const path = require('path');
const fs = require('fs').promises;

// Default video settings
const DEFAULT_FPS = 30;
const RESOLUTIONS = {
  '720p': { width: 1280, height: 720 },
  '1080p': { width: 1920, height: 1080 },
  '4k': { width: 3840, height: 2160 }
};

/**
 * Render a video based on composition specification
 * @param {Object} compositionSpec - Video specification
 * @param {Object} config - Rendering configuration
 * @returns {Promise<string>} - Path to rendered video
 */
async function renderVideo(compositionSpec, config) {
  const tempDir = path.join(os.tmpdir(), `agentfactory-video-${Date.now()}`);
  const bundleDir = path.join(tempDir, 'bundle');

  let bundledComposition = null;
  let cleanupNeeded = true;

  try {
    // Ensure temp and output directories exist
    await fs.mkdir(tempDir, { recursive: true });
    await fs.mkdir(bundleDir, { recursive: true });

    const outputDir = path.join(process.cwd(), 'output');
    await fs.mkdir(outputDir, { recursive: true });

    // Generate composition files
    await generateCompositionFiles(bundleDir, compositionSpec, config);

    // Bundle the composition
    console.log('Bundling composition...');
    bundledComposition = await bundle({
      cwd: bundleDir,
      entryPoint: path.join(bundleDir, 'index.js'),
      inputProps: {
        title: compositionSpec.title,
        keyPoints: compositionSpec.keyPoints,
        duration: compositionSpec.duration,
        targetAudience: compositionSpec.targetAudience
      }
    });

    // Get available compositions
    const comps = await getCompositions(bundledComposition);
    const comp = comps.find(c => c.id === 'AgentFactoryDemo');

    if (!comp) {
      throw new Error('AgentFactoryDemo composition not found');
    }

    // Generate output filename
    const timestamp = Date.now();
    const safeTitle = compositionSpec.title.replace(/[^a-zA-Z0-9]/g, '_');
    const outputPath = path.join(outputDir, `${safeTitle}_${timestamp}.${config.outputFormat || 'mp4'}`);

    // Determine codec based on output format
    const codec = (config.outputFormat || 'mp4') === 'webm' ? 'vp9' : 'h264';

    // Render with progress tracking
    console.log('Rendering video...');
    await renderMedia({
      composition: comp,
      serveUrl: bundledComposition,
      codec,
      outputLocation: outputPath,
      imageFormat: 'jpeg',
      jpegQuality: getQualityValue(config.quality || 'high'),
      concurrency: Math.min(os.cpus().length, config.maxConcurrency || 4),
      timeout: config.renderTimeout || 300000,
      onProgress: (progress) => {
        const percent = Math.round(progress * 100);
        if (percent % 10 === 0) {
          console.log(`  Rendering: ${percent}% complete`);
        }
      },
      logLevel: 'info'
    });

    cleanupNeeded = false;
    console.log(`Video rendered successfully: ${outputPath}`);
    return outputPath;

  } catch (error) {
    console.error('Video rendering failed:', error.message);
    throw new Error(`Rendering failed: ${error.message}`);
  } finally {
    if (cleanupNeeded) {
      await cleanupTempFiles(tempDir);
    }
  }
}

/**
 * Get numeric quality value from quality string
 */
function getQualityValue(quality) {
  const qualityMap = {
    'high': 90,
    'medium': 70,
    'low': 50
  };
  return qualityMap[quality] || 70;
}

/**
 * Generate all necessary composition files
 */
async function generateCompositionFiles(bundleDir, spec, config) {
  const resolution = RESOLUTIONS[config.resolution || '1080p'] || RESOLUTIONS['1080p'];
  const fps = config.fps || DEFAULT_FPS;
  const durationInFrames = (spec.duration || 60) * fps;

  // Create package.json for the bundle
  const packageJson = {
    name: 'agentfactory-video-composition',
    version: '1.0.0',
    private: true,
    dependencies: {
      'react': '^18.2.0',
      'react-dom': '^18.2.0',
      'remotion': '^4.0.0'
    }
  };

  // Create main index.js entry point with proper Composition registration
  const indexJs = `
import { registerRoot, Composition } from 'remotion';
import { MainComposition } from './MainComposition';

const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="AgentFactoryDemo"
        component={MainComposition}
        durationInFrames={${durationInFrames}}
        fps={${fps}}
        width={${resolution.width}}
        height={${resolution.height}}
        defaultProps={{
          title: "${spec.title.replace(/"/g, '\\"')}",
          keyPoints: ${JSON.stringify(spec.keyPoints)}
        }}
      />
    </>
  );
};

registerRoot(RemotionRoot);
`;

  // Create the main composition component
  const mainComposition = generateMainComposition(spec, config, resolution, fps);

  // Write all files
  await fs.writeFile(
    path.join(bundleDir, 'package.json'),
    JSON.stringify(packageJson, null, 2)
  );
  await fs.writeFile(path.join(bundleDir, 'index.js'), indexJs);
  // Use .jsx extension for React components
  await fs.writeFile(path.join(bundleDir, 'MainComposition.jsx'), mainComposition);
}

/**
 * Generate the main composition React component
 */
/**
 * Generate the main composition React component
 */
function generateMainComposition(spec, config, resolution, fps) {
  const { title, keyPoints = [], story } = spec;
  const durationInSeconds = spec.duration || 60;
  const totalFrames = durationInSeconds * fps;

  // Calculate section timings
  const introFrames = Math.floor(totalFrames * 0.15);
  const conclusionFrames = Math.floor(totalFrames * 0.15);

  let problemFrames = 0;
  let benefitFrames = 0;
  if (story) {
    if (story.problem) problemFrames = (story.problem.duration || 7) * fps;
    if (story.benefit) benefitFrames = (story.benefit.duration || 20) * fps;
  }

  const bodyFrames = totalFrames - introFrames - conclusionFrames - problemFrames - benefitFrames;
  const framesPerPoint = keyPoints.length > 0 ? Math.floor(bodyFrames / keyPoints.length) : bodyFrames;

  // Escape strings for safe JSX interpolation
  const escapedTitle = escapeJsxString(title);

  let problemSequence = '';
  if (story && story.problem) {
    const escapedProblem = escapeJsxString(typeof story.problem === 'string' ? story.problem : story.problem.text);
    problemSequence = `
        <Sequence from={${introFrames}} durationInFrames={${problemFrames}}>
          <ProblemSlide text="${escapedProblem}" />
        </Sequence>`;
  }

  // Generate key point sequences
  const keyPointSequences = keyPoints.map((point, idx) => {
    const fromFrame = introFrames + problemFrames + (idx * framesPerPoint);
    const escapedPoint = escapeJsxString(point);
    return `
      <Sequence from={${fromFrame}} durationInFrames={${framesPerPoint}}>
        <KeyPointSlide point="${escapedPoint}" index={${idx + 1}} totalPoints={${keyPoints.length}} />
      </Sequence>`;
  }).join('\n');

  let benefitSequence = '';
  if (story && story.benefit) {
    const escapedBenefit = escapeJsxString(typeof story.benefit === 'string' ? story.benefit : story.benefit.text);
    benefitSequence = `
        <Sequence from={${introFrames + problemFrames + bodyFrames}} durationInFrames={${benefitFrames}}>
          <BenefitSlide text="${escapedBenefit}" />
        </Sequence>`;
  }

  return `
import React from 'react';
import { AbsoluteFill, Sequence, useCurrentFrame, useVideoConfig, interpolate, Easing } from 'remotion';

// Main composition exported for Remotion
export const MainComposition = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#ffffff' }}>
      {/* Branded gradient background */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
        }}
      />
      
      {/* Header with logo */}
      <Header />
      
      {/* Main content area */}
      <AbsoluteFill style={{ paddingTop: 80 }}>
        {/* Introduction */}
        <Sequence from={0} durationInFrames={${introFrames}}>
          <IntroSlide title="${escapedTitle}" />
        </Sequence>
        
        {/* Problem Section (V2.0) */}
        ${problemSequence}
        
        {/* Key points (Body) */}
        ${keyPointSequences}
        
        {/* Benefit Section (V2.0) */}
        ${benefitSequence}
        
        {/* Conclusion */}
        <Sequence from={${totalFrames - conclusionFrames}} durationInFrames={${conclusionFrames}}>
          <ConclusionSlide />
        </Sequence>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};

// Header component with AgentFactory branding
const Header = () => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 30], [0, 1], { clamp: true });
  
  return (
    <div
      style={{
        position: 'absolute',
        top: 20,
        left: 20,
        right: 20,
        height: 60,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 28,
          fontWeight: 'bold',
          color: '#2563eb',
          letterSpacing: '-0.5px',
        }}
      >
        AgentFactory
      </div>
      <div
        style={{
          fontSize: 14,
          color: '#64748b',
        }}
      >
        agentfactory.panaversity.org
      </div>
    </div>
  );
};

// Introduction slide component
const IntroSlide = ({ title }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const scale = interpolate(frame, [0, 20], [0.9, 1], {
    easing: Easing.out(Easing.cubic),
  });
  const opacity = interpolate(frame, [0, 15], [0, 1]);
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        transform: \`scale(\${scale})\`,
      }}
    >
      <div
        style={{
          fontSize: 56,
          fontWeight: 'bold',
          color: '#1e293b',
          textAlign: 'center',
          padding: '0 80px',
          opacity,
          lineHeight: 1.2,
        }}
      >
        {title}
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 100,
          fontSize: 20,
          color: '#64748b',
          opacity: interpolate(frame, [10, 25], [0, 1]),
        }}
      >
        Powered by AgentFactory
      </div>
    </AbsoluteFill>
  );
};

// Problem slide component (V2.0)
const ProblemSlide = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#1e293b',
        padding: '0 100px',
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 42,
          color: '#f8fafc',
          textAlign: 'center',
          fontWeight: '500',
          lineHeight: 1.4,
        }}
      >
        <span style={{ color: '#ef4444', fontWeight: 'bold' }}>The Challenge:</span><br/>
        {text}
      </div>
    </AbsoluteFill>
  );
};

// Key point slide component
const KeyPointSlide = ({ point, index, totalPoints }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const slideIn = interpolate(frame, [0, 15], [50, 0], { clamp: true });
  const opacity = interpolate(frame, [0, 10], [0, 1], { clamp: true });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        padding: '0 60px',
      }}
    >
      <div
        style={{
          backgroundColor: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          padding: '40px 50px',
          boxShadow: '0 10px 40px rgba(0, 0, 0, 0.1)',
          maxWidth: '85%',
          transform: \`translateY(\${slideIn}px)\`,
          opacity,
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: '#2563eb',
            fontWeight: '600',
            marginBottom: 16,
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          Step {index} of {totalPoints}
        </div>
        <div
          style={{
            fontSize: 36,
            color: '#1e293b',
            lineHeight: 1.4,
            fontWeight: '500',
          }}
        >
          {point}
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Benefit slide component (V2.0)
const BenefitSlide = ({ text }) => {
  const frame = useCurrentFrame();
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  const scale = interpolate(frame, [0, 30], [0.95, 1.05], { extrapolateRight: 'clamp' });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #2563eb 0%, #174ed1 100%)',
        padding: '0 100px',
        opacity,
      }}
    >
      <div
        style={{
          fontSize: 48,
          color: 'white',
          textAlign: 'center',
          fontWeight: 'bold',
          lineHeight: 1.3,
          transform: \`scale(\${scale})\`,
        }}
      >
        <div style={{ color: '#60a5fa', fontSize: 24, marginBottom: 20 }}>THE VALUE</div>
        {text}
      </div>
    </AbsoluteFill>
  );
};

// Conclusion slide component
const ConclusionSlide = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  const opacity = interpolate(frame, [0, 20], [0, 1]);
  const translateY = interpolate(frame, [0, 20], [30, 0], { clamp: true });
  
  return (
    <AbsoluteFill
      style={{
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          opacity,
          transform: \`translateY(\${translateY}px)\`,
        }}
      >
        <div
          style={{
            fontSize: 42,
            fontWeight: 'bold',
            color: '#2563eb',
            marginBottom: 20,
          }}
        >
          Ready to Get Started?
        </div>
        <div
          style={{
            fontSize: 24,
            color: '#64748b',
            marginBottom: 40,
          }}
        >
          Visit agentfactory.panaversity.org
        </div>
        <div
          style={{
            display: 'inline-block',
            padding: '16px 32px',
            backgroundColor: '#2563eb',
            color: 'white',
            fontSize: 20,
            fontWeight: '600',
            borderRadius: 8,
          }}
        >
          Build Your First Agent
        </div>
      </div>
    </AbsoluteFill>
  );
};

export default MainComposition;
`;
}

/**
 * Escape special characters for safe JSX string interpolation
 */
function escapeJsxString(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '\\r');
}

/**
 * Clean up temporary files
 */
async function cleanupTempFiles(tempDir) {
  try {
    await fs.rm(tempDir, { recursive: true, force: true });
  } catch (error) {
    console.warn('Warning: Failed to clean up temp files:', error.message);
  }
}

module.exports = { renderVideo };
