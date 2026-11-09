import styles from './EmptyState.module.css'

/** Dashed box shown when a filter matches nothing. */
export default function EmptyState({ children }) {
  return <p className={styles.empty}>{children}</p>
}
