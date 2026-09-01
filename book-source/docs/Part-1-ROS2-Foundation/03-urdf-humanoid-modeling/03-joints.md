---
sidebar_position: 3
title: "Lesson 3: Joints Connecting Links"
description: "Create articulated structures by connecting links with joints. Explore joint types and realistic limits."
---

# Lesson 3: Joints Connecting Links

## Overview

A single link is static. To build a robot that moves, you need to connect links with joints. Joints define how links move relative to each other. They specify which links connect (parent and child), what direction they move, and what movement limits apply.

In this lesson, you'll build your first articulated structure: two links connected by a joint.

A joint connects two links and constrains their relative motion. It answers these questions:
- Which link does this joint attach to? (parent)
- What moves as a result? (child)
- How does it move? (revolute, prismatic, fixed, continuous)
- What are the movement limits? (minimum and maximum)

## Core Implementation

```xml
<joint name="shoulder_joint" type="revolute">
  <parent link="torso"/>
  <child link="upper_arm"/>
  <axis xyz="0 1 0"/>
  <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
  <origin xyz="0 0 0.5" rpy="0 0 0"/>
</joint>
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 3: Joints Connecting Links**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
