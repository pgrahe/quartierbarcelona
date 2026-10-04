import { RouteLink } from '../router/RouteContext'

/** Nav/footer item. Always a real link. */
export default function ChromeNavLink({
  live: _live,
  to,
  hash,
  className,
  children,
  delay,
  onClick,
  style,
  ...rest
}) {
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
