---
sidebar_position: 8
title: "Lesson 8: Capstone Project — Complete Humanoid Upper Body"
description: "Build a complete humanoid upper body from specification using accumulated knowledge and reusable patterns."
---

# Lesson 8: Capstone Project — Complete Humanoid Upper Body

## Overview

This is your capstone for Chapter 3. You'll integrate everything you've learned—links, joints, inertia calculations, transform frames, and reusable patterns—to build a complete humanoid upper body.

Unlike previous lessons, you'll start with a **specification first**. The specification defines requirements, constraints, and success criteria. You'll then design and implement the URDF to satisfy the specification.

This is spec-driven development applied to robot modeling.

## Core Implementation

```
HUMANOID UPPER BODY ARCHITECTURE

Kinematic Chain:
- torso (root, world frame)
  ├─ head_joint (fixed)
  │  └─ head_link
  ├─ left_shoulder_pitch_joint (revolute, ±90°)
  │  └─ left_shoulder_link
  │     ├─ left_shoulder_roll_joint (revolute, ±60°)
  │     │  └─ left_upper_arm_link
  │     │     ├─ left_elbow_joint (revolute, 0-150°)
  │     │     │  └─ left_forearm_link
  │     │     │     ├─ left_wrist_joint (revolute, ±90°)
  │     │     │     │  └─ left_hand_link
  ├─ right_shoulder_pitch_joint (revolute, ±90°)
  │  └─ right_shoulder_link
  │     └─ ... (mirror of left)

Total Links: 11
Total Joints: 10 (1 fixed, 8 revolute per side, 1 per shoulder)

Inertia Plan:
- Torso: Box formula 0.3×0.2×0.5, 20kg
- Head: Sphere formula r=0.15m, 2kg
- Each shoulder: Sphere formula r=0.05m, 0.5kg
- Each upper arm: Box formula 0.1×0.1×0.4, 5kg
- Each forearm: Box formula 0.08×0.08×0.3, 2kg
- Each hand: Sphere formula r=0.08m, 1kg
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 8: Capstone Project — Complete Humanoid Upper Body**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
