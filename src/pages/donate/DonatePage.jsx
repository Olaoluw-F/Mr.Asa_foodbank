import { useState } from 'react'
import { AFRICA } from '../../data/charities'
import { filterCharities } from '../../lib/filters'
import PageTitle from '../../components/ui/PageTitle'
import { Card, CardLink, CardMeta } from '../../components/ui/Card'
import { Chip } from '../../components/ui/Chip'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import { FilterBar } from '../../components/ui/FilterBar'
import Flag from '../../components/ui/Flag'
import Grid from '../../components/ui/Grid'
import Pill from '../../components/ui/Pill'
import { Section, SectionHead } from '../../components/ui/Section'
import CharityCard from './CharityCard'
import styles from './DonatePage.module.css'

const COUNTRY_FILTERS = [["all", "Both countries"], ["BF", "Burkina Faso"], ["NG", "Nigeria"]]

export default function DonatePage() {
  const [country, setCountry] = useState("all")

  return (
    <>
      <PageTitle>Help stock the shelves</PageTitle>
      <Container>
        <Section>
          <div className={styles.give}>
            <Card as="div"><CardMeta><Pill tone="food">Most needed</Pill></CardMeta><h3>Food items</h3>
              <ul className={styles.needList}><li>Canned protein: tuna, chicken, beans</li><li>Peanut butter, rice, pasta, oatmeal</li><li>Shelf-stable milk and cereal</li><li>Easy microwave meals</li></ul>
              <p>Drop off at a pantry during open hours. Check expiration dates first.</p><CardLink to="/food">Find a pantry near you →</CardLink></Card>
            <Card as="div"><CardMeta><Pill>Often forgotten</Pill></CardMeta><h3>Personal care</h3>
              <ul className={styles.needList}><li>Menstrual products</li><li>Toothpaste, deodorant, soap</li><li>Diapers and wipes</li><li>Laundry detergent</li></ul>
              <p>SNAP can't pay for these, so pantries rely on donations.</p></Card>
            <Card as="div"><CardMeta><Pill tone="warn">Stretches furthest</Pill></CardMeta><h3>Money</h3>
              <p>Food banks buy wholesale, so a cash gift usually covers more meals than the same amount spent at a store.</p>
              <CardLink href="https://www.capitalareafoodbank.org">Give to Capital Area Food Bank →</CardLink></Card>
            <Card as="div"><CardMeta><Pill>Groups</Pill></CardMeta><h3>Host a drive</h3>
              <p>Run a collection with your school, club, congregation, or workplace. Mr. ASA can match your drive with a pantry that needs it.</p>
              <CardLink to="/about">Get matched →</CardLink></Card>
          </div>
        </Section>
        <Section id="africa">
          <SectionHead>
            <Eyebrow>Give globally</Eyebrow>
            <h2>Fight hunger in Burkina Faso and Nigeria</h2>
            <p>Conflict, displacement, and climate shocks have pushed millions of people in both countries into hunger. Every group below works in these countries and has been checked by independent charity evaluators.</p>
          </SectionHead>
          <div className={styles.crisisStats}>
            <div className={styles.cstat}><Flag country="BF" /><div><b>2.7 million</b><span>people in Burkina Faso facing acute food insecurity (2024), up from 700,000 in 2019</span></div></div>
            <div className={styles.cstat}><Flag country="NG" /><div><b>Nearly 35 million</b><span>Nigerians facing food insecurity, a record. 5.8 million in the northeast expected to face severe hunger in 2026</span></div></div>
          </div>
          <p className={styles.src}>Source: World Food Programme country pages for Burkina Faso and Nigeria.</p>

          <SectionHead className={styles.checksHead}><h3>How we checked these groups</h3></SectionHead>
          <ul className={styles.checks}>
            <li><b>Independent ratings.</b> Each one is a GiveWell top charity or holds a Charity Navigator rating of 3 or 4 stars.</li>
            <li><b>Registered US charity.</b> Each is a registered 501(c)(3), so your gift is tax-deductible and the group must file public financial reports with the IRS.</li>
            <li><b>Proof money reaches people.</b> Each one publishes monitoring data, audits, or coverage surveys, not just stories.</li>
            <li><b>Works in the country.</b> Each runs programs in Burkina Faso, Nigeria, or both, confirmed on its own site or by GiveWell.</li>
          </ul>

          <FilterBar label="Filter by country">
            {COUNTRY_FILTERS.map(([key, label]) => <Chip key={key} pressed={country === key} onClick={() => setCountry(key)}>{label}</Chip>)}
          </FilterBar>
          <Grid>{filterCharities(AFRICA, country).map(o => <CharityCard key={o.name} charity={o} />)}</Grid>

          <div className={styles.scam}>
            <h3>Give safely and avoid scams</h3>
            <ul>
              <li>Give on the charity's own website or through GiveWell. Type the address yourself instead of clicking links in texts, WhatsApp, or social media messages.</li>
              <li>Never send money by gift card, wire transfer, or cash app to a person who says they're collecting for a charity.</li>
              <li>Be careful with crowdfunding pages and personal appeals. They usually aren't audited, and you can't check where the money goes.</li>
              <li>Look up any charity on the <a href="https://apps.irs.gov/app/eos/" target="_blank" rel="noopener">IRS Tax Exempt Organization Search</a> and on <a href="https://www.charitynavigator.org" target="_blank" rel="noopener">Charity Navigator</a> before you give.</li>
              <li>No charity working in a conflict zone can promise that every dollar arrives. The groups above track their work closely, report problems in public, and are reviewed by outside evaluators.</li>
            </ul>
            <p className={styles.src}>Ratings and figures last checked September 26, 2026. Ratings can change, so check the evaluator's page before a large gift.</p>
          </div>
        </Section>
      </Container>
    </>
  )
}
