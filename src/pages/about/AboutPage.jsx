import { PG, TOWNS } from '../../data/sites'
import PageTitle from '../../components/ui/PageTitle'
import Container from '../../components/ui/Container'
import Eyebrow from '../../components/ui/Eyebrow'
import { Section, SectionHead } from '../../components/ui/Section'
import styles from './AboutPage.module.css'

export default function AboutPage() {
  return (
    <>
      <PageTitle>About Mr. ASA</PageTitle>
      <Container>
        <Section>
          <div className={styles.aboutGrid}>
            <div className={styles.prose}>
              <h2>Our mission</h2>
              <p>Food help in Prince George's County is spread across dozens of pantries, churches, schools, and county programs, each with its own hours and rules. Mr. ASA puts it in one place so anyone can find food quickly, and so people who want to help can find where they're needed.</p>
              <p>We started with University of Maryland students and grew to serve the whole county, with a focus on PGCPS schools and the families they serve.</p>
              <h2 className={styles.touch}>Get in touch</h2>
              <p>To add or correct a listing, list volunteer needs, or match a food drive with a pantry, contact the Mr. ASA team. Include the organization name, what changed, and a link to the official source.</p>
            </div>
            <div className={styles.fact}>
              <h3>About our data</h3>
              <dl>
                <dt>Food sites</dt><dd>County pantry map, verified May 29, 2026</dd>
                <dt>Coverage</dt><dd>{PG.length} sites in {TOWNS.length} towns</dd>
                <dt>Volunteering</dt><dd>PGCPS volunteering database (coming soon)</dd>
                <dt>Updates</dt><dd>Hours change often. Always confirm with the site.</dd>
              </dl>
            </div>
          </div>
        </Section>
        <Section id="faq">
          <SectionHead><Eyebrow>FAQ</Eyebrow><h2>Common questions</h2></SectionHead>
          <div className={styles.faq}>
            <details><summary>Do I need to show ID or proof of income?</summary><p>It depends on the site. Many pantries welcome walk-ins with no paperwork. Some ask for proof of county residency, and senior meal sites are for adults 60 and older. Each listing shows its rules.</p></details>
            <details><summary>What does TEFAP mean on a listing?</summary><p>TEFAP is the federal Emergency Food Assistance Program. Sites that hand out TEFAP food may ask you to confirm your address and household income on a short form.</p></details>
            <details><summary>Can volunteering count toward PGCPS service hours?</summary><p>Many opportunities do. Check the service hours column and confirm with your school's service-learning coordinator before you start.</p></details>
            <details><summary>Can UMD students use the county sites too?</summary><p>Yes, if they meet the site's rules. Many sites are open to anyone. The UMD Students page also lists campus-only resources.</p></details>
          </div>
        </Section>
      </Container>
    </>
  )
}
