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
import User from '../services/users'


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
  useReducer,
  useContext
} from "react";
import  OrderContext, {saveOrderLocaly, removeOrderLocaly} from "../store/OrderContext";
import UserContext from "../store/UserContext";
import { calculateCustomizedPrice } from "../helpers/priceHelper";



const UserPage = ({  }) => {
  // const [isTouched, setIsTouched] = useState(false);

  // const [isValid, setIsValid] = useState()
 
  // const validateEmail = (email) => {
  //   return email.match(
  //     /^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
  //   );
  // };
  const [isOpen, setIsOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState('')

  const [user, userDispatch] = useContext(UserContext)
  console.log(user)

  const validate = (e) => {
    const value = e.target.value
    setIsValid(undefined)

    if (value === '') return

    validateEmail(value) !== null ? setIsValid(true) : setIsValid(false)
  }

  // const markTouched = () => {
  //   setIsTouched(true);
  // };

  // const onInput = (e) => {
  //   const value = e.target.value
  //   console.log(value)
  // }

  const register = (e) => {
    e.preventDefault()
    const payload = {name: name.value,
      email: email.value,
      password: password.value,
      confirmPassword: confirmPassword.value
  }
   console.log(payload)
   User.register(payload).catch(error => {
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

  const firstName = useField('text')
  const lastName = useField('text')
  const email = useField('email')
  const password = useField('password')
  const confirmPassword = useField('password')

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

  
  return (
    <>
    <div className="m-4 text-center text-2xl font-bold">Register</div>
    <IonCard >
    <form onSubmit={e => register(e)}>
      
    <IonList>
      <IonItem>
        <IonInput onIonInput={firstName.onChange} placeholder="First Name"></IonInput>
      </IonItem>

      <IonItem>
        <IonInput onIonInput={lastName.onChange} placeholder="Last Name"></IonInput>
      </IonItem>

      <IonItem>
        <IonInput 
        type="email" placeholder="email@example.com" onIonInput={email.onChange}></IonInput>
      </IonItem>

      <IonItem>
        <IonInput onIonInput={password.onChange} placeholder="Password" type="password"></IonInput>
      </IonItem>
      <IonItem>
        <IonInput onIonInput={confirmPassword.onChange} placeholder="Confirm Password" type="password" ></IonInput>
      </IonItem>
    </IonList>
    <IonButton  type="submit" className='pt-1' size='default' expand="block">Register</IonButton>
    </form>
    </IonCard>
    <IonToast  positionAnchor="tabBar" {...toastComponent}></IonToast>
    {/* <IonToast  positionAnchor="tabBar" isOpen={isOpen} onDidDismiss={() => setIsOpen(false)} message={toastMessage} duration={5000}></IonToast> */}
    
    </>
  )
};

export default UserPage;
