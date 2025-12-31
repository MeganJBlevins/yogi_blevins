import './BackgroundGrid.css'

function BackgroundGrid() {
  return (
    <div className="bg-grid" aria-hidden="true">
      <div className="bg-grid-pattern" />
      <div className="bg-grid-gradient" />
      <div className="bg-grid-glow bg-grid-glow--1" />
      <div className="bg-grid-glow bg-grid-glow--2" />
    </div>
  )
}

export default BackgroundGrid

