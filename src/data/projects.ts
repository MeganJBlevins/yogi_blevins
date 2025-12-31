export interface Project {
  id: string
  title: string
  description: string
  technologies: string[]
  category: string
  featured: boolean
  color: string
  github?: string
  live?: string
}

export const projectCategories = [
  { id: 'web', label: 'Web Apps' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'design', label: 'Design' },
  { id: 'api', label: 'APIs' },
]

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce solution with real-time inventory management, payment processing, and an intuitive admin dashboard.',
    technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe', 'Redis', 'Docker'],
    category: 'web',
    featured: true,
    color: '#798777',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'task-management',
    title: 'TaskFlow Pro',
    description: 'A collaborative task management application with real-time updates, team workspaces, and advanced project analytics.',
    technologies: ['Next.js', 'TypeScript', 'Prisma', 'tRPC', 'Tailwind CSS'],
    category: 'web',
    featured: true,
    color: '#BDD2B6',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'fitness-tracker',
    title: 'FitTrack Mobile',
    description: 'A comprehensive fitness tracking app with workout plans, nutrition logging, and progress visualization.',
    technologies: ['React Native', 'Expo', 'Firebase', 'Redux', 'TypeScript'],
    category: 'mobile',
    featured: true,
    color: '#A2B29F',
    github: 'https://github.com',
  },
  {
    id: 'analytics-dashboard',
    title: 'Analytics Dashboard',
    description: 'A real-time analytics dashboard with customizable widgets, data visualization, and automated reporting.',
    technologies: ['Vue.js', 'D3.js', 'Python', 'FastAPI', 'MongoDB'],
    category: 'web',
    featured: false,
    color: '#798777',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'social-media-api',
    title: 'Social Media API',
    description: 'A scalable RESTful API for a social media platform with authentication, rate limiting, and comprehensive documentation.',
    technologies: ['Node.js', 'Express', 'MongoDB', 'JWT', 'Swagger', 'Jest'],
    category: 'api',
    featured: false,
    color: '#A2B29F',
    github: 'https://github.com',
  },
  {
    id: 'design-system',
    title: 'Prism Design System',
    description: 'A comprehensive design system with reusable components, tokens, and detailed documentation for enterprise applications.',
    technologies: ['React', 'Storybook', 'Figma', 'CSS Variables', 'TypeScript'],
    category: 'design',
    featured: false,
    color: '#BDD2B6',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'weather-app',
    title: 'Weather Companion',
    description: 'A beautiful weather application with location-based forecasts, severe weather alerts, and historical data.',
    technologies: ['React Native', 'OpenWeather API', 'Reanimated', 'Expo'],
    category: 'mobile',
    featured: false,
    color: '#798777',
    github: 'https://github.com',
  },
  {
    id: 'portfolio-cms',
    title: 'Portfolio CMS',
    description: 'A headless CMS specifically designed for creative portfolios with markdown support and asset optimization.',
    technologies: ['Next.js', 'Sanity', 'GraphQL', 'Vercel', 'TypeScript'],
    category: 'web',
    featured: false,
    color: '#A2B29F',
    github: 'https://github.com',
    live: 'https://example.com',
  },
  {
    id: 'payment-gateway',
    title: 'Payment Gateway API',
    description: 'A secure payment processing API with multi-currency support, fraud detection, and detailed transaction logs.',
    technologies: ['Python', 'FastAPI', 'PostgreSQL', 'Redis', 'Stripe'],
    category: 'api',
    featured: false,
    color: '#BDD2B6',
    github: 'https://github.com',
  },
]

export const featuredProjects = projects.filter(project => project.featured)

