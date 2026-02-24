/**
 * Footer — Placeholder footer. Used by App.tsx at bottom of layout.
 */
import { site } from '../data/portfolio'

export function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="app-footer">
      <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <p className="text-sm text-zinc-500">
          © {year} {site.name}. All rights reserved.
        </p>
        <div className="flex flex-wrap gap-6 text-sm text-zinc-500">
          <a href={`mailto:${site.email}`} className="hover:text-zinc-400 transition-colors">
            Contact
          </a>
          <span className="text-zinc-600">·</span>
          <span>Placeholder</span>
        </div>
      </div>
    </footer>
  )
}
