import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../hooks/useAxiosFetch'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const ManageUsers = () => {
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const navigate = useNavigate();
    const [users,setUsers] = useState([]);

    useEffect(()=>{
        axiosFetch.get('https://online-course-yoga-server-e15cda602871.herokuapp.com/users')
        .then(res=> setUsers(res.data))
        .catch(err=>console.log(err))

    },[])

    const handleDelete =(id) =>{
        axiosSecure.delete(`https://online-course-yoga-server-e15cda602871.herokuapp.com/delete-user/${id}`)
        .then(res=>{
            alert("User Dleeted")
        }).catch(err=>console.log(err))
    }
  return (
    <div>
        <h1 className='text-center text-4xl font-bold my-7'>Manage User</h1>
      
        <div>

        <div className=''>
            <div className='flex flex-col'>
                <div className='overflow-x-auto sm:mx-6 lg:mx-8'>
                    <div className='inline-block min-w-full py-2 sm:px-6 lg:px-8'>
                        <div className='overflow-hidden'>
                            <table className='min-w-full text-left text-sm font-light'>
                                <thead className='border-b font-medium dark:border-neutral-500'>
                                    <tr>
                                        <th className='px-6 py-4'>
                                            Photo
                                        </th>
                                        <th className='px-6 py-4'>
                                            Name
                                        </th>
                                        <th className='px-6 py-4'>
                                            Role
                                        </th>
                                        <th className='px-6 py-4'>
                                            Update
                                        </th>
                                        <th className='px-6 py-4'>
                                            Delete
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        users.map((user,idx)=> (
                                            <tr key={user._id} className='border-b transition duration-300 ease-in-out hover:bg-netural-100 dark:border-neutral-500 dark:bg-neutral-600'>
                                                <td>
                                                    <img src={user?.photoUrl} alt="" className='h-[35px] 2-[35px]' />
                                                </td>
                                                <td className='whitespace-pre-wrap px-6 py-4'>
                                                    {user.name}
                                                </td>
                                                <td className='whitespace-nowrap px-6 py-4'>
                                                    {user.role}
                                                </td>
                                                

                                                <td className='whitespace-nowrap px-6 py-4'>
                                                    <span className='inline-flex items-center gap-2 cursor-pointer bg-green-500 py-1 rounded-md px-2 text-white' onClick={() =>navigate(`/dashboard/update-user/${user._id}`)}>Update</span>
                                                </td>
                                                <td>
                                                    <span className='inline-flex items-center gap-2 cursor-pointer bg-red-500 py-1 rounded-md px-2 text-white' onClick={()=>handleDelete(user._id)}>Delete</span>
                                                </td>
                                            </tr>
                                        )
                                        
                                    )
                                
                                
                                
                                
                                
                                }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>


                <div>
                    <div className='w-full h-full flex justify-center items-center my-10'>
                    
                    </div>
                </div>
            </div>
        </div>
    </div>
    </div>
  )
}

export default ManageUsers
