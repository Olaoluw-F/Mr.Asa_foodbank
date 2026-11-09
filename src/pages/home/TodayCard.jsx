import { PG } from '../../data/sites'
import { DAY_NAMES, getToday } from '../../lib/days'
import { findFoodPath, openOn, pickOpenToday, siteKey } from '../../lib/sites'
import Button from '../../components/ui/Button'
import styles from './TodayCard.module.css'

/** "Open Monday" card in the hero: a few sites open today and a link to all of them. */
export default function TodayCard() {
  const today = getToday()
  const pick = pickOpenToday(PG, today)
  return (
    <aside className={styles.today} aria-label="Open today">
      <div className={styles.todayHead}><b>{`Open ${DAY_NAMES[today]}`}</b><span className={styles.live}>Live list</span></div>
      <ul>
        {pick.length ? pick.map(r => (
          <li key={siteKey(r)}><b>{r.name}</b><span>{`${r.town || "Countywide"} · ${r.type}`}</span><span className={styles.hrs}>{r.hours[today]}</span></li>
        )) : <li><span>No listed sites are open today. Call or text 2-1-1 for help.</span></li>}
      </ul>
      <Button to={findFoodPath({ day: today })} variant="ghost" size="small" className={styles.todayAll}>{`See all ${openOn(PG, today).length} open ${DAY_NAMES[today]}`}</Button>
    </aside>
  )
}
