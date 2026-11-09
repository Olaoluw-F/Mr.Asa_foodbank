import Container from '../ui/Container'
import Icon from '../ui/Icon'
import styles from './CrisisBar.module.css'

/** Gold "Need help now? Call 2-1-1" strip above the footer. */
export default function CrisisBar() {
  return (
    <div className={styles.crisisBar}>
      <Container className={styles.inner}>
        <Icon name="phone" /><b>Need help now?</b><span>Call or text 2-1-1 (Maryland 211), available 24/7, for food, housing, and utility help.</span>
      </Container>
    </div>
  )
}
