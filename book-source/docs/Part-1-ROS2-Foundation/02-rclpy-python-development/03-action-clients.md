---
sidebar_position: 3
title: "Lesson 3: Action Clients for Long-Running Tasks"
description: "Master ROS 2 actions for long-running tasks with feedback, moving beyond services to handle complex goal-driven workflows."
---

# Lesson 3: Action Clients for Long-Running Tasks

## Overview

Imagine commanding a robot arm to move to a position. The movement takes 10 seconds. A ROS 2 **service** would block for 10 seconds waiting for a response—the entire node freezes. A ROS 2 **action** handles this differently: the client sends a goal, receives periodic feedback (progress updates), and eventually gets a result when complete. No blocking.

**Services** work for fast request-response:

**Actions** work for long-running tasks with feedback:

## Core Implementation

```python
# Fast operation (< 1 second)
result = service_client.call(request)
# Waits for result, then continues
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 3: Action Clients for Long-Running Tasks**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
