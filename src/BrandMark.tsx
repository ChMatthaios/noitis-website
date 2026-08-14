import noitisLogoLight from '../media/Noitis Logo - Light.png'
import noitisLogoDark from '../media/Noitis Logo - Dark.png'

import noitisLongLogoLight from '../media/Noitis Long Logo - Light.png'
import noitisLongLogoDark from '../media/Noitis Long Logo - Dark.png'

type BrandMarkProps = {
  compact?: boolean
}

export function BrandMark({ compact = false }: BrandMarkProps) {
  if (compact) {
    return (
      <span className="brand brand--header" aria-label="Noitis">
        <span className="brand__long-logo">
          <img
            className="theme-logo theme-logo--light"
            src={noitisLongLogoLight}
            alt="Noitis"
          />

          <img
            className="theme-logo theme-logo--dark"
            src={noitisLongLogoDark}
            alt="Noitis"
          />
        </span>
      </span>
    )
  }

  return (
    <span className="brand" aria-label="Noitis">
      <span className="brand__mark brand__mark--official" aria-hidden="true">
        <img
          className="theme-logo theme-logo--light"
          src={noitisLogoLight}
          alt=""
        />

        <img
          className="theme-logo theme-logo--dark"
          src={noitisLogoDark}
          alt=""
        />
      </span>

      <span className="brand__copy">
        <strong>NOITIS™</strong>
        <small>Intelligence, engineered.</small>
      </span>
    </span>
  )
}