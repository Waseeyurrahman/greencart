// import React, { useEffect, useState } from 'react'
// import { useAppContext } from '../context/AppContext'
// import { dummyOrders } from '../assets/assets'

// const MyOrders = () => {
// const [myOrders, setMyorders] = useState([])
//     const {currency, axios, user} = useAppContext()

// const fetchMyOrders = async ()=> {
//     try {
//         const {data} = await axios.get('/api/order/user')
//         if(data.success){
//             setMyorders(data.orders)
//         }
//     } catch (error) {
//         console.log(error);
        
//     }
// }    

// useEffect(()=> {
//     if(user){
//         fetchMyOrders()
//     }
   
// },[user])


//   return (
//     <div className='mt-16 pb-16'>
//         <div className='flex flex-col items-end w-max mb-8'>
//         <p className='text-2xl font-medium uppercase'>My Orders</p>
//         <div className='w-16 h-0.5 bg-primary rounded-full'></div>
//         </div>
//         {myOrders.map((order, index)=>(
//             <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
//                 <p className='flex justify-between md:items-center text-gray-400 
//                 md:font-medium max-md:flex-col'>
//                     <span>orderId : {order._id}</span>
//                     <span>Payment : {order.paymentType}</span>
//                     <span>Total Amount : {currency}{order.amount}</span>
//                 </p>
//                 {order.items.map((item, index)=>(
//                     <div key={index} 
//                     className = {`relative bg-white text-gray-500/70 
//                         ${  order.items.length !== index + 1 && "border-b"
//                     } border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4
//                     py-5 md:gap-16 w-full max-w-4xl`}>

//                         <div className='flex items-center mb-4 md:mb-0'>
//                             {item.product?.image && (
//                             <div className='bg-primary/10 p-4 rounded-lg'>
//                                 <img src= {item.product.image[0]} alt=""  
//                                className=' w-16 h-16'/>
//                             </div>
//                             )};
//                             <div className='ml-4'>
//                                 <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
//                                 <p>Category: {item.product.category}</p>
//                             </div>
//                         </div>

//                         <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
//                             <p>Quantity: {item.quantity || "1"}</p>
//                             <p>Status: {order.status || "1"}</p>
//                             <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
//                         </div>
//                         <p className='text-primary text-lg font-medium'>
//                             Amount: {currency}{item.product.offerPrice * item.quantity}
//                         </p>

//                     </div>
//                 ))}
//             </div>
//         ))}
        
//     </div>
//   )
// }

// export default MyOrders

import React, { useEffect, useState } from 'react'
import { useAppContext } from '../context/AppContext'

const MyOrders = () => {
  const [myOrders, setMyorders] = useState([])
  const { currency, axios, user } = useAppContext()

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get('/api/order/user')
      if (data.success) {
        setMyorders(data.orders)
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (user) {
      fetchMyOrders()
    }
  }, [user])

  return (
    <div className='mt-16 pb-16'>
      <div className='flex flex-col items-end w-max mb-8'>
        <p className='text-2xl font-medium uppercase'>My Orders</p>
        <div className='w-16 h-0.5 bg-primary rounded-full'></div>
      </div>

      {myOrders.length === 0 && (
        <p className='text-gray-400 text-sm'>No orders found.</p>
      )}

      {myOrders.map((order, index) => (
        <div key={index} className='border border-gray-300 rounded-lg mb-10 p-4 py-5 max-w-4xl'>
          <p className='flex justify-between md:items-center text-gray-400 md:font-medium max-md:flex-col'>
            <span>Order ID: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>Total Amount: {currency}{order.amount}</span>
          </p>

          {order.items.map((item, index) => (
            <div
              key={index}
              className={`relative bg-white text-gray-500/70 
                ${order.items.length !== index + 1 && 'border-b'}
                border-gray-300 flex flex-col md:flex-row md:items-center justify-between p-4 py-5 md:gap-16 w-full max-w-4xl`}
            >
              <div className='flex items-center mb-4 md:mb-0'>

                {/* ✅ CHANGE #1 — check if product exists */}
                {item.product ? (
                  <>
                    <div className='bg-primary/10 p-4 rounded-lg'>
                      {/* ✅ CHANGE #2 — safe access image only if it exists */}
                      <img src={item.product.image?.[0]} alt="" className='w-16 h-16' />
                    </div>
                    <div className='ml-4'>
                      <h2 className='text-xl font-medium text-gray-800'>{item.product.name}</h2>
                      <p>Category: {item.product.category}</p>
                    </div>
                  </>
                ) : (
                  // ✅ CHANGE #3 — show fallback if product was deleted from DB
                  <div>
                    <p className='text-red-500'>Product no longer available</p>
                  </div>
                )}
              </div>

              <div className='flex flex-col justify-center md:ml-8 mb-4 md:mb-0'>
                <p>Quantity: {item.quantity || '1'}</p>
                <p>Status: {order.status || 'N/A'}</p>
                <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              </div>

              {/* ✅ CHANGE #4 — Only calculate amount if product exists */}
              <p className='text-primary text-lg font-medium'>
                Amount:{' '}
                {item.product
                  ? `${currency}${item.product.offerPrice * item.quantity}`
                  : '—'}
              </p>
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

export default MyOrders
