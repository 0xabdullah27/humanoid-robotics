# Lesson 9: Creating Domain Randomization Skill

## Overview

Lesson 5 taught systematic domain randomization with correlated variables. Lesson 6 scaled randomization via Replicator. Now you'll crystallize those patterns into the **isaac-sim-domain-randomization skill** for reuse across projects.

**From Lesson 5**:
- Correlated randomization (floor ↔ wall materials match environment type)
- Lighting-material correlation (dark floors need brighter lights)
- Randomization frequency tradeoffs (every frame vs every N frames)
- Plausibility constraints (avoid grass floors indoors)

**From Lesson 6**:
- Quality validation (manual spot-checks)
- Diversity metrics (measure material distribution)
- Annotation accuracy correlation (more randomization ≠ better if creates artifacts)

## Core Implementation

```markdown
Think like a domain randomization engineer who balances training data diversity with scene realism. Your goal is to increase model robustness through systematic variation without creating implausible scenes that harm training. You understand that maximum randomization is not optimal—models need diverse but realistic examples.
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 9: Creating Domain Randomization Skill**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
