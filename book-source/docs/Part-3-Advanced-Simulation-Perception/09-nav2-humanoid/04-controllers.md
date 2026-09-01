---
title: Controller Configuration for Humanoid Tracking
chapter: 9
lesson: 4
learning_objectives:
  - Configure DWB controller for stable humanoid trajectory tracking
  - Set velocity and acceleration limits based on bipedal gait stability
  - Monitor and minimize cross-track and heading error during navigation
  - Collaborate with AI using Three Roles to tune controller parameters
estimated_time: 150 minutes
skills:
  controller-tuning:
    proficiency_level: B2
generated_by: content-implementer v1.1.0
source_spec: specs/book/part-3/chapter-09-plan.md
created: 2025-12-17
---

# Controller Configuration for Humanoid Tracking

## Overview

The path planner (Lesson 3) produces *where* to go—a sequence of waypoints. The controller determines *how* to get there—the velocity commands that make the robot follow the path. For humanoid robots, controller configuration is critical because inappropriate velocity commands cause balance loss and falls.

This lesson focuses on the DWB (Dynamic Window approach with Behavior) controller, Nav2's default local planner/controller. You'll configure velocity limits based on humanoid gait stability, tune acceleration profiles for smooth movement, and monitor tracking error to ensure the robot follows planned paths accurately.

Consider the path from Lesson 3: a smooth curve navigating around an obstacle. The planner produced excellent geometry. But the controller must translate this geometry into velocity commands:

## Core Implementation

```
Global Path (from Planner)
         ↓
    Controller Server
         ↓
   ┌────────────────────────────────────┐
   │    Plugin: Controller Interface    │
   │   - DWB (Dynamic Window)           │
   │   - Regulated Pure Pursuit         │
   │   - MPPI (Model Predictive)        │
   └────────────────────────────────────┘
         ↓
    Velocity Commands (geometry_msgs/Twist)
         ↓
    Robot Base (motors/actuators)
```

## Key Takeaways

- Mastered core fundamentals of **Controller Configuration for Humanoid Tracking**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
