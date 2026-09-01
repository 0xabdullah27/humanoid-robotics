---
sidebar_position: 2
title: "Lesson 2: Topics and Pub/Sub Communication"
description: "Connect nodes together using publisher-subscriber pattern through topics"
---

# Lesson 2: Topics and Pub/Sub Communication

## Overview

**Learning Outcome:** Implement a publisher node that sends data and a subscriber node that receives it.

**Proficiency Level:** B1

**Estimated Time:** 50 minutes

## Core Implementation

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String
import time


class TemperaturePublisher(Node):
    def __init__(self):
        super().__init__('temperature_publisher')
        self.publisher_ = self.create_publisher(String, 'temperature', 10)
        self.get_logger().info('Publisher created on topic "temperature"')
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.temperature = 20.0

    def timer_callback(self):
        msg = String()
        msg.data = f'temperature: {self.temperature:.1f}°C'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: {msg.data}')
        self.temperature += 0.5  # Simulate warming


def main(args=None):
    rclpy.init(args=args)
    node = TemperaturePublisher()
    rclpy.spin(node)
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 2: Topics and Pub/Sub Communication**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
