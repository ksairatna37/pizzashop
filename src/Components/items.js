import React from 'react'
import Navbar from './navbar'
import Formpage from './formpage'
import Homepage from './homepage'
import Pizzas from './pizzas'
import '../Styles/items.css'
import pizzabreadimage from '../assets/pizza-bread.png';
export default function Items() {
  return (
    <>
    <Navbar></Navbar>
    {/* <Formpage></Formpage> */}
    {/* <Homepage></Homepage> */}
    <div className="pizzas">
        <div className="section1">
           <div className="best">
           <span>Best </span> {/*<img src={pizzabreadimage} alt="" />*/} of <br /> the Best
           </div>
           <div className="delivery">Order ready in 30 minutes</div>
        </div>
        <div className="section1 section2">
        From Classic Margherita to Gourmet Creations, <br />Our Menu Offers a World of Pizzas Crafted with Love, Freshness, <br /> and a Touch of Culinary Magic!
        </div>
        <div className="section1 section2 section3">
            <Pizzas></Pizzas>
        </div>
    </div>
    </>
  )
}
