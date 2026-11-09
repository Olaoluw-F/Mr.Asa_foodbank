import { describe, expect, it } from 'vitest'
import { AFRICA } from '../data/charities'
import { FOOD } from '../data/foodResources'
import { ORGS } from '../data/umdOrgs'
import { VOL } from '../data/volunteer'
import { filterCharities, filterOrgs, filterUmdResources, filterVolunteer, uniqueSorted } from './filters'

describe('filterVolunteer', () => {
  it('filters by area, type of work, search and "no car needed"', () => {
    expect(filterVolunteer(VOL)).toHaveLength(5)
    expect(filterVolunteer(VOL, { walkOnly: true }).map(r => r.org)).toEqual(['Sample community pantry', 'Sample PGCPS middle school'])
    expect(filterVolunteer(VOL, { type: 'School support' })).toHaveLength(2)
    expect(filterVolunteer(VOL, { area: 'Greenbelt' })).toHaveLength(1)
    expect(filterVolunteer(VOL, { q: 'GARDEN' })).toHaveLength(1)
    expect(filterVolunteer(VOL, { q: 'garden', walkOnly: true, area: 'Hyattsville' })).toHaveLength(0)
  })

  it('lists dropdown options A to Z', () => {
    expect(uniqueSorted(VOL, 'type')).toEqual(['Garden', 'Pantry', 'School support', 'Warehouse'])
  })
})

describe('filterUmdResources', () => {
  it('leaves out the regional "community" services', () => {
    expect(filterUmdResources(FOOD)).toHaveLength(5)
    expect(filterUmdResources(FOOD).some(r => r.cat === 'community')).toBe(false)
  })

  it('filters by category and search', () => {
    expect(filterUmdResources(FOOD, { cat: 'campus' })).toHaveLength(3)
    expect(filterUmdResources(FOOD, { cat: 'benefits' })).toHaveLength(2)
    expect(filterUmdResources(FOOD, { q: 'snap' })).toHaveLength(2)
    expect(filterUmdResources(FOOD, { q: 'snap', cat: 'campus' })).toHaveLength(0)
  })
})

describe('filterOrgs', () => {
  it('filters by kind, volunteering and meeting times', () => {
    expect(filterOrgs(ORGS)).toHaveLength(7)
    expect(filterOrgs(ORGS, 'Student org')).toHaveLength(3)
    expect(filterOrgs(ORGS, 'Campus program')).toHaveLength(4)
    expect(filterOrgs(ORGS, 'volunteer')).toHaveLength(6)
    expect(filterOrgs(ORGS, 'meets')).toHaveLength(0)
  })
})

describe('filterCharities', () => {
  it('filters by country', () => {
    expect(filterCharities(AFRICA)).toHaveLength(7)
    expect(filterCharities(AFRICA, 'BF')).toHaveLength(6)
    expect(filterCharities(AFRICA, 'NG')).toHaveLength(7)
  })
})
