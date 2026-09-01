---
sidebar_position: 10
---

# Chapter 10 Summary

## Overview

In this chapter, you built a complete voice command pipeline for humanoid robots:

| Concept | Description |
|---------|-------------|
| **Sample Rate** | 16kHz for Whisper compatibility |
| **VAD** | Detect speech vs silence vs noise |
| **Intent** | Structured command: action + target + parameters |
| **Confidence** | Parser certainty; low = ask clarification |
| **Hybrid Parsing** | Rules for speed, LLM for accuracy |
| **Lifecycle Nodes** | Managed startup/shutdown in ROS 2 |

| Metric | Target | How to Achieve |
|--------|--------|----------------|
| Transcription WER | under 10% | Whisper base/small model |
| Intent accuracy | over 90% | Hybrid parser with testing |
| End-to-end latency | under 2s | Smaller models, optimization |
| False positive rate | under 10% | Tuned VAD thresholds |

## Core Implementation

```bash
ros2 run voice_command voice_command_node
```

## Key Takeaways

- Mastered core fundamentals of **Chapter 10 Summary**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
