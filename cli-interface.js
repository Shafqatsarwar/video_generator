#!/usr/bin/env node

// CLI Interface for AgentFactory Video Generator
// Provides command-line interface for spec generation and approval

const { SpecGenerator } = require('./generate-specs');
const { ApprovalWorkflow } = require('./approval-workflow');
const { CompleteWorkflow } = require('./complete-workflow');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class CLIInterface {
  constructor() {
    this.generator = new SpecGenerator();
    this.approval = new ApprovalWorkflow();
  }

  // Display main menu
  async showMainMenu() {
    console.log("\n=== AgentFactory Video Generator CLI ===");
    console.log("1. Generate new video specification");
    console.log("2. Review and approve pending specifications");
    console.log("3. Run complete workflow (gen->approve->video)");
    console.log("4. View pending specifications");
    console.log("5. View approved specifications");
    console.log("6. Exit");

    const choice = await this.askQuestion("\nEnter your choice (1-6): ");

    switch (choice.trim()) {
      case '1':
        await this.generateNewSpec();
        break;
      case '2':
        await this.reviewAndApprove();
        break;
      case '3':
        await this.runCompleteWorkflow();
        break;
      case '4':
        await this.viewPendingSpecs();
        break;
      case '5':
        await this.viewApprovedSpecs();
        break;
      case '6':
        console.log("Goodbye!");
        rl.close();
        return;
      default:
        console.log("Invalid choice. Please enter 1-6.");
        await this.showMainMenu();
    }
  }

  // Generate a new specification
  async generateNewSpec() {
    console.log("\n--- Generate New Video Specification ---");

    try {
      const title = await this.askQuestion("Enter video title: ");
      const description = await this.askQuestion("Enter video description: ");
      const videoType = await this.selectVideoType();
      const targetAudience = await this.askQuestion("Enter target audience (e.g., Developers, Business Users): ");
      const priority = await this.selectPriority();

      console.log("\nEnter key points (press Enter twice when done):");
      const keyPoints = [];
      let keyPoint;
      do {
        keyPoint = await this.askQuestion("  Key point: ");
        if (keyPoint.trim() !== '') {
          keyPoints.push(keyPoint.trim());
        }
      } while (keyPoint.trim() !== '');

      if (keyPoints.length === 0) {
        console.log("At least one key point is required.");
        await this.generateNewSpec();
        return;
      }

      const requirements = {
        title: title.trim(),
        description: description.trim(),
        videoType,
        targetAudience: targetAudience.trim(),
        keyPoints,
        priority
      };

      const spec = await this.generator.generateSpec(requirements);

      console.log(`\n✓ Specification generated successfully!`);
      console.log(`ID: ${spec.id}`);
      console.log(`Title: ${spec.specification.title}`);
      console.log(`Status: ${spec.status}`);
      console.log(`Saved to: ./specs/pending/${spec.id}.json`);

    } catch (error) {
      console.error("Error generating specification:", error.message);
    }

    await this.continueToMenu();
  }

  // Select video type
  async selectVideoType() {
    console.log("\nSelect video type:");
    console.log("1. Tutorial");
    console.log("2. Feature Walkthrough");
    console.log("3. Case Study");
    console.log("4. Product Overview");

    const choice = await this.askQuestion("Enter choice (1-4): ");

    const types = {
      '1': 'tutorial',
      '2': 'feature-walkthrough',
      '3': 'case-study',
      '4': 'product-overview'
    };

    return types[choice.trim()] || 'tutorial';
  }

  // Select priority
  async selectPriority() {
    console.log("\nSelect priority:");
    console.log("1. Low");
    console.log("2. Medium");
    console.log("3. High");

    const choice = await this.askQuestion("Enter choice (1-3): ");

    const priorities = {
      '1': 'low',
      '2': 'medium',
      '3': 'high'
    };

    return priorities[choice.trim()] || 'medium';
  }

  // Review and approve pending specifications
  async reviewAndApprove() {
    const pendingSpecs = await this.generator.getPendingSpecs();

    if (pendingSpecs.length === 0) {
      console.log("\nNo pending specifications to review.");
      await this.continueToMenu();
      return;
    }

    console.log(`\nFound ${pendingSpecs.length} pending specification(s):\n`);

    for (const spec of pendingSpecs) {
      console.log(`ID: ${spec.id}`);
      console.log(`Title: ${spec.specification.title}`);
      console.log(`Type: ${spec.specification.videoType}`);
      console.log(`Duration: ~${spec.specification.duration} seconds`);
      console.log(`Priority: ${spec.metadata.priority}`);
      console.log("---");
    }

    const ids = pendingSpecs.map(spec => spec.id);
    const specId = await this.askQuestion(`Enter specification ID to review (or 'all' for all): `);

    if (specId.trim().toLowerCase() === 'all') {
      // Process all specs
      for (const spec of pendingSpecs) {
        await this.processSingleSpec(spec.id);
      }
    } else if (ids.includes(specId.trim())) {
      await this.processSingleSpec(specId.trim());
    } else {
      console.log("Invalid specification ID.");
    }

    await this.continueToMenu();
  }

  // Process a single spec for approval
  async processSingleSpec(specId) {
    // Since we don't have readline in this context, we'll simulate the approval
    console.log(`\nProcessing specification: ${specId}`);

    const action = await this.askQuestion(`Approve specification ${specId}? (y/n): `);

    if (action.toLowerCase().startsWith('y')) {
      await this.generator.approveSpec(specId);
      console.log(`✓ Specification ${specId} approved!`);
    } else {
      const reason = await this.askQuestion("Enter rejection reason (optional): ");
      await this.generator.rejectSpec(specId, reason.trim() || 'Not specified');
      console.log(`✗ Specification ${specId} rejected!`);
    }
  }

  // Run complete workflow
  async runCompleteWorkflow() {
    console.log("\nRunning complete workflow (this may take a while)...\n");

    const workflow = new CompleteWorkflow();
    await workflow.runCompleteWorkflow();

    await this.continueToMenu();
  }

  // View pending specifications
  async viewPendingSpecs() {
    const pendingSpecs = await this.generator.getPendingSpecs();

    if (pendingSpecs.length === 0) {
      console.log("\nNo pending specifications.");
    } else {
      console.log(`\n${pendingSpecs.length} pending specification(s):\n`);

      for (const spec of pendingSpecs) {
        console.log(`ID: ${spec.id}`);
        console.log(`Title: ${spec.specification.title}`);
        console.log(`Type: ${spec.specification.videoType}`);
        console.log(`Target: ${spec.specification.targetAudience}`);
        console.log(`Duration: ~${spec.specification.duration}s`);
        console.log(`Priority: ${spec.metadata.priority}`);
        console.log(`Created: ${spec.createdAt}`);
        console.log("---");
      }
    }

    await this.continueToMenu();
  }

  // View approved specifications
  async viewApprovedSpecs() {
    const approvedSpecs = await this.generator.getApprovedSpecsReadyForGeneration();

    if (approvedSpecs.length === 0) {
      console.log("\nNo approved specifications ready for generation.");
    } else {
      console.log(`\n${approvedSpecs.length} approved specification(s) ready for generation:\n`);

      for (const spec of approvedSpecs) {
        console.log(`ID: ${spec.id}`);
        console.log(`Title: ${spec.specification.title}`);
        console.log(`Type: ${spec.specification.videoType}`);
        console.log(`Target: ${spec.specification.targetAudience}`);
        console.log(`Duration: ~${spec.specification.duration}s`);
        console.log(`Approved: ${spec.approvedAt}`);
        console.log("---");
      }
    }

    await this.continueToMenu();
  }

  // Helper function to ask questions
  askQuestion(question) {
    return new Promise((resolve) => {
      rl.question(question, (answer) => {
        resolve(answer);
      });
    });
  }

  // Continue to main menu
  async continueToMenu() {
    await this.askQuestion("\nPress Enter to return to main menu...");
    await this.showMainMenu();
  }
}

// Run CLI when executed directly
if (require.main === module) {
  const cli = new CLIInterface();

  cli.showMainMenu()
    .catch(console.error);
}

module.exports = { CLIInterface };