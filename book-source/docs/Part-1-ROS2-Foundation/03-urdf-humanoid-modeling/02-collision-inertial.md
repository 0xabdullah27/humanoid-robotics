---
sidebar_position: 2
title: "Lesson 2: Collision Geometry and Link Properties"
description: "Add collision shapes and inertial properties to create physically realistic links."
---

# Lesson 2: Collision Geometry and Link Properties

## Overview

In Lesson 1, you created a link with visual geometry—how it *looks* in RViz. But simulation needs more information. When robots interact with their environment, they need collision geometry for detecting collisions. When they move, they need inertial properties (mass, center of mass, rotational inertia) for physics calculations.

This lesson teaches you to add these properties to make your links physically realistic.

Every link can have three different geometries:

## Core Implementation

```xml
<?xml version="1.0"?>
<robot name="complete_link_robot">

  <link name="arm_segment">
    <!-- Visual: How it looks -->
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="1.0 0.1 0.1"/>
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1"/>
      </material>
    </visual>

    <!-- Collision: For collision detection -->
    <collision>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.9 0.08 0.08"/>
      </geometry>
    </collision>

    <!-- Inertial: Mass and inertia for physics -->
    <inertial>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <mass value="2.0"/>
      <inertia ixx="0.05" ixy="0" ixz="0" iyy="0.05" iyz="0" izz="0.01"/>
    </inertial>
  </link>

</robot>
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 2: Collision Geometry and Link Properties**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
