import React from 'react'
import MainBanner from '../Componets/MainBanner'
import Categories from '../Componets/Categories'
import BestSeller from '../Componets/BestSeller'

const Home = () => {
  return (
    <div className='mt-10'>
        <MainBanner />
        <Categories />
        <BestSeller/>
    </div>
  )
}

export default Home