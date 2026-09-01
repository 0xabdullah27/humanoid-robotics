---
sidebar_position: 2
title: "Lesson 2: Creating and Modifying World Files"
description: "Create custom SDF world files with physics configuration, gravity, and collision geometry."
---

# Lesson 2: Creating and Modifying World Files

## Overview

By completing this lesson, you will:
- Create SDF world files from scratch
- Configure physics engines and understand their tradeoffs
- Set gravity and friction parameters
- Place objects using pose elements
- Understand collision geometry vs visual geometry

**Estimated time**: 120 minutes

---

## Core Implementation

```xml
<?xml version="1.0" ?>
<sdf version="1.10">
  <world name="training_ground">
    <!-- Physics Configuration -->
    <physics name="default_physics" default="true" type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_factor>1.0</real_time_factor>
      <real_time_update_rate>1000</real_time_update_rate>
    </physics>

    <!-- Gravity: Standard Earth gravity pointing downward -->
    <gravity>0 0 -9.81</gravity>

    <!-- Scene Settings: Lighting and Background -->
    <scene>
      <ambient>0.4 0.4 0.4</ambient>
      <background>0.7 0.7 0.7</background>
      <shadows>true</shadows>
    </scene>

    <!-- Sun (Directional Light) -->
    <light type="directional" name="sun">
      <cast_shadows>true</cast_shadows>
      <pose>5 5 5 0 0 0</pose>
      <diffuse>0.8 0.8 0.8 1</diffuse>
      <specular>0.2 0.2 0.2 1</specular>
      <direction>-0.5 0.1 -0.9</direction>
    </light>

    <!-- Ground Plane: Large flat box acting as terrain -->
    <model name="ground_plane">
      <static>true</static>
      <link name="ground_link">
        <collision name="ground_collision">
          <geometry>
            <box>
              <size>100 100 0.1</size>
            </box>
          </geometry>
          <surface>
            <friction>
              <ode>
                <mu>0.8</mu>
                <mu2>0.8</mu2>
              </ode>
            </friction>
          </surface>
        </collision>
        <visual name="ground_visual">
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

- Mastered core fundamentals of **Lesson 2: Creating and Modifying World Files**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
