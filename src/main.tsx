import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Cart from "./pages/Cart/Cart";
import Error from "./pages/Error/Error";
import Layout from "./layout/Layout";
import { InfoProduct } from "./pages/InfoProduct/InfoProduct";
import axios from "axios";
import { PREFIX } from "./helpers/API";

const Menu = lazy(() => import("./pages/Menu/Menu"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<>Загрузка Меню...</>}>
            <Menu />
          </Suspense>
        ),
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/product/:id",
        element: <InfoProduct />,
        errorElement: <>Ошибка</>,
        loader: async ({ params }) => {
          const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          return data;
        },
      },
    ],
  },
  {
    path: "*",
    element: <Error />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
