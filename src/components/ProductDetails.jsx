import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import Error from "./Error";
import Loading from "./Loading";

const fetchProdct = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:8000/${queryKey[0]}/${queryKey[1]}`
  );
  return response.data;
};

export default function ProductDetails() {
  const { productId: id } = useContext(ProductContext);

  const {
    data: product,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["products", id],
    queryFn: fetchProdct,
    enabled: id !== null,
  });

  if (isLoading) return <Loading />;
  if (isFetching)
    return (
      <div>
        <h2>Fetching..</h2>
      </div>
    );

  if (error) return <Error error={error} />;

  if (!product) {
    return (
      <div>
        <h2 className="font-bold p-2">
          Nothing to show. Please select a product to see details.
        </h2>
      </div>
    );
  }

  return (
    <div className="">
      <h2 className="text-lg font-bold text-center mb-5">Product Details</h2>

      <div>
        <img
          src={product?.thumbnail}
          className="w-24 h-24 rounded-full object-cover mx-auto"
        />

        <p>Name: {product?.title} </p>
        <p>Description: {product?.description} </p>
        <p>Price: {product?.price} </p>
        <p>Rating: {product?.rating} </p>
      </div>
    </div>
  );
}
