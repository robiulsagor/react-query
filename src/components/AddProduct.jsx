import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { UpdateContext } from "../context/UpdateContext";
import Error from "./Error";

const addProduct = async (newData) => {
  const response = await axios.post("http://localhost:8000/products", newData);
  return response.data;
};

const updateProduct = async (data) => {
  const response = await axios.put(
    `http://localhost:8000/products/${data.id}`,
    data
  );
  return response.data;
};

export default function AddProduct() {
  const { udpateProductDetails, setUdpateProductDetails } =
    useContext(UpdateContext);

  const [state, setState] = useState({
    title: "",
    description: "",
    price: "",
    rating: 0,
    thumbnail: "",
  });

  useEffect(() => {
    udpateProductDetails && setState(udpateProductDetails);
  }, [udpateProductDetails]);

  const handleCancelEdit = () => {
    setState({
      title: "",
      description: "",
      price: "",
      rating: 0,
      thumbnail: "",
    });
    setUdpateProductDetails(null);
  };

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setState({
      ...state,
      [name]: value,
    });
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addProduct,
    onSuccess: () => {
      queryClient.invalidateQueries("products");
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
    },
  });

  // add a new product
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      id: crypto.randomUUID().toString(),
      ...state,
    };

    mutation.mutate(data);

    // empty the state after submitting data
    setState({
      title: "",
      description: "",
      price: "",
      rating: 0,
      thumbnail: "",
    });
  };

  // edit an existing product
  const handleEditProduct = (e) => {
    e.preventDefault();
    updateMutation.mutate(state);
    setUdpateProductDetails(null);
    setState({
      title: "",
      description: "",
      price: "",
      rating: 0,
      thumbnail: "",
    });
  };

  if (mutation.isError) return <Error error={mutation.error} />;

  return (
    <div className="w-1/5 border h-full sticky top-0 mr-1">
      <h2 className="text-lg font-bold text-center mt-1">
        {udpateProductDetails ? "Update Product" : "Add Product"}
      </h2>

      {mutation.isSuccess && (
        <span className="mt-3 block text-center">Product added</span>
      )}

      <form
        className="mt-4 p-3 "
        onSubmit={udpateProductDetails ? handleEditProduct : handleSubmit}
      >
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          className="border w-full p-1 rounded outline-none mb-1.5"
          value={state.title}
          onChange={handleChange}
        />
        <textarea
          name="description"
          placeholder="Enter Description"
          className="border w-full p-1 rounded outline-none resize-none mb-0"
          value={state.description}
          onChange={handleChange}
        ></textarea>
        <input
          type="number"
          name="price"
          placeholder="Enter product price"
          className="border w-full p-1 rounded outline-none mb-1.5"
          value={state.price}
          onChange={handleChange}
        />
        <input
          type="text"
          name="thumbnail"
          placeholder="Product Thumbnail"
          className="border w-full p-1 rounded outline-none"
          value={state.thumbnail}
          onChange={handleChange}
        />

        {udpateProductDetails && (
          <button
            type="button"
            onClick={handleCancelEdit}
            className="bg-red-800 w-full mt-3 p-2 rounded text-white text-sm hover:opacity-80 transition"
          >
            Cancel
          </button>
        )}

        <button
          type="submit"
          className="bg-slate-800 w-full mt-3 p-2 rounded text-white text-sm hover:opacity-80 transition"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
