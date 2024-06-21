import React, { useEffect, useState } from 'react'
import useUser from '../../hooks/useUser';
import { useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import moment from 'moment';

const MyClass = () => {
    const [classes, setClasses] = useState([]);
    const {currentUser, isLoading} = useUser();
    const navigate = useNavigate();
    const axiosSecure = useAxiosSecure();


    useEffect(()=>{
        axiosSecure.get(`https://online-course-yoga-server-e15cda602871.herokuapp.com/classes/${currentUser?.email}`).then(res=>setClasses(res.data)).catch(err=>console.log(err))


    },[isLoading])
  return (
    <div>
      <div className='my-9'>
        <h1 className='text-4xl font-bold text-center'>My <span className='text-secondary'>Class</span></h1>

      </div>

      <div>
        {
            classes.length === 0 ? <div className='text-center text-2xl font-bold mt-10'>You have Not added a class</div> : 
            <div>
                {
                    classes.map((cls,index)=> ( <div className='mb-5 hover:ring-secondary duration-200 focus:ring rounded-lg' key={index}> 
                        <div className='bg-white flex rounded-lg gap-8 shadow p-4'>
                            <div>
                                <img src={cls.image} alt="" className='max-h-[200px] max-w-[300px]'/>
                            </div>
                            <div className='w-full'>
                                <h2 className='text-[21px] font-bold text-secondary border-b pb-2 mb-2 '>{cls.name}</h2>
                                <div>
                                    <div>
                                        <h1 className='font-bold mb-3'>Some info: </h1>
                                        <h1 className='text-secondary my-2'>
                                            <span className='text-black'>Total Sutdent</span>:{" "}
                                            {cls.totalEnrolled ? cls.totalEnrolled :0}
                                        </h1>
                                        <h1 className='text-secondary'>
                                            <span className='text-black'>Total Seats: </span>:{" "}
                                            {cls.availableSeats}
                                        </h1>
                                        <h1 className='text-secondary my-2'>
                                            <span className='text-black'>Status</span>:{" "}
                                            <span
                                            className={`font-bold ${
                                                cls.status === "pending"
                                                ? "text-orange-400"
                                                : cls.status === "checking"
                                                ? "text-yellow-300"
                                                : cls.status === "approved"
                                                ? "text-green-500"
                                                : "text-red-600"
                                            }`}
                                            
                                            >
                                                {cls.status}
                                            </span>
                                        </h1>
                                    </div>

                                    <div>
                                        <h1 className='font-bold mb-3'>.......</h1>
                                        <h1 className='text-secondary my-2'>
                                            <span className='text-black'>Price</span>:{" "}
                                            <span className='text-black'>Rp. </span>{cls.price}
                                        </h1>


                                        <h1 className='text-secondary my-2'>
                                            <span className='text-black'>Submitted</span> :{" "}
                                            <span>
                                                {cls.submitted ? moment(cls.submitted).format("MMMM Do YYYY"):"Not get Data"}
                                            </span>
                                        </h1>
                                    </div>




                                    
                                </div>
                            </div>
                        </div>
                    </div>))
                }
            </div>
        }
      </div>
    </div>
  )
}

export default MyClass
