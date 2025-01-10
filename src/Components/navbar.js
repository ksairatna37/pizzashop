import React from 'react'
import '../Styles/navbar.css'
export default function navbar() {
    return (
        <>
            <nav class="navbar">
                <a class="navbar-brand mx-5 my-3" href="/">TRUE PIZZA</a>
                <ul>
                    
                    <li><a href="/items">Pizza's</a></li>
                    <li><a href="/myorders">My Orders</a></li>
                    
                </ul>
            </nav>


        </>
    )
}
