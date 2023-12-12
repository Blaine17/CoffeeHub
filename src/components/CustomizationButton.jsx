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

import { cafeOutline } from 'ionicons/icons'
import { caretDownCircleOutline } from 'ionicons/icons';
import CustomizationContext from './CustomizationContext';
import { useContext } from "react";

const CustomizationButton = ({ handleClick, customization }) => {

  const [customizationContext, reduce] = useContext(CustomizationContext)

  console.log(customizationContext)

  //check if customization in store
  const matchedItem = customizationContext.find(item => item.name === customization.name);
  // if in store, return the selection else return the name of the selection
  const temp = matchedItem
  ? matchedItem.selection
  : customization.name

  console.log(temp)

  // const customizedItems = customizationContext.map(element => element.name)

  // const temp = customizedItems.includes()
  // const x = customizedItems.findeIndex(customization.name)
  // const buttonText = customizationContext[x]


  // console.log(buttonText)

  return (

      <IonButton onClick={() => handleClick(customization)} id={customization.name} className="px-4 py-2" expand="block" color="primary" fill="outline">
      <IonIcon size='large'icon={caretDownCircleOutline} slot='end'></IonIcon>
      {temp}
    </IonButton>
  )
}

export default CustomizationButton