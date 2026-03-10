// Script Generator for Video Generator Agent
// Creates narrative scripts for demo videos based on specifications

/**
 * Video type configurations for different content styles
 */
const VIDEO_TYPE_CONFIGS = {
  'tutorial': {
    introRatio: 0.1,
    conclusionRatio: 0.1,
    tone: 'instructional',
    structure: 'step-by-step',
    pacing: 'moderate'
  },
  'feature-walkthrough': {
    introRatio: 0.15,
    conclusionRatio: 0.15,
    tone: 'informative',
    structure: 'feature-focused',
    pacing: 'moderate'
  },
  'product-overview': {
    introRatio: 0.2,
    conclusionRatio: 0.2,
    tone: 'engaging',
    structure: 'benefit-focused',
    pacing: 'brisk'
  },
  'case-study': {
    introRatio: 0.15,
    conclusionRatio: 0.2,
    tone: 'storytelling',
    structure: 'problem-solution',
    pacing: 'varied'
  },
  'default': {
    introRatio: 0.15,
    conclusionRatio: 0.15,
    tone: 'professional',
    structure: 'logical',
    pacing: 'moderate'
  }
};

/**
 * Brand voice guidelines for AgentFactory
 */
const BRAND_VOICE = {
  name: 'AgentFactory',
  website: 'agentfactory.panaversity.org',
  primaryColor: '#2563eb',
  tone: 'professional yet approachable',
  keyMessages: [
    'Simplify agent development',
    'Production-ready solutions',
    'Developer-friendly platform'
  ]
};

/**
 * Create a comprehensive script from video specification
 * @param {Object} specification - Video specification object
 * @returns {Object} Generated script with timing and voiceover
 */
async function createScript(specification) {
  const {
    title,
    description,
    keyPoints,
    duration,
    targetAudience,
    videoType = 'default',
    story // V2.0 Story block
  } = specification;

  // Get configuration for video type
  const config = VIDEO_TYPE_CONFIGS[videoType] || VIDEO_TYPE_CONFIGS.default;

  // Calculate timing based on video type and presence of story components
  const timing = calculateTiming(duration, config, story);

  // Generate script sections
  const script = {
    metadata: {
      title: title || 'AgentFactory Demo',
      videoType,
      targetAudience: targetAudience || 'Developers',
      estimatedDuration: duration,
      generatedAt: new Date().toISOString(),
      version: story ? '2.0' : '1.0'
    },
    structure: {
      introduction: generateIntroduction({ title, description, targetAudience, videoType, story }, timing.intro),
      problem: story && story.problem ? {
        content: typeof story.problem === 'string' ? story.problem : story.problem.text,
        duration: timing.problem || 0
      } : null,
      body: generateBody(keyPoints, timing.body, config.structure, story),
      benefit: story && story.benefit ? {
        content: typeof story.benefit === 'string' ? story.benefit : story.benefit.text,
        duration: timing.benefit || 0
      } : null,
      conclusion: generateConclusion({ title, videoType, targetAudience, story }, timing.conclusion)
    },
    timing,
    voiceover: generateVoiceoverScript({ title, description, keyPoints, targetAudience, videoType, story }),
    visualCues: generateVisualCues(keyPoints, config.structure, story)
  };

  return script;
}

/**
 * Calculate timing for each section based on duration and video type
 */
function calculateTiming(durationSeconds, config, story) {
  const totalMs = durationSeconds * 1000;

  // Base ratios
  let introRatio = config.introRatio;
  let conclusionRatio = config.conclusionRatio;

  // If story block is present, we need to accommodate problem and benefit
  let problemMs = 0;
  let benefitMs = 0;

  if (story) {
    if (story.problem) problemMs = (story.problem.duration || 7) * 1000;
    if (story.benefit) benefitMs = (story.benefit.duration || 20) * 1000;
  }

  const introMs = Math.floor(totalMs * introRatio);
  const conclusionMs = Math.floor(totalMs * conclusionRatio);
  const bodyMs = totalMs - introMs - conclusionMs - problemMs - benefitMs;

  return {
    total: totalMs,
    intro: introMs,
    problem: problemMs,
    body: bodyMs,
    benefit: benefitMs,
    conclusion: conclusionMs,
    introSeconds: (introMs / 1000).toFixed(1),
    problemSeconds: (problemMs / 1000).toFixed(1),
    bodySeconds: (bodyMs / 1000).toFixed(1),
    benefitSeconds: (benefitMs / 1000).toFixed(1),
    conclusionSeconds: (conclusionMs / 1000).toFixed(1)
  };
}

