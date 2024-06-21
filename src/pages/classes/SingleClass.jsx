import React, { useState } from 'react'
import { useLoaderData } from 'react-router-dom'
import  useUser  from '../../hooks/useUser';
import useAxiosFetch from '../../hooks/useAxiosFetch';
import useAxiosSecure from '../../hooks/useAxiosSecure';

const SingleClass = () => {
    const course = useLoaderData();
    
    const {currentUser}= useUser();
    const role = currentUser?.role;
    const [enrolledClasses, setEnrolledClasses] = useState([]);
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const handleSelect = (id) =>{
    
        axiosSecure.get(`https://online-course-yoga-server-e15cda602871.herokuapp.com/enrolled-classes/${currentUser?.email}`)
        .then(res => setEnrolledClasses(res.data))
        .catch(err =>console.log(err))
    
        if(!currentUser){
          return alert("Please Login First")
    
        }
    
        axiosSecure.get(`https://online-course-yoga-server-e15cda602871.herokuapp.com/cart-item/${id}?email=${currentUser.email}`)
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
    
    
            axiosSecure.post('https://online-course-yoga-server-e15cda602871.herokuapp.com/add-to-cart', data)
            .then(res=>{
              alert("Added");
              console.log(res.data);
            })
            
          }
        })
      }


  return (
    <>
    <div
    className='font-gilroy font-medium text-gray dark:text-white text-lg leading-[27px] w-[90%] mx-auto'
    
    >
    

    <div className='new-tab-wrapper tabs section-padding mt-8'>
        <div className='container'>
            <div className='grid grid-cols-12 md:gap-[30px]'>
                <div className='lg:col-span-8 col-span-12'>
                    <div className='single-course-details'>
                        <div className='xl:h-[470px] h-[350px] mb-10 course-main-thumb'>
                            <img src={course.image} alt="" className='rounded-md object-fut w-full h-full block' />
                        </div>
                        <h2 className='text-2xl mb-2'>{course.name}</h2>

                        <div className='author-meta mt-6 sm:flex lg:space-x-5 space-y-5 sm:space-y-0 items-center'>
                            <div className='flex space-x-4 items-center group'>
                                <div className='flex-none'>
                                    <div className='h-12 w-12 rounded'>
                                        <img src="" alt="" className='object-cover w-full h-full rounded'/>
                                    </div>
                                </div>
                                <div className='flex-1'>
                                    <p className='text-secondary'>Trainer 
                                        <a className='text-black' href=""> : {course.instructorName}</a>
                                    </p>
                                </div>
                            </div>
                            <div>
                                <span>
                                    Last Update:
                                    <a href="">
                                        {new Date(course.submitted).toLocaleDateString()}
                                    </a>
                                </span>
                            </div>
                        </div>

                        <div className='new-tab-wrapper mt-12'>
                            <ul id='tabs nav' className='course-tab mb-8'>
                                <li className='active'>
                                    <a href="#tab1">Overview</a>
                                </li>
                                <li>
                                    <a href="#tab2">Curriculum</a>
                                </li>
                                
                            </ul>
                            <div id='tabs-content'>
                                <div id='tab1' className='tab-content'>
                                    <div>
                                        <h3 className='text-2xl mt-8'>Course Description</h3>
                                        <p className='mt-4'>{course.description}</p>
                                    
                                    <div className='bg-[#F8f8f8] dark:bg-indigo-500 space-y-6 p-8 rounded my-8'>
                                        <h4 className='text-2xl'> Learning Outcome</h4>
                                        <ul className='grid sm:grid-cols-2 grid-cols-1 gap-6'>
                                            <li className='flex space-x-3'>
                                                <div className='flex-1'>Learn how to do progressive poewr flow </div>
                                            </li>
                                            <li className='flex space-x-3'>
                                                <div className='flex-1'>Learn how to do progressive poewr flow </div>
                                            </li>
                                            <li className='flex space-x-3'>
                                                <div className='flex-1'>Learn how to do progressive poewr flow </div>
                                            </li>
                                            <li className='flex space-x-3'>
                                                <div className='flex-1'>Learn how to do progressive poewr flow </div>
                                            </li>
                                        </ul>
                                    </div>
                                    
                                    </div>
                                </div>
                                <div id='tab2' className='tab-content'>
                                    <div>
                                        <h3 className='text-2xl mt-8'>Lesson Plan</h3>
                                        <p className='ml-4'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis fugiat, iste voluptas, voluptates, eligendi numquam quam magnam sapiente vitae ducimus rerum 
                                            provident harum enim facilis. Odio voluptas molestiae dicta ullam.</p>
                                    </div>
                                    <div className='bg-[f8f8f8] dark:bg-indigo-600 space-y-6 p-8 rounded-md my-8'>
                                        This Course is for Beginners
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>
        <div className='lg:col-span-4 col-span-12 mt-8 md:mt-0'>
            <div className='sidebarWrapper space-y-[30px]'>
                <div className='widget custom-text space-y-5'>
                    <a className='h-[220px] rounded relative block' href="">
                    <img src={course.image} alt="" className='block w-full h-full object-cover rounded'/>
                    <div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <img src="/play.png" alt="" />
                    </div>
                    </a>
                    <h3>Rp. {course.price}</h3>
                    <button onClick={()=>handleSelect(course._id)} title={role ==='admin' || role === 
                  'instructor' ? 'Instructor/Admin Can not be able to select' ? 
                  course.availableSeats < 1 : 'No Seat Available' : 
                  "You can Select Classes"}
                  disabled={role==="admin" || role === 'instructor' || course.availableSeats < 1}
                  
                  className='btn btn-primary w-full text-center bg-secondary py-2 px-6 text-white'>Enroll Now</button>
                  <ul className='list'>
                    <li className='flex space-x-3 border-b border-[#ececec] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                        <div className='flex-1 space-x-3 flex items-center'>
                            <div className='text-black font-semibold'>
                                Instructor
                            </div>
                        </div>
                        <div className='flex-none'>{course.instructorName}</div>
                    </li>

                    <li className='flex space-x-3 border-b border-[#ececec] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                        <div className='flex-1 space-x-3 flex items-center'>
                            <div className='text-black font-semibold'>
                                Lectures
                            </div>
                        </div>
                        <div className='flex-none'>23</div>
                    </li>
                    <li className='flex space-x-3 border-b border-[#ececec] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                        <div className='flex-1 space-x-3 flex items-center'>
                            <div className='text-black font-semibold'>
                                Enrolled
                            </div>
                        </div>
                        <div className='flex-none'>{course.totalEnrolled}</div>
                    </li>

                    <li className='flex space-x-3 border-b border-[#ececec] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                        <div className='flex-1 space-x-3 flex items-center'>
                            <div className='text-black font-semibold'>
                                Available Seats
                            </div>
                        </div>
                        <div className='flex-none'>{course.availableSeats}</div>
                    </li>
                    
                    <li className='flex space-x-3 border-b border-[#ececec] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                        <div className='flex-1 space-x-3 flex items-center'>
                            <div className='text-black font-semibold'>
                                Course level
                            </div>
                        </div>
                        <div className='flex-none'>Beginner</div>
                    </li>
                    <li className='flex space-x-3 border-b border-[#ececec] mb-4 pb-4 last:pb-0 past:mb-0 last:border-0'>
                        <div className='flex-1 space-x-3 flex items-center'>
                            <div className='text-black font-semibold'>
                                Language
                            </div>
                        </div>
                        <div className='flex-none'>Bahasa Indonesia</div>
                    </li>
                  </ul>
                </div>
            </div>
        </div>
            </div>
        </div>
    </div>
    
    </div>
    
    </>
  )
}

export default SingleClass
