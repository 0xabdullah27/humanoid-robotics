---
title: "Lesson 2: URDF Import and Basic Visualization"
chapter: 5
lesson: 2
proficiency_level: B2
learning_objectives:
  - "Import URDF model into Unity using URDF Importer"
  - "Understand model hierarchy and parent-child relationships"
  - "Apply materials and basic shaders to imported meshes"
  - "Position camera for effective model viewing"
  - "Verify model structure matches URDF definition"
estimated_time: "90 minutes"
generated_by: content-implementer v1.0.0
created: 2025-12-16
version: 1.0.0
---

# Lesson 2: URDF Import and Basic Visualization

## Overview

From Chapter 4, you have a URDF definition of a humanoid robot. This XML file precisely describes the robot's structure: links (solid parts), joints (connections), and geometry (meshes).

Now you'll translate that abstract description into visual objects in Unity. This lesson teaches you to import URDF files and understand the model hierarchy that emerges.

Think of URDF as a blueprint, and this lesson converts that blueprint into a 3D object you can see, manipulate, and eventually animate.

## Core Implementation

```
URDF File (XML)
    ├── Links (rigid bodies)
    │   ├── base_link
    │   ├── torso
    │   ├── upper_arm_left
    │   ├── forearm_left
    │   ├── hand_left
    │   └── ... (continues for right side and legs)
    ├── Joints (connections between links)
    │   ├── torso_joint
    │   ├── shoulder_left_joint
    │   ├── elbow_left_joint
    │   └── ... (each joint specifies parent and child links)
    └── Collisions and Visuals (mesh files referenced)

        ↓ URDF Importer ↓

Unity Prefab (Hierarchy)
    ├── Humanoid (root GameObject)
    │   ├── BaseLink (parent)
    │   │   ├── Torso (child, connected by joint)
    │   │   │   ├── UpperArmLeft (child)
    │   │   │   │   ├── ForearmLeft (child)
    │   │   │   │   │   └── HandLeft (child)
    │   │   │   │       [mirror structure for right side]
    │   │   │   └── LeftThigh (child)
    │   │   │       └── LeftCalf (child)
    │   │   │           └── LeftFoot (child)
    │   │   │       [mirror structure for right side]
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 2: URDF Import and Basic Visualization**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
