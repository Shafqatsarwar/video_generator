# Excellence Links Video Generator - Developer Guide

Welcome to the Excellence Links Video Generator documentation. This system is designed as a sophisticated, dual-layered architecture focusing on deterministic, offline-capable logic for rendering high-quality videos, with the optional capability to connect an LLM supervisor.

This guide provides a comprehensive overview of the two main parts of the project, including setup commands, required packages, and operational principles.

---

## Part 1: Core Video Generation Engine (Terminal/Logic Mode)

The core engine is entirely responsible for taking raw data (script, timing, branding, assets) and algorithmically producing an `.mp4` video. It uses deterministic word-counting algorithms to map screen time per visual section, strictly adhering to offline capabilities via local Windows TTS.

### 1. Engine Dependencies
The core relies heavily on Node.js and the following major packages:
- **@remotion/renderer & @remotion/bundler**: For translating React components into Chromium-rendered video frames.
- **ffmpeg-static**: To accurately measure audio durations and bundle final media.
- **puppeteer**: Specifically used by Remotion's rendering pipeline.
- **@google/generative-ai** (Optional): A bridge package used only if dynamic LLM story enhancement is requested (`useAI: true`).

### 2. Setup & Installation
Ensure you are in the root directory: \`D:\\Panaverse\\Q2\\video_generator\`
```bash
# Install core dependencies
npm install

# (Optional) Ensure global dependencies if ffmpeg is causing path issues
npm install -g ffmpeg-static
```

### 3. Core File Structure
- \`.agents/video-generator/index.js\`: The master orchestrator (Node Agent) triggering the steps.
- \`.agents/video-generator/script-generator.js\`: Handles slicing input text into exact segments.
- \`.agents/video-generator/voiceover-generator.js\`: Interfaces with Windows local TTS via PowerShell.
- \`.agents/video-generator/renderer.js\`: Builds the React composition and bundles it into an MP4 file.
- \`.agents/video-generator/local-tts.ps1\`: The PowerShell script enforcing the 'Female' voiceover parameter.

### 4. Running a Test Video
To test the core deterministic pipeline entirely offline:
```bash
# Execute the base template trigger
node generate_video.js

# Execute the architecture explanatory video trigger
node generate_architecture_video.js
```
*Note: Successful runs will output the finalized `.mp4` into the `/output` folder.*

---

## Part 2: Next.js Graphical Dashboard (Desktop/Web UI)

To simplify operations for users extending outside of the IDE environment, a comprehensive Next.js frontend has been established. This dashboard provides inputs for scripts, timing boundaries, subtitle preferences, and file uploads.

### 1. Dashboard Dependencies
The frontend is built inside the \`video-ui-nextjs\` subdirectory. Major packages include:
- **Next.js 15 (App Router)**: Core framework.
- **React & React DOM**: For rendering UI elements.
- **Tailwind CSS v4**: For the glassmorphism aesthetic, brand coloring (`--color-brand-yellow: #facc15`), and responsive layouts.
- **Lucide React**: For scalable, modern icons.

### 2. Setup & Installation
Navigate into the UI folder:
```bash
cd video-ui-nextjs

# Install frontend dependencies
npm install

# Force a local build to ensure clean syntaxes
npm run build
```

### 3. Running the Dashboard locally
To boot up the interactive interface:
```bash
# Inside video-ui-nextjs
npm run dev
```
Open your browser to \`http://localhost:3000\`. Once you submit the payload via the frontend button, it is designed to route parameters back into the Core Generator (Part 1).

---

## Future Implementation: Agent Supervisor Layer
We are preparing to introduce a master **LLM Agent Supervisor** bridging Part 1 and Part 2.
- **Goal**: When a user inputs a vague prompt into the Next.js UI, the LLM Supervisor will intelligently split the content into the exact JSON mapping required by the Node Generator (e.g., extracting "key points", generating "descriptions").
- **Offline Logic Maintained**: The LLM will ONLY structure the data. Audio generation, frame pacing, and visual rendering will remain strictly mathematical and deterministic offline (via local-TTS and Remotion bounds) ensuring robust performance regardless of LLM server status.

### Environment Management
To activate the LLM Supervisor layer, a Google Gemini API Key has been configured in the local \`.env\` file.

**Environment Variables Setup:**
Create a \`.env\` file in the project root containing:
```env
GOOGLE_API_KEY="AIzaSyBrUsdXtrNSYUD5ILprpoLCu3JI8nfc2L8"
```
The \`process.env.GOOGLE_API_KEY\` is read by \`script-generator.js\` to initialize the \`GoogleGenerativeAI\` client. If missing or disconnected, the system safely falls back to standard logic matching.

---

## 🧩 Using the Agent Skill (Advanced)

The engine is designed to be utilized as an AI "Skill" by an external agent. You can trigger it with a structured specification object:

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

## 🎙 Voiceover System Context (Offline vs Online)
- **Offline (Default Active)**: Relies on the Windows PowerShell `SpeechSynthesizer` assembly to generate `.wav` files. No internet required.
- **Online (LLM - Deprecated/Disabled in current template)**: To fully switch to external APIs like OpenAI TTS-1, you would need to adjust the `voiceover-generator.js` and provide `OPENAI_API_KEY`. The current build favors Offline Deterministic TTS for consistent synchronization testing.

## 📝 Example Prompts for the AI Agent Supervisor
Once the supervisor is fully implemented, here are example prompts you could feed to the dashboard or agent:

> "Generate a 60-second product overview video about our new CRM tool. The title is 'CRM Pro'. Key points should include Lead Tracking, Automated Outreach, and AI Insights. Use a professional tone with a strong CTA."

> "Create a technical tutorial video focusing on 'How to install the Agent Factory package'. Do not show branding headers."
