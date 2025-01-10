import React from 'react'

const Deleteconfirm = (props) => {
   const handleorderDelete = ()=>{
    let orders = JSON.parse(localStorage.getItem("orders")) || [];

        // Filter out the order with the matching orderId
        orders = orders.filter(order => order.orderId !== props.orderid);

        // Save the updated orders array back to localStorage
        localStorage.setItem("orders", JSON.stringify(orders));

        
        

        // You can also trigger a callback here if you want to update the UI
        if (props.onDelete) {
            props.onDelete();  // Trigger a UI update (optional)
        }
   }
  return (
    <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    role="dialog"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">
            Delete Confirmation
          </h5>
          <button
            type="button"
            class="close"
            data-dismiss="modal"
            aria-label="Close"
          >
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">Do you want to cancel this order ? <br /><br />Order Details <br /><br />Order ID:{props.orderid} <br />Pizza: {props.pizzaname} <br />Price: ₹{props.price}</div>
        <div class="modal-footer">
          <button
            type="button"
            class="btn btn-secondary"
            data-dismiss="modal"
          >
            Close
          </button>
          <button type="button" class="btn btn-primary bg-danger" onClick={handleorderDelete} data-dismiss="modal">
            Confirm
          </button>
        </div>
      </div>
    </div>
  </div>
  )
}

export default Deleteconfirm