# Technical Research: Remotion and Video Generation

**Research Date**: March 9, 2026  
**Researcher**: Video Generator Team  
**Status**: Complete  

---

## 1. Remotion Framework Analysis

### 1.1 Overview

**Remotion** is a programmatic video creation framework that uses React components to generate videos. It enables developers to create videos through code rather than traditional video editing software.

**Key Value Proposition**:
- Videos as code = version control, CI/CD integration
- React components = reusable, testable, modular
- Programmatic = automatable, scalable

### 1.2 System Requirements

| Requirement | Specification |
|-------------|---------------|
| Runtime | Node.js 16+ or Bun 1.0.3+ |
| OS Support | Windows, macOS, Linux |
| Linux Specific | libc 2.35+ required |
| Not Supported | Alpine Linux, nixOS (without workarounds) |
| Disk Space | ~300MB (FFmpeg + Puppeteer dependencies) |

### 1.3 Core Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    Remotion Studio                       │
│              (Development & Preview Environment)         │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│               React Components (Compositions)            │
│  ┌──────────┐  ┌──────────┐  ┌──────────┐              │
│  │  Scene 1 │  │  Scene 2 │  │  Scene 3 │              │
│  └──────────┘  └──────────┘  └──────────┘              │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                   Remotion Bundler                       │
│         (Webpack-based bundling of compositions)         │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│               Remotion Renderer                          │
│    (Orchestrates frame rendering via Puppeteer)          │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                    Puppeteer                             │
│         (Headless Chrome for frame rendering)            │
└─────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────┐
│                      FFmpeg                              │
│          (Stitches frames into final video)              │
└─────────────────────────────────────────────────────────┘
```

### 1.4 Key Components

#### Compositions
- React components that define video content
- Can accept props for dynamic content
- Support all React features (hooks, context, etc.)

```jsx
export const MyComposition = ({ title, duration }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  
  return (
    <AbsoluteFill>
      <Title text={title} />
    </AbsoluteFill>
  );
};
```

#### Sequences
- Control timing of components
- Enable layered compositions
- Support nesting for complex timelines

```jsx
<Sequence from={0} durationInFrames={fps * 5}>
  <Intro />
</Sequence>
<Sequence from={fps * 5} durationInFrames={fps * 10}>
  <MainContent />
</Sequence>
```

#### Hooks
- `useCurrentFrame()` - Get current frame number
- `useVideoConfig()` - Access video configuration
- `useVideo()` - Use video assets
- `useAudio()` - Use audio assets

### 1.5 Rendering Process

**Step-by-Step**:

1. **Bundle**: Compositions are bundled using Webpack
2. **Preview**: Remotion Studio renders preview in browser
3. **Render Media**: 
   - Puppeteer launches headless Chrome
   - Each frame is rendered as an image
   - Frames are passed to FFmpeg
4. **Encode**: FFmpeg stitches frames into video
5. **Output**: Final MP4/WebM file

**Render Time Factors**:
- Video length (frames = duration × fps)
- Composition complexity (React render time)
- Resolution (higher = slower)
- Concurrency (parallel frame rendering)

### 1.6 Rendering Options

| Option | Description | Best For |
|--------|-------------|----------|
| **Local** | Render on development machine | Development, testing |
| **Remotion Lambda** | Serverless rendering on AWS | Production, scale |
| **Cloud Run** | Google Cloud Run | Cost-effective cloud |
| **Self-Hosted** | Your own servers | Control, compliance |

### 1.7 Pricing (as of March 2026)

| Tier | Price | Features |
|------|-------|----------|
| **Individual** | Free (open source) | Local rendering, all features |
| **Pro** | $199/month | Lambda rendering, priority support |
| **Enterprise** | Custom | Self-hosted, SLA, custom features |

**Note**: For our use case, the free tier may be sufficient if we self-host rendering.

---

## 2. Video Generation Best Practices

### 2.1 Video Structure

**Optimal Demo Video Structure**:

```
0:00 - 0:10  Hook (grab attention)
0:10 - 0:30  Problem statement
0:30 - 1:30  Solution demonstration
1:30 - 1:50  Key benefits
1:50 - 2:00  Call to action
```

**Research-Backed Guidelines**:

| Aspect | Recommendation | Source |
|--------|----------------|--------|
| **Length** | 2-3 minutes optimal for demos | Wistia 2025 Study |
| **Pacing** | 150-160 words/minute for voiceover | Industry Standard |
| **Visual Changes** | Every 3-5 seconds maintains engagement | Video Marketing Research |
| **Text on Screen** | Max 7 words per line, 3 lines max | Accessibility Guidelines |

### 2.2 Technical Best Practices

#### Resolution & Frame Rate

| Use Case | Resolution | FPS | Bitrate |
|----------|------------|-----|---------|
| Web/YouTube | 1080p | 30 | 5 Mbps |
| Social Media | 720p | 30 | 3 Mbps |
| Presentations | 1080p | 60 | 8 Mbps |
| High Quality | 4K | 60 | 20+ Mbps |

#### Audio Quality

- Sample Rate: 48kHz minimum
- Bitrate: 192kbps (AAC) or 256kbps (MP3)
- Normalize to -16 LUFS for web platforms

#### Accessibility

- **Captions**: Required for WCAG 2.1 AA
- **Audio Description**: Consider for visual-heavy content
- **Color Contrast**: 4.5:1 minimum ratio
- **Text Size**: Minimum 16px for readability

### 2.3 Performance Optimization

#### Remotion-Specific

1. **Use `React.memo()`** for expensive components
2. **Lazy load assets** to reduce initial bundle
3. **Prefer CSS animations** over JavaScript animations
4. **Limit concurrent renders** based on CPU cores
5. **Use `continueRender()`** for async data loading

#### FFmpeg Optimization

```bash
# Fast encoding (larger file)
ffmpeg -preset ultrafast

