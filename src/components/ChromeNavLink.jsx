import { RouteLink } from '../router/RouteContext'

/**
 * Nav/footer item. During the countdown gate only About is a real link;
 * the rest stay in the chrome as labels.
 */
export default function ChromeNavLink({
  live,
  to,
  hash,
  className,
  children,
  delay,
  onClick,
  style,
  ...rest
}) {
  if (live) {
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

  return (
    <span className={className} aria-disabled="true" style={style} {...rest}>
      {children}
    </span>
  )
}
