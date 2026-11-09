import styles from './Grid.module.css'

/** Responsive grid of cards. */
export default function Grid({ children }) {
  return <div className={styles.grid}>{children}</div>
}
