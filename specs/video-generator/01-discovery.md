# Discovery Phase: Video Generator for AgentFactory

**Document Type**: Discovery & Research  
**Version**: 0.1 (Draft)  
**Created**: March 9, 2026  
**Status**: In Progress  

---

## 1. Executive Summary

### 1.1 Project Overview
The Video Generator project aims to automate the creation of demo videos for the AgentFactory platform (https://agentfactory.panaversity.org/). This discovery document captures stakeholder needs, technical requirements, and research findings before any implementation decisions are made.

### 1.2 Business Objectives
- **Primary Goal**: Reduce time and cost of producing high-quality demo videos
- **Secondary Goal**: Ensure consistent branding and quality across all videos
- **Tertiary Goal**: Enable non-technical team members to create professional videos

### 1.3 Success Criteria
- [ ] Videos can be generated from simple text specifications
- [ ] Output meets professional quality standards
- [ ] Production time reduced by 80% compared to manual editing
- [ ] System can handle multiple video types (tutorials, walkthroughs, etc.)

---

## 2. Stakeholder Interviews

### 2.1 Interview Framework

**Purpose**: Understand needs, pain points, and expectations from each stakeholder group.

**Interview Structure**:
1. Current state assessment
2. Desired outcomes
3. Technical constraints
4. Success metrics

---

### 2.2 Stakeholder Group 1: Marketing Team

**Interview Questions**:

1. **Current Process**
   - How are demo videos currently created?
   - What tools are used (Camtasia, Premiere, After Effects)?
   - How long does it take to produce a 2-minute demo video?
   - What is the typical cost per video (internal/external)?

2. **Pain Points**
   - What takes the most time in your current workflow?
   - What quality issues do you frequently encounter?
   - What feedback do you receive from viewers?
   - What prevents you from creating more videos?

3. **Desired Features**
   - What types of videos do you need most? (product demos, testimonials, tutorials)
   - What branding elements must be included?
   - What tone/style should videos convey?
   - What distribution channels will be used? (YouTube, website, social media)

4. **Quality Expectations**
   - What resolution is required? (720p, 1080p, 4K)
   - Are captions/subtitles needed?
   - What about voiceover vs. text-only?
   - Any accessibility requirements?

**Expected Answers** (Hypothesis):
- Current process: Manual editing in Camtasia/Premiere (4-6 hours per video)
- Pain points: Consistency, time-consuming edits, resource bottlenecks
- Desired: Quick turnaround, brand consistency, multiple format support
- Quality: 1080p minimum, captions for accessibility

---

### 2.3 Stakeholder Group 2: Developer Relations

**Interview Questions**:

1. **Content Needs**
   - What technical concepts need to be demonstrated?
   - How often do features change requiring video updates?
   - Do you need code snippets in videos?
   - What level of technical depth is required?

2. **Technical Requirements**
   - Do you need screen recording capabilities?
   - Should videos show live code execution?
   - What about API demonstrations?
   - Integration with development tools?

3. **Update Frequency**
   - How often will videos need updating?
   - What triggers a video update? (feature changes, UI updates, feedback)
   - How quickly do updates need to be published?

4. **Metrics**
   - How do you measure video effectiveness?
   - What analytics are important? (views, completion rate, engagement)
   - Do you need A/B testing capabilities?

**Expected Answers** (Hypothesis):
- Content: Code examples, API usage, integration demos
- Updates: Monthly or with each feature release
- Metrics: View count, watch time, developer sign-ups

---

### 2.4 Stakeholder Group 3: End Users (Developers)

**Interview Questions**:

1. **Learning Preferences**
   - Do you prefer video tutorials or written documentation?
   - What video length keeps you engaged?
   - What makes you stop watching a tutorial video?
   - Do you re-watch videos or prefer searchable content?

2. **Content Expectations**
   - What information must be in the first 30 seconds?
   - Do you want captions or voiceover?
   - Speed preference: (1x, 1.25x, 1.5x, 2x playback)
   - Do you skip intros and get straight to content?

3. **Technical Needs**
   - Do you need downloadable resources with videos?
   - Should videos link to code repositories?
   - Do you want interactive elements? (quizzes, checkpoints)
   - Timestamp navigation important?

**Expected Answers** (Hypothesis):
- Length: 2-5 minutes optimal, skip long intros
- Features: Captions, timestamps, code links
- Preference: Quick, actionable content

---

### 2.5 Stakeholder Group 4: Technical/DevOps Team

**Interview Questions**:

1. **Infrastructure**
   - Where will video rendering happen? (local, cloud, CI/CD)
   - What are the resource constraints?
   - Any compliance/security requirements?
   - Storage and CDN considerations?

2. **Integration**
   - Should this integrate with existing CI/CD?
   - Need webhook notifications for completed videos?
   - Integration with content management systems?
   - Version control for video assets?

3. **Scalability**
   - How many videos per day/week?
   - Peak load expectations?
   - Concurrent render requirements?
   - Budget constraints for cloud rendering?

4. **Maintenance**
   - Who will maintain the system?
   - Update frequency for dependencies?
   - Monitoring and alerting needs?
   - Backup and disaster recovery?

**Expected Answers** (Hypothesis):
- Infrastructure: Docker containers, cloud rendering (AWS/Azure)
- Integration: GitHub Actions, webhook notifications
- Scalability: 10-20 videos/week initially
- Maintenance: Automated updates, monitoring via existing tools

---

## 3. Current State Analysis

### 3.1 Existing Video Creation Workflow

```
[Current Process - To Be Validated]

1. Script Writing (1-2 hours)
   └─→ Review & Approval (1-2 days)
   
2. Asset Collection (1 hour)
   └─→ Screenshots, screen recordings, logos
   
3. Video Editing (2-4 hours)
   └─→ Tool: Camtasia / Premiere Pro
   └─→ Add transitions, effects, captions
   
4. Review Cycle (1-3 days)
   └─→ Feedback → Revisions
   
5. Export & Publish (30 min)
   └─→ Upload to YouTube/Vimeo
   └─→ Add metadata, thumbnails
   
TOTAL: 4-8 hours + 2-5 days review
```

### 3.2 Pain Points (Hypothesized)

| Pain Point | Impact | Frequency |
|------------|--------|-----------|
| Time-consuming edits | High | Every video |
| Inconsistent branding | Medium | 50% of videos |
| Resource bottleneck | High | Weekly |
| Version control issues | Medium | Monthly |
| Slow update cycle | High | Per feature release |

---

## 4. Market Research

### 4.1 Competitor Analysis

**Tools to Evaluate**:

1. **Synthesia**
   - AI-generated videos with avatars
   - Pricing: $30-100/month
   - Pros: Fast, no camera needed
   - Cons: Generic look, limited customization

2. **Loom**
   - Screen recording + narration
   - Pricing: Free-$12.50/month
   - Pros: Quick, easy sharing
   - Cons: Limited editing, casual style

3. **Descript**
   - Edit video by editing text
   - Pricing: Free-$24/month
   - Pros: Intuitive, good for updates
   - Cons: Still requires manual work

4. **Remotion** (Our chosen stack)
   - Programmatic video creation
   - Pricing: Open source / $199/month for cloud
   - Pros: Code-based, versionable, consistent
   - Cons: Learning curve, requires React knowledge

### 4.2 Why Remotion?

**Alignment with Requirements**:
- ✅ Code-based = version control friendly
- ✅ React components = reusable, modular
- ✅ Programmatic = automatable
- ✅ FFmpeg backend = professional quality
- ✅ Self-hosted = cost control

**Potential Concerns**:
- ⚠️ Requires React/JavaScript knowledge
- ⚠️ Rendering can be resource-intensive
- ⚠️ Smaller community than traditional tools

---

## 5. Technical Discovery

### 5.1 Technology Stack Evaluation

| Component | Option A | Option B | Option C |
|-----------|----------|----------|----------|
| Video Engine | Remotion | FFmpeg directly | Python MoviePy |
| Language | JavaScript/Node | Python | Go |
| UI Framework | React | Vue | Svelte |
| Deployment | Docker | Serverless | VM |
| Storage | Local | AWS S3 | Azure Blob |

**Recommended Stack**:
- Video Engine: **Remotion** (React-based, programmatic)
- Language: **JavaScript/Node.js** (team skills, Remotion compatibility)
- UI Framework: **React** (Remotion native)
- Deployment: **Docker** (portability, CI/CD integration)
- Storage: **Local + AWS S3** (hybrid approach)

### 5.2 Technical Constraints

**Known Constraints**:
1. Must run on Windows, macOS, and Linux
2. Node.js 16+ required
3. FFmpeg dependency (~100MB)
4. Puppeteer for rendering (~200MB)
5. Rendering is CPU-intensive

**Questions to Answer**:
- [ ] Cloud rendering budget?
- [ ] Maximum acceptable render time?
- [ ] Storage capacity for assets?
- [ ] Bandwidth for distribution?

---

## 6. Requirements Gathering

### 6.1 Functional Requirements (Draft)

| ID | Requirement | Priority | Source |
|----|-------------|----------|--------|
| FR-001 | Generate videos from JSON specifications | Must Have | All |
| FR-002 | Support multiple video types (tutorial, walkthrough, etc.) | Must Have | Marketing |
| FR-003 | Include AgentFactory branding automatically | Must Have | Marketing |
| FR-004 | Export to MP4 and WebM formats | Should Have | DevOps |
| FR-005 | Support 720p, 1080p, and 4K resolutions | Should Have | Marketing |
| FR-006 | Batch processing for multiple videos | Should Have | DevRel |
| FR-007 | Progress indication during rendering | Nice to Have | All |
| FR-008 | Asset validation before rendering | Must Have | DevOps |

### 6.2 Non-Functional Requirements (Draft)

| ID | Requirement | Priority | Metric |
|----|-------------|----------|--------|
| NFR-001 | Render time < 10 min per minute of video | Must Have | Performance |
| NFR-002 | Support 3 concurrent render jobs | Should Have | Scalability |
| NFR-003 | Memory usage < 2GB per job | Must Have | Stability |
| NFR-004 | 99% uptime for rendering service | Should Have | Reliability |
| NFR-005 | Videos must meet WCAG 2.1 AA | Must Have | Accessibility |

---

## 7. Risk Assessment

### 7.1 Technical Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Remotion limitations | Low | High | Prototype early, have fallback |
| Rendering performance | Medium | Medium | Optimize compositions, use cloud |
| Dependency issues | Medium | Low | Lock versions, regular updates |
| Cross-platform bugs | High | Medium | Test on all platforms early |

### 7.2 Business Risks

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| Low adoption | Medium | High | Training, documentation |
| Quality concerns | Medium | High | Review process, templates |
| Resource constraints | Low | Medium | Cloud rendering option |
| Scope creep | High | Medium | Clear requirements, phased approach |

---

## 8. Open Questions

### Questions Needing Answers:

1. **Budget**: What is the budget for cloud rendering services?
2. **Timeline**: What is the target launch date?
3. **Team**: Who will be the primary users of this system?
4. **Volume**: How many videos per month are expected?
5. **Integration**: Which existing systems need integration?
6. **Approval**: What is the approval workflow for videos?
7. **Analytics**: How will video performance be measured?

---

## 9. Next Steps

### 9.1 Immediate Actions

- [ ] Schedule stakeholder interviews (Marketing, DevRel, DevOps)
- [ ] Set up Remotion proof of concept
- [ ] Create sample video compositions
- [ ] Benchmark rendering performance
- [ ] Document brand guidelines (colors, fonts, logo usage)

### 9.2 Discovery Deliverables

1. ✅ Stakeholder interview summaries
2. ⏳ Current workflow documentation
3. ⏳ Technical architecture diagram
4. ⏳ Risk assessment matrix
5. ⏳ Requirements specification (draft)

### 9.3 Timeline

| Phase | Duration | End Date |
|-------|----------|----------|
| Discovery | 1-2 weeks | March 23, 2026 |
| Specification | 1 week | March 30, 2026 |
| Implementation | 4-6 weeks | May 11, 2026 |
| Testing | 2 weeks | May 25, 2026 |
| Launch | 1 week | June 1, 2026 |

---

## 10. Appendix

### 10.1 Glossary

| Term | Definition |
|------|------------|
| Remotion | Programmatic video creation framework using React |
| FFmpeg | Multimedia framework for video processing |
| Composition | Remotion term for a video scene/sequence |
| Render | Process of generating final video from components |

### 10.2 References

- [Remotion Documentation](https://www.remotion.dev/)
- [AgentFactory Platform](https://agentfactory.panaversity.org/)
- [FFmpeg Documentation](https://ffmpeg.org/documentation.html)
- [WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

**Document Status**: Draft - Awaiting Stakeholder Input  
**Next Review**: After stakeholder interviews  
**Owner**: Video Generator Team
