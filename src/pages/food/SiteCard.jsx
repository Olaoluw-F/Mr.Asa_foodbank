import { Fragment } from 'react'
import { DAY_KEYS } from '../../lib/days'
import { formatAddress, mapsUrl, siteTone } from '../../lib/sites'
import { Card, CardLink, CardLinks, CardMeta } from '../../components/ui/Card'
import Pill from '../../components/ui/Pill'
import styles from './SiteCard.module.css'

/** One county food site. `day` is the Day filter, highlighted in the hours. */
export default function SiteCard({ site: r, day }) {
  const addr = formatAddress(r)
  const maps = mapsUrl(r)
  const days = DAY_KEYS.filter(k => r.hours[k])
  return (
    <Card className={styles.site}>
      <CardMeta>
        <Pill tone={siteTone(r.type)}>{r.type}</Pill>
        {r.model && <Pill>{r.model}</Pill>}
      </CardMeta>
      <h3>{r.name}</h3>
      {addr ? <p>{addr}{r.host && <><br />{`at ${r.host}`}</>}</p> : <p>Location varies. Contact for details.</p>}
      <dl>
        {days.length ? days.map(k => (
          <Fragment key={k}><dt className={k === day ? styles.dayOn : undefined}>{k}</dt><dd>{r.hours[k]}</dd></Fragment>
        )) : <><dt>Hours</dt><dd>Not listed. Check before going.</dd></>}
        {r.elig && <><dt>Who</dt><dd>{r.elig}</dd></>}
        {r.limits && <><dt>Limit</dt><dd>{r.limits}</dd></>}
        {r.format && <><dt>Format</dt><dd>{r.format}</dd></>}
      </dl>
      <CardLinks>
        {maps && <CardLink href={maps}>Directions →</CardLink>}
        {r.url && <CardLink href={r.url}>Website →</CardLink>}
      </CardLinks>
    </Card>
  )
}
