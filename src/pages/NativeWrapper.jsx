import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonBackButton,
  IonButtons,
  IonIcon
  
} from "@ionic/react";
import "./Home.css";



import Menu from "./Menu";

const NativeWrapper = ({ title, content }) => {
  return (
    
    <IonPage>
      <IonHeader>
          <IonToolbar color='primary'>
          <IonButtons slot="start">
            <IonBackButton></IonBackButton>
          </IonButtons>
            <IonTitle size="large">{title}</IonTitle>
          </IonToolbar>
        </IonHeader>

      <IonContent fullscreen>
      
        {content}
      </IonContent>
    </IonPage>
  );
};

export default NativeWrapper;
