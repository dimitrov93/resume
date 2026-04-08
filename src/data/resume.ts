import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiVuedotjs, SiAngular, SiTailwindcss, SiNodedotjs,
  SiExpress, SiSpringboot, SiPostgresql, SiMongodb,
  SiMariadb, SiDocker, SiGit, SiRedux, SiVuetify,
} from 'react-icons/si'

export const skills = [
  { icon: SiReact, label: 'React', color: '#61DAFB', category: 'Frontend' },
  { icon: SiNextdotjs, label: 'Next.js', color: '#ffffff', category: 'Frontend' },
  { icon: SiRedux, label: 'Redux', color: '#764ABC', category: 'Frontend' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6', category: 'Frontend' },
  { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E', category: 'Frontend' },
  { icon: SiVuedotjs, label: 'Vue', color: '#4FC08D', category: 'Frontend' },
  { icon: SiVuetify, label: 'Vuetify', color: '#1867C0', category: 'Frontend' },
  { icon: SiAngular, label: 'Angular', color: '#DD0031', category: 'Frontend' },
  { icon: SiTailwindcss, label: 'Tailwind', color: '#06B6D4', category: 'Frontend' },
  { icon: SiNodedotjs, label: 'Node.js', color: '#339933', category: 'Backend' },
  { icon: SiExpress, label: 'Express', color: '#ffffff', category: 'Backend' },
  { icon: SiSpringboot, label: 'Spring Boot', color: '#6DB33F', category: 'Backend' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1', category: 'Database & Tools' },
  { icon: SiMongodb, label: 'MongoDB', color: '#47A248', category: 'Database & Tools' },
  { icon: SiMariadb, label: 'MariaDB', color: '#003545', category: 'Database & Tools' },
  { icon: SiDocker, label: 'Docker', color: '#2496ED', category: 'Database & Tools' },
  { icon: SiGit, label: 'Git', color: '#F05032', category: 'Database & Tools' },
]

export const skillCategories = ['Frontend', 'Backend', 'Database & Tools'] as const

export const currentPositions = [
  { role: 'Front-End Developer', company: 'Lupy Games' },
  { role: 'Team Lead', company: 'Montway Auto Transport' },
]

export const experience = [
  {
    title: 'Front-End Developer — Lupy Games',
    period: 'Apr 2024 — Present',
    desc: 'Led full platform migration from WordPress to Next.js. Drove user engagement through gamification: achievements, ranks, level progression, and customizable themes.',
  },
  {
    title: 'Team Lead — Montway Auto Transport',
    period: 'Sep 2016 — Present',
    desc: 'Lead a LiveChat team at one of the largest auto transport companies in the U.S. Drive performance through coaching, one-on-ones, KPI tracking, and Salesforce reporting.',
    roles: [
      { role: 'Team Lead', period: '2022 — Present' },
      { role: 'Senior Sales Specialist', period: '2020 — 2022' },
      { role: 'Sales Specialist', period: '2018 — 2020' },
      { role: 'Transport Coordinator', period: '2016 — 2018' },
    ],
  },
  {
    title: 'Front-End Developer — Vola',
    period: 'Jul 2023 — Feb 2024',
    desc: 'Architected a full-stack jewellery inventory management system (Vue3, Vuex, Spring Boot, PostgreSQL, Docker). Delivered real-time sales tracking and multi-role access.',
  },
  {
    title: 'Sales Support Specialist — Sutherland',
    period: 'Jan 2018 — Apr 2018',
    desc: 'Phone sales & support for GoDaddy — product inquiries, account issues & upselling.',
  },
  {
    title: 'Game Tester — Gameloft',
    period: 'Jun 2014 — Aug 2014',
    desc: 'Tested mobile games across the full Apple device lineup, reporting bugs across all screen sizes and iOS versions.',
  },
]

export const links = [
  { label: 'GitHub', href: 'https://github.com/dimitrov93', icon: 'github' as const },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/tsvetomir-dimitrov', icon: 'linkedin' as const },
  { label: 'Website', href: 'https://dimitrov93.eu', icon: 'website' as const },
]

export const education = [
  {
    title: 'SoftUni — Computer Software Engineering',
    period: '2021 — 2022',
    desc: 'JavaScript Web Developer · Grade: 6 (Excellent)',
  },
  {
    title: "UNWE — Bachelor's, Accounting & Finance",
    period: '2012 — 2016',
    desc: "Bachelor's degree in Accounting and Finance.",
  },
]

export const certifications = [
  { title: 'Front-End Developer with JavaScript', source: 'SoftUni', year: "'21–'22", pdf: '/certs/softuni-frontend-diploma.pdf' },
  { title: 'ReactJS', source: 'SoftUni', year: "'22", pdf: '/certs/softuni-reactjs.pdf' },
  { title: 'Angular', source: 'SoftUni', year: "'22", pdf: '/certs/softuni-angular.pdf' },
  { title: 'JS Applications', source: 'SoftUni', year: "'22", pdf: '/certs/softuni-js-applications.pdf' },
  { title: 'JS Back-End', source: 'SoftUni', year: "'22", pdf: '/certs/softuni-js-backend.pdf' },
  { title: 'HTML & CSS', source: 'SoftUni', year: "'22", pdf: '/certs/softuni-html-css.pdf' },
  { title: 'Programming Basics', source: 'SoftUni', year: "'21", pdf: '/certs/softuni-programming-basics.pdf' },
  { title: 'QA Automation', source: 'SoftUni', year: "'22", pdf: '/certs/softuni-qa-automation.pdf' },
  { title: 'QA Fundamentals', source: 'SoftUni', year: "'22", pdf: '/certs/softuni-qa-fundamentals.pdf' },
  { title: 'Microsoft Excel Advanced', source: 'SoftUni', year: "'22", pdf: '/certs/softuni-excel-advanced.pdf' },
  { title: 'Microsoft Excel Fundamentals', source: 'SoftUni', year: "'22", pdf: '/certs/softuni-excel-fundamentals.pdf' },
  { title: 'Microservices with React & Node.js', source: 'Udemy', year: "'23", pdf: '/certs/microservices-node-react-2023.jpg' },
  { title: 'Next.js', source: 'Udemy', year: "'23", pdf: '/certs/next-udemy-2023.jpg' },
  { title: 'Vue & Vuex', source: 'Udemy', year: "'23", pdf: '/certs/vue-udemy-2023.jpg' },
  { title: 'Java Basic, OOP & Web', source: 'Vola Software', year: "'22", pdf: '/certs/vola-certificate-Issued-may-22.jpeg' },
]

export const certSources = ['All', 'SoftUni', 'Udemy', 'Vola Software'] as const
