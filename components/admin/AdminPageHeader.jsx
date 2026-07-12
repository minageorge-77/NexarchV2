export default function AdminPageHeader({
  title,
  subtitle,
  actionLabel,
  onAction





}) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-extrabold text-primary mb-1">
          {title}
        </h1>
        {subtitle &&
        <p className="text-sm text-on-surface-variant">
            {subtitle}
          </p>
        }
      </div>
      
      {actionLabel && onAction &&
      <button
        onClick={onAction}
        className="btn-primary bg-lime hover:bg-lime-dark text-white font-bold py-2.5 px-5 rounded-lg flex items-center gap-2 transition-colors w-fit">
        
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {actionLabel}
        </button>
      }
    </div>);

}