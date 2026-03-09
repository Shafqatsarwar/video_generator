# Example Usage of Video Generator

This document provides examples of how to use the AgentFactory Video Generator.

## Table of Contents

- [Basic Usage](#basic-usage)
- [Video Types](#video-types)
- [Configuration Options](#configuration-options)
- [Using the Skill](#using-the-skill)
- [Batch Processing](#batch-processing)
- [Complete Workflow](#complete-workflow)
- [Testing](#testing)

---

## Basic Usage

```javascript
const { VideoGeneratorAgent } = require('./.agents/video-generator');

// Create an instance of the agent
const agent = new VideoGeneratorAgent({
  renderTimeout: 300000, // 5 minutes timeout
  maxConcurrentJobs: 3, // Process up to 3 videos simultaneously
  outputFormat: 'mp4', // Output format
  quality: 'high', // Quality: high, medium, low
  resolution: '1080p', // Resolution: 720p, 1080p, 4k
  fps: 30 // Frames per second
});

// Define a video specification
const specification = {
  title: "Getting Started with AgentFactory",
  description: "Learn how to create your first agent with AgentFactory",
  videoType: "tutorial", // Optional: tutorial, feature-walkthrough, product-overview, case-study
  keyPoints: [
    "Setting up your development environment",
    "Creating a basic agent configuration",
    "Testing your agent locally",
    "Deploying your agent to production"
  ],
  duration: 120, // Duration in seconds (10-600)
  targetAudience: "New Developers",
  assets: [
    // Add asset paths if needed
    // { type: "image", path: "./assets/logo.png" }
  ]
};

// Generate the video
try {
  const outputPath = await agent.generateDemoVideo(specification);
  console.log(`✅ Video generated successfully: ${outputPath}`);
} catch (error) {
  console.error('❌ Video generation failed:', error.message);
}
```

---

## Video Types

The video generator supports different video types, each with optimized structure and tone:

### Tutorial

```javascript
{
  title: "Building Your First Agent",
  description: "Step-by-step tutorial for beginners",
  videoType: "tutorial", // Instructional tone, step-by-step structure
  keyPoints: [
    "Installing dependencies",
    "Creating agent configuration",
    "Running your first test",
    "Deploying to production"
  ],
  duration: 180,
  targetAudience: "Beginner Developers"
}
```

### Feature Walkthrough

```javascript
{
  title: "Advanced Configuration Options",
  description: "Deep dive into advanced features",
  videoType: "feature-walkthrough", // Informative tone, feature-focused
  keyPoints: [
    "Custom data sources",
    "Advanced prompting techniques",
    "API integration patterns",
    "Performance optimization"
  ],
  duration: 240,
  targetAudience: "Experienced Developers"
}
```

### Product Overview

```javascript
{
  title: "AgentFactory Platform Overview",
  description: "Comprehensive overview of platform capabilities",
  videoType: "product-overview", // Engaging tone, benefit-focused
  keyPoints: [
    "Core platform features",
    "Benefits for businesses",
    "Integration capabilities",
    "Getting started process"
  ],
  duration: 120,
  targetAudience: "Business Stakeholders"
}
```

### Case Study

```javascript
{
  title: "Customer Success: TechCorp",
  description: "How TechCorp built a customer support agent",
  videoType: "case-study", // Storytelling tone, problem-solution structure
  keyPoints: [
    "The challenge: High support volume",
    "The solution: AI-powered agent",
    "Implementation timeline",
    "Results: 60% reduction in tickets"
  ],
  duration: 180,
  targetAudience: "Decision Makers"
}
```

---

## Configuration Options

### Quality Settings

```javascript
const agent = new VideoGeneratorAgent({
  quality: 'high' // Options: 'high', 'medium', 'low'
});
```

### Resolution Settings

```javascript
const agent = new VideoGeneratorAgent({
  resolution: '1080p' // Options: '720p', '1080p', '4k'
});
```

### Output Format

```javascript
const agent = new VideoGeneratorAgent({
  outputFormat: 'mp4' // Options: 'mp4', 'webm'
});
```

### Full Configuration Example

```javascript
const agent = new VideoGeneratorAgent({
  // Rendering settings
  renderTimeout: 600000, // 10 minutes
  maxConcurrentJobs: 2,
  maxConcurrency: 4,
  
  // Output settings
  outputFormat: 'mp4',
  quality: 'high',
  resolution: '1080p',
  fps: 30,
  
  // Branding (auto-configured)
  branding: {
    name: 'AgentFactory',
    website: 'agentfactory.panaversity.org',
    primaryColor: '#2563eb'
  }
});
```

---

## Using the Skill

### Command Line

```bash
# Basic usage
node .agents/skills/video-generation/video-generation.skill '{
  "title": "My Demo Video",
  "description": "A demonstration of AgentFactory capabilities",
  "keyPoints": ["Feature 1", "Feature 2", "Feature 3"],
  "duration": 60,
  "targetAudience": "Developers"
}'
```

```bash
# With all options
node .agents/skills/video-generation/video-generation.skill '{
  "title": "Advanced Tutorial",
  "description": "Learn advanced techniques",
  "videoType": "tutorial",
  "keyPoints": [
    "Advanced setup",
    "Complex configurations",
    "Production deployment"
  ],
  "duration": 180,
  "targetAudience": "Senior Developers",
  "quality": "high",
  "resolution": "1080p",
  "outputFormat": "mp4",
  "timeout": 300000
}'
```

### Show Skill Info

```bash
# View skill information and parameters
node .agents/skills/video-generation/video-generation.skill --info

# View help
node .agents/skills/video-generation/video-generation.skill --help
```

### From Node.js

```javascript
const { executeSkill } = require('./.agents/skills/video-generation/video-generation.skill');

const result = await executeSkill({
  title: "Quick Demo",
  description: "A quick demonstration",
  keyPoints: ["Point 1", "Point 2"],
  duration: 30
});

if (result.success) {
  console.log('Video generated:', result.outputPath);
} else {
  console.error('Generation failed:', result.error);
}
```

---

## Batch Processing

```javascript
const { VideoGeneratorAgent } = require('./.agents/video-generator');

const agent = new VideoGeneratorAgent({
  maxConcurrentJobs: 2,
  quality: 'medium',
  resolution: '720p'
});

const specifications = [
  {
    title: "Introduction to AgentFactory",
    description: "Platform overview",
    videoType: "product-overview",
    keyPoints: ["Features", "Benefits", "Getting Started"],
    duration: 90,
    targetAudience: "Business Stakeholders"
  },
  {
    title: "Building Custom Agents",
    description: "Developer tutorial",
    videoType: "tutorial",
    keyPoints: ["Setup", "Configuration", "Testing", "Deployment"],
    duration: 180,
    targetAudience: "Developers"
  },
  {
    title: "Enterprise Integration",
    description: "Integration patterns for enterprises",
    videoType: "feature-walkthrough",
    keyPoints: ["Security", "Scalability", "Monitoring"],
    duration: 240,
    targetAudience: "Solution Architects"
  }
];

// Process multiple videos
try {
  const results = await agent.batchGenerate(specifications);
  console.log(`\n✅ Batch generation completed!`);
  console.log(`   Generated ${results.length} video(s)\n`);
  results.forEach((path, i) => {
    console.log(`   ${i + 1}. ${path}`);
  });
} catch (error) {
  console.error('❌ Batch generation failed:', error.message);
}
```

---

## Complete Workflow

The complete workflow demonstrates spec generation, human approval, and video generation:

```bash
# Run the complete workflow
node complete-workflow.js
```

This executes:
1. **Spec Generation**: Creates video specifications
2. **Human Approval**: Simulates review process
3. **Video Generation**: Renders approved specs

---

## Testing

### Run Unit Tests

```bash
# Run all tests
node run-tests.js

# Or directly
node test-video-generator.js test
```

### Run Demo Generation

```bash
# Generate a demo video
node test-video-generator.js demo
```

### Run Batch Demo

```bash
# Run batch generation demo
node test-video-generator.js batch
```

### Run Full Test Suite

```bash
# Run tests then generate demo
node test-video-generator.js full
```

---

## Asset Management

### Loading Assets

```javascript
const specification = {
  title: "Product Demo",
  description: "Showcasing our product",
  keyPoints: ["Feature 1", "Feature 2"],
  duration: 120,
  assets: [
    {
      type: "image",
      path: "./assets/logo.png",
      placement: "top-left"
    },
    {
      type: "video",
      path: "./assets/demo-clip.mp4",
      duration: 10
    },
    {
      type: "audio",
      path: "./assets/background-music.mp3"
    },
    {
      type: "font",
      path: "./assets/custom-font.ttf",
      family: "CustomFont",
      weight: "bold"
    }
  ]
};
```

### Asset Validation

The asset manager automatically validates assets:
- Checks file existence
- Extracts metadata (size, name)
- Reports errors gracefully
- Continues with valid assets

---

## Troubleshooting

### Common Issues

**"No compositions found"**
- Ensure Remotion is properly installed
- Check that the composition file is generated correctly

**"Asset not found"**
- Verify asset paths are absolute or relative to project root
- Check file permissions

**"Render timeout"**
- Increase `renderTimeout` in config
- Reduce video duration or quality
- Close other applications to free resources

**"Invalid parameters"**
- Check that duration is between 10-600 seconds
- Ensure title is 3-200 characters
- Verify videoType is one of: tutorial, feature-walkthrough, product-overview, case-study, default

---

## Best Practices

1. **Keep videos concise**: 60-180 seconds is optimal for engagement
2. **Limit key points**: 3-5 key points per video
3. **Use appropriate video types**: Match type to your content goal
4. **Test with lower quality first**: Use `quality: 'low'` for testing
5. **Batch similar videos**: Process multiple videos together for efficiency
6. **Monitor render times**: Adjust `maxConcurrentJobs` based on system capacity
