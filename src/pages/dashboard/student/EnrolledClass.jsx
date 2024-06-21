import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useUser from '../../../hooks/useUser';
import { Link } from 'react-router-dom';

const EnrolledClass = () => {
  const [data,setData] = useState([]);
  const axiosSecure = useAxiosSecure();
  const {currentUser} = useUser();

  useEffect(()=>{
    axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
    .then(res=>{
      setData(res.data);
  }).catch(err=>console.log(err));
  },[])
  return (
    <div>
      <h1 className='text-2xl my-6'>Enrolled Classes</h1>
      <div className='grid md:grid-cols-2 gap-6 grid-cols-1 lg:grid-cols-3'>
        {
          data.map((item, index)=>(
            <div key={index} className='bg-white shadow-md h-96 mx-3 rounded-3xl flex md:flex-row justify-around items-center overflow-hidden sm:flex-grow sm:h-52 sm:w-3/5'>
              <img src={item.classes.image} className='h-1/2 w-full sm:h-full sm:w-1/2 object-cover' alt="" />
              <div className='flex-1 w-full flex flex-col items-baseline justify-around h-1/2 pl-6 sm:h-full sm:items-baseline sm:w-1/2'>
                <div>
                  <h1>{item.classes.name}</h1>
                  <p>By {item.classes.instructorName}</p>
                </div>
                <div className='flex gap-3'>
                  <p className='font-bold text-gray-500'>Rp. {item.classes.price}</p>
                  <Link><button className='bg-secondary font-bold rounded-xl mr-5 text-white px-3 py-1 shadow-md'>View</button></Link>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default EnrolledClass
