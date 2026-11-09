import { cx } from '../../lib/cx'
import { Card, CardMeta } from '../../components/ui/Card'
import Icon from '../../components/ui/Icon'
import Pill from '../../components/ui/Pill'
import styles from './OrgCard.module.css'

/** A UMD student org or campus program (src/data/umdOrgs.js). Empty fields stay hidden. */
export default function OrgCard({ org: o }) {
  const links = [
    o.instagram && { href: o.instagram, tone: styles.ig, icon: "ig", label: "Instagram" },
    o.groupme && { href: o.groupme, tone: styles.gm, icon: "chat", label: "GroupMe" },
    o.terplink && { href: o.terplink, tone: styles.tl, icon: "link", label: "TerpLink" },
    o.website && { href: o.website, icon: "globe", label: "Website" },
  ].filter(Boolean)
  // Student orgs show a Meetings box even before their times are posted (except the TerpLink directory card).
  const showMeets = o.meets || (o.kind === "Student org" && !o.directory)

  return (
    <Card>
      <CardMeta>
        <Pill tone={o.kind === "Student org" ? "food" : undefined}>{o.kind}</Pill>
        {o.tags.map(t => <Pill key={t} tone="warn">{t}</Pill>)}
      </CardMeta>
      <h3>{o.name}</h3>
      {o.mission ? <blockquote className={styles.mission}><b>Mission</b>{o.mission}</blockquote> : <p>{o.about}</p>}
      {showMeets && (
        <div className={styles.meets}>
          <Icon name="cal" />
          <div><b>Meetings</b>{o.meets || <span className={styles.tbd}>Times not posted yet. Check TerpLink.</span>}</div>
        </div>
      )}
      {links.length > 0 && (
        <div className={styles.socials}>
          {links.map(l => <a key={l.label} className={cx(styles.soc, l.tone)} href={l.href} target="_blank" rel="noopener"><Icon name={l.icon} />{l.label}</a>)}
        </div>
      )}
    </Card>
  )
}
