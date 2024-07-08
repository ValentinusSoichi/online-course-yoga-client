import React from 'react'
import useAuth from '../../../hooks/useAuth'
import { useLoaderData } from 'react-router-dom';
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';

const UpdateUser = () => {
    const {user} = useAuth();
    const userCredentials = useLoaderData();
    console.log(userCredentials)
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();

    const handleFormSubmit =(e)=>{
        e.preventDefault();
        const formData = new FormData(e.target);
        const updateData = Object.fromEntries(formData);
        axiosSecure.put(`https://online-course-yoga-server-e15cda602871.herokuapp.com/update-user/${userCredentials?._id}`, updateData)
        .then(res=>{
            if(res.data.modifiedCount > 0){
                alert("User Updated Success")
            }
            console.log(res.data)
        })
        .catch(err => console.log(err))
    }
  return (
    <div>
        <h1 className='text-center text-4xl font-bold mt-5'>Update : {user?.displayName}</h1>
        <p className='text-center'>Change details about {user?.displayName}</p>
      <section>
        <div className='mx-auto px-4 py-16 sm:px-6 lg:px-8'>
            <div className='rounded-lg bg-white p-8 shadow-lg lg:p-12'>
                <form className='space-y-4' onSubmit={handleFormSubmit}>
                    <div className='grid grid-cols-1 gap-4 sm:grid-cols-2'>
                        <div>
                            <label className='ml-2 pb-4' htmlFor="name">Name</label>
                            <input type="text" className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm' 
                            placeholder='Your name'
                            required
                            defaultValue={userCredentials?.name ? userCredentials?.name : ''}
                            id='name'
                            name='name'
                            />
                        </div>
                    
                    
                        <div>
                            <label className='ml-2' htmlFor="phone">Phone</label>
                            <input type="tel" className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm' 
                            placeholder='Phone Number'
                            required
                            defaultValue={userCredentials?.phone ? userCredentials?.phone : ''}
                            id='phone'
                            
                            name='phone'
                            />
                        </div>
                    

                    
                        <div>
                            <label className='ml-2 ' htmlFor="skills">Skills</label>
                            <input type="text" className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm' 
                            placeholder='Your name'
                            
                            defaultValue={userCredentials?.skills ? userCredentials?.skills : ''}
                            name='skills'
                            />
                        </div>
                    

                    
                        <div>
                            <label className='ml-2' htmlFor="address">Address</label>
                            <input type="text" className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm' 
                            placeholder='Your Address'
                            required
                            defaultValue={userCredentials?.address }
                            
                            name='address'
                            />
                        </div>

                        <div>
                            <label className='ml-2' htmlFor="photourl">Photo URL</label>
                            <input type="text" className='w-full rounded-lg mt-3 border outline-none border-secondary p-3 text-sm' 
                            placeholder='Photo URL'
                            
                            defaultValue={userCredentials?.photourl }
                            
                            name='photourl'
                            />
                        </div>
                        </div>
                        <div>
                            <h1>Please Select a Role</h1>
                            <div className='grid grid-cols-1 gap-4 text-center sm:grid-cols-3'>
                                <div>
                                    <input type="radio" className='peer sr-only' id='option1' value="user" tabIndex='-1'name='option'
                                    defaultChecked={userCredentials?.role === 'user' ? true: false }
                                    />
                                    <label className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary
                                    peer-checked:bg-secondary peer-checked:text-white' tabIndex='0' htmlFor="option1"><span className='text-sm font-medium'>Users</span></label>
                                </div>

                                <div>
                                    <input name='option' tabIndex="-1" className='peer sr-only' type="radio" value="admin" id='option2' defaultChecked={userCredentials?.role === 'admin' ?true:false} />
                                <label className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary
                                    peer-checked:bg-secondary peer-checked:text-white' tabIndex="0" htmlFor="option2">
                                    <span className='text-sm font-medium'>Admin</span>
                                </label>
                                
                                </div>

                                <div>
                                    <input tabIndex="-1" name='option' className='peer sr-only' type="radio" value="instructor" id='option3' defaultChecked={userCredentials?.role === 'instructor' ?true:false} />
                                <label className='block w-full rounded-lg border border-secondary p-3 peer-checked:border-secondary
                                    peer-checked:bg-secondary peer-checked:text-white' tabIndex="0" htmlFor="option3">
                                    <span className='text-sm font-medium'>Instructor</span>
                                </label>
                                
                                </div>
                            </div>

                            <div className='mt-6'>
                                <label htmlFor="message" className='sr-only'>About</label>
                                <textarea className='w-full resize-none rounded-lg border-secondary border outline-none p-3 text-sm' name="about" id="message" rows="4" placeholder='About User' defaultValue={userCredentials?.abous ? userCredentials?.about : ''}></textarea>
                            
                            </div>
                            <div className='mt-4'>
                                <button type='submit' className='inline-block w-full rounded-lg bg-secondary px-5 py-3 font-medium text-white sm:w-auto'>Update User</button>
                            </div>
                        </div>

                        
                    
                </form>
            </div>
        </div>
      </section>
    </div>
  )
}

export default UpdateUser
