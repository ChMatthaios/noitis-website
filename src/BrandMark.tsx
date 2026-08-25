import noitisLogoLight from '../media/Noitis Logo - Light.png'
import noitisLogoDark from '../media/Noitis Logo - Dark.png'
import noitisLongLogoLight from '../media/Noitis Long Logo - Light.png'
import noitisLongLogoDark from '../media/Noitis Long Logo - Dark.png'

type Theme = 'light' | 'dark'

type BrandMarkProps = {
  compact?: boolean
  theme?: Theme
}

export function BrandMark({ compact = false, theme = 'light' }: BrandMarkProps) {
  const logo = theme === 'dark' ? noitisLogoDark : noitisLogoLight
  const longLogo = theme === 'dark' ? noitisLongLogoDark : noitisLongLogoLight

  if (compact) {
    return (
      <span className="brand brand--header" role="img" aria-label="Noitis">
        <span className="brand__long-logo" aria-hidden="true">
          <img className="theme-logo" src={longLogo} alt="" decoding="async" />
        </span>
      </span>
    )
  }

  return (
    <span className="brand" role="img" aria-label="Noitis">
      <span className="brand__mark brand__mark--official" aria-hidden="true">
        <img className="theme-logo" src={logo} alt="" loading="lazy" decoding="async" />
      </span>

      <span className="brand__copy" aria-hidden="true">
        <strong>NOITIS™</strong>
        <small>Intelligence, engineered.</small>
      </span>
    </span>
  )
}
