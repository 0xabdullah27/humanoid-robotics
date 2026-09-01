# VECTRA // Physical AI & Humanoid Robotics

> **The definitive blueprint for engineering autonomous humanoid systems.**  
> From ROS 2 distributed robotics and physics simulation to GPU-accelerated VSLAM, Nav2 motion planning, and Vision-Language-Action (VLA) voice agents.

---

## Architecture Overview

```
                                    +-----------------------------------------+
                                    |        HUMAN NATURAL LANGUAGE / VLA     |
                                    |     (Whisper STT + LLM Intent Planner)  |
                                    +--------------------+--------------------+
                                                         |
                                                         v
                                    +-----------------------------------------+
                                    |           NAV2 / MOTION PLANNER         |
                                    |     (Trajectory & Kinematics Control)   |
                                    +--------------------+--------------------+
                                                         |
                                                         v
                                    +-----------------------------------------+
                                    |             ROS 2 JAZZY CORE            |
                                    |     (Nodes, Topics, Actions, QoS DDS)   |
                                    +---------+---------------------+---------+
                                              |                     |
                                              v                     v
                        +---------------------------+ +---------------------------+
                        |     ISAAC SIM / GAZEBO    | |      PHYSICAL HARDWARE    |
                        | (GPU Dynamics, Synthetic) | |  (Servos, Cameras, LiDAR) |
                        +---------------------------+ +---------------------------+
```

---

## Curriculum Tracks (The 4 Pillars)

### Part 1: The Robotic Nervous System (ROS 2 Foundation)
- **Chapter 1: ROS 2 Nodes, Topics, and Services** — Distributed computation graph, pub/sub communication, synchronous request/reply services, and QoS profiles.
- **Chapter 2: Bridging Python Agents to ROS Controllers** — Python package development with `rclpy`, asynchronous callbacks, executors, action servers, and custom message interfaces.
- **Capstone 1**: Multi-node telemetry & closed-loop velocity controller.

### Part 2: The Digital Twin (Physics & Kinematics)
- **Chapter 3: Robot Morphology & Physics in Gazebo** — Precision kinematic modeling with URDF and Xacro, visual meshes, collision bounds, and mass-inertia tensor matrices.
- **Chapter 4: Spatial Awareness & TF2 Coordinate Frames** — Dynamic transformation trees (`tf2`), forward & inverse kinematics, frame buffering, and sensor frame calibration.
- **Chapter 5: Immersive Visualization with Unity HRI** — Real-time sensor streaming over WebSockets/ROS-TCP-Endpoint and interactive digital twin rendering.
- **Capstone 2**: Articulated bipedal humanoid digital twin with simulated joint actuators.

### Part 3: Advanced Simulation & Perception (Isaac Sim & Nav2)
- **Chapter 6: High-Fidelity Simulation with NVIDIA Isaac Sim** — RTX physics simulation, GPU-accelerated rigid-body contact dynamics, and synthetic domain randomization.
- **Chapter 7: Perception Pipelines & Visual SLAM** — Isaac ROS stereo visual inertial odometry (VIO), point cloud registration, and occupancy grid mapping.
- **Chapter 8: Autonomous Navigation with Nav2** — Behavior trees, costmaps, global trajectory optimization, and dynamic obstacle avoidance.
- **Capstone 3**: Autonomous obstacle-navigating biped robot in a photorealistic facility.

### Part 4: Vision-Language-Action (VLA & Autonomous Agents)
- **Chapter 9: Multimodal AI & Language-Grounded Planning** — Integrating Vision-Language-Action (VLA) foundation models for robotic scene reasoning and zero-shot task decomposition.
- **Chapter 10: The Voice-to-Action Autonomous Pipeline** — Streaming audio ingestion via Whisper, LLM goal decomposition, parameter extraction, and execution validation.
- **Capstone 4**: Full end-to-end Voice-to-Action pipeline executing multi-step physical manipulation.

---

## Tech Stack & Standards

