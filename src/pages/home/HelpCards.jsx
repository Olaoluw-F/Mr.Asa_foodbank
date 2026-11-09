import { Link } from 'react-router'
import { cx } from '../../lib/cx'
import styles from './HelpCards.module.css'

/** The "I need food / I want to volunteer / I want to give" tiles, as a bento grid. */
export default function HelpCards() {
  return (
    <div className={styles.bento}>
      <Link to="/food" className={cx(styles.tile, styles.primary)}>
        <span className={styles.kicker}>Get food</span>
        <strong>I need food</strong>
        <p>Pantries, hot meals, mobile markets, and farmers markets. See hours, rules, and directions.</p>
        <span className={styles.go}>Find free food <span className={styles.arrow} aria-hidden="true">→</span></span>
      </Link>
      <Link to="/volunteer" className={styles.tile}>
        <span className={styles.kicker}>Volunteer</span>
        <strong>I want to volunteer</strong>
        <p>Shifts in PGCPS schools, food banks, and community pantries. Many count toward service hours.</p>
        <span className={styles.go}>Browse opportunities <span className={styles.arrow} aria-hidden="true">→</span></span>
      </Link>
      <Link to="/donate" className={styles.tile}>
        <span className={styles.kicker}>Give</span>
        <strong>I want to give</strong>
        <p>Stock local pantries, or give to vetted groups fighting hunger in Burkina Faso and Nigeria.</p>
        <span className={styles.go}>Ways to give <span className={styles.arrow} aria-hidden="true">→</span></span>
      </Link>
    </div>
  )
}
