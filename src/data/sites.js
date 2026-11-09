import PG from './pg-county-food-sites.json'
import { siteTypes, towns } from '../lib/sites'

// Prince George's County pantry map (Master List, verified May 29 2026).
// Source spreadsheet: data-sources/Pantry Map - as of May 29 2026.xlsx
// Record fields are described by the Site typedef in src/lib/sites.js.
export { PG }

/** Every town with a site, A to Z (for the Town filter and the stats). */
export const TOWNS = towns(PG)

/** Every site type, A to Z (for the Type filter). */
export const SITE_TYPES = siteTypes(PG)
