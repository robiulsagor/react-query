import { useState } from "react";
import { UpdateContext } from "../context/UpdateContext";

export const UpdateProvider = ({ children }) => {
  // const [udpateProductDetails, setUdpateProductDetails] = useState({
  //   title: "",
  //   description: "",
  //   price: "",
  //   rating: 0,
  //   thumbnail: "",
  // });

  const [udpateProductDetails, setUdpateProductDetails] = useState(null);

  return (
    <UpdateContext.Provider
      value={{ udpateProductDetails, setUdpateProductDetails }}
    >
      {children}
    </UpdateContext.Provider>
  );
};
