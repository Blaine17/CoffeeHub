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
  IonBadge
  
} from "@ionic/react";
import "./Home.css";

import {bag} from 'ionicons/icons'



import Menu from "./Menu";

const NativeWrapper = ({ title, content }) => {
  return (
    
    <IonPage>
      <IonHeader>
          <IonToolbar color='primary'>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
        <IonButton slot='end'>
          
          <div className='flex' ><IonIcon size='large' icon={bag} />3</div>
          
      </IonButton>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>

      <IonContent fullscreen>
      
        {content}
      </IonContent>
      <IonFooter>
        <IonToolbar>
       {title === 'Order'
        ? null
        : <IonButton expand="block" >
        <span className='text-xl' >Add to Cart</span>
        </IonButton>
       }
      

          
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default NativeWrapper;
