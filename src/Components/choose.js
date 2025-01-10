import React, { useState } from 'react'
import Navbar from './navbar'
import '../Styles/cart.css'

import { useLocation, useParams, useNavigate } from 'react-router-dom';

export default function Choose() {
    const { pizzaname } = useParams();
    const location = useLocation();
    const { description, category, img, large, small, medium } = location.state || {};

    const [rate, newrate] = useState(small)
    console.log(rate)

    const [choosecategory, newchoosecategory] = useState(category)

    const [base, newbase] = useState("Thin")

    const [size, newsize] = useState("small")

    const navigate = useNavigate()
    const handleAddToCart = (pizzaname) => {
        navigate(`/items/${pizzaname}/${rate}`, { state: { description, choosecategory, img, base, size } })
    }

    return (
        <>
            <Navbar></Navbar>
            <div className="form-page">
                <div className="works-card works-left-side">
                    <div className="box">
                        <div className="img sec"><img src={img} alt="" /></div>
                        <div className="pizza-details sec">
                            <div className="pizza-name">{pizzaname}</div>
                            <div className="pizza-desc">{description}</div>
                            <div className="type">
                                New Hand Tossed
                            </div>

                        </div>
                        <div className="price-sec sec">
                            <div className="pizza-price">₹{rate}.00</div>

                        </div>
                    </div>
                </div>
                <div className="works-card works-right-side">
                    <div className="address-section">
                        <div className="instruction">Choose Type</div>
                        <div className="radio-buttons">
                            <label>
                                <input
                                    type="radio"
                                    name="type"
                                    value="Veg"
                                    className="radio-input"
                                    onChange={() => newchoosecategory("Veg")}
                                />
                                Veg
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="type"
                                    value="Non-Veg"
                                    className="radio-input"
                                    onChange={() => newchoosecategory("Non-Veg")}
                                />
                                Non-Veg
                            </label>
                        </div>
                    </div>
                    <div className="address-section">
                        <div className="instruction">Choose Size</div>
                        <div className="radio-buttons">
                            <div className="button">
                                <label>
                                    <input
                                        type="radio"
                                        name="size"
                                        value="small"
                                        className="radio-input"
                                        onChange={() => { newrate(small); newsize("Small"); }}

                                    />
                                    Small
                                </label>
                                <div className="serving-price">₹
                                    {small}</div>
                            </div>
                            <div className="button">
                                <label>
                                    <input
                                        type="radio"
                                        name="size"
                                        value="large"
                                        className="radio-input"
                                        onChange={() => { newrate(large); newsize("Large"); }}
                                    />
                                    Large
                                </label>
                                <div className="serving-price">₹
                                    {large}</div>
                            </div>
                            <div className="button">
                                <label>
                                    <input
                                        type="radio"
                                        name="size"
                                        value="medium"
                                        className="radio-input"
                                        onChange={() => { newrate(medium); newsize("Medium"); }}
                                    />
                                    Medium
                                </label>
                                <div className="serving-price">₹
                                    {medium}</div>
                            </div>

                        </div>
                    </div>
                    <div className="address-section">
                        <div className="instruction">Choose Base</div>
                        <div className="radio-buttons">
                            <label>
                                <input
                                    type="radio"
                                    name="Base"
                                    value="Thin"
                                    className="radio-input"
                                    onChange={() => newbase("Thin")}
                                />
                                Thin
                            </label>
                            <label>
                                <input
                                    type="radio"
                                    name="Base"
                                    value="Thik"
                                    className="radio-input"
                                    onChange={() => newbase("Thik")}
                                />
                                Thik
                            </label>
                        </div>
                        <div className="add-button">
                            <button className="add-to-cart-button" onClick={() => handleAddToCart(pizzaname)}>
                                Add to Cart
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
