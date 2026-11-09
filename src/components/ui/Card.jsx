import { Link } from 'react-router'
import { cx } from '../../lib/cx'
import styles from './Card.module.css'

/** White card for listings. Renders an <article> unless `as` says otherwise. */
export function Card({ as: Tag = 'article', className, ...props }) {
  return <Tag className={cx(styles.card, className)} {...props} />
}

/** Row of pills at the top of a card. */
export function CardMeta({ children }) {
  return <div className={styles.meta}>{children}</div>
}

/** Row of links at the bottom of a card. */
export function CardLinks({ children }) {
  return <div className={styles.links}>{children}</div>
}

/** "Website →" style link. `to` stays on the site; `href` opens in a new tab. */
export function CardLink({ to, href, children }) {
  return to
    ? <Link className={styles.link} to={to}>{children}</Link>
    : <a className={styles.link} href={href} target="_blank" rel="noopener">{children}</a>
}
