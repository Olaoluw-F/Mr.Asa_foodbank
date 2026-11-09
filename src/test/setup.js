import '@testing-library/jest-dom/vitest'
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'

// jsdom doesn't do layout, so scrolling does nothing there. Record the calls instead.
window.scrollTo = vi.fn()
Element.prototype.scrollIntoView = vi.fn()

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})