/**
 * Generate introduction section
 */
function generateIntroduction(context, timingMs) {
  const { title, description, targetAudience, videoType, story } = context;

  let hook = '';
  if (story && story.hook) {
    hook = typeof story.hook === 'string' ? story.hook : story.hook.text;
  } else {
    const hooks = {
      tutorial: `Welcome to this step-by-step tutorial on ${title}. By the end of this video, you'll have a clear understanding of ${description}.`,
      'feature-walkthrough': `Let's explore ${title} - a powerful feature that ${description}. This walkthrough will show you exactly how it works.`,
      'product-overview': `Discover how AgentFactory is transforming the way developers build AI agents. Today, we're diving into ${title}.`,
      'case-study': `See how developers are achieving remarkable results with AgentFactory. This case study examines ${title}.`,
      default: `Welcome to this demonstration of ${title}. We'll explore how ${description} using the AgentFactory platform.`
    };
    hook = hooks[videoType] || hooks.default;
  }

  return {
    hook,
    branding: 'AgentFactory - Empowering developers to build AI agents',
    duration: timingMs,
    keyMessage: `Learn how ${targetAudience || 'developers'} can leverage AgentFactory for ${description || title}`
  };
}

/**
 * Generate body sections from key points
 */
function generateBody(keyPoints = [], timingMs, structure) {
  if (!keyPoints || keyPoints.length === 0) {
    return [{
      title: 'Overview',
      content: 'This section covers the essential aspects of the topic.',
      duration: timingMs
    }];
  }

  const sections = [];
  const timePerSection = Math.floor(timingMs / keyPoints.length);

  keyPoints.forEach((point, index) => {
    let sectionTitle;
    let content;

    switch (structure) {
      case 'step-by-step':
        sectionTitle = `Step ${index + 1}: ${extractKeyAction(point)}`;
        content = `In this step, we'll ${point.toLowerCase()}. This is essential for building a complete solution.`;
        break;

      case 'feature-focused':
        sectionTitle = `Feature: ${capitalizeFirst(point)}`;
        content = `Let's examine this feature closely. ${point} - here's what makes it powerful and how you can use it.`;
        break;

      case 'benefit-focused':
        sectionTitle = `Benefit: ${extractBenefit(point)}`;
        content = `This means ${point.toLowerCase()}. Imagine the possibilities this opens up for your projects.`;
        break;

      case 'problem-solution':
        sectionTitle = `Insight ${index + 1}: ${summarizePoint(point)}`;
        content = `Here's what we observed: ${point}. This insight drives our approach to solving the challenge.`;
        break;

      default:
        sectionTitle = `Point ${index + 1}: ${capitalizeFirst(point)}`;
        content = `Let's cover this key point: ${point}. This is important for understanding the overall concept.`;
    }

    sections.push({
      title: sectionTitle,
      content,
      keyPoint: point,
      duration: timePerSection,
      order: index + 1
    });
  });

  return sections;
}

/**
 * Generate conclusion section
 */
function generateConclusion(context, timingMs) {
  const { title, videoType, targetAudience, story } = context;

  let summary = '';
  let callToAction = '';

  if (story && story.cta) {
    callToAction = typeof story.cta === 'string' ? story.cta : story.cta.text;
    summary = `That concludes our look at ${title}. ${callToAction}`;
  } else {
    const summaries = {
      tutorial: `You've now completed this tutorial on ${targetAudience || 'getting started'} with AgentFactory. Practice these steps to master the concepts.`,
      'feature-walkthrough': `That wraps up our walkthrough of this feature. You now have a solid understanding of how it works and when to use it.`,
      'product-overview': `AgentFactory provides everything you need to build production-ready AI agents. Start your journey today.`,
      'case-study': `This case study demonstrates the real-world impact of AgentFactory. The results speak for themselves.`,
      default: `That concludes our demonstration. You now have a clear understanding of the key concepts we've covered.`
    };
    summary = summaries[videoType] || summaries.default;
    callToAction = `Visit ${BRAND_VOICE.website} to start building your own AI agents today.`;
  }

  return {
    summary,
    callToAction,
    closing: `Thank you for watching. Join the AgentFactory community and start creating amazing AI-powered solutions.`,
    duration: timingMs,
    branding: {
      website: BRAND_VOICE.website,
      tagline: 'Build Your First Agent'
    }
  };
}

