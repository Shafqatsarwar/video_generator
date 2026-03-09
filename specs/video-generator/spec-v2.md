# Video Generator Specification V2.0

**Document Type**: Specification (Production-Ready)  
**Version**: 2.0.0  
**Phase**: Specification (Revised)  
**Date**: March 9, 2026  
**Status**: ✅ Ready for Implementation  

---

## Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-03-09 | Video Generator Team | Initial Draft |
| 2.0 | 2026-03-09 | Video Generator Team | Complete revision with AI story generation, multi-format, screen capture, voiceover, subtitles |

---

## Executive Summary

This specification defines a **production-grade AI-powered video creation platform** that transforms feature descriptions into engaging, platform-optimized videos through an intelligent story generation layer.

**Key Innovations**:
- ✅ **AI Story Generation** - Not just rendering, but intelligent storytelling
- ✅ **Multi-Platform Formats** - YouTube, TikTok, Twitter, Docs
- ✅ **Screen Capture Automation** - Automated demo recording via Playwright
- ✅ **AI Voiceover** - Professional voice synthesis
- ✅ **Auto Subtitles** - 85%+ videos watched muted
- ✅ **Scene Templates** - Consistent, fast generation
- ✅ **Thumbnail Generation** - Critical for CTR
- ✅ **Engagement Optimization** - Data-driven improvements

---

## 1. System Architecture (Revised)

### 1.1 Complete Pipeline