# Balanced encoding (recommended)
ffmpeg -preset medium

# Slow encoding (smaller file)
ffmpeg -preset slow
```

### 2.4 Common Pitfalls

| Pitfall | Impact | Solution |
|---------|--------|----------|
| Too many DOM elements | Slow rendering | Simplify components |
| Large asset files | Memory issues | Optimize images, use sprites |
| Complex animations | Frame drops | Use CSS transforms |
| No cleanup | Memory leaks | Implement useEffect cleanup |
| Synchronous operations | Blocking | Use async/await properly |

---

## 3. Competitive Analysis

### 3.1 Alternative Solutions

#### Synthesia
- **Approach**: AI avatars + text-to-speech
- **Pricing**: $30-100/month
- **Pros**: No camera, fast turnaround, multiple languages
- **Cons**: Generic appearance, limited customization
- **Best For**: Training videos, internal communications

#### Loom
- **Approach**: Screen recording + webcam
- **Pricing**: Free - $12.50/month
- **Pros**: Extremely fast, easy sharing
- **Cons**: Limited editing, casual style
- **Best For**: Quick updates, async communication

#### Descript
- **Approach**: Edit video by editing text
- **Pricing**: Free - $24/month
- **Pros**: Intuitive, good for updates, overdub feature
- **Cons**: Still requires manual work, subscription
- **Best For**: Podcasts, talking head videos

#### Traditional (Premiere Pro, Final Cut)
- **Approach**: Manual video editing
- **Pricing**: $20-300/month
- **Pros**: Full creative control, industry standard
- **Cons**: Time-consuming, requires expertise
- **Best For**: High-production content, creative projects

### 3.2 Why Remotion for AgentFactory?

**Alignment with Requirements**:

| Requirement | Remotion Fit |
|-------------|--------------|
| Programmatic generation | ✅ Core feature |
| Version control friendly | ✅ Code-based |
| CI/CD integration | ✅ Node.js + CLI |
| Consistent branding | ✅ Reusable components |
| Scalable | ✅ Lambda support |
| Cost-effective | ✅ Free tier available |
| Team skills match | ✅ React/JavaScript |

**Competitive Advantage**:
- Only solution that treats videos as code
- Full automation potential
- No recurring per-video costs
- Complete customization control

---

## 4. Technical Recommendations

### 4.1 Architecture Decision Record

**Decision**: Use Remotion for video generation

**Rationale**:
1. Aligns with team's React/JavaScript skills
2. Enables full automation and CI/CD integration
3. Supports our modular, reusable component approach
4. Cost-effective (free for local rendering)
5. Active development and community

**Risks**:
1. Learning curve for team members new to React
2. Rendering performance on resource-constrained machines
3. Smaller community compared to traditional tools

**Mitigation**:
1. Provide React training/resources
2. Implement cloud rendering option
3. Create comprehensive documentation

### 4.2 Recommended Stack

```
Frontend: React 18 + TypeScript
Video Engine: Remotion 4.x
Rendering: Local (dev) + Lambda (production)
Storage: AWS S3 for assets
Deployment: Docker containers
CI/CD: GitHub Actions
```

### 4.3 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| Render time (1 min video) | < 5 minutes | Local benchmark |
| Memory usage | < 2GB | Process monitoring |
| Bundle size | < 10MB | Webpack analysis |
| First preview load | < 3 seconds | DevTools |

---

## 5. Implementation Considerations

### 5.1 Development Environment

**Requirements**:
- Node.js 16+ installed
- Code editor (VS Code recommended)
- Remotion Studio for preview
- FFmpeg (bundled with Remotion)

**Setup Commands**:
```bash
npx create-video@latest
cd my-video
npm run dev
```

### 5.2 Production Deployment

**Options**:

1. **Self-Hosted Rendering**
   - Deploy to EC2/GCP/Azure VM
   - Use Docker for consistency
   - Scale horizontally with load balancer

2. **Remotion Lambda**
   - Pay-per-render pricing
   - Auto-scaling
   - No infrastructure management

3. **Hybrid Approach** (Recommended)
   - Local rendering for development
   - Lambda for production spikes
   - Self-hosted for predictable workloads

### 5.3 Asset Management

**Strategy**:
- Store assets in S3 or similar
- Use CDN for fast delivery
- Implement asset versioning
- Cache frequently used assets

**File Organization**:
```
/assets
  /images
  /videos
  /audio
  /fonts
  /templates
```

---

## 6. Next Steps

### 6.1 Proof of Concept

Create a minimal viable composition:
- [ ] Simple title card
- [ ] Text animation
- [ ] Background music
- [ ] Export to MP4
- [ ] Measure render time

### 6.2 Skill Development

- [ ] Complete Remotion tutorial
- [ ] React refresher for team
- [ ] FFmpeg basics
- [ ] Video production best practices

### 6.3 Infrastructure Setup

- [ ] Set up development environment
- [ ] Configure CI/CD pipeline
- [ ] Set up asset storage
- [ ] Establish monitoring

---

## 7. References

- [Remotion Documentation](https://www.remotion.dev/docs)
- [Remotion GitHub](https://github.com/remotion-dev/remotion)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [Wistia Video Marketing Statistics 2025](https://wistia.com/learn/marketing/video-marketing-statistics)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Research Status**: Complete  
**Reviewed By**: Pending  
**Approved For**: Specification Phase
