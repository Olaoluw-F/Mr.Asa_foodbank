import { cx } from '../../lib/cx'
import styles from './Icon.module.css'

/** Line icon from the sprite in IconSprite.jsx: <Icon name="search" />. Takes the text color. */
export default function Icon({ name, className }) {
  return <svg className={cx(styles.icon, className)}><use href={`#i-${name}`} /></svg>
}