```
┌─────────────────────────────────────────────────────────────┐
│                    User Input Layer                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  JSON Spec   │  │  Text Prompt │  │  Batch Req   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Spec Parser & Validator                    │
│  • Schema validation                                         │
│  • Auto-complete defaults                                    │
│  • Format detection                                          │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              AI Story Generator (LLM) ⭐ NEW                │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │     Hook     │  │    Problem   │  │     Demo     │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │   Benefit    │  │     CTA      │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Scene Planner ⭐ NEW                       │
│  • Scene selection from templates                            │
│  • Timeline optimization                                     │
│  • Transition planning                                       │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                  Asset Generator ⭐ NEW                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │ Screen Rec   │  │  AI B-Roll   │  │  Thumbnails  │      │
│  │ (Playwright) │  │  (DALL-E 3)  │  │  (Auto)      │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Voiceover & Subtitles ⭐ NEW                    │
│  ┌──────────────┐  ┌──────────────┐                         │
│  │  AI Voice    │  │  Subtitles   │                         │
│  │  (ElevenLabs)│  │  (Whisper)   │                         │
│  └──────────────┘  └──────────────┘                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Remotion Video Renderer                         │
│  • Composition bundling                                      │
│  • Multi-format rendering                                    │
│  • Quality optimization                                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                   Output & Distribution                      │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  MP4/WebM    │  │   SRT/VTT    │  │   Analytics  │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 1.2 Component Overview

| Component | Technology | Purpose |
|-----------|------------|---------|
| **Spec Parser** | Node.js + Zod | Validate and normalize input |
| **Story Generator** | LLM (Claude/GPT-4) | Create engaging narrative structure |
| **Scene Planner** | Node.js + Templates | Select and arrange scenes |
| **Screen Capture** | Playwright | Automated demo recording |
| **AI B-Roll** | DALL-E 3 / Midjourney | Generate supporting visuals |
| **Voiceover** | ElevenLabs / Azure TTS | Professional voice synthesis |
| **Subtitles** | Whisper API | Auto-generate captions |
| **Thumbnail Gen** | Remotion + AI | Create click-worthy thumbnails |
| **Renderer** | Remotion + FFmpeg | Final video output |
| **Analytics** | Custom + Platform APIs | Track engagement metrics |

---

## 2. Video Story Layer ⭐ NEW

### 2.1 Story Structure

Every video must follow this proven engagement structure:

```json
{
  "story": {
    "hook": {
      "duration": 3,
      "type": "question" | "statistic" | "problem" | "preview",
      "text": "What if you could create demo videos in 10 minutes instead of 10 hours?",
      "visual": "pattern_interrupt"
    },
    "problem": {
      "duration": 7,
      "text": "Marketing teams spend 4-8 hours editing videos, plus days of review cycles.",
      "visual": "pain_point_demonstration"
    },
    "demo": {
      "duration": 40,
      "steps": [
        {
          "action": "show_interface",
          "narration": "Start with a simple JSON specification..."
        },
        {
          "action": "demonstrate_feature",
          "narration": "Our AI generates the story, script, and visuals automatically..."
        },
        {
          "action": "show_result",
          "narration": "And renders a professional video in minutes."
        }
      ]
    },
    "benefit": {
      "duration": 20,
      "text": "80% reduction in production time. Consistent branding. Multi-platform ready.",
      "visual": "before_after_comparison"
    },
    "cta": {
      "duration": 10,
      "text": "Start creating videos today at agentfactory.panaversity.org",
      "action": "visit_website",
      "visual": "cta_screen"
    }
  }
}
```

### 2.2 Story Templates

**Template 1: Product Demo**
```json
{
  "template": "product_demo",
  "structure": ["hook", "problem", "demo", "benefit", "cta"],
  "duration_target": 120
}
```

**Template 2: Feature Announcement**
```json
{
  "template": "feature_announcement",
  "structure": ["hook", "what_is_new", "how_it_works", "benefits", "cta"],
  "duration_target": 90
}
```

**Template 3: Tutorial**
```json
{
  "template": "tutorial",
  "structure": ["hook", "what_you_will_learn", "steps", "summary", "cta"],
  "duration_target": 180
}
```

**Template 4: Case Study**
```json
{
  "template": "case_study",
  "structure": ["hook", "challenge", "solution", "results", "lessons", "cta"],
  "duration_target": 150
}
```

---

## 3. Multi-Platform Format Support ⭐ NEW

### 3.1 Format Specifications

| Format ID | Platform | Aspect Ratio | Resolution | Duration | Use Case |
|-----------|----------|--------------|------------|----------|----------|
| `youtube_demo` | YouTube | 16:9 | 1920x1080 | 2-5 min | Main demos |
| `youtube_short` | YouTube Shorts | 9:16 | 1080x1920 | 15-60s | Quick tips |
| `tiktok` | TikTok | 9:16 | 1080x1920 | 15-45s | Social promo |
| `instagram_reel` | Instagram Reels | 9:16 | 1080x1920 | 15-60s | Social promo |
| `twitter_x` | Twitter/X | 1:1 | 1080x1080 | 30-60s | Announcements |
| `linkedin` | LinkedIn | 1:1 | 1080x1080 | 30-90s | Professional |
| `docs_embed` | Documentation | 16:9 | 1280x720 | 30-90s | Embedded docs |
| `landing_page` | Website | 16:9 | 1920x1080 | 60-120s | Hero video |

### 3.2 Format Configuration

```json
{
  "format": {
    "id": "youtube_demo",
    "platform": "youtube",
    "aspect_ratio": "16:9",
    "resolution": {
      "width": 1920,
      "height": 1080
    },
    "duration_target": 120,
    "fps": 30,
    "bitrate": "5000k",
    "audio_bitrate": "192k",
    "thumbnail": {
      "enabled": true,
      "style": "text_overlay",
      "text": "Create Videos in 10 Minutes"
    }
  }
}
```

### 3.3 Auto-Format Optimization

The system automatically adapts content for each platform:

```typescript
interface FormatOptimization {
  // TikTok/Reels: Fast cuts, bold text, vertical
  tiktok: {
    scene_duration: '3-5s',
    text_size: 'large',
    captions: 'bold_highlight',
    music: 'trending_audio'
  };
  
  // YouTube: Longer form, detailed explanations
  youtube: {
    scene_duration: '10-20s',
    text_size: 'medium',
    captions: 'standard',
    chapters: true
  };
  
  // LinkedIn: Professional tone, square format
  linkedin: {
    scene_duration: '5-10s',
    text_size: 'medium',
    captions: 'professional',
    branding: 'prominent'
  };
}
```

---

## 4. AI Script Generation ⭐ NEW

### 4.1 Auto-Script Configuration

```json
{
  "script": {
    "auto_generate": true,
    "input": {
      "topic": "AgentFactory Video Generator",
      "feature_description": "Automated video creation from JSON specs with AI story generation",
      "key_points": [
        "80% reduction in production time",
        "Multi-platform format support",
        "AI-powered storytelling",
        "Professional voiceover"
      ],
      "target_audience": "marketing_teams",
      "tone": "professional_enthusiastic",
      "reading_level": 8
    },
    "constraints": {
      "duration_seconds": 120,
      "words_per_minute": 150,
      "avoid_jargon": true,
      "include_examples": true
    }
  }
}
```

### 4.2 Script Generation Prompt Template

```
You are an expert video scriptwriter for tech products.

