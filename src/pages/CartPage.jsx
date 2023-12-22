import { Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import menuService from "../services/menu";
import { cafeOutline } from "ionicons/icons";
import { caretDownCircleOutline } from "ionicons/icons";
import CustomizationModal from "../components/CustomizationModal";
import { CustomizationContextProvider } from "../store/CustomizationContext";
import CustomizationButton from "../components/CustomizationButton";
import AddToOrderButton from "../components/AddToOrderButton";
import SizeSelection from "../components/SizeSelection";
import CompleteOrderButton from '../components/CompleteOrderButton'

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
  useContext
} from "react";
import OrderContext from "../store/OrderContext";
import { calculateCustomizedPrice } from "../helpers/priceHelper";

const OrderItemContainer = ({item, i}) => {

  const query = useQuery({
    queryKey: [item.name],
    queryFn: () => menuService.getProduct(item.name),
  });


  if (query.isLoading) return <div>loading</div>

  const itemTotal = calculateCustomizedPrice(item.customizations, item.basePrice)


 

  return (
    <IonItem >
      <Link to={`/product/${item.name}?cart=True&index=${i}`}>
      <div className='grid grid-cols-4 w-full gap-2 my-4'>
        <div className='col-span-1'><img
          className="rounded-full object-center"
          width="75"
          height="75"
          src={query.data.assests.imgUrl}/></div>
          
        <div className='col-span-3'>
       <div className='grid grid-cols-4'><div className='col-span-3 text-xl font-bold'>{item.name}</div><div className='col-span-1 font-bold text-right'>{`$${itemTotal}`}</div></div>
       <CustomizationList customizations={item.customizations} />
       </div>
       </div>
       </Link>
       </IonItem>
  )
}

const CustomizationList = ({customizations}) => {

  const modificationList = customizations.map(item => {
    const customizationText = item.amount === undefined ? item.selection : item.amount + ' ' + item.selection
    return (
      <li key={item.name} className='grid grid-cols-2'>
        <div className='col-span-1'>{customizationText}</div>
        {/* hide priceMod if 0 or is for drink size*/}
        {item.name === 'sizeCode' || item.priceMod === 0 ? null : <div  className='col-span-1 text-right'>{`+$${item.priceMod}`}</div>}
      </li>
    )
  })
  return (
  <ul >
    {modificationList}
  </ul>
  )
}

const CartPage = ({ match }) => {
  const [orderContext, dispatch] = useContext(OrderContext)
  
  return (
    <>
    <IonList>
    {orderContext.map((item, i) => 
       <OrderItemContainer key={i} item={item} i={i} />
     )
    }
    </IonList>
    <CompleteOrderButton/>
    </>
  )
};

export default CartPage;
