import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useAxiosFetch from '../../../hooks/useAxiosFetch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { Pagination } from '@mui/material';
import Swal from 'sweetalert2';
import axios from 'axios';

const ManageClasses = () => {
    const navigate = useNavigate();
    const axiosFetch = useAxiosFetch();
    const axiosSecure = useAxiosSecure();
    const [classes, setClasses] = useState([]);
    const [page,setPage] = useState(1);
    const [paginatedData, setPaginatedData] = useState([]);
    const itemPerPage = 5;
    const totalPage = Math.ceil(classes.length / itemPerPage);

    const handleChange =(event,value) =>{
        setPage(value)

    }

    
    useEffect(()=>{
        axiosFetch.get('https://online-course-yoga-server-e15cda602871.herokuapp.com/classes-manage').then(res=>setClasses(res.data))
        .catch(err => console.log(err))

    },[])

    useEffect(()=>{
        let lastIndex = page * itemPerPage;
        const firstIndex = lastIndex - itemPerPage;
        if(lastIndex > classes.length){
            lastIndex = classes.length;
        }
        const currentData = classes.slice(firstIndex,lastIndex);
        setPaginatedData(currentData);

    },[page, totalPage])


    const handleApprove =(id) =>{
        axiosSecure.put(`https://online-course-yoga-server-e15cda602871.herokuapp.com/change-status/${id}`, {status: 'approved'}).then(res=>{
            console.log(res.data);
            alert("Course Approved")
            const updateclass = classes.map(cls=> cls._id === id ? {...cls, status: 'approved'} : cls)
            setClasses(updateclass)
        }).catch(err=>console.log(err));

        
    }
    const handleReject = (id) =>{
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, reject it!"
          }).then((result) => {
            if (result.isConfirmed) {
                const res = axiosSecure.put(`https://online-course-yoga-server-e15cda602871.herokuapp.com/change-status/${id}`, {status: 'rejected', reason: 'rejected'});
                if (res.data.modifiedCount > 0){
                    Swal.fire({
                        title: "Rejected!",
                        text: "Your course has been rejected.",
                        icon: "success"
                      });
                    const updateclass = classes.map(cls=> cls._id === id ? {...cls, status: 'rejected'} : cls)
                    setClasses(updateclass);
                    
                }
              
              
                
            }
          });

    }
  return (
    <div>
      <h1 className='text-4xl text-secondary font-bold text-center my-10'>Manage Classes</h1>
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
                                            Course Name
                                        </th>
                                        <th className='px-6 py-4'>
                                            Instructor Name
                                        </th>
                                        <th className='px-6 py-4'>
                                            Status
                                        </th>
                                        <th className='px-6 py-4'>
                                            Action
                                        </th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {classes.length === 0 ? (
                                        <tr>
                                            <td colSpan="6" className='text-center text-2xl font-bold'>No Classes Found</td>
                                        </tr>
                                    ) : (
                                        paginatedData.map((cls,idx)=> (
                                            <tr key={cls._id} className='border-b transition duration-300 ease-in-out hover:bg-netural-100 dark:border-neutral-500 dark:bg-neutral-600'>
                                                <td>
                                                    <img src={cls.image} alt="" className='h-[35px] 2-[35px]' />
                                                </td>
                                                <td className='whitespace-pre-wrap px-6 py-4'>
                                                    {cls.name}
                                                </td>
                                                <td className='whitespace-nowrap px-6 py-4'>
                                                    {cls.instructorName}
                                                </td>
                                                <td>
                                                    <span
                                                    className={`font-bold ${
                                                        cls.status === "pending"
                                                        ? "bg-orange-400"
                                                        : cls.status === "checking"
                                                        ? "bg-yellow-500"
                                                        : cls.status === "approved"
                                                        ? "bg-green-600"
                                                        :"bg-red-600"
                                                    } px-2 py-1 uppercase text-white rounded-xl`}>
                                                        {cls.status}
                                                    </span>
                                                </td>

                                                <td className='whitespace-nowrap px-6 py-4'>
                                                    <div className='flex gap-2'>
                                                        {
                                                            <button
                                                            onClick={()=>handleApprove(cls._id)}
                                                            className='text-[12px] cursor-pointer disabled:bg-green-700 bg-green-500 py-1 rounded-md px-2 text-white'
                                                            >
                                                                Approve
                                                            </button>
                                                        }
                                                        {
                                                            <button
                                                            disabled={
                                                                cls.status === "rejected" || cls.status === "checking"
                                                            }
                                                            onClick={()=> handleReject(cls._id)}
                                                            className='cursor-pointer disabled:bg-red-800 bg-red-600 py-1 rounded-md px-2 text-white'
                                                            >
                                                                Deny

                                                            </button>
                                                        }
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                        
                                    )
                                
                                
                                
                                
                                
                                }
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>


                <div>
                    <div className='w-full h-full flex justify-center items-center my-10'>
                    <Pagination onChange={handleChange} color ="primary" count={totalPage}  />
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ManageClasses
