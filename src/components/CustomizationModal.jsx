import { useParams } from 'react-router-dom';
import menuItems from '../components/menuItems';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import menuService from '../services/menu'
import { cafeOutline } from 'ionicons/icons'
import { caretDownCircleOutline } from 'ionicons/icons';
import CustomizationContext from './CustomizationContext';

import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonModal,
  IonList,
  IonItem,
  IonAvatar,
  IonImg,
  IonLabel,
  IonButton,
  IonCheckbox,
  useIonModal,
  IonSelect,
  IonSelectOption
  
} from "@ionic/react"

import { useState, Fragment, useRef, forwardRef, useEffect, useContext } from 'react'

const ModalItem = (handleChoice, amount, item) => {

  console.log(handleChoice)
  console.log(item)
  console.log(amount)
  return (
    <IonItem onClick={() => handleChoice(item.item)} key={item}>
        <IonLabel>{item.item}</IonLabel>
        </IonItem >  
  )
}

const AmountSelector = ({handleChoice, item, amount}) => {
  console.log(amount)
  console.log(item)

  if(!amount) return null

  return (
    <IonSelect justify="start" label={item} placeholder="amount">
      {amount.map(option => {
        console.log(amount)
         return <IonSelectOption onClick={() =>handleChoice()} value={option}>{option}</IonSelectOption>
      })}
        </IonSelect>
  )
}

const CustomizationModal = (({ setIsOpen, modalData}) => {

  const [customizationContext, dispatch] = useContext(CustomizationContext)


  // const [customization, setCustomization] = useState([])

  const handleChoice = (selection) => {
    // setCustomization(selection)
    const name = modalData.name
    const payload = {name, selection}
    dispatch({type: name, payload})
    setIsOpen(false)
  }

 
  console.log(modalData)

  console.log(customizationContext)
  console.log('Context', customizationContext)

  return (
    <>
    <IonButtons onClick={() => setIsOpen(false)} slot="start">
      <IonButton>Cancel</IonButton>
    </IonButtons>

    <IonList id="modal-list" inset={true}>
      {modalData.selection.map(item => { 
        return modalData.amount.length === 0
        ? <IonItem onClick={() => handleChoice(item)} key={item}><IonLabel>{item}</IonLabel></IonItem >
        : <IonItem onClick={() => handleChoice(item)} key={item}><IonLabel>{item}</IonLabel></IonItem >
      })}
     </IonList>
       
    </> 
  )
  
})
 

export default CustomizationModal