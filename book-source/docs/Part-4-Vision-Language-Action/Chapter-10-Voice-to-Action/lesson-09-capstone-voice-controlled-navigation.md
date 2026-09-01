---
sidebar_position: 9
---

# Lesson 9: Capstone - Voice-Controlled Humanoid Navigation

## Overview

**Layer 4: Spec-Driven Integration** | **Estimated Time: 180 minutes**

---

By the end of this capstone, you will have:

## Core Implementation

```
┌─────────────────────────────────────────────────────────────────┐
│                    Voice-Controlled Navigation                   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────┐   ┌──────────┐   ┌──────────┐   ┌──────────┐    │
│  │   Mic    │──▶│   VAD    │──▶│ Whisper  │──▶│  Parser  │    │
│  │ Capture  │   │ Segment  │   │Transcribe│   │  Intent  │    │
│  └──────────┘   └──────────┘   └──────────┘   └──────────┘    │
│       │              │              │              │           │
│       │              │              │              ▼           │
│       │              │              │       ┌──────────┐       │
│       │              │              │       │  ROS 2   │       │
│       │              │              │       │Publisher │       │
│       │              │              │       └────┬─────┘       │
│       │              │              │            │             │
├───────┼──────────────┼──────────────┼────────────┼─────────────┤
│       │              │              │            │             │
│       │              │              │            ▼             │
│  ┌────────────────────────────────────────────────────┐       │
│  │                     Nav2 Stack                      │       │
│  │  ┌──────────┐   ┌──────────┐   ┌──────────┐       │       │
│  │  │ Waypoint │──▶│ Planner  │──▶│Controller│       │       │
│  │  │  Manager │   │          │   │          │       │       │
│  │  └──────────┘   └──────────┘   └──────────┘       │       │
│  └────────────────────────────────────────────────────┘       │
│                            │                                   │
│                            ▼                                   │
│                    ┌──────────────┐                           │
│                    │   Humanoid   │                           │
│                    │   (Gazebo/   │                           │
│                    │   Isaac Sim) │                           │
│                    └──────────────┘                           │
└─────────────────────────────────────────────────────────────────┘
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 9: Capstone - Voice-Controlled Humanoid Navigation**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
