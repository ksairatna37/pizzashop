import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from './navbar';
import '../Styles/cart.css'
import { useLocation } from 'react-router-dom';
import category1 from '../assets/pizza/category-veg.svg';
import category2 from '../assets/pizza/category-nonveg.svg';

import del from '../assets/delete.svg';
import add from '../assets/add.svg';
import cancel from '../assets/cancel.svg';



import margharita from "../assets/pizza/Margherita.png";
import pepperoni from "../assets/pizza/Pepperoni.png";
import veggie from "../assets/pizza/Veggie.png";
import bbq from "../assets/pizza/bbq.png";
import paneer from "../assets/pizza/paneer.png";
import meat from "../assets/pizza/meat.png";
function Cart() {
    const { pizzaname, price } = useParams();
    console.log(price)
    let [count, newcount] = useState(1);
    let pizzaprice = Math.floor(price * count)
    const value = Math.floor(pizzaprice)
    const tax = Math.floor(value * 0.18);
    const totalPrice = value + tax;
    const location = useLocation();
    const { description, choosecategory, img, base, size } = location.state || {};

    const [address, setAddress] = useState('');

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [phonenumber, setPhonenumber] = useState("");
    const [email, setEmail] = useState("");
    const [paymode, setPaymode] = useState("");
    const [errors, setErrors] = useState({});

    let orderstatus = "Order Placed"

    const validateInputs = () => {
        const newErrors = {};

        if (!firstname.trim()) newErrors.firstname = "First name is required.";
        if (!lastname.trim()) newErrors.lastname = "Last name is required.";
        if (!phonenumber.trim() || !/^\d{10}$/.test(phonenumber))
            newErrors.phonenumber = "Valid 10-digit phone number is required.";
        if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email))
            newErrors.email = "Valid email address is required.";
        if (!address.trim()) newErrors.address = "Address is required.";
        if (!paymode) newErrors.paymode = "Payment mode must be selected.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const navigate = useNavigate()
    const handleorder = () => {
        const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
        

        if (existingOrders.length >= 10) {
            alert("Not taking any order for now.");
            navigate(`/myorders`)
            return;
        }

        if (validateInputs()) {
            const nextOrderId = existingOrders.length > 0
                ? String(existingOrders.length).padStart(3, "0")
                : "000";

            const orderDate = new Date().toISOString();

            const newOrder = {
                orderId: nextOrderId,
                pizzaname,
                description,
                choosecategory,
                base,
                size,
                count,
                pizzaprice,
                totalPrice,
                firstname,
                lastname,
                phonenumber,
                email,
                address,
                paymode,
                orderstatus,
                orderDate,
            };
            console.log(newOrder.orderDate);

            localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

            navigate(`/myorders`);
        }
    };


    const handleaddressChange = (e) => {
        setAddress(e.target.value);
    }

    const handleplaceorder = () => {
        if (!address.trim()) {
            document.getElementById("alert").style.display = "block";
            return;
        }

        document.getElementById("works-right-side").style.display = "none";
        document.getElementById("place-order-section").style.display = "flex";
    };


    const handlecloseplaceorder = () => {
        document.getElementById("alert").style.display = "none";
        document.getElementById("works-right-side").style.display = "flex";
        document.getElementById("place-order-section").style.display = "none";
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
                                <span>New Hand Tossed |</span>{choosecategory === "Veg" ? (<img src={category1} alt="" />) : (<img src={category2} alt="" />)} <span className='category-type'>{choosecategory}</span>

                            </div>
                            <div className="base">{base} Crust</div>
                        </div>
                        <div className="price-sec sec">
                            <div className="pizza-price">₹{pizzaprice}.00</div>
                            <div className="size">({size})</div>
                            <div className="count quantity-control">
                                <button
                                    className="quantity-button delete-button"
                                    onClick={() => newcount((prevCount) => Math.max(1, prevCount - 1))}
                                >
                                    <img src={del} alt="" />
                                </button>
                                <span className="quantity-display">{count}</span>
                                <button
                                    className="quantity-button plus-button"
                                    onClick={() => newcount((prevCount) => Math.min(10, prevCount + 1))}
                                >
                                    <img src={add} alt="" />
                                </button>
                            </div>

                        </div>
                    </div>
                </div>
                <div className="works-card works-right-side" id='works-right-side'>
                    <div className="address-section">
                        <div className="instruction">Enter Delivery Address</div>
                        <textarea
                            className="address-input"
                            rows="2"
                            cols="5"
                            value={address}
                            onChange={handleaddressChange}
                        >
                        </textarea>
                        <div className="alert" id='alert'>Please Enter the address before procedding further!</div>
                    </div>
                    <div className="price-section address-section">
                        <div className="instruction">Price Details</div>
                        <div className="radio-buttons">
                            <div className="button">
                                <div className="subtotal">Subtotal</div>
                                <div className="subtotal-value">₹{pizzaprice}.00</div>
                            </div>
                            <div className="button">
                                <div className="discount">Discount</div>
                                <div className="subtotal-value">-</div>
                            </div>
                            <div className="button">
                                <div className="tax">Tax & Charges</div>
                                <div className="tax-value">₹{tax.toFixed(2)}</div>
                            </div>
                            <div className="button grand">
                                <div className="grand-total">Grand Total</div>
                                <div className="grand-total-value">₹{totalPrice.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                    <div className="add-button">
                        <button className="add-to-cart-button" onClick={handleplaceorder}>
                            Save & Continue
                        </button>
                    </div>
                </div>
                <div className="place-order-section" id='place-order-section'>
                    <div className="address-section">
                        <div className="instruction place-order-instruction">
                            <div className="fill-in-details">Fill details below</div>
                            <div className="cancel-button" onClick={handlecloseplaceorder}><img src={cancel} alt="" /></div>
                        </div>
                        <div className="input-fields-container">
                            <div>
                                <input type="text" placeholder="First Name" className="input-field" value={firstname} onChange={(e) => setFirstname(e.target.value)} />
                                {errors.firstname && <span className="error">{errors.firstname}</span>}
                            </div>
                            <div>
                                <input type="text" placeholder="Last Name" className="input-field" value={lastname} onChange={(e) => setLastname(e.target.value)} />
                                {errors.lastname && <span className="error">{errors.lastname}</span>}

                            </div>

                            <div>
                                <input type="text" placeholder="Phone Number" className="input-field" value={phonenumber} onChange={(e) => setPhonenumber(e.target.value)} />
                                {errors.phonenumber && (
                                    <span className="error">{errors.phonenumber}</span>
                                )}
                            </div>

                            <div>

                                <input type="email" placeholder="Email Address" className="input-field" value={email} onChange={(e) => setEmail(e.target.value)} />
                                {errors.email && <span className="error">{errors.email}</span>}

                            </div>

                            <div>

                                <input type="text" placeholder="Address" className="input-field address-input-field" value={address} />
                            </div>

                        </div>
                        <div className="button grand place-order-total">
                            <div className="grand-total">Grand Total</div>
                            <div className="grand-total-value place-order-grand-total">₹{totalPrice.toFixed(2)}</div>
                        </div>
                        <div className="address-section payment-mode">
                            <div className="instruction">Choose Payment Mode</div>
                            <div className="radio-buttons">
                                <label>
                                    <input
                                        type="radio"
                                        name="paymode"
                                        value="Cash on Delivery"
                                        className="radio-input"
                                        onChange={(e) => setPaymode(e.target.value)}
                                    />
                                    Pay by Cash 
                                </label>
                                {errors.paymode && <span className="error">{errors.paymode}</span>}

                            </div>
                        </div>
                        <div className="add-button">
                            <button className="add-to-cart-button" onClick={handleorder}>
                                Place Order
                            </button>
                        </div>
                    </div>
                </div>
            </div>



        </>
    );
}

export default Cart;