Create a {duration}-second video script for {audience}.

Product: {product_name}
Feature: {feature_description}
Key Points: {key_points}

Structure:
- Hook (0-3s): Grab attention immediately
- Problem (3-10s): Show the pain point
- Demo (10-{demo_end}s): Show how it works
- Benefit ({demo_end}-{benefit_end}s): Explain value
- CTA ({benefit_end}-end): Clear call to action

Tone: {tone}
Reading Level: Grade {level}

Output format: JSON with narration, visuals, and timing.
```

### 4.3 Script Quality Checks

Before proceeding to production:

```typescript
interface ScriptQualityCheck {
  duration_match: boolean; // Within 10% of target
  hook_strength: number; // 1-10 score
  clarity_score: number; // 1-100
  jargon_count: number; // Should be < 3
  cta_clarity: boolean; // Clear and actionable
  pacing_score: number; // 1-100
  
  auto_fix: {
    compress_if_too_long: boolean;
    expand_if_too_short: boolean;
    simplify_language: boolean;
  };
}
```

---

## 5. Screen Capture Automation ⭐ NEW

### 5.1 Screen Capture Specification

```json
{
  "screen_capture": {
    "enabled": true,
    "engine": "playwright",
    "browser": "chromium",
    "viewport": {
      "width": 1920,
      "height": 1080
    },
    "steps": [
      {
        "action": "navigate",
        "url": "https://agentfactory.panaversity.org",
        "wait": "networkidle"
      },
      {
        "action": "click",
        "selector": "#create-agent",
        "wait": 500
      },
      {
        "action": "type",
        "selector": "#agent-name",
        "text": "Demo Agent",
        "delay": 50
      },
      {
        "action": "screenshot",
        "label": "agent_creation_screen",
        "duration": 3
      },
      {
        "action": "highlight",
        "selector": "#submit-button",
        "duration": 2
      }
    ],
    "output": {
      "format": "mp4",
      "fps": 30,
      "quality": "high"
    }
  }
}
```

### 5.2 Smart Selector Fallback

To handle UI changes:

```typescript
interface SmartSelector {
  primary: string; // "#submit-button"
  fallbacks: string[]; // ["button[type='submit']", ".submit-btn"]
  xpath: string; // "//button[contains(text(), 'Submit')]"
  text_match: string; // "Submit"
  
