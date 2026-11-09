// v1 was one page with hash links (#food, #africa…). These are the new homes
// of those links, so bookmarks and shared links keep working.
const LEGACY = {
  home: "/",
  food: "/food",
  volunteer: "/volunteer",
  donate: "/donate",
  umd: "/umd",
  about: "/about",
  africa: "/donate#africa",
  faq: "/about#faq",
}

/**
 * Where an old v1 URL should go, or null if it isn't one.
 * Only the site root (or /index.html) is checked, since that's where v1 lived.
 * Unknown hashes go Home, as they did in v1.
 */
export function legacyRedirect(pathname, hash) {
  if (pathname !== "/" && pathname !== "/index.html") return null
  const key = hash.slice(1)
  if (!key) return pathname === "/index.html" ? "/" : null
  return LEGACY[key] ?? "/"
}
