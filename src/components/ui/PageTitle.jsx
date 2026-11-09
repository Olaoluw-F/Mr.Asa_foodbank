import styles from './PageTitle.module.css'

/**
 * The page's <h1>, hidden on screen. Inner pages have no hero band (owner's
 * choice), but screen readers still need a heading that names the page.
 */
export default function PageTitle({ children }) {
  return <h1 className={styles.title}>{children}</h1>
}
