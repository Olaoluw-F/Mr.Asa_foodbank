import { useState } from 'react'
import { useLocation, useNavigationType, useSearchParams } from 'react-router'
import { FOOD } from '../../data/foodResources'
import { PG, SITE_TYPES, TOWNS } from '../../data/sites'
import { DAY_KEYS, DAY_NAMES, getToday } from '../../lib/days'
import { filterSites, readFinderParams, siteKey, writeFinderParams } from '../../lib/sites'
import ResourceCard from '../../components/ResourceCard'
import PageTitle from '../../components/ui/PageTitle'
import { Chip, ChipSelect } from '../../components/ui/Chip'
import Container from '../../components/ui/Container'
import EmptyState from '../../components/ui/EmptyState'
import Eyebrow from '../../components/ui/Eyebrow'
import { FilterBar, ResultCount, SearchInput } from '../../components/ui/FilterBar'
import Grid from '../../components/ui/Grid'
import { Section, SectionHead } from '../../components/ui/Section'
import SiteCard from './SiteCard'
import styles from './FindFoodPage.module.css'

const PAGE_SIZE = 9
const COMMUNITY = FOOD.filter(r => r.cat === "community")

export default function FindFoodPage() {
  const today = getToday()
  // Filters live in the URL (/food?q=…&type=…&town=…&day=…&anyone=1), so results can be shared.
  const [params, setParams] = useSearchParams()
  const filters = readFinderParams(params, { types: SITE_TYPES, towns: TOWNS })
  const rows = filterSites(PG, filters)

  // Typing replaces the history entry; other changes add one, so Back undoes them.
  const update = (change, replace = false) => setParams(writeFinderParams({ ...filters, ...change }), { replace })

  // The search box keeps its own text, so fast typing never loses letters while the
  // URL catches up. It takes the URL's value again after any change that isn't
  // typing (Back, the menu, a link).
  const { key: locationKey } = useLocation()
  const navigationType = useNavigationType()
  const [q, setQ] = useState(filters.q)
  const [seenKey, setSeenKey] = useState(locationKey)
  if (locationKey !== seenKey) {
    setSeenKey(locationKey)
    if (navigationType !== "REPLACE") setQ(filters.q)
  }
  function search(e) {
    setQ(e.target.value)
    update({ q: e.target.value }, true)
  }

  // "Show all" applies to the current filters only, and resets when they change.
  const [showAllFor, setShowAllFor] = useState(null)
  const showAll = showAllFor === params.toString()

  return (
    <>
      <PageTitle>Find free food in Prince George's County</PageTitle>
      <Container>
        <Section>
          <FilterBar label="Filter county food sites">
            <SearchInput value={q} onChange={search} placeholder="Search by name, town, or ZIP" aria-label="Search county food sites" />
            <ChipSelect value={filters.type} onChange={e => update({ type: e.target.value })} aria-label="Type">
              <option value="">All types</option>
              {SITE_TYPES.map(t => <option key={t}>{t}</option>)}
            </ChipSelect>
            <ChipSelect value={filters.town} onChange={e => update({ town: e.target.value })} aria-label="Town">
              <option value="">All towns</option>
              {TOWNS.map(t => <option key={t}>{t}</option>)}
            </ChipSelect>
            <ChipSelect value={filters.day} onChange={e => update({ day: e.target.value })} aria-label="Day open">
              <option value="">Any day</option>
              {DAY_KEYS.map(d => <option key={d} value={d}>{DAY_NAMES[d]}</option>)}
            </ChipSelect>
            <Chip pressed={filters.day === today} onClick={() => update({ day: filters.day === today ? "" : today })}>Open today</Chip>
            <Chip pressed={filters.anyone} onClick={() => update({ anyone: !filters.anyone })}>Open to anyone</Chip>
          </FilterBar>
          <div className={styles.resultsBar}>
            <ResultCount>{`${rows.length} of ${PG.length} sites`}</ResultCount>
            <p className={styles.source}>From the county pantry map, verified May 29, 2026. Hours can change, so check before you go.</p>
          </div>
          <Grid>
            {rows.length
              ? (showAll ? rows : rows.slice(0, PAGE_SIZE)).map(r => <SiteCard key={siteKey(r)} site={r} day={filters.day} />)
              : <EmptyState>No sites match. Try another day, clear a filter, or call 2-1-1.</EmptyState>}
          </Grid>
          {!showAll && rows.length > PAGE_SIZE && <Chip className={styles.centerBtn} onClick={() => setShowAllFor(params.toString())}>{`Show all ${rows.length} sites`}</Chip>}
        </Section>
        <Section>
          <SectionHead>
            <Eyebrow>More help</Eyebrow>
            <h2>Can't find what you need?</h2>
            <p>These regional services keep larger, always-updated lists.</p>
          </SectionHead>
          <Grid>{COMMUNITY.map(r => <ResourceCard key={r.name} resource={r} />)}</Grid>
        </Section>
      </Container>
    </>
  )
}
