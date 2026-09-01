# Lesson 3: Importing URDF Humanoids into Isaac Sim

## Overview

You've built humanoid models in URDF (Part 1) and simulated them in Gazebo (Part 2). Now you'll import those same models into Isaac Sim—but the conversion reveals important differences between Gazebo's ODE physics and Isaac's PhysX 5.

This lesson demonstrates collaboration with AI to troubleshoot import issues, configure joint parameters, and validate physics behavior.

Isaac Sim doesn't directly simulate URDF files. Instead, it **converts** URDF to USD format using the URDF importer extension.

## Core Implementation

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Base link (torso) -->
  <link name="torso">
    <visual>
      <geometry>
        <box size="0.4 0.3 0.6"/>
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.4 0.3 0.6"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="15.0"/>
      <inertia ixx="0.8" ixy="0" ixz="0" iyy="0.8" iyz="0" izz="0.4"/>
    </inertial>
  </link>

  <!-- Left leg (thigh) -->
  <link name="left_thigh">
    <visual>
      <geometry>
        <cylinder length="0.5" radius="0.08"/>
      </geometry>
      <origin xyz="0 0 -0.25" rpy="0 0 0"/>
      <material name="blue">
        <color rgba="0.2 0.2 0.8 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.5" radius="0.08"/>
      </geometry>
      <origin xyz="0 0 -0.25" rpy="0 0 0"/>
    </collision>
    <inertial>
      <mass value="3.0"/>
      <origin xyz="0 0 -0.25" rpy="0 0 0"/>
      <inertia ixx="0.06" ixy="0" ixz="0" iyy="0.06" iyz="0" izz="0.002"/>
    </inertial>
  </link>

  <!-- Hip joint (torso to left thigh) -->
  <joint name="left_hip" type="revolute">
    <parent link="torso"/>
    <child link="left_thigh"/>
    <origin xyz="-0.1 0 -0.3" rpy="0 0 0"/>
    <axis xyz="1 0 0"/>
    <limit effort="150" lower="-1.57" upper="1.57" velocity="10.0"/>
  </joint>

  <!-- Right leg (mirror of left) -->
  <link name="right_thigh">
    <visual>
      <geometry>
        <cylinder length="0.5" radius="0.08"/>
      </geometry>
      <origin xyz="0 0 -0.25" rpy="0 0 0"/>
      <material name="blue">
        <color rgba="0.2 0.2 0.8 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder length="0.5" radius="0.08"/>
      </geometry>
      <origin xyz="0 0 -0.25" rpy="0 0 0"/>
    </collision>
    <inertial>
      <mass value="3.0"/>
      <origin xyz="0 0 -0.25" rpy="0 0 0"/>
      <inertia ixx="0.06" ixy="0" ixz="0" iyy="0.06" iyz="0" izz="0.002"/>
    </inertial>
  </link>

  <joint name="right_hip" type="revolute">
    <parent link="torso"/>
    <child link="right_thigh"/>
    <origin xyz="0.1 0 -0.3" rpy="0 0 0"/>
    <axis xyz="1 0 0"/>
    <limit effort="150" lower="-1.57" upper="1.57" velocity="10.0"/>
  </joint>
</robot>
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 3: Importing URDF Humanoids into Isaac Sim**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
