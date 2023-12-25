import { remove } from 'ionicons/icons'
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
      return state.filter((item, index) => index !== action.payload)
    case 'UPDATE':
      console.log(action.payload.orderIndex)
      console.log()
      const temp = state.map((item, index) => {
        return index === action.payload.orderIndex
        ? action.payload.updatedItem
        : item 
      })
      console.log(temp)      
      return temp
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

export const saveOrderLocaly = (payload) => {
  console.log('in action handler')
  const orderListJSON = window.localStorage.getItem('orderList')
  //add to local storage if none, else initialize local storage
  if (orderListJSON) {
    const orderList = JSON.parse(orderListJSON)
    console.log(orderList)
    const updatedOrderList = orderList.concat(payload)
    console.log(updatedOrderList)
    window.localStorage.setItem('orderList', JSON.stringify(updatedOrderList))
  } else (
    window.localStorage.setItem('orderList', JSON.stringify([payload]))
  )
  return { type: "ADD", payload }
}

export const updateOrderLocaly = (payload, orderIndex) => {
  const orderListJSON = window.localStorage.getItem('orderList')
  //add to local storage if none, else initialize local storage
  const orderList = JSON.parse(orderListJSON)
  console.log(orderList.indexOf(payload))
  const updatedOrderList = [...orderList]
  updatedOrderList[orderIndex] = payload
  window.localStorage.setItem('orderList', JSON.stringify(updatedOrderList))
  console.log(updatedOrderList)
  return {type: 'UPDATE', payload: {updatedItem: payload, orderIndex}}
}

export const removeOrderLocaly = (action, orderIndex) => {
  console.log(orderIndex)

  const orderListJSON = window.localStorage.getItem('orderList')
  //add to local storage if none, else initialize local storage
  const orderList = JSON.parse(orderListJSON)

  const removedOrderList = orderList.filter((item, index) => index !== orderIndex)
  // const removedOrderList = orderList.slice(0, orderIndex).concat(orderList.slice(orderIndex + 1))
  window.localStorage.setItem('orderList', JSON.stringify(removedOrderList))

  console.log(orderList)
  // console.log(temp)
  return {type: 'REMOVE', payload: orderIndex}

}