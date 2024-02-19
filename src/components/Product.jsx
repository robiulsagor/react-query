import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { UpdateContext } from "../context/UpdateContext";

const deleteProduct = async ({ id }) => {
  const response = await axios.delete(`http://localhost:8000/products/${id}`);
  return response.data;
};

export default function Product({ p }) {
  const { productId, setProductId } = useContext(ProductContext);
  const { setUdpateProductDetails } = useContext(UpdateContext);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: deleteProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  const deleteItem = (id) => {
    if (confirm("Are you sure to delete this product?")) {
      mutation.mutate({ id });
      if (id === productId) {
        setProductId(null);
      }
    }
  };

  const handleEdit = (p) => {
    setUdpateProductDetails({
      id: p.id,
      title: p.title,
      description: p.description,
      price: p.price,
      rating: p.rating,
      thumbnail: p.thumbnail,
    });
  };

  if (mutation.isSuccess) console.log("success");
  if (mutation.isError) console.log("error");

  return (
    <li className="m-2 border rounded-md overflow-hidden">
      <img src={p.thumbnail} alt="Product Thumbnail" className="h-56 w-96" />
      <div className="p-2">
        <h3 className="text-xl font-bold mb-2">{p.title}</h3>
        <div className="flex justify-between">
          <button
            onClick={() => setProductId(p.id)}
            className="bg-lime-800 text-white p-2 text-sm rounded hover:opacity-80 transition"
          >
            Details
          </button>

          <div>
            <button
              onClick={() => handleEdit(p)}
              className="bg-zinc-600  text-white p-2 text-sm rounded hover:opacity-80 transition mr-2"
            >
              Edit
            </button>

            <button
              onClick={() => deleteItem(p.id)}
              className="bg-red-800  text-white p-2 text-sm rounded hover:opacity-80 transition"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
