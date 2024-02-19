import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const fetchProducts = async () => {
  const response = await axios.get(`http://localhost:8000/products`);
  return response.data;
};

export default function ProductsList() {
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  return (
    <div className="w-3/5 border">
      <h2 className="text-4xl text-center font-extrabold text-orange-800 w-fit mx-auto mt-3 mb-5 relative before:content-[''] before:absolute before:w-10 before:h-2 before:bg-orange-800 before:-left-14 before:top-1/2 after:content-[''] after:absolute after:w-10 after:h-2 after:bg-orange-800 after:-right-14 after:top-1/2 ">
        Product List
      </h2>
      {products && products.length == 0 && (
        <div>
          <h2 className="text-3xl text-center mt-10">No products found!</h2>
        </div>
      )}

      <ul className="flex flex-wrap justify-center">
        {products &&
          products.length > 0 &&
          products.map((p) => <Product p={p} key={p.id} />)}
      </ul>
    </div>
  );
}
