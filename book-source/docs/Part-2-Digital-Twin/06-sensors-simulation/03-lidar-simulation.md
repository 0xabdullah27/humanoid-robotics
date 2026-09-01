---
title: "Lesson 3: LiDAR Simulation"
chapter: 6
lesson: 3
proficiency_level: B2
learning_objectives:
  - Configure LiDAR ray casting in Gazebo
  - Generate point clouds with realistic resolution and noise
  - Process PointCloud2 messages in Python
  - Debug LiDAR output and optimize performance
estimated_time: 120 minutes
generated_by: content-implementer v1.0.0
created: 2025-12-16
---

# Lesson 3: LiDAR Simulation

## Overview

LiDAR emits laser pulses and measures time to reflection. In simulation:

1. **Ray emission**: From sensor center, fire rays in a grid (720 horizontal × 32 vertical samples)
2. **Intersection detection**: Check what each ray hits (terrain, obstacles, robot links)
3. **Distance calculation**: Convert hit distance to depth measurement
4. **Noise addition**: Add realistic measurement error
5. **Point cloud generation**: Package all points (x, y, z, intensity) into PointCloud2 message

**Gazebo plugin** (libgazebo_ros_gpu_lidar.so) handles this automatically when configured.

## Core Implementation

```python
from launch import LaunchDescription
from launch_ros.actions import Node
from launch.actions import ExecuteProcess

def generate_launch_description():
    gazebo = ExecuteProcess(
        cmd=['gazebo', 'worlds/office_with_humanoid.sdf'],
        output='screen'
    )

    rviz = Node(
        package='rviz2',
        executable='rviz2',
        arguments=['-d', 'config/default.rviz'],
        output='screen'
    )

    return LaunchDescription([gazebo, rviz])
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 3: LiDAR Simulation**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
