# Video Generator Constitution
<!-- Specialized agent for creating demo videos for AgentFactory -->

## Core Principles

### I. Demo-Centric Approach
Create high-quality, engaging demo videos that showcase AgentFactory capabilities effectively; Every video must have clear learning objectives, concise explanations, and practical examples; Focus on real-world use cases and scenarios that resonate with the target audience.

### II. Automation-First
Automate the entire video creation pipeline from script generation to final rendering; Minimize manual intervention in the video production process; Reusable components and templates for consistent quality across all demos.

### III. Test-First (NON-NEGOTIABLE)
Every video asset and component must be validated before inclusion; Script → Visual Mockup → Asset Verification → Final Render; Quality checks at each stage of the pipeline.

### IV. Modular Composition
Build video components as reusable, composable modules; Separate content logic from presentation; Enable easy customization and adaptation for different audiences.

### V. Accessibility & Standards
Ensure all videos meet accessibility standards (captions, audio descriptions, clear visuals); Follow consistent branding guidelines for AgentFactory; Maintain high production values for professional appearance.

### VI. Scalability & Performance
Design the system to handle multiple concurrent video generation requests; Optimize for efficient resource utilization during rendering; Support various output formats and resolutions.

## Technical Requirements
<!-- Technology stack requirements, compliance standards, deployment policies, etc. -->

Video Generation Stack:
- Python-based automation tools for video composition
- FFmpeg for video processing and rendering
- Modern templating engines for dynamic content insertion
- Cloud storage integration for asset management
- Containerized deployment for scalability

Quality Standards:
- Minimum 720p resolution, 30fps output
- Consistent color palette and typography matching AgentFactory brand
- Audio quality at 48kHz, 192kbps minimum
- Maximum render time of 10 minutes per minute of video

## Development Workflow
<!-- Code review requirements, testing gates, deployment approval process, etc. -->

Development Process:
- Define demo objectives and target audience before implementation
- Create storyboards and scripts for approval
- Implement modular video components with unit tests
- Conduct quality assurance on sample renders
- Deploy to staging environment for review
- Publish to production after final approval

Review Criteria:
- Technical accuracy of demonstrations
- Clarity and engagement of presentation
- Consistency with AgentFactory brand guidelines
- Performance and accessibility compliance

## Governance
<!-- Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

All video generation implementations must comply with this constitution; Changes to core principles require stakeholder approval and impact assessment; Regular audits to ensure continued adherence to quality standards.

**Version**: 1.0.0 | **Ratified**: 2026-03-09 | **Last Amended**: 2026-03-09
