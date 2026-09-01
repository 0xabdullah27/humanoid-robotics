---
sidebar_position: 7
title: "Lesson 7: Capstone Project - Multi-Node Robot System"
description: "Implement a complete robot monitoring system from specification"
---

# Lesson 7: Capstone Project - Multi-Node Robot System

## Overview

**Learning Outcome:** Design and implement a distributed multi-node robot system from specification, integrating all concepts from Lessons 1-6.

**Proficiency Level:** B1

**Estimated Time:** 90 minutes

## Core Implementation

```
ROBOT STATUS MONITOR SYSTEM

Intent:
Build a distributed monitoring system that tracks robot health metrics
and alerts when thresholds are exceeded.

Components:
1. Battery Publisher — Simulates battery draining 100% → 0%
2. Temperature Sensor — Simulates motor heating 20°C → 80°C
3. Status Monitor — Aggregates data and triggers alerts

Communication:
- Battery data: Topic /robot/battery (String, 1 message per 0.5 seconds)
- Temperature data: Topic /robot/temperature (String, 1 message per 1 second)
- Status queries: Service /robot/status (synchronous)

Thresholds:
- Battery warning: <20% (log "ALERT: Battery critical")
- Temperature warning: >60°C (log "ALERT: Motor overheating")

Quality of Service:
- All topics use RELIABLE QoS (no message drops)
- All components use same QoS policy

Success Criteria:
[ ] Battery publisher starts and publishes correct messages
[ ] Temperature publisher starts and publishes correct messages
[ ] Monitor node subscribed to both topics
[ ] Monitor receives all messages without drops
[ ] Monitor logs alerts when thresholds exceeded
[ ] Service responds to status queries
[ ] System runs without crashes for 60+ seconds
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 7: Capstone Project - Multi-Node Robot System**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
