import { DAY_KEYS } from './days'

/**
 * A county food site, as stored in src/data/pg-county-food-sites.json.
 * An empty string means "not known", and the site hides that field.
 * @typedef {object} Site
 * @property {string} type    "Food Pantry", "Hot Meals", "Farmers Market", "Food Distribution" or "Food Market"
 * @property {string} name
 * @property {string} addr    street address ("" when the location varies)
 * @property {string} town
 * @property {string} zip
 * @property {string} host    building or group that hosts the site
 * @property {string} sponsor
 * @property {Object<string, string>} hours  day key (Sun…Sat) → hours text; closed days are left out
 * @property {string} model   how it works, like "Walk-ins Welcome"
 * @property {string} elig    who can come; "" means open to anyone
 * @property {string} format  like "Customer Choice"
 * @property {string} reg     registration needed: "Yes", "No" or ""
 * @property {string} limits  how often you can visit
 * @property {string} url     official website
 */

/** Short descriptions for the Home type tiles. */
export const TYPE_INFO = {"Food Pantry":"Groceries to take home","Hot Meals":"Sit-down or take-away meals","Farmers Market":"Fresh produce, benefits accepted","Food Distribution":"Mobile markets and drive-throughs","Food Market":"Low-cost grocery market"}

/** Plural label for a type tile: "Food Pantry" → "Food Pantries". */
export const typeLabel = t => ({"Food Pantry":"Food Pantries","Hot Meals":"Hot Meals"})[t] || t+"s"

/** Pill tone for a site type. */
export const siteTone = t => /Pantry|Distribution/.test(t) ? "food" : /Meal/.test(t) ? "warn" : ""

/** Unique React key for a site (names repeat, name + address doesn't). */
export const siteKey = r => `${r.name}|${r.addr}`

export const towns = sites => [...new Set(sites.map(r => r.town).filter(Boolean))].sort()
export const siteTypes = sites => [...new Set(sites.map(r => r.type))].sort()

/** Sites with no eligibility rule ("open to anyone"). */
export const openToAnyone = sites => sites.filter(r => !r.elig)

/** Sites with hours listed for `day`. */
export const openOn = (sites, day) => sites.filter(r => r.hours[day])

/** Up to `max` sites open on `day` for the Home card, open-to-anyone sites first. */
export function pickOpenToday(sites, day, max = 4) {
  const open = openOn(sites, day)
  return [...open.filter(r => !r.elig), ...open.filter(r => r.elig)].slice(0, max)
}

/** [type, count] pairs, most common first; ties keep the data's order. */
export function typeCounts(sites) {
  const counts = sites.reduce((m, r) => (m[r.type] = (m[r.type] || 0) + 1, m), {})
  return Object.entries(counts).sort((a, b) => b[1] - a[1])
}

/** Find Food filters. q matches name, town, ZIP, address and host. */
export function filterSites(sites, { q = "", type = "", town = "", day = "", anyone = false } = {}) {
  const needle = q.trim().toLowerCase()
  return sites.filter(r => (!type || r.type === type) && (!town || r.town === town) && (!day || r.hours[day]) && (!anyone || !r.elig) &&
    (!needle || (r.name+" "+r.town+" "+r.zip+" "+r.addr+" "+r.host).toLowerCase().includes(needle)))
}

/** "2614 Kenhill Drive, Suite 134, Bowie, MD 20715" (parts that exist). */
export const formatAddress = r => [r.addr, r.town, r.zip && ("MD "+r.zip)].filter(Boolean).join(", ")

/** Google Maps search link, or "" when the site has no street address. */
export const mapsUrl = r => r.addr ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(r.name+" "+formatAddress(r))}` : ""

/*
 * Find Food keeps its filters in the URL: /food?q=laurel&type=Food+Pantry&town=Laurel&day=Mon&anyone=1
 * Values that aren't a known type, town or day are ignored.
 */
export function readFinderParams(params, { types = [], towns = [] } = {}) {
  const known = (key, list) => list.includes(params.get(key)) ? params.get(key) : ""
  return {
    q: params.get("q") ?? "",
    type: known("type", types),
    town: known("town", towns),
    day: known("day", DAY_KEYS),
    anyone: params.get("anyone") === "1",
  }
}

export function writeFinderParams({ q, type, town, day, anyone } = {}) {
  const params = new URLSearchParams()
  if (q) params.set("q", q)
  if (type) params.set("type", type)
  if (town) params.set("town", town)
  if (day) params.set("day", day)
  if (anyone) params.set("anyone", "1")
  return params
}

/** Link to Find Food with these filters set and every other filter cleared. */
export function findFoodPath(filters) {
  const query = writeFinderParams(filters).toString()
  return query ? `/food?${query}` : "/food"
}
