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
import { createOutline, addCircleOutline, removeCircleOutline } from "ionicons/icons";


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
import  OrderContext, {saveOrderLocaly, removeOrderLocaly} from "../store/OrderContext";
import { calculateCustomizedPrice } from "../helpers/priceHelper";
import test from '../services/test'
import UserContext, { saveUserLocally, removeUserLocally } from "../store/UserContext";

const Protected = () => {
  const [user, userDispatch] = useContext(UserContext)
  const callback = function (authenticatedUser) {
    return userDispatch(saveUserLocally(authenticatedUser))
  }
  const handleClick = () => {
    test.test(user, callback)
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error.message)
        userDispatch(removeUserLocally())
        //logout user
      })
  }

  return (
    <button onClick={handleClick}>dcsCsd</button>
  )
}

export default Protected