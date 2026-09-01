---
sidebar_position: 3
---

# Lesson 3: Real-Time Audio Capture

## Overview

**Layer 2: AI Collaboration** | **Estimated Time: 120 minutes**

---

By the end of this lesson, you will be able to:

## Core Implementation

```python
import sounddevice as sd

# List all audio devices
print(sd.query_devices())

# Get default input device
default_input = sd.default.device[0]
print(f"Default input: {sd.query_devices(default_input)}")
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 3: Real-Time Audio Capture**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
