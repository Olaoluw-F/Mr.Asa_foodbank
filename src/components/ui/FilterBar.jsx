import styles from './FilterBar.module.css'

/** Box that holds a list's search field and filter chips. `label` names the group for screen readers. */
export function FilterBar({ label, children }) {
  return <div className={styles.controls} role="group" aria-label={label}>{children}</div>
}

export function SearchInput(props) {
  return <input type="search" className={styles.search} {...props} />
}

/** "12 of 41 sites" line under a filter bar. */
export function ResultCount({ children }) {
  return <p className={styles.count}>{children}</p>
}
