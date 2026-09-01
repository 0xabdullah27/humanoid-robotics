---
sidebar_position: 6
title: "Lesson 6: Building Articulated Arm"
description: "Integrate all URDF concepts to create a complete articulated arm with multiple joints and realistic inertia."
---

# Lesson 6: Building Articulated Arm

## Overview

Now you'll bring together everything you've learned: links, joints, geometric properties, and inertia calculations. You'll build a complete articulated arm with a shoulder (2 DOF), elbow (1 DOF), and wrist (1 DOF)—four joints total moving a four-segment arm.

This is the capstone of manual URDF construction before we introduce reusable patterns in Lesson 7.

Here's the structure you'll build:

## Core Implementation

```
torso (root)
  ↓ shoulder_pitch (rotates up/down)
shoulder_link
  ↓ shoulder_roll (rotates forward/back)
upper_arm_link
  ↓ elbow_joint (bends at elbow)
forearm_link
  ↓ wrist_joint (twists at wrist)
hand_link
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 6: Building Articulated Arm**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
