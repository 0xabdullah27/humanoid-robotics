---
title: Dynamic Obstacle Avoidance and Replanning
chapter: 9
lesson: 6
learning_objectives:
  - Configure costmap update frequency for real-time dynamic obstacle detection
  - Implement replanning triggers for obstacle-induced path changes
  - Design safe stop behavior for collision-imminent scenarios
  - Collaborate with AI using Three Roles to tune dynamic avoidance parameters
estimated_time: 150 minutes
skills:
  dynamic-obstacle-handling:
    proficiency_level: B2
generated_by: content-implementer v1.1.0
source_spec: specs/book/part-3/chapter-09-plan.md
created: 2025-12-17
---

# Dynamic Obstacle Avoidance and Replanning

## Overview

Static obstacles—walls, furniture, permanent structures—are captured in the SLAM map and handled by global path planning. But humanoid robots navigate human-populated environments where obstacles move: people walk, doors open, objects get relocated. Dynamic obstacle handling determines whether your humanoid gracefully navigates around a walking person or collides because it didn't react in time.

This lesson focuses on configuring Nav2 for real-time dynamic obstacle detection and response. You'll tune costmap update frequencies, implement replanning triggers, and design safe-stop behaviors for collision-imminent scenarios.

Consider a humanoid walking toward a doorway:

## Core Implementation

```
Sensor Data (Depth Camera / LiDAR)
         ↓ (sensor rate: 30 Hz)
    Costmap Obstacle Layer
         ↓ (update rate: 5-10 Hz)
    Local Costmap Update
         ↓ (publish rate: 5-10 Hz)
    Controller (DWB)
         ↓ (control rate: 20 Hz)
   ┌─────┴─────┐
   │           │
 Replan    Safe Stop
(if path blocked)  (if collision imminent)
```

## Key Takeaways

- Mastered core fundamentals of **Dynamic Obstacle Avoidance and Replanning**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
