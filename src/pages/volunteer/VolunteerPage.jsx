import { useState } from 'react'
import { VOL } from '../../data/volunteer'
import { filterVolunteer, uniqueSorted } from '../../lib/filters'
import PageTitle from '../../components/ui/PageTitle'
import Button from '../../components/ui/Button'
import { Chip, ChipSelect } from '../../components/ui/Chip'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import { FilterBar, ResultCount, SearchInput } from '../../components/ui/FilterBar'
import Pill from '../../components/ui/Pill'
import Promo from '../../components/ui/Promo'
import { Section, SectionHead } from '../../components/ui/Section'
import styles from './VolunteerPage.module.css'

const AREAS = uniqueSorted(VOL, "area")
const WORK_TYPES = uniqueSorted(VOL, "type")

export default function VolunteerPage() {
  const [q, setQ] = useState("")
  const [area, setArea] = useState("")
  const [type, setType] = useState("")
  const [walkOnly, setWalkOnly] = useState(false)
  const rows = filterVolunteer(VOL, { q, area, type, walkOnly })

  return (
    <>
      <PageTitle>Volunteer where it counts</PageTitle>
      <Container>
        <Section>
          <SectionHead><Eyebrow>How it works</Eyebrow><h2>Three steps to your first shift</h2></SectionHead>
          <div className={styles.steps}>
            <div className={styles.step}><h3>Pick an opportunity</h3><p>Filter the list below by area, type of work, and whether you can get there without a car.</p></div>
            <div className={styles.step}><h3>Complete any clearance</h3><p>School placements need PGCPS volunteer clearance before you start. Food banks and pantries usually just need a sign-up.</p></div>
            <div className={styles.step}><h3>Show up and log hours</h3><p>Confirm with your coordinator that the shift counts toward school or service-learning hours.</p></div>
          </div>
        </Section>
        <Section>
          <SectionHead><Eyebrow>Opportunities</Eyebrow><h2>Places to volunteer</h2></SectionHead>
          <div className={styles.sampleNote} role="note"><b>Sample rows.</b><span>These listings are placeholders showing the layout. They will be replaced with the PGCPS volunteering database.</span></div>
          <FilterBar label="Filter volunteer opportunities">
            <SearchInput value={q} onChange={e => setQ(e.target.value)} placeholder="Search by organization, task, or city" aria-label="Search volunteer opportunities" />
            <ChipSelect value={area} onChange={e => setArea(e.target.value)} aria-label="Area">
              <option value="">All areas</option>
              {AREAS.map(a => <option key={a}>{a}</option>)}
            </ChipSelect>
            <ChipSelect value={type} onChange={e => setType(e.target.value)} aria-label="Type of work">
              <option value="">All types</option>
              {WORK_TYPES.map(t => <option key={t}>{t}</option>)}
            </ChipSelect>
            <Chip pressed={walkOnly} onClick={() => setWalkOnly(!walkOnly)}>No car needed</Chip>
          </FilterBar>
          <ResultCount>{`${rows.length} of ${VOL.length} opportunities`}</ResultCount>
          <div className={styles.tableWrap}>
            <table className={styles.table}>
              <thead><tr><th>Organization</th><th>What you'll do</th><th>Area</th><th>When</th><th>Service hours</th><th>How to join</th></tr></thead>
              <tbody>
                {rows.length ? rows.map(r => (
                  <tr key={r.org + r.task}>
                    <td><div className={styles.org}>{r.org}</div><div className={styles.sub}>{r.sub}</div></td>
                    <td>{r.task}<div className={styles.sub}>{r.type}</div></td>
                    <td>{r.area}{r.walk && <div className={styles.sub}>Walk or shuttle</div>}</td>
                    <td className={styles.nowrap}>{r.when}</td>
                    <td>{r.hours === "Yes" ? <Pill>Counts</Pill> : <Pill tone="warn">Check</Pill>}</td>
                    <td>{r.how}</td>
                  </tr>
                )) : <tr><td colSpan={6} className={styles.emptyCell}>No opportunities match these filters.</td></tr>}
              </tbody>
            </table>
          </div>
        </Section>
        <Section>
          <Promo tone="soft">
            <h2>Run a school or pantry program?</h2>
            <p>Get your volunteer needs listed on Mr. ASA. Send us the organization name, the task, the schedule, and how volunteers sign up.</p>
            <Button to="/about">Contact Mr. ASA</Button>
          </Promo>
        </Section>
      </Container>
    </>
  )
}
