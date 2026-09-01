---
sidebar_position: 7
---

# Lesson 7: ROS 2 Integration

## Overview

**Layer 2: AI Collaboration** | **Estimated Time: 120 minutes**

---

By the end of this lesson, you will be able to:

## Core Implementation

```
# Voice Intent Message
# Represents a parsed voice command for robot execution

string action           # navigate, pick, place, query, control
string target           # kitchen, ball, location, stop
string[] parameter_keys # color, size, location
string[] parameter_values
float32 confidence      # 0.0 to 1.0
string raw_text         # Original transcription
builtin_interfaces/Time timestamp
string error            # Error message if any
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 7: ROS 2 Integration**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
