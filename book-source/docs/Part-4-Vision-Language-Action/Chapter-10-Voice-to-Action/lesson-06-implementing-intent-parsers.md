---
sidebar_position: 6
---

# Lesson 6: Implementing Intent Parsers

## Overview

**Layer 2: AI Collaboration** | **Estimated Time: 120 minutes**

---

By the end of this lesson, you will be able to:

## Core Implementation

```python
import re
from lesson_05_intent_schema import Intent, IntentSchema

class RuleBasedParser:
    """Parse intents using regex patterns."""

    PATTERNS = {
        "navigate": [
            r"(?:go|navigate|move|head|walk)\s+to\s+(?:the\s+)?(.+)",
            r"take\s+me\s+to\s+(?:the\s+)?(.+)",
        ],
        "pick": [
            r"(?:pick\s+up|grab|get|fetch)\s+(?:the\s+)?(.+)",
            r"bring\s+me\s+(?:the\s+)?(.+)",
        ],
        "place": [
            r"(?:put|place|set)\s+(?:the\s+)?(.+?)\s+(?:on|in|at)\s+(?:the\s+)?(.+)",
        ],
        "query": [
            r"where\s+(?:are\s+you|am\s+i)",
            r"what\s+(?:do\s+you\s+see|is\s+(?:in\s+front|around))",
        ],
        "control": [
            r"^(stop|pause|resume|cancel)$",
            r"emergency\s+(stop)",
        ],
    }

    def parse(self, text: str) -> Intent:
        """Parse text into intent."""
        text_lower = text.lower().strip()

        for action, patterns in self.PATTERNS.items():
            for pattern in patterns:
                match = re.match(pattern, text_lower)
                if match:
                    # Extract target from capture group
                    groups = match.groups()
                    target = groups[0] if groups else None

                    # Extract additional entities
                    entities = IntentSchema.extract_entities(text)

                    return Intent(
                        action=action,
                        target=self._clean_target(target, action),
                        parameters=entities,
                        confidence=0.9,
                        raw_text=text
                    )

        # No pattern matched
        return Intent(
            action="unknown",
            confidence=0.2,
            raw_text=text,
            error="no_pattern_match"
        )

    def _clean_target(self, target: str, action: str) -> str:
        """Clean extracted target."""
        if not target:
            return None

        # Remove articles and clean up
        target = re.sub(r"^(the|a|an)\s+", "", target.strip())

        # For pick actions, extract object name
        if action == "pick":
            # Remove color/size modifiers to get object
            for word in IntentSchema.COLORS + IntentSchema.SIZES:
                target = target.replace(word, "").strip()

        return target if target else None
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 6: Implementing Intent Parsers**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
