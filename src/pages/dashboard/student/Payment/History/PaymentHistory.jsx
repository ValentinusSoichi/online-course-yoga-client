import React, { useEffect, useState } from 'react'
import useAxiosFetch from '../../../../../hooks/useAxiosFetch'
import useAxiosSecure from '../../../../../hooks/useAxiosSecure';
import useUser from '../../../../../hooks/useUser';

const PaymentHistory = () => {
  const axiosFetch = useAxiosFetch();
  const axiosSecure = useAxiosSecure();
  const {currentUser} = useUser();
  const [payment, setPayment] = useState([]);
  const [loading, setLoading] = useState(true);
  const [paginatedPayment, setPaginatedPayment] = useState([]);
  const totalItem = payment.length;
  const [page,setPage] = useState(1);
  let totalPage = Math.ceil(totalItem/5);
  let itemPerPage = 5;
  const handelChange = (event,value)=>{
    setPage(value);
  }

  useEffect(()=>{
    const lastIndex = page * itemPerPage;
    const firstIndex = lastIndex - itemPerPage;
    const currentItems = payment.slice(firstIndex,lastIndex);
    setPaginatedPayment(currentItems);
  },[page, payment])

  useEffect(()=>{
    axiosFetch.get(`/payment-history/${currentUser?.email}`).then(res=>{
      setPayment(res.data);
      setLoading(false);
    }).catch(err => console.log(err))
  },[currentUser?.email]);


  const totalPaidAmount = payment.reduce((acc,curr)=>acc +curr.amount, 0);

  if(loading){
    return <h1>Loading . . .</h1>
  }

  return (
    <div>
      <div className='text-center mt-6 mb-16'>
        <p className='text-gray-400'>Hello, <span className='text-secondary font-bold'>{currentUser.name}</span> Welcome</p>
        <h1 className='text-4xl font-bold'>Payment History</h1>
        
      </div>

      <div>
        <div>
          <p className='font-bold'>Total Transaction: {payment.length}</p>
          
        </div>
        <div>
          <div>
            {
              paginatedPayment.map((payment,idx) =>(
                <tr>
                  <td>{idx + 1}</td>
                  <td>{payment.transactionId}</td>
                </tr>
              ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default PaymentHistory