  // AI-powered visual matching
  visual_description: string; // "Blue submit button in bottom right"
}
```

### 5.3 Capture Modes

| Mode | Description | Use Case |
|------|-------------|---------|
| `full_page` | Capture entire viewport | Dashboard demos |
| `element` | Focus on specific element | Feature highlights |
| `scroll` | Auto-scroll through content | Long pages |
| `interaction` | Record clicks and typing | Form completion |
| `before_after` | Show comparison | Feature updates |

---

## 6. AI Voiceover System ⭐ NEW

### 6.1 Voiceover Configuration

```json
{
  "voiceover": {
    "enabled": true,
    "type": "ai",
    "provider": "elevenlabs",
    "voice": {
      "id": "professional_male_01",
      "name": "James",
      "characteristics": ["professional", "warm", "clear"]
    },
    "settings": {
      "stability": 0.75,
      "similarity_boost": 0.75,
      "style": 0.5,
      "speed": 1.0
    },
    "output": {
      "format": "mp3",
      "sample_rate": 48000,
      "bitrate": 192,
      "normalize": true,
      "target_loudness": -16
    }
  }
}
```

### 6.2 Voice Options

| Provider | Voices | Languages | Best For |
|----------|--------|-----------|----------|
| ElevenLabs | 100+ | 28+ | Highest quality |
| Azure TTS | 400+ | 100+ | Enterprise |
| Amazon Polly | 60+ | 30+ | Cost-effective |
| Google TTS | 300+ | 50+ | Multi-language |
| OpenAI | 4 | 10+ | Simple integration |

### 6.3 Voice Cloning (Premium)

```json
{
  "voice_cloning": {
    "enabled": true,
    "custom_voice": {
      "name": "Brand Voice",
      "training_samples": [
        "sample_1.wav",
        "sample_2.wav",
        "sample_3.wav"
      ],
      "training_duration_minutes": 5,
      "accuracy_target": 0.95
    }
  }
}
```

---

## 7. Auto Subtitle Generation ⭐ NEW

### 7.1 Subtitle Configuration

```json
{
  "subtitles": {
    "enabled": true,
    "generation": {
      "method": "whisper_api",
      "language": "en",
      "model": "whisper-large-v3",
      "word_timestamps": true
    },
    "style": {
      "type": "highlight_keywords",
      "font": "Inter",
      "size": 48,
      "color": "#FFFFFF",
      "background": {
        "enabled": true,
        "color": "rgba(0, 0, 0, 0.7)",
        "padding": 8
      },
      "position": "bottom",
      "animation": "fade_in"
    },
    "output": {
      "burn_in": true,
      "srt_export": true,
      "vtt_export": true
    }
  }
}
```

### 7.2 Multi-Language Subtitles

```json
{
  "subtitles": {
    "primary": "en",
    "translations": [
      {
        "language": "es",
        "auto_translate": true,
        "human_review": false
      },
      {
        "language": "fr",
        "auto_translate": true,
        "human_review": false
      },
      {
        "language": "de",
        "auto_translate": true,
        "human_review": false
      }
    ]
  }
}
```

### 7.3 Subtitle Styles

| Style | Description | Use Case |
|-------|-------------|---------|
| `standard` | White text, black outline | General purpose |
| `highlight_keywords` | Bold key terms | Educational |
| `karaoke` | Word-by-word highlight | Music, engaging |
| `minimal` | Small, unobtrusive | Professional |
| `bold` | Large, high contrast | Social media |

---

## 8. Branding Enforcement ⭐ NEW

### 8.1 Brand Configuration

```json
{
  "branding": {
    "logo": {
      "file": "agentfactory_logo.svg",
      "position": "top-right",
      "size": {
        "width": 120,
        "height": 40
      },
      "opacity": 1.0,
      "margin": {
        "top": 20,
        "right": 20
      }
    },
    "colors": {
      "primary": "#2563eb",
      "secondary": "#1e293b",
      "accent": "#10b981",
      "background": "#ffffff",
      "text": "#1e293b"
    },
    "fonts": {
      "primary": "Inter",
      "secondary": "Roboto Mono",
      "sizes": {
        "title": 56,
        "heading": 36,
        "body": 24,
        "caption": 18
      }
    },
    "intro": {
      "enabled": true,
      "file": "brand_intro.mp4",
      "duration": 3
    },
    "outro": {
      "enabled": true,
      "file": "brand_outro.mp4",
      "cta_text": "Start Building Today",
      "cta_url": "https://agentfactory.panaversity.org",
      "duration": 5
    }
  }
}
```

### 8.2 Brand Compliance Check

Before publishing:

```typescript
interface BrandCompliance {
  logo_present: boolean;
  logo_position_correct: boolean;
  colors_match_palette: boolean;
  fonts_correct: boolean;
  intro_outro_present: boolean;
  cta_clear: boolean;
  
