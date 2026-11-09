import { cx } from '../../lib/cx'
import styles from './Container.module.css'

/** Centered page-width column (v1 .wrap). */
export default function Container({ className, ...props }) {
  return <div className={cx(styles.wrap, className)} {...props} />
}
