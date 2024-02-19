import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import Error from "./Error";
import Loading from "./Loading";
import Product from "./Product";

const fetchProducts = async ({ queryKey }) => {
  const response = await axios.get(
    `http://localhost:8000/${queryKey[0]}?_page=${queryKey[1]}&_per_page=5`
  );
  return response.data;
};

export default function ProductsList() {
  const [page, setPage] = useState(1);

  const {
    data: products,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: fetchProducts,
  });

  if (isLoading) return <Loading />;

  if (error) return <Error error={error} />;

  const handlePrevPage = () => {
    if (products.prev) {
      setPage((page) => page - 1);
    }
  };

  const handleNextPage = () => {
    if (products.next) {
      setPage((page) => page + 1);
    }
  };

  return (
    <div className="w-3/5 border">
      <h2 className="text-4xl text-center font-extrabold text-orange-800 w-fit mx-auto mt-3 mb-5 relative before:content-[''] before:absolute before:w-10 before:h-2 before:bg-orange-800 before:-left-14 before:top-1/2 after:content-[''] after:absolute after:w-10 after:h-2 after:bg-orange-800 after:-right-14 after:top-1/2 ">
        Product List
      </h2>
      {products?.data && products?.data.length == 0 && (
        <div>
          <h2 className="text-3xl text-center mt-10">No products found!</h2>
        </div>
      )}

      <ul className="flex flex-wrap justify-center">
        {products?.data &&
          products?.data.length > 0 &&
          products.data.map((p) => <Product p={p} key={p.id} />)}
      </ul>

      <hr className="my-5" />

      <div className="text-center mt-5 mb-10 space-x-5">
        <button
          disabled={!products.prev}
          className="py-1 px-2 rounded bg-stone-800 text-white hover:opacity-75 transition disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handlePrevPage}
        >
          Prev
        </button>
        <button
          disabled={!products.next}
          className="py-1 px-2 rounded bg-stone-800 text-white  hover:opacity-75 transition disabled:opacity-60 disabled:cursor-not-allowed"
          onClick={handleNextPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}
