---
sidebar_position: 1
title: "Lesson 1: Introduction to ROS 2 Nodes"
description: "Create and run your first ROS 2 node that prints messages independently"
---

# Lesson 1: Introduction to ROS 2 Nodes

## Overview

**Learning Outcome:** Create and run a ROS 2 node that performs computation and prints messages at regular intervals.

**Proficiency Level:** B1 (Intermediate Foundation)

**Estimated Time:** 45 minutes

## Core Implementation

```python
import rclpy
from rclpy.node import Node


class MinimalNode(Node):
    def __init__(self):
        super().__init__('minimal_node')
        self.get_logger().info('Node started')
        self.timer = self.create_timer(1.0, self.timer_callback)

    def timer_callback(self):
        self.get_logger().info('Hello Robot')


def main(args=None):
    rclpy.init(args=args)
    node = MinimalNode()
    rclpy.spin(node)
    rclpy.shutdown()


if __name__ == '__main__':
    main()
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 1: Introduction to ROS 2 Nodes**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
