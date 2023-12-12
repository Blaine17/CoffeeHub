import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import Menu from "./Menu";

const Home = () => {
  console.log("whats up");
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Order Coffee</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">does it work</IonTitle>
          </IonToolbar>
        </IonHeader>
        <Menu />
      </IonContent>
    </IonPage>
  );
};

export default Home;
