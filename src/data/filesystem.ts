import type { FileNode, Email } from '../types';

export const fileSystem: FileNode = {
  id: 'root',
  name: 'Desktop',
  type: 'folder',
  children: [
    {
      id: 'about-me',
      name: 'About Me',
      type: 'folder',
      children: [
        {
          id: 'bio',
          name: 'bio.txt',
          type: 'text',
          content: `Hello! I'm [Your Name], a [Your Role] based in [Location].

I craft digital experiences that blend creativity with technical precision. With [X] years of experience building products across startups and established companies, I've developed a keen eye for details that matter.

My approach combines systematic thinking with creative problem-solving. I believe great software should feel invisible - users shouldn't have to think about how it works, it should just work.

When I'm not coding, you'll find me [hobby], [hobby], or exploring [interest]. I'm always curious about how things work and why they work that way.

Currently open to new opportunities where I can contribute to meaningful products alongside thoughtful teams.

Feel free to reach out - I'd love to hear about what you're building.`,
        },
        {
          id: 'values',
          name: 'values.md',
          type: 'markdown',
          content: `# What I Believe In

## Craft Over Speed
Quality code is an investment, not a cost. Taking time to build things right pays dividends in maintainability, reliability, and team velocity.

## Users First
Every pixel, animation, and interaction should serve the person using it. Technical elegance means nothing if it doesn't translate to a better experience.

## Continuous Learning
Technology evolves constantly. Staying curious and humble about what we don't know keeps us growing and prevents stagnation.

## Clear Communication
The best code is code that doesn't need explaining. The same applies to ideas, feedback, and collaboration. Say what you mean, mean what you say.

## Systems Thinking
Individual features exist within larger contexts. Understanding how pieces connect helps build more coherent, maintainable products.`,
        },
      ],
    },
    {
      id: 'experience',
      name: 'Experience',
      type: 'folder',
      children: [
        {
          id: 'company-a',
          name: 'TechCorp Inc',
          type: 'folder',
          children: [
            {
              id: 'role-a',
              name: 'role.md',
              type: 'markdown',
              content: `# Senior Software Engineer
## TechCorp Inc | 2022 - Present

Led development of customer-facing features that increased user engagement by 40%. Architected and implemented a new design system adopted across 3 product teams.

### Key Achievements
- Rebuilt the core dashboard experience, reducing load time by 60%
- Mentored 4 junior engineers through structured pairing sessions
- Introduced automated testing practices that caught 30% more bugs pre-release
- Collaborated with design to establish component library standards

### Technologies
React, TypeScript, Node.js, PostgreSQL, AWS, Figma`,
            },
          ],
        },
        {
          id: 'company-b',
          name: 'StartupXYZ',
          type: 'folder',
          children: [
            {
              id: 'role-b',
              name: 'role.md',
              type: 'markdown',
              content: `# Lead Frontend Engineer
## StartupXYZ | 2020 - 2022

First engineering hire. Built the entire frontend from scratch and scaled the team to 5 engineers as the company grew from seed to Series A.

### Key Achievements
- Designed and implemented the core product used by 10,000+ daily active users
- Established engineering culture, code review practices, and documentation standards
- Reduced customer support tickets by 25% through UX improvements
- Built real-time collaboration features that became a key product differentiator

### Technologies
Vue.js, TypeScript, GraphQL, Firebase, Tailwind CSS`,
            },
          ],
        },
        {
          id: 'company-c',
          name: 'Freelance',
          type: 'folder',
          children: [
            {
              id: 'role-c',
              name: 'role.md',
              type: 'markdown',
              content: `# Independent Consultant
## Freelance | 2018 - 2020

Worked with 12+ clients ranging from early-stage startups to established businesses, delivering custom web applications and technical consulting.

### Key Achievements
- Delivered projects for clients in healthcare, e-commerce, and education
- Maintained 100% client satisfaction rate with repeat business from 8 clients
- Built a SaaS MVP that secured $500K in seed funding for a client
- Developed expertise in rapid prototyping and iterative development

### Technologies
React, Node.js, Python, MongoDB, Stripe, various client stacks`,
            },
          ],
        },
      ],
    },
    {
      id: 'projects',
      name: 'Projects',
      type: 'folder',
      children: [
        {
          id: 'project-alpha',
          name: 'Project Alpha',
          type: 'folder',
          children: [
            {
              id: 'project-alpha-readme',
              name: 'README.md',
              type: 'markdown',
              content: `# Project Alpha

A real-time collaborative workspace for remote teams. Think Notion meets Figma for project planning.

## The Problem
Remote teams struggle to maintain context and alignment across async communication. Existing tools force a choice between structure and flexibility.

## The Solution
A canvas-based workspace where teams can organize thoughts, plans, and resources spatially. Real-time cursors and comments make collaboration feel synchronous even when it isn't.

## Key Features
- Infinite canvas with zoom and pan
- Real-time multiplayer with presence indicators
- Nested pages and linked databases
- Markdown support with slash commands
- Custom templates and workflows

## Tech Stack
React, TypeScript, Yjs (CRDT), WebSocket, PostgreSQL, Vercel

## Impact
- 2,000+ active users in beta
- 4.8/5 average user rating
- Featured in ProductHunt's "Products of the Week"`,
              metadata: {
                techStack: ['React', 'TypeScript', 'Yjs', 'WebSocket', 'PostgreSQL'],
                link: 'https://example.com/project-alpha',
              },
            },
          ],
        },
        {
          id: 'project-beta',
          name: 'Project Beta',
          type: 'folder',
          children: [
            {
              id: 'project-beta-readme',
              name: 'README.md',
              type: 'markdown',
              content: `# Project Beta

An AI-powered code review assistant that learns your team's patterns and preferences.

## The Problem
Code reviews are essential but time-consuming. Senior engineers spend hours on routine feedback that could be automated.

## The Solution
A GitHub integration that provides intelligent suggestions based on your team's coding standards, past review comments, and best practices.

## Key Features
- Automatic style and pattern detection
- Custom rule configuration per repository
- Learning from historical review comments
- Integration with existing CI/CD pipelines
- Team-wide consistency scoring

## Tech Stack
Python, FastAPI, OpenAI API, PostgreSQL, GitHub API, Docker

## Impact
- Reduced average review time by 35%
- Deployed across 50+ repositories
- 92% suggestion acceptance rate`,
              metadata: {
                techStack: ['Python', 'FastAPI', 'OpenAI', 'PostgreSQL', 'Docker'],
                link: 'https://example.com/project-beta',
              },
            },
          ],
        },
        {
          id: 'project-gamma',
          name: 'Project Gamma',
          type: 'folder',
          children: [
            {
              id: 'project-gamma-readme',
              name: 'README.md',
              type: 'markdown',
              content: `# Project Gamma

A minimalist habit tracker that focuses on consistency over perfection.

## The Problem
Most habit apps are overwhelming - too many features, too much gamification, too little focus on what matters: showing up consistently.

## The Solution
A stripped-down tracker that celebrates streaks and makes the daily check-in feel satisfying rather than tedious.

## Key Features
- One-tap daily check-ins
- Visual streak calendar (GitHub-style)
- Weekly reflection prompts
- Privacy-first (local-only option)
- Dark mode by default

## Tech Stack
React Native, Expo, SQLite, TypeScript

## Impact
- 5,000+ downloads on App Store
- 4.7 star rating
- Featured in "Apps We Love" by Apple`,
              metadata: {
                techStack: ['React Native', 'Expo', 'SQLite', 'TypeScript'],
                link: 'https://example.com/project-gamma',
              },
            },
          ],
        },
        {
          id: 'project-delta',
          name: 'Project Delta',
          type: 'folder',
          children: [
            {
              id: 'project-delta-readme',
              name: 'README.md',
              type: 'markdown',
              content: `# Project Delta

An open-source component library for building beautiful, accessible interfaces.

## The Problem
Design systems are hard to build from scratch. Teams often reinvent the wheel or compromise on accessibility.

## The Solution
A thoughtfully crafted component library that prioritizes accessibility, customization, and developer experience.

## Key Features
- 40+ production-ready components
- Full keyboard navigation support
- WAI-ARIA compliant
- Themeable with CSS variables
- Tree-shakeable for optimal bundle size
- Comprehensive documentation

## Tech Stack
TypeScript, React, CSS-in-JS, Storybook, Testing Library

## Impact
- 3,000+ GitHub stars
- Used by 200+ projects
- 50+ community contributors`,
              metadata: {
                techStack: ['TypeScript', 'React', 'Storybook', 'Testing Library'],
                link: 'https://example.com/project-delta',
              },
            },
          ],
        },
      ],
    },
    {
      id: 'playground',
      name: 'Playground',
      type: 'folder',
      children: [
        {
          id: 'secrets',
          name: 'secrets.txt',
          type: 'text',
          content: `Congratulations, you found the secrets file!

Here are some hidden things to discover:

1. Try the Konami code on the desktop (up up down down left right left right b a)
2. Type 'matrix' in the terminal
3. Type 'party' in the terminal for a surprise
4. Click the logo in the menu bar 5 times
5. Type 'coffee' in the terminal when you need a break
6. There's something special about triple-clicking the desktop...
7. Try 'neofetch' in the terminal

Happy exploring!`,
        },
        {
          id: 'ideas',
          name: 'ideas.md',
          type: 'markdown',
          content: `# Random Ideas & Experiments

## Things I Want to Build
- A CLI tool for generating project scaffolds
- Browser extension for saving and organizing bookmarks spatially
- Mechanical keyboard sound simulator

## Things I'm Learning
- Rust for systems programming
- Three.js for 3D web experiences
- Music production in Ableton

## Favorite Tools Right Now
- Arc Browser
- Linear for project management
- Raycast for everything
- Obsidian for notes`,
        },
      ],
    },
    {
      id: 'cv',
      name: 'cv.pdf',
      type: 'pdf',
      content: 'cv',
    },
  ],
};

