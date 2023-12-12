import { useState, useEffect } from "react";
import menuItems from "../components/menuItems";
import MenuItem from "../components/MenuItem";
import { IonItem, IonLabel, IonList } from "@ionic/react";
import menuService from '../services/menu'
import Category from '../components/Category'
import { useQuery, useQueryClient } from '@tanstack/react-query'


const Menu = () => {
  const [products, setProducts] = useState(menuItems.products);
  const [temp, setTemp] = useState(null)
  const [categories, setCategories] = useState(null)

  const queryClient = useQueryClient()

  const query = useQuery({
    queryKey: ['menuCategories'],
    queryFn: menuService.getCategories
  })

  console.log(query)
  const items = query.data




  // useEffect(() => {
  //   menuService.getAll().then(response => {
  //     setTemp(response)
  //   })

  //   menuService.getCategories().then(response => {
  //     setCategories(response)
  //   })
  
  // }, [])

  console.log(items)
  // console.log(categories)

  if (query.isLoading) return null

  // return (
  //   <ul className="m-4">
  //     {x.map((product) => (
  //       <MenuItem key={product.id} item={product} />
  //     ))}
  //   </ul>
  // );

  return (
    <div className="m-4">
      {items.map((item) => (
        <Category key={item.id} products={item.products} />
      ))}
    </div>
  );

  

};




//   return (
//     <ul className="m-4">
//       {products.map((product) => (
//         <MenuItem key={product.displayOrder} item={product} />
//       ))}
//     </ul>
//   );
// };

export default Menu;
