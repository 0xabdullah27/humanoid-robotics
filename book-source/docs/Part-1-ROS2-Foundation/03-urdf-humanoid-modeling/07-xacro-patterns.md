---
sidebar_position: 7
title: "Lesson 7: Reusable URDF Macros and Patterns"
description: "Extract common patterns into reusable xacro macros to reduce URDF complexity and improve maintainability."
---

# Lesson 7: Reusable URDF Macros and Patterns

## Overview

The arm you built in Lesson 6 is functional, but it has repetition: similar joint structures (shoulder, elbow, wrist), similar link definitions (boxes with inertia calculations). In a humanoid robot with two arms, you'd duplicate all this code.

Xacro (XML Macros) solves this by letting you parameterize URDF, creating reusable templates. This is your first step toward designing reusable robot descriptions that you can apply across projects.

Xacro is a preprocessor that expands macros into URDF. It lets you:
- **Define parameters**: Variables that replace repeated values
- **Create macros**: Templates for common structures
- **Use conditionals**: Build different models from one file
- **Include files**: Organize large models into modules

## Core Implementation

```
my_robot.xacro (with macros)
    ↓ (xacro processes it)
    ↓ (substitutes parameters, expands macros)
    ↓
my_robot.urdf (standard URDF)
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 7: Reusable URDF Macros and Patterns**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
