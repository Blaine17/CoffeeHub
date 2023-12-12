import { createContext, useReducer } from 'react'


const customizationReducer = (state, action) => {
  console.log('state', state)
  console.log('payload', action)
  const temp = state.find(element => element.name === action.payload.name)
  console.log(temp)
  const inForm =  temp ? 'CUST': undefined 
  switch (inForm) {
    case undefined:
      console.log('adding to state')
      return state.concat(action.payload)
    case ('CUST'):
      console.log('cust')
      return state.map(element => element.name === action.payload.name ? action.payload : element)
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