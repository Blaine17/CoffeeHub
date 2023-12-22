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
} from "@ionic/react";
import "./Home.css";

import { bag } from "ionicons/icons";

import Menu from "./Menu";
import { OrderContextProvider } from "../store/OrderContext";
import OrderContext from "../store/OrderContext";
import { useContext, useState } from "react";
import {
  Link,
} from "react-router-dom"

// might be able to implement this native wrapper using props.chilren
const NativeWrapper = ({ title, content }) => {
  const [orderContext, dispatchOrder] = useContext(OrderContext);

  const [x, setx] = useState(JSON.stringify(orderContext));

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
          <IonTitle size="large">{title}</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>{content}</IonContent>
      <IonFooter>
        <IonToolbar></IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default NativeWrapper;
