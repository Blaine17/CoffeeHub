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
  IonSelectOption,
} from "@ionic/react";

import { cafeOutline } from "ionicons/icons";
import { caretDownCircleOutline } from "ionicons/icons";
import CustomizationContext from "../store/CustomizationContext";
import { useContext, useEffect } from "react";

const CustomizationButton = ({ modalData, handleClick, customization }) => {
  const [customizationContext, reduce] = useContext(CustomizationContext);

  //check if customization in store
  const matchedItem = customizationContext.find(
    (item) => item.name === customization.name
  );
  // if in store, return the selection else return the name of the selection
  const temp = matchedItem ? matchedItem.selection : customization.name;
  const choice = matchedItem ? matchedItem.selection : null
  

  return (
    <>
    

    {/* <IonButton
      onClick={() => handleClick(customization)}
      key={customization.name}
      className="px-4 py-2"
      expand="block"
      color="primary"
      fill="outline"
    >
      
      <span className='text-left w-full'>
      {temp}
      </span>
      <IonIcon size="large" icon={caretDownCircleOutline} slot="end"></IonIcon>
      
    </IonButton> */}
    <div className='flex h-20 w-auto'>
      <label className='absolute p-1 translate-x-6 bg-white '>{customization.name}</label>
      <button className='grid p-2 grid-cols-2 items-center content-center border-solid border-2 border-green-800 w-full m-4 rounded-lg text-left' onClick={() => handleClick(customization)}>
      <p className='col-span-1'>{choice}</p>
      <IonIcon className='col-span-1 justify-self-end' size="large" icon={caretDownCircleOutline}></IonIcon>
    </button></div>
   

</>
  );
};

export default CustomizationButton;
