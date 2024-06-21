import React, { useEffect, useState } from 'react'
import useAxiosSecure from '../../../../../hooks/useAxiosSecure'
import useUser from '../../../../../hooks/useUser';
import { Navigate } from 'react-router-dom';

const Checkout = ({price, cartItm}) => {
    const URL = `http://localhost:5000/payment-info?${cartItm && `classId=${cartItm}`}`
  const axiosSecure = useAxiosSecure();
  const {currentUser, isLoading} = useUser();
  const [success,setSuccess] = useState('');
  const [cart,setCart] = useState([]);

  
  if(price<0 || !price){
    return <Navigate to="/dashboard/my-selected" replace/>
  }

  useEffect(()=>{
    axiosSecure.get(`https://online-course-yoga-server-e15cda602871.herokuapp.com/cart/${currentUser?.email}`).then((res)=>{
        const classesId = res.data.map(item=>item._id);
        setCart(classesId)
        
    }

    ).catch((err) => console.log(error))

  },[])





  const generateId = () =>{
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const getRandomLetter = () => letters[Math.floor(Math.random() * letters.length)];
    const getRandomNumber = () => Math.floor(Math.random() * 10);

    const letterPart = Array.from({ length: 3 }, getRandomLetter).join('');
    const numberPart = Array.from({ length: 3 }, getRandomNumber).join('');
    

    return letterPart + numberPart;
  }
  

  const handleSubmit = (event) =>{
    event.preventDefault();
    
    const userName = currentUser?.name;
    const userEmail = currentUser?.email;
    const transactionId = generateId();
    

    const data = {
      userEmail,
      userName,
      transactionId,
      classesId: cartItm ? [cartItm] : cart,
      date: new Date()
    }
    console.log(data)

    fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(data)
    }).then(res => res.json()).then(res =>{
      if(res.deletedResult.deletedCount > 0 && res.paymentResult.InsertedId && res.updateResult.modifiedCount > 0){
        setSuccess("Payment Success");
        
      }
    }).catch(error => console.log(err))
    
    alert("Success");
    Navigate("/dashboard/enrolled-class");
  }
  
    return (
    <>
    <div className='text-center'>
      <h1 className='text-2xl font-bold'>
        Payment Amount : <span>Rp. {price}</span>
      </h1>
    </div>
      <div className='flex justify-center items-center mt-12'>

      <button onClick={handleSubmit} className='px-7 py-3 rounded-lg bg-green-500 font-bold text-white ' type='submit'>Pay</button>
      
      </div>
      
      {success && <p className='text-green-500 font-semibold'>{success}</p>}
    
    </>
  )
}

export default Checkout
