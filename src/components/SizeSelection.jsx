import { useParams } from "react-router-dom";
// import menuItems from "../components/menuItems";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import menuService from "../services/menu";
import { cafeOutline } from "ionicons/icons";
import { caretDownCircleOutline } from "ionicons/icons";
import CustomizationModal from "../components/CustomizationModal";
import { CustomizationContextProvider } from "../store/CustomizationContext";
import CustomizationButton from "../components/CustomizationButton";
import AddToOrderButton from "../components/AddToOrderButton";
import CustomizationContext from "../store/CustomizationContext";
import OrderContext from "../store/OrderContext";

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

const SizeSelection = ({ productSizes }) => {
  const [customizationContext, dispatch] = useContext(CustomizationContext);
  const [sizeColor, setSizeColor] = useState([]);

  //set initial size to middle size and update orderContext
  //might need to refactor later to set in reducer/context

  const urlParams = new URLSearchParams(window.location.search);
  const inCart = urlParams.get('cart')
  const orderIndex = Number(urlParams.get('index'))
  const [orderContext, dispatchOrder] = useContext(OrderContext)

  

  useEffect(() => {
    
    
    
  }, [])


  useEffect(() => { 
    const middleChoiceIndex = Math.round(productSizes.length/2) - 1
    const name = 'sizeCode'
    
    const sizeSelection = productSizes[middleChoiceIndex]
    const priceMod = sizeSelection.priceMod
    const selection = sizeSelection.sizeCode
    const payload = { name, selection, priceMod };
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('cart')) {
      const selectedSize = orderContext[orderIndex].customizations.find(item => item.name === 'sizeCode')
      console.log(selectedSize)
      setSizeColor(selectedSize.selection)
      dispatch({type: 'HYDRATE', payload: orderContext[orderIndex].customizations})
     
    } else {
      setSizeColor(productSizes[middleChoiceIndex].sizeCode)
      dispatch({ type: 'CUST', payload })
    }
    
  }, [orderIndex])

  const handleSizeChange = (active, i) => {
    const name = Object.keys(active).find(
      (key) => active[key] === active.sizeCode
    );
    const priceMod = active.priceMod;
    const selection = active.sizeCode;
    const payload = { name, selection, priceMod };
    console.log(payload)
    setSizeColor(active.sizeCode);
    dispatch({ type: 'CUST', payload });
  };

  // productSizes.map(size => {
  //   return (

  //   )
  // })

  return (
    <>
      <div className="grid grid-cols-3 items-end justify-items-center px-12">
        <div
          onClick={() => handleSizeChange(productSizes[0], 0)}
          className="grid grid-cols-1 justify-items-center"
        >
          <IonIcon
            className={`text-center self-end inline-block text-4xl`}
            icon={cafeOutline}
            color={sizeColor === productSizes[0].sizeCode ? "primary" : "secondary"}
          ></IonIcon>
          <div className="text-center">{productSizes[0].sizeCode}</div>
        </div>
        <div
          onClick={() => handleSizeChange(productSizes[1], 1)}
          className="grid grid-cols-1 justify-items-center"
        >
          <IonIcon
            className={`text-5xl text-end`}
            icon={cafeOutline}
            color={sizeColor === productSizes[1].sizeCode ? "primary" : "secondary"}
          ></IonIcon>
          <div className="text-center">{productSizes[1].sizeCode}</div>
        </div>
        <div
          onClick={() => handleSizeChange(productSizes[2], 2)}
          className="grid grid-cols-1 justify-items-center"
        >
          <IonIcon
            className={`text-6xl text-end m-0`}
            icon={cafeOutline}
            color={sizeColor === productSizes[2].sizeCode ? "primary" : "secondary"}
          ></IonIcon>
          <div className="text-center">{productSizes[2].sizeCode}</div>
        </div>
      </div>
    </>
  );
};

export default SizeSelection;
