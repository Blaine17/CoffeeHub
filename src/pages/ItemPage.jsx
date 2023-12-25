import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import menuService from "../services/menu";
import { cafeOutline } from "ionicons/icons";
import { caretDownCircleOutline } from "ionicons/icons";
import CustomizationModal from "../components/CustomizationModal";
import { CustomizationContextProvider } from "../store/CustomizationContext";
import CustomizationButton from "../components/CustomizationButton";
import AddToOrderButton from "../components/AddToOrderButton";
import SizeSelection from "../components/SizeSelection";
import OrderContext from "../store/OrderContext";
import CustomizationContext from "../store/CustomizationContext";

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

const ItemPage = ({ match }) => {
  const [sizeColor, setSizeColor] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(false);

  const queryClient = useQueryClient();
  const id = useParams().id;

  // const urlParams = new URLSearchParams(window.location.search);
  // const inCart = urlParams.get('cart')
  // const orderIndex = Number(urlParams.get('index'))
  // const [orderContext, dispatchOrder] = useContext(OrderContext)
  // // const [customizationContext, dispatch] = useContext(CustomizationContext)

  const query = useQuery({
    queryKey: [id],
    queryFn: () => menuService.getProduct(id),
  });

  const product = query.data;

  const handleClick = (customization) => {
    setIsOpen(true);
    setModalData(customization);
  };

  if (query.isLoading) return <div>Loading your Coffee</div>;

  //size svgs dont line up to bottom of container
  return (
    <>
      <div className="m-4 grid-cols-1">
        <img
          className="m-4 mx-auto rounded-full object-center"
          width="250"
          height="250"
          src={query.data.assests.imgUrl}
        ></img>
        <div className="m-4 text-center text-2xl font-bold">{product.name}</div>
      </div>

      <CustomizationContextProvider>
        <SizeSelection productSizes={product.sizes} />
        <AddToOrderButton basePrice={product.basePrice} name={product.name} id={product.id}/>
        <div className="m-4 text-left text-xl font-bold">Customizations</div>
        {product.customizations.map((customization) => {
          return (
            <CustomizationButton
              key={customization.id}
              customization={customization}
              handleClick={handleClick}
              modalData={modalData}
            />
          );
        })}

        <IonModal
          isOpen={isOpen}
          initialBreakpoint={1}
          breakpoints={[0, 1]}
          onIonModalDidDismiss={() => setIsOpen(false)}
        >
          <CustomizationModal setIsOpen={setIsOpen} modalData={modalData} />
        </IonModal>
      </CustomizationContextProvider>
    </>
  );
};

export default ItemPage;

// return customization.amount.length === 0
// ? <Fragment key={customization.name}>
// <IonButton onClick={() => handleClick(customization)} id={customization.name} className="px-4 py-2" expand="block" color="primary" fill="outline">
// <IonIcon size='large'icon={caretDownCircleOutline} slot='end'></IonIcon>
// {customization.name}
// </IonButton>
// </Fragment>
// : <Fragment key={customization.name}>
// <IonButton onClick={() => handleClick(customization)} id={customization.name} className="px-4 py-2" expand="block" color="primary" fill="outline">
// <IonIcon size='large'icon={caretDownCircleOutline} slot='end'></IonIcon>
// {customization.name}
// </IonButton>
// <AmountSelector item={customization} amount={customization.amount}/>
// </Fragment>
