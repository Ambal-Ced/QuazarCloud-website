/**
 * App.tsx — Root component.
 * Loaded by main.tsx. Renders: Background + (Sidebar + WireframeContent) + Footer.
 * Section-jump: one section at a time; navigation via useSectionNavigation (sidebar, wheel, keys, touch).
 * On scrollable sections (e.g. About), snap only when at top/bottom edge.
 */
import { useRef, useState, useEffect } from 'react'
import { useSectionNavigation } from './hooks/useSectionNavigation'
import { Background } from './components/Background'
import { Sidebar } from './components/Sidebar'
import { WireframeContent } from './components/WireframeContent'
import { Footer } from './components/Footer'

function App() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [showMoreOpen, setShowMoreOpen] = useState(false)
  const [showMoreProjects, setShowMoreProjects] = useState(false)
  const [credentialModalOpen, setCredentialModalOpen] = useState(false)
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  const [showMoreCredentials, setShowMoreCredentials] = useState(false)
  const [showMoreExperience, setShowMoreExperience] = useState(false)
  const { current, goTo } = useSectionNavigation(scrollContainerRef, { showMoreOpen, showMoreProjects, showMoreCredentials, showMoreExperience, credentialModalOpen, projectModalOpen })

  useEffect(() => {
    if (current !== 1) setShowMoreOpen(false)
    if (current !== 2) setShowMoreProjects(false)
    if (current !== 3) setShowMoreExperience(false)
    if (current !== 4) setShowMoreCredentials(false)
  }, [current])

  return (
    <>
      <Background />
      <div className="app-wrapper">
        <div className="app-layout">
          <Sidebar currentSection={current} onNavigate={goTo} />
          <WireframeContent
            currentSection={current}
            onNavigate={goTo}
            scrollContainerRef={scrollContainerRef}
            showMoreOpen={showMoreOpen}
            onShowMoreOpenChange={setShowMoreOpen}
            showMoreProjects={showMoreProjects}
            onShowMoreProjectsChange={setShowMoreProjects}
            onCredentialModalOpenChange={setCredentialModalOpen}
            onProjectModalOpenChange={setProjectModalOpen}
            showMoreCredentials={showMoreCredentials}
            onShowMoreCredentialsChange={setShowMoreCredentials}
            showMoreExperience={showMoreExperience}
            onShowMoreExperienceChange={setShowMoreExperience}
          />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
