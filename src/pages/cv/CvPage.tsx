import { useEffect, useRef, useState, type ChangeEvent } from 'react'
import './cv.css'
import {
  THEMES,
  applyTheme,
  buildZip,
  buildStandaloneHtml,
  downloadBlob,
  fetchAsDataUrl,
  type Theme,
} from './cvHelpers'

async function loadTemplate(): Promise<string> {
  const mod = await import('../../cv-tsvetomir-dimitrov.html?raw')
  return mod.default
}

const STORAGE_KEY = 'cv_td_v1'
const THEME_KEY = 'cv_theme'

const EDITABLE_SELECTORS = [
  '.monogram',
  '.header h1',
  '.job-title-header',
  '.contact-item span',
  '.about-text',
  '.skill-cat',
  '.skill-chip',
  '.cert-group-label',
  '.cert-name',
  '.cert-year',
  '.company',
  '.period',
  '.location',
  '.role',
  '.role-past',
  '.job-content ul li',
  '.job-content p',
].join(', ')

export default function CvPage() {
  const rootRef = useRef<HTMLDivElement>(null)
  const pageRef = useRef<HTMLDivElement>(null)
  const photoWrapRef = useRef<HTMLDivElement>(null)
  const photoInputRef = useRef<HTMLInputElement>(null)
  const [editMode, setEditMode] = useState(false)
  const [themePickerOpen, setThemePickerOpen] = useState(false)
  const [activeTheme, setActiveTheme] = useState<string>('Classic')

  useEffect(() => {
    const prevTitle = document.title
    document.title = 'Tsvetomir Dimitrov — CV'
    return () => { document.title = prevTitle }
  }, [])

  useEffect(() => {
    const page = pageRef.current
    if (!page) return
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      try {
        const data = JSON.parse(raw)
        if (data.html) page.innerHTML = data.html
      } catch { /* ignore */ }
    }
    page.querySelectorAll<HTMLElement>(EDITABLE_SELECTORS).forEach((el) => {
      if (!el.hasAttribute('contenteditable')) el.setAttribute('contenteditable', 'false')
    })

    const root = rootRef.current
    if (root) {
      const savedTheme = localStorage.getItem(THEME_KEY)
      if (savedTheme) {
        const t = THEMES.find((x) => x.name === savedTheme)
        if (t) {
          applyTheme(root, t)
          setActiveTheme(t.name)
        }
      }
    }
  }, [])

  useEffect(() => {
    const root = rootRef.current
    const page = pageRef.current
    if (!root || !page) return
    root.classList.toggle('edit-mode', editMode)
    page.querySelectorAll<HTMLElement>('[contenteditable]').forEach((el) => {
      el.contentEditable = editMode ? 'true' : 'false'
    })
  }, [editMode])

  useEffect(() => {
    const page = pageRef.current
    if (!page) return
    const handler = () => {
      if (!editMode) return
      autosave()
    }
    page.addEventListener('input', handler)
    return () => page.removeEventListener('input', handler)
  }, [editMode])

  useEffect(() => {
    if (!themePickerOpen) return
    const onDocClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (!target.closest('#theme-picker') && !target.closest('#btn-theme')) {
        setThemePickerOpen(false)
      }
    }
    document.addEventListener('click', onDocClick)
    return () => document.removeEventListener('click', onDocClick)
  }, [themePickerOpen])

  function autosave() {
    const page = pageRef.current
    if (!page) return
    const photoEl = page.querySelector<HTMLImageElement>('#photo-el')
    const photoData = photoEl ? photoEl.src : null
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ html: page.innerHTML, photo: photoData }))
  }

  function toggleEdit() {
    setEditMode((prev) => {
      const next = !prev
      if (!next) setTimeout(autosave, 0)
      return next
    })
  }

  function handlePhoto(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const wrap = photoWrapRef.current
      if (!wrap) return
      const existing = wrap.querySelector('#photo-el')
      if (existing) existing.remove()
      const img = document.createElement('img')
      img.id = 'photo-el'
      img.src = ev.target!.result as string
      wrap.insertBefore(img, wrap.querySelector('.photo-overlay'))
      autosave()
    }
    reader.readAsDataURL(file)
  }

  function handleApplyTheme(t: Theme) {
    const root = rootRef.current
    if (!root) return
    applyTheme(root, t)
    setActiveTheme(t.name)
    localStorage.setItem(THEME_KEY, t.name)
  }

  async function ensurePhotoEmbedded() {
    const page = pageRef.current
    if (!page) return
    const img = page.querySelector<HTMLImageElement>('#photo-el')
    if (!img || img.src.startsWith('data:')) return
    const dataUrl = await fetchAsDataUrl(img.src)
    if (dataUrl) {
      img.src = dataUrl
      autosave()
    }
  }

  function getCurrentThemeOverride(): Theme | null {
    return THEMES.find((t) => t.name === activeTheme) || null
  }

  async function downloadCurrentHtml() {
    const wasEditing = editMode
    if (wasEditing) setEditMode(false)
    await ensurePhotoEmbedded()
    const page = pageRef.current
    if (!page) return
    const template = await loadTemplate()
    const html = buildStandaloneHtml({
      template,
      pageInnerHtml: page.innerHTML,
      theme: getCurrentThemeOverride(),
    })
    const themeSlug = (getCurrentThemeOverride()?.name ?? 'classic').toLowerCase()
    downloadBlob(new Blob([html], { type: 'text/html' }), `cv-tsvetomir-dimitrov-${themeSlug}.html`)
    if (wasEditing) setEditMode(true)
  }

  async function downloadAllThemes() {
    const wasEditing = editMode
    if (wasEditing) setEditMode(false)
    await ensurePhotoEmbedded()
    const page = pageRef.current
    if (!page) return
    const template = await loadTemplate()
    const innerHtml = page.innerHTML
    const files = THEMES.map((t) => ({
      name: `cv-tsvetomir-dimitrov-${t.name.toLowerCase()}.html`,
      data: buildStandaloneHtml({ template, pageInnerHtml: innerHtml, theme: t }),
    }))
    const zip = buildZip(files)
    const blob = new Blob([zip.buffer as ArrayBuffer], { type: 'application/zip' })
    downloadBlob(blob, 'cv-tsvetomir-dimitrov-all-themes.zip')
    if (wasEditing) setEditMode(true)
  }

  function clearSaved() {
    if (confirm('Reset all changes and reload?')) {
      localStorage.removeItem(STORAGE_KEY)
      localStorage.removeItem(THEME_KEY)
      location.reload()
    }
  }

  return (
    <div ref={rootRef} className="cv-root">
      <div id="toolbar">
        <span>TD · CV</span>
        <div className="tb-sep"></div>
        <button className={`tb-btn${editMode ? ' active' : ''}`} id="btn-edit" onClick={toggleEdit}>
          {editMode ? '✅ Done Editing' : '✏️ Edit Mode'}
        </button>
        <button className="tb-btn" id="btn-save" onClick={downloadCurrentHtml}>⬇ Download</button>
        <button className="tb-btn" onClick={downloadAllThemes}>⬇ All Themes</button>
        <button className="tb-btn" id="btn-pdf" onClick={() => window.print()}>🖨 Print / PDF</button>
        <div className="tb-sep"></div>
        <div style={{ position: 'relative' }}>
          <button
            className="tb-btn"
            id="btn-theme"
            onClick={(e) => {
              e.stopPropagation()
              setThemePickerOpen((v) => !v)
            }}
          >
            🎨 Theme
          </button>
          {themePickerOpen && (
            <div
              id="theme-picker"
              style={{
                position: 'absolute',
                top: 44,
                left: '50%',
                transform: 'translateX(-50%)',
                background: '#1a2a42',
                border: '1px solid rgba(255,255,255,0.15)',
                borderRadius: 12,
                padding: '12px 16px',
                whiteSpace: 'nowrap',
                zIndex: 100,
                boxShadow: '0 8px 32px rgba(0,0,0,0.45)',
              }}
            >
              <div
                style={{
                  fontFamily: 'Arial, sans-serif',
                  fontSize: 9,
                  letterSpacing: 2,
                  textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.45)',
                  marginBottom: 10,
                  textAlign: 'center',
                }}
              >
                Select Theme
              </div>
              <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
                {THEMES.map((t) => (
                  <div
                    key={t.name}
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 5, cursor: 'pointer' }}
                    onClick={() => handleApplyTheme(t)}
                  >
                    <div
                      title={t.name}
                      style={{
                        width: 28,
                        height: 28,
                        borderRadius: '50%',
                        background: `linear-gradient(135deg, ${t.accent} 50%, ${t.dark} 50%)`,
                        cursor: 'pointer',
                        transition: 'transform 0.15s',
                        outline: activeTheme === t.name ? '2px solid #fff' : 'none',
                        outlineOffset: 2,
                      }}
                    />
                    <div
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: 8,
                        color: 'rgba(255,255,255,0.6)',
                        letterSpacing: 0.5,
                        textAlign: 'center',
                      }}
                    >
                      {t.name}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="tb-sep"></div>
        <button className="tb-btn" id="btn-clear" onClick={clearSaved} title="Reset to last saved version">
          ↺ Reset
        </button>
      </div>

      <div ref={pageRef} className="page" id="cv-page">
        <header className="header">
          <div className="monogram">T | D</div>
          <h1>Tsvetomir Dimitrov</h1>
          <div className="divider-wrap">
            <span className="job-title-header">Front-End Developer</span>
          </div>
          <div className="contacts">
            <div className="contact-item">
              <div className="contact-icon">📍</div>
              <span>Montana, Bulgaria</span>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📞</div>
              <span>+359 884 334 998</span>
            </div>
            <div className="contact-item">
              <div className="contact-icon">📧</div>
              <span>ts.dimitrov93@gmail.com</span>
            </div>
          </div>
        </header>

        <div className="body">
          <aside className="sidebar">
            <div ref={photoWrapRef} className="photo-wrap" id="photo-wrap">
              <img id="photo-el" src="/hero.png" alt="Tsvetomir Dimitrov" />
              <div
                className="photo-overlay edit-visible"
                onClick={() => photoInputRef.current?.click()}
              >
                <span>Change photo</span>
              </div>
              <input
                ref={photoInputRef}
                type="file"
                id="photo-input"
                accept="image/*"
                onChange={handlePhoto}
              />
            </div>

            <div className="s-section">
              <h2>About Me</h2>
              <p className="about-text">
                Dual-role professional: Front-End Developer at Lupy Games and Team Lead at Montway Auto
                Transport, overseeing a LiveChat team. On one side, building scalable
                React/Next.js applications with clean architecture. On the other, running one-on-ones,
                monitoring performance, and developing team members day-to-day. A developer with genuine
                people management experience — in the field, not just on paper.
              </p>
            </div>

            <div className="s-section">
              <h2>Skills</h2>

              <div className="skill-cat">Frontend</div>
              <div className="skill-chips">
                <span className="skill-chip">React</span>
                <span className="skill-chip">Next.js</span>
                <span className="skill-chip">TypeScript</span>
                <span className="skill-chip">JavaScript</span>
                <span className="skill-chip">Vue</span>
                <span className="skill-chip">Angular</span>
              </div>

              <div className="skill-cat">Backend</div>
              <div className="skill-chips">
                <span className="skill-chip">Node.js</span>
                <span className="skill-chip">Express</span>
                <span className="skill-chip">Spring Boot</span>
              </div>

              <div className="skill-cat">Database &amp; Tools</div>
              <div className="skill-chips">
                <span className="skill-chip">MongoDB</span>
                <span className="skill-chip">PostgreSQL</span>
                <span className="skill-chip">MariaDB</span>
                <span className="skill-chip">Docker</span>
                <span className="skill-chip">Git</span>
              </div>
            </div>

            <div className="s-section">
              <h2>Certifications</h2>

              <div className="cert-group">
                <div className="cert-group-label">Udemy</div>
                <ul className="cert-list">
                  <li>
                    <span className="cert-name">Microservices with React &amp; Node.js</span>
                    <span className="cert-year">'23</span>
                  </li>
                  <li>
                    <span className="cert-name">Next.js</span>
                    <span className="cert-year">'23</span>
                  </li>
                  <li>
                    <span className="cert-name">Vue &amp; Vuex</span>
                    <span className="cert-year">'23</span>
                  </li>
                </ul>
              </div>

              <div className="cert-group">
                <div className="cert-group-label">SoftUni</div>
                <ul className="cert-list">
                  <li>
                    <span className="cert-name">JavaScript Web Developer</span>
                    <span className="cert-year">'21–'22</span>
                  </li>
                  <li>
                    <span className="cert-name">QA Manual &amp; Automation</span>
                    <span className="cert-year">'22</span>
                  </li>
                  <li>
                    <span className="cert-name">Microsoft Excel Advanced</span>
                    <span className="cert-year">'22</span>
                  </li>
                </ul>
              </div>

              <div className="cert-group">
                <div className="cert-group-label">Vola Software</div>
                <ul className="cert-list">
                  <li>
                    <span className="cert-name">Java Basic, OOP &amp; Web</span>
                    <span className="cert-year">'22</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="s-section">
              <h2>Links</h2>
              <div className="links-icon-row">
                <a href="https://github.com/dimitrov93" title="GitHub" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" /></svg>
                </a>
                <a href="https://linkedin.com/in/tsvetomir-dimitrov" title="LinkedIn" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
                </a>
                <a href="https://dimitrov93.eu" title="Website" target="_blank" rel="noreferrer">
                  <svg viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" /></svg>
                </a>
              </div>
            </div>
          </aside>

          <main className="main">
            <div className="m-section">
              <h2>Work Experience</h2>

              <div className="job">
                <div className="job-meta">
                  <div className="company">Lupy Games</div>
                  <div className="period">Apr 2024 – Present</div>
                  <div className="location">Remote</div>
                </div>
                <div className="job-content">
                  <div className="role">Front-End Developer</div>
                  <ul>
                    <li>Led full platform migration from WordPress to Next.js — delivering measurable gains in performance and scalability</li>
                    <li>Drove user engagement through gamification: achievements, ranks, level progression, and customizable themes</li>
                    <li>Continuously iterate on features and UX to keep pace with evolving community needs</li>
                  </ul>
                </div>
              </div>

              <div className="job">
                <div className="job-meta">
                  <div className="company">Montway Auto Transport</div>
                  <div className="period">Sep 2016 – Present</div>
                  <div className="location">Montana</div>
                </div>
                <div className="job-content has-roles">
                  <div className="role-block">
                    <div className="role-header">
                      <div className="role">Team Lead</div>
                    </div>
                    <ul>
                      <li>Lead a LiveChat team at one of the largest auto transport companies in the U.S.</li>
                      <li>Drive performance through coaching, one-on-ones, KPI tracking, and Salesforce reporting to management</li>
                      <li>Mentor team members and foster their professional growth and independence</li>
                    </ul>
                  </div>
                  <div className="role-block">
                    <div className="role-past">Senior Sales Specialist</div>
                  </div>
                  <div className="role-block">
                    <div className="role-past">Sales Specialist</div>
                  </div>
                  <div className="role-block">
                    <div className="role-past">Transport Coordinator</div>
                  </div>
                </div>
              </div>

              <div className="job">
                <div className="job-meta">
                  <div className="company">Vola</div>
                  <div className="period">Jul 2023 – Present</div>
                  <div className="location">Remote</div>
                </div>
                <div className="job-content">
                  <div className="role">Front-End Developer</div>
                  <ul>
                    <li>Architected a full-stack jewellery inventory management system (Vue3, Vuex, Spring Boot, PostgreSQL, Docker)</li>
                    <li>Delivered real-time sales tracking and multi-role access for distributors, store owners, and admins</li>
                    <li>Automated resource and inventory workflows, contributing to the digital transformation of the client's business</li>
                  </ul>
                </div>
              </div>

              <div className="job">
                <div className="job-meta">
                  <div className="company">Sutherland</div>
                  <div className="period">Jan 2018 – Apr 2018</div>
                </div>
                <div className="job-content">
                  <div className="role">Sales Support Specialist</div>
                  <p>Phone sales &amp; support for GoDaddy — product inquiries, account issues &amp; upselling.</p>
                </div>
              </div>

              <div className="job">
                <div className="job-meta">
                  <div className="company">Gameloft</div>
                  <div className="period">Jun 2014 – Aug 2014</div>
                </div>
                <div className="job-content">
                  <div className="role">Game Tester</div>
                  <p>Tested mobile games across the full Apple device lineup, reporting bugs across all screen sizes and iOS versions.</p>
                </div>
              </div>
            </div>

            <div className="m-section">
              <h2>Education</h2>

              <div className="job">
                <div className="job-meta">
                  <div className="company">SoftUni</div>
                  <div className="period">2021 – 2022</div>
                </div>
                <div className="job-content">
                  <div className="role">Computer Software Engineering</div>
                  <p>JavaScript Web Developer · Grade: 6 (Excellent)</p>
                </div>
              </div>

              <div className="job">
                <div className="job-meta">
                  <div className="company">UNWE</div>
                  <div className="period">2012 – 2016</div>
                </div>
                <div className="job-content">
                  <div className="role">Bachelor's — Accounting &amp; Finance</div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
