import React from 'react'
import Navbar from './navbar'
import '../Styles/homepage.css'
import bgimage from '../assets/homepage.jpg'
import selectImage from '../assets/select.png';
import linkimage from '../assets/up-right.png';
import pizzaimage from '../assets/pizza.png';
export default function Homepage() {
    return (
        <>
            <Navbar></Navbar>
            {/* <div className="home-page">
                <div className="circle-container">
                    <img src={selectImage} alt="select icon" className="circle-image" />
                </div>
            </div> */}
            <div className="name">TRUE PIZZA</div>
            <a href="/items">
            <div className="link">
            <div className="circle-container">
                <img src={selectImage} alt="select icon" className="circle-image" />
            </div>
            <div className="circle-container2">
                <img src={linkimage} alt="select icon" className="circle-image2" />
            </div>
            </div>
            </a>
            <div className="pizza-img-container">
                <img src={pizzaimage} alt="select icon" className="pizza-img" />
            </div>

        </>
    )
}
