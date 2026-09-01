import React, { type ReactNode } from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import {
  Bot,
  Cpu,
  Terminal,
  Layers,
  Zap,
  Compass,
  Eye,
  BrainCircuit,
  Boxes,
  Code2,
  Gamepad2,
  Navigation,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Target,
  ShieldCheck,
  Globe,
  Radio,
  Activity,
  Mic,
  Workflow,
  ChevronRight,
  HardDrive,
  Award
} from 'lucide-react';

import styles from './index.module.css';

// Hero Section
function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.cyberGridBg}></div>
      <div className={styles.glowOrbCyan}></div>
      <div className={styles.glowOrbIndigo}></div>

      <div className={styles.heroContainer}>
        <div className={styles.heroContent}>
          {/* System Status Pill */}
          <div className={styles.statusPill}>
            <span className={styles.statusDot}></span>
            <span className={styles.statusText}>SYSTEM ONLINE // ROS 2 JAZZY & ISAAC SIM 4.2</span>
          </div>

          <h1 className={styles.heroTitle}>
            <span className={styles.titleSub}>AI Learned to Think in Tokens.</span>
            <span className={styles.titleMain}>
              Now Master <span className={styles.neonHighlight}>Physical AI</span> to Make it Move.
            </span>
          </h1>

          <p className={styles.heroSubtitle}>
            The definitive blueprint for engineering autonomous humanoid systems. From ROS 2 distributed
            robotics and physics simulation to GPU-accelerated VSLAM, Nav2 motion planning, and
            Vision-Language-Action (VLA) voice agents.
          </p>

          {/* Telemetry Metrics Strip */}
          <div className={styles.metricsGrid}>
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>10</span>
              <span className={styles.metricLabel}>Chapters</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>80+</span>
              <span className={styles.metricLabel}>Hands-On Lessons</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>4</span>
              <span className={styles.metricLabel}>Capstone Systems</span>
            </div>
            <div className={styles.metricDivider}></div>
            <div className={styles.metricItem}>
              <span className={styles.metricVal}>100%</span>
              <span className={styles.metricLabel}>Production Code</span>
            </div>
          </div>

          {/* CTA Button Group */}
          <div className={styles.ctaGroup}>
            <Link className={styles.ctaPrimary} to="/docs/intro">
              <Sparkles className={styles.btnIcon} size={18} />
              <span>Launch Curriculum</span>
              <ArrowRight className={styles.arrowIcon} size={18} />
            </Link>

            <Link className={styles.ctaSecondary} to="/docs/Part-1-ROS2-Foundation">
              <Terminal className={styles.btnIcon} size={18} />
              <span>Explore ROS 2 Stack</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// Tech Stack Marquee (Zero Emojis, Pure Tech Vector Icons)
