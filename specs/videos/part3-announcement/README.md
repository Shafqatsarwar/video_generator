# Part 3 Announcement Video Project

**Quick Start Guide** | Last Updated: March 9, 2026

---

## 🎯 Project Overview

Create a **2-minute announcement video** for **AgentFactory Part 3: Business Domain Agent Workflows** to drive course enrollment and awareness.

**Target Launch**: March 26, 2026

---

## 📋 Key Documents

| Document | Purpose | Location |
|----------|---------|----------|
| **Full Specification** | Complete creative brief, script, visual specs | [`spec.md`](./spec.md) |
| **JSON Spec** | Machine-readable spec for video generator | [`spec.json`](./spec.json) |
| **Task List** | Production tasks with owners and deadlines | [`tasks.md`](./tasks.md) |
| **This README** | Quick reference and how-to | [`README.md`](./README.md) |

---

## 🚀 Quick Start

### Option 1: Generate with Video Generator Agent

```bash
# Navigate to project root
cd D:\Panaverse\Q2\video_generator

# Run the video generator with Part 3 spec
node .agents/skills/video-generation/video-generation.skill specs/videos/part3-announcement/spec.json
```

### Option 2: Use Test Runner

```bash
# Run demo generation (if configured)
node test-video-generator.js demo
```

### Option 3: Manual Production

Follow the task list in [`tasks.md`](./tasks.md) for traditional video production workflow.

---

## 📊 Video Specifications

| Attribute | Value |
|-----------|-------|
| **Title** | AgentFactory Part 3: Business Domain Agent Workflows |
| **Duration** | 120 seconds (2 minutes) |
| **Type** | Product Overview / Announcement |
| **Resolution** | 1080p (1920x1080) |
| **Format** | MP4 (H.264) |
| **FPS** | 30 |
| **Target Audience** | Enterprise professionals, AI engineers, C-suite |

---

## 🎬 Video Structure

```
0:00 - 0:15  → Introduction (Hook)
0:15 - 0:30  → Enterprise Focus (7 domains)
0:30 - 0:45  → Domain Expertise (SKILL.md)
0:45 - 1:00  → Production-Ready Agents
1:00 - 1:15  → Governance & Safety
1:15 - 1:30  → Platform Agnostic
1:30 - 2:00  → Conclusion + CTA
```

---

## 🎯 Key Messages

1. **Enterprise Focus**: 16 chapters across 7 business domains
2. **Domain Expertise**: Your 20+ years of judgment = the scarce resource
3. **Production-Ready**: Not prototypes, but validated configurations
4. **Governance**: AI executes, professionals judge
5. **Platform Agnostic**: Works with Claude, Gemini, Copilot, etc.

---

## 📢 Call-to-Action

**Primary CTA**: Visit [agentfactory.panaversity.org](https://agentfactory.panaversity.org)

**Secondary CTA**: Enroll in Part 3 course

---

## 📅 Production Timeline

| Phase | Dates | Duration |
|-------|-------|----------|
| Pre-Production | March 10-12 | 3 days |
| Asset Creation | March 13-17 | 5 days |
| Video Generation | March 18-20 | 3 days |
| Review & Revisions | March 21-24 | 4 days |
| Final Export | March 25 | 1 day |
| **Launch** | **March 26** | **1 day** |

---

## 👥 Required Assets

### Must Have

- [ ] AgentFactory logo (PNG/SVG)
- [ ] Part 3 book cover graphic
- [ ] 7 business domains grid visual
- [ ] SKILL.md code snippet screenshot
- [ ] Platform logos (Claude, Gemini, Copilot, etc.)
- [ ] Background music (inspiring, professional)
- [ ] Voiceover recording

### Nice to Have

- [ ] Professional voiceover artist
- [ ] Custom animations
- [ ] Extended version (180s)
- [ ] Social media cuts (30s)

---

## ✅ Quality Checklist

Before launch, verify:

- [ ] Resolution is 1080p
- [ ] Audio is clear and normalized (-16 LUFS)
- [ ] Captions are accurate and synced
- [ ] Color contrast meets 4.5:1 ratio
- [ ] All links work with UTM tracking
- [ ] Brand colors used correctly (#2563eb primary)
- [ ] Logo visible throughout (top-left)
- [ ] CTA is clear and compelling

---

## 📈 Success Metrics

| Metric | Target |
|--------|--------|
| Views (7 days) | 1,000+ |
| Views (30 days) | 5,000+ |
| Average Watch Time | 60s+ |
| Completion Rate | 50%+ |
| Click-Through Rate | 5%+ |
| Enrollment Conversion | 2%+ |

---

## 🔗 Distribution Channels

1. **Website**: Landing page hero video
2. **YouTube**: Main upload with end screens
3. **LinkedIn**: Post with link to enrollment
4. **Twitter/X**: Thread with video + link
5. **Email Campaign**: Mailing list blast
6. **Social Media**: Teaser cuts for Instagram, Facebook

---

## 🛠️ Tools & Resources

### Video Generation

- **Video Generator Agent**: Automated video creation
- **Remotion**: Programmatic video framework
- **FFmpeg**: Video processing

### Asset Creation

- **Figma/Canva**: Graphics design
- **ElevenLabs**: AI voiceover (optional)
- **Epidemic Sound**: Royalty-free music

### Distribution

- **YouTube Studio**: Upload and analytics
- **Buffer/Hootsuite**: Social media scheduling
- **Google Analytics**: Website tracking
- **UTM Builder**: Link tracking

---

## 📞 Contact Information

| Role | Name | Contact |
|------|------|---------|
| Project Lead | TBD | TBD |
| Content Lead | TBD | TBD |
| Video Production | Automated | Video Generator Agent |

---

## 🚨 Common Issues

### Issue: Video Generator Not Found

```bash
# Ensure you're in the project root
cd D:\Panaverse\Q2\video_generator

# Check if dependencies are installed
npm install
```

### Issue: Render Timeout

```bash
# Reduce quality or resolution for faster render
# Or use cloud rendering option
```

### Issue: Asset Not Found

```bash
# Ensure all assets are in ./assets/ directory
# Check file paths in spec.json
```

---

## 📚 Reference Links

- [Part 3 Documentation](https://agentfactory.panaversity.org/docs/Business-Domain-Agent-Workflows)
- [AgentFactory Main Site](https://agentfactory.panaversity.org/)
- [Video Generator Spec](../../video-generator/spec.md)
- [Brand Guidelines](../../brand-guidelines.md)

---

## ✨ Quick Tips

1. **Start with the JSON spec** - It has all the details the video generator needs
2. **Review the script** - Make sure messaging aligns with Part 3 positioning
3. **Test early** - Generate a low-quality version first to check timing
4. **Get feedback** - Share draft with stakeholders before final export
5. **Track everything** - Use UTM parameters on all links

---

**Status**: ✅ Ready for Production  
**Next Step**: Begin pre-production (March 10)  
**Launch Date**: March 26, 2026
