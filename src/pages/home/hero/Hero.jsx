import React from 'react'
import bgImg from '../../../assets/home/banner-1.jpg'
import { Link } from 'react-router-dom'


const Hero = () => {
  return (
    <div className='min-h-screen bg-cover' style={{backgroundImage: `url(${bgImg})`}}>
      <div className='min-h-screen flex justify-start pl-11 items-center text-white bg-black bg-opacity-60'>
        <div>
            <div className='space-y-4 '>
                <p className='md:text-4xl text-2xl'>We Provide</p>
                <h1 className='md:text-7xl text-4xl font-bold'>Best Yoga Course Online</h1>
                <div className='md:w-1/2'>
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Explicabo voluptatum optio labore doloremque, ipsa placeat? Numquam, asperiores facere. Deleniti tempora ad cupiditate
                         iusto dicta expedita veniam sint quidem cumque ipsa.</p>
                </div>

                <div className='flex flex-wrap items-center gap-5'>

                    <button className='px-7 py-3 rounded-lg bg-secondary font-bold uppercase'>Join Now</button>
                    <Link to="/classes"><button className='px-7 py-3 rounded-lg border font-bold uppercase hover:bg-secondary'>View Course</button></Link>
                </div>
            </div>

        </div>
      </div>
    </div>
  )
}

export default Hero
