import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import Card from './Card';


const PopularClasses = () => {

    const axiosFetch = useAxiosFetch();
    const [classes,setClassses] = useState([]);
    useEffect(()=>{
        const fetchClasses = async () =>{
            const response = await axiosFetch.get('https://online-course-yoga-server-e15cda602871.herokuapp.com/classes');
            
            setClassses(response.data);

        }
        fetchClasses();

    },[])
  return (
    <div className='md:w-[80%] mx-auto my-36'>
      <div>
        <h1 className='text-5xl font-bold text-center '>Our <span className='text-secondary'>Popular</span> Classes</h1>
        <div className='w-[40%] text-center mx-auto my-4 '>
            <p className='text-gray-500'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, sequi cumque nam expedita blanditiis cum error qui laboriosam possimus suscipit consectetur? 
                Pariatur non quasi recusandae quas quis cupiditate animi iste.
            </p>
        </div>
      </div>


      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {
            classes.slice(0,3).map((item,index)=> <Card key={index} item={item}/>)
        }
      </div>
    </div>
  )
}

export default PopularClasses
