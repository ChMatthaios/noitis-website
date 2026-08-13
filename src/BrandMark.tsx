type BrandMarkProps = {
  compact?: boolean
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  return (
    <span className={compact ? 'brand brand--compact' : 'brand'} aria-label="Noitis">
      <span className="brand__mark" aria-hidden="true">N</span>
      <span className="brand__copy">
        <strong>NOITIS™</strong>
        {!compact && <small>Intelligence, engineered.</small>}
      </span>
    </span>
  )
}
