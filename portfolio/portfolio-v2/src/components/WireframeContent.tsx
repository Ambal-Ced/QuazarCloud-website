import { useEffect, useState } from 'react'
import {
  site,
  about,
  projects,
  moreProjects,
  experience,
  credentials,
  resume,
} from '../data/portfolio'
import { useTypingEffect } from '../hooks/useTypingEffect'

type WireframeContentProps = {
  currentSection: number
  onNavigate: (index: number) => void
  scrollContainerRef?: React.RefObject<HTMLDivElement | null>
  showMoreOpen?: boolean
  onShowMoreOpenChange?: (value: boolean) => void
  showMoreProjects?: boolean
  onShowMoreProjectsChange?: (value: boolean) => void
}

const placeholderImg = '/placeholder.jpg'

function HeroSection({ onNavigate }: { onNavigate: (index: number) => void }) {
  const typingWord = useTypingEffect(site.roles, {
    typeSpeedMs: 100,
    deleteSpeedMs: 50,
    pauseAfterTypeMs: 2200,
    pauseAfterDeleteMs: 400,
  })

  const navTo = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate(index)
  }

  return (
    <section className="hero-section mb-12 py-4 md:py-8">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-[auto_1fr] md:gap-10 md:items-center">
        <div className="flex flex-col items-center gap-3 px-4 md:px-0">
          <img
            src={placeholderImg}
            alt=""
            className="hero-avatar aspect-square h-60 w-60 rounded-full object-cover md:h-72 md:w-72"
            style={{ aspectRatio: '1 / 1' }}
          />
          <p className="min-h-[1.75rem] text-center text-base text-zinc-300 md:text-lg">
            I'm a <span className="font-medium text-violet-400">{typingWord}</span>
            <span className="animate-pulse">|</span>
          </p>
        </div>
        <div className="min-h-0">
          <p className="mb-1 text-base text-zinc-400 md:text-lg">Hello, I'm</p>
          <h1 className="mb-4 text-3xl font-bold leading-tight text-white md:text-4xl lg:text-5xl">
            <span className="text-violet-400">{site.name}</span>
          </h1>
          <p className="mb-3 text-base text-zinc-400 md:text-lg">{site.tagline}</p>
          <p className="mb-5 text-base text-zinc-400 md:text-lg">{site.taglineExtra}</p>
          <button
            type="button"
            onClick={navTo(5)}
            className="mb-8 rounded-lg bg-violet-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-violet-600 transition-colors"
          >
            View resume
          </button>
        </div>
      </div>
      <div className="hero-links mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
        <a
          href={site.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-3 rounded-xl border border-zinc-700 bg-zinc-800/80 p-3 text-left transition hover:border-zinc-600"
          aria-label="GitHub"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-900/50">
            <svg
              className="h-5 w-5 text-emerald-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <div>
            <div className="text-sm font-semibold text-white">GitHub</div>
            <p className="text-xs text-zinc-400">View my code repositories</p>
          </div>
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex gap-3 rounded-xl border border-zinc-700 bg-zinc-800/80 p-3 text-left transition hover:border-zinc-600"
          aria-label="LinkedIn"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-900/50">
            <svg
              className="h-5 w-5 text-emerald-400"
              fill="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </span>
          <div>
            <div className="text-sm font-semibold text-white">LinkedIn</div>
            <p className="text-xs text-zinc-400">Connect with me professionally</p>
          </div>
        </a>
        <a
          href={`mailto:${site.email}`}
          className="flex gap-3 rounded-xl border border-zinc-700 bg-zinc-800/80 p-3 text-left transition hover:border-zinc-600"
          aria-label="Email"
        >
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-900/50">
            <svg
              className="h-5 w-5 text-emerald-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </span>
          <div>
            <div className="text-sm font-semibold text-white">Email</div>
            <p className="text-xs text-zinc-400">Send me a message</p>
          </div>
        </a>
      </div>
    </section>
  )
}

