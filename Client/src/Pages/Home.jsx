import React from 'react'
import MainBanner from '../Componets/MainBanner'
import Categories from '../Componets/Categories'
import BestSeller from '../Componets/BestSeller'
import BottomBanner from '../Componets/BottomBanner'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner />
        <Categories />
        <BestSeller/>
        <BottomBanner/>
    </div>
  )
}

export default Home