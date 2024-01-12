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
import loginService from '../services/login'
import UserContext, { saveUserLocally } from "../store/UserContext";


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
  IonInput,
  IonCard, 
  useIonToast,
  IonToast
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



const LoginPage = ({  }) => {

  const [user, userDispatch] = useContext(UserContext)


  const login = (e) => {
    e.preventDefault()
    const payload = {
      email: email.value,
      password: password.value,
  }
   console.log(payload)
   loginService.login(payload)
    .then(data => {
      console.log(data)
      userDispatch(saveUserLocally(data))
    })
    .catch(error => {
    toastEvent.notify(error.response.data.error)
    console.log(error.response.data)

   })
  }

  const useField = (type) => {
    const [value, setValue] = useState('')

    const onChange = (event) => {
      console.log(event.target.value)
      setValue(event.target.value)
    }

    return {
      type, value, onChange
    }
  }
  const email = useField('email')
  const password = useField('password')

  const useToast = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState('')

    const notify = (message) => {
      console.log('notify works')
      setIsOpen(true)
      setMessage(message)
      setTimeout(() => setIsOpen(false), 5000)
    }

    const toastEvent = {
      notify
    }

    const toastComponent = {
      get message() {
        return message
      },
      get isOpen() {
        return isOpen
      }
    }

    return {
      toastEvent,
      toastComponent,
    }
  }

  const {toastEvent, toastComponent} = useToast()
  console.log(user)

  
  return (
    <>
    <div className="m-4 text-center text-2xl font-bold">Login</div>
    <IonCard >
    <form onSubmit={e => login(e)}>
    <IonList>
      <IonItem>
        <IonInput 
        type="email" placeholder="email@example.com" onIonInput={email.onChange}></IonInput>
      </IonItem>

      <IonItem>
        <IonInput onIonInput={password.onChange} placeholder="Password" type="password"></IonInput>
      </IonItem>
    </IonList>
    <IonButton  type="submit" className='pt-1' size='default' expand="block">Login</IonButton>
    </form>
    </IonCard>
    <IonToast  positionAnchor="tabBar" {...toastComponent}></IonToast>
    {/* <IonToast  positionAnchor="tabBar" isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} message={toastMessage} duration={5000}></IonToast> */}
    
    </>
  )
};

export default LoginPage;