export const emails: Email[] = [
  {
    id: 'email-1',
    from: 'Sarah Chen',
    fromEmail: 'sarah.chen@techcorp.com',
    subject: 'Exceptional collaboration on the dashboard project',
    body: `Working with [Name] was one of the highlights of my time at TechCorp. Their technical skills are impressive, but what really sets them apart is their ability to translate complex requirements into elegant solutions.

They have this rare combination of deep technical knowledge and genuine empathy for users. Every feature they built was thoughtful, performant, and delightful to use.

I'd jump at the chance to work with them again.

Sarah Chen
Product Manager, TechCorp Inc`,
    date: '2024-01-15',
    isRead: false,
    isStarred: true,
  },
  {
    id: 'email-2',
    from: 'Marcus Johnson',
    fromEmail: 'marcus@startupxyz.io',
    subject: 'Thank you for everything',
    body: `[Name] was our first engineering hire, and I couldn't have made a better choice. They didn't just write code - they built the foundation for our entire engineering culture.

Their technical decisions from 3 years ago are still serving us well today. That's the mark of someone who thinks about the long game, not just shipping features.

Beyond the technical stuff, they were a joy to work with. Clear communicator, great mentor, and always willing to help wherever needed.

Marcus Johnson
CEO & Co-founder, StartupXYZ`,
    date: '2024-02-20',
    isRead: false,
    isStarred: false,
  },
  {
    id: 'email-3',
    from: 'Emily Rodriguez',
    fromEmail: 'emily.r@designstudio.co',
    subject: 'The best engineer I\'ve partnered with',
    body: `As a designer, I've worked with many engineers. [Name] stands out because they genuinely care about the craft of interface design.

They don't just implement designs - they improve them. Their feedback on interaction patterns and micro-animations has made me a better designer.

What I appreciate most is their patience in explaining technical constraints without ever dismissing design ideas outright. True partnership.

Emily Rodriguez
Senior Product Designer`,
    date: '2024-03-05',
    isRead: true,
    isStarred: true,
  },
  {
    id: 'email-4',
    from: 'Alex Kim',
    fromEmail: 'alex.kim@consulting.dev',
    subject: 'Re: Project handoff',
    body: `Just wanted to say thank you for the incredible work on our MVP. The codebase you left us is clean, well-documented, and actually enjoyable to work with.

Our new team was able to onboard in days instead of weeks. That's a testament to how thoughtfully everything was structured.

The investors were impressed, and we just closed our seed round. Couldn't have done it without you.

Best,
Alex Kim
Founder, HealthTech Startup`,
    date: '2024-03-18',
    isRead: true,
    isStarred: false,
  },
];

