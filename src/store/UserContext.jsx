import { createContext, useReducer, useEffect } from "react";

import loginService from '../services/login'

const reducer = (state, action) => {
  console.log(action)
  if (action.type === 'HYDRATE') {
    return action.payload
  }
  if (action.type === 'SET') {
    return action.payload
  }
  if (action.type === 'CLEAR') {
    return null
  }
  return state
}

const UserContext = createContext()

export const UserContextProvider = (props) => {
  const [user, userDispatch] = useReducer(reducer, null)

  useEffect(() => { 
    const storedUser = JSON.parse(localStorage.getItem('User'))
    console.log(storedUser)
    const initialUser = storedUser ? storedUser : null
    userDispatch({type: 'HYDRATE', payload: initialUser})
}, []) 


  return (<UserContext.Provider value={[user, userDispatch]} >
    {props.children}
  </UserContext.Provider>
  )
}

export default UserContext

export const saveUserLocally = (user) => {
  localStorage.setItem('User', JSON.stringify(user))
  return {type: 'SET', payload: user}
}

export const loadUser = () => {
  return JSON.parse(localStorage.getItem('User'))
}

export const removeUserLocally = (user) => {
  localStorage.removeItem('User')
  return {type: 'CLEAR'}
}