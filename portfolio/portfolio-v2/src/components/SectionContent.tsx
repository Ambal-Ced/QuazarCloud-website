import { getTransitionForSection } from './transitions'

const SECTIONS = [
  {
    title: 'Section 1 — Fade',
    subtitle: 'Fade in / Fade out',
    image: '/logo_resource/quazarcloud.png',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
  },
  {
    title: 'Section 2 — Push up',
    subtitle: 'Content pushes up into view',
    image: '/logo_resource/Ecologo.png',
    text: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  },
  {
    title: 'Section 3 — Push down',
    subtitle: 'Content pushes down into view',
    image: '/logo_resource/eventtria.webp',
    text: 'Curabitur pretium tincidunt lacus. Nulla facilisi. Ut fringilla. Suspendisse potenti. Nunc feugiat mi a tellus consequat imperdiet. Vestibulum sapien proin quam.',
  },
  {
    title: 'Section 4 — Wipe left',
    subtitle: 'Wipe from right to left',
    image: '/logo_resource/jup.webp',
    text: 'Phasellus nec sem in justo pellentesque facilisis. Etiam imperdiet imperdiet orci. Nunc nec neque. Praesent congue erat at massa. Sed cursus turpis vitae tortor.',
  },
  {
    title: 'Section 5 — Reveal',
    subtitle: 'Reveal from left to right',
    image: '/logo_resource/outlier.webp',
    text: 'Maecenas ullamcorper, dui et placerat feugiat, eros pede varius nisi, condimentum viverra felis nunc et lorem. Sed magna purus, fermentum eu, tincidunt eu, varius ut, felis.',
  },
  {
    title: 'Section 6 — Flip',
    subtitle: '3D flip transition',
    image: '/logo_resource/stdui.png',
    text: 'In hac habitasse platea dictumst. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Donec odio. Quisque volutpat mattis eros.',
  },
  {
    title: 'Section 7 — Line reveal',
    subtitle: 'Invisible vertical line: appear left → right, vanish right → left',
    image: '/logo_resource/profsum.jpg',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
  },
]

type SectionContentProps = {
  index: number
  sectionCount: number
  onNavClick: (index: number) => void
}

export function SectionContent({ index, sectionCount, onNavClick }: SectionContentProps) {
  const section = SECTIONS[index]
  const transitionName = getTransitionForSection(index)

  return (
    <>
      <p className="mb-2 text-sm font-medium uppercase tracking-widest text-zinc-500">
        {transitionName}
      </p>
      <h1 className="mb-2 text-3xl font-semibold text-white md:text-4xl">
        {section.title}
      </h1>
      <p className="mb-6 text-lg text-zinc-400">
        {section.subtitle}
      </p>
      <div className="mb-8 flex justify-center">
        <img
          src={section.image}
          alt=""
          className="h-24 w-auto rounded-lg object-contain shadow-lg md:h-32"
        />
      </div>
      <p className="mx-auto max-w-xl text-zinc-400">
        {section.text}
      </p>
      <nav className="mt-10 flex flex-wrap justify-center gap-2">
        {Array.from({ length: sectionCount }, (_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => onNavClick(i)}
            className={`h-2.5 w-2.5 rounded-full transition-all md:h-3 md:w-3 ${
              i === index
                ? 'scale-125 bg-white ring-2 ring-white ring-offset-2 ring-offset-zinc-900'
                : 'bg-zinc-600 hover:bg-zinc-500'
            }`}
            aria-label={`Go to section ${i + 1}`}
          />
        ))}
      </nav>
      <p className="mt-8 text-xs text-zinc-600">
        Scroll or use arrow keys / nav dots to switch sections. Background stays fixed.
      </p>
    </>
  )
}
