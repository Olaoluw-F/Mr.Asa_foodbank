import { Link } from 'react-router'
import { cx } from '../../lib/cx'
import styles from './Button.module.css'

/**
 * v1 .btn. `to` makes a link inside the site, `href` an outside link that
 * opens in a new tab, and neither makes a <button>.
 * variant: "ghost"; size: "small".
 */
export default function Button({ to, href, variant, size, className, ...props }) {
  const cls = cx(styles.btn, variant === 'ghost' && styles.ghost, size === 'small' && styles.small, className)
  if (to) return <Link to={to} className={cls} {...props} />
  if (href) return <a href={href} target="_blank" rel="noopener" className={cls} {...props} />
  return <button className={cls} {...props} />
}
