import React from 'react'
import HeroContainer from './hero/HeroContainer'
import Gallery from './gallery/Gallery'
import PopularClasses from './popularClasses/PopularClasses'
import PopularTeacher from './popular Teacher/PopularTeacher'
import useAuth from '../../hooks/useAuth'

const Home = () => {
  
  return (
    <section>
      <HeroContainer />
      <div className='max-w-screen-xl mx-auto '>
        <Gallery />
        <PopularClasses />
        <PopularTeacher />

      </div>
    </section>
  )
}

export default Home
