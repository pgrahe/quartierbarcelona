import { VIP_ENABLED } from '../config/site'
import { RouteLink } from '../router/RouteContext'

/** Nav/footer item. Disabled destinations render as inert text. */
export default function ChromeNavLink({
  live: liveProp,
  to,
  hash,
  className,
  children,
  delay,
  onClick,
  style,
  ...rest
}) {
  const live = liveProp ?? (to !== 'vip' || VIP_ENABLED)

  if (!live) {
    return (
      <span className={className} aria-disabled="true" style={style}>
        {children}
      </span>
    )
  }

  return (
    <RouteLink
      to={to}
      hash={hash}
      className={className}
      delay={delay}
      onClick={onClick}
      style={style}
      {...rest}
    >
      {children}
    </RouteLink>
  )
}
