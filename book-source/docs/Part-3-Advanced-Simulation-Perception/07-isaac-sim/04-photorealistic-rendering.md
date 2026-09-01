# Lesson 4: Photorealistic Rendering with RTX

## Overview

Your humanoid now stands stable in Isaac Sim. But the default gray materials and basic lighting won't fool perception models. For synthetic training data to transfer to real robots, rendering must be **photorealistic**—accurate materials, realistic lighting, proper shadows.

This lesson teaches RTX (ray tracing) rendering through hands-on scene creation, with AI collaboration to refine material selection and lighting setup.

**The challenge**: Models trained on unrealistic synthetic data fail on real robots.

## Core Implementation

```python
from pxr import Usd, UsdGeom, UsdShade
from omni.isaac.core.utils.prims import create_prim
import omni.isaac.core.utils.numpy.rotations as rot_utils

# Helper to create wall with material
def create_wall(stage, path, size, position, rotation_euler):
    # Create cube
    cube_prim = create_prim(
        path,
        "Cube",
        position=position,
        scale=size
    )

    # Apply rotation
    xform = UsdGeom.Xformable(cube_prim)
    rot_op = xform.AddRotateXYZOp()
    rot_op.Set(rotation_euler)

    # Apply material (painted wall)
    material_path = f"{path}/Material"
    material = UsdShade.Material.Define(stage, material_path)
    shader = UsdShade.Shader.Define(stage, f"{material_path}/Shader")
    shader.CreateIdAttr("UsdPreviewSurface")

    shader.CreateInput("diffuseColor", Sdf.ValueTypeNames.Color3f).Set((0.85, 0.85, 0.8))  # Off-white
    shader.CreateInput("roughness", Sdf.ValueTypeNames.Float).Set(0.6)
    shader.CreateInput("metallic", Sdf.ValueTypeNames.Float).Set(0.0)

    material.CreateSurfaceOutput().ConnectToSource(shader.ConnectableAPI(), "surface")
    UsdShade.MaterialBindingAPI(cube_prim).Bind(material)

# Get stage
from omni.isaac.core import World
world = World()
stage = world.stage

# Create walls (10m x 4m height, 0.2m thick)
create_wall(stage, "/World/wall_north", [5.0, 0.1, 2.0], [0, 5, 2], [0, 0, 0])
create_wall(stage, "/World/wall_south", [5.0, 0.1, 2.0], [0, -5, 2], [0, 0, 0])
create_wall(stage, "/World/wall_east", [0.1, 5.0, 2.0], [5, 0, 2], [0, 0, 0])
create_wall(stage, "/World/wall_west", [0.1, 5.0, 2.0], [-5, 0, 2], [0, 0, 0])

# Create ceiling
create_wall(stage, "/World/ceiling", [5.0, 5.0, 0.1], [0, 0, 4], [0, 0, 0])

print("Room created!")
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 4: Photorealistic Rendering with RTX**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
