import { createContext, useReducer, useContext, useState } from 'react'

const emptyNotification = { message: null }

const reducer = (state, action) => {
  if (action.type==='SET') {
    console.log(action.payload)
    return action.payload
  }
  if (action.type==='CLEAR') {
    return emptyNotification
  }
  return state
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [counter, counterDispatch] = useReducer(reducer, emptyNotification)


  return (
    <NotificationContext.Provider value={[counter, counterDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}

export const useNotification = () => {
  const [value] = useContext(NotificationContext)

  return value
}


export const useNotifier = () => {
  const [notification, dispatch] = useContext(NotificationContext)
  

  return (message, type='info')  => {
    clearTimeout(notification.prevId)
    const prevId = setTimeout(() => {
      dispatch({ type: 'CLEAR' })
    }, 5000)
    dispatch({
      type: 'SET',
      payload: { message, type, prevId }
    })
    
  }
}

export default NotificationContext