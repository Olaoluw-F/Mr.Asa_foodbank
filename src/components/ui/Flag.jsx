import { cx } from '../../lib/cx'
import styles from './Flag.module.css'

/** CSS-drawn flag. country: "BF" (Burkina Faso) or "NG" (Nigeria). `small` for use inside a pill. */
export default function Flag({ country, small, as: Tag = 'span' }) {
  return <Tag className={cx(styles.flag, styles[country.toLowerCase()], small && styles.small)} aria-hidden="true" />
}
