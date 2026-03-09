# AgentFactory Video Generator

A specialized agent and skill for creating demo videos for the AgentFactory platform (https://agentfactory.panaversity.org/).

## Overview

This project implements a video generation agent that automates the creation of demo videos showcasing AgentFactory capabilities. The agent follows a Spec-Driven Development (SDD) methodology to ensure high-quality, consistent output.

## Features

- Automated video generation from specifications
- Support for multiple video types (tutorials, feature walkthroughs, case studies, product overviews)
- Integration with Remotion for professional video rendering
- Asset management for images, videos, audio, and fonts
- Configurable output formats and quality settings
- Batch processing for multiple videos

## Architecture

The system consists of:

1. **Video Generator Agent**: The main orchestrator that coordinates video creation
2. **Script Generator**: Creates narrative scripts based on specifications
3. **Asset Manager**: Handles loading and validation of media assets
4. **Renderer**: Uses Remotion to produce the final videos
5. **Video Generation Skill**: Callable interface for video creation

## Usage

To generate a video, provide a specification with:

- `title`: Title of the video
- `description`: Brief description of the video content
- `keyPoints`: Array of key points to cover
- `duration`: Desired duration in seconds
- `targetAudience`: Target audience for the video
- `assets`: Required media assets

## Installation

```bash
npm install
```

## Running

```bash
npm start
```

Or use the skill directly:

```bash
node .agents/skills/video-generation/video-generation.skill '{"title":"My Demo","description":"A demonstration of AgentFactory","keyPoints":["Point 1","Point 2"],"duration":60}'
```

## SDD Methodology

This project follows Spec-Driven Development principles:

- Clear specifications before implementation
- Test-first approach for all components
- Modular, reusable components
- Automated quality checks

## Contributing

See the `.specify/` directory for detailed development workflows and contribution guidelines.