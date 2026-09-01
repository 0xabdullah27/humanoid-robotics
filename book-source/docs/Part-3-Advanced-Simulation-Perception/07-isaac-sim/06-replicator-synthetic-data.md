# Lesson 6: Generating Synthetic Data with Replicator

## Overview

Domain randomization (Lesson 5) creates scene diversity. Now you'll **scale** that diversity using Isaac Sim's Replicator API—generating thousands of annotated images automatically.

Replicator is Isaac Sim's synthetic data generation framework. It coordinates randomization, camera rendering, and annotation export in a single pipeline.

**Replicator workflow** (graph-based):
```
Randomizers → Scene → Cameras → Renderers → Writers → Annotations
     ↓          ↓         ↓           ↓           ↓          ↓
   Vary     Apply to   Capture    Generate     Export    Ground truth
   scene     objects   frames      images      formats    labels
```

## Core Implementation

```
Randomizers → Scene → Cameras → Renderers → Writers → Annotations
     ↓          ↓         ↓           ↓           ↓          ↓
   Vary     Apply to   Capture    Generate     Export    Ground truth
   scene     objects   frames      images      formats    labels
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 6: Generating Synthetic Data with Replicator**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
