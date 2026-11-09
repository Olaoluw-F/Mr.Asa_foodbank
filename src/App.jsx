import { BrowserRouter, Navigate, Route, Routes } from 'react-router'
import Layout from './components/layout/Layout'
import AboutPage from './pages/about/AboutPage'
import DonatePage from './pages/donate/DonatePage'
import FindFoodPage from './pages/food/FindFoodPage'
import HomePage from './pages/home/HomePage'
import UmdPage from './pages/umd/UmdPage'
import VolunteerPage from './pages/volunteer/VolunteerPage'

/** Every page sits inside Layout. Unknown paths go Home, as in v1. */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="food" element={<FindFoodPage />} />
        <Route path="volunteer" element={<VolunteerPage />} />
        <Route path="donate" element={<DonatePage />} />
        <Route path="umd" element={<UmdPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}

export default function App() {
  return <BrowserRouter><AppRoutes /></BrowserRouter>
}
