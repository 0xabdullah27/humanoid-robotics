import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Vectra',
  tagline: 'Physical AI & Humanoid Robotics',
  favicon: 'img/favicon.svg',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Enable PostCSS plugins for Tailwind CSS v4
  plugins: [
    function tailwindPlugin() {
      return {
        name: 'docusaurus-tailwindcss',
        configurePostCss(postcssOptions) {
          postcssOptions.plugins.push(require('@tailwindcss/postcss'));
          postcssOptions.plugins.push(require('autoprefixer'));
          return postcssOptions;
        },
      };
    },
  ],

  // Set the production url of your site here
  url: 'https://0xabdullah27.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  baseUrl: '/humanoid-robotics/',

  // GitHub pages deployment config.
  organizationName: '0xabdullah27', // Usually your GitHub org/user name.
  projectName: 'humanoid-robotics', // Usually your repo name.

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          editUrl:
            'https://github.com/0xabdullah27/humanoid-robotics/edit/main/book-source/docs/',
        },
        blog: false, // Disable blog functionality for the book
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      defaultMode: 'dark',
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: 'VECTRA',
      logo: {
        alt: 'Vectra Physical AI',
        src: 'img/logo.svg',
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'bookSidebar',
          position: 'left',
          label: 'Curriculum',
        },
        {
          to: '/docs/Part-1-ROS2-Foundation',
          position: 'left',
          label: 'ROS 2 Core',
        },
        {
          to: '/docs/Part-2-Digital-Twin',
          position: 'left',
          label: 'Digital Twin',
        },
        {
          to: '/docs/Part-3-Advanced-Simulation-Perception',
          position: 'left',
          label: 'Isaac & AI',
        },
        {
          to: '/docs/Part-4-Vision-Language-Action',
          position: 'left',
          label: 'VLA Pipeline',
        },
        {
          href: 'https://github.com/0xabdullah27/humanoid-robotics',
          position: 'right',
          className: 'header-github-link',
          'aria-label': 'GitHub repository',
          label: 'GitHub',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Curriculum',
          items: [
            {
              label: '00 // Introduction',
              to: '/docs/intro',
            },
            {
              label: '01 // ROS 2 Nervous System',
              to: '/docs/Part-1-ROS2-Foundation',
            },
            {
              label: '02 // Digital Twin Simulation',
              to: '/docs/Part-2-Digital-Twin',
            },
            {
              label: '03 // Isaac Sim & Perception',
              to: '/docs/Part-3-Advanced-Simulation-Perception',
            },
            {
              label: '04 // Vision-Language-Action',
              to: '/docs/Part-4-Vision-Language-Action',
            },
          ],
        },
        {
          title: 'Ecosystem & Stack',
          items: [
            {
              label: 'ROS 2 Jazzy & rclpy',
              href: 'https://docs.ros.org/en/jazzy/',
            },
            {
              label: 'NVIDIA Isaac Sim & ROS',
              href: 'https://developer.nvidia.com/isaac-sim',
            },
            {
              label: 'Nav2 Autonomous Navigation',
              href: 'https://nav2.org/',
            },
            {
              label: 'Gazebo & Unity HRI',
              href: 'https://gazebosim.org/',
            },
          ],
        },
        {
          title: 'Project & Source',
          items: [
            {
              label: 'GitHub Repository',
              href: 'https://github.com/0xabdullah27/humanoid-robotics',
            },
            {
              label: 'Issues & Discussions',
              href: 'https://github.com/0xabdullah27/humanoid-robotics/issues',
            },
            {
              label: 'AI Agentic Copilot',
              to: '/docs/intro',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Vectra Physical AI & Humanoid Robotics. Engineered for Next-Gen Autonomous Systems.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  customFields: {
    chatbotApiBase: process.env.CHATBOT_API_BASE || 'https://humanoid-robotics-api.vercel.app/api',
  },
};

export default config;
