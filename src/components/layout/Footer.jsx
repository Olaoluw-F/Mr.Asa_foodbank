import { Link } from 'react-router'
import Container from '../ui/Container'
import styles from './Footer.module.css'

const YEAR = new Date().getFullYear()

export default function Footer() {
  return (
    <footer className={styles.siteFoot}>
      <Container className={styles.inner}>
        <div className={styles.footCols}>
          <div>
            <div className={styles.footBrand}>Mr. ASA Food Hub</div>
            <p>Free food and ways to help across Prince George's County, all in one place.</p>
          </div>
          <div><h4>Get help</h4><ul><li><Link to="/food">Find food</Link></li><li><Link to="/umd">UMD students</Link></li><li><a href="https://211md.org" target="_blank" rel="noopener">Maryland 211</a></li></ul></div>
          <div><h4>Get involved</h4><ul><li><Link to="/volunteer">Volunteer</Link></li><li><Link to="/donate">Donate locally</Link></li><li><Link to="/donate#africa">Give to Burkina Faso &amp; Nigeria</Link></li><li><Link to="/about">List your program</Link></li></ul></div>
          <div><h4>About</h4><ul><li><Link to="/about">Our mission</Link></li><li><Link to="/about#faq">FAQ</Link></li><li><Link to="/about">Contact</Link></li></ul></div>
        </div>
        <div className={styles.footBottom}>
          <p className={styles.footLegal}>Mr. ASA Food Hub is a student-run project. It isn't an official website of Prince George's County, PGCPS, or the University of Maryland. Hours and eligibility change, so always confirm with the site.</p>
          <p className={styles.copyright}>{`© ${YEAR} Mr. ASA Food Hub`}</p>
        </div>
      </Container>
    </footer>
  )
}
