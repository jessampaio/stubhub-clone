import { useContext, useEffect, useState } from 'react';
import Footer from '../components/Footer'
import MainSearchBar from '../components/MainSearchBar'
import { Outlet } from 'react-router-dom'
import UserContext from '../contexts/userContext';

const Layout = () => {

  const { showSearch } = useContext(UserContext)

  return (
    <>
      {showSearch && <MainSearchBar />}
      <Outlet />
      <Footer />
    </>
  )
}

export default Layout
