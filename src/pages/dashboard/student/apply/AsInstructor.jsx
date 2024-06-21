import React, { useEffect, useState } from 'react'
import useUser from '../../../../hooks/useUser'
import useAxiosFetch from '../../../../hooks/useAxiosFetch';
import { FiBriefcase, FiSend, FiUser } from 'react-icons/fi';

const AsInstructor = () => {
  const {currentUser} = useUser();
  const {submittedData, setSubmittedData} = useState([]);
  const [loading,setLoading] = useState(true);
  const axiosFetch = useAxiosFetch();

  useEffect(()=>{
    axiosFetch.get(`https://online-course-yoga-server-e15cda602871.herokuapp.com/applied-instructors/${currentUser?.mail}`)
    .then(
      res=>{
        setSubmittedData(res.data);
        setLoading(false);
      }
    ).catch((err)=>console.log(err))
  },[]);

  const onSubmit = (e) =>{
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const experience = e.target.experience.value;

    const data = {
      name,email,experience
    }

    axiosFetch.post(`/as-instructor`,data).then(res=>{
      console.log(res.data);
      alert("Succesfull Applied!");
    })

  }


  
  return (
    <div className='my-20'>
      <div>
        {
          !submittedData?.name && 
          <div className='w-1/2'>
            <form onSubmit={onSubmit}>
              <div className='flex flex-col mx-auto justify-center items-center w-full'>
                <div className='mb-4 w-full'>
              
                  <label className='text-gray-700' htmlFor="name">Name</label>
                <div className='flex items-center mt-1'>
                  <FiUser className='text-gray-500'/>
                  <input type="text" id='name' name='name' defaultValue={currentUser?.name} disabled readOnly className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none' />
                </div>
                </div>

                <div className='mb-4 w-full'>
              
                  <label className='text-gray-700' htmlFor="email">Email</label>
                <div className='flex items-center mt-1'>
                  <FiUser className='text-gray-500'/>
                  <input type="email" id='email' name='email' defaultValue={currentUser?.email} disabled readOnly className='ml-2 w-full border-b border-gray-300 focus:border-secondary outline-none' />
                </div>
                </div>

                <div className='mb-4 w-full'>
              
                  <label className='text-gray-700' htmlFor="experience">Experience</label>
                <div className='flex items-center mt-1'>
                  <FiBriefcase className='text-gray-500'/>
                  <textarea className='ml-2 rounded-lg px-2 placeholder:text-sm py-1 w-full border border-gray-300 focus:border-secondary outline-none resize-none' name="experience" id="experience" placeholder='Tell us about your experience'></textarea>
                
                </div>
                </div>

                <div>
                  <button type='submit' className='flex items-center px-4 py-2 bg-secondary text-white rounded-md focue:outline-none'>
                    <FiSend className='mr-2'/>
                    Submit
                  </button>
                </div>
                



              </div>
            </form>
          </div>
        }
      </div>
    </div>
  )
}

export default AsInstructor
