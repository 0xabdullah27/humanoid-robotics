---
sidebar_position: 6
title: "Lesson 6: Joint Control and Humanoid Movement"
description: "Create reusable skill for commanding humanoid joints via trajectory controllers."
---

# Lesson 6: Joint Control and Humanoid Movement

## Overview

By completing this lesson, you will:
- Understand ROS 2 trajectory controller interfaces
- Control humanoid joints via joint trajectory commands
- Create reusable patterns in a skill
- Apply Persona + Questions + Principles to skill design
- Build a gazebo-humanoid-control-skill for future use

**Estimated time**: 90 minutes

---

## Core Implementation

```python
from trajectory_msgs.msg import JointTrajectory, JointTrajectoryPoint

# Create trajectory with multiple waypoints
trajectory = JointTrajectory()
trajectory.joint_names = ['hip_joint_l', 'knee_joint_l', 'ankle_joint_l']

# Waypoint 1: Standing position
point1 = JointTrajectoryPoint()
point1.positions = [0.0, 0.0, 0.0]
point1.velocities = [0.0, 0.0, 0.0]
point1.time_from_start.sec = 1

# Waypoint 2: Knee bent
point2 = JointTrajectoryPoint()
point2.positions = [0.0, -0.3, 0.1]
point2.velocities = [0.0, 0.0, 0.0]
point2.time_from_start.sec = 2

trajectory.points = [point1, point2]
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 6: Joint Control and Humanoid Movement**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