function TechStackSection() {
  const techList = [
    { name: 'ROS 2 Jazzy', icon: Terminal, desc: 'Robotic Middleware' },
    { name: 'Python rclpy', icon: Code2, desc: 'Agent Node Architecture' },
    { name: 'NVIDIA Isaac Sim', icon: Zap, desc: 'GPU-Accelerated Sim' },
    { name: 'Isaac ROS VSLAM', icon: Eye, desc: 'Hardware Visual Odometry' },
    { name: 'Gazebo Fortress', icon: Boxes, desc: 'Rigid Body Dynamics' },
    { name: 'Unity HRI', icon: Gamepad2, desc: 'Human-Avatar Interface' },
    { name: 'Nav2 Stack', icon: Navigation, desc: 'Humanoid Path Planning' },
    { name: 'VLA & LLMs', icon: BrainCircuit, desc: 'Voice-to-Action Models' },
  ];

  return (
    <section className={styles.techStack}>
      <div className={styles.techStackInner}>
        <div className={styles.techStackHeader}>
          <Cpu size={16} className={styles.techHeaderIcon} />
          <span>STANDARDIZED PHYSICAL AI & ROBOTICS ARCHITECTURE</span>
        </div>

        <div className={styles.techGrid}>
          {techList.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div key={idx} className={styles.techCard}>
                <div className={styles.techIconWrap}>
                  <Icon size={20} />
                </div>
                <div className={styles.techInfo}>
                  <span className={styles.techTitle}>{item.name}</span>
                  <span className={styles.techDesc}>{item.desc}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// 4 Core Learning Pillars
function JourneySection() {
  const pillars = [
    {
      index: '01',
      tag: 'MIDDLEWARE BACKBONE',
      title: 'The Robotic Nervous System',
      subtitle: 'ROS 2 Core & Humanoid Modeling',
      desc: 'Architect asynchronous nodes, topics, services, and action clients in Python. Construct modular URDF/Xacro kinematic chains and coordinate frames for humanoid arms and torsos.',
      highlights: ['ROS 2 Distributed Graph', 'rclpy Async Callback Executors', 'URDF Collision & Inertia Physics'],
      color: '#00f0ff',
      link: '/docs/Part-1-ROS2-Foundation',
      icon: Terminal,
    },
    {
      index: '02',
      tag: 'SIMULATION ENVIRONMENT',
      title: 'The Digital Twin',
      subtitle: 'Gazebo Physics, Unity HRI & Sensors',
      desc: 'Build high-fidelity virtual proving grounds. Simulate gravity, contact friction, LiDAR point-clouds, stereo RGB-D cameras, and 6-axis IMUs with realistic sensor noise models.',
      highlights: ['Gazebo Multi-Body Physics', 'Unity Interactive Avatars', 'Full Sensor Suite Simulation'],
      color: '#00ff9d',
      link: '/docs/Part-2-Digital-Twin',
      icon: Boxes,
    },
    {
      index: '03',
      tag: 'PERCEPTION & NAVIGATION',
      title: 'The AI Brain',
      subtitle: 'NVIDIA Isaac Sim, VSLAM & Nav2',
      desc: 'Harness NVIDIA Omniverse and RTX ray-tracing for synthetic data generation. Deploy CUDA-accelerated Isaac ROS Visual SLAM and Nav2 behavior tree path planning.',
      highlights: ['Isaac Sim Domain Randomization', 'CUDA-Accelerated Visual SLAM', 'Nav2 Humanoid Costmaps & Planners'],
      color: '#6366f1',
      link: '/docs/Part-3-Advanced-Simulation-Perception',
      icon: Eye,
    },
    {
      index: '04',
      tag: 'MULTIMODAL INTELLIGENCE',
      title: 'Voice to Action',
      subtitle: 'Vision-Language-Action Pipeline',
      desc: 'Connect whisper speech recognition and multimodal LLM planners directly to ROS 2 controllers. Enable natural voice instructions to translate into real spatial humanoid actions.',
      highlights: ['Real-Time Audio & VAD Stream', 'Structured Intent Decomposition', 'Closed-Loop Trajectory Execution'],
      color: '#ff2d55',
      link: '/docs/Part-4-Vision-Language-Action',
      icon: BrainCircuit,
    },
  ];

  return (
    <section className={styles.journeySection}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <Workflow size={14} />
          <span>CURRICULUM ARCHITECTURE</span>
        </div>
        <h2 className={styles.sectionTitle}>Four Pillars to Autonomous Humanoids</h2>
        <p className={styles.sectionSubtitle}>
          A step-by-step engineering journey from low-level middleware communication to
          voice-directed physical AI agents.
        </p>
      </div>

      <div className={styles.pillarsGrid}>
        {pillars.map((pillar) => {
          const PillarIcon = pillar.icon;
          return (
            <Link
              key={pillar.index}
              to={pillar.link}
              className={styles.pillarCard}
              style={{ '--pillar-accent': pillar.color } as React.CSSProperties}
            >
              <div className={styles.pillarHeader}>
                <div className={styles.pillarIndexBadge}>
                  <span>{pillar.index}</span>
                </div>
                <div className={styles.pillarTag}>{pillar.tag}</div>
                <div className={styles.pillarIcon}>
                  <PillarIcon size={22} />
                </div>
              </div>

              <h3 className={styles.pillarTitle}>{pillar.title}</h3>
              <h4 className={styles.pillarSubtitle}>{pillar.subtitle}</h4>
              <p className={styles.pillarDesc}>{pillar.desc}</p>

              <div className={styles.pillarHighlights}>
                {pillar.highlights.map((item, i) => (
                  <div key={i} className={styles.highlightItem}>
                    <CheckCircle2 size={13} className={styles.highlightIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className={styles.pillarFooter}>
                <span>Explore Track {pillar.index}</span>
                <ChevronRight size={16} className={styles.pillarArrow} />
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

// End-to-End Voice-to-Action Interactive Architecture
function PipelineSection() {
  return (
    <section className={styles.pipelineSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <Activity size={14} />
          <span>END-TO-END PIPELINE</span>
        </div>
        <h2 className={styles.sectionTitle}>From Natural Voice to Motor Actuation</h2>
        <p className={styles.sectionSubtitle}>
          Experience how modern multimodal physical AI decomposes raw acoustic input into
          verified kinematics trajectories.
        </p>
      </div>

      <div className={styles.pipelineFlow}>
        <div className={styles.flowCard}>
          <div className={styles.flowIconBox}>
            <Mic size={24} />
          </div>
          <span className={styles.flowStepNum}>STEP 01</span>
          <h4 className={styles.flowStepTitle}>Acoustic Stream</h4>
          <p className={styles.flowStepDesc}>Real-time VAD voice capture + Whisper ASR transcription.</p>
          <div className={styles.flowCode}>
            <code>"Navigate to table, inspect red cylinder"</code>
          </div>
        </div>

        <div className={styles.flowConnector}>
          <ArrowRight size={20} className={styles.connectorArrow} />
        </div>

        <div className={styles.flowCard}>
          <div className={styles.flowIconBox}>
            <BrainCircuit size={24} />
          </div>
          <span className={styles.flowStepNum}>STEP 02</span>
          <h4 className={styles.flowStepTitle}>VLA Intent Planner</h4>
          <p className={styles.flowStepDesc}>Spatial reasoning, task decomposition & JSON schema validation.</p>
          <div className={styles.flowCode}>
            <code>&#123; goal: "NAV_TARGET", object: "cylinder_01" &#125;</code>
          </div>
        </div>

        <div className={styles.flowConnector}>
          <ArrowRight size={20} className={styles.connectorArrow} />
        </div>

        <div className={styles.flowCard}>
          <div className={styles.flowIconBox}>
            <Navigation size={24} />
          </div>
          <span className={styles.flowStepNum}>STEP 03</span>
          <h4 className={styles.flowStepTitle}>Nav2 & VSLAM</h4>
          <p className={styles.flowStepDesc}>Costmap generation, dynamic obstacle avoidance & odometry.</p>
          <div className={styles.flowCode}>
            <code>cmd_vel: [vx: 0.6m/s, wz: 0.15rad/s]</code>
          </div>
        </div>

        <div className={styles.flowConnector}>
          <ArrowRight size={20} className={styles.connectorArrow} />
        </div>

        <div className={styles.flowCard}>
          <div className={styles.flowIconBox}>
            <Bot size={24} />
          </div>
          <span className={styles.flowStepNum}>STEP 04</span>
          <h4 className={styles.flowStepTitle}>Actuator Execution</h4>
          <p className={styles.flowStepDesc}>Closed-loop PID joint control in Gazebo & Isaac Sim.</p>
          <div className={styles.flowCode}>
            <code>STATUS: TARGET_REACHED (100% OK)</code>
          </div>
        </div>
      </div>
    </section>
  );
}

// Features Section
function FeaturesSection() {
  const features = [
    {
      icon: Target,
      title: 'Capstone Project-First',
      desc: 'Each part culminates in an integrated capstone: balance controllers, sensor suites, realtime SLAM, and voice-commanded navigation.',
    },
    {
      icon: Terminal,
      title: 'Industry-Grade Python & C++',
      desc: 'Zero toy code. Production-standard rclpy packages, clean type hints, async executors, and reusable robotic node templates.',
    },
    {
      icon: Zap,
      title: 'Hardware Acceleration',
      desc: 'Harness NVIDIA CUDA, TensorRT, and Isaac ROS for real-time visual odometry and photorealistic synthetic domain randomization.',
    },
    {
      icon: ShieldCheck,
      title: 'Sim-to-Real Verification',
      desc: 'Test safely inside Gazebo and Isaac Sim before flashing motors on expensive physical humanoid robotics hardware.',
    },
    {
      icon: Globe,
      title: 'Human-Robot Interaction',
      desc: 'Bridge Unity 3D human avatars with ROS 2 websockets to construct intuitive multimodal interfaces for spatial agents.',
    },
    {
      icon: HardDrive,
      title: 'Comprehensive Reference',
      desc: 'Complete URDF diagrams, sensor noise formulas, coordinate transformation rules, and Nav2 costmap configurations.',
    },
  ];

  return (
    <section className={styles.featuresSection}>
      <div className={styles.sectionHeader}>
        <div className={styles.sectionBadge}>
          <Layers size={14} />
          <span>ENGINEERING STANDARDS</span>
        </div>
        <h2 className={styles.sectionTitle}>Engineered for Real-World Robotics</h2>
        <p className={styles.sectionSubtitle}>
          Built from the ground up for robotics engineers, AI researchers, and autonomous systems builders.
        </p>
      </div>

      <div className={styles.featuresGrid}>
        {features.map((feat, i) => {
          const FeatIcon = feat.icon;
          return (
            <div key={i} className={styles.featureCard}>
              <div className={styles.featureIconWrap}>
                <FeatIcon size={22} />
              </div>
              <h3 className={styles.featureTitle}>{feat.title}</h3>
              <p className={styles.featureDesc}>{feat.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Prerequisites & Target Competencies
function PrerequisitesSection() {
  return (
    <section className={styles.prereqSection}>
      <div className={styles.prereqGrid}>
        <div className={styles.prereqCard}>
          <div className={styles.prereqHeader}>
            <Terminal size={20} className={styles.prereqHeaderIcon} />
            <h3>Prerequisites</h3>
          </div>
          <ul className={styles.prereqList}>
            <li>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>Familiarity with Python syntax and object-oriented patterns</span>
            </li>
            <li>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>Basic comfort with Linux terminal & shell navigation</span>
            </li>
            <li>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>Elementary matrix algebra & coordinate systems (helpful)</span>
            </li>
            <li>
              <CheckCircle2 size={16} className={styles.checkIcon} />
              <span>Modern PC with Ubuntu 24.04 / 22.04 or WSL2 for simulation</span>
            </li>
          </ul>
        </div>

        <div className={styles.prereqCard}>
          <div className={styles.prereqHeader}>
            <Award size={20} className={styles.awardHeaderIcon} />
            <h3>Competencies You Will Master</h3>
          </div>
          <ul className={styles.prereqList}>
            <li>
              <CheckCircle2 size={16} className={styles.awardCheckIcon} />
              <span>Full ROS 2 architecture (Nodes, Topics, Actions, Custom Msgs)</span>
            </li>
            <li>
              <CheckCircle2 size={16} className={styles.awardCheckIcon} />
              <span>Humanoid URDF modeling, joint kinematics & inertia tensors</span>
            </li>
            <li>
              <CheckCircle2 size={16} className={styles.awardCheckIcon} />
              <span>Photorealistic physics simulation in Gazebo & NVIDIA Isaac Sim</span>
            </li>
            <li>
              <CheckCircle2 size={16} className={styles.awardCheckIcon} />
              <span>End-to-end Voice-to-Action physical AI agent pipeline</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

// Final CTA Launchpad
function CTASection() {
  return (
    <section className={styles.ctaSection}>
      <div className={styles.ctaGlow}></div>
      <div className={styles.ctaContent}>
        <div className={styles.sectionBadge}>
          <Sparkles size={14} />
          <span>START BUILDING</span>
        </div>
        <h2 className={styles.ctaTitle}>Ready to Deploy Your First Physical AI Agent?</h2>
        <p className={styles.ctaSubtitle}>
          Master the complete robotics software stack from fundamentals to autonomous humanoid systems.
        </p>

        <div className={styles.ctaButtons}>
          <Link className={styles.ctaPrimary} to="/docs/intro">
            <Sparkles size={18} />
            <span>Start with Chapter 0</span>
            <ArrowRight size={18} />
          </Link>
          <Link className={styles.ctaSecondary} to="/docs/Part-1-ROS2-Foundation">
            <Terminal size={18} />
            <span>Jump to Part 1: ROS 2</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default function Home(): ReactNode {
  return (
    <Layout
      title="Physical AI & Humanoid Robotics | Engineering Blueprint"
      description="Vectra - The complete hands-on guide from ROS 2 foundations to NVIDIA Isaac Sim, Digital Twins, and Voice-to-Action Humanoids."
    >
      <main className={styles.main}>
        <HeroSection />
        <TechStackSection />
        <JourneySection />
        <PipelineSection />
        <FeaturesSection />
        <PrerequisitesSection />
        <CTASection />
      </main>
    </Layout>
  );
}
