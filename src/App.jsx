import { useRef, forwardRef, useContext } from 'react'
import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  setupIonicReact,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonFooter,
  IonToolbar,
  IonTabs,
  IonIcon,
  IonToast
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { bag, cafeOutline, personCircleOutline } from "ionicons/icons";
import ProtectedRoute from "./pages/ProtectedRoute";
import Home from "./pages/Home";
import ItemPage from "./pages/ItemPage";
import Menu from "./pages/Menu";
import Test from "./pages/ProtectedRoute";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./theme/tailwind.css";
import NativeWrapper from "./pages/NativeWrapper";
import CartPage from "./pages/CartPage";
import OrderContext, { OrderContextProvider } from "./store/OrderContext";
import { UserContextProvider } from "./store/UserContext";
import { NotificationContextProvider } from "./store/notificationContext";
import NotificationContext, {useNotifier} from './store/notificationContext'


import UserPage from "./pages/UserPage";
import AccountWrapper from "./pages/AccountWrapper";
import test from "./services/authenticate";

setupIonicReact();

const HomeRoute = () => (
  <NativeWrapper title={"Order"}>
    <Menu />
  </NativeWrapper>
);

const ProductRoute = () => (
  <NativeWrapper title={null}>
    <ItemPage />
  </NativeWrapper>
);

const CartRoute = () => (
  <NativeWrapper title={"Cart"}>
    <ProtectedRoute title={"Cart"}>
      <CartPage />
    </ProtectedRoute>
  </NativeWrapper>
);

const AccountRoute = () => (
  <NativeWrapper title={"Account"}>
    <AccountWrapper />
  </NativeWrapper>
);

const ContextProvider = ({ children }) => {

  return (
    <UserContextProvider>
    <OrderContextProvider>
      <NotificationContextProvider>
       {children}
      </NotificationContextProvider>
    </OrderContextProvider>
  </UserContextProvider>
  )
}

const Content = () => {

  const [notificationContext, dispatchNotification] = useContext(NotificationContext)
  const [orderContext, dispatchOrder] = useContext(OrderContext)
  const notifyWith = useNotifier()

  return (
    <IonReactRouter>
            <IonTabs>
              <IonRouterOutlet>
                <Route exact path="/home" component={HomeRoute}/>
                <Route exact path="/" render={() => <Redirect to="/home" />} />
                <Route exact path="/product/:id" component={ProductRoute} />
                <Route exact path="/cart" component={CartRoute} />
                <Route exact path="/account" component={AccountRoute} />
              </IonRouterOutlet>

              <IonTabBar  id="tabBar" className="pt-1" slot="bottom">
              <IonTabButton tab="cart" href="/cart">
                  <IonIcon icon={bag} />
                  <IonLabel className="text-base">Cart</IonLabel>
                </IonTabButton>

                <IonTabButton tab="home" href="/home">
                  <IonIcon icon={cafeOutline} />
                  <IonLabel className="text-base">Order</IonLabel>
                </IonTabButton>

                <IonTabButton tab="account" href="/account">
                  <IonIcon icon={personCircleOutline} />
                  <IonLabel className="text-base">Account</IonLabel>
                </IonTabButton>
              </IonTabBar>
                
            </IonTabs>
            <IonToast position='bottom' positionAnchor="tabBar" isOpen={Boolean(notificationContext.message)} message={notificationContext.message} ></IonToast>
          </IonReactRouter>
  )
}



const App = () => {
  return (
 <ContextProvider>
        <IonApp>
         <Content/>
        </IonApp>
      </ContextProvider>
  )
};

export default App;
