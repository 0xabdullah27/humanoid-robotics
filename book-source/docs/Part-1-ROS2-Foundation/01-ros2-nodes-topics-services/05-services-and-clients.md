---
sidebar_position: 5
title: "Lesson 5: Quality of Service (QoS)"
description: "Configure QoS policies to manage reliability and performance tradeoffs"
---

# Lesson 5: Quality of Service (QoS)

## Overview

**Learning Outcome:** Configure Quality of Service policies and observe how reliability affects message delivery.

**Proficiency Level:** B1

**Estimated Time:** 40 minutes

## Core Implementation

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import Int32
import time


class FastPublisher(Node):
    def __init__(self):
        super().__init__('fast_publisher')
        self.publisher_ = self.create_publisher(Int32, 'fast_topic', 10)
        self.get_logger().info('Fast publisher started (100 msg/sec)')
        self.counter = 0
        self.timer = self.create_timer(0.01, self.timer_callback)  # 100 Hz

    def timer_callback(self):
        msg = Int32()
        msg.data = self.counter
        self.publisher_.publish(msg)
        self.counter += 1


def main(args=None):
    rclpy.init(args=args)
    node = FastPublisher()
    rclpy.spin(node)
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 5: Quality of Service (QoS)**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
