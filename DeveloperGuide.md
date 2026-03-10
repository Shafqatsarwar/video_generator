# Developer Guide: Video Generator V2.0

This guide explains how to set up, run, and extend the AI Video Generation Engine.

## 🛠 Prerequisites

- **Node.js**: v18 or higher (v22 recommended)
- **PowerShell**: For offline voiceover (Windows systems)
- **FFmpeg**: Required by Remotion for video encoding
- **Chrome/Edge**: For headless rendering

## 📥 Installation

1. **Clone the repository**
2. **Install Dependencies**:
   ```bash
   npm install
   ```
3. **Setup Environment**:
   Copy `.env.example` to `.env` and fill in your keys (optional for local use):
   ```bash
   cp .env.example .env
   ```

## 🚀 How to Start

### 1. Simple Rendering
You can use the built-in test scripts to verify the engine:
```bash
node .agents/video-generator/index.js
```

### 2. Using the Agent Skill
The engine is designed to be used as a "Skill" by an AI agent. You can trigger it with a specification object:

```javascript
const { VideoGeneratorAgent } = require('./.agents/video-generator/index');

const agent = new VideoGeneratorAgent();
await agent.generateDemoVideo({
  title: "My Awesome Demo",
  duration: 60,
  keyPoints: ["Feature 1", "Feature 2"],
  story: {
    hook: "The problem with traditional tools...",
    problem: "It takes too long.",
    benefit: "Our solution is 10x faster."
  }
});
```

## 🎙 Voiceover System (Offline vs Online)
- **Offline (Default)**: Uses the Windows PowerShell `SpeechSynthesizer` assembly. No API key required.
- **Online (LLM)**: If an `OPENAI_API_KEY` is provided and the logic is toggled in `index.js`, the engine will use OpenAI TTS-1 for professional high-fidelity voice.

## 🧩 Example Prompts for AI Agents
If you are using this with an AI Assistant, here are prompt templates:

> "Generate a 90-second product overview video about a new CRM tool. The title is 'CRM Pro'. Key points should include Lead Tracking, Automated Outreach, and AI Insights. Use a professional tone with a strong CTA."

> "Create a technical tutorial video. Focus on 'How to install the Agent Factory'. Don't show any branding or logos in the header."

## 📦 Required Packages & Commands
- `remotion`: Core video framework
- `@remotion/bundler`: Handles React-to-JS bundling
- `@remotion/renderer`: Performs the actual frame-by-frame MP4 generation
- `ffmpeg-static`: Provides the binary needed for encoding

**Important Commands:**
- `npm start`: Main agent entry point
- `node generate-intro.js`: Generate the project introduction
- `rm -rf output/*`: Clear previous renderings

## 🛠 Future Extensions
- **Custom Fonts**: Add `.ttf` files to `assets` and update `asset-manager.js`.
- **Music**: Update `renderer.js` to include a background `Audio` track.
- **New Slides**: Create new React components in `renderer.js` and add them to the `MainComposition` sequences.