  auto_fix: {
    add_logo_if_missing: boolean;
    correct_colors: boolean;
    add_intro_outro: boolean;
  };
}
```

---

## 9. Scene Templates ⭐ NEW

### 9.1 Template Library

```json
{
  "scene_templates": {
    "hero_scene": {
      "description": "Opening scene with title and hook",
      "duration": 5,
      "elements": ["title", "subtitle", "background"],
      "animation": "fade_in_zoom"
    },
    "feature_scene": {
      "description": "Showcase a single feature",
      "duration": 15,
      "elements": ["feature_title", "demo_clip", "benefit_text"],
      "animation": "slide_in"
    },
    "step_scene": {
      "description": "Step-by-step instruction",
      "duration": 10,
      "elements": ["step_number", "instruction", "visual"],
      "animation": "numbered_reveal"
    },
    "comparison_scene": {
      "description": "Before/after comparison",
      "duration": 12,
      "elements": ["before", "after", "divider"],
      "animation": "split_reveal"
    },
    "testimonial_scene": {
      "description": "Customer quote or result",
      "duration": 10,
      "elements": ["quote", "author", "company", "photo"],
      "animation": "quote_reveal"
    },
    "cta_scene": {
      "description": "Call to action screen",
      "duration": 8,
      "elements": ["cta_text", "button", "url"],
      "animation": "pulse_cta"
    }
  }
}
```

### 9.2 Template Selection Logic

```typescript
interface TemplateSelection {
  // Based on video type
  by_video_type: {
    'product_demo': ['hero', 'feature', 'step', 'cta'],
    'tutorial': ['hero', 'step', 'step', 'step', 'cta'],
    'announcement': ['hero', 'feature', 'comparison', 'cta'],
    'case_study': ['hero', 'testimonial', 'results', 'cta']
  };
  
  // Based on platform
  by_platform: {
    'youtube': { scene_duration: '10-20s' },
    'tiktok': { scene_duration: '3-5s' },
    'linkedin': { scene_duration: '5-10s' }
  };
}
```

---

## 10. Engagement Metrics Loop ⭐ NEW

### 10.1 Analytics Integration

```json
{
  "analytics": {
    "tracking": {
      "enabled": true,
      "platforms": ["youtube", "vimeo", "wistia", "custom"],
      "metrics": [
        "views",
        "watch_time",
        "completion_rate",
        "drop_off_points",
        "click_through_rate",
        "shares",
        "comments"
      ]
    },
    "optimization": {
      "enabled": true,
      "ab_testing": {
        "enabled": true,
        "test_thumbnails": true,
        "test_hooks": true,
        "test_ctas": true
      },
      "auto_improve": {
        "enabled": true,
        "based_on": "completion_rate",
        "min_data_points": 100
      }
    }
  }
}
```

### 10.2 Engagement Data Schema

```typescript
interface EngagementMetrics {
  // Basic metrics
  views: number;
  unique_viewers: number;
  impressions: number;
  
  // Engagement
  average_watch_time: number; // seconds
  completion_rate: number; // percentage
  rewatch_rate: number; // percentage
  
  // Drop-off analysis
  drop_off_points: {
    timestamp: number;
    percentage_lost: number;
  }[];
  
  // Actions
  click_through_rate: number;
  shares: number;
  comments: number;
  likes: number;
  
  // Optimization insights
  best_performing_segment: {
    start: number;
    end: number;
    retention: number;
  };
  
  worst_performing_segment: {
    start: number;
    end: number;
    drop_off: number;
  };
}
```

---

## 11. Batch Generation ⭐ NEW

### 11.1 Batch Configuration

```json
{
  "batch": {
    "enabled": true,
    "videos": [
      {
        "id": "video_001",
        "feature": "agent_creation",
        "title": "Create Your First Agent",
        "duration": 120,
        "formats": ["youtube_demo", "tiktok", "twitter_x"]
      },
      {
        "id": "video_002",
        "feature": "memory_system",
        "title": "Agent Memory Explained",
        "duration": 90,
        "formats": ["youtube_demo", "linkedin"]
      },
      {
        "id": "video_003",
        "feature": "tool_usage",
        "title": "Connecting Tools to Agents",
        "duration": 150,
        "formats": ["youtube_demo", "docs_embed"]
      }
    ],
    "parallel_jobs": 3,
    "output_directory": "./output/batch_{date}"
  }
}
```

### 11.2 Batch Progress Tracking

```typescript
interface BatchProgress {
  total_videos: number;
  completed: number;
  failed: number;
  in_progress: number;
  
  videos: {
    id: string;
    status: 'pending' | 'generating' | 'rendering' | 'complete' | 'failed';
    progress: number; // 0-100
    output_path?: string;
    error?: string;
  }[];
  
