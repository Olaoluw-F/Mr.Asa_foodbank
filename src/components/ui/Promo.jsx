import { cx } from '../../lib/cx'
import styles from './Promo.module.css'

/** Call-out box with a heading, text and a button. tone: "soft" (light blue) or "deep" (dark slate). */
export default function Promo({ tone, children }) {
  return <div className={cx(styles.promo, styles[tone])}>{children}</div>
}
