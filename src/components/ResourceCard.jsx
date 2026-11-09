import { CAT_LABEL } from '../data/foodResources'
import { Card, CardLink, CardMeta } from './ui/Card'
import Pill from './ui/Pill'

/**
 * Card for a FOOD entry (src/data/foodResources.js). `detailed` adds the
 * category pill and Where/Who lines used on the UMD Students page.
 */
export default function ResourceCard({ resource: r, detailed = false }) {
  return (
    <Card>
      <CardMeta>
        {detailed && <Pill tone="food">{CAT_LABEL[r.cat]}</Pill>}
        {r.tags.map(t => <Pill key={t}>{t}</Pill>)}
      </CardMeta>
      <h3>{r.name}</h3>
      <p>{r.desc}</p>
      {detailed && <dl><dt>Where</dt><dd>{r.where}</dd><dt>Who</dt><dd>{r.who}</dd></dl>}
      <CardLink href={r.url}>{`${r.link} →`}</CardLink>
    </Card>
  )
}
