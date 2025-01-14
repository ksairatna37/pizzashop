// import './App.css';
// import React,{useEffect} from 'react';
// import Hero from './Components/hero';
// import Items from './Components/items';
// import Cart from './Components/cart';
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
// import Choose from './Components/choose';
// import Orders from './Components/orders';
// import './Styles/responsive.css'
// import { saveToTxtFile } from "./Components/save";

// const router = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <Hero />
//     },
//     {
//       path: "/items",
//       element: <Items />
//     },
//     {
//       path: "/items/:pizzaname/:price",
//       element: <Cart />
//     },
//     {
//       path: "/items/:pizzaname/choose",
//       element: <Choose />
//     },
//     {
//       path: "/myorders",
//       element: <Orders />
//     },

//   ]
// )
// function App() {
//   useEffect(() => {
//     function checkAndSaveOrders() {
//       const currentDate = new Date().toLocaleDateString();
//       const lastSavedDate = localStorage.getItem("lastSavedDate");

//       if (lastSavedDate !== currentDate) {
//         const orders = JSON.parse(localStorage.getItem("orders")) || [];

//         const orderDetails = orders.map(order =>
//           `Order ID: ${order.orderId}\nPizza: ${order.pizzaname}\nDate: ${order.orderDate}\n`
//         ).join("\n");

//         saveToTxtFile(orderDetails, `${currentDate}.txt`);

//         localStorage.removeItem("orders");
//         localStorage.setItem("lastSavedDate", currentDate);
//       }
//     }


//     const interval = setInterval(() => {
//       checkAndSaveOrders();
//     }, 86400000);

//     return () => clearInterval(interval);
//   }, []);
//   return (
//     <div className="App">
//       <RouterProvider router={router}></RouterProvider>
//     </div>

//   );
// }

// export default App;


import './App.css';
import React, { useEffect } from 'react';
import Hero from './Components/hero';
import Items from './Components/items';
import Cart from './Components/cart';
// import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HashRouter, Route, Routes, Link } from "react-router-dom";

import Choose from './Components/choose';
import Orders from './Components/orders';
import './Styles/responsive.css'
import { saveToTxtFile } from "./Components/save";

// const router = createBrowserRouter(
//   [
//     {
//       path: "/",
//       element: <Hero />
//     },
//     {
//       path: "/items",
//       element: <Items />
//     },
//     {
//       path: "/items/:pizzaname/:price",
//       element: <Cart />
//     },
//     {
//       path: "/items/:pizzaname/choose",
//       element: <Choose />
//     },
//     {
//       path: "/myorders",
//       element: <Orders />
//     },

//   ]
// )
function App() {
  useEffect(() => {
    function checkAndSaveOrders() {
      const currentDate = new Date().toLocaleDateString();
      const lastSavedDate = localStorage.getItem("lastSavedDate");

      if (lastSavedDate !== currentDate) {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];

        const orderDetails = orders.map(order =>
          `Order ID: ${order.orderId}\nPizza: ${order.pizzaname}\nDate: ${order.orderDate}\n`
        ).join("\n");

        saveToTxtFile(orderDetails, `${currentDate}.txt`);

        localStorage.removeItem("orders");
        localStorage.setItem("lastSavedDate", currentDate);
      }
    }


    const interval = setInterval(() => {
      checkAndSaveOrders();
    }, 86400000);

    return () => clearInterval(interval);
  }, []);
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Hero />} />
        <Route path="/items" element={<Items />} />
        <Route path="/items/:pizzaname/:price" element={<Cart />} />
        <Route path="/items/:pizzaname/choose" element={<Choose />} />
        <Route path="/myorders" element={<Orders />} />
      </Routes>
    </HashRouter>

  );
}

export default App;
