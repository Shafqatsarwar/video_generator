# 🎥 Excellence Links | Video Generation Engine V2.0

Welcome to the ultimate guide for the Excellence Links Video Generator. This project has been polished into a high-skill, dual-mode engine that works flawlessly both **with and without LLMs**.

---

## 🚀 Quick Start (Commands)

### 1. Initial Setup
```bash
# Install all core dependencies
npm install

# Setup environment
copy .env.example .env
# Edit .env and add your GOOGLE_API_KEY if you want AI features
```

### 2. Run with UI (Dashboard Mode)
```bash
# Start the Backend API (Port 3001)
npm run dev

# Start the Frontend Dashboard (Port 3000)
cd video-ui-nextjs
npm run dev
```

### 3. Run with Terminal (Logic Only Mode)
```bash
# Generate a standard trial video
node generate_video.js

# Generate an architecture-specific video
node generate_architecture_video.js
```

---

## 🕵️‍♂️ Hidden Tactics & Advanced Features

### 💻 Tactic 1: Instant Desktop Delivery
We have included a "Fast-Track" script that generates a video and automatically delivers it to your Desktop, bypassing the browser.
```bash
node test_and_copy_to_desktop.js
```

### 🔄 Tactic 2: Dual-Mode Operation (LLM vs Deterministic)
The engine is "Dual-Skilled". It detects its environment automatically:
- **LLM Mode (Online)**: If `GOOGLE_API_KEY` is present, it uses Gemini to rewrite your script into a professional "Hook-Problem-Demo-CTA" story structure.
- **Deterministic Mode (Offline)**: If the API is missing or `useAI` is `false`, it uses a mathematical template system to map your text directly to scene durations, ensuring 100% reliability without internet.

### 🎙 Tactic 3: Multi-Provider Voice Selection
You can toggle between local and premium voices by changing the `voiceover.provider` in your API request or code:
- `local`: Uses Windows Native TTS (Free, Offline, Male/Female).
- `openai`: Uses OpenAI TTS-1 (`alloy`, `echo`, `fable`, etc.).
- `elevenlabs`: Uses high-fidelity ElevenLabs voices.

### ⏳ Tactic 4: Precision Waveform Syncing
Unlike basic generators, this engine **actually listens** to the generated audio file. It calculates the exact millisecond duration and dynamically stretches or shrinks the video timeline so that subtitles and visuals never drift out of sync.

### 🛡 Tactic 5: RTL / Urdu Subtitles
The engine is specialized for Urdu/English localization. When `subtitles.language` is set to `urdu`:
- Text direction flips to **RTL** (Right-to-Left).
- Font family switches to a highly readable **Serif** face.
- Font size is automatically increased for complex script clarity.

---

## 📊 Evaluation Metrics
After every generation, the engine performs a "Self-Assessment":
- **Accuracy**: Did the video title and duration meet the target specification?
- **Performance**: Was the render time efficient? (Target: < 4 seconds of render per 1 second of video).
- **Usability**: Did the provided parameters allow for a high-quality output?

---

## 📦 File Structure (Cleaned & Polished)
- `.agents/video-generator/`: The brain of the project.
  - `index.js`: Orchestrator & Metric Scorer.
  - `renderer.js`: React-to-Video engine (Remotion).
  - `voiceover-generator.js`: The provider-aware TTS engine.
- `video-ui-nextjs/`: The premium React dashboard.
- `output/`: Local storage for your generated hits.

---

## 📝 Example Advanced Trigger
```javascript
const agent = new VideoGeneratorAgent();
await agent.generateDemoVideo({
  title: "AI Revolution",
  duration: 45,
  voiceover: { provider: 'local', gender: 'Female' },
  subtitles: { language: 'english' }
});
```

*Excellence Links: Polished, Professional, and Ready to Ship.*
