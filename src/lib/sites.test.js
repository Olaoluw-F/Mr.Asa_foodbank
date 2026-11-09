import { describe, expect, it } from 'vitest'
import { PG, SITE_TYPES, TOWNS } from '../data/sites'
import {
  filterSites, findFoodPath, formatAddress, mapsUrl, openToAnyone, pickOpenToday,
  readFinderParams, siteKey, siteTone, typeCounts, typeLabel,
} from './sites'

// Expected numbers were counted separately from the v1 filter rules.
describe('county site data', () => {
  it('has the counts v1 showed on Home and About', () => {
    expect(PG).toHaveLength(41)
    expect(TOWNS).toHaveLength(22)
    expect(openToAnyone(PG)).toHaveLength(25)
  })

  it('gives every site a unique key', () => {
    expect(new Set(PG.map(siteKey)).size).toBe(PG.length)
  })

  it('sorts types for the Type filter', () => {
    expect(SITE_TYPES).toEqual(['Farmers Market', 'Food Distribution', 'Food Market', 'Food Pantry', 'Hot Meals'])
  })

  it('picks the four Home tiles in v1 order', () => {
    const top = typeCounts(PG).slice(0, 4)
    expect(top).toEqual([['Food Pantry', 12], ['Hot Meals', 12], ['Farmers Market', 8], ['Food Distribution', 8]])
    expect(top.map(([t]) => typeLabel(t))).toEqual(['Food Pantries', 'Hot Meals', 'Farmers Markets', 'Food Distributions'])
  })

  it('colors pills by type', () => {
    expect(siteTone('Food Pantry')).toBe('food')
    expect(siteTone('Food Distribution')).toBe('food')
    expect(siteTone('Hot Meals')).toBe('warn')
    expect(siteTone('Farmers Market')).toBe('')
  })
})

describe('filterSites', () => {
  it('returns every site with no filters', () => {
    expect(filterSites(PG)).toHaveLength(41)
  })

  it('searches name, town, ZIP, address and host, ignoring case and extra spaces', () => {
    expect(filterSites(PG, { q: '  LAUREL ' })).toHaveLength(7)
    expect(filterSites(PG, { q: '20743' })).toHaveLength(6)
    expect(filterSites(PG, { q: 'senior center' })).toHaveLength(2)
    expect(filterSites(PG, { q: 'zzz' })).toHaveLength(0)
  })

  it('filters by type, town, day and "open to anyone", together', () => {
    expect(filterSites(PG, { type: 'Food Pantry' })).toHaveLength(12)
    expect(filterSites(PG, { type: 'Food Pantry', town: 'Laurel' })).toHaveLength(2)
    expect(filterSites(PG, { day: 'Mon' })).toHaveLength(19)
    expect(filterSites(PG, { day: 'Fri', anyone: true })).toHaveLength(12)
    expect(filterSites(PG, { type: 'Hot Meals', anyone: true })).toHaveLength(3)
  })
})

describe('pickOpenToday', () => {
  it('lists up to four sites, open-to-anyone first', () => {
    expect(pickOpenToday(PG, 'Mon').map(r => r.name)).toEqual([
      'The Bowie Interfaith Pantry and Emergency Fund / Bowie Food Pantry',
      'Mission of Love Charities',
      'Shabach! Ministries, Inc. Emergency Resource Center',
      'Laurel Advocacy and Referral Service (LARS)',
    ])
  })

  it('falls back to sites with rules when too few are open to anyone', () => {
    const sun = pickOpenToday(PG, 'Sun')
    expect(sun).toHaveLength(3)
    expect(sun.map(r => !r.elig)).toEqual([true, true, false])
  })
})

describe('addresses', () => {
  it('joins the parts that exist', () => {
    expect(formatAddress(PG[0])).toBe('2614 Kenhill Drive, Suite 134, Bowie, MD 20715')
    expect(formatAddress({ addr: '', town: '', zip: '' })).toBe('')
  })

  it('links to Google Maps only when there is a street address', () => {
    expect(mapsUrl(PG[0])).toBe('https://www.google.com/maps/search/?api=1&query=' +
      encodeURIComponent('The Bowie Interfaith Pantry and Emergency Fund / Bowie Food Pantry 2614 Kenhill Drive, Suite 134, Bowie, MD 20715'))
    expect(mapsUrl({ ...PG[0], addr: '' })).toBe('')
  })
})

describe('Find Food URL params', () => {
  const lists = { types: SITE_TYPES, towns: TOWNS }

  it('reads known values and ignores unknown ones', () => {
    const params = new URLSearchParams('q=laurel&type=Food+Pantry&town=Atlantis&day=Funday&anyone=1')
    expect(readFinderParams(params, lists)).toEqual({ q: 'laurel', type: 'Food Pantry', town: '', day: '', anyone: true })
  })

  it('defaults to no filters', () => {
    expect(readFinderParams(new URLSearchParams(), lists)).toEqual({ q: '', type: '', town: '', day: '', anyone: false })
  })

  it('builds links with only the filters that are set', () => {
    expect(findFoodPath({})).toBe('/food')
    expect(findFoodPath({ q: 'Laurel' })).toBe('/food?q=Laurel')
    expect(findFoodPath({ type: 'Food Pantry', day: 'Mon', anyone: true })).toBe('/food?type=Food+Pantry&day=Mon&anyone=1')
  })
})
