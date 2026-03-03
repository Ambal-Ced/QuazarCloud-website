export function Background() {
  return (
    <div
      className="fixed inset-0 z-0"
      aria-hidden
      style={{
        background: 'linear-gradient(160deg, #0f0f12 0%, #1a1a24 40%, #0d0d12 100%)',
        backgroundImage: 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(80,60,120,0.25), transparent), linear-gradient(160deg, #0f0f12 0%, #1a1a24 40%, #0d0d12 100%)',
      }}
    />
  )
}
