import axios from 'axios';
import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../hooks/useAxiosFetch';
import { Transition } from '@headlessui/react'
import { Link } from 'react-router-dom';
import useUser from '../../hooks/useUser';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import { ToastContainer, toast } from 'react-toastify';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const {currentUser} = useUser();
  console.log(currentUser)
  const role = currentUser?.role;
  const [enrolledClasses, setEnrolledClasses] = useState([])
  const [hoveredCard, setHoveredCard] = useState(null);
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();


  const handleHover = (index) =>{
    setHoveredCard(index);
  }
  useEffect(()=>{
    axiosFetch.get('/classes')
    .then(res =>{
      const filteredClasses = res.data.filter(cls => cls.status !== 'rejected');
      setClasses(filteredClasses)
    })
    .catch(err => console.log(err))


  },[]);

  const handleSelect = (id) =>{ 
    
    axiosSecure.get(`/enrolled-classes/${currentUser?.email}`)
    .then(res => setEnrolledClasses(res.data))
    .catch(err =>console.log(err))

    if(!currentUser){
      return alert("Please Login First")

    }

    axiosSecure.get(`/cart-item/${id}?email=${currentUser.email}`)
    .then(res =>{
      if(res.data.classId === id){
        return alert("Already Selected")
      }else if(enrolledClasses.find(item=>item.classes._id === id)){
        return alert("Already Enrolled!")
      }else{
        const data = {
          classId: id,
          userMail: currentUser.email,
          date: new Date()
        }


        axiosSecure.post('/add-to-cart', data)
        .then(res=>{
          alert("Added");
          console.log(res.data);
        })
        
      }
    })
  }

  return (
    <div>
      <div className='mt-20 pt-3'>
        <h1 className='text-4xl font-bold text-center text-primary'>Classes</h1>
      </div>

      <div className='my-16 w-[90%] mx-auto grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8'>
        {
          classes.map((cls, index) =>(
            <div
            key={index}
            className={`relative hover:-translate-y-2 duration-150 hover:ring-[2px] hover:ring-secondary w-64 mx-auto ${cls.availableSeats < 1 ? 'bg-red-300' : "bg-white"} dark:bg-slate-600 rounded-lg shadow-lg overflow-hidden cursor-pointer`}
            onMouseEnter={() => handleHover(index)}
            onMouseLeave={() => handleHover(null)}
            >
              <div className='relative h-48'>
                <div className={`absolute inset-0 bg-black opacity-0 transition-opacity duration-300 ${hoveredCard === index ? "opacity-60" : ""}`}/>
                <img src={cls.image} className='object-cover w-full  ' alt="" />
                <Transition
                show={hoveredCard === index}
                enter="transition-opacity duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity duration-150"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className='absolute inset-0 flex items-center justify-center'>
                  <button onClick={()=>handleSelect(cls._id)} title={role ==='admin' || role === 
                  'instructor' ? 'Instructor/Admin Can not be able to select' ? 
                  cls.availableSeats < 1 : 'No Seat Available' : 
                  "You can Select Classes"}
                  disabled={role==="admin" || role === 'instructor' || cls.availableSeats < 1}
                  
                  className='px-4 py-2 text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700'>Add to Cart</button>
                </div>
              </Transition>

              </div>

              <div className='px-6 py-2'>
                  <h3 className={`${cls.name.length >25 ? "text-[14px]" : "text-[16px]"} font-bold`}>{cls.name}</h3>
                  <p className='text-gray-500 text-xs '>Instructor: {cls.instructorName  }</p>
                  <div className='flex flex-col items-center justify-between mt-4'>
                    <span className='text-gray-500 text-xs'>Available Seats: {cls.availableSeats}</span>
                    <span className='text-gray-500 font-semibold'>Rp. {cls.price}</span>
                  </div>
                  <Link to={`/class/${cls._id}`}><button className='px-4 py-2 mt-4 w-full mx-auto text-white disabled:bg-red-300 bg-secondary duration-300 rounded hover:bg-red-700 my-4 mt-4 mb-2'>View</button></Link>


              </div>
            </div>
          ))
          }
        
      </div>
    </div>
  )
}

export default Classes
