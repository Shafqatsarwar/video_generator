# Video Generator Constitution
<!-- Specialized agent for creating demo videos for AgentFactory -->

**Version**: 2.0.0  
**Ratified**: 2026-03-09  
**Last Amended**: 2026-03-09  
**Status**: Active  

---

## Preamble

This constitution establishes the foundational principles and requirements for the AgentFactory Video Generator. All development, implementation, and operational activities must comply with this document. Changes to core principles require stakeholder approval and documented impact assessment.

---

## Core Principles

### I. Spec-Driven Development (NON-NEGOTIABLE)
All features must follow the SDD methodology: **Discovery → Specification → Review → Implementation → Testing → Deployment**; No implementation begins before specification approval; Requirements must be clear, testable, and stakeholder-validated.

### II. Demo-Centric Approach
Create high-quality, engaging demo videos that showcase AgentFactory capabilities effectively; Every video must have **clear learning objectives**, **concise explanations**, and **practical examples**; Focus on real-world use cases and scenarios that resonate with the target audience.

### III. Automation-First
Automate the entire video creation pipeline from **JSON specification to final render**; Minimize manual intervention in the video production process; Build **reusable components and templates** for consistent quality across all demos.

### IV. Test-First (NON-NEGOTIABLE)
Every component must be validated before integration; **Unit tests → Integration tests → End-to-end tests**; Quality checks at each stage of the pipeline; **Test coverage must exceed 80%** for all production code.

### V. Modular Composition
Build video components as **reusable, composable modules**; Separate **content logic** from **presentation**; Enable easy customization and adaptation for different audiences and use cases.

### VI. Accessibility & Standards (NON-NEGOTIABLE)
Ensure all videos meet **WCAG 2.1 AA** accessibility standards; Include **captions**, maintain **4.5:1 minimum color contrast**, use **16px minimum text size**; Follow consistent AgentFactory branding guidelines; Maintain high production values for professional appearance.

### VII. Scalability & Performance
Design the system to handle **multiple concurrent video generation requests**; Optimize for **efficient resource utilization** during rendering; Support **various output formats** (MP4, WebM) and **resolutions** (720p, 1080p, 4K).

### VIII. Brand Voice Consistency
All videos must reflect AgentFactory's **professional yet approachable** tone; Maintain consistent **messaging**, **visual identity**, and **call-to-action** across all generated content.

---

## Technical Requirements

### Technology Stack

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Video Engine** | Remotion 4.x | Programmatic, React-based, automatable |
| **Runtime** | Node.js 16+ | Team skills, Remotion compatibility |
| **UI Framework** | React 18 | Remotion native, component model |
| **Video Processing** | FFmpeg | Industry standard, bundled with Remotion |
| **Rendering** | Local + Cloud (Lambda) | Cost control + scalability |
| **Storage** | AWS S3 | Reliable, scalable asset management |
| **Deployment** | Docker | Portability, CI/CD integration |

### Quality Standards

**Video Quality**:
- Default resolution: **1080p** (1920x1080)
- Minimum resolution: **720p** (1280x720)
- Optional resolution: **4K** (3840x2160)
- Frame rate: **30 FPS** (default), 24/60 FPS supported
- Bitrate: **5 Mbps** (1080p), scalable by quality setting

**Audio Quality**:
- Sample rate: **48kHz** minimum
- Bitrate: **192kbps** (AAC) or **256kbps** (MP3)
- Normalization: **-16 LUFS** for web platforms

**Accessibility**:
- **Captions**: Required for all videos (WCAG 2.1 AA)
- **Color contrast**: 4.5:1 minimum ratio
- **Text size**: 16px minimum for readability
- **Keyboard navigation**: Required for any interactive UI

**Performance**:
- Render time: **< 10 minutes per minute** of video
- Memory usage: **< 2GB per render job**
- Concurrent jobs: Support **3+ simultaneous renders**
- Success rate: **99% render success** target

---

## Development Workflow

### Phase-Gate Process

