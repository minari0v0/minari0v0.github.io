export interface Project {
  id: string
  title: string
  description: string
  image: string
  techStack: string[]
  date: string
  github?: string
  content: string
}

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  image: string
  content: string
}

export const projects: Project[] = [
  {
    id: "markdown-editor",
    title: "Markdown Editor",
    description: "A minimal markdown editor with live preview and dark mode support.",
    image: "/markdown-editor-dark-theme-minimal.jpg",
    techStack: ["React", "TypeScript", "Tailwind CSS"],
    date: "2024-12-15",
    github: "https://github.com/minari0v0/markdown-editor",
    content: `
## Overview

A clean, distraction-free markdown editor built for developers who want simplicity.

## Features

- Live preview with syntax highlighting
- Dark mode support
- Export to HTML and PDF
- Keyboard shortcuts

\`\`\`typescript
const parseMarkdown = (text: string): string => {
  return marked.parse(text);
};
\`\`\`
    `,
  },
  {
    id: "api-dashboard",
    title: "API Dashboard",
    description: "Real-time analytics dashboard for monitoring API performance and metrics.",
    image: "/api-dashboard-analytics-clean-design.jpg",
    techStack: ["Next.js", "PostgreSQL", "Chart.js"],
    date: "2024-11-20",
    github: "https://github.com/minari0v0/api-dashboard",
    content: `
## Overview

Monitor your APIs in real-time with beautiful visualizations.

## Tech Stack

- Next.js for the frontend
- PostgreSQL for data storage
- Chart.js for visualizations
    `,
  },
  {
    id: "cli-toolkit",
    title: "CLI Toolkit",
    description: "A collection of command-line tools for everyday developer tasks.",
    image: "/terminal-command-line-interface-developer-tools.jpg",
    techStack: ["Node.js", "Commander.js", "Chalk"],
    date: "2024-10-05",
    github: "https://github.com/minari0v0/cli-toolkit",
    content: `
## Overview

Boost your productivity with these CLI tools.

\`\`\`bash
npm install -g @minari0v0/cli-toolkit
\`\`\`
    `,
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: "building-better-apis",
    title: "Building Better REST APIs",
    excerpt: "Best practices for designing clean, maintainable REST APIs that developers love to use.",
    date: "2024-12-20",
    image: "/rest-api-architecture-diagram-clean-minimal.jpg",
    content: `
## Introduction

Good API design is crucial for developer experience.

## Key Principles

### 1. Use Consistent Naming

Always use plural nouns for resources.

\`\`\`
GET /users
GET /users/:id
POST /users
\`\`\`

### 2. Version Your APIs

Include version in the URL path.
    `,
  },
  {
    id: "typescript-tips",
    title: "TypeScript Tips for 2024",
    excerpt: "Advanced TypeScript patterns that will improve your code quality and developer experience.",
    date: "2024-12-10",
    image: "/typescript-code-editor-blue-theme-minimal.jpg",
    content: `
## Type Utilities

Learn to use built-in type utilities effectively.

\`\`\`typescript
type UserKeys = keyof User;
type PartialUser = Partial<User>;
\`\`\`
    `,
  },
  {
    id: "nextjs-performance",
    title: "Next.js Performance Guide",
    excerpt: "Optimize your Next.js application for lightning-fast load times and better user experience.",
    date: "2024-11-28",
    image: "/nextjs-performance-metrics-dashboard-minimal.jpg",
    content: `
## Server Components

Use React Server Components to reduce bundle size.

## Image Optimization

Always use next/image for automatic optimization.
    `,
  },
]

export const skills = {
  frontend: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Vue.js"],
  backend: ["Node.js", "Express", "MongoDB", "PostgreSQL", "GraphQL"],
  tools: ["Git", "Figma", "Slack", "VS Code", "Docker"],
}

export function getFeaturedProjects(): Project[] {
  return projects.slice(0, 3)
}

export function getRecentPosts(count: number): BlogPost[] {
  return blogPosts.slice(0, count)
}

export function getProjectById(id: string): Project | undefined {
  return projects.find((p) => p.id === id)
}

export function getBlogPostById(id: string): BlogPost | undefined {
  return blogPosts.find((p) => p.id === id)
}
