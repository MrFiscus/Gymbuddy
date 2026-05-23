export function PageHeader({ eyebrow, title, ghost, meta, right }) {
  return (
    <header className="page-header">
      {ghost ? <div className="page-header-ghost">{ghost}</div> : null}
      <div className="page-header-row">
        <div>
          <p className="section-kicker">{eyebrow}</p>
          <h1 className="page-title">{title}</h1>
          {meta ? <p className="page-meta">{meta}</p> : null}
        </div>
        {right ? <div className="page-header-right">{right}</div> : null}
      </div>
      <div className="page-header-line" />
    </header>
  )
}
