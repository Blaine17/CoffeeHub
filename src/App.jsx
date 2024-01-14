import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonTabBar, IonTabButton, IonLabel, IonFooter, IonToolbar, IonTabs, IonIcon } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bag, cafeOutline, personCircleOutline } from "ionicons/icons";
import ProtectedRoute from './pages/ProtectedRoute';
import Home from './pages/Home';
import ItemPage from './pages/ItemPage'
import Menu from './pages/Menu'
import Test from './pages/ProtectedRoute'

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import './theme/tailwind.css';
import NativeWrapper from './pages/NativeWrapper';
import CartPage from './pages/CartPage'
import { OrderContextProvider } from './store/OrderContext';
import { UserContextProvider } from './store/UserContext';
import UserPage from './pages/UserPage';
import AccountWrapper from './pages/AccountWrapper';
import test from './services/test';


setupIonicReact();

const App = () => (
  <UserContextProvider>
  <OrderContextProvider>
  <IonApp>
    <IonReactRouter>
      <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/home">
        <NativeWrapper title={'Order'} content={<Menu/>}/>
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
        <Route exact path="/product/:id">
          <NativeWrapper title={null} content={<ItemPage/>}/>
        </Route>
        <ProtectedRoute>
                  <NativeWrapper title={'Cart'} content={<CartPage/>}/>
                </ProtectedRoute>
        <Route exact path='/account'>
          <>
          <NativeWrapper title={'Cart'} content={<AccountWrapper/>}/>
          </>
        </Route>
      </IonRouterOutlet>

     

       
      <IonTabBar id='tabBar' className='pt-1' slot="bottom">
          <IonTabButton tab="cart" href="/cart">
          <IonIcon icon={bag} />
            <IonLabel className='text-base'>Cart</IonLabel>
          </IonTabButton>

          <IonTabButton tab="home" href="/home">
          <IonIcon icon={cafeOutline} />
            <IonLabel className='text-base'>Order</IonLabel>
          </IonTabButton>

          <IonTabButton tab="account" href="/account">
          <IonIcon icon={personCircleOutline} />
            <IonLabel className='text-base'>Account</IonLabel>
          </IonTabButton>

          
        </IonTabBar>
       </IonTabs>
    </IonReactRouter>
  </IonApp>
  </OrderContextProvider>
  </UserContextProvider>
);

export default App;
