import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import menuService from "../services/menu";
import { cafeOutline } from "ionicons/icons";
import { caretDownCircleOutline } from "ionicons/icons";
import CustomizationContext from "../store/CustomizationContext";

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

import {
  useState,
  Fragment,
  useRef,
  forwardRef,
  useEffect,
  useContext,
} from "react";

const AmountSelector = ({ modalData, setIsOpen, item, amount }) => {
  const [customizationContext, dispatch] = useContext(CustomizationContext);


  const constuctChoice = (amount) => {
    const name = modalData.name;
    const selection = item.name;
    const priceMod = item.priceMod;

    const payload = { name, selection, amount, priceMod };
  
    dispatch({ type: 'CUST', payload });
    setIsOpen(false);

  };
  if (!amount) return null;

  return (
    <IonItem>
      <IonSelect
        onIonChange={(e) => constuctChoice(e.detail.value)}
        className="px-2"
        interface="popover"
        justify="start"
        // label={item.name}
        placeholder="amount"
      >
        {amount.map((option) => {
          return (
            <IonSelectOption data-test='customization-option' key={option} value={option}>
              {option}
            </IonSelectOption>
          );
        })}
      </IonSelect>
    </IonItem>
  );
};

const CustomizationModal = ({ setIsOpen, modalData }) => {
  const [customizationContext, dispatch] = useContext(CustomizationContext);

  // const [customization, setCustomization] = useState([])

  const handleChoice = (x) => {
    // setCustomization(selection)
    const selection = x.name;

    const priceMod = x.priceMod;


    const name = modalData.name;
    const payload = { name, selection, priceMod };
    dispatch({ type: 'CUST', payload });
    setIsOpen(false);
  };

  const handelClear = () => {
    const name = modalData.name;
    dispatch({type: 'CLEAR', payload: {name}})
    setIsOpen(false)
  }


  return (
    <>
    <IonHeader>
            <IonToolbar>
            <IonButtons onClick={() => setIsOpen(false)} slot="start">
        <IonButton>Cancel</IonButton>
      </IonButtons>
              <IonTitle>Welcome</IonTitle>
              <IonButtons onClick={() => handelClear()} slot="end">
        <IonButton>Clear</IonButton>
      </IonButtons>
            </IonToolbar>
          </IonHeader>
      
      <IonList id="modal-list" inset={true}>
        {modalData.selection.map((item) => {
          console.log(item);
          return modalData.amount.length === 0 ? (
            <IonItem onClick={() => handleChoice(item)} key={item.name}>
              <IonLabel>{item.name}</IonLabel>
            </IonItem>
          ) : (
            <IonItem key={item.name}>
              <IonLabel>{item.name}</IonLabel>
              <AmountSelector
                modalData={modalData}
                setIsOpen={setIsOpen}
                amount={modalData.amount}
                item={item}
              />
            </IonItem>
          );
        })}
      </IonList>
    </>
  );
};

export default CustomizationModal;
