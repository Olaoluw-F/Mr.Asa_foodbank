import { cx } from '../../lib/cx'
import styles from './Eyebrow.module.css'

/** Small uppercase label above a heading, in blue. tone "light" is for dark backgrounds. */
export default function Eyebrow({ tone, children }) {
  return <p className={cx(styles.eyebrow, tone && styles[tone])}>{children}</p>
}
