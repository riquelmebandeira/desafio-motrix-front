import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import Contents from './pages/Contents'
import ContentDetails from './pages/ContentDetails'

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Contents />}></Route>
        <Route path="/:id" element={<ContentDetails />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes
