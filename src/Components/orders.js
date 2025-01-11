import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import '../Styles/orders.css'; // Create this CSS file for styling
import Deleteconfirm from './deleteconfirm';
import jsPDF from "jspdf";

export default function Orders() {
    const [orders, setOrders] = useState(
        JSON.parse(localStorage.getItem('orders')) || []
    );
    // Fetch orders from local storage on component mount
    useEffect(() => {
        const storedOrders = JSON.parse(localStorage.getItem("orders")) || [];
        setOrders(storedOrders);
    }, []);

    const getOrdersByStatus = (status) => {
        return orders.filter(order => order.orderstatus === status);
    };

    const handleStatusChange = (orderId, newStatus) => {

        // Get current orders from localStorage
        const orders = JSON.parse(localStorage.getItem('orders')) || [];

        // Update the status of the specified order
        const updatedOrders = orders.map(order =>
            order.orderId === orderId ? { ...order, orderstatus: newStatus } : order
        );

        // Save updated orders back to localStorage
        localStorage.setItem('orders', JSON.stringify(updatedOrders));

        // Trigger a re-render by updating the component state
        setOrders(updatedOrders);
    };

    const [timeUpdated, setTimeUpdated] = useState(Date.now());  // Store the latest time for refreshing

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeUpdated(Date.now());  // Update the time every second
        }, 1000);  // 1000ms = 1 second

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    // Helper function to calculate time difference
    function calculateTimeTaken(orderDate) {
        const orderTime = new Date(orderDate);  // Convert the orderDate string into a Date object
        const currentTime = timeUpdated;  // Get the current time

        // Calculate the time difference in milliseconds
        const timeDiff = currentTime - orderTime;

        // Convert milliseconds into minutes
        const minutes = Math.floor(timeDiff / (1000 * 60));  // Time difference in minutes

        return `${minutes} min`;  // Return time in 'X min' format
    }




    function formatOrderDate(orderDate) {
        const date = new Date(orderDate);  // Convert ISO string to Date object
        if (isNaN(date)) {
            return 'Invalid Date';  // Check if the date is valid
        }
        return date.toLocaleString();  // Convert the date to a readable format in local time
    }

    const [modalData, setModalData] = useState(null);

    const handledelete = (pizzaname, orderid, price) => {
        setModalData({ pizzaname, orderid, price });
    };


    const handleOrderDelete = () => {
        // Update orders state (this is optional, for UI update)
        setOrders(JSON.parse(localStorage.getItem('orders')) || []);
    };

    function getTotalDeliveredOrders() {
        const orders = JSON.parse(localStorage.getItem("orders")) || []; // Fetch orders from local storage
        return orders.filter(order => order.orderstatus === "Order Picked").length; // Count delivered orders
    }
    

    const generateReceipt = (order) => {
        const doc = new jsPDF();

        // Add Company Name and Slogan
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text("True Pizza", 20, 20);
        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.text("Delicious Pizzas, Every Time!", 20, 30);

        // Add a line separator
        doc.setLineWidth(0.5);
        doc.line(20, 35, 190, 35);

        // Receipt Title
        doc.setFont("helvetica", "normal");
        doc.setFontSize(16);
        doc.text("Order Receipt", 20, 45);

        // Receipt Creation Date
        const receiptDate = new Date().toLocaleString();
        doc.setFontSize(10);
        doc.text(`Receipt Created: ${receiptDate}`, 20, 55);

        // Add order details
        doc.setFontSize(12);
        doc.text(`Order ID: ${order.orderId}`, 20, 70);
        doc.text(`Pizza: ${order.pizzaname}`, 20, 80);
        doc.text(`Order Date: ${order.orderDate}`, 20, 90);
        doc.text(`Price: Rs.${order.pizzaprice}`, 20, 100);
        doc.text(`Customer: ${order.firstname} ${order.lastname}`, 20, 110);
        doc.text(`Address: ${order.address}`, 20, 120);
        doc.text(`Payment Mode: ${order.paymode}`, 20, 130);

        // Add another line separator
        doc.line(20, 140, 190, 140);

        // Appreciation message
        doc.setFont("helvetica", "italic");
        doc.setFontSize(12);
        doc.text("Thank you for ordering with True Pizza!", 20, 150);
        doc.text("We hope you enjoy your meal. Come back soon!", 20, 160);

        // Save the PDF
        doc.save(`Order_${order.orderId}_Receipt.pdf`);
    };
    return (
        <>
            <Navbar />
            <div className="orders-main-section section1">
                <div className="best">
                    <div className="order-user-calling">hey <span>pizzaiolo</span> !</div>
                </div>
            </div>
            <div className="section1 section2 pizza-order-order">Orders</div>
            <div className="section1 section2 section3 pizza-stage-section">
                <div class="container">
                    Pizza Stage Section
                    <div class="row mt-3">
                        <div class="col-sm p-3">
                            <div className="order-card-title">
                                Order Placed
                            </div>
                        </div>
                        <div class="col-sm p-3">
                            <div className="order-card-title">
                                Order in making
                            </div>
                        </div>
                        <div class="col-sm p-3">
                            <div className="order-card-title">
                                Order Ready
                            </div>
                        </div>
                        <div class="col-sm p-3">
                            <div className="order-card-title">
                                Order Picked
                            </div>
                        </div>
                    </div>

                    <div class="row order-row">
                        <div class="col-sm p-3">

                            {getOrdersByStatus('Order Placed').map(order => {
                                const timeTaken = calculateTimeTaken(order.orderDate);

                                // Extract minutes from timeTaken and check if it's greater than 3 minutes
                                const minutesTaken = parseInt(timeTaken.split(' ')[0]);
                                const isTimeExceeded = minutesTaken > 3;

                                return (
                                    <div
                                        key={order.orderId}
                                        className={`order-detail-box ${isTimeExceeded ? 'bg-danger' : ''}`}  // Conditionally apply bg-danger if time > 3min
                                    >
                                        <p>Order ID: {order.orderId}</p>
                                        <p>Pizza: {order.pizzaname}</p>
                                        <p>Order Date: {formatOrderDate(order.orderDate)}</p>
                                        <p>{timeTaken}</p>
                                        <button
                                            className="add-to-cart-button"
                                            onClick={() => handleStatusChange(order.orderId, 'Order in Making')}
                                        >
                                            Next
                                        </button>
                                        <button
                                            className="add-to-cart-button bg-danger mt-2"
                                            data-toggle="modal" data-target="#exampleModal"
                                            onClick={() => handledelete(order.pizzaname, order.orderId, order.totalPrice)}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                );
                            })}


                        </div>
                        <div class="col-sm p-3">

                            {getOrdersByStatus('Order in Making').map(order => {
                                const showtimeTaken = calculateTimeTaken(order.orderDate);
                                return (
                                    <div key={order.orderId} className='order-detail-box '>
                                        <p>Order ID: {order.orderId}</p>
                                        <p>Pizza: {order.pizzaname}</p>
                                        <p>Order Date: {formatOrderDate(order.orderDate)}</p>
                                        <p>{showtimeTaken}</p>

                                        <button
                                            className="add-to-cart-button"
                                            onClick={() => handleStatusChange(order.orderId, 'Order Ready')}
                                        >
                                            Next
                                        </button>
                                        <button
                                            className="add-to-cart-button bg-danger mt-2"
                                            data-toggle="modal" data-target="#exampleModal"
                                            onClick={() => handledelete(order.pizzaname, order.orderId, order.totalPrice)}
                                        >
                                            Cancel
                                        </button>
                                    </div>)
                            })}
                        </div>
                        <div class="col-sm p-3">

                            {getOrdersByStatus('Order Ready').map(order => {
                                const showtimeTaken = calculateTimeTaken(order.orderDate);
                                return (
                                    <div key={order.orderId} className='order-detail-box '>
                                        <p>Order ID: {order.orderId}</p>
                                        <p>Pizza: {order.pizzaname}</p>
                                        <p>Order Date: {formatOrderDate(order.orderDate)}</p>
                                        <p>{showtimeTaken}</p>

                                        <button
                                            className="add-to-cart-button"
                                            onClick={() => handleStatusChange(order.orderId, 'Order Picked')}
                                        >
                                            Next
                                        </button>
                                        <button
                                            className="add-to-cart-button bg-danger mt-2"
                                            data-toggle="modal" data-target="#exampleModal"
                                            onClick={() => handledelete(order.pizzaname, order.orderId, order.totalPrice)}
                                        >
                                            Cancel
                                        </button>
                                    </div>)
                            })}
                        </div>
                        <div class="col-sm p-3">

                            {getOrdersByStatus('Order Picked').map(order => (
                                <div key={order.orderId} className='order-detail-box '>
                                    <p>Order ID: {order.orderId}</p>
                                    <p>Pizza: {order.pizzaname}</p>
                                    <p>Order Date: {formatOrderDate(order.orderDate)}</p>
                                    <button
                                        className="add-to-cart-button picked-button"

                                    >
                                        Picked
                                    </button>
                                    <button
                                        className="add-to-cart-button picked-button download-button mt-3"
                                        onClick={() => generateReceipt(order)}

                                    >
                                        Download Receipt
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="orders-container">
                {orders.length > 0 ? (
                    orders.map((order, index) => (
                        <div className="order-card" key={index}>


                        </div>
                    ))
                ) : (
                    <div className="no-orders">No orders found.</div>
                )}
            </div>

            {modalData && (
                <Deleteconfirm
                    pizzaname={modalData.pizzaname}
                    orderid={modalData.orderid}
                    price={modalData.price}
                    onDelete={handleOrderDelete}
                />
            )}
            <div className="section1 section2 section3 pizza-stage-section">
                <div className="container">
                    Main Section
                    <div class="row mt-3">
                        <div class="col-sm p-3">
                            <div className="order-card-title">
                                Order Id
                            </div>
                        </div>
                        <div class="col-sm p-3">
                            <div className="order-card-title">
                                Stage
                            </div>
                        </div>
                        <div class="col-sm p-3">
                            <div className="order-card-title">
                                Total Time Spent <br />(Time from order placed)
                            </div>
                        </div>
                        <div class="col-sm p-3">
                            <div className="order-card-title">
                                Action
                            </div>
                        </div>
                    </div>

                    {orders.map((order) => (
                        <div key={order.orderId} className="row mt-2">
                            <div className="col-sm p-3">
                                <div>{order.orderId}</div>
                            </div>
                            <div className="col-sm p-3">
                                <div>{order.orderstatus}</div>
                            </div>
                            <div className="col-sm p-3">
                                <div>{calculateTimeTaken(order.orderDate)}</div>
                            </div>
                            <div className="col-sm p-3">
                                <div className="order-card-title">

                                    {order.orderstatus !== "Order Picked" ? (
                                        <button
                                            className="add-to-cart-button bg-danger mt-2"
                                            data-toggle="modal"
                                            data-target="#exampleModal"
                                            onClick={() => handledelete(order.pizzaname, order.orderId, order.totalPrice)}
                                        >
                                            Cancel
                                        </button>
                                    ) : (
                                        <button
                                            className="add-to-cart-button picked-button download-button mt-3"
                                            onClick={() => generateReceipt(order)}

                                        >
                                            Download Receipt
                                        </button>
                                    )}

                                </div>
                            </div>
                        </div>
                    ))}



                </div>

            </div>
                    <div className="total-order-delivered mt-5 mb-5">
                        <div>Total orders delivered: {getTotalDeliveredOrders()}</div>
                    </div>

        </>
    );
}
