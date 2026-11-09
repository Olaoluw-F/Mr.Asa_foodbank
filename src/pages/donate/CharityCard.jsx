import { CN } from '../../data/charities'
import { cx } from '../../lib/cx'
import Button from '../../components/ui/Button'
import { Card, CardMeta } from '../../components/ui/Card'
import Flag from '../../components/ui/Flag'
import Pill from '../../components/ui/Pill'
import styles from './CharityCard.module.css'

/** A vetted charity (src/data/charities.js). `wide` ones span the whole grid. */
export default function CharityCard({ charity: o }) {
  return (
    <Card className={cx(styles.af, o.wide && styles.wide)}>
      <CardMeta>
        {o.c.map(k => <Pill key={k} className={styles.cty}><Flag as="i" country={k} small />{CN[k]}</Pill>)}
        <Pill tone="warn">{o.tag}</Pill>
      </CardMeta>
      <h3>{o.name}</h3>
      <p>{o.does}</p>
      <div className={styles.trust}><b>Why we trust it</b><ul>{o.trust.map(t => <li key={t}>{t}</li>)}</ul></div>
      <p className={styles.keep}><b>Keep in mind:</b>{` ${o.note}`}</p>
      <Button href={o.url} size="small" className={styles.cta}>{`${o.cta} →`}</Button>
    </Card>
  )
}