export function WireframeContent({ currentSection, onNavigate, scrollContainerRef, showMoreOpen = false, onShowMoreOpenChange, showMoreProjects = false, onShowMoreProjectsChange }: WireframeContentProps) {
  const sectionWrapperStyle: React.CSSProperties = {
    height: '100%',
    overflow: currentSection === 2 && !showMoreProjects ? 'visible' : undefined,
    overflowY: currentSection === 1 && showMoreOpen ? 'auto' : currentSection === 2 && showMoreProjects ? 'auto' : currentSection === 2 ? 'visible' : 'hidden',
    padding: '24px 20px',
  }

  const contentMaxWidth = { maxWidth: '56rem' }

  const navTo = (index: number) => (e: React.MouseEvent) => {
    e.preventDefault()
    onNavigate(index)
  }

  const imgFallback = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const el = e.currentTarget
    if (el.src && !el.src.includes('placeholder')) el.src = placeholderImg
  }

  useEffect(() => {
    scrollContainerRef?.current?.scrollTo(0, 0)
  }, [currentSection, scrollContainerRef])

  return (
    <main className="app-main">
      <div
        ref={scrollContainerRef}
        className={(currentSection === 1 && showMoreOpen) || (currentSection === 2 && showMoreProjects) ? 'scrollbar-minimal' : ''}
        style={sectionWrapperStyle}
      >
        <div className="mx-auto max-w-3xl" style={contentMaxWidth}>
          {/* index 0 — Home / Hero */}
          {currentSection === 0 && <HeroSection onNavigate={onNavigate} />}

          {/* index 1 — About */}
          {currentSection === 1 && (
            <section className="mb-16">
              <h2 className="mb-2 text-xl font-semibold text-white">About me</h2>
              <p className="mb-6 text-zinc-400">{about.intro}</p>
              <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-[320px_1fr] sm:gap-6">
                <div className="sticky top-0 self-start overflow-hidden rounded-xl sm:mx-0 mx-auto w-[320px] aspect-square">
                  <img
                    src={placeholderImg}
                    alt=""
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                    <button
                      type="button"
                      onClick={navTo(1)}
                      className="flex min-h-[100px] w-full items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/80 p-4 text-left transition hover:border-zinc-600"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-900/50 text-xl text-emerald-400">
                        👤
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-white">About & Contact</div>
                        <p className="text-sm text-zinc-400">Learn more about my journey and get in touch</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={navTo(2)}
                      className="flex min-h-[100px] w-full items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/80 p-4 text-left transition hover:border-zinc-600"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-900/50 text-base text-emerald-400">
                        &lt;/&gt;
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-white">Skills & Projects</div>
                        <p className="text-sm text-zinc-400">Check out my skills and software development projects</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={navTo(3)}
                      className="flex min-h-[100px] w-full items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/80 p-4 text-left transition hover:border-zinc-600"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-900/50 text-xl text-emerald-400">
                        💼
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-white">Experience</div>
                        <p className="text-sm text-zinc-400">My professional journey and achievements</p>
                      </div>
                    </button>
                    <button
                      type="button"
                      onClick={navTo(4)}
                      className="flex min-h-[100px] w-full items-center gap-3 rounded-xl border border-zinc-700 bg-zinc-800/80 p-4 text-left transition hover:border-zinc-600"
                    >
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-emerald-900/50 text-xl text-emerald-400">
                        📜
                      </span>
                      <div className="min-w-0">
                        <div className="font-semibold text-white">Credentials</div>
                        <p className="text-sm text-zinc-400">View my certificates and credentials</p>
                      </div>
                    </button>
                  </div>
                  <div className="relative rounded-xl bg-zinc-900/50 p-4">
                    <div className="relative">
                      <div
                        className={`pr-2 transition-all duration-300 ${
                          showMoreOpen ? '' : 'max-h-32 overflow-y-hidden'
                        }`}
                      >
                        <div className="space-y-3 text-lg text-zinc-400">
                          {about.paragraphs.map((p, i) => (
                            <p key={i}>{p}</p>
                          ))}
                        </div>
                      </div>
                      {!showMoreOpen && (
                        <div
                          className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-zinc-900"
                          aria-hidden
                        />
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => onShowMoreOpenChange?.(!showMoreOpen)}
                      className="mt-3 flex w-full items-center justify-center rounded-lg bg-transparent px-4 py-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300 transition-colors"
                      aria-expanded={showMoreOpen}
                    >
                      {showMoreOpen ? 'Show Less ^' : 'Show More V'}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}

          {/* index 2 — Projects */}
          {currentSection === 2 && (
            <section className="mb-16 overflow-visible">
              <h2 className="mb-4 text-xl font-semibold text-white">Featured projects</h2>
              <div className="grid grid-cols-1 gap-3 overflow-visible sm:grid-cols-2">
                {projects.map((proj, i) => (
                  <div
                    key={i}
                    className="group relative flex overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 shadow-lg opacity-100 transition-transform duration-300 ease-out hover:scale-[1.2] hover:z-10"
                  >
                    <div className="flex w-1/3 shrink-0 items-center justify-center bg-zinc-600/80 p-2">
                      <img
                        src={proj.image}
                        alt={proj.name}
                        className="h-full max-h-[4.1rem] w-full object-contain object-center"
                        onError={imgFallback}
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center py-2 px-2.5">
                      <h3 className="font-semibold text-white text-[0.92em] leading-tight">{proj.name}</h3>
                      <p className="mt-1 text-[0.92em] text-sm leading-snug text-zinc-400 line-clamp-2">
                        {proj.description || 'Project description placeholder — add your next project details here.'}
                      </p>
                      <div className="mt-1 flex flex-wrap gap-1">
                        {proj.tech.map((t, j) => (
                          <span
                            key={j}
                            className="rounded bg-zinc-700 px-1.5 py-0.5 text-[0.92em] text-zinc-300"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <a
                        href={proj.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-1 inline-block text-[0.92em] text-indigo-400 hover:text-indigo-300"
                      >
                        View project →
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => onShowMoreProjectsChange?.(!showMoreProjects)}
                className="mt-4 flex w-full items-center justify-center rounded-lg bg-transparent px-4 py-2 text-zinc-400 hover:bg-zinc-800/50 hover:text-zinc-300 transition-colors"
              >
                {showMoreProjects ? 'Show Less ^' : 'Show More Projects V'}
              </button>
              {showMoreProjects && (
                <div className="mt-4 grid grid-cols-1 gap-3 overflow-visible border-t border-zinc-700 pt-4 sm:grid-cols-2">
                  {moreProjects.map((proj, i) => (
                    <div
                      key={i}
                      className="flex overflow-hidden rounded-lg border border-zinc-700 bg-zinc-800 shadow-lg opacity-100 transition-transform duration-300 ease-out hover:scale-[1.2] hover:z-10"
                    >
                      <div className="flex w-1/3 shrink-0 items-center justify-center bg-zinc-600/80 p-2">
                        <img
                          src={proj.image}
                          alt={proj.name}
                          className="h-full max-h-[4.1rem] w-full object-contain object-center"
                          onError={imgFallback}
                        />
                      </div>
                      <div className="flex flex-1 flex-col justify-center py-2 px-2.5">
                        <h3 className="font-semibold text-white text-[0.92em] leading-tight">{proj.name}</h3>
                        <p className="mt-1 text-[0.92em] text-sm leading-snug text-zinc-400 line-clamp-2">{proj.description}</p>
                        <div className="mt-1 flex flex-wrap gap-1">
                          {proj.tech.map((t, j) => (
                            <span
                              key={j}
                              className="rounded bg-zinc-700 px-1.5 py-0.5 text-[0.92em] text-zinc-300"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                        <a
                          href={proj.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-1 inline-block text-[0.92em] text-indigo-400 hover:text-indigo-300"
                        >
                          View project →
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </section>
          )}

          {/* index 3 — Experience */}
          {currentSection === 3 && (
            <section className="mb-16">
              <h2 className="mb-6 text-xl font-semibold text-white">Work & roles</h2>
              <div className="space-y-10">
                {experience.map((item, i) => (
                  <div
                    key={i}
                    className={`grid grid-cols-1 gap-4 md:grid-cols-[200px_1fr] md:items-center ${item.reverse ? 'md:grid-cols-[1fr_200px]' : ''}`}
                  >
                    {item.reverse ? (
                      <>
                        <div>
                          <h3 className="font-semibold text-white">{item.title}</h3>
                          <p className="text-sm text-indigo-400/90">{item.company} · {item.period}</p>
                          <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                        </div>
                        <div className="flex h-[140px] w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-800 md:max-w-[200px] md:ml-auto">
                          <img
                            src={item.image}
                            alt={item.company}
                            className="h-full w-full object-contain object-center"
                            onError={imgFallback}
                          />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="flex h-[140px] w-full items-center justify-center overflow-hidden rounded-lg bg-zinc-800 md:max-w-[200px] md:mx-0 mx-auto">
                          <img
                            src={item.image}
                            alt={item.company}
                            className="h-full w-full object-contain object-center"
                            onError={imgFallback}
                          />
                        </div>
                        <div>
                          <h3 className="font-semibold text-white">{item.title}</h3>
                          <p className="text-sm text-indigo-400/90">{item.company} · {item.period}</p>
                          <p className="mt-2 text-sm text-zinc-400">{item.description}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* index 4 — Credentials */}
          {currentSection === 4 && (
            <section className="mb-16">
              <h2 className="mb-2 text-xl font-semibold text-white">Certificates & credentials</h2>
              <p className="mb-6 text-zinc-400">
                A collection of professional certifications and achievements.
              </p>
              <div className="space-y-4">
                {credentials.map((item, i) => (
                  <div
                    key={i}
                    className="flex flex-col gap-4 rounded-xl border border-zinc-700 bg-zinc-800/50 p-4 sm:flex-row sm:items-start"
                  >
                    <div className="flex min-w-0 flex-1 flex-col">
                      <strong className="block text-white">{item.title}</strong>
                      {item.issuer && (
                        <p className="text-sm text-zinc-400">{item.issuer}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* index 5 — Resume */}
          {currentSection === 5 && (
            <section className="mb-16">
              <h2 className="mb-2 text-xl font-semibold text-white">Resume & contact</h2>
              <p className="mb-4 text-zinc-400">{resume.description}</p>
              <img
                src={resume.resumeImage}
                alt="Resume"
                className="mb-4 max-h-72 w-full rounded-lg object-contain bg-zinc-800/50"
                onError={imgFallback}
              />
              <div className="flex flex-wrap gap-3">
                <a
                  href={site.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-zinc-700 px-4 py-2 text-sm text-white hover:bg-zinc-600"
                >
                  GitHub
                </a>
                <a
                  href={site.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-lg bg-zinc-700 px-4 py-2 text-sm text-white hover:bg-zinc-600"
                >
                  LinkedIn
                </a>
                <a
                  href={`mailto:${site.email}`}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm text-white hover:bg-indigo-500"
                >
                  Email me
                </a>
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}
