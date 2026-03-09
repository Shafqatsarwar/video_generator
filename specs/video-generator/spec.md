# Video Generator Specification

**Document Type**: Specification (First Draft)  
**Version**: 0.1 (Draft)  
**Phase**: 2 (Specification)  
**Date**: March 9, 2026  
**Status**: Awaiting Review  

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-03-09 | Video Generator Team | First Draft |

---

## Table of Contents

1. [Introduction](#1-introduction)
2. [Overall Description](#2-overall-description)
3. [System Architecture](#3-system-architecture)
4. [Functional Requirements](#4-functional-requirements)
5. [Non-Functional Requirements](#5-non-functional-requirements)
6. [Component Specifications](#6-component-specifications)
7. [API Specifications](#7-api-specifications)
8. [Data Models](#8-data-models)
9. [User Interface Specifications](#9-user-interface-specifications)
10. [Integration Specifications](#10-integration-specifications)
11. [Quality Assurance](#11-quality-assurance)
12. [Deployment Specifications](#12-deployment-specifications)
13. [Appendices](#13-appendices)

---

## 1. Introduction

### 1.1 Purpose

This specification defines the requirements for the AgentFactory Video Generator, a system that automates the creation of demo videos from JSON specifications. This document serves as the authoritative reference for development, testing, and validation.

### 1.2 Scope

The Video Generator shall:
- Accept JSON specifications for video content
- Generate professional-quality videos automatically
- Support multiple video types (tutorial, feature-walkthrough, product-overview, case-study)
- Enforce AgentFactory branding guidelines
- Provide both local and cloud rendering options
- Integrate with existing CI/CD workflows

### 1.3 Definitions and Acronyms

| Term | Definition |
|------|------------|
| **Composition** | A Remotion term for a video scene or sequence |
| **Spec** | JSON specification defining video content |
| **Render** | Process of generating final video from components |
| **FPS** | Frames Per Second |
| **SDD** | Spec-Driven Development |
| **MVP** | Minimum Viable Product |

### 1.4 References

- [Discovery Document](./01-discovery.md)
- [Technical Research](./02-technical-research.md)
- [Findings Summary](./03-findings-summary.md)
- [Constitution](../../.specify/memory/constitution.md)
- [Remotion Documentation](https://www.remotion.dev/docs)

### 1.5 Overview

This specification follows the SDD (Spec-Driven Development) methodology, ensuring clear requirements before implementation begins.

---

## 2. Overall Description

### 2.1 Product Perspective

The Video Generator is a standalone system that integrates with the AgentFactory ecosystem:

```
┌─────────────────────────────────────────────────────────────┐
│                    AgentFactory Ecosystem                    │
│                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────┐  │
│  │   Website    │    │  Dashboard   │    │ Documentation │  │
│  └──────────────┘    └──────────────┘    └──────────────┘  │
│                                                              │
│                    ┌──────────────┐                          │
│                    │   Video      │◄──────── JSON Specs     │
│                    │  Generator   │                          │
│                    └──────────────┘                          │
│                           │                                   │
│                           ▼                                   │
│                    ┌──────────────┐                          │
│                    │   Output     │                          │
│                    │   Videos     │                          │
│                    └──────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 Product Functions

**Primary Functions**:
1. Parse JSON video specifications
2. Generate narrative scripts from specifications
3. Manage media assets (images, videos, audio, fonts)
4. Render videos using Remotion framework
5. Support batch processing
6. Provide progress tracking
7. Export to multiple formats (MP4, WebM)

### 2.3 User Classes and Characteristics

| User Class | Characteristics | Needs |
|------------|-----------------|-------|
| **Marketing Manager** | Non-technical, time-constrained | Quick turnaround, brand consistency |
| **Developer Advocate** | Technical, quality-focused | Code examples, accuracy |
| **DevOps Engineer** | Infrastructure-focused | Scalability, monitoring, reliability |
| **Content Creator** | Mixed technical skills | Easy to use, templates |

### 2.4 Operating Environment

**Development**:
- Node.js 16+
- Windows, macOS, or Linux
- 8GB+ RAM recommended
- Modern code editor (VS Code)

**Production**:
- Docker containers
- AWS Lambda (optional)
- AWS S3 for asset storage
- CDN for distribution

### 2.5 Design and Implementation Constraints

1. **Technology Stack**:
   - Must use Remotion for video generation
   - Must support Node.js 16+
   - Must use React for compositions

2. **Compliance**:
   - WCAG 2.1 AA accessibility standards
   - AgentFactory brand guidelines
   - Open-source license compatibility

3. **Performance**:
   - Render time < 10 minutes per minute of video
   - Memory usage < 2GB per render job
   - Support 3+ concurrent jobs

### 2.6 Assumptions and Dependencies

**Assumptions**:
- Users have basic command-line knowledge
- Internet connection available for dependencies
- Modern hardware (multi-core CPU, 8GB+ RAM)

**Dependencies**:
- Remotion 4.x
- FFmpeg (bundled)
- Puppeteer (bundled)
- Node.js 16+

---

## 3. System Architecture

### 3.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Video Generator System                   │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   CLI / API   │  │   Skill       │  │   Batch       │
│   Interface   │  │   Interface   │  │   Processor   │
└───────────────┘  └───────────────┘  └───────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  VideoGeneratorAgent                         │
│  (Main Orchestrator)                                         │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
        ▼                   ▼                   ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│   Script      │  │   Asset       │  │   Renderer    │
│   Generator   │  │   Manager     │  │   (Remotion)  │
└───────────────┘  └───────────────┘  └───────────────┘
        │                   │                   │
        │                   │                   ▼
        │                   │         ┌───────────────┐
        │                   │         │  Compositions │
        │                   │         │  (React)      │
        │                   │         └───────────────┘
        │                   │                   │
        ▼                   ▼                   ▼
┌─────────────────────────────────────────────────────────────┐
│                      Output Layer                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  MP4 Files   │  │  WebM Files  │  │   Metadata   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 3.2 Component Overview

| Component | Responsibility | Technology |
|-----------|----------------|------------|
| CLI/API Interface | User interaction | Node.js |
| VideoGeneratorAgent | Orchestration | Node.js |
| Script Generator | Content creation | Node.js |
| Asset Manager | Asset handling | Node.js + FS |
| Renderer | Video rendering | Remotion + React |
| Compositions | Video templates | React |

### 3.3 Data Flow

```
JSON Spec → Parse → Script → Assets → Compose → Render → Output
                │        │         │          │
                ▼        ▼         ▼          ▼
            Validate  Load     Bundle     Encode
```

### 3.4 Deployment Architecture

**Local Development**:
```
[Developer Machine]
    ├── Node.js Runtime
    ├── Remotion Studio (preview)
    └── Local file system (output)
```

**Production**:
```
[AWS Cloud]
    ├── EC2 / Lambda (rendering)
    ├── S3 (asset storage)
    ├── CloudFront (CDN)
    └── CloudWatch (monitoring)
```

---

## 4. Functional Requirements

### 4.1 Video Specification Parsing

**FR-001: Parse JSON Specifications**

| Attribute | Value |
|-----------|-------|
| ID | FR-001 |
| Priority | P0 (Critical) |
| Description | System shall parse JSON video specifications |
| Input | JSON object with video specification |
| Output | Validated specification object |
| Error Handling | Return meaningful error for invalid JSON |

**Specification Schema**:
```json
{
  "title": { "type": "string", "required": true, "minLength": 3, "maxLength": 200 },
  "description": { "type": "string", "required": false },
  "videoType": { "type": "string", "enum": ["tutorial", "feature-walkthrough", "product-overview", "case-study", "default"], "default": "default" },
  "keyPoints": { "type": "array", "items": { "type": "string" }, "maxItems": 20 },
  "duration": { "type": "number", "minimum": 10, "maximum": 600, "default": 60 },
  "targetAudience": { "type": "string", "default": "Developers" },
  "assets": { "type": "array", "items": { "type": "object" } },
  "quality": { "type": "string", "enum": ["high", "medium", "low"], "default": "high" },
  "resolution": { "type": "string", "enum": ["720p", "1080p", "4k"], "default": "1080p" },
  "outputFormat": { "type": "string", "enum": ["mp4", "webm"], "default": "mp4" }
}
```

### 4.2 Script Generation

**FR-002: Generate Narrative Scripts**

| Attribute | Value |
|-----------|-------|
| ID | FR-002 |
| Priority | P0 (Critical) |
| Description | System shall generate narrative scripts from specifications |
| Input | Validated specification object |
| Output | Script object with introduction, body, conclusion, timing, voiceover |

**Script Structure**:
```javascript
{
  metadata: {
    title: string,
    videoType: string,
    targetAudience: string,
    estimatedDuration: number,
    generatedAt: string (ISO 8601)
  },
  structure: {
    introduction: {
      hook: string,
      branding: string,
      duration: number
    },
    body: [
      {
        title: string,
        content: string,
        keyPoint: string,
        duration: number,
        order: number
      }
    ],
    conclusion: {
      summary: string,
      callToAction: string,
      closing: string,
      duration: number
    }
  },
  timing: {
    total: number,
    intro: number,
    body: number,
    conclusion: number
  },
  voiceover: {
    full: string,
    estimatedWords: number,
    estimatedSpeakingTime: {
      seconds: number,
      minutes: string
    }
  },
  visualCues: [
    {
      section: string,
      type: string,
      description: string
    }
  ]
}
```

### 4.3 Asset Management

**FR-003: Manage Media Assets**

| Attribute | Value |
|-----------|-------|
| ID | FR-003 |
| Priority | P0 (Critical) |
| Description | System shall load and validate media assets |
| Input | Array of asset requests |
| Output | Asset manifest with validation status |

**Supported Asset Types**:
- Images: PNG, JPEG, SVG
- Videos: MP4, MOV, AVI
- Audio: MP3, WAV, AAC
- Fonts: TTF, OTF, WOFF

**Asset Validation**:
- Check file existence
- Validate file type
- Extract metadata (size, dimensions, duration)
- Report errors gracefully

### 4.4 Video Rendering

**FR-004: Render Videos**

| Attribute | Value |
|-----------|-------|
| ID | FR-004 |
| Priority | P0 (Critical) |
| Description | System shall render videos using Remotion |
| Input | Specification, script, assets |
| Output | Video file (MP4 or WebM) |

**Rendering Requirements**:
- Support resolutions: 720p, 1080p, 4K
- Support frame rates: 24, 30, 60 FPS
- Support codecs: H.264 (MP4), VP9 (WebM)
- Progress indication during render
- Timeout handling

### 4.5 Batch Processing

**FR-005: Support Batch Processing**

| Attribute | Value |
|-----------|-------|
| ID | FR-005 |
| Priority | P1 (High) |
| Description | System shall process multiple videos in batch mode |
| Input | Array of specifications |
| Output | Array of output paths |

**Batch Requirements**:
- Configurable concurrency (default: 3)
- Continue on individual failures
- Report summary on completion
- Resume capability for failed batches

### 4.6 Progress Tracking

**FR-006: Provide Progress Indication**

| Attribute | Value |
|-----------|-------|
| ID | FR-006 |
| Priority | P1 (High) |
| Description | System shall provide progress tracking during rendering |
| Input | Render job |
| Output | Progress updates (percentage, ETA) |

**Progress Events**:
- Bundle start/complete
- Render start/complete
- Percentage complete (10% increments)
- Estimated time remaining

### 4.7 Format Support

**FR-007: Export to Multiple Formats**

| Attribute | Value |
|-----------|-------|
| ID | FR-007 |
| Priority | P1 (High) |
| Description | System shall export videos in MP4 and WebM formats |
| Input | Render configuration |
| Output | Video file in specified format |

**Format Specifications**:

| Format | Codec | Container | Use Case |
|--------|-------|-----------|----------|
| MP4 | H.264 | .mp4 | Web, YouTube, general |
| WebM | VP9 | .webm | Web, modern browsers |

---

## 5. Non-Functional Requirements

### 5.1 Performance

**NFR-001: Render Performance**

| Attribute | Value |
|-----------|-------|
| ID | NFR-001 |
| Metric | Render time per minute of video |
| Target | < 10 minutes |
| Measurement | End-to-end timing |

**NFR-002: Memory Usage**

| Attribute | Value |
|-----------|-------|
| ID | NFR-002 |
| Metric | Peak memory per render job |
| Target | < 2GB |
| Measurement | Process memory monitoring |

**NFR-003: Concurrency**

| Attribute | Value |
|-----------|-------|
| ID | NFR-003 |
| Metric | Concurrent render jobs |
| Target | 3+ |
| Measurement | Load testing |

### 5.2 Reliability

**NFR-004: Success Rate**

| Attribute | Value |
|-----------|-------|
| ID | NFR-004 |
| Metric | Render success rate |
| Target | 99% |
| Measurement | Error tracking |

**NFR-005: Error Recovery**

| Attribute | Value |
|-----------|-------|
| ID | NFR-005 |
| Description | System shall gracefully handle failures |
| Requirements |
- Cleanup temp files on failure
- Provide meaningful error messages
- Support retry mechanism

### 5.3 Usability

**NFR-006: Learnability**

| Attribute | Value |
|-----------|-------|
| ID | NFR-006 |
| Metric | Time to first video |
| Target | < 15 minutes |
| Measurement | User testing |

**NFR-007: Error Messages**

| Attribute | Value |
|-----------|-------|
| ID | NFR-007 |
| Description | Error messages shall be informative |
| Requirements |
- Include context
- Suggest solutions
- Link to documentation

### 5.4 Accessibility

**NFR-008: WCAG Compliance**

| Attribute | Value |
|-----------|-------|
| ID | NFR-008 |
| Standard | WCAG 2.1 AA |
| Requirements |
- Captions for all videos
- Minimum color contrast 4.5:1
- Text size minimum 16px
- Keyboard navigation (for UI)

### 5.5 Portability

**NFR-009: Cross-Platform Support**

| Attribute | Value |
|-----------|-------|
| ID | NFR-009 |
| Platforms | Windows, macOS, Linux |
| Requirements |
- Consistent behavior across platforms
- Platform-specific path handling
- No platform-dependent features |

### 5.6 Maintainability

**NFR-010: Code Quality**

| Attribute | Value |
|-----------|-------|
| ID | NFR-010 |
| Standard | ESLint + Prettier |
| Test Coverage | > 80% |
| Documentation | JSDoc for all public APIs |

---

## 6. Component Specifications

### 6.1 VideoGeneratorAgent

**Purpose**: Main orchestrator for video generation

**Interface**:
```javascript
class VideoGeneratorAgent {
  constructor(config: AgentConfig)
  generateDemoVideo(spec: VideoSpec): Promise<string>
  batchGenerate(specs: VideoSpec[]): Promise<string[]>
  getConfig(): AgentConfig
  getVideoTypes(): string[]
}
```

**Configuration**:
```typescript
interface AgentConfig {
  renderTimeout: number;      // milliseconds
  maxConcurrentJobs: number;
  maxConcurrency: number;
  outputFormat: 'mp4' | 'webm';
  quality: 'high' | 'medium' | 'low';
  resolution: '720p' | '1080p' | '4k';
  fps: number;
  branding: BrandingConfig;
}
```

### 6.2 ScriptGenerator

**Purpose**: Generate narrative scripts from specifications

**Interface**:
```javascript
async function createScript(spec: VideoSpec): Promise<Script>
```

**Video Type Configurations**:
```typescript
interface VideoTypeConfig {
  introRatio: number;
  conclusionRatio: number;
  tone: 'instructional' | 'informative' | 'engaging' | 'storytelling' | 'professional';
  structure: 'step-by-step' | 'feature-focused' | 'benefit-focused' | 'problem-solution' | 'logical';
  pacing: 'slow' | 'moderate' | 'brisk' | 'varied';
}
```

### 6.3 AssetManager

**Purpose**: Load and validate media assets

**Interface**:
```javascript
async function loadAssets(requests: AssetRequest[]): Promise<AssetManifest>
async function downloadAsset(url: string, destination: string): Promise<string>
```

**Asset Types**:
```typescript
type AssetType = 'image' | 'video' | 'audio' | 'font';

interface AssetRequest {
  type: AssetType;
  path: string;
  placement?: 'top-left' | 'top-right' | 'center' | 'bottom';
  duration?: number; // for video/audio
  family?: string;   // for fonts
}
```

### 6.4 Renderer

**Purpose**: Render videos using Remotion

**Interface**:
```javascript
async function renderVideo(spec: VideoSpec, config: RenderConfig): Promise<string>
```

**Render Configuration**:
```typescript
interface RenderConfig {
  outputFormat: 'mp4' | 'webm';
  quality: 'high' | 'medium' | 'low';
  resolution: '720p' | '1080p' | '4k';
  fps: number;
  codec: 'h264' | 'vp9';
  onProgress: (progress: number) => void;
}
```

---

## 7. API Specifications

### 7.1 Command-Line Interface

**Usage**:
```bash
# Generate single video
node video-generation.skill '<json-spec>'

# Show help
node video-generation.skill --help

# Show skill info
node video-generation.skill --info
```

**Exit Codes**:
- 0: Success
- 1: Error (invalid params, render failure)

### 7.2 Programmatic API

**Usage**:
```javascript
const { VideoGeneratorAgent } = require('./.agents/video-generator');

const agent = new VideoGeneratorAgent(config);
const outputPath = await agent.generateDemoVideo(specification);
```

### 7.3 Skill Interface

**Parameters**:
```json
{
  "title": "string (required)",
  "description": "string",
  "videoType": "string",
  "keyPoints": "array",
  "duration": "number",
  "targetAudience": "string",
  "assets": "array",
  "quality": "string",
  "resolution": "string",
  "outputFormat": "string",
  "timeout": "number"
}
```

**Response**:
```json
{
  "success": "boolean",
  "outputPath": "string",
  "message": "string",
  "error": "string (if failed)",
  "metadata": "object"
}
```

---

## 8. Data Models

### 8.1 Video Specification

```typescript
interface VideoSpec {
  title: string;
  description?: string;
  videoType?: 'tutorial' | 'feature-walkthrough' | 'product-overview' | 'case-study' | 'default';
  keyPoints?: string[];
  duration?: number; // seconds
  targetAudience?: string;
  assets?: AssetRequest[];
  quality?: 'high' | 'medium' | 'low';
  resolution?: '720p' | '1080p' | '4k';
  outputFormat?: 'mp4' | 'webm';
}
```

### 8.2 Script

```typescript
interface Script {
  metadata: ScriptMetadata;
  structure: ScriptStructure;
  timing: Timing;
  voiceover: Voiceover;
  visualCues: VisualCue[];
}
```

### 8.3 Asset Manifest

```typescript
interface AssetManifest {
  images: ValidatedAsset[];
  videos: ValidatedAsset[];
  audio: ValidatedAsset[];
  fonts: ValidatedAsset[];
}

interface ValidatedAsset {
  type: AssetType;
  path: string;
  name: string;
  size: number;
  valid: boolean;
  error?: string;
}
```

---

## 9. User Interface Specifications

### 9.1 Console Output

**Progress Display**:
```
============================================================
Starting video generation process...
============================================================
Title: Getting Started with AgentFactory
Type: tutorial
Duration: 90s

[1/3] Generating script...
      Script generated successfully
      - Intro: 13.5s
      - Body: 63.0s
      - Conclusion: 13.5s

[2/3] Loading assets...
      Assets loaded: 2 image(s)

[3/3] Rendering video...
  Rendering: 10% complete
  Rendering: 20% complete
  ...

============================================================
✅ Video rendered successfully in 245.3s
   Output: ./output/Getting_Started_with_AgentFactory_1234567890.mp4
============================================================
```

### 9.2 Error Display

```
============================================================
❌ Video generation failed after 45.2s
   Error: Asset not found: ./missing-image.png
============================================================
```

---

## 10. Integration Specifications

### 10.1 File System

**Directory Structure**:
```
/video-generator
  /output           # Generated videos
  /assets           # Media assets
    /images
    /videos
    /audio
    /fonts
  /specs            # Video specifications
    /pending
    /approved
```

### 10.2 CI/CD Integration

**GitHub Actions Example**:
```yaml
name: Generate Videos
on:
  push:
    paths:
      - 'specs/**/*.json'

jobs:
  generate:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: node generate-videos.js
```

---

## 11. Quality Assurance

### 11.1 Testing Strategy

**Unit Tests**:
- All utility functions
- Script generation logic
- Asset validation
- Configuration parsing

**Integration Tests**:
- Component interactions
- Error propagation
- File I/O operations

**End-to-End Tests**:
- Complete video generation
- Different video types
- Various specification combinations

**Performance Tests**:
- Render time benchmarks
- Memory usage monitoring
- Concurrent job handling

### 11.2 Acceptance Criteria

**MVP (P0 Requirements)**:
- [ ] Generate video from JSON spec
- [ ] AgentFactory branding applied
- [ ] 1080p MP4 output
- [ ] Asset validation working
- [ ] All unit tests passing

**Post-MVP (P1 Requirements)**:
- [ ] Multiple video types supported
- [ ] Batch processing working
- [ ] Progress indication implemented
- [ ] Caption generation

### 11.3 Quality Gates

| Gate | Criteria |
|------|----------|
| Code Review | 2+ approvals required |
| Tests | > 80% coverage |
| Performance | Meets NFR targets |
| Accessibility | WCAG 2.1 AA audit pass |

---

## 12. Deployment Specifications

### 12.1 Development Deployment

**Prerequisites**:
- Node.js 16+
- npm or yarn

**Steps**:
```bash
git clone <repository>
cd video-generator
npm install
npm run dev
```

### 12.2 Production Deployment (Docker)

**Dockerfile**:
```dockerfile
FROM node:18-alpine

# Install FFmpeg
RUN apk add --no-cache ffmpeg

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]
```

### 12.3 Cloud Deployment (AWS)

**Components**:
- EC2 or Lambda for rendering
- S3 for asset storage
- CloudFront for CDN
- CloudWatch for monitoring

---

## 13. Appendices

### Appendix A: Sample Specification

```json
{
  "title": "Getting Started with AgentFactory",
  "description": "Learn how to create your first agent",
  "videoType": "tutorial",
  "keyPoints": [
    "Setting up your environment",
    "Creating a basic agent",
    "Testing your agent",
    "Deploying to production"
  ],
  "duration": 120,
  "targetAudience": "New Developers",
  "quality": "high",
  "resolution": "1080p",
  "outputFormat": "mp4"
}
```

### Appendix B: Brand Guidelines

**Colors**:
- Primary: #2563eb (Blue)
- Secondary: #1e293b (Slate)
- Accent: #64748b (Gray)

**Typography**:
- Font: Sans-serif (system fonts)
- Sizes: 16px minimum, 48px for titles

**Logo Placement**:
- Position: Top-left corner
- Size: 24px height

### Appendix C: Review Checklist

**Specification Review**:
- [ ] All requirements clear and testable
- [ ] No conflicting requirements
- [ ] Stakeholder needs addressed
- [ ] Technical feasibility confirmed
- [ ] Risks identified and mitigated

---

**Document Status**: Draft v0.1  
**Next Review**: Stakeholder review (March 16, 2026)  
**Approved By**: Pending  
**Specification Sign-off**: Pending
