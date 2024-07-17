import React, { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

import { createBrowserRouter, defer, RouterProvider } from "react-router-dom";

import Cart from "./pages/Cart/Cart";
import Error from "./pages/Error/Error";
import Layout from "./layout/Layout/Layout";
import { InfoProduct } from "./pages/InfoProduct/InfoProduct";
import axios from "axios";
import { PREFIX } from "./helpers/API";
import { AuthLayout } from "./layout/Auth/AuthLayout";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";

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
          return defer({
            // возвращаем Promise

            data: axios
              .get(`${PREFIX}/products/${params.id}`)
              .then((data) => data),
          });

          // const { data } = await axios.get(`${PREFIX}/products/${params.id}`);
          // return data;
        },
      },
    ],
  },
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
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
