---
sidebar_position: 5
---

# Lesson 5: Designing Intent Schemas

## Overview

**Layer 2: AI Collaboration** | **Estimated Time: 120 minutes**

---

By the end of this lesson, you will be able to:

## Core Implementation

```python
from dataclasses import dataclass
from typing import Dict, Any, Optional

@dataclass
class Intent:
    action: str              # What to do: "navigate", "pick", "query"
    target: Optional[str]    # Target: "kitchen", "ball", None
    parameters: Dict[str, Any]  # Additional info: {"color": "red"}
    confidence: float        # How certain: 0.0 to 1.0
    raw_text: str           # Original transcription
    error: Optional[str]     # Error if any: "target_unspecified"
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 5: Designing Intent Schemas**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
