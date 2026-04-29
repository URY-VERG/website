import React, { useMemo, useState } from "react";
import "./Checkout.css";
import { validateCheckout } from "../utils/checkoutValidation";
import { openRazorpayCheckout } from "../utils/razorpay";

function Checkout({ cart, updateQuantity, clearCart }) {
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    address: "",
    city: "",
    pincode: ""
  });

  const [paymentMethod, setPaymentMethod] = useState("cod"); // cod | razorpay
  const [errors, setErrors] = useState({});
  const [placing, setPlacing] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  // 🧮 TOTAL CALCULATION
  const total = useMemo(
    () => cart.reduce((sum, item) => sum + item.price * item.qty, 0),
    [cart]
  );

  const canPlaceOrder = cart.length > 0 && !placing;

  const placeCodOrder = async () => {
    const v = validateCheckout(form);
    setErrors(v.errors);
    if (!v.ok) return;

    setPlacing(true);
    try {
      // For now, store a local receipt. A real backend can replace this.
      const receipt = {
        id: `ORD-${Date.now()}`,
        createdAt: new Date().toISOString(),
        payment: "COD",
        form,
        items: cart,
        total,
      };
      const key = "agrilink:orders:v1";
      const prev = JSON.parse(localStorage.getItem(key) || "[]");
      localStorage.setItem(key, JSON.stringify([receipt, ...(Array.isArray(prev) ? prev : [])]));

      alert("Order placed (Cash on Delivery).");
      if (typeof clearCart === "function") clearCart();
    } finally {
      setPlacing(false);
    }
  };

  const payWithRazorpay = async () => {
    const v = validateCheckout(form);
    setErrors(v.errors);
    if (!v.ok) return;

    const key = process.env.REACT_APP_RAZORPAY_KEY_ID;
    if (!key) {
      setErrors((p) => ({
        ...p,
        payment: "Razorpay key missing. Add REACT_APP_RAZORPAY_KEY_ID in .env",
      }));
      return;
    }

    setPlacing(true);
    try {
      await openRazorpayCheckout({
        key,
        amountInPaise: Math.round(total * 100),
        name: "ANNADATA",
        description: "Order payment",
        prefill: {
          name: form.name,
          contact: form.mobile,
        },
        onSuccess: (resp) => {
          const receipt = {
            id: `PAY-${Date.now()}`,
            createdAt: new Date().toISOString(),
            payment: "Razorpay",
            razorpay: resp,
            form,
            items: cart,
            total,
          };
          const storageKey = "agrilink:orders:v1";
          const prev = JSON.parse(localStorage.getItem(storageKey) || "[]");
          localStorage.setItem(
            storageKey,
            JSON.stringify([receipt, ...(Array.isArray(prev) ? prev : [])])
          );
          alert("Payment successful. Order placed!");
          if (typeof clearCart === "function") clearCart();
        },
        onFailure: (err) => {
          setErrors((p) => ({ ...p, payment: err?.message || "Payment failed" }));
        },
      });
    } finally {
      setPlacing(false);
    }
  };

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
            {errors.name && <div style={{ color: "#b91c1c", fontSize: 12 }}>{errors.name}</div>}

            <input
              type="text"
              placeholder="Mobile Number"
              onChange={(e) => setForm({ ...form, mobile: e.target.value })}
              required
            />
            {errors.mobile && <div style={{ color: "#b91c1c", fontSize: 12 }}>{errors.mobile}</div>}

            <textarea
              placeholder="Full Address"
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              required
            />
            {errors.address && <div style={{ color: "#b91c1c", fontSize: 12 }}>{errors.address}</div>}

            <input
              type="text"
              placeholder="City / Village"
              onChange={(e) => setForm({ ...form, city: e.target.value })}
              required
            />
            {errors.city && <div style={{ color: "#b91c1c", fontSize: 12 }}>{errors.city}</div>}

            <input
              type="text"
              placeholder="Pincode"
              onChange={(e) => setForm({ ...form, pincode: e.target.value })}
              required
            />
            {errors.pincode && <div style={{ color: "#b91c1c", fontSize: 12 }}>{errors.pincode}</div>}

            <div style={{ marginTop: 10 }}>
              <div style={{ fontWeight: 700, marginBottom: 8 }}>Payment method</div>
              <label style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 6 }}>
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                Cash on Delivery (COD)
              </label>
              <label style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="radio"
                  name="payment"
                  value="razorpay"
                  checked={paymentMethod === "razorpay"}
                  onChange={() => setPaymentMethod("razorpay")}
                />
                Pay Online (Razorpay)
              </label>
              {errors.payment && (
                <div style={{ color: "#b91c1c", fontSize: 12, marginTop: 6 }}>
                  {errors.payment}
                </div>
              )}
            </div>

            <button
              type="button"
              className="order-btn"
              disabled={!canPlaceOrder}
              onClick={() => (paymentMethod === "razorpay" ? payWithRazorpay() : placeCodOrder())}
              style={!canPlaceOrder ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
            >
              {placing ? "Processing..." : paymentMethod === "razorpay" ? "Pay & Place Order" : "Place Order"}
            </button>
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
                  <button type="button" onClick={() => updateQuantity(item.name, -1)}>-</button>
                  <span>{item.qty}</span>
                  <button type="button" onClick={() => updateQuantity(item.name, 1)}>+</button>
                </div>

                <span>₹{item.price * item.qty}</span>
              </div>
            ))
          )}

          <h3 className="total-amount">Total: ₹{total}</h3>

          {cart.length > 0 && (
            <button
              type="button"
              className="order-btn"
              style={{ marginTop: 12, background: "#b91c1c" }}
              onClick={() => typeof clearCart === "function" && clearCart()}
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Checkout;
