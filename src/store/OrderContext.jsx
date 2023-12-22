import { createContext, useReducer, useEffect, useState } from 'react'

const orderReducer = (state, action) => {
  console.log('state',state)
  console.log('payload', action.type)
  console.log('payload', action.payload)

  switch (action.type) {
    case 'HYDRATE':
      return action.payload
    case 'ADD':
      return state.concat(action.payload)
    case 'REMOVE':
      return state
    case 'UPDATE':
      return action.payload
    default:
      return state
  }
}

const OrderContext = createContext()

export const OrderContextProvider = (props) => {

  const [orderContext, orderDispatch] = useReducer(orderReducer, [])

  useEffect(() => { 
      const storedCart = JSON.parse(localStorage.getItem('orderList'))
      console.log(storedCart)
      const initialCart = storedCart ? storedCart : []
      orderDispatch({type: 'HYDRATE', payload: initialCart})
  }, []) 


  return (

    <OrderContext.Provider value={[orderContext, orderDispatch]}>
    {props.children}    
</OrderContext.Provider>
  )
}

export default OrderContext

export const saveOrderLocaly = (action) => {
  console.log('in action handler')
  const orderListJSON = window.localStorage.getItem('orderList')
  //add to local storage if none, else initialize local storage
  if (orderListJSON) {
    const orderList = JSON.parse(orderListJSON)
    console.log(orderList)
    const updatedOrderList = orderList.concat(action.payload)
    console.log(updatedOrderList)
    window.localStorage.setItem('orderList', JSON.stringify(updatedOrderList))
  } else (
    window.localStorage.setItem('orderList', JSON.stringify([action.payload]))
  )
  return action
}

export const updateOrderLocaly = (action, orderIndex) => {
  console.log('in action handler')
  const orderListJSON = window.localStorage.getItem('orderList')
  //add to local storage if none, else initialize local storage
  const orderList = JSON.parse(orderListJSON)
  const updatedOrderList = [...orderList]
  updatedOrderList[orderIndex] = action.payload
  console.log(updatedOrderList)
  return {type: 'UPDATE', payload: updatedOrderList}
}