# Excellence Links | Development Reference

## Build & Dev Commands
- **Backend API**: `npm run dev` (Runs from root, port 3001)
- **Frontend UI**: `cd video-ui-nextjs && npm run dev` (Port 3000)
- **Manual Test**: `node generate_video.js`
- **Desktop Export**: `node test_and_copy_to_desktop.js`

## Operational Guidelines
- **Dual Mode**: Project supports both AI (Gemini) and Local Template modes.
- **Voiceover**: Support for Local Windows TTS, OpenAI, and ElevenLabs.
- **Assets**: All rendered videos are saved in the `output/` directory.

## Code Style
- **Node.js**: CommonJS for backend scripts.
- **Frontend**: Next.js 15, Tailwind v4, Lucide Icons.
- **Remotion**: React components for video composition.
- **Naming**: camelCase for variables, PascalCase for components/classes.

## Key Files
- `.env`: API keys (ignored by git).
- `DEVELOPER_GUIDE.md`: Comprehensive logic and "hidden tactics" documentation.
- `.agents/video-generator/index.js`: Main engine orchestrator.
