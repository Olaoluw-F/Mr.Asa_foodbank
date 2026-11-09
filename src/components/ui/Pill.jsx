import { cx } from '../../lib/cx'
import styles from './Pill.module.css'

/** Small square tag. tone: "food" (blue) or "warn" (amber); default gray. */
export default function Pill({ tone, className, children }) {
  return <span className={cx(styles.pill, tone && styles[tone], className)}>{children}</span>
}
