// Specification Generator for AgentFactory Video Generator
// This script generates video specifications based on user requirements

const fs = require('fs').promises;
const path = require('path');

class SpecGenerator {
  constructor() {
    this.approvedSpecsDir = './specs/approved';
    this.pendingSpecsDir = './specs/pending';
    this.templatesDir = './spec-templates';
  }

  // Generate a video specification based on requirements
  async generateSpec(requirements) {
    const specId = this.generateSpecId();

    const spec = {
      id: specId,
      createdAt: new Date().toISOString(),
      status: 'pending',
      requirements: requirements,
      specification: await this.createSpecification(requirements),
      metadata: {
        estimatedDuration: this.estimateDuration(requirements.keyPoints),
        complexity: this.assessComplexity(requirements),
        priority: requirements.priority || 'medium'
      }
    };

    // Save the pending specification
    await this.savePendingSpec(spec);

    return spec;
  }

  // Create a detailed specification based on requirements
  async createSpecification(requirements) {
    const { title, description, videoType, keyPoints, targetAudience, assets } = requirements;

    // Determine video structure based on type
    const structure = this.determineStructure(videoType, keyPoints.length);

    return {
      title: title || 'AgentFactory Demo Video',
      description: description || 'A demonstration of AgentFactory capabilities',
      videoType: videoType || 'tutorial',
      targetAudience: targetAudience || 'Developers',
      duration: this.calculateDuration(keyPoints.length),
      structure: structure,
      keyPoints: keyPoints || [],
      assets: assets || [],
      branding: {
        colors: ['#2563eb', '#ffffff', '#1e293b'], // AgentFactory colors
        logoPlacement: 'top-left',
        font: 'sans-serif'
      },
      accessibility: {
        captions: true,
        audioDescription: false,
        contrastRatio: '4.5:1'
      },
      quality: {
        resolution: '1080p',
        frameRate: 30,
        bitrate: '5 Mbps'
      },
      timeline: this.createTimeline(structure, keyPoints.length)
    };
  }

  // Determine video structure based on type and content
  determineStructure(videoType, keyPointCount) {
    const structures = {
      'tutorial': {
        intro: 10,
        body: Math.max(20, keyPointCount * 15),
        conclusion: 10
      },
      'feature-walkthrough': {
        intro: 5,
        body: Math.max(30, keyPointCount * 20),
        conclusion: 5
      },
      'case-study': {
        intro: 15,
        body: Math.max(40, keyPointCount * 25),
        conclusion: 10
      },
      'product-overview': {
        intro: 10,
        body: Math.max(30, keyPointCount * 18),
        conclusion: 10
      }
    };

    return structures[videoType] || structures['tutorial'];
  }

  // Calculate estimated duration
  calculateDuration(keyPointCount) {
    // Base duration plus time per key point
    return 30 + (keyPointCount * 15); // 30s intro/conclusion + 15s per key point
  }

  // Estimate duration based on key points
  estimateDuration(keyPoints) {
    return this.calculateDuration(keyPoints.length);
  }

  // Assess complexity based on requirements
  assessComplexity(requirements) {
    const { keyPoints, assets, duration } = requirements;
    let complexity = 1; // Base complexity

    // Increase complexity based on factors
    complexity += keyPoints ? keyPoints.length * 0.5 : 0;
    complexity += assets ? assets.length * 0.3 : 0;
    complexity += duration && duration > 120 ? 1 : 0;
    complexity += duration && duration > 300 ? 1 : 0;

    if (complexity <= 2) return 'low';
    if (complexity <= 4) return 'medium';
    return 'high';
  }

  // Create timeline based on structure
  createTimeline(structure, keyPointCount) {
    const timeline = [];
    let currentTime = 0;

    // Intro
    timeline.push({
      section: 'intro',
      start: currentTime,
      duration: structure.intro,
      description: 'Introduction to the topic'
    });

    currentTime += structure.intro;

    // Body sections
    const bodyPerSection = structure.body / keyPointCount;
    for (let i = 0; i < keyPointCount; i++) {
      timeline.push({
        section: `key-point-${i + 1}`,
        start: currentTime,
        duration: bodyPerSection,
        description: `Key point ${i + 1}`
      });
      currentTime += bodyPerSection;
    }

    // Conclusion
    timeline.push({
      section: 'conclusion',
      start: currentTime,
      duration: structure.conclusion,
      description: 'Summary and next steps'
    });

    return timeline;
  }

