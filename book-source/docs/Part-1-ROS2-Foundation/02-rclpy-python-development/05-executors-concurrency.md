---
sidebar_position: 5
title: "Lesson 5: Executors and Concurrency"
description: "Choose between single-threaded and multi-threaded executors based on your node's callback performance requirements."
---

# Lesson 5: Executors and Concurrency

## Overview

You have a ROS 2 node with multiple callbacks: a fast sensor reader (50 Hz), a slow decision-maker (takes 0.5 seconds), and a motor controller (100 Hz). If any of these blocks the others, your robot becomes unresponsive. The solution is understanding ROS 2 **executors**—components that decide how callbacks run relative to each other.

**SingleThreadedExecutor** (default):
```python
executor = SingleThreadedExecutor()
executor.add_node(node)
executor.spin()
```

Processes callbacks one at a time:
```
Time  0ms: Sensor callback runs
Time  10ms: (waiting for sensor callback to finish)
Time  50ms: Sensor callback finishes
Time  50ms: Decision callback starts
Time 550ms: Decision callback finishes
Time 550ms: Motor callback runs
```

## Core Implementation

```python
executor = SingleThreadedExecutor()
executor.add_node(node)
executor.spin()
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 5: Executors and Concurrency**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
