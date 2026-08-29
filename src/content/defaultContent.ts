export type Skill = { name: string; note?: string }
export type SkillCategory = { title: string; items: Skill[] }

export type AboutContent = {
  eyebrow: string
  headings: string[]
  paragraphs: string[]
  aside: {
    title: string
    text: string
    highlight?: string
  }
}

export type SkillsContent = {
  eyebrow: string
  title: string
  categories: SkillCategory[]
  learningTitle: string
  learning: string[]
}

export type ProjectItem = {
  name: string
  status: string
  description: string
  features: string[]
  tech: string[]
}

export type ProjectsContent = {
  eyebrow: string
  title: string
  projects: ProjectItem[]
}

export type EducationItem = {
  status?: string
  degree: string
  field?: string
  institution: string
  period: string
}

export type EducationContent = {
  eyebrow: string
  title: string
  items: EducationItem[]
}

export type GoalsContent = {
  eyebrow: string
  title: string
  mutedTitle: string
  currentTitle: string
  current: string[]
  goalsTitle: string
  goals: string[]
  noteTitle: string
  note: string
}

export type SectionId = 'about' | 'skills' | 'projects' | 'education' | 'custom' | 'goals'

export type LayoutContent = {
  order: SectionId[]
}

export const sectionLabels: Record<SectionId, string> = {
  about: 'About',
  skills: 'Stack & Skills',
  projects: 'Projects',
  education: 'Education',
  custom: 'Custom Sections',
  goals: 'Focus & Goals',
}

export type DefaultContentBlocks = {
  layout: LayoutContent
  about: AboutContent
  skills: SkillsContent
  projects: ProjectsContent
  education: EducationContent
  goals: GoalsContent
}

