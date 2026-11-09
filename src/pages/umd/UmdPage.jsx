import { useState } from 'react'
import { FOOD } from '../../data/foodResources'
import { ORGS } from '../../data/umdOrgs'
import { filterOrgs, filterUmdResources } from '../../lib/filters'
import ResourceCard from '../../components/ResourceCard'
import PageTitle from '../../components/ui/PageTitle'
import Button from '../../components/ui/Button'
import { Chip } from '../../components/ui/Chip'
import Container from '../../components/ui/Container'
import EmptyState from '../../components/ui/EmptyState'
import Eyebrow from '../../components/ui/Eyebrow'
import { FilterBar, SearchInput } from '../../components/ui/FilterBar'
import Grid from '../../components/ui/Grid'
import Promo from '../../components/ui/Promo'
import { Section, SectionHead } from '../../components/ui/Section'
import OrgCard from './OrgCard'

const FOOD_FILTERS = [["all", "All"], ["campus", "On campus"], ["benefits", "Benefits"]]
const ORG_FILTERS = [["all", "All"], ["Student org", "Student orgs"], ["Campus program", "Campus programs"], ["volunteer", "Takes volunteers"], ["meets", "Has meeting times"]]

export default function UmdPage() {
  const [q, setQ] = useState("")
  const [cat, setCat] = useState("all")
  const [orgFilter, setOrgFilter] = useState("all")
  const resources = filterUmdResources(FOOD, { q, cat })
  const orgs = filterOrgs(ORGS, orgFilter)

  return (
    <>
      <PageTitle>No Terp should have to choose between class and a meal.</PageTitle>
      <Container>
        <Section>
          <SectionHead><Eyebrow>Get food</Eyebrow><h2>Food help on campus</h2><p>Every listing links to its official page for current hours and eligibility.</p></SectionHead>
          <FilterBar label="Filter UMD food resources">
            <SearchInput value={q} onChange={e => setQ(e.target.value)} placeholder="Search: pantry, SNAP, meals…" aria-label="Search UMD food resources" />
            {FOOD_FILTERS.map(([key, label]) => <Chip key={key} pressed={cat === key} onClick={() => setCat(key)}>{label}</Chip>)}
          </FilterBar>
          <Grid>
            {resources.length
              ? resources.map(r => <ResourceCard key={r.name} resource={r} detailed />)
              : <EmptyState>No matches. Try a shorter search or pick "All".</EmptyState>}
          </Grid>
        </Section>
        <Section>
          <SectionHead><Eyebrow>Get involved</Eyebrow><h2>Student organizations &amp; campus programs</h2><p>Groups at UMD that recover food, grow it, and get it to people who need it.</p></SectionHead>
          <FilterBar label="Filter student organizations">
            {ORG_FILTERS.map(([key, label]) => <Chip key={key} pressed={orgFilter === key} onClick={() => setOrgFilter(key)}>{label}</Chip>)}
          </FilterBar>
          <Grid>
            {orgs.length
              ? orgs.map(o => <OrgCard key={o.name} org={o} />)
              : <EmptyState>No groups match this filter yet.</EmptyState>}
          </Grid>
        </Section>
        <Section>
          <Promo tone="deep">
            <h2>Is your student org missing?</h2>
            <p>Send the Mr. ASA team your org's name, mission statement, meeting day, time, and room, plus your Instagram, GroupMe, and TerpLink links. We'll add you to this page.</p>
            <Button to="/about">Contact Mr. ASA</Button>
          </Promo>
        </Section>
      </Container>
    </>
  )
}