  estimated_completion: string; // ISO timestamp
}
```

---

## 12. AI B-Roll Generation ⭐ NEW

### 12.1 B-Roll Configuration

```json
{
  "broll": {
    "enabled": true,
    "generation": {
      "method": "ai",
      "provider": "dall-e-3",
      "style": "modern_minimal",
      "aspect_ratio": "16:9",
      "quality": "hd"
    },
    "triggers": {
      "on_key_concept": true,
      "on_transition": true,
      "to_avoid_static": true
    },
    "prompts": {
      "technology": "Futuristic technology interface, blue and white, clean design",
      "business": "Professional office environment, modern, bright",
      "data": "Data visualization, charts and graphs, colorful",
      "security": "Digital security shield, protection, blue"
    }
  }
}
```

### 12.2 B-Roll Types

| Type | Description | When Used |
|------|-------------|-----------|
| `concept_visual` | Abstract representation | Explaining ideas |
| `icon_animation` | Animated icons | Feature lists |
| `ui_highlight` | Zoomed UI elements | Demo emphasis |
| `transition_fill` | Bridge between scenes | Scene changes |
| `background_loop` | Subtle motion background | Text overlays |

---

## 13. Video Personalization ⭐ NEW

### 13.1 Personalization Configuration

```json
{
  "personalization": {
    "enabled": true,
    "audience_segments": [
      {
        "name": "developers",
        "tone": "technical",
        "examples": ["code snippets", "API references"],
        "duration_multiplier": 1.2
      },
      {
        "name": "business_executives",
        "tone": "strategic",
        "examples": ["ROI metrics", "case studies"],
        "duration_multiplier": 0.8
      },
      {
        "name": "marketers",
        "tone": "benefit_focused",
        "examples": ["campaign results", "engagement stats"],
        "duration_multiplier": 1.0
      }
    ],
    "dynamic_content": {
      "insert_company_name": false,
      "insert_viewer_name": false,
      "adapt_examples": true,
      localize_cta: true
    }
  }
}
```

---

## 14. Rendering Modes ⭐ NEW

### 14.1 Mode Configuration

```json
{
  "rendering": {
    "mode": "local_dev",
    "modes": {
      "local_dev": {
        "engine": "remotion_local",
        "preview": true,
        "quality": "medium",
        "fast": true
      },
      "ci_pipeline": {
        "engine": "remotion_lambda",
        "preview": false,
        "quality": "high",
        "parallel": true
      },
      "cloud_render": {
        "engine": "aws_lambda",
        "preview": false,
        "quality": "maximum",
        "scaling": "auto"
      }
    }
  }
}
```

---

## 15. Timeline Editing ⭐ NEW

### 15.1 Timeline Specification

```json
{
  "timeline": {
    "total_duration": 120,
    "scenes": [
      {
        "id": "scene_001",
        "template": "hero_scene",
        "start": 0,
        "duration": 5,
        "transition": "fade",
        "elements": {
          "title": "AgentFactory Video Generator",
          "subtitle": "Create Videos in 10 Minutes"
        }
      },
      {
        "id": "scene_002",
        "template": "problem_scene",
        "start": 5,
        "duration": 7,
        "transition": "slide_left",
        "elements": {
          "text": "Manual video editing takes 4-8 hours"
        }
      },
      {
        "id": "scene_003",
        "template": "demo_scene",
        "start": 12,
        "duration": 40,
        "transition": "zoom",
        "elements": {
          "screen_capture": "demo.mp4",
          "narration": "voiceover_track_01.mp3"
        }
      }
    ]
  }
}
```

---

## 16. Thumbnail Generation ⭐ NEW

### 16.1 Thumbnail Configuration

```json
{
  "thumbnail": {
    "enabled": true,
    "generation": {
      "method": "ai",
      "provider": "dall-e-3",
      "style": "youtube_optimized"
    },
    "elements": {
      "background_image": true,
      "text_overlay": {
        "enabled": true,
        "text": "Create Videos in 10 Minutes",
        "font": "Inter",
        "size": 72,
        "color": "#FFFFFF",
        "stroke": {
          "enabled": true,
          "color": "#000000",
          "width": 4
        }
      },
      "logo": {
        "enabled": true,
        "position": "bottom-right"
      },
      "emoji": {
        "enabled": true,
        "emoji": "🎬",
        "position": "top-left"
      }
    },
    "variations": 3,
    "ab_test": true
  }
}
```

---

## 17. LLM Quality Review ⭐ NEW

### 17.1 Quality Review Configuration

```json
{
  "quality_review": {
    "enabled": true,
    "checks": {
      "pacing": {
        "enabled": true,
        "min_scene_duration": 3,
        "max_scene_duration": 30,
        "variety_score": 0.7
      },
      "clarity": {
        "enabled": true,
        "max_jargon_count": 3,
        "reading_level_max": 10,
        "sentence_length_max": 25
      },
      "engagement": {
        "enabled": true,
        "hook_strength_min": 7,
        "cta_clarity_min": 8,
        "visual_variety_min": 0.6
      },
      "technical": {
        "enabled": true,
        "audio_quality_min": 0.8,
        "video_quality_min": 0.9,
        "subtitle_accuracy_min": 0.95
      }
    },
    "auto_fix": {
      "enabled": true,
      "fix_pacing": true,
      "simplify_language": true,
      "enhance_hook": true
    }
  }
}
```

---

## 18. Complete JSON Schema

### 18.1 Full Specification Example

```json
{
  "$schema": "https://agentfactory.panaversity.org/video-spec-v2.json",
  "version": "2.0",
  "video": {
    "title": "AgentFactory Video Generator Demo",
    "description": "See how AI transforms video creation",
    "template": "product_demo",
    "auto_script": true
  },
  "format": {
    "id": "youtube_demo",
    "platform": "youtube",
    "aspect_ratio": "16:9",
    "resolution": "1920x1080",
    "duration_target": 120
  },
  "story": {
    "hook": "What if you could create demo videos in 10 minutes?",
    "problem": "Manual editing takes 4-8 hours plus review cycles",
    "demo": "Our AI generates story, script, and visuals automatically",
    "benefit": "80% time reduction, consistent branding, multi-platform",
    "cta": "Start at agentfactory.panaversity.org"
  },
  "screen_capture": {
    "enabled": true,
    "steps": [
      {"action": "navigate", "url": "https://agentfactory.panaversity.org"},
      {"action": "click", "selector": "#create-agent"},
      {"action": "type", "text": "Demo Agent"}
    ]
  },
  "voiceover": {
    "enabled": true,
    "provider": "elevenlabs",
    "voice": "professional_male_01"
  },
  "subtitles": {
    "enabled": true,
    "style": "highlight_keywords",
    "languages": ["en", "es", "fr"]
  },
  "branding": {
    "logo_position": "top-right",
    "colors": {"primary": "#2563eb"},
    "intro": "brand_intro.mp4",
    "outro": "brand_outro.mp4"
  },
  "thumbnail": {
    "enabled": true,
    "text": "Create Videos in 10 Minutes",
    "variations": 3
  },
  "quality_review": {
    "enabled": true,
    "auto_fix": true
  },
  "analytics": {
    "tracking": true,
    "ab_testing": true
  }
}
```

---

## 19. Implementation Priority

### Phase 1: Core (V2.0 MVP)

1. ✅ Story generation layer
2. ✅ Multi-format support
3. ✅ AI script generation
4. ✅ Voiceover integration
5. ✅ Auto subtitles
6. ✅ Basic scene templates

### Phase 2: Advanced (V2.1)

7. ✅ Screen capture automation
8. ✅ AI B-roll generation
9. ✅ Thumbnail generation
10. ✅ Branding enforcement
11. ✅ Timeline editing

### Phase 3: Premium (V2.2)

12. ✅ Video personalization
13. ✅ Engagement metrics loop
14. ✅ Batch generation
15. ✅ LLM quality review
16. ✅ Advanced analytics

---

## 20. Success Metrics (Updated)

| Metric | Target | Measurement |
|--------|--------|-------------|
| **Production Time** | < 10 minutes | End-to-end timing |
| **Engagement Rate** | > 60% completion | Platform analytics |
| **CTR Improvement** | > 25% vs manual | A/B testing |
| **Voice Quality** | > 95% naturalness | User surveys |
| **Subtitle Accuracy** | > 98% | Whisper validation |
| **Format Coverage** | 8+ platforms | Output verification |
| **Brand Compliance** | 100% | Automated checks |

---

**Document Status**: ✅ Ready for Implementation  
**Version**: 2.0.0  
**Next Step**: Technical implementation planning  
**Launch Target**: April 15, 2026
