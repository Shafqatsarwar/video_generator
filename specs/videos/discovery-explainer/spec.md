# Video Specification: Video Generator Discovery Explainer

**Document Type**: Video Specification  
**Version**: 1.0  
**Date**: March 9, 2026  
**Status**: Ready for Production  

---

## 1. Video Overview

| Attribute | Value |
|-----------|-------|
| **Title** | Building the Video Generator: Discovery Phase Explained |
| **Subtitle** | How Spec-Driven Development Transforms Video Production |
| **Video Type** | tutorial / educational |
| **Duration** | 180 seconds (3 minutes) |
| **Target Audience** | Project stakeholders, developers, students learning SDD |
| **Primary Goal** | Explain the discovery process and methodology |
| **Call-to-Action** | Visit agentfactory.panaversity.org to learn SDD methodology |

---

## 2. Creative Brief

### 2.1 Core Message

> **"Great videos start with great specifications. Here's how we discovered what to build before writing a single line of code."**

This video explains the **Discovery Phase** of the Video Generator project — the research, stakeholder interviews, and requirements gathering that happened before implementation.

### 2.2 Key Themes

1. **Spec-Driven Development** — Discovery before implementation
2. **Stakeholder Research** — 4 groups interviewed (Marketing, DevRel, Users, DevOps)
3. **Current State Analysis** — 4-8 hours manual vs. 10 minutes automated
4. **Market Research** — Why Remotion was chosen over alternatives
5. **Requirements** — 8 functional, 5 non-functional requirements defined

### 2.3 Tone & Style

- **Educational** and **informative**
- **Professional** yet **accessible**
- **Step-by-step** explanation
- **Visual diagrams** and **flowcharts**

---

## 3. Video Specification

```json
{
  "title": "Building the Video Generator: Discovery Phase Explained",
  "description": "A deep dive into the discovery process for the AgentFactory Video Generator project — stakeholder research, requirements gathering, and technology selection",
  "videoType": "tutorial",
  "duration": 180,
  "targetAudience": "Project stakeholders, developers, students learning SDD",
  "quality": "high",
  "resolution": "1080p",
  "outputFormat": "mp4",
  "fps": 30,
  "keyPoints": [
    "Discovery Phase purpose: Understand the problem before building the solution",
    "4 stakeholder groups interviewed: Marketing, DevRel, End Users, DevOps",
    "Current process: 4-8 hours manual editing + 2-5 days review cycle",
    "Target improvement: 80% reduction in production time",
    "Market research: Evaluated Synthesia, Loom, Descript, chose Remotion",
    "Technology stack: React-based, programmatic, version-control friendly",
    "8 functional requirements and 5 non-functional requirements defined",
    "Risk assessment: Technical and business risks identified and mitigated",
    "12-week timeline: Discovery → Specification → Implementation → Launch"
  ],
  "branding": {
    "primaryColor": "#2563eb",
    "logoPlacement": "top-left",
    "website": "agentfactory.panaversity.org"
  }
}
```

---

## 4. Script

### 4.1 Introduction (0:00 - 0:20)

**Visual**: AgentFactory logo animation, transition to project timeline  
**Text on Screen**: "Discovery Phase: Understanding Before Building"

**Voiceover**:
> "How do you build a video generator that reduces production time by 80%? You start with discovery. Welcome to the Video Generator project — where Spec-Driven Development transforms video production."

---

### 4.2 Main Content (0:20 - 2:30)

#### Section 1: Discovery Purpose (0:20 - 0:40)

**Visual**: SDD methodology flowchart (Discovery → Spec → Review → Build)  
**Text on Screen**: "Discovery Before Implementation"

**Voiceover**:
> "The Discovery Phase answers critical questions: What problem are we solving? Who are we solving it for? And what's the best approach? We spent 2 weeks on discovery before writing a single line of code."

---

#### Section 2: Stakeholder Research (0:40 - 1:00)

**Visual**: 4 stakeholder group icons appearing one by one  
**Text on Screen**: "4 Groups | 20+ Questions | Clear Requirements"

**Voiceover**:
> "We interviewed 4 stakeholder groups: Marketing teams who need quick turnaround, Developer Relations who create technical content, end users who watch the videos, and DevOps teams who maintain the infrastructure. Each group provided unique insights."

---

#### Section 3: Current State Analysis (1:00 - 1:20)

**Visual**: Timeline comparison (Current: 4-8hrs + 2-5 days vs. Target: 10 minutes)  
**Text on Screen**: "Current: 4-8 Hours | Target: 10 Minutes"

**Voiceover**:
> "Current video production takes 4 to 8 hours of manual editing, plus 2 to 5 days of review cycles. Our target? Generate professional videos in under 10 minutes from simple JSON specifications. That's an 80% reduction in production time."

---

#### Section 4: Market Research (1:20 - 1:45)

**Visual**: Competitor comparison table (Synthesia, Loom, Descript, Remotion)  
**Text on Screen**: "Evaluated 4 Solutions | Chose Remotion"

**Voiceover**:
> "We evaluated Synthesia for AI avatars, Loom for quick recordings, and Descript for text-based editing. But for programmatic, version-control-friendly video generation, Remotion was the clear winner — React-based, automatable, and cost-effective."

---

#### Section 5: Technology Stack (1:45 - 2:00)

**Visual**: Architecture diagram (Node.js → React → Remotion → FFmpeg → MP4)  
**Text on Screen**: "React + Remotion + FFmpeg = Programmatic Video"

