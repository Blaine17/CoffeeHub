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
import CompleteOrderButton from "../components/CompleteOrderButton";
import {
  createOutline,
  addCircleOutline,
  removeCircleOutline,
} from "ionicons/icons";
import User from "../services/users";
import UserPage from "./UserPage";
import LoginPage from "./LoginPage";

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
  IonToast,
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

import OrderContext, {
  saveOrderLocaly,
  removeOrderLocaly,
} from "../store/OrderContext";
import { calculateCustomizedPrice } from "../helpers/priceHelper";
import UserContext, {
  removeUserLocally,
  saveUserLocally,
} from "../store/UserContext";
import Protected from "./Protected";
import test from "../services/authenticate";
import authenticate from "../hooks/authenticate";
import { useNotifier } from "../store/notificationContext";

const UserDetails = ({ user, userDispatch }) => {
  const handleLogout = () => {
    userDispatch(removeUserLocally());
  };


  console.log(user);
  return (
    <>
      <div>user details go here</div>
      {Object.entries(user).map((item) => {
        return <div key={item}>{item}</div>;
      })}
      <Protected />
      <button onClick={handleLogout}>Logout</button>
    </>
  );
};

const AccountWrapper = () => {
  const [user, userDispatch] = useContext(UserContext);

  const callback = function (authenticatedUser) {
    return userDispatch(saveUserLocally(authenticatedUser));
  };

  const removeUser = function (authenticatedUser) {
    return userDispatch(removeUserLocally());
  };
  authenticate(user, callback, removeUser);

  const notifyWith = useNotifier()


  // currently only checks session is page refreshed
  // useEffect(() => {
  //   test.test(user, callback).catch(error => {
  //     console.log(error.message)
  //     userDispatch(removeUserLocally())
  //     //logout user
  //   })
  // }, [])
 

  
  return (
    <>
      {user ? (
        <UserDetails user={user} userDispatch={userDispatch} />
      ) : (
        <AuthenticationWrapper />
      )}
    </>
  );
};

//might need to prevent default of anchor tag
const AuthenticationWrapper = ({}) => {
  const [register, setRegister] = useState(false);
  console.log("sign up or login");
  return (
    <>
      {register === true ? <UserPage /> : <LoginPage />}

      <div className="flex justify-center whitespace-pre">
        {register == true
          ? "Already have an account? Login"
          : "Dont have an Account? Register"}
        <a
          className="text-green-900 font-bold"
          onClick={() => setRegister(!register)}
        >
          {" "}
          here!
        </a>
      </div>
    </>
  );
};

export default AccountWrapper;
