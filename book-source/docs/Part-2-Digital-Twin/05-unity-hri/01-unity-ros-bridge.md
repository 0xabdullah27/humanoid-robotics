---
title: "Lesson 1: Unity-ROS 2 Bridge Setup"
chapter: 5
lesson: 1
proficiency_level: B2
learning_objectives:
  - "Install and configure ROS-TCP-Connector in Unity 2022.3 LTS"
  - "Establish bidirectional communication between Unity and ROS 2"
  - "Understand message serialization and bridge architecture"
  - "Validate communication with monitoring tools"
estimated_time: "90 minutes"
generated_by: content-implementer v1.0.0
created: 2025-12-16
version: 1.0.0
---

# Lesson 1: Unity-ROS 2 Bridge Setup

## Overview

Before visualizing robots, you must establish communication between Unity (your visualization client) and ROS 2 (your robotics control system). This lesson creates the foundation: a reliable bridge that passes data between worlds.

Think of this bridge as a postal service between two systems. Messages travel in both directions. The ROS 2 side publishes sensor data and commands. Unity subscribes to these messages and responds with visualization updates. When humans interact with the Unity scene, those events publish back to ROS 2.

Setting this up correctly now prevents frustrating debugging later.

## Core Implementation

```
┌─────────────────────────────────────────┐
│         ROS 2 System (Linux)            │
│  ┌─────────────────────────────────┐    │
│  │   ROS Master (roscore equivalent)    │
│  │   IP: 192.168.1.100, Port: 9090    │
│  └─────────────────────────────────┘    │
│                  ↕                       │
│   Publishers (publish data)              │
│   Subscribers (receive commands)         │
└─────────────────────────────────────────┘
          ↓ TCP Connection ↓
    ROS-TCP-Connector Bridge
    (Translates between protocols)
          ↓ TCP Connection ↓
┌─────────────────────────────────────────┐
│    Unity Client (Windows/Mac/Linux)     │
│  ┌─────────────────────────────────┐    │
│  │   ROS-TCP-Connector Package     │    │
│  │   IP: 192.168.1.50, Port: 5005  │    │
│  └─────────────────────────────────┘    │
│                                         │
│   Receives messages from ROS 2          │
│   Sends interaction events to ROS 2     │
└─────────────────────────────────────────┘
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 1: Unity-ROS 2 Bridge Setup**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
