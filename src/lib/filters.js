/** Unique values of `key`, A to Z, for a filter dropdown. */
export const uniqueSorted = (rows, key) => [...new Set(rows.map(r => r[key]))].sort()

/** Volunteer page filters. */
export function filterVolunteer(rows, { q = "", area = "", type = "", walkOnly = false } = {}) {
  const needle = q.trim().toLowerCase()
  return rows.filter(r => (!area || r.area === area) && (!type || r.type === type) && (!walkOnly || r.walk) &&
    (!needle || (r.org+r.task+r.area+r.sub).toLowerCase().includes(needle)))
}

/** UMD food help. "community" entries appear on Find Food instead. cat: "all", "campus" or "benefits". */
export function filterUmdResources(rows, { q = "", cat = "all" } = {}) {
  const needle = q.trim().toLowerCase()
  return rows.filter(r => r.cat !== "community" && (cat === "all" || r.cat === cat) &&
    (!needle || (r.name+r.desc+r.tags.join(" ")+r.where).toLowerCase().includes(needle)))
}

/** UMD orgs. filter: "all", "volunteer", "meets", or a kind ("Student org", "Campus program"). */
export const filterOrgs = (orgs, filter = "all") =>
  orgs.filter(o => filter === "all" || (filter === "volunteer" ? o.vol : filter === "meets" ? !!o.meets : o.kind === filter))

/** Charities. country: "all", "BF" or "NG". */
export const filterCharities = (charities, country = "all") =>
  charities.filter(o => country === "all" || o.c.includes(country))
