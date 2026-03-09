// Human Approval Workflow for AgentFactory Video Generator
// This script demonstrates how humans can review and approve generated specifications

const { SpecGenerator } = require('./generate-specs');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class ApprovalWorkflow {
  constructor() {
    this.generator = new SpecGenerator();
  }

  // Main workflow function
  async runApprovalProcess() {
    console.log("=== AgentFactory Video Specification Approval System ===\n");

    // Generate some example specifications
    await this.generateExampleSpecs();

    // Show pending specifications
    await this.showPendingSpecs();

    // Process approvals
    await this.processApprovals();
  }

  // Generate example specifications
  async generateExampleSpecs() {
    console.log("Generating example specifications...\n");

    // Example 1: Tutorial
    await this.generator.generateSpec({
      title: "Getting Started with AgentFactory",
      description: "Learn the basics of AgentFactory platform",
      videoType: "tutorial",
      targetAudience: "New Users",
      keyPoints: [
        "Account setup and authentication",
        "Creating your first project",
        "Basic agent configuration",
        "Running your first agent",
        "Understanding the dashboard"
      ],
      priority: "high"
    });

    // Example 2: Feature Walkthrough
    await this.generator.generateSpec({
      title: "Advanced Agent Configuration",
      description: "Deep dive into advanced configuration options",
      videoType: "feature-walkthrough",
      targetAudience: "Experienced Users",
      keyPoints: [
        "Custom data sources",
        "Advanced prompting techniques",
        "Integration with external APIs",
        "Performance optimization",
        "Security best practices"
      ],
      priority: "medium"
    });

    // Example 3: Case Study
    await this.generator.generateSpec({
      title: "Building a Customer Support Agent",
      description: "Real-world example of a customer support AI agent",
      videoType: "case-study",
      targetAudience: "Developers",
      keyPoints: [
        "Requirements analysis",
        "Designing the agent flow",
        "Integration with CRM",
        "Testing and validation",
        "Deployment and monitoring"
      ],
      priority: "high"
    });
  }

  // Show all pending specifications
  async showPendingSpecs() {
    const pendingSpecs = await this.generator.getPendingSpecs();

    if (pendingSpecs.length === 0) {
      console.log("No pending specifications to review.\n");
      return;
    }

    console.log(`Found ${pendingSpecs.length} pending specification(s) for review:\n`);

    for (const spec of pendingSpecs) {
      console.log(`Specification ID: ${spec.id}`);
      console.log(`Title: ${spec.specification.title}`);
      console.log(`Type: ${spec.specification.videoType}`);
      console.log(`Target Audience: ${spec.specification.targetAudience}`);
      console.log(`Duration: ~${spec.specification.duration} seconds`);
      console.log(`Key Points: ${spec.specification.keyPoints.length}`);
      console.log(`Complexity: ${spec.metadata.complexity}`);
      console.log(`Priority: ${spec.metadata.priority}`);
      console.log("---");
    }
  }

  // Process approvals interactively
  async processApprovals() {
    const pendingSpecs = await this.generator.getPendingSpecs();

    if (pendingSpecs.length === 0) {
      console.log("No specifications to approve.");
      return;
    }

    for (const spec of pendingSpecs) {
      await this.reviewAndApproveSpec(spec);
    }

    console.log("\nApproval process completed!");

    // Show approved specs
    await this.showApprovedSpecs();
  }

  // Review and approve a single specification
  async reviewAndApproveSpec(spec) {
    console.log(`\n--- Reviewing Specification ---`);
    console.log(`ID: ${spec.id}`);
    console.log(`Title: ${spec.specification.title}`);
    console.log(`Type: ${spec.specification.videoType}`);
    console.log(`Duration: ~${spec.specification.duration} seconds`);
    console.log(`Complexity: ${spec.metadata.complexity}`);
    console.log(`Priority: ${spec.metadata.priority}`);

    console.log("\nKey Points:");
    spec.specification.keyPoints.forEach((point, index) => {
      console.log(`  ${index + 1}. ${point}`);
    });

    // Ask for approval
    const decision = await this.askForDecision(spec.id);

    if (decision.action === 'approve') {
      await this.generator.approveSpec(spec.id);
      console.log(`✅ Specification ${spec.id} approved!\n`);
    } else if (decision.action === 'reject') {
      await this.generator.rejectSpec(spec.id, decision.reason);
      console.log(`❌ Specification ${spec.id} rejected: ${decision.reason}\n`);
    } else {
      console.log(`⏭️  Skipping specification ${spec.id}\n`);
    }
  }

  // Ask for approval decision
  askForDecision(specId) {
    return new Promise((resolve) => {
      const askDecision = () => {
        rl.question(`Approve specification ${specId}? (a=approve, r=reject, s=skip): `, (answer) => {
          const action = answer.toLowerCase().trim();

          if (action === 'a' || action === 'approve') {
            resolve({ action: 'approve' });
          } else if (action === 'r' || action === 'reject') {
            rl.question('Enter rejection reason: ', (reason) => {
              resolve({ action: 'reject', reason: reason.trim() || 'No reason provided' });
            });
          } else if (action === 's' || action === 'skip') {
            resolve({ action: 'skip' });
          } else {
            console.log('Invalid input. Please enter "a" for approve, "r" for reject, or "s" for skip.');
            askDecision();
          }
        });
      };

      askDecision();
    });
  }

  // Show approved specifications
  async showApprovedSpecs() {
    const approvedSpecs = await this.generator.getApprovedSpecsReadyForGeneration();

    if (approvedSpecs.length === 0) {
      console.log("\nNo approved specifications ready for video generation.");
      return;
    }

    console.log(`\n${approvedSpecs.length} specification(s) approved and ready for video generation:`);

    for (const spec of approvedSpecs) {
      console.log(`- ${spec.specification.title} (${spec.id})`);
    }

    console.log(`\nThese specifications can now be processed by the video generator agent.`);
  }
}

// Run the approval workflow when this script is executed directly
if (require.main === module) {
  const workflow = new ApprovalWorkflow();

  workflow.runApprovalProcess()
    .catch(console.error)
    .finally(() => {
      rl.close();
    });
}

module.exports = { ApprovalWorkflow };