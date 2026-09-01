# Lesson 5: Domain Randomization Fundamentals

## Overview

Photorealistic rendering (Lesson 4) makes individual scenes look real. But perception models need **diversity**—thousands of varied scenes to learn robust patterns that generalize to unseen environments.

**Domain randomization** systematically varies texture, lighting, and object poses to create this diversity. Done correctly, it produces models that handle real-world variation (different warehouses, times of day, object arrangements).

Done incorrectly, it creates implausible scenes that harm training.

## Core Implementation

```python
import omni.replicator.core as rep

# Define texture variations for floor
floor_materials = [
    "omniverse://localhost/NVIDIA/Materials/vMaterials_2/Ground/Concrete_Aged_01.mdl",
    "omniverse://localhost/NVIDIA/Materials/vMaterials_2/Ground/Concrete_Polished.mdl",
    "omniverse://localhost/NVIDIA/Materials/vMaterials_2/Ground/Epoxy_Gray.mdl"
]

# Randomize floor material
with rep.trigger.on_frame():
    rep.randomizer.materials(
        materials=rep.get.prims(path_pattern="/World/floor"),
        choices=floor_materials
    )

print("Texture randomization configured!")
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 5: Domain Randomization Fundamentals**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
