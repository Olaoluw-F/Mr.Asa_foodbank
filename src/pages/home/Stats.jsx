import { PG, TOWNS } from '../../data/sites'
import { openToAnyone } from '../../lib/sites'
import Container from '../../components/ui/Container'
import styles from './Stats.module.css'

export default function Stats() {
  return (
    <section className={styles.stats} aria-label="At a glance">
      <Container className={styles.inner}>
        <div className={styles.stat}><b>{PG.length}</b><span>verified free food sites</span></div>
        <div className={styles.stat}><b>{TOWNS.length}</b><span>towns across the county</span></div>
        <div className={styles.stat}><b>{openToAnyone(PG).length}</b><span>open to anyone, no age or residency rule</span></div>
        <div className={styles.stat}><b>24/7</b><span>help by calling or texting 2-1-1</span></div>
      </Container>
    </section>
  )
}
