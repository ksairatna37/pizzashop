import React from "react";
import margharita from "../assets/pizza/Margherita.png";
import pepperoni from "../assets/pizza/Pepperoni.png";
import veggie from "../assets/pizza/Veggie.png";
import bbq from "../assets/pizza/bbq.png";
import paneer from "../assets/pizza/paneer.png";
import meat from "../assets/pizza/meat.png";
import "../Styles/pizzas.css";
import { useNavigate } from "react-router-dom";

export default function Pizzas() {
  const Pizzas = [
    {
      id: "1",
      name: "Margherita",
      img: [margharita],
      price: "299", // Default price for a small pizza or base price
      sizes: {
        Small: "299", // Price for Small size
        Medium: "399", // Price for Medium size
        Large: "499", // Price for Large size
      },
      description:
        "Classic Margherita with fresh mozzarella, basil, and a rich tomato sauce.",
      category: "Veg",
      size: ["Small", "Medium", "Large"],
    },
    {
      id: "2",
      name: "Pepperoni Feast",
      img: [pepperoni],
      price: "399", // Default price for a small pizza or base price
      sizes: {
        Small: "399", // Price for Small size
        Medium: "499", // Price for Medium size
        Large: "599", // Price for Large size
      },
      description: "Loaded with premium pepperoni and gooey mozzarella cheese.",
      category: "Non-Veg",
      size: ["Small", "Medium", "Large"],
    },
    {
      id: "3",
      name: "Veggie Supreme",
      img: [veggie],
      price: "349", // Default price for a small pizza or base price
      sizes: {
        Small: "349", // Price for Small size
        Medium: "449", // Price for Medium size
        Large: "549", // Price for Large size
      },
      description:
        "A medley of fresh veggies like capsicum, onion, and olives on a cheesy base.",
      category: "Veg",
      size: ["Small", "Medium", "Large"],
    },
    {
      id: "4",
      name: "BBQ Chicken",
      img: [bbq],
      price: "449", // Default price for a small pizza or base price
      sizes: {
        Small: "449", // Price for Small size
        Medium: "549", // Price for Medium size
        Large: "649", // Price for Large size
      },
      description:
        "Succulent chicken pieces with smoky BBQ sauce and melted cheese.",
      category: "Non-Veg",
      size: ["Small", "Medium", "Large"],
    },
    {
      id: "5",
      name: "Paneer Tikka",
      img: [paneer],
      price: "379", // Default price for a small pizza or base price
      sizes: {
        Small: "379", // Price for Small size
        Medium: "479", // Price for Medium size
        Large: "579", // Price for Large size
      },
      description:
        "Indian-style pizza topped with paneer tikka, onions, and capsicum.",
      category: "Veg",
      size: ["Small", "Medium", "Large"],
    },
    {
      id: "6",
      name: "Meat Lovers",
      img: [meat],
      price: "499", // Default price for a small pizza or base price
      sizes: {
        Small: "499", // Price for Small size
        Medium: "599", // Price for Medium size
        Large: "699", // Price for Large size
      },
      description:
        "A hearty combination of chicken, pepperoni, and sausage for meat enthusiasts.",
      category: "Non-Veg",
      size: ["Small", "Medium", "Large"],
    },
  ];
  

  // const navigate = useNavigate()
  // const handleAddToCart = (pizzaname,price,description,category,img)=>{
  //   navigate(`/items/${pizzaname}/${price}`,{state:{description,category,img}})
  // }

  const navigate = useNavigate()
  const handleCustomize = (pizzaname,price,description,category,img,large,small,medium)=>{
    navigate(`/items/${pizzaname}/choose`,{state:{description,category,img,price,large,small,medium}})
  }


  return (
    <>
      {Pizzas.map((pizza) => (
        <>
          <div className="pizza-card">
            <div className="card-container">
              <div className="card-content">
                <h2 className="pizza-title">{pizza.name}</h2>
                <div className="pizza-image-container">
                  <img
                    src={pizza.img}
                    alt="Margarita Pizza"
                    className="pizza-image"
                  />
                </div>
                
                <button className="add-to-cart-button" onClick={()=> handleCustomize(pizza.name, pizza.price,pizza.description,pizza.category,pizza.img,pizza.sizes.Large,pizza.sizes.Small,pizza.sizes.Medium)}>
                  Customize ₹{pizza.price}/-
                </button>
              </div>
            </div>
          </div>
          {/* <div className="number">{pizza.id}</div>
            <div className="number">{pizza.name}</div> */}
        </>
      ))}
    </>
  );
}
