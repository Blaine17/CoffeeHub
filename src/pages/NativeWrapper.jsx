import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonBackButton,
  IonButtons,
  IonButton,
  IonIcon,
  IonFooter,
  IonBadge,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonRouterOutlet,
  IonToast
} from "@ionic/react";
import "./Home.css";
import { IonReactRouter } from '@ionic/react-router';


import { bag, cafeOutline } from "ionicons/icons";

import Menu from "./Menu";
import { OrderContextProvider } from "../store/OrderContext";
import OrderContext from "../store/OrderContext";
// import NotificationContext from "../store/NotificationContext";
import { useContext, useState, useEffect } from "react";
import {
  Link,
} from "react-router-dom"
import {Route} from 'react-router'
import ItemPage from "./ItemPage";
import CartPage from "./CartPage";
import useToast from '../hooks/toastController'
import NotificationContext, {useNotifier} from '../store/notificationContext'
// might be able to implement this native wrapper using props.chilren
const NativeWrapper = ({ title, children }) => {
  const [orderContext, dispatchOrder] = useContext(OrderContext);
  const [notificationContext, dispatchNotification] = useContext(NotificationContext)
  const notifyWith = useNotifier()
  



  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar color="primary">
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
          <IonButton routerLink='/cart' slot="end">
            <div className="flex">
              <IonIcon size="large" icon={bag} />
              {orderContext.length}
            </div>
          </IonButton>
          <IonTitle data-test='title' size="large">{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {children}
      </IonContent>
    </IonPage>
  );
};

export default NativeWrapper;
