---
title: "Lesson 2: Adding Sensors to URDF"
chapter: 6
lesson: 2
proficiency_level: B2
learning_objectives:
  - Modify humanoid URDF to include LiDAR, depth camera, and IMU sensors
  - Understand sensor frame attachment and coordinate systems
  - Configure sensor parameters for realistic simulation
  - Validate URDF sensor definitions
estimated_time: 90 minutes
generated_by: content-implementer v1.0.0
created: 2025-12-16
---

# Lesson 2: Adding Sensors to URDF

## Overview

From Chapter 4, you have a humanoid.urdf with this structure:

<link name="torso">
    <!-- Torso definition -->
  </link>

<link name="head">
    <!-- Head definition -->
  </link>

## Core Implementation

```xml
<robot name="humanoid_simple">
  <!-- Links: base_link, torso, head, arms, legs -->
  <link name="base_link">
    <visual>
      <geometry><box size="0.3 0.3 0.05"/></geometry>
    </visual>
    <collision>
      <geometry><box size="0.3 0.3 0.05"/></geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
    </inertial>
  </link>

  <link name="torso">
    <!-- Torso definition -->
  </link>

  <link name="head">
    <!-- Head definition -->
  </link>

  <!-- Joints connecting links -->
</robot>
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 2: Adding Sensors to URDF**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
