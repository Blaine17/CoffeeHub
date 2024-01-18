import { useState, useEffect, useContext } from "react";

import { IonItem, IonLabel, IonList } from "@ionic/react";
import menuService from "../services/menu";
import Category from "../components/Category";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import OrderContext from "../store/OrderContext";

const Menu = () => {

  const query = useQuery({
    queryKey: ["menuCategories"],
    queryFn: menuService.getCategories,
  });

  const items = query.data;

  if (query.isLoading) return null;


  return (
    <div className="m-1">
      {items.map((item) => (
        <Category key={item.id} products={item.products} />
      ))}
    </div>
  );
};


export default Menu;
