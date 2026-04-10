import type { IconType } from 'react-icons'
import { SiJavascript, SiReact, SiAngular, SiNextdotjs, SiTrpc } from 'react-icons/si'
import type { TranslationKey } from './translations'

export type Framework = 'JavaScript' | 'React' | 'Angular' | 'Next.js' | 'T3 Stack'

export interface Project {
  id: string
  titleKey: TranslationKey
  framework: Framework
  descriptionKey: TranslationKey
  image: string
  github: string
  demo: string
  createdAt: string
}

export const frameworkIcons: Record<Framework, IconType> = {
  'JavaScript': SiJavascript,
  'React': SiReact,
  'Angular': SiAngular,
  'Next.js': SiNextdotjs,
  'T3 Stack': SiTrpc,
}

export const frameworkColors: Record<Framework, string> = {
  'JavaScript': '#F7DF1E',
  'React': '#61DAFB',
  'Angular': '#DD0031',
  'Next.js': '#ffffff',
  'T3 Stack': '#398CCB',
}

export const projects: Project[] = [
  {
    id: '649d3738155933e911b5048d',
    titleKey: 'projects.fairyTale.title',
    framework: 'React',
    descriptionKey: 'projects.fairyTale.desc',
    image: 'https://raw.githubusercontent.com/dimitrov93/Projects/refs/heads/main/react-portfolio/client/src/assets/portfolio5.png?raw=true',
    github: 'https://github.com/dimitrov93/party-agency',
    demo: 'https://fairy-tale.bg/',
    createdAt: '2024-06-15T10:00:00.000Z',
  },
  {
    id: '649d38ce155933e911b504a1',
    titleKey: 'projects.adminPanel.title',
    framework: 'React',
    descriptionKey: 'projects.adminPanel.desc',
    image: 'https://raw.githubusercontent.com/dimitrov93/Projects/refs/heads/main/react-portfolio/client/src/assets/portfolio8.png?raw=true',
    github: 'https://github.com/dimitrov93/Projects/tree/main/react-admin-pannel',
    demo: 'https://admin-pannel-nine.vercel.app/',
    createdAt: '2024-04-10T10:00:00.000Z',
  },
  {
    id: '63e9fe08a47de9ef35213828',
    titleKey: 'projects.officeBoard.title',
    framework: 'Angular',
    descriptionKey: 'projects.officeBoard.desc',
    image: 'https://raw.githubusercontent.com/dimitrov93/Projects/refs/heads/main/react-portfolio/client/src/assets/portfolio4.jpg?raw=true',
    github: 'https://github.com/dimitrov93/Projects/tree/main/angular-office-board',
    demo: 'https://angular-office-board-dimitrov93.vercel.app/',
    createdAt: '2024-02-20T10:00:00.000Z',
  },
  {
    id: '649d3eb1155933e911b504ac',
    titleKey: 'projects.twitterClone.title',
    framework: 'T3 Stack',
    descriptionKey: 'projects.twitterClone.desc',
    image: 'https://raw.githubusercontent.com/dimitrov93/Projects/refs/heads/main/react-portfolio/client/src/assets/portfolio9.png?raw=true',
    github: 'https://github.com/dimitrov93/Projects/tree/main/nextjs-twitter-clone',
    demo: 'https://twitter-clone-dimitrov93.vercel.app/',
    createdAt: '2023-12-05T10:00:00.000Z',
  },
  {
    id: '649d37ca155933e911b50497',
    titleKey: 'projects.foodRecipes.title',
    framework: 'Next.js',
    descriptionKey: 'projects.foodRecipes.desc',
    image: 'https://raw.githubusercontent.com/dimitrov93/Projects/refs/heads/main/react-portfolio/client/src/assets/portfolio6.png?raw=true',
    github: 'https://github.com/dimitrov93/Projects/tree/main/nextjs-receipt-app',
    demo: 'https://receipt-food-dimitrov93.vercel.app/',
    createdAt: '2023-09-15T10:00:00.000Z',
  },
  {
    id: '649d387c155933e911b5049c',
    titleKey: 'projects.blogPosts.title',
    framework: 'Next.js',
    descriptionKey: 'projects.blogPosts.desc',
    image: 'https://raw.githubusercontent.com/dimitrov93/Projects/refs/heads/main/react-portfolio/client/src/assets/portfolio7.png?raw=true',
    github: 'https://github.com/dimitrov93/Projects/tree/main/nextjs-blog-posts-app',
    demo: 'https://blog-posts-two-rho.vercel.app/',
    createdAt: '2023-08-20T10:00:00.000Z',
  },
  {
    id: '63e9fde0a47de9ef35213826',
    titleKey: 'projects.xoxoStore.title',
    framework: 'React',
    descriptionKey: 'projects.xoxoStore.desc',
    image: 'https://raw.githubusercontent.com/dimitrov93/Projects/refs/heads/main/react-portfolio/client/src/assets/portfolio3.jpg?raw=true',
    github: 'https://github.com/dimitrov93/Projects/tree/main/react-xoxoStore',
    demo: 'https://xoxo-store-dimitrov93.vercel.app/',
    createdAt: '2023-05-10T10:00:00.000Z',
  },
  {
    id: '63e9f95034f4826ac40e0bf7',
    titleKey: 'projects.pacman.title',
    framework: 'JavaScript',
    descriptionKey: 'projects.pacman.desc',
    image: 'https://raw.githubusercontent.com/dimitrov93/Projects/refs/heads/main/react-portfolio/client/src/assets/portfolio1.jpg',
    github: 'https://github.com/dimitrov93/Projects/tree/main/javascript-pacman',
    demo: 'https://packman-dimitrov93.netlify.app/',
    createdAt: '2023-03-05T10:00:00.000Z',
  },
  {
    id: '63e9fab4a47de9ef35213819',
    titleKey: 'projects.spaceInvaders.title',
    framework: 'JavaScript',
    descriptionKey: 'projects.spaceInvaders.desc',
    image: 'https://github.com/dimitrov93/Projects/blob/main/react-portfolio/client/src/assets/portfolio2.jpg?raw=true',
    github: 'https://github.com/dimitrov93/Projects/tree/main/javascript-space-invaders',
    demo: 'https://space-invaders-dimitrov93.netlify.app/',
    createdAt: '2023-02-13T10:00:00.000Z',
  },
]
