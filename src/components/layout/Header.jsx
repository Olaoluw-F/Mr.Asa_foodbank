import { useState } from 'react'
import { NavLink, useLocation } from 'react-router'
import { cx } from '../../lib/cx'
import { PAGES } from '../../lib/pages'
import Button from '../ui/Button'
import Container from '../ui/Container'
import Icon from '../ui/Icon'
import styles from './Header.module.css'

/** Top bar: menu links centered, "Find food now" on the right. No logo or site name (owner's choice). */
export default function Header() {
  const { pathname, hash } = useLocation()
  const here = pathname + hash
  // The mobile menu remembers where it was opened, so it closes itself on the next page change.
  const [openAt, setOpenAt] = useState(null)
  const open = openAt === here

  return (
    <header className={styles.siteHead}>
      <Container className={styles.inner}>
        <nav className={cx(styles.menu, open && styles.open)} id="menu" aria-label="Main">
          {PAGES.map(p => <NavLink key={p.path} to={p.path} end>{p.label}</NavLink>)}
        </nav>
        <Button to="/food" size="small" className={styles.headCta}>Find food now</Button>
        <button className={styles.menuToggle} aria-expanded={open} aria-controls="menu" aria-label="Open menu"
          onClick={() => setOpenAt(open ? null : here)}><Icon name="menu" /></button>
      </Container>
    </header>
  )
}
