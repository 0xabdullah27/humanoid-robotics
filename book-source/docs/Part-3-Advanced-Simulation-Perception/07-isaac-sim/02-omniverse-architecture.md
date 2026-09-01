# Lesson 2: Isaac Sim Architecture and USD Format

## Overview

You've installed Isaac Sim and verified GPU acceleration. Now you'll understand **why** Isaac Sim is architecturally different from Gazebo—and when to choose each tool.

This lesson uses **Socratic dialogue** to force critical thinking about tool selection. You'll explore Isaac's modular architecture, understand USD (Universal Scene Description), and analyze tradeoffs between Isaac Sim and Gazebo for specific use cases.

Isaac Sim is built on three pillars:

## Core Implementation

```bash
# Find USD file path (usually in Nucleus local cache)
find ~/.local/share/ov/pkg/isaac_sim-2023.1.1/NVIDIA/Assets/Isaac -name "*.usd" | head -1

# Open any .usd file in text editor
code /path/to/humanoid.usd  # or nano, vim, etc.
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 2: Isaac Sim Architecture and USD Format**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
