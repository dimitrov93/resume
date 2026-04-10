const translations = {
  en: {
    'nav.about': 'About',
    'nav.resume': 'Resume',
    'nav.certifications': 'Certifications',
    'nav.portfolio': 'Portfolio',
    'nav.contact': 'Contact',
    'page.aboutMe': 'About Me',

    'about.available': 'Available for freelance & opportunities',
    'about.bio1':
      'Dual-role professional: Front-End Developer at Lupy Games and Team Lead at Montway Auto Transport, overseeing a LiveChat team. On one side, building scalable React/Next.js applications with clean architecture. On the other, running one-on-ones, monitoring performance, and developing team members day-to-day.',
    'about.bio2':
      'A developer with genuine people management experience — in the field, not just on paper. Passionate about turning complex problems into simple, performant, and intuitive interfaces.',
    'about.whatImDoing': "What I'm Doing",
    'about.mySkills': 'My Skills',
    'about.featuredProject': 'Featured Project',
    'about.lupyDesc': 'Led the full platform migration from WordPress to Next.js 14, and continued upgrading through versions 15 and 16. Drove user engagement through gamification — achievements, ranks, level progression, and customizable themes/skins for a personalized experience. Built real-time notifications, leaderboards, user profile pages, and multi-language support. Continuously iterating on features and UX to keep pace with evolving community needs and modern web standards.',
    'about.visitSite': 'Visit Site',
    'about.webDesign': 'Web Design',
    'about.webDesignDesc':
      'Clean, modern UI/UX built with attention to detail and user experience.',
    'about.webDev': 'Web Development',
    'about.webDevDesc':
      'Scalable React & Next.js applications with clean architecture.',
    'about.teamLead': 'Team Leadership',
    'about.teamLeadDesc':
      'Coaching, mentoring and driving team performance through one-on-ones and KPI tracking.',
    'about.fullStack': 'Full-Stack Solutions',
    'about.fullStackDesc':
      'End-to-end applications with MongoDB, Express, React, and Node.js (MERN stack).',
    'about.focus': 'Focus',
    'about.currentlyLearning': 'Currently Learning',
    'about.learningDesc':
      'Expanding into generative AI and building intelligent, production-grade apps on top of Node.js. Currently working through the Generative AI for Node.js: OpenAI, LangChain — TypeScript Udemy course, and getting hands-on with Claude and the broader Anthropic ecosystem.',
    'about.liveProject': 'Live Project',

    'resume.currently': 'Currently',
    'resume.experience': 'Experience',
    'resume.education': 'Education',
    'resume.careerProgression': 'Career Progression',

    'exp.lupyTitle': 'Front-End Developer — Lupy Games',
    'exp.lupyPeriod': 'Apr 2024 — Present',
    'exp.lupyDesc':
      'Led full platform migration from WordPress to Next.js. Drove user engagement through gamification: achievements, ranks, level progression, and customizable themes.',
    'exp.montwayTitle': 'Team Lead — Montway Auto Transport',
    'exp.montwayPeriod': 'Sep 2016 — Present',
    'exp.montwayDesc':
      'Lead a LiveChat team at one of the largest auto transport companies in the U.S. Drive performance through coaching, one-on-ones, KPI tracking, and Salesforce reporting.',
    'exp.volaTitle': 'Front-End Developer — Vola',
    'exp.volaPeriod': 'Jul 2023 — Feb 2024',
    'exp.volaDesc':
      'Architected a full-stack jewellery inventory management system (Vue3, Vuex, Spring Boot, PostgreSQL, Docker). Delivered real-time sales tracking and multi-role access.',
    'exp.sutherlandTitle': 'Sales Support Specialist — Sutherland',
    'exp.sutherlandPeriod': 'Jan 2018 — Apr 2018',
    'exp.sutherlandDesc':
      'Phone sales & support for GoDaddy — product inquiries, account issues & upselling.',
    'exp.gameloftTitle': 'Game Tester — Gameloft',
    'exp.gameloftPeriod': 'Jun 2014 — Aug 2014',
    'exp.gameloftDesc':
      'Tested mobile games across the full Apple device lineup, reporting bugs across all screen sizes and iOS versions.',

    'role.teamLead': 'Team Lead',
    'role.seniorSales': 'Senior Sales Specialist',
    'role.sales': 'Sales Specialist',
    'role.coordinator': 'Transport Coordinator',

    'current.frontEnd': 'Front-End Developer',
    'current.teamLead': 'Team Lead',

    'edu.softuni': 'SoftUni — Computer Software Engineering',
    'edu.softuniPeriod': '2021 — 2022',
    'edu.softuniDesc': 'JavaScript Web Developer · Grade: 6 (Excellent)',
    'edu.unwe': "UNWE — Bachelor's, Accounting & Finance",
    'edu.unwePeriod': '2012 — 2016',
    'edu.unweDesc': "Bachelor's degree in Accounting and Finance.",

    'portfolio.projects': 'Projects',
    'portfolio.sort': 'Sort',
    'portfolio.newest': 'Newest',
    'portfolio.oldest': 'Oldest',
    'portfolio.az': 'A → Z',
    'portfolio.za': 'Z → A',
    'portfolio.loadMore': 'Load More',
    'portfolio.failed': 'Failed to load projects.',
    'portfolio.retry': 'Retry',
    'portfolio.featured': 'Featured',
    'portfolio.lupyDesc': 'Gamified platform with achievements, ranks, leaderboards, customizable themes, and multi-language support. Migrated from WordPress to Next.js 14→16.',
    'portfolio.otherProjects': 'Other Projects',
    'portfolio.project': 'Project',
    'portfolio.source': 'Source',
    'portfolio.liveDemo': 'Live Demo',
    'portfolio.all': 'All',

    'projects.pacman.title': 'Pac-Man',
    'projects.pacman.desc':
      'Classic arcade Pac-Man recreated in vanilla JavaScript with collision detection, maze navigation, and ghost AI.',
    'projects.spaceInvaders.title': 'Space Invaders',
    'projects.spaceInvaders.desc':
      'Recreation of the 1978 arcade classic built with the HTML5 Canvas API and vanilla JavaScript.',
    'projects.xoxoStore.title': 'xoxo Store',
    'projects.xoxoStore.desc':
      'E-commerce storefront with product catalog, shopping cart, and checkout flow.',
    'projects.officeBoard.title': 'Office Board',
    'projects.officeBoard.desc':
      'Team collaboration board for posting announcements, tasks, and daily office updates.',
    'projects.fairyTale.title': 'Fairy Tale',
    'projects.fairyTale.desc':
      "Party agency website showcasing children's event services, packages, and bookings.",
    'projects.foodRecipes.title': 'Food Recipes',
    'projects.foodRecipes.desc':
      'Recipe discovery app with categorized meals and detailed cooking instructions.',
    'projects.blogPosts.title': 'Blog Posts',
    'projects.blogPosts.desc':
      'Simple blog platform with post listing and individual article pages.',
    'projects.adminPanel.title': 'Admin Panel',
    'projects.adminPanel.desc':
      'Dashboard UI with data tables, charts, and user management views.',
    'projects.twitterClone.title': 'Twitter Clone',
    'projects.twitterClone.desc':
      'Twitter-like social feed built with the T3 stack — Next.js, tRPC, Prisma, Tailwind.',

    'notFound.title': 'Page Not Found',
    'notFound.description':
      "The page you're looking for doesn't exist or has been moved.",
    'notFound.backHome': '← Back to Home',

    'certs.otherCerts': 'Other Certifications',
    'certs.diplomaLabel': 'SoftUni Diploma',
    'certs.trackDesc': 'Full JavaScript Web Developer track —',
    'certs.coursesCompleted': 'courses completed.',
    'certs.hideCourses': 'Hide courses',
    'certs.viewAll': 'View all',
    'certs.courses': 'courses',
    'certs.individualCourses': 'Individual Courses',
    'certs.notAdded': 'Not added yet',
    'certs.certifications': 'Certifications',
    'certs.cvPreview': 'CV Preview',
    'certs.download': 'Download',

    'contact.getInTouch': 'Get in touch',
    'contact.clickToEmail': 'Click to send me an email',
    'contact.orUseForm': 'Or use the form below',
    'contact.whereImBased': "Where I'm based",
    'contact.fullName': 'Full Name',
    'contact.yourName': 'Your name',
    'contact.email': 'Email',
    'contact.emailPlaceholder': 'your@email.com',
    'contact.subject': 'Subject',
    'contact.subjectPlaceholder': 'Say something...',
    'contact.message': 'Message',
    'contact.messagePlaceholder': 'Your message...',
    'contact.sendFailed':
      'Failed to send message. Please try again or email me directly.',
    'contact.sent': 'Message Sent!',
    'contact.thanks': 'Thanks for reaching out.',
    'contact.sendAnother': 'Send Another',
    'contact.sending': 'Sending...',
    'contact.sendMessage': 'Send Message',
    'contact.mapTitle': 'Location map',

    'a11y.toggleMenu': 'Toggle menu',
    'a11y.closeMenu': 'Close menu',
    'a11y.toggleContacts': 'Toggle contacts',
    'a11y.toggleTheme': 'Toggle theme',
    'a11y.toggleLanguage': 'Toggle language',

    'sidebar.previewCv': 'Preview CV',
    'sidebar.downloadCv': 'Download CV',
    'sidebar.showContacts': 'Show Contacts',
    'sidebar.email': 'EMAIL',
    'sidebar.phone': 'PHONE',
    'sidebar.location': 'LOCATION',
    'sidebar.role1': 'Front-End Developer',
    'sidebar.role2': 'Team Lead',
    'sidebar.role3': 'React / Next.js',
  },
  bg: {
    'nav.about': 'За мен',
    'nav.resume': 'Резюме',
    'nav.certifications': 'Сертификати',
    'nav.portfolio': 'Портфолио',
    'nav.contact': 'Контакт',
    'page.aboutMe': 'За мен',

    'about.available': 'Свободен за freelance и нови възможности',
    'about.bio1':
      'Професионалист с двойна роля: Front-End Developer в Lupy Games и Team Lead в Montway Auto Transport, управляващ LiveChat екип. От едната страна — изграждане на мащабируеми React/Next.js приложения с чиста архитектура. От другата — провеждане на one-on-one срещи, проследяване на представянето и ежедневно развитие на членовете на екипа.',
    'about.bio2':
      'Разработчик с истински опит в управлението на хора — на терен, не само на хартия. Страстен към превръщането на сложни проблеми в прости, бързи и интуитивни интерфейси.',
    'about.whatImDoing': 'Какво правя',
    'about.mySkills': 'Моите умения',
    'about.featuredProject': 'Основен проект',
    'about.lupyDesc': 'Ръководих пълната миграция на платформата от WordPress към Next.js 14 и продължих надграждането през версии 15 и 16. Повишаване на ангажираността чрез геймификация — постижения, рангове, нива и персонализируеми теми/скинове. Разработих нотификации в реално време, класации, потребителски профили и многоезична поддръжка. Непрекъснато подобряване на функционалности и UX спрямо нуждите на общността и съвременните уеб стандарти.',
    'about.visitSite': 'Посети сайта',
    'about.webDesign': 'Уеб дизайн',
    'about.webDesignDesc':
      'Чист, модерен UI/UX, изграден с внимание към детайла и потребителското изживяване.',
    'about.webDev': 'Уеб разработка',
    'about.webDevDesc':
      'Мащабируеми React & Next.js приложения с чиста архитектура.',
    'about.teamLead': 'Лидерство на екип',
    'about.teamLeadDesc':
      'Коучинг, менториране и управление на представянето на екипа чрез one-on-one срещи и проследяване на KPI.',
    'about.fullStack': 'Full-Stack решения',
    'about.fullStackDesc':
      'Цялостни приложения с MongoDB, Express, React и Node.js (MERN stack).',
    'about.focus': 'Фокус',
    'about.currentlyLearning': 'В момента уча',
    'about.learningDesc':
      'Разширявам знанията си в генеративния AI и изграждането на интелигентни, production-grade приложения върху Node.js. В момента преминавам през Udemy курса Generative AI for Node.js: OpenAI, LangChain — TypeScript и експериментирам с Claude и по-широката екосистема на Anthropic.',
    'about.liveProject': 'Активен проект',

    'resume.currently': 'В момента',
    'resume.experience': 'Опит',
    'resume.education': 'Образование',
    'resume.careerProgression': 'Кариерно развитие',

    'exp.lupyTitle': 'Front-End Developer — Lupy Games',
    'exp.lupyPeriod': 'Апр 2024 — Настояще',
    'exp.lupyDesc':
      'Ръководих пълна миграция на платформата от WordPress към Next.js. Повишаване на ангажираността на потребителите чрез геймификация: постижения, рангове, нива и персонализируеми теми.',
    'exp.montwayTitle': 'Team Lead — Montway Auto Transport',
    'exp.montwayPeriod': 'Сеп 2016 — Настояще',
    'exp.montwayDesc':
      'Ръководене на LiveChat екип в една от най-големите транспортни компании в САЩ. Управление на представянето чрез коучинг, one-on-one срещи, проследяване на KPI и отчетност в Salesforce.',
    'exp.volaTitle': 'Front-End Developer — Vola',
    'exp.volaPeriod': 'Юли 2023 — Фев 2024',
    'exp.volaDesc':
      'Проектирах full-stack система за управление на инвентар за бижута (Vue3, Vuex, Spring Boot, PostgreSQL, Docker). Реализирах проследяване на продажби в реално време и достъп за множество роли.',
    'exp.sutherlandTitle': 'Sales Support Specialist — Sutherland',
    'exp.sutherlandPeriod': 'Яну 2018 — Апр 2018',
    'exp.sutherlandDesc':
      'Телефонни продажби и поддръжка за GoDaddy — продуктови запитвания, проблеми с акаунти и ъпсейлинг.',
    'exp.gameloftTitle': 'Game Tester — Gameloft',
    'exp.gameloftPeriod': 'Юни 2014 — Авг 2014',
    'exp.gameloftDesc':
      'Тестване на мобилни игри на всички Apple устройства, докладване на бъгове за всички размери екрани и iOS версии.',

    'role.teamLead': 'Ръководител на екип',
    'role.seniorSales': 'Старши специалист продажби',
    'role.sales': 'Специалист продажби',
    'role.coordinator': 'Координатор транспорт',

    'current.frontEnd': 'Front-End разработчик',
    'current.teamLead': 'Ръководител на екип',

    'edu.softuni': 'SoftUni — Софтуерно инженерство',
    'edu.softuniPeriod': '2021 — 2022',
    'edu.softuniDesc': 'JavaScript Web Developer · Оценка: 6 (Отличен)',
    'edu.unwe': 'УНСС — Бакалавър, Счетоводство и финанси',
    'edu.unwePeriod': '2012 — 2016',
    'edu.unweDesc': 'Бакалавърска степен по Счетоводство и финанси.',

    'portfolio.projects': 'Проекти',
    'portfolio.sort': 'Подреди',
    'portfolio.newest': 'Най-нови',
    'portfolio.oldest': 'Най-стари',
    'portfolio.az': 'А → Я',
    'portfolio.za': 'Я → А',
    'portfolio.loadMore': 'Зареди още',
    'portfolio.failed': 'Неуспешно зареждане на проекти.',
    'portfolio.retry': 'Опитай отново',
    'portfolio.featured': 'Основен',
    'portfolio.lupyDesc': 'Платформа с геймификация — постижения, рангове, класации, персонализируеми теми и многоезична поддръжка. Мигрирана от WordPress към Next.js 14→16.',
    'portfolio.otherProjects': 'Други проекти',
    'portfolio.project': 'Проект',
    'portfolio.source': 'Код',
    'portfolio.liveDemo': 'Демо',
    'portfolio.all': 'Всички',

    'projects.pacman.title': 'Pac-Man',
    'projects.pacman.desc':
      'Класическата аркадна игра Pac-Man, пресъздадена с чист JavaScript — с откриване на колизии, навигация в лабиринта и изкуствен интелект за призраците.',
    'projects.spaceInvaders.title': 'Space Invaders',
    'projects.spaceInvaders.desc':
      'Пресъздаване на аркадната класика от 1978 г. с HTML5 Canvas API и чист JavaScript.',
    'projects.xoxoStore.title': 'xoxo Store',
    'projects.xoxoStore.desc':
      'Онлайн магазин с продуктов каталог, количка и цялостен процес на поръчка.',
    'projects.officeBoard.title': 'Office Board',
    'projects.officeBoard.desc':
      'Табло за екипна работа с публикуване на съобщения, задачи и ежедневни офис актуализации.',
    'projects.fairyTale.title': 'Fairy Tale',
    'projects.fairyTale.desc':
      'Сайт на агенция за детски партита с услуги, пакети и резервации.',
    'projects.foodRecipes.title': 'Food Recipes',
    'projects.foodRecipes.desc':
      'Приложение за откриване на рецепти с категоризирани ястия и подробни инструкции за готвене.',
    'projects.blogPosts.title': 'Blog Posts',
    'projects.blogPosts.desc':
      'Проста блог платформа със списък на публикации и отделни страници за всяка статия.',
    'projects.adminPanel.title': 'Admin Panel',
    'projects.adminPanel.desc':
      'Админ интерфейс с таблици с данни, графики и управление на потребители.',
    'projects.twitterClone.title': 'Twitter Clone',
    'projects.twitterClone.desc':
      'Социален feed в стила на Twitter, изграден с T3 стека — Next.js, tRPC, Prisma, Tailwind.',

    'notFound.title': 'Страницата не е намерена',
    'notFound.description':
      'Страницата, която търсите, не съществува или е преместена.',
    'notFound.backHome': '← Обратно към началото',

    'certs.otherCerts': 'Други сертификати',
    'certs.diplomaLabel': 'Диплома от SoftUni',
    'certs.trackDesc': 'Пълен курс JavaScript Web Developer —',
    'certs.coursesCompleted': 'завършени курса.',
    'certs.hideCourses': 'Скрий курсовете',
    'certs.viewAll': 'Виж всички',
    'certs.courses': 'курса',
    'certs.individualCourses': 'Отделни курсове',
    'certs.notAdded': 'Все още не е добавен',
    'certs.certifications': 'Сертификати',
    'certs.cvPreview': 'Преглед на CV',
    'certs.download': 'Изтегли',

    'contact.getInTouch': 'Свържете се',
    'contact.clickToEmail': 'Натиснете, за да ми изпратите имейл',
    'contact.orUseForm': 'Или използвайте формата по-долу',
    'contact.whereImBased': 'Къде се намирам',
    'contact.fullName': 'Пълно име',
    'contact.yourName': 'Вашето име',
    'contact.email': 'Имейл',
    'contact.emailPlaceholder': 'вашият@имейл.com',
    'contact.subject': 'Тема',
    'contact.subjectPlaceholder': 'Напишете нещо...',
    'contact.message': 'Съобщение',
    'contact.messagePlaceholder': 'Вашето съобщение...',
    'contact.sendFailed':
      'Неуспешно изпращане. Моля, опитайте отново или ми пишете директно на имейла.',
    'contact.sent': 'Съобщението е изпратено!',
    'contact.thanks': 'Благодаря, че се свързахте.',
    'contact.sendAnother': 'Изпрати ново',
    'contact.sending': 'Изпращане...',
    'contact.sendMessage': 'Изпрати',
    'contact.mapTitle': 'Карта на местоположението',

    'a11y.toggleMenu': 'Отвори/затвори менюто',
    'a11y.closeMenu': 'Затвори менюто',
    'a11y.toggleContacts': 'Покажи/скрий контактите',
    'a11y.toggleTheme': 'Смени темата',
    'a11y.toggleLanguage': 'Смени езика',

    'sidebar.previewCv': 'Преглед на CV',
    'sidebar.downloadCv': 'Изтегли CV',
    'sidebar.showContacts': 'Покажи контакти',
    'sidebar.email': 'ИМЕЙЛ',
    'sidebar.phone': 'ТЕЛЕФОН',
    'sidebar.location': 'ЛОКАЦИЯ',
    'sidebar.role1': 'Front-End разработчик',
    'sidebar.role2': 'Ръководител на екип',
    'sidebar.role3': 'React / Next.js',
  },
} as const

export type TranslationKey = keyof (typeof translations)['en']
export default translations
