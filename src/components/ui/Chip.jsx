import { cx } from '../../lib/cx'
import styles from './Chip.module.css'

/** Rounded filter button. Pass `pressed` to make it a toggle (sets aria-pressed). */
export function Chip({ pressed, className, ...props }) {
  return <button className={cx(styles.chip, className)} aria-pressed={pressed} {...props} />
}

/** A <select> styled as a chip. */
export function ChipSelect({ className, ...props }) {
  return <select className={cx(styles.chip, className)} {...props} />
}
