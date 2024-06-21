import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import Checkout from './Checkout';

const Paying = () => {
  const location = useLocation();
  const price = location?.state?.price;
  const cartItm = location.state?.itemId;
  // if(price){
  //   return <Navigate to="/dashboard/my-selected"/>
  // }

  return (
    <div className='my-40'>
      <Checkout price={price} cartItm={cartItm} />
    </div>
  )
}

export default Paying