  // Generate a unique specification ID
  generateSpecId() {
    return `SPEC-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  }

  // Save pending specification
  async savePendingSpec(spec) {
    // Ensure directories exist
    await fs.mkdir(this.pendingSpecsDir, { recursive: true });
    await fs.mkdir(this.approvedSpecsDir, { recursive: true });

    const filePath = path.join(this.pendingSpecsDir, `${spec.id}.json`);
    await fs.writeFile(filePath, JSON.stringify(spec, null, 2));

    console.log(`Specification saved for approval: ${filePath}`);
  }

  // Get all pending specifications
  async getPendingSpecs() {
    try {
      const files = await fs.readdir(this.pendingSpecsDir);
      const pendingSpecs = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.pendingSpecsDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          pendingSpecs.push(JSON.parse(content));
        }
      }

      return pendingSpecs;
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Directory doesn't exist yet
        return [];
      }
      throw error;
    }
  }

  // Approve a specification
  async approveSpec(specId) {
    const pendingFilePath = path.join(this.pendingSpecsDir, `${specId}.json`);
    const approvedFilePath = path.join(this.approvedSpecsDir, `${specId}.json`);

    try {
      // Check if spec exists in pending
      await fs.access(pendingFilePath);

      // Read the pending spec
      const specContent = await fs.readFile(pendingFilePath, 'utf8');
      const spec = JSON.parse(specContent);

      // Update status
      spec.status = 'approved';
      spec.approvedAt = new Date().toISOString();

      // Move to approved directory
      await fs.writeFile(approvedFilePath, JSON.stringify(spec, null, 2));

      // Remove from pending
      await fs.unlink(pendingFilePath);

      console.log(`Specification ${specId} approved and moved to approved directory.`);
      return spec;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Specification ${specId} not found in pending directory`);
      }
      throw error;
    }
  }

  // Reject a specification
  async rejectSpec(specId, reason = '') {
    const pendingFilePath = path.join(this.pendingSpecsDir, `${specId}.json`);

    try {
      // Check if spec exists in pending
      await fs.access(pendingFilePath);

      // Read the pending spec
      const specContent = await fs.readFile(pendingFilePath, 'utf8');
      const spec = JSON.parse(specContent);

      // Update status
      spec.status = 'rejected';
      spec.rejectedAt = new Date().toISOString();
      spec.rejectionReason = reason;

      // Add rejection info to the file name to keep for record
      const rejectedFilePath = path.join(this.pendingSpecsDir, `${specId}-rejected.json`);
      await fs.writeFile(rejectedFilePath, JSON.stringify(spec, null, 2));

      // Remove from pending
      await fs.unlink(pendingFilePath);

      console.log(`Specification ${specId} rejected and moved to rejected record.`);
      return spec;
    } catch (error) {
      if (error.code === 'ENOENT') {
        throw new Error(`Specification ${specId} not found in pending directory`);
      }
      throw error;
    }
  }

  // Get approved specifications ready for video generation
  async getApprovedSpecsReadyForGeneration() {
    try {
      const files = await fs.readdir(this.approvedSpecsDir);
      const approvedSpecs = [];

      for (const file of files) {
        if (file.endsWith('.json')) {
          const filePath = path.join(this.approvedSpecsDir, file);
          const content = await fs.readFile(filePath, 'utf8');
          const spec = JSON.parse(content);

          // Only include specs that haven't been processed yet
          if (!spec.processedAt) {
            approvedSpecs.push(spec);
          }
        }
      }

      return approvedSpecs;
    } catch (error) {
      if (error.code === 'ENOENT') {
        // Directory doesn't exist yet
        return [];
      }
      throw error;
    }
  }
}

module.exports = { SpecGenerator };

// Example usage when run directly
if (require.main === module) {
  (async () => {
    const generator = new SpecGenerator();

    // Example requirements for a video
    const requirements = {
      title: "Building Your First Agent with AgentFactory",
      description: "A step-by-step guide for beginners to create their first AI agent",
      videoType: "tutorial",
      targetAudience: "Beginner Developers",
      keyPoints: [
        "Setting up the development environment",
        "Understanding the AgentFactory architecture",
        "Creating a simple agent configuration",
        "Testing your agent locally",
        "Deploying to production"
      ],
      assets: [
        { type: "image", path: "./assets/logo.png", placement: "top-left" },
        { type: "image", path: "./assets/interface-screenshot.png", placement: "center" }
      ],
      priority: "high"
    };

    try {
      console.log("Generating video specification...");
      const spec = await generator.generateSpec(requirements);

      console.log("\nGenerated Specification Preview:");
      console.log(`ID: ${spec.id}`);
      console.log(`Title: ${spec.specification.title}`);
      console.log(`Type: ${spec.specification.videoType}`);
      console.log(`Duration: ~${spec.specification.duration} seconds`);
      console.log(`Key Points: ${spec.specification.keyPoints.length}`);
      console.log(`Status: ${spec.status}`);
      console.log(`Complexity: ${spec.metadata.complexity}`);
      console.log(`\nFull specification saved to: ./specs/pending/${spec.id}.json`);
      console.log(`\nTo approve this specification, run: node -e "const {SpecGenerator} = require('./generate-specs'); new SpecGenerator().approveSpec('${spec.id}')"`);

    } catch (error) {
      console.error("Error generating specification:", error);
    }
  })();
}