```
Phase 1: Discovery & Research → Gate 1: Findings Review
    ↓
Phase 2: Specification → Gate 2: Specification Sign-off
    ↓
Phase 3: Review → Gate 3: Stakeholder Approval
    ↓
Phase 4: Implementation Planning → Gate 4: Resource Allocation
    ↓
Phase 5: Development → Gate 5: Code Complete
    ↓
Phase 6: Testing → Gate 6: QA Approval
    ↓
Phase 7: Deployment → Gate 7: Production Ready
    ↓
Phase 8: Launch → Gate 8: Stakeholder Sign-off
```

### Development Process

1. **Define objectives and target audience** before any implementation
2. **Create specifications** with clear, testable requirements
3. **Conduct stakeholder review** and obtain sign-off
4. **Implement with test-first approach** (write tests before code)
5. **Code review** with 2+ approvals required
6. **Quality assurance** on sample renders
7. **Deploy to staging** for user acceptance testing
8. **Publish to production** after final approval

### Review Criteria

**Technical Review**:
- Architecture aligns with constitution
- Code quality meets standards (ESLint, Prettier)
- Test coverage exceeds 80%
- Performance targets achievable

**Stakeholder Review**:
- Requirements meet business needs
- User experience is intuitive
- Output quality is acceptable
- Timeline and resources are realistic

**Accessibility Review**:
- WCAG 2.1 AA compliance verified
- Captions generated for all videos
- Color contrast meets standards
- Text is readable at all resolutions

**Security Review**:
- No injection vulnerabilities
- Dependencies are vetted and updated
- No sensitive data exposure
- File handling is secure

---

## Video Types

The system must support the following video types, each with optimized structure and tone:

| Type | Tone | Structure | Pacing | Use Case |
|------|------|-----------|--------|----------|
| **Tutorial** | Instructional | Step-by-step | Moderate | How-to guides, training |
| **Feature Walkthrough** | Informative | Feature-focused | Moderate | Product demos |
| **Product Overview** | Engaging | Benefit-focused | Brisk | Marketing, sales |
| **Case Study** | Storytelling | Problem-solution | Varied | Success stories |
| **Default** | Professional | Logical | Moderate | General purpose |

---

## Brand Guidelines

### Visual Identity

**Colors**:
- Primary: `#2563eb` (AgentFactory Blue)
- Secondary: `#1e293b` (Slate)
- Accent: `#64748b` (Gray)
- Background: Gradient `#f5f7fa` → `#c3cfe2`

**Typography**:
- Font family: Sans-serif (system fonts)
- Title size: 48-56px
- Body size: 24-36px
- Minimum size: 16px

**Logo Placement**:
- Position: Top-left corner
- Size: 24-28px height
- Clear space: 20px margin

### Messaging

**Tagline**: "Build Your First Agent"

**Call-to-Action**: "Visit agentfactory.panaversity.org"

**Tone**: Professional yet approachable, empowering developers

---

## Governance

### Authority

This constitution **supersedes all other practices** and guidelines for the Video Generator project. All team members, contributors, and stakeholders must adhere to these principles.

### Amendments

Changes to this constitution require:
1. **Written proposal** with rationale and impact assessment
2. **Stakeholder review** and feedback period (minimum 1 week)
3. **Approval** from project sponsor and technical lead
4. **Migration plan** for existing implementations
5. **Documentation** of changes in version history

### Compliance

**Regular Audits**:
- Quarterly compliance review
- Accessibility audit every 6 months
- Performance benchmarking per sprint
- Security review before each major release

**Non-Compliance**:
- Must be documented with remediation plan
- Critical violations block release
- Exceptions require stakeholder approval

### Version History

| Version | Date | Changes | Approved By |
|---------|------|---------|-------------|
| 1.0.0 | 2026-03-09 | Initial constitution | Founding team |
| 2.0.0 | 2026-03-09 | Major revision: SDD methodology, Remotion stack, WCAG compliance, video types | Stakeholder review |

---

## Related Documents

- [Discovery Document](./specs/video-generator/01-discovery.md)
- [Technical Research](./specs/video-generator/02-technical-research.md)
- [Findings Summary](./specs/video-generator/03-findings-summary.md)
- [Specification](./specs/video-generator/spec.md)
- [Implementation Plan](./specs/video-generator/05-implementation-plan.md)

---

**Ratified**: March 9, 2026  
**Next Review**: June 9, 2026 (Quarterly)  
**Owner**: Video Generator Project Lead  
**Status**: ✅ Active
