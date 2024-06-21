import React, { useState } from 'react'
import useAuth from '../hooks/useAuth';
import useUser from '../hooks/useUser';
import { FaUsers } from 'react-icons/fa';
import { BiHomeAlt, BiLogOut, BiSelectMultiple } from "react-icons/bi";
import { BsFillPostcardFill } from 'react-icons/bs';
import { TbBrandAppleArcade } from 'react-icons/tb';
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { MdClass, MdDoneAll, MdExplore, MdOfflineBolt, MdPayment, MdPendingActions, MdSchool } from 'react-icons/md';
import { GiFigurehead } from "react-icons/gi";
import { SiInstructure } from "react-icons/si";
import Swal from 'sweetalert2'
import Scroll from '../hooks/useScroll';

const adminNavItems = [
    {to: "/dashboard/admin-home", icon: <BiHomeAlt className='text-2xl' />, label: "Dashboard Home"},
    {to: "/dashboard/manage-users", icon: <FaUsers className='text-2xl' />, label:"Manage Users"},
    {to: "/dashboard/manage-class", icon: <BsFillPostcardFill className='text-2xl' />, label:"Manage Class"},
    {to: "/dashboard/manage-application", icon: <TbBrandAppleArcade className='text-2xl' />, label:"Applications"},
];

const instructorNavItem = [
    {
        to: "/dashboard/instructor-cp",icon: <BiHomeAlt className='text-2xl' />, 
        label: "Dashboard"
    },
    {
        to: "/dashboard/add-class",icon: <MdExplore className='text-2xl' />, 
        label: "Add a Class"
    },
    {
        to: "/dashboard/my-class",icon: <MdSchool className='text-2xl' />, 
        label: "My Classes"
    }
]

const studentNavItem =[
    {
        to: "/dashboard/student-cp",icon: <BiHomeAlt className='text-2xl' />, 
        label: "Dashboard"
    },
    {
        to: "/dashboard/enrolled-class",icon: <MdClass className='text-2xl' />, 
        label: "My Enrolled Class"
    },
    {
        to: "/dashboard/my-selected",icon: <BiSelectMultiple className='text-2xl' />, 
        label: "My Cart"
    },
    {
        to: "/dashboard/my-payment",icon: <MdPayment className='text-2xl' />, 
        label: "Payment History"
    },
    {
        to: "/dashboard/apply-instructor",icon: <SiInstructure className='text-2xl' />, 
        label: "Apply for Instructor"
    },
]

const lastMenuItems = [
    {
        to: "/",icon: <BiHomeAlt className='text-2xl' />, 
        label: "Main Home"
    }


]



const DashboardLayout = () => {
    const [open, setOpen] = useState(true);
    const {loader, logout} = useAuth();
    const {currentUser} = useUser();
    const navigate = useNavigate()
    const role = currentUser?.role;

    const handleLogOut = () =>{
        
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes"
          }).then((result) => {
            if(result.isConfirmed){
                logout().then(
                    Swal.fire({
                        title: "Logged Out",
                        text: "Success Log Out",
                        icon:"success"
                    })
                
                ).catch((error) =>console.log(error))
            }
            navigate("/")
            
                });

            }
            
                



            if(loader){
                return <div className='flex justify-center items-center h-screen'>Loading . . .</div>
              }

  return (
    <div className='flex '>
      <div className={`${open ? "w-72 overflow-hidden y-auto" : "w-[90px] overflow-auto"}  h-screen p-5 md:block hidden pt-8 relative duration-300`}>
        <div className='flex gap-x-4 items-center'>
            <img onClick={() => setOpen(!open)} src="/yoga-logo.png" alt="" className={`cursos-pointer h-[40px] duration-500 ${open && "rotate-[360deg]"}`} />
            <Link to="/">
            <h1 onClick={()=>setOpen(!open)} className={`text-dark-primary cursor-pointer font-bold origin-left text-xl duration-200 ${!open && "scale-0"}`}>Yoga Course </h1>
            </Link>
        </div>

        {
            role === "admin" && (<ul className='pt-6'>
                <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                {
                    role === "admin" && adminNavItems.map((menuItem,index)=>(
                        <li key={index} className='mb-2'>
                            <NavLink to={menuItem.to}
                             className={
                                ({isActive}) => `flex ${isActive ? "bg-red-500 text-white" : "text-[#413f44]"}
                            duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                            </NavLink>
                            
                        </li>
                    ))
                }
            </ul>
        )}

        {
        role === "instructor" && (<ul className='pt-6'>
                <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                {
                    role === "instructor" && instructorNavItem.map((menuItem,index)=>(
                        <li key={index} className='mb-2'>
                            <NavLink to={menuItem.to}
                             className={
                                ({isActive}) => `flex ${isActive ? "bg-red-500 text-white" : "text-[#413f44]"}
                            duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                            </NavLink>
                            
                        </li>
                    ))
                }
            </ul>
        )}

        {role === "user" && (<ul className='pt-6'>
                <p className={`ml-3 text-gray-500 ${!open && "hidden"}`}><small>MENU</small></p>
                {
                    role === "user" && studentNavItem.map((menuItem,index)=>(
                        <li key={index} className='mb-2'>
                            <NavLink to={menuItem.to}
                             className={
                                ({isActive}) => `flex ${isActive ? "bg-red-500 text-white" : "text-[#413f44]"}
                            duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                            </NavLink>
                            
                        </li>
                    ))
                }
            </ul>
        )}

        <ul className='pt-6'>
            <p className={`ml-3 mb-3 text-gray-500 ${!open && "hidden"}`}><small>USEFUL LINK</small></p>
            {
             (<ul className='pt-6'>
                {
                     lastMenuItems.map((menuItem,index)=>(
                        <li key={index} className='mb-2'>
                            <NavLink to={menuItem.to}
                             className={
                                ({isActive}) => `flex ${isActive ? "bg-red-500 text-white" : "text-[#413f44]"}
                            duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>{menuItem.icon}
                            <span className={`${!open && "hidden"} origin-left duration-200`}>{menuItem.label}</span>
                            </NavLink>
                            
                        </li>
                    ))
                }

                <li>
                <NavLink 
                onClick={()=> handleLogOut()}
                             className={
                                ({isActive}) => `flex 
                            duration-150 rounded-md p-2 cursor-pointer hover:bg-secondary hover:text-white font-bold text-sm items-center gap-x-4`}>
                                <BiLogOut className='text-2xl'/>
                            <span className={`${!open && "hidden"} origin-left duration-200`}>Log Out</span>
                            </NavLink>
                </li>
            </ul>
        )}
            
        </ul>



        <ul>
            
        </ul>


      </div>

      <div className='h-screen overflow-y-auto px-8 flex-1'>
        <Scroll />
        <Outlet />
      </div>
    </div>

  )
}

export default DashboardLayout
