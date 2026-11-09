import { render, screen, waitFor, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { MemoryRouter, useLocation, useNavigate } from 'react-router'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { AppRoutes } from './App'

// Shows the current URL and offers a Back button, so tests can check navigation.
function Probe() {
  const { pathname, search, hash } = useLocation()
  const navigate = useNavigate()
  return (
    <>
      <output data-testid="url">{pathname + search + hash}</output>
      <button onClick={() => navigate(-1)}>test: back</button>
    </>
  )
}

function renderAt(url) {
  const user = userEvent.setup()
  render(<MemoryRouter initialEntries={[url]}><AppRoutes /><Probe /></MemoryRouter>)
  return user
}
const currentUrl = () => screen.getByTestId('url').textContent
const mainNav = () => within(screen.getByRole('navigation', { name: 'Main' }))

// Pin "today" to Monday, Oct 5 2026. Only Date is faked; timers stay real.
beforeEach(() => {
  vi.useFakeTimers({ toFake: ['Date'] })
  vi.setSystemTime(new Date(2026, 9, 5, 12))
})
afterEach(() => vi.useRealTimers())

describe('Home', () => {
  it('shows the stats', () => {
    renderAt('/')
    const stats = within(screen.getByRole('region', { name: 'At a glance' }))
    expect(stats.getByText('41')).toBeInTheDocument()
    expect(stats.getByText('22')).toBeInTheDocument()
    expect(stats.getByText('25')).toBeInTheDocument()
  })

  it('lists sites open today, open-to-anyone first, and links to all of them', async () => {
    const user = renderAt('/')
    const card = within(screen.getByRole('complementary', { name: 'Open today' }))
    expect(card.getByText('Open Monday')).toBeInTheDocument()
    const items = card.getAllByRole('listitem')
    expect(items).toHaveLength(4)
    expect(items[0]).toHaveTextContent('The Bowie Interfaith Pantry')

    await user.click(card.getByRole('link', { name: 'See all 19 open Monday' }))
    expect(currentUrl()).toBe('/food?day=Mon')
    expect(screen.getByText('19 of 41 sites')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Open today' })).toHaveAttribute('aria-pressed', 'true')
  })

  it('searches Find Food from the hero', async () => {
    const user = renderAt('/')
    await user.type(screen.getByRole('searchbox', { name: 'Town or ZIP code' }), '  Laurel ')
    await user.click(screen.getByRole('button', { name: 'Find food' }))
    expect(currentUrl()).toBe('/food?q=Laurel')
    expect(screen.getByRole('searchbox', { name: 'Search county food sites' })).toHaveValue('Laurel')
    expect(screen.getByText('7 of 41 sites')).toBeInTheDocument()
  })

  it('opens Find Food filtered by type from the tiles', async () => {
    const user = renderAt('/')
    const tiles = screen.getAllByRole('link').filter(a => a.getAttribute('href').startsWith('/food?type='))
    expect(tiles.map(a => a.querySelector('b').textContent)).toEqual(['12', '12', '8', '8'])

    await user.click(tiles[0])
    expect(currentUrl()).toBe('/food?type=Food+Pantry')
    expect(screen.getByRole('combobox', { name: 'Type' })).toHaveValue('Food Pantry')
    expect(screen.getByText('12 of 41 sites')).toBeInTheDocument()
  })
})

describe('Find Food', () => {
  it('reads filters from the URL and ignores unknown values', () => {
    renderAt('/food?type=Hot+Meals&town=Atlantis&anyone=1')
    expect(screen.getByRole('combobox', { name: 'Type' })).toHaveValue('Hot Meals')
    expect(screen.getByRole('combobox', { name: 'Town' })).toHaveValue('')
    expect(screen.getByRole('button', { name: 'Open to anyone' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByText('3 of 41 sites')).toBeInTheDocument()
  })

  it('keeps "Open today" and the day menu in sync', async () => {
    const user = renderAt('/food')
    const todayChip = screen.getByRole('button', { name: 'Open today' })
    const dayMenu = screen.getByRole('combobox', { name: 'Day open' })

    await user.click(todayChip)
    expect(dayMenu).toHaveValue('Mon')
    expect(currentUrl()).toBe('/food?day=Mon')

    await user.selectOptions(dayMenu, 'Tue')
    expect(todayChip).toHaveAttribute('aria-pressed', 'false')
    expect(screen.getByText('20 of 41 sites')).toBeInTheDocument()
  })

  it('shows 9 sites, then all of them, and starts over at 9 when filters change', async () => {
    const user = renderAt('/food')
    const moreHelpCards = 3
    expect(screen.getAllByRole('article')).toHaveLength(9 + moreHelpCards)

    await user.click(screen.getByRole('button', { name: 'Show all 41 sites' }))
    expect(screen.getAllByRole('article')).toHaveLength(41 + moreHelpCards)
    expect(screen.queryByRole('button', { name: /^Show all/ })).not.toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: 'Open to anyone' }))
    expect(screen.getByText('25 of 41 sites')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Show all 25 sites' })).toBeInTheDocument()
  })

  it('shows the empty state when nothing matches', async () => {
    const user = renderAt('/food')
    await user.type(screen.getByRole('searchbox', { name: 'Search county food sites' }), 'zzz')
    expect(currentUrl()).toBe('/food?q=zzz')
    expect(screen.getByText('No sites match. Try another day, clear a filter, or call 2-1-1.')).toBeInTheDocument()
  })

  it('adds a history step for menu and chip changes, but not for each keystroke', async () => {
    const user = renderAt('/food')
    await user.selectOptions(screen.getByRole('combobox', { name: 'Town' }), 'Laurel')
    await user.type(screen.getByRole('searchbox', { name: 'Search county food sites' }), 'fish')
    expect(currentUrl()).toBe('/food?q=fish&town=Laurel')

    await user.click(screen.getByRole('button', { name: 'test: back' }))
    expect(currentUrl()).toBe('/food')
    expect(screen.getByRole('combobox', { name: 'Town' })).toHaveValue('')
  })
})

describe('other pages', () => {
  it('Volunteer: "No car needed" leaves 2 rows', async () => {
    const user = renderAt('/volunteer')
    expect(screen.getByText('5 of 5 opportunities')).toBeInTheDocument()
    await user.click(screen.getByRole('button', { name: 'No car needed' }))
    expect(screen.getByText('2 of 5 opportunities')).toBeInTheDocument()
    expect(screen.getAllByRole('row')).toHaveLength(1 + 2)
  })

  it('Donate: filters charities by country', async () => {
    const user = renderAt('/donate')
    expect(screen.getAllByRole('article')).toHaveLength(7)
    await user.click(screen.getByRole('button', { name: 'Burkina Faso' }))
    expect(screen.getAllByRole('article')).toHaveLength(6)
    await user.click(screen.getByRole('button', { name: 'Nigeria' }))
    expect(screen.getAllByRole('article')).toHaveLength(7)
  })

  it('UMD: shows the empty state when no org has meeting times', async () => {
    const user = renderAt('/umd')
    await user.click(screen.getByRole('button', { name: 'Has meeting times' }))
    expect(screen.getByText('No groups match this filter yet.')).toBeInTheDocument()
  })

  it('About: shows the data counts', () => {
    renderAt('/about')
    expect(screen.getByText('41 sites in 22 towns')).toBeInTheDocument()
  })
})

describe('layout and navigation', () => {
  it('marks the current page in the menu and sets the tab title', async () => {
    renderAt('/umd')
    expect(mainNav().getByRole('link', { name: 'UMD Students' })).toHaveAttribute('aria-current', 'page')
    expect(mainNav().getByRole('link', { name: 'Home' })).not.toHaveAttribute('aria-current')
    await waitFor(() => expect(document.title).toBe('UMD Students · Mr. ASA Food Hub'))
  })

  it('uses the plain site name as the Home title', async () => {
    renderAt('/')
    await waitFor(() => expect(document.title).toBe('Mr. ASA Food Hub'))
  })

  it('closes the mobile menu after navigating', async () => {
    const user = renderAt('/')
    const toggle = screen.getByRole('button', { name: 'Open menu' })
    await user.click(toggle)
    expect(toggle).toHaveAttribute('aria-expanded', 'true')

    await user.click(mainNav().getByRole('link', { name: 'Donate' }))
    expect(currentUrl()).toBe('/donate')
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })

  it.each([['/#food', '/food'], ['/#africa', '/donate#africa'], ['/index.html#umd', '/umd']])('redirects the old v1 link %s to %s', (from, to) => {
    renderAt(from)
    expect(currentUrl()).toBe(to)
  })

  it('sends unknown paths Home', () => {
    renderAt('/nope')
    expect(currentUrl()).toBe('/')
  })

  it.each([['/donate#africa', 'africa'], ['/about#faq', 'faq']])('jumps to the section for %s', async (url, id) => {
    renderAt(url)
    await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled())
    expect(Element.prototype.scrollIntoView.mock.contexts[0]).toHaveAttribute('id', id)
  })

  it('jumps to #africa from the footer link on another page', async () => {
    const user = renderAt('/volunteer')
    await user.click(screen.getByRole('link', { name: 'Give to Burkina Faso & Nigeria' }))
    expect(currentUrl()).toBe('/donate#africa')
    await waitFor(() => expect(Element.prototype.scrollIntoView).toHaveBeenCalled())
    expect(Element.prototype.scrollIntoView.mock.contexts[0]).toHaveAttribute('id', 'africa')
  })

  it('scrolls to the top on a normal page change', async () => {
    const user = renderAt('/')
    window.scrollTo.mockClear()
    await user.click(mainNav().getByRole('link', { name: 'About' }))
    await waitFor(() => expect(window.scrollTo).toHaveBeenCalledWith(0, 0))
  })
})