| Domain | Technology | Description |
| :--- | :--- | :--- |
| **Robotics Framework** | ROS 2 Jazzy Jalisco | Standard DDS-based robotics communication |
| **Simulation Engines** | NVIDIA Isaac Sim 4.2 / Gazebo Harmonic | GPU-accelerated RTX physics & dynamics simulation |
| **Robot Kinematics** | URDF / Xacro / TF2 | Robot description format and dynamic spatial transforms |
| **Perception & Nav** | Isaac ROS VSLAM / Nav2 | Visual odometry, behavior trees, costmaps |
| **AI / VLA Pipeline** | OpenAI Whisper / LLMs / OpenVLA | Audio intent parsing & multimodal grounding |
| **Frontend Docs** | Docusaurus 3 + React 19 + TypeScript | High-performance interactive documentation engine |
| **Styling & UI** | Dual-Theme CSS (Light & Dark) + Lucide Icons | Zero-emoji cybernetic telemetry HUD theme |
| **Copilot Backend** | Next.js 16 + Qdrant Vector DB | Real-time RAG assistant with context citation |

---

## Workspace Structure

```
human-robotics-book/
├── README.md                  # Repository documentation
├── CLAUDE.md                  # Spec-Driven Development (SDD) rules
├── book-source/               # Docusaurus curriculum & interactive UI
│   ├── docs/                  # 10 Chapters across 4 Parts (80+ Lessons)
│   ├── src/
│   │   ├── components/
│   │   │   └── ChatWidget/    # Adaptive AI Copilot interface
│   │   ├── css/
│   │   │   └── custom.css     # Dual-engine light & dark design system
│   │   └── pages/
│   │       ├── index.tsx      # Streamlined modern homepage
│   │       └── index.module.css
│   ├── static/img/            # Brand assets (logo emblem, SVG icons)
│   ├── docusaurus.config.ts   # Navbar, sidebar, and Prism syntax config
│   └── sidebars.ts            # Curriculum structure mapping
├── chatbot/                   # Next.js 16 RAG Copilot backend API
│   ├── app/                   # API routes (`/api/chat`, `/api/health`)
│   ├── lib/                   # Qdrant, embeddings, rate-limiter, CORS
│   └── scripts/ingest.ts      # Documentation vectorization pipeline
└── specs/                     # Architecture & feature specifications
```

---

## Quick Start (Local Development)

### 1. Prerequisites
- **Node.js**: `v20+` or `v22 LTS`
- **npm** or **pnpm**
- **Git**

### 2. Running the Book Source (Frontend Docs)
```bash
# Navigate to the documentation workspace
cd book-source

# Install dependencies
npm install

# Start the local development server
npm run start -- --port 3005

# Open your browser
# http://localhost:3005/humanoid-robotics/
```

### 3. Running the AI Copilot API (Backend)
```bash
# Navigate to the chatbot service
cd chatbot

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env.local

# Start Next.js development server
npm run dev
```

---

## Production Build & Validation

```bash
# In book-source
npm run typecheck    # Validate TypeScript declarations (0 errors)
npm run build        # Generate static production bundle into ./build
npm run serve        # Preview production build locally
```

---

## Key Features

- 🌓 **Adaptive Dual-Theme Engine**: Seamless high-contrast Light and Obsidian Dark modes.
- ⚡ **Zero-Emoji Professional HUD**: Replaced informal emojis with vector icons (`lucide-react`) and mission-control styling.
- 🤖 **Context-Aware AI Copilot**: Floating assistive widget with real-time RAG retrieval and citation grounding.
- 💻 **Adaptive Terminal Code Blocks**: Crisp Light Mode editor and Dark Mode terminal with high-contrast syntax highlighting for Python, C++, XML/URDF, YAML, and Shell.

---

## License & Attribution

Designed and maintained for **Vectra // Physical AI & Humanoid Robotics**.  
Engineered for Next-Gen Autonomous Systems.
