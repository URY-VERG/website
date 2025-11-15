import React, { useState } from "react";
import "./Checkout.css";

function Checkout({ cart, updateQuantity }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Order Placed Successfully!");
  };

  // 🧮 TOTAL CALCULATION
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="checkout-container">
      <h1 className="checkout-title">Checkout</h1>

      <div className="checkout-wrapper">

        {/* LEFT SIDE – FORM */}
        <div className="checkout-box">
          <h2>Customer Details</h2>

          <form onSubmit={handleSubmit}>

            <input
              type="text"
              placeholder="Full Name"
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Mobile Number"
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              required
            />

            <textarea
              placeholder="Full Address"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="City / Village"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />

            <input
              type="text"
              placeholder="Pincode"
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              required
            />

            <button className="order-btn">Place Order</button>
          </form>
        </div>

        {/* RIGHT SIDE – SUMMARY */}
        <div className="summary-box">
          <h2>Order Summary</h2>

          {cart.length === 0 ? (
            <p className="empty-cart">Cart is empty</p>
          ) : (
            cart.map((item, idx) => (
              <div key={idx} className="summary-item">
                <span>{item.name}</span>

                {/* Quantity Control */}
                <div className="qty-controls">
                  <button onClick={() => updateQuantity(item.name, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => updateQuantity(item.name, 1)}>+</button>
                </div>

                <span>₹{item.price * item.qty}</span>
              </div>
            ))
          )}

          <h3 className="total-amount">Total: ₹{total}</h3>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
