import React from 'react'
import NavBar from '../NavBar'

const Header = () => {
  return (
    <header className='headerContainer text-colorCustom1 hidden fixed top-0 left-0 lg:left-0 lg:top-1 min-w-[300px] w-[100%] h-[130px] lg:h-auto   justify-center items-center font-bold text-xl uppercase text-center pt-[0] z-20'>
      <NavBar />
    </header>
  )
}

export default Header
