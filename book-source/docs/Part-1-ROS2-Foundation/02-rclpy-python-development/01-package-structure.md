---
sidebar_position: 1
title: "Lesson 1: ROS 2 Python Package Structure"
description: "Learn to create and structure ROS 2 Python packages manually, understanding the purpose of each component."
---

# Lesson 1: ROS 2 Python Package Structure

## Overview

When you look at a professional ROS 2 Python project, you'll notice a specific organization: directories, configuration files, and entry points. This lesson teaches you to build that structure by hand—understanding each piece as you create it.

A **package** is the fundamental unit of code organization in ROS 2. It's not just a Python module. It's a container that tells ROS 2 how to find, build, and execute your code.

Think of it this way: If Python modules are individual books, a ROS 2 package is an organized library with a catalog (metadata), shelving (directory structure), and a checkout system (entry points that tell ROS what programs to run).

## Core Implementation

```
my_package/
├── my_package/
│   ├── __init__.py
│   └── my_node.py
├── package.xml
├── setup.py
└── setup.cfg
```

## Key Takeaways

- Mastered core fundamentals of **Lesson 1: ROS 2 Python Package Structure**.
- Understood real-time integration patterns for humanoid robotics.
- Validated implementation within the Physical AI architecture.
