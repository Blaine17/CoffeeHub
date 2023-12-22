import { useParams } from "react-router-dom";
// import menuItems from "./menuItems";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import menuService from "../services/menu";
import { cafeOutline } from "ionicons/icons";
import { caretDownCircleOutline } from "ionicons/icons";
import CustomizationModal from "./CustomizationModal";
import CustomizationContext, {
  CustomizationContextProvider,
} from "../store/CustomizationContext";
import CustomizationButton from "./CustomizationButton";
import { saveOrderLocaly, updateOrderLocaly } from "../store/OrderContext";


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
  IonFabButton,
  IonFab,
  IonFooter,
} from "@ionic/react";

import {
  useState,
  Fragment,
  useRef,
  forwardRef,
  useEffect,
  createContext,
  useReducer,
  useContext,
} from "react";
import OrderContext from "../store/OrderContext";

const AddToCartButton = ({ basePrice, name, id }) => {
  const [customizationContext, dispatchCustomization] =
    useContext(CustomizationContext);
  const [orderContext, dispatchOrder] = useContext(OrderContext);

  const urlParams = new URLSearchParams(window.location.search);
  const inCart = urlParams.get('cart')
  const orderIndex = Number(urlParams.get('index'))
  console.log(orderIndex)


  const CalculateCustomizedPrice = () => {
    const customizedPrice = customizationContext.reduce((sum, item) => {
      return sum + item.priceMod;
    }, 0);
    return basePrice + customizedPrice;
  };

  const handleAddToOrder = () => {
    const customizations = customizationContext;
    console.log(customizations)
    const payload = { name, customizations, basePrice, id };
    console.log(payload)
    dispatchOrder(saveOrderLocaly({ type: "ADD", payload }));

  };

  const handleUpdateOrder = () => {
    const customizations = customizationContext;
    console.log(customizations)
    const payload = { name, customizations, basePrice, id };
    console.log(payload)
    dispatchOrder(updateOrderLocaly({ type: "UPDATE", payload }, orderIndex))
    // dispatchOrder(saveOrderLocaly({ type: "ADD", payload }));

  };

  const price = CalculateCustomizedPrice();
if (urlParams.get('cart')) {
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonButton
        onClick={() => handleUpdateOrder()}
        className="shadow-2xl font-bold text-base"
      >
        {`$${price} UPDATE ORDER`}
      </IonButton>
    </IonFab>
  )
} else{
  return (
  
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonButton
        onClick={() => handleAddToOrder()}
        className="shadow-2xl font-bold text-base"
      >
        {`$${price} ADD TO ORDER`}
      </IonButton>
    </IonFab>
  
  );
}
  
};

export default AddToCartButton;
