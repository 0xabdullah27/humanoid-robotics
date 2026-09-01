---
sidebar_position: 5
title: "Lesson 5: Transform Frames and Kinematic Structure"
description: "Understand how links and joints define coordinate frame relationships and robot kinematics."
---

# Lesson 5: Transform Frames and Kinematic Structure

## Overview

A robot is more than individual links. The links must be positioned correctly relative to each other. This positioning is defined by transform frames—coordinate systems attached to each link that define where the next link connects.

In this lesson, you'll learn how the URDF structure creates a kinematic chain: a sequence of coordinate frames that position every part of the robot in space.

A transform frame (or "frame") is a coordinate system attached to a link. It answers: "Where is this link in space relative to other links?"

## Core Implementation

```
world → torso → upper_arm → forearm → hand
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 5: Transform Frames and Kinematic Structure**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
