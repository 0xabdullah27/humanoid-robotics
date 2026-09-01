---
sidebar_position: 4
title: "Lesson 4: Physics Parameter Tuning"
description: "Tune physics parameters (timestep, damping, friction) to achieve stable humanoid simulation with AI collaboration."
---

# Lesson 4: Physics Parameter Tuning

## Overview

By completing this lesson, you will:
- Understand how physics timestep affects simulation accuracy and speed
- Configure damping parameters to control realistic motion
- Tune friction and contact parameters for stable standing
- Work with AI to iteratively refine parameters
- Recognize signs of physics instability and diagnose causes

**Estimated time**: 120 minutes

---

## Core Implementation

```xml
<physics name="default_physics" default="true" type="dart">
  <!-- Simulation advances by this amount each step -->
  <max_step_size>0.001</max_step_size>

  <!-- Run at real-time speed (1.0) or faster (e.g., 10.0 for 10x speed) -->
  <real_time_factor>1.0</real_time_factor>

  <!-- Number of times physics is recalculated per second -->
  <real_time_update_rate>1000</real_time_update_rate>
</physics>
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 4: Physics Parameter Tuning**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
