import { useParams, useHistory } from "react-router-dom";
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
import { saveOrderLocaly } from "../store/OrderContext";


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
import { calculateCustomizedPrice, subTotalPrice, afterTax } from "../helpers/priceHelper";

const AddToOrderButton = ({ basePrice, name, id }) => {

  const [orderContext, dispatchOrder] = useContext(OrderContext);

  if (!orderContext.length) return null

  const orderTotal = orderContext.reduce((sum, item) => {
    
    return sum + calculateCustomizedPrice(item.customizations, item.basePrice)
  }, 0)

  const history = useHistory()

  const subTotal = subTotalPrice(orderContext)
  const total = afterTax(subTotal)

  return (
  
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <div className='grid place-items-end gap-2'>
      <button  onClick={() => history.push('/')} className="bg-slate-50 hover:bg-gray-400 drop-shadow-2xl	shadow-2xl text-gray-800 font-bold py-2 px-4 rounded-full outline outline-1 outline-slate-300">Continue Shopping</button>
      <IonButton
        className="shadow-2xl font-bold text-base"
      >
        {`$${total.toFixed(2)} Complete Order`}
      </IonButton>
      </div>
    </IonFab>
  
  );
};

export default AddToOrderButton;
