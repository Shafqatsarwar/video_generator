# AI Video Generation Engine V2.0

A production-grade, agent-powered video creation platform built for automated demo generation. This engine follows **Spec-Driven Development (SDD)** principles to transform high-level specifications into branded, narrated MP4 videos.

## 🚀 Overview
The Video Generator V2.0 represents a significant leap from cloud-dependent scripts to an autonomous storytelling engine. It features a sophisticated "Story Layer" that automatically structures content into engaging Hook, Problem, Benefit, and Call-to-Action sequences.

### Key Features
- **Intelligent Storytelling**: Automatically logic-gates content into professional narrative blocks.
- **Offline Voiceover**: Built-in Windows TTS integration for cost-effective, offline narration.
- **Remotion 4.x Engine**: High-performance React-based video rendering.
- **Branding Freedom**: Fully customizable branding system (Toggle logos, colors, and website marks).
- **Automated Asset Management**: Intelligent handling of local and remote assets with validation.

## 🏗 Project Review (V2.0 Upgrade)
- **Engine**: Upgraded from simple linear sequencing to dynamic narrativa metadata-driven compositions.
- **Audio**: Implemented a local PowerShell bridge for zero-API-cost speech synthesis.
- **Infrastructure**: Fixed critical bundling and asset-serving bugs to ensure production readiness.
- **Testing**: Confirmed with a 96-test comprehensive suite covering logic, timing, and rendering.

## 📁 Project Structure
- `.agents/video-generator/`: Core agent logic, renderer, and script generator.
- `.specify/`: Context and constitution for the AI agent.
- `introduction.mp4`: The final production intro video.

## 🚦 Quick Start
See the [DeveloperGuide.md](./DeveloperGuide.md) for detailed installation and usage instructions.

```bash
npm install
npm start
```

## 📄 License
MIT © 2026 AgentFactory Team