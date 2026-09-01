---
sidebar_position: 1
title: "Lesson 1: URDF Fundamentals and Single Link"
description: "Master URDF XML syntax and create your first rigid body with visual geometry."
---

# Lesson 1: URDF Fundamentals and Single Link

## Overview

The Unified Robot Description Format (URDF) is how we describe robots to ROS2. It's an XML-based format that defines the physical structure of a robot—the rigid bodies (links) and how they connect (joints). Before building articulated systems, you need to understand how to define a single link with visual properties.

In this lesson, you'll write your first URDF file from scratch, verify it with ROS2 tools, and visualize it in RViz.

URDF stands for Unified Robot Description Format. It's a standard XML format used by ROS to describe:
- **Links**: Rigid bodies that represent physical segments (links, cylinders, boxes)
- **Joints**: Connections between links with movement constraints
- **Geometry**: Visual representation and collision shapes
- **Properties**: Mass, inertia tensors, and frame transformations

## Core Implementation

```xml
<?xml version="1.0"?>
<robot name="robot_name">
  <!-- Links and joints go here -->
</robot>
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 1: URDF Fundamentals and Single Link**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
