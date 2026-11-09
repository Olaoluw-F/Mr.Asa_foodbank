import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { cx } from '../../lib/cx'
import { findFoodPath } from '../../lib/sites'
import Button from '../../components/ui/Button'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import Icon from '../../components/ui/Icon'
import TodayCard from './TodayCard'
import styles from './Hero.module.css'

export default function Hero() {
  const navigate = useNavigate()
  const [q, setQ] = useState('')

  // Search opens Find Food with only this search applied.
  function search(e) {
    e.preventDefault()
    navigate(findFoodPath({ q: q.trim() }))
  }

  return (
    <section className={styles.hero}>
      <Container className={styles.inner}>
        <div>
          <Eyebrow>Food security in Prince George's County</Eyebrow>
          <h1>Free food and ways to help, all in one place</h1>
          <p className={styles.lede}>Mr. ASA connects families, students, and neighbors to free food, and connects volunteers to PGCPS schools, food banks, and pantries that need them.</p>
          <form className={styles.finderBar} role="search" onSubmit={search}>
            <Icon name="search" className={styles.searchIcon} />
            <input type="search" value={q} onChange={e => setQ(e.target.value)} placeholder="Town or ZIP, like Laurel or 20743" aria-label="Town or ZIP code" />
            <Button type="submit">Find food</Button>
          </form>
          <div className={styles.subLinks}><span>Want to help? <Link to="/volunteer">Volunteer</Link> or <Link to="/donate">donate</Link></span><span>UMD student? <Link to="/umd">Campus resources</Link></span></div>
        </div>
        <div className={styles.stage}>
          <span className={cx(styles.orb, styles.orbA)} aria-hidden="true" />
          <span className={cx(styles.orb, styles.orbB)} aria-hidden="true" />
          <TodayCard />
        </div>
      </Container>
    </section>
  )
}
