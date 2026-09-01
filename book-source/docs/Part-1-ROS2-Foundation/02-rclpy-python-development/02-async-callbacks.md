---
sidebar_position: 2
title: "Lesson 2: Async/Await and Callbacks"
description: "Master non-blocking callbacks using async/await to handle concurrent events in your ROS 2 nodes."
---

# Lesson 2: Async/Await and Callbacks

## Overview

Imagine a robot with a 100 Hz timer (fires 100 times per second) that also subscribes to sensor data. If the sensor callback takes 1 second to process, the timer can't fire—the robot becomes unresponsive. This lesson teaches you to handle multiple events concurrently using Python's async/await pattern.

**Blocking execution** happens when one operation stops everything else:

**Non-blocking execution** allows operations to yield control:

## Core Implementation

```python
def sensor_callback(msg):
    time.sleep(1)  # Blocks for 1 second
    print("Processing done")

# Timer: 100 Hz (should fire 100 times/sec)
# With blocking: Only ~1 callback per second (blocked by sleep)
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 2: Async/Await and Callbacks**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
