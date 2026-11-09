import { useEffect } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router'
import { legacyRedirect } from '../../lib/legacyRedirect'
import { pageTitle } from '../../lib/pages'
import IconSprite from '../ui/IconSprite'
import CrisisBar from './CrisisBar'
import Footer from './Footer'
import Header from './Header'

/** Shell around every page. */
export default function Layout() {
  const { pathname, hash } = useLocation()

  // On a new page or #anchor: set the tab title, then jump to the anchor
  // (#africa, #faq) or back to the top. Query changes (Find Food filters) don't scroll.
  useEffect(() => {
    document.title = pageTitle(pathname)
    if (hash) {
      // Jump again once web fonts load, since they can move the target (browsers do the same for static pages).
      const jump = () => document.getElementById(decodeURIComponent(hash.slice(1)))?.scrollIntoView()
      requestAnimationFrame(() => { jump(); document.fonts?.ready.then(jump) })
    } else window.scrollTo(0, 0)
  }, [pathname, hash])

  // An old v1 link like /#food typed or pasted while the site is already open.
  // (main.jsx handles old links on a fresh page load.)
  const legacy = legacyRedirect(pathname, hash)
  if (legacy) return <Navigate to={legacy} replace />

  return (
    <>
      <IconSprite />
      <Header />
      <main><Outlet /></main>
      <CrisisBar />
      <Footer />
    </>
  )
}
