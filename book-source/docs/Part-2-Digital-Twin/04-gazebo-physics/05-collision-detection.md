---
sidebar_position: 5
title: "Lesson 5: Collision Detection and Contact Sensing"
description: "Implement contact sensors on humanoid feet for real-time collision feedback with AI collaboration."
---

# Lesson 5: Collision Detection and Contact Sensing

## Overview

By completing this lesson, you will:
- Add contact sensors to humanoid URDF
- Configure Gazebo's contact plugin
- Process ROS 2 ContactsState messages
- Implement contact detection logic for balance control
- Debug sensor issues with AI assistance

**Estimated time**: 120 minutes

---

## Core Implementation

```xml
<!-- Add this inside the humanoid's left foot link -->
<link name="left_foot">
  <!-- Existing inertial, collision, visual elements -->

  <!-- Contact sensor: Detects collisions at this link -->
  <sensor name="left_foot_contact" type="contact">
    <always_on>true</always_on>
    <update_rate>50</update_rate>
    <contact>
      <!-- Which link the sensor monitors for contacts -->
      <collision>left_foot_collision</collision>
    </contact>
  </sensor>
</link>

<!-- Identical for right foot -->
<link name="right_foot">
  <!-- Existing elements -->

  <sensor name="right_foot_contact" type="contact">
    <always_on>true</always_on>
    <update_rate>50</update_rate>
    <contact>
      <collision>right_foot_collision</collision>
    </contact>
  </sensor>
</link>
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 5: Collision Detection and Contact Sensing**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
