---
sidebar_position: 3
title: "Lesson 3: Spawning and Controlling Models"
description: "Spawn URDF models into running Gazebo simulations using spawn_entity service with AI collaboration."
---

# Lesson 3: Spawning and Controlling Models

## Overview

By completing this lesson, you will:
- Use ROS 2 spawn_entity service to dynamically add models to simulation
- Specify initial poses for spawned models
- Manage namespaces to avoid naming conflicts
- Debug common spawning failures
- Work with AI to troubleshoot simulation issues

**Estimated time**: 120 minutes

---

## Core Implementation

```xml
<?xml version="1.0" ?>
<sdf version="1.10">
  <world name="spawn_test">
    <physics name="default_physics" default="true" type="dart">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1.0</real_time_factor>
    </physics>

    <gravity>0 0 -9.81</gravity>

    <scene>
      <ambient>0.4 0.4 0.4</ambient>
      <background>0.7 0.7 0.7</background>
    </scene>

    <light type="directional" name="sun">
      <pose>5 5 5 0 0 0</pose>
      <direction>-0.5 0.1 -0.9</direction>
    </light>

    <model name="ground">
      <static>true</static>
      <link name="link">
        <collision name="collision">
          <geometry>
            <box>
              <size>100 100 0.1</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>100 100 0.1</size>
            </box>
          </geometry>
          <material>
            <ambient>0.5 0.5 0.5 1</ambient>
          </material>
        </visual>
      </link>
    </model>
  </world>
</sdf>
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 3: Spawning and Controlling Models**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