/**
 * Generate voiceover script for the entire video
 */
function generateVoiceoverScript(context) {
  const { title, description, keyPoints, targetAudience, videoType, story } = context;

  let script = `[INTRO]\n`;
  if (story && story.hook) {
    script += `${typeof story.hook === 'string' ? story.hook : story.hook.text}\n\n`;
  } else {
    script += `Welcome to AgentFactory. ${capitalizeFirst(description || title)}.\n\n`;
  }

  if (story && story.problem) {
    script += `[PROBLEM]\n`;
    script += `${typeof story.problem === 'string' ? story.problem : story.problem.text}\n\n`;
  }

  if (keyPoints && keyPoints.length > 0) {
    script += `[MAIN CONTENT]\n`;
    const transition = story && story.problem ? "That's why we built this solution. " : "";
    script += `${transition}In this ${videoType === 'default' ? 'video' : videoType.replace('-', ' ')}, we'll cover ${keyPoints.length} key points:\n\n`;

    keyPoints.forEach((point, index) => {
      script += `${index + 1}. ${capitalizeFirst(point)}\n`;
    });

    script += `\n`;
  }

  if (story && story.benefit) {
    script += `[BENEFITS]\n`;
    script += `${typeof story.benefit === 'string' ? story.benefit : story.benefit.text}\n\n`;
  }

  script += `[CONCLUSION]\n`;
  if (story && story.cta) {
    script += `${typeof story.cta === 'string' ? story.cta : story.cta.text}\n`;
  } else {
    script += `That's how AgentFactory empowers ${targetAudience || 'developers'} to build sophisticated AI agents efficiently.\n`;
    script += `Visit ${BRAND_VOICE.website} to get started today.`;
  }

  return {
    full: script,
    estimatedWords: script.split(/\s+/).length,
    estimatedSpeakingTime: estimateSpeakingTime(script)
  };
}

/**
 * Generate visual cues for each section
 */
function generateVisualCues(keyPoints = [], structure) {
  const cues = [];

  // Intro visual
  cues.push({
    section: 'intro',
    type: 'title-card',
    description: 'Animated title with AgentFactory logo and gradient background'
  });

  // Body visuals
  keyPoints.forEach((point, index) => {
    cues.push({
      section: `body-${index + 1}`,
      type: 'content-slide',
      description: `Clean slide with step indicator and key point text`,
      highlight: extractKeywords(point)
    });
  });

  // Conclusion visual
  cues.push({
    section: 'conclusion',
    type: 'call-to-action',
    description: 'CTA with website URL and "Build Your First Agent" button'
  });

  return cues;
}

// Helper functions

function capitalizeFirst(str) {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function extractKeyAction(point) {
  // Extract action verb from point (first word or first 3 words)
  const words = point.split(' ');
  return words.slice(0, Math.min(3, words.length)).join(' ');
}

function extractBenefit(point) {
  // Simplified benefit extraction
  return capitalizeFirst(point.split(' ').slice(0, 4).join(' ')) + '...';
}

function summarizePoint(point) {
  // Create a shorter summary of the point
  return capitalizeFirst(point.split(' ').slice(0, 5).join(' ')) + '...';
}

function extractKeywords(point) {
  // Extract potential keywords for highlighting
  const stopWords = ['the', 'a', 'an', 'is', 'are', 'to', 'for', 'with', 'and', 'or'];
  const words = point.toLowerCase().split(' ');
  return words.filter(w => w.length > 4 && !stopWords.includes(w)).slice(0, 3);
}

function estimateSpeakingTime(text) {
  // Average speaking rate: ~150 words per minute
  const wordCount = text.split(/\s+/).length;
  const seconds = Math.ceil((wordCount / 150) * 60);
  return {
    seconds,
    minutes: (seconds / 60).toFixed(1)
  };
}

module.exports = { createScript, VIDEO_TYPE_CONFIGS, BRAND_VOICE };
