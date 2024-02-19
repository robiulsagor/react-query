import { useState } from "react";
import { ProductContext } from "../context/ProductContext";

export const ProductProvider = ({ children }) => {
  const [productId, setProductId] = useState(null);

  return (
    <ProductContext.Provider value={{ productId, setProductId }}>
      {children}
    </ProductContext.Provider>
  );
};
