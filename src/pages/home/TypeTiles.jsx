import { Link } from 'react-router'
import { PG } from '../../data/sites'
import { findFoodPath, TYPE_INFO, typeCounts, typeLabel } from '../../lib/sites'
import styles from './TypeTiles.module.css'

/** The four most common site types. Each opens Find Food filtered to that type. */
export default function TypeTiles() {
  return (
    <div className={styles.types}>
      {typeCounts(PG).slice(0, 4).map(([type, n]) => (
        <Link key={type} className={styles.typeTile} to={findFoodPath({ type })}>
          <b>{n}</b><span>{typeLabel(type)}</span><small>{TYPE_INFO[type] || ""}</small>
        </Link>
      ))}
    </div>
  )
}
