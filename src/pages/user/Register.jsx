import React, { useContext } from 'react'
import { useForm } from "react-hook-form"
import { AiOutlineLock, AiOutlineMail, AiOutlinePhone, AiOutlinePicture, AiOutlineUser } from "react-icons/ai";
import { MdLocationOn } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import GoogleLogin from '../../component/Social/GoogleLogin';
import { AuthContext } from '../../utils/provider/AuthProvider';
import axios from 'axios';

const Register = () => {
  const navigate = useNavigate();
  const {signup, updateUser, setError} = useContext(AuthContext)

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm()
  
  const onSubmit= data => {
    setError("");
    signup(data.email, data.password).then((result) =>{
      const user = result.user;
      if(user){
        return updateUser(data.name, data.photourl).then(()=>{
          const userImp = {
            name: user?.displayName,
            email: user?.email,
            photoURL: user?.photoURL,
            role: 'user',
            gender: data.gender,
            phone: data.phone,
            address: data.address
          };


          if(user.email && user.displayName){
            return axios.post('https://online-course-yoga-server-e15cda602871.herokuapp.com/new-user', userImp).then(()=>{
              setError("")
              navigate('/');
              return "Registration is Complete"
            }).catch((err)=>{
              throw new Error(err)
            })
          }
        }).catch((err)=>{
          setError(err.code);
          throw new Error(err);
        });
      }
    })
  };

  const password = watch('password', '');
  
  return (
    <div className='flex justify-center items-center items-center pt-14 bg-gray-200'>
      <div className='bg-white p-8 rounded-lg shadow-md'>
        <h2 className='text-3xl font-bold text-center mb-6'>Please Register</h2>
      



      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='flex items-center gap-5 '>
          <div className='mb-4'>
            <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>
            <AiOutlineUser className='inline-block mr-2 mb-1 text-lg'/>
            Name
          </label>
          <input type="name" placeholder='Enter your name' {...register("name", { required: true })}
          className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'/>
           {errors.name && <p className="text-red-500 text-sm">This field is required</p>}
          </div>
          <div className='mb-4'>
            <label htmlFor="email" className='block text-gray-700 font-bold mb-2'>
            <AiOutlineMail  className='inline-block mr-2 mb-1 text-lg'/>
            Email
          </label>
          <input type="email" placeholder='Enter your E-mail address' {...register("email", { required: true })}
          className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'/>
          {errors.email && <p className="text-red-500 text-sm">This field is required</p>}

          </div>
          
        </div>
        <div className='flex items-center gap-5 '>
          <div className='mb-4'>
            <label htmlFor="password" className='block text-gray-700 font-bold mb-2'>
            <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
            Password
          </label>
          <input type="password" placeholder='Enter your password' {...register("password", { required: true })}
          className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'/>
          {errors.password && <p className="text-red-500 text-sm">This field is required</p>}

          </div>


          <div className='mb-4'>
              <label htmlFor="confirmpassword" className='block text-gray-700 font-bold mb-2'>
                <AiOutlineLock className='inline-block mr-2 mb-1 text-lg'/>
                Confirm Password
              </label>
              <input type="password" placeholder='Confirm Password' {...register("confirmpassword", {
                required: true,
                validate: value => value === password || "Password does not match"
              })} className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'/>
              {errors.confirmpassword && <p className="text-red-500 text-sm">{errors.confirmpassword.message}</p>}
            </div>
          
        </div>



        <div className='flex items-center gap-5 '>
          <div className='mb-4'>
            <label htmlFor="phoneNumber" className='block text-gray-700 font-bold mb-2'>
            <AiOutlinePhone className='inline-block mr-2 mb-1 text-lg'/>
            Phone Number
          </label>
          <input type="tel" placeholder='Enter phone Number' {...register("phone", { required: true })}
          className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'/>
          {errors.phone && <p className="text-red-500 text-sm">This field is required</p>}

          </div>
          <div className='mb-4'>
            <label htmlFor="photourl" className='block text-gray-700 font-bold mb-2'>
            <AiOutlinePicture className='inline-block mr-2 mb-1 text-lg'/>
            Photo URL
          </label>
          <input type="text" placeholder='Enter your photo URL' {...register("photoUrl")}
          className='w-full border-gray-300 border rounded-md py-2 px-4 focus:outline-none focus:ring focus:border-blue-300'/>
          
          </div>
          
        </div>



        <div>
        <div className='mb-4'>
            <label htmlFor="gender" className='block text-gray-700 font-bold mb-2'>
            <AiOutlineUser className='inline-block mr-2 mb-1 text-lg'/>
            Gender
          </label>
          <select {...register("gender",{required: true})} className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outlinee-none focus:ring focus:border-blue-300'>
       <option value="">Select Gender</option>
       
       <option value="female">Female</option>
        <option value="male">Male</option>
        
      </select>
      {errors.gender && <p className="text-red-500 text-sm">Please select gender</p>}

          
          </div>

          <div className='mb-4'>
            <label htmlFor="address" className='block text-gray-700 font-bold mb-2'>
            <MdLocationOn  className='inline-block mr-2 mb-1 text-lg'/>
            Address
          </label>
          <textarea 
          {...register("address", { required: true })}
          rows="3"
          placeholder='Enter your address'
          className='w-full border border-gray-300 rounded-md py-2 px-4 focus:outlinee-none focus:ring focus:border-blue-300'
          
          ></textarea>
          {errors.address && <p className="text-red-500 text-sm">This field is required</p>}

          
          </div>

        </div>


        <div className='text-center '>
          <button type='submit' className='bg-secondary hover:bg-red-500 text-white py-2 px-4 rounded-md'>Register</button>
        
        </div>




      </form>

      <p className='text-center mt-4'>
        Already have an account?{" "} <Link to="/login" className='underline text-secondary ml-1'>
          {" "}
          Login</Link>
      </p>

      <GoogleLogin />
      </div>
    </div>
  )
}

export default Register;
