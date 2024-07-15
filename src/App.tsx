import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Button } from "./components/Button/Button";
import Input from "./components/Input/Input";
import Menu from "./pages/Menu/Menu";
import Cart from "./pages/Cart/Cart";
import Error from "./pages/Error/Error";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Menu />,
    },
    {
      path: "/cart",
      element: <Cart />,
    },
    {
      path: "*",
      element: <Error />,
    },
  ]);

  return (
    <>
      <div>
        <Button>Кнопка</Button>
        <div>Some Div</div>
        <Button size="big">Вторая кнопка</Button>
        <Input placeholder="Email" />
      </div>
      <div>
        <a href="/">Меню</a>
        <a href="/cart">Корзина</a>
      </div>
      <RouterProvider router={router} />
    </>
  );
}

export default App;
