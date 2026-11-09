import Button from '../../components/ui/Button'
import Eyebrow from '../../components/ui/Eyebrow'
import Promo from '../../components/ui/Promo'
import { Band, SectionHead } from '../../components/ui/Section'
import HelpCards from './HelpCards'
import Hero from './Hero'
import Stats from './Stats'
import TypeTiles from './TypeTiles'
import styles from './HomePage.module.css'

export default function HomePage() {
  return (
    <>
      <Hero />
      <Stats />
      <Band>
        <SectionHead center>
          <Eyebrow>How can we help?</Eyebrow>
          <h2>Start where you are today</h2>
        </SectionHead>
        <HelpCards />
      </Band>
      <Band alt>
        <SectionHead>
          <Eyebrow>Browse by type</Eyebrow>
          <h2>What kind of food help do you need?</h2>
          <p>Tap a type to see every site in the county finder.</p>
        </SectionHead>
        <TypeTiles />
      </Band>
      <Band className={styles.split}>
        <Promo tone="soft">
          <Eyebrow>Volunteer</Eyebrow>
          <h2>Give an afternoon, feed a classroom.</h2>
          <p>Pack weekend meals for PGCPS students, sort food at a warehouse, or hand out groceries at a local pantry.</p>
          <Button to="/volunteer">Find a shift</Button>
        </Promo>
        <Promo tone="deep">
          <Eyebrow tone="light">For UMD students</Eyebrow>
          <h2>No Terp should have to choose between class and a meal.</h2>
          <p>The Campus Pantry, meal help, SNAP for students, and student organizations fighting hunger at UMD.</p>
          <Button to="/umd">UMD resources</Button>
        </Promo>
      </Band>
    </>
  )
}
