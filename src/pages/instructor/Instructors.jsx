import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch';
import img from '../../assets/home/girl.jpg'


const Instructors = () => {

  const [instructor, setInstructor] = useState([]);
    const axiosFetch = useAxiosFetch();
    useEffect(()=>{
        axiosFetch.get('/instructors').then((data)=>{
            setInstructor(data.data)
        }).catch((err)=>{
            console.log(err)

        })

    },[])
    console.log(instructor)
  return (
    <div className='md:w-[80%] mx-auto my-36'>
      <div>
        <h1 className='text-5xl font-bold text-center '>Our <span className='text-secondary'>Best</span> Instructor</h1>
        <div className='w-[40%] text-center mx-auto my-4 '>
            <p className='text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, sequi cumque nam expedita blanditiis cum error qui laboriosam possimus suscipit consectetur? 
                Pariatur non quasi recusandae quas quis cupiditate animi iste.
            </p>
        </div>
      </div>


      
        {
            instructor ? <>
            <div className='grid mb-28 md:grid-cols-2 lg:grid-cols-4 w-[90%] ga[-4 mx-auto'>
                {
                    instructor?.slice(0,6).map((instructor,i)=>(
                        <div className='flex dark:text-white hover:translate-y-2 duration-200 cursor-pointer flex-col shadow-md py-8 px-8 md:px-8 rounded-md'>

                        <div className='flex-col flex gap-6 md:gap-8'>
                            <div><img className='rounded-full border-4 border-gray-300 h-24 w-24 mx-auto' src={instructor?.photoUrl || `${img}`} alt="" /></div>
                        </div>

                        <div className='flex flex-col text-center'>
                            <p className='font-medium text-lg dark:text-white text-gray-800'>
                                {instructor?.instructor?.name}
                            </p>
                            <p className='text-gray-500 '>
                                Instructor
                            </p>
                            <p className='text-gray-500 mb-4 '>Address: {instructor?.address}
                            </p>
                            <p className='text-gray-500 mb-4 '>Email: {instructor?.email}</p>
                        </div>

                        </div>

                    

                    ))
                }
            </div>
            </> : <><p>No Instructor available</p></>
        }
      
    </div>
  )
}

export default Instructors
