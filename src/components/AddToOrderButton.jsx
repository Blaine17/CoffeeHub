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
import UserContext from "../store/UserContext";
import { useNotifier } from "../store/notificationContext";

const AddToCartButton = ({ basePrice, name, id }) => {
  const [customizationContext, dispatchCustomization] =
    useContext(CustomizationContext);
  const [orderContext, dispatchOrder] = useContext(OrderContext);
  const [userContext ,] = useContext(UserContext)
  console.log(userContext)
  const notifyWith = useNotifier()


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
    //check is user is logged in to add to cart
    if(!userContext) {
      notifyWith('Sign in to add to cart')
      return 
    }
    const customizations = customizationContext;
    console.log(customizations)
    const payload = { name, customizations, basePrice, id };
    console.log(payload)
    dispatchOrder(saveOrderLocaly(payload));
    notifyWith(`Added ${name} to Order`)

  };

  const history = useHistory();

  const handleUpdateOrder = () => {
    const customizations = customizationContext;
    console.log(customizations)
    const payload = { name, customizations, basePrice, id };
    console.log(payload)
    dispatchOrder(updateOrderLocaly(payload, orderIndex))
    history.push("/cart")
    // dispatchOrder(saveOrderLocaly({ type: "ADD", payload }));

  };

  const price = CalculateCustomizedPrice();
if (urlParams.get('cart')) {
  return (
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <div className='grid place-items-end gap-2'>
      {/* <IonButton
        onClick={() => history.push("/cart")}
        className="shadow-2xl drop-shadow-2xl font-bold text-base"
        color="light"
        size='small'
      >
        {'Return to Order'}
      </IonButton> */}
      <button  onClick={() => history.push("/cart")} className="bg-slate-50 hover:bg-gray-400 drop-shadow-2xl	shadow-2xl text-gray-800 font-bold py-2 px-4 rounded-full outline outline-1 outline-slate-300">Return To Order</button>
      <IonButton
        onClick={() => handleUpdateOrder()}
        className="shadow-2xl drop-shadow-2xl font-bold text-base"
      >
        {`$${price} UPDATE ORDER`}
      </IonButton>
      </div>
    </IonFab>
  )
} else{
  return (
  
    <IonFab slot="fixed" vertical="bottom" horizontal="end">
      <IonButton
        data-test={price}
        name='add-to-order'
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
