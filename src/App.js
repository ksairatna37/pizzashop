import './App.css';
import React from 'react';
import Hero from './Components/hero';
import Items from './Components/items';
import Cart from './Components/cart';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Choose from './Components/choose';
import Orders from './Components/orders';

const router = createBrowserRouter(
  [
    {
    path: "/",
    element: <Hero />
    },
    {
    path: "/items",
    element: <Items />
    },
    {
    path:"/items/:pizzaname/:price",
    element: <Cart />
    },
    {
    path:"/items/:pizzaname/choose",
    element: <Choose />
    },
    {
    path:"/myorders",
    element: <Orders />
    },

  ]
)
function App() {
  return (
    <div className="App">
      <RouterProvider router={router}></RouterProvider>
    </div>
    
  );
}

export default App;
