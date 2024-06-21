import React from 'react'
import useUser from '../../../hooks/useUser'
import welcomeImg from "../../../assets/dashboard/urban-welcome.svg"

const StudentCP = () => {
    const {currentUser, isLoading} = useUser();
  return (
    <div className='h-screen flex justify-center items-center '>
      <div>
        <div>
            <div>
                <img onContextMenu={e => e.preventDefault()} src={welcomeImg} alt="" className='h-[200px] ' placeholder='blur'/>
            </div>
            <h1 className='text-4xl capitalize font-bold'>Hi, <span className='text-secondary items-stretch'> {currentUser?.name} </span>Welcome</h1>
        </div>
      </div>
    </div>
  )
}

export default StudentCP
