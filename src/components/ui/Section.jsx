import { cx } from '../../lib/cx'
import Container from './Container'
import styles from './Section.module.css'

/** Full-width stripe on Home. `alt` gives it the white background; className goes on the inner column. */
export function Band({ alt, className, children }) {
  return (
    <section className={cx(styles.band, alt && styles.alt)}>
      <Container className={className}>{children}</Container>
    </section>
  )
}

/** A block of content on an inner page. Blocks after the first get a top border. */
export function Section({ id, children }) {
  return <section id={id} className={styles.section}>{children}</section>
}

/** Heading group (eyebrow, heading, intro) at the top of a Band or Section. */
export function SectionHead({ center, className, children }) {
  return <div className={cx(styles.head, center && styles.center, className)}>{children}</div>
}
