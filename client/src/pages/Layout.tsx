import Footer from '../components/Footer'
import MainSearchBar from '../components/MainSearchBar'
import { Outlet } from 'react-router-dom'

const Layout = () => {

  const currentPath = window.location.href
  console.log('HELLO')

  if (currentPath.includes('login') || currentPath.includes('register')) {

    return (
      <>
        <Outlet />
        <Footer />
      </>
    )
  }
  else {
    return (
      <>
        <MainSearchBar />
        <Outlet />
        <Footer />
      </>
    )
  }
}

export default Layout
