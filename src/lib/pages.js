export const SITE_NAME = "Mr. ASA Food Hub"

/** The six pages, in menu order. */
export const PAGES = [
  { path: "/", label: "Home" },
  { path: "/food", label: "Find Food" },
  { path: "/volunteer", label: "Volunteer" },
  { path: "/donate", label: "Donate" },
  { path: "/umd", label: "UMD Students" },
  { path: "/about", label: "About" },
]

/** Browser tab title: "Find Food · Mr. ASA Food Hub", or just the site name on Home. */
export function pageTitle(pathname) {
  const page = PAGES.find(p => p.path === pathname)
  return !page || page.path === "/" ? SITE_NAME : `${page.label} · ${SITE_NAME}`
}