export const cvContent = {
  name: '[Your Name]',
  title: 'Senior Software Engineer',
  email: 'hello@example.com',
  location: '[City, Country]',
  website: 'example.com',
  summary: 'Software engineer with [X] years of experience building user-focused products. Passionate about clean code, thoughtful design, and continuous improvement. Looking for opportunities to create meaningful impact with talented teams.',
  experience: [
    {
      company: 'TechCorp Inc',
      role: 'Senior Software Engineer',
      period: '2022 - Present',
      highlights: [
        'Led development of customer-facing features increasing engagement by 40%',
        'Architected design system adopted across 3 product teams',
        'Mentored 4 junior engineers through structured pairing sessions',
      ],
    },
    {
      company: 'StartupXYZ',
      role: 'Lead Frontend Engineer',
      period: '2020 - 2022',
      highlights: [
        'First engineering hire, scaled team to 5 engineers',
        'Built core product used by 10,000+ daily active users',
        'Established engineering culture and documentation standards',
      ],
    },
    {
      company: 'Freelance',
      role: 'Independent Consultant',
      period: '2018 - 2020',
      highlights: [
        'Delivered projects for 12+ clients across multiple industries',
        'Built MVP that secured $500K in seed funding',
        'Maintained 100% client satisfaction rate',
      ],
    },
  ],
  skills: [
    'TypeScript', 'React', 'Node.js', 'Python',
    'PostgreSQL', 'GraphQL', 'AWS', 'Docker',
    'System Design', 'Technical Leadership',
  ],
  education: {
    degree: 'B.S. Computer Science',
    school: '[University Name]',
    year: '2018',
  },
};

export function findFileById(id: string, node: FileNode = fileSystem): FileNode | null {
  if (node.id === id) return node;
  if (node.children) {
    for (const child of node.children) {
      const found = findFileById(id, child);
      if (found) return found;
    }
  }
  return null;
}

export function findFileByPath(path: string): FileNode | null {
  const parts = path.split('/').filter(Boolean);
  let current: FileNode | undefined = fileSystem;

  for (const part of parts) {
    if (!current?.children) return null;
    current = current.children.find(c => c.name.toLowerCase() === part.toLowerCase());
    if (!current) return null;
  }

  return current || null;
}

export function getFilePath(id: string, node: FileNode = fileSystem, path: string[] = []): string[] | null {
  if (node.id === id) return [...path, node.name];
  if (node.children) {
    for (const child of node.children) {
      const result = getFilePath(id, child, [...path, node.name]);
      if (result) return result;
    }
  }
  return null;
}
