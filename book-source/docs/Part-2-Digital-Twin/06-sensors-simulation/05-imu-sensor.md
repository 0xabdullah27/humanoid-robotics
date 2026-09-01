---
title: "Lesson 5: IMU Sensor Simulation"
chapter: 6
lesson: 5
proficiency_level: B2
learning_objectives:
  - Configure IMU with accelerometer, gyroscope, and magnetometer
  - Implement realistic noise models (white noise, bias, random walk)
  - Process IMU data for orientation estimation
  - Understand sensor drift and bias compensation
estimated_time: 120 minutes
generated_by: content-implementer v1.0.0
created: 2025-12-16
---

# Lesson 5: IMU Sensor Simulation

## Overview

IMU measures three types of motion:

**Accelerometer**: Linear acceleration (including gravity)
- Message: `sensor_msgs/msg/Imu.linear_acceleration`
- Units: m/s²
- Range: Typically ±16g (±160 m/s²) for humanoids
- Gravity always present: 9.81 m/s² downward (sensor is affected by gravity)

**Gyroscope**: Angular velocity (rotation rate)
- Message: `sensor_msgs/msg/Imu.angular_velocity`
- Units: rad/s
- Range: Typically ±500 rad/s or more
- Measures: Rotation about x, y, z axes

## Core Implementation

```xml
<sensor name="imu_sensor" type="imu">
  <parent link="base_link"/>
  <origin xyz="0 0 0" rpy="0 0 0"/>
  <update_rate>100</update_rate>  <!-- High frequency for balance control -->
  <imu>
    <angular_velocity>
      <x>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>0.001</stddev>  <!-- rad/s noise -->
        </noise>
      </x>
      <!-- y, z similar -->
    </angular_velocity>
    <linear_acceleration>
      <x>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>0.05</stddev>  <!-- m/s² noise -->
        </noise>
      </x>
      <!-- y, z similar -->
    </linear_acceleration>
  </imu>
</sensor>
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 5: IMU Sensor Simulation**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
