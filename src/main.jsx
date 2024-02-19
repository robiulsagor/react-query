import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ProductProvider } from "./provider/ProductProvider.jsx";
import { UpdateProvider } from "./provider/UpdateProvider.jsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ProductProvider>
        <UpdateProvider>
          <App />
        </UpdateProvider>
      </ProductProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </React.StrictMode>
);
