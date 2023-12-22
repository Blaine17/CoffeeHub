import { createContext, useReducer } from 'react'


const customizationReducer = (state, action) => {
  console.log('state', state)
  console.log('payload', action)
  console.log('payload', action.payload)
  
  switch (action.type) {
    // replaces cutomization if present, else adds to list
    case ('CUST'):
      const temp = state.find(element => element.name === action.payload.name)
      if (temp) {
        return state.map(element => element.name === action.payload.name ? action.payload : element)
      } else {
        return state.concat(action.payload)
      }
    //removes selection
    case ('CLEAR'):
      
      const cleared = state.filter(item => item.name !== action.payload.name)
      return cleared
    //hydrates customizations options from cart
    case ('HYDRATE'):
        return action.payload
    default:
      return state
  }

}


const CustomizationContext = createContext()

export const CustomizationContextProvider = (props) => {
  const [customization, customizationDispatch] = useReducer(customizationReducer, [])

  return (
    <CustomizationContext.Provider value={[customization, customizationDispatch]}>
      {props.children}
    </CustomizationContext.Provider>
  )
}


export default CustomizationContext