**Voiceover**:
> "Our technology stack: JavaScript and Node.js for accessibility, React for component-based compositions, Remotion for programmatic rendering, and FFmpeg for professional-quality output. All version-controllable, all automatable."

---

#### Section 6: Requirements (2:00 - 2:20)

**Visual**: Requirements table with checkmarks (8 functional, 5 non-functional)  
**Text on Screen**: "8 Functional | 5 Non-Functional | All Testable"

**Voiceover**:
> "We defined 8 functional requirements including JSON specification parsing, multiple video types, brand enforcement, and batch processing. Plus 5 non-functional requirements covering performance, scalability, accessibility, and cross-platform support."

---

#### Section 7: Timeline (2:20 - 2:30)

**Visual**: Gantt chart showing 12-week timeline  
**Text on Screen**: "12 Weeks | 8 Phases | June 1 Launch"

**Voiceover**:
> "The complete project spans 12 weeks across 8 phases — from discovery through specification, implementation, testing, and launch on June 1st."

---

### 4.3 Conclusion (2:30 - 3:00)

**Visual**: Discovery document preview, GitHub repository, AgentFactory logo  
**Text on Screen**: "Discovery Document Available | agentfactory.panaversity.org"

**Voiceover**:
> "The complete Discovery Phase documentation is available on our GitHub. This is Spec-Driven Development in action — thorough research, clear requirements, stakeholder alignment. Visit **agentfactory.panaversity.org** to learn the methodology that's transforming video production."

---

## 5. Visual Specifications

### 5.1 Color Palette

| Color | Hex | Usage |
|-------|-----|-------|
| Primary Blue | `#2563eb` | Headlines, CTAs, accents |
| Secondary Slate | `#1e293b` | Body text |
| Accent Gray | `#64748b` | Supporting text |
| Success Green | `#10b981` | Checkmarks, positive metrics |
| Background Gradient | `#f5f7fa` → `#c3cfe2` | Video background |

### 5.2 Typography

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Title | Sans-serif | 56px | Bold (700) |
| Section Headers | Sans-serif | 36px | Semi-bold (600) |
| Body Text | Sans-serif | 24px | Regular (400) |
| Code/Mono | Monospace | 20px | Regular (400) |

### 5.3 Diagrams & Visuals

**Required Visuals**:
1. SDD Methodology Flowchart
2. Stakeholder Group Icons (4 groups)
3. Timeline Comparison (Current vs. Target)
4. Competitor Comparison Table
5. Technology Stack Architecture
6. Requirements Checklist
7. Project Timeline Gantt Chart

---

## 6. Technical Specifications

### 6.1 Output Format

| Attribute | Value |
|-----------|-------|
| Container | MP4 (H.264) |
| Resolution | 1920x1080 (1080p) |
| Frame Rate | 30 FPS |
| Bitrate | 5 Mbps |
| Audio Codec | AAC |
| Audio Bitrate | 192kbps |
| Duration | 180 seconds |

### 6.2 Accessibility

- **Captions**: English (SRT embedded)
- **Color Contrast**: 4.5:1 minimum
- **Text Size**: 18px minimum for captions
- **Audio Description**: Optional (separate track)

---

## 7. Distribution Plan

### 7.1 Primary Channels

| Channel | Format | Duration | CTA |
|---------|--------|----------|-----|
| **Website** (Documentation) | MP4 1080p | 180s | Learn SDD |
| **YouTube** | MP4 1080p | 180s | Subscribe + Link in Description |
| **LinkedIn** | MP4 1080p | 180s | Read Case Study |
| **Twitter/X** | MP4 720p | 180s | Thread with Link |

### 7.2 Secondary Cuts

| Version | Duration | Platform | Purpose |
|---------|----------|----------|---------|
| **Teaser** | 30s | Social media | Awareness |
| **Full Video** | 180s | Website, YouTube | Education |
| **Clip: Stakeholder Research** | 60s | LinkedIn | Specific topic |
| **Clip: Technology Choice** | 60s | Dev community | Technical audience |

---

## 8. Success Metrics

### 8.1 KPIs

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Views (First 7 Days)** | 500+ | Analytics dashboard |
| **Views (First 30 Days)** | 2,000+ | Analytics dashboard |
| **Average Watch Time** | 90s+ | Video analytics |
| **Completion Rate** | 50%+ | Video analytics |
| **Click-Through Rate** | 5%+ | Link clicks / views |
| **Documentation Downloads** | 100+ | GitHub analytics |

---

## 9. Production Timeline

| Phase | Start Date | End Date | Duration |
|-------|------------|----------|----------|
| **Pre-Production** | March 10 | March 12 | 3 days |
| **Asset Creation** | March 13 | March 17 | 5 days |
| **Video Generation** | March 18 | March 20 | 3 days |
| **Review & Revisions** | March 21 | March 24 | 4 days |
| **Final Export** | March 25 | March 25 | 1 day |
| **Launch** | March 26 | March 26 | 1 day |

**Total**: 17 days from spec to launch

---

## 10. Appendix

### 10.1 Reference Documents

- [Discovery Document](../video-generator/01-discovery.md)
- [Technical Research](../video-generator/02-technical-research.md)
- [Findings Summary](../video-generator/03-findings-summary.md)
- [Constitution v2.0](../../.specify/memory/constitution.md)

### 10.2 Contact Information

| Role | Contact |
|------|---------|
| Project Lead | TBD |
| Content Team | TBD |
| Video Production | Video Generator Agent |

---

**Document Status**: ✅ Ready for Production  
**Approved By**: Pending  
**Next Step**: Asset creation and video generation  
**Launch Target**: March 26, 2026
