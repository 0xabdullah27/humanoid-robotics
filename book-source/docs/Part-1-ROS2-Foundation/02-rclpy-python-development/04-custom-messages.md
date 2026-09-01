---
sidebar_position: 4
title: "Lesson 4: Custom Message Types"
description: "Define custom message types for structured communication between ROS 2 nodes."
---

# Lesson 4: Custom Message Types

## Overview

Standard ROS 2 messages like `String`, `Int32`, and `Float64` work for simple data. But what if you need to send a robot's status with multiple fields: battery percentage, temperature, and position coordinates? You could send them as separate messages, but that's awkward. Custom messages let you define structured data that matches your domain.

**Standard message** (only one value):
```python
from std_msgs.msg import String
msg = String()
msg.data = "battery: 85%"
publisher.publish(msg)
```

**Custom message** (multiple related fields):
```python
from my_package.msg import RobotStatus
msg = RobotStatus()
msg.battery_percent = 85
msg.temperature_celsius = 45.2
msg.arm_position_x = 1.0
msg.arm_position_y = 2.0
publisher.publish(msg)
```

## Core Implementation

```python
from std_msgs.msg import String
msg = String()
msg.data = "battery: 85%"
publisher.publish(msg)
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 4: Custom Message Types**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
