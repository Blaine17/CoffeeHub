import { createContext, useReducer, useEffect } from 'react'

const cartReducer = (state, action) => {
  console.log('state',state)
  console.log('payload', action.type)
  console.log('payload', action.payload)

  switch (action.type) {
    case 'ADD':
      return state.concat(action.payload)
    case 'REMOVE':
      return state
    default:
      return state
  }
}

const CartContext = createContext({
  cart: [],
  addToCart: () => {},
  removeFromCart: () => {},
})

const hydrateCart = () => {
  const storedCart = JSON.parse(localStorage.getItem('cart'))
  if (storedCart) {
    dispatchEvent(cartReducer({type: 'HYDRATE', payload: storedCart}))
  }
}

const dehydrateCart = () => {
  const cart = useContext(cartContext)
  localStorage.setItem('cart', JSON.stringify(cart))
}

export const CartContextProvider = (props) => {
  const [cartState, orderDispatch] = useReducer(CartReducer, [])

  useEffect(() => hydrateCart(), [])

  return (

    <CartContext.Provider value={[CartContext, orderDispatch]}>
    {props.children}    
</CartContext.Provider>
  )
}

export default CartContext

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