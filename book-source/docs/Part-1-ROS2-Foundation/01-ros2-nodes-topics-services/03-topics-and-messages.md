---
sidebar_position: 3
title: "Lesson 3: Debugging with ROS 2 CLI Tools"
description: "Learn to inspect running ROS 2 systems using command-line tools"
---

# Lesson 3: Debugging with ROS 2 CLI Tools

## Overview

**Learning Outcome:** Use ROS 2 command-line tools to inspect and debug running nodes and topics.

**Proficiency Level:** B1

**Estimated Time:** 45 minutes

## Core Implementation

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String


class BrokenPublisher(Node):
    def __init__(self):
        super().__init__('broken_publisher')
        # BUG: Publishing to wrong topic name
        self.publisher_ = self.create_publisher(String, 'temperature_wrong', 10)
        self.get_logger().info('Publisher created (on wrong topic!)')
        self.timer = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        msg = String()
        msg.data = 'temperature: 25.0°C'
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing temperature')


def main(args=None):
    rclpy.init(args=args)
    node = BrokenPublisher()
    rclpy.spin(node)
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 3: Debugging with ROS 2 CLI Tools**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
