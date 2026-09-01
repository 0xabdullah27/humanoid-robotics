---
title: "Lesson 3: Environment Design and Lighting"
chapter: 5
lesson: 3
proficiency_level: B2
learning_objectives:
  - "Design photorealistic indoor environments"
  - "Implement three-point lighting for professional appearance"
  - "Apply materials and textures effectively"
  - "Optimize performance for real-time rendering"
  - "Collaborate with AI on design decisions"
estimated_time: "120 minutes"
generated_by: content-implementer v1.0.0
created: 2025-12-16
version: 1.0.0
---

# Lesson 3: Environment Design and Lighting

## Overview

The humanoid model is visible but isolated in empty space. Now create the world around it: a photorealistic indoor environment where human-robot interaction happens.

This lesson demonstrates how AI helps optimize design decisions. You'll propose an environment, AI suggests lighting and material approaches, you provide constraints (performance targets), and together you arrive at a professional-looking scene that renders smoothly.

Think of this as collaborative design—neither you nor AI has the complete solution alone, but through iteration, a polished environment emerges.

## Core Implementation

```csharp
// Pseudo-code structure for three-point lighting
KeyLight = new DirectionalLight()
{
    Intensity = 1.0f,
    Color = Color.yellow,  // warm
    Rotation = Euler(45, 45, 0)
};

FillLight = new DirectionalLight()
{
    Intensity = 0.6f,
    Color = Color.cyan,  // cool
    Rotation = Euler(45, -135, 0)
};

BackLight = new DirectionalLight()
{
    Intensity = 0.3f,
    Color = Color.white,
    Rotation = Euler(135, 0, 0)
};
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 3: Environment Design and Lighting**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
