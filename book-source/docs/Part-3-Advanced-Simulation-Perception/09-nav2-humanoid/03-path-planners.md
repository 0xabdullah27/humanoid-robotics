---
title: Path Planner Selection for Bipedal Gait
chapter: 9
lesson: 3
learning_objectives:
  - Compare Navfn, Smac, and TEB planners for bipedal humanoid navigation
  - Configure TEB planner parameters for smooth, kinematically-feasible paths
  - Understand bipedal kinematic constraints and their impact on path quality
  - Collaborate with AI using Three Roles to tune planner cost weights
estimated_time: 150 minutes
skills:
  path-planner-selection:
    proficiency_level: B2
generated_by: content-implementer v1.1.0
source_spec: specs/book/part-3/chapter-09-plan.md
created: 2025-12-17
---

# Path Planner Selection for Bipedal Gait

## Overview

Path planning determines how your humanoid navigates from current position to goal—the sequence of waypoints defining the trajectory. Unlike wheeled robots that can turn on the spot and strafe sideways, bipedal humanoids have kinematic constraints that require smooth, curvature-limited paths.

This lesson compares three Nav2 planners (Navfn, Smac, TEB) and explains why trajectory-optimization planners like TEB are preferred for bipedal robots. You'll configure all three planners, compare their outputs visually, and collaborate with AI to tune TEB parameters for humanoid-appropriate paths.

Consider a humanoid navigating around a table to reach a doorway:

## Core Implementation

```
Navigation Goal (RViz / Action Client)
         ↓
    Navigator
         ↓
    Planner Server
         ↓
   ┌────────────────────────────────────┐
   │    Plugin: Planner Interface       │
   │   - Navfn (Dijkstra/A*)            │
   │   - Smac (State Lattice)           │
   │   - TEB (Trajectory Optimization)  │
   └────────────────────────────────────┘
         ↓
    Global Path (nav_msgs/Path)
         ↓
    Controller Server (follows path)
```

## Key Takeaways

- Mastered core fundamentals of **Path Planner Selection for Bipedal Gait**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