export const defaultContentBlocks: DefaultContentBlocks = {
  layout: {
    order: ['about', 'skills', 'projects', 'education', 'custom', 'goals'],
  },
  about: {
    eyebrow: 'About',
    headings: ['BUILDING TO', 'LEARN.'],
    paragraphs: [
      'I believe the best way to learn technology is by building. Instead of limiting myself to coursework, I develop applications that solve real problems.',
      "My interests span artificial intelligence, data science, cybersecurity, entrepreneurship, and software engineering. I'm currently focused on sharpening my development skills, strengthening my AI knowledge, contributing to open source, and building startup products that create meaningful impact.",
      'I learn by experimentation — taking on challenging projects and continuously improving my technical abilities.',
    ],
    aside: {
      title: 'Career Objective',
      text: 'To become an AI engineer and technology entrepreneur — building intelligent software that solves meaningful real-world problems by combining',
      highlight: 'Artificial Intelligence, Data Science, and Cybersecurity',
    },
  },
  skills: {
    eyebrow: 'Stack & Skills',
    title: 'THE STACK',
    categories: [
      {
        title: 'Languages',
        items: [
          { name: 'Java' },
          { name: 'JavaScript' },
          { name: 'HTML5' },
          { name: 'CSS3' },
          { name: 'TypeScript', note: 'Basic' },
        ],
      },
      {
        title: 'Frontend',
        items: [
          { name: 'React.js' },
          { name: 'Tailwind CSS' },
          { name: 'Bootstrap' },
          { name: 'Responsive Design' },
          { name: 'Vite' },
        ],
      },
      {
        title: 'Backend',
        items: [{ name: 'Node.js' }, { name: 'Express.js' }, { name: 'REST APIs' }],
      },
      {
        title: 'Database',
        items: [{ name: 'MongoDB' }],
      },
      {
        title: 'Tools',
        items: [
          { name: 'Git' },
          { name: 'GitHub' },
          { name: 'VS Code' },
          { name: 'Cursor AI' },
          { name: 'Postman' },
          { name: 'npm' },
          { name: 'Terminal' },
          { name: 'MongoDB Compass' },
          { name: 'MongoDB Shell' },
        ],
      },
      {
        title: 'Concepts',
        items: [{ name: 'MERN Stack' }, { name: 'Software Architecture' }, { name: 'Responsive Web Design' }],
      },
      {
        title: 'AI & Learning',
        items: [{ name: 'Artificial Intelligence' }, { name: 'Prompt Engineering' }, { name: 'AI-assisted Development' }],
      },
    ],
    learningTitle: 'Currently Learning',
    learning: ['Data Science', 'Cybersecurity', 'Machine Learning', 'System Design'],
  },
  projects: {
    eyebrow: 'Selected Work',
    title: 'PROJECTS',
    projects: [
      {
        name: 'AI Student Progress Manager',
        status: 'In Development',
        description:
          'A hyper-personalized, college-specific AI study manager that tracks syllabus, assignments, attendance and exams — then generates a daily/weekly study plan tailored to each student.',
        features: [
          'Subject dashboard with completed & pending topics',
          'AI-generated daily & weekly study plans',
          'Weak-topic detector from quizzes & self-rating',
          'Smart reminders for assignments & revision',
          'AI doubt helper explaining topics simply',
          'College mode — shared syllabus per branch & semester',
        ],
        tech: ['React', 'Node.js', 'AI /LLM', 'MongoDB'],
      },
      {
        name: 'GapSeat',
        status: 'In Development',
        description:
          'A journey optimization engine for Indian Railways that stitches fragmented seat availability across segments into a fully confirmed end-to-end journey.',
        features: [
          'Automatic segment detection between source & destination',
          'Seat continuity scoring (fewest changes, best comfort)',
          'Smart route recommendations — cheapest, fastest, comfiest',
          'Unified PNR organizer with coach & platform reminders',
          'AI Tatkal strategy & cancellation prediction',
          'Multi-train stitching for impossible direct routes',
        ],
        tech: ['React', 'Supabase', 'Node.js', 'AI /LLM', 'Graph Routing'],
      },
      {
        name: 'JavaScript Mini Projects Collection',
        status: 'In Progress — 75%',
        description:
          'A growing collection of interactive web applications demonstrating core JavaScript concepts — DOM manipulation, event handling and modern ES6+ features.',
        features: [
          'To-Do List with data persistence',
          'Scientific Calculator',
          'Interactive Quiz App',
          'Weather Dashboard',
          '12+ mini components and utilities',
        ],
        tech: ['HTML', 'CSS', 'JavaScript', 'DOM API', 'Local Storage'],
      },
      {
        name: 'MediConnect',
        status: 'Abandoned',
        description:
          'A student platform built specifically for Medi-Caps University — connecting students, counselors and official announcements in one place.',
        features: [
          'Student profiles & skills showcase',
          'Official university announcements',
          'Counselor connection',
          'Student leaderboard & CGPA ranking',
          'Internship & project tracking',
          'Filters by year, semester, branch, course',
        ],
        tech: ['React', 'Node.js', 'Express.js', 'MongoDB'],
      },
      {
        name: 'Personalized Fashion Designer',
        status: 'Concept Stage',
        description:
          'An AI stylist that turns your existing clothes into a virtual wardrobe and recommends outfits, purchases and in-store buys based on your body, budget and style.',
        features: [
          'Upload photos of yourself and your clothes',
          'Auto-generated combos: streetwear, formal, casual',
          'Virtual wardrobe with saved looks',
          'AI shopping assistant with budget-aware advice',
          'In-store mode — scan shortlisted clothes for best pick',
          'Recommendations tuned to body tone & physique',
        ],
        tech: ['React', 'Computer Vision', 'AI /LLM', 'Supabase'],
      },
      {
        name: 'Run and Cover',
        status: 'Concept Stage',
        description:
          'A fitness app that turns jogging into a territory game — the ground you run over becomes land you virtually own, and others can reclaim it by outrunning you.',
        features: [
          'GPS-based territory capture while running',
          'Virtual land ownership tied to distance covered',
          'Competitive reclaim mechanic between runners',
          'Leaderboards for largest owned area',
          'Motivation loop for consistent, longer runs',
        ],
        tech: ['React Native', 'Geolocation', 'Node.js', 'Supabase'],
      },
    ],
  },
  education: {
    eyebrow: 'Education',
    title: 'EDUCATION',
    items: [
      {
        status: 'Current',
        degree: 'Bachelor of Technology',
        field: 'Computer Science Engineering — Artificial Intelligence',
        institution: 'Medi-Caps University, Indore',
        period: '2024 — 2028',
      },
      {
        status: 'Current',
        degree: 'BS in Data Science',
        institution: 'IIT Madras',
        period: '2025 — 2028',
      },
      {
        degree: '12th Grade',
        institution: 'New Horizon Scholars School, Thane',
        period: '2024',
      },
      {
        degree: '10th Grade',
        institution: "St. Joseph's School, Greater Noida",
        period: '2022',
      },
    ],
  },
  goals: {
    eyebrow: 'Now & Next',
    title: 'FOCUS',
    mutedTitle: '& GOALS',
    currentTitle: 'Currently Working On',
    current: [
      'Building full-stack web applications',
      'Learning AI concepts',
      'Improving Data Science knowledge',
      'Exploring Cybersecurity',
      'Building startup products',
      'Enhancing software engineering skills',
    ],
    goalsTitle: 'Long-Term Aspirations',
    goals: [
      'Become an AI Engineer',
      'Build impactful technology startups',
      'Create intelligent software products',
      'Work on AI-powered applications',
      'Continue contributing to open source',
      'Explore entrepreneurship through technology',
    ],
    noteTitle: 'Open Source',
    note: 'Interested in contributing to beginner-friendly open-source projects in Java, JavaScript, and Web Development.',
  },
}

export type ContentBlockMap = DefaultContentBlocks
export type ContentBlockKey = keyof ContentBlockMap

export function cloneContent<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T
}

export function mergeContent<T>(fallback: T, incoming: unknown): T {
  if (!incoming || typeof incoming !== 'object') return cloneContent(fallback)
  if (Array.isArray(fallback)) return (Array.isArray(incoming) ? incoming : fallback) as T
  if (!fallback || typeof fallback !== 'object') return incoming as T

  const source = incoming as Record<string, unknown>
  const base = fallback as Record<string, unknown>
  const merged: Record<string, unknown> = { ...base, ...source }

  Object.keys(base).forEach((key) => {
    const baseValue = base[key]
    const sourceValue = source[key]
    if (
      baseValue &&
      sourceValue &&
      typeof baseValue === 'object' &&
      typeof sourceValue === 'object' &&
      !Array.isArray(baseValue) &&
      !Array.isArray(sourceValue)
    ) {
      merged[key] = mergeContent(baseValue, sourceValue)
    }
  })

  return cloneContent(merged) as T
}