import { useParams } from 'react-router-dom';
import menuItems from '../components/menuItems';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import menuService from '../services/menu'
import { cafeOutline } from 'ionicons/icons'
import { caretDownCircleOutline } from 'ionicons/icons';
import CustomizationModal from '../components/CustomizationModal';
import { CustomizationContextProvider } from '../components/CustomizationContext';


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
  IonSelectOption
  
} from "@ionic/react"

import { useState, Fragment, useRef, forwardRef, useEffect, createContext, useReducer } from 'react'

const ItemPage = ({ match }) => {

  const [sizeColor, setSizeColor] = useState([])
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState(false)


  

  const queryClient = useQueryClient()
  const id = useParams().id  

  const query = useQuery({
    queryKey: ['product'],
    queryFn: () => menuService.getProduct(id)
  })


  const product = query.data

  const handleClick = (customization) => {
    setIsOpen(true)
    console.log(customization)
    setModalData(customization)
  }
  

  if (query.isLoading) return null
  


  //size svgs dont line up to bottom of container
  return (
    <>
    <div className='m-4 grid-cols-1'>
      <img className='m-4 mx-auto rounded-full object-center' width="250" height="250" src={query.data.assests.imgUrl}></img>
      <div className="m-4 text-center text-2xl font-bold">{query.data.name}</div>
     </div>


     <div className='grid grid-cols-3 items-end justify-items-center px-12'>
        <div onClick={() => setSizeColor(0)} className='grid grid-cols-1 items-end'>
        <IonIcon className={`text-center self-end inline-block text-4xl`} icon={cafeOutline} color={sizeColor === 0 ? 'primary' : 'secondary'}></IonIcon>
          <div className="text-center self-end">{query.data.sizes[0].sizeCode}</div>
        </div>
        <div onClick={() => setSizeColor(1)} className='grid grid-cols-1 items-end'>
          <IonIcon className={`text-5xl text-end`} icon={cafeOutline} color={sizeColor === 1 ? 'primary' : 'secondary'}></IonIcon>
          <div className="text-center">{query.data.sizes[1].sizeCode}</div>
        </div>
        <div onClick={() => setSizeColor(2)} className='grid grid-cols-1 items-end'>
          <IonIcon className={`text-6xl text-end m-0`} icon={cafeOutline} color={sizeColor === 2 ? 'primary' : 'secondary'}></IonIcon>
          <div className="text-center">{query.data.sizes[2].sizeCode}</div>
        </div>
      </div>

      <CustomizationContextProvider>
      {product.customizations.map((customization) => {
        return <Fragment key={customization.name}>
        <IonButton onClick={() => handleClick(customization)} id={customization.name} className="px-4 py-2" expand="block" color="primary" fill="outline">
        <IonIcon size='large'icon={caretDownCircleOutline} slot='end'></IonIcon>
        {customization.name}
      </IonButton>
        </Fragment>
      })}

        <IonModal isOpen={isOpen} initialBreakpoint={1} breakpoints={[0, 1]}
        onIonModalDidDismiss={() => setIsOpen(false)}>
          <CustomizationModal setIsOpen={setIsOpen} modalData={modalData}/>
        </IonModal>
        </CustomizationContextProvider>
     
    </>
  )
}

export default ItemPage


