import AddProduct from "./components/AddProduct";
import ProductDetails from "./components/ProductDetails";
import ProductsList from "./components/ProductsList";

export default function App() {
  return (
    <div className="flex mt-2">
      <AddProduct />
      <ProductsList />
      <div className="border p-2 w-1/5 ml-1 h-full sticky top-0">
        <ProductDetails />
      </div>
    </div>
  );
}
