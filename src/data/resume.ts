import {
  SiReact, SiNextdotjs, SiTypescript, SiJavascript,
  SiVuedotjs, SiAngular, SiTailwindcss, SiNodedotjs,
  SiExpress, SiSpringboot, SiPostgresql, SiMongodb,
  SiMariadb, SiDocker, SiGit, SiRedux, SiVuetify,
  SiGooglechrome, SiOpenjdk, SiSupabase, SiMysql,
  SiVitest, SiTestinglibrary, SiGithubactions, SiVercel, SiStripe,
} from 'react-icons/si'
import { FaTheaterMasks } from 'react-icons/fa'

export const skills = [
  { icon: SiReact, label: 'React', color: '#61DAFB', category: 'Frontend' },
  { icon: SiNextdotjs, label: 'Next.js', color: 'currentColor', category: 'Frontend' },
  { icon: SiRedux, label: 'Redux', color: '#764ABC', category: 'Frontend' },
  { icon: SiTypescript, label: 'TypeScript', color: '#3178C6', category: 'Frontend' },
  { icon: SiJavascript, label: 'JavaScript', color: '#F7DF1E', category: 'Frontend' },
  { icon: SiVuedotjs, label: 'Vue', color: '#4FC08D', category: 'Frontend' },
  { icon: SiVuetify, label: 'Vuetify', color: '#1867C0', category: 'Frontend' },
  { icon: SiAngular, label: 'Angular', color: '#DD0031', category: 'Frontend' },
  { icon: SiTailwindcss, label: 'Tailwind', color: '#06B6D4', category: 'Frontend' },
  { icon: SiGooglechrome, label: 'Chrome Extensions', color: '#4285F4', category: 'Frontend' },
  { icon: SiNodedotjs, label: 'Node.js', color: '#339933', category: 'Backend' },
  { icon: SiExpress, label: 'Express', color: 'currentColor', category: 'Backend' },
  { icon: SiOpenjdk, label: 'Java', color: '#E76F00', category: 'Backend' },
  { icon: SiSpringboot, label: 'Spring Boot', color: '#6DB33F', category: 'Backend' },
  { icon: SiSupabase, label: 'Supabase', color: '#3FCF8E', category: 'Backend' },
  { icon: SiPostgresql, label: 'PostgreSQL', color: '#4169E1', category: 'Database' },
  { icon: SiMysql, label: 'MySQL', color: '#4479A1', category: 'Database' },
  { icon: SiMongodb, label: 'MongoDB', color: '#47A248', category: 'Database' },
  { icon: SiMariadb, label: 'MariaDB', color: '#003545', category: 'Database' },
  { icon: FaTheaterMasks, label: 'Playwright', color: '#2EAD33', category: 'Testing' },
  { icon: SiVitest, label: 'Vitest', color: '#6E9F18', category: 'Testing' },
  { icon: SiTestinglibrary, label: 'Testing Library', color: '#E33332', category: 'Testing' },
  { icon: SiDocker, label: 'Docker', color: '#2496ED', category: 'DevOps & Tools' },
  { icon: SiGithubactions, label: 'GitHub Actions', color: '#2088FF', category: 'DevOps & Tools' },
  { icon: SiVercel, label: 'Vercel', color: 'currentColor', category: 'DevOps & Tools' },
  { icon: SiStripe, label: 'Stripe', color: '#635BFF', category: 'DevOps & Tools' },
  { icon: SiGit, label: 'Git', color: '#F05032', category: 'DevOps & Tools' },
]

export const skillCategories = ['Frontend', 'Backend', 'Database', 'Testing', 'DevOps & Tools'] as const

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
