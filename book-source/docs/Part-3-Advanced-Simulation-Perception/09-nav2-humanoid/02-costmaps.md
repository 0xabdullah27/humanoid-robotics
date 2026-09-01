---
title: Costmap Configuration for Humanoid Footprint
chapter: 9
lesson: 2
learning_objectives:
  - Configure global and local costmaps with humanoid-specific footprint geometry
  - Calculate inflation radius based on sensor range and reaction time
  - Integrate Isaac Sim depth camera sensor data into obstacle layer
  - Visualize costmaps in RViz to validate configuration correctness
estimated_time: 120 minutes
skills:
  costmap-configuration:
    proficiency_level: B2
generated_by: content-implementer v1.1.0
source_spec: specs/book/part-3/chapter-09-plan.md
created: 2025-12-17
---

# Costmap Configuration for Humanoid Footprint

## Overview

Costmaps are Nav2's representation of the environment—2D grids where each cell has a cost indicating obstacle presence. For autonomous navigation, your humanoid needs accurate costmaps that respect its footprint geometry and provide sufficient safety margins around obstacles.

This lesson focuses on **specification-first configuration**: you'll define footprint safety requirements BEFORE editing YAML configs. Unlike wheeled robots with circular footprints, bipedal humanoids have rectangular stances that change during walking. Your costmap configuration must account for this complexity.

You'll work manually in this lesson (no AI yet), building intuition about how costmap layers compose and how inflation parameters affect safety vs mobility tradeoffs.

## Core Implementation

```
Front-left:  [+0.145,  +0.20]  # (+depth/2, +width/2)
Front-right: [+0.145,  -0.20]  # (+depth/2, -width/2)
Back-right:  [-0.145, -0.20]  # (-depth/2, -width/2)
Back-left:   [-0.145, +0.20]  # (-depth/2, +width/2)
```

## Key Takeaways

- Mastered core fundamentals of **Costmap Configuration for Humanoid Footprint**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
