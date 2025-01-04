import React from 'react'
import Home from './Home'
import BreakingNews from './HomeComponent/BrakingNews'
import Footer from './HomeComponent/Footer'
import Image from './HomeComponent/Image'
import Teammates from './Teammates'

function Main() {
  return (
    <div>
      <BreakingNews/>
        <Image/>
        <Home/>
        <Teammates/>
        <Footer/>
    </div>
  )
}

export default Main