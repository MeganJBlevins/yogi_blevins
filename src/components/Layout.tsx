import { Outlet } from 'react-router-dom'
import Navigation from './Navigation'
import Footer from './Footer'
import BackgroundGrid from './BackgroundGrid'

function Layout() {
  return (
    <>
      <BackgroundGrid />
      <Navigation />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default Layout

