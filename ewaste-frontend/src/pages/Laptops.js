import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Laptops.css";

const Laptops = () => {
  const [laptops, setLaptops] = useState([]);
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [payment, setPayment] = useState("cash");
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
  });
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [viewItem, setViewItem] = useState(null);

  // ✅ Fetch laptops from backend
  useEffect(() => {
    fetchLaptops();
  }, []);

  const fetchLaptops = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/laptops");
      setLaptops(res.data);
    } catch (err) {
      console.error("Error fetching laptops:", err);
    }
  };

  // ✅ Cart operations
  const addToCart = (item) => {
    const existing = cart.find((p) => p.id === item.id);
    if (existing) {
      setCart(cart.map((p) => (p.id === item.id ? { ...p, qty: p.qty + 1 } : p)));
    } else {
      setCart([...cart, { ...item, qty: 1 }]);
    }
    setShowCart(true);
  };

  const removeFromCart = (id) => setCart(cart.filter((p) => p.id !== id));
  const updateQty = (id, qty) => qty >= 1 && setCart(cart.map((p) => (p.id === id ? { ...p, qty } : p)));
  const totalAmount = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // ✅ Payment
  const handlePayment = () => {
    if (cart.length === 0) return alert("Add items to cart before paying!");
    if (!customer.name || !customer.phone || !customer.address)
      return alert("Please fill in your billing details!");
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 2500);
  };

  // ✅ Print Bill
  const printBill = () => {
    if (cart.length === 0) return alert("No items to print.");
    const printContent = `
      <html>
        <head><title>Bill Receipt</title></head>
        <body style="font-family:Poppins,sans-serif; padding:20px;">
          <h2>💻 Laptop Purchase Receipt</h2>
          <p><b>Name:</b> ${customer.name}</p>
          <p><b>Phone:</b> ${customer.phone}</p>
          <p><b>Email:</b> ${customer.email}</p>
          <p><b>Address:</b> ${customer.address}</p>
          <hr>
          <table border="1" cellspacing="0" cellpadding="8" width="100%">
            <tr><th>Laptop</th><th>Qty</th><th>Price</th><th>Total</th></tr>
            ${cart
              .map(
                (item) =>
                  `<tr><td>${item.name}</td><td>${item.qty}</td><td>₹${item.price}</td><td>₹${
                    item.price * item.qty
                  }</td></tr>`
              )
              .join("")}
          </table>
          <hr>
          <h3>Total Amount: ₹${totalAmount}</h3>
          <p><b>Payment Method:</b> ${payment}</p>
          <p>Thank you for shopping with <b>EcoCycle</b>!</p>
        </body>
      </html>`;
    const newWin = window.open("", "_blank");
    newWin.document.write(printContent);
    newWin.document.close();
    newWin.print();
  };

  return (
    <div className="laptops-container">
      {/* ✅ Header */}
      <header className="laptops-header">
        <h1>💻 Buy / Recycle Old Laptops</h1>
        <div className="header-buttons">
          <button className="cart-toggle-btn" onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cart.length})
          </button>
          <button className="add-item-btn" onClick={() => (window.location.href = "/add-item")}>
            ➕ Add Laptop
          </button>
        </div>
      </header>

      {/* ✅ Product List */}
      <div className="main-layout">
        <div className="oldmodels-section">
          <h2>Available Laptops</h2>
          <div className="oldmodels-grid">
            {laptops.map((item) => (
              <div key={item.id} className="oldmodels-card">
                <img src={item.imageFront} alt={item.name} className="main-img" />
                <h3>{item.name}</h3>
                <p>💾 Processor: {item.processor}</p>
                <p>📅 Used: {item.yearsUsed} Years</p>
                <p>🏷️ Condition: {item.condition || "Good"}%</p>
                <p className="price">₹{item.price}</p>

                <div className="oldmodels-btns">
                  <button onClick={() => addToCart(item)} className="add-cart-btn">
                    Add to Cart
                  </button>
                  {(item.imageFront || item.imageBack || item.imageSide) && (
                    <button className="view-btn" onClick={() => setViewItem(item)}>
                      View Images
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Cart Sidebar */}
        {showCart && (
          <aside className="cart-sidebar open">
            <button className="close-btn" onClick={() => setShowCart(false)}>✖</button>
            <h2>🛒 Your Cart ({cart.length})</h2>
            {cart.length === 0 ? (
              <p>No items added.</p>
            ) : (
              <>
                {cart.map((item) => (
                  <div key={item.id} className="cart-item">
                    <img src={item.imageFront} alt={item.name} />
                    <div>
                      <h4>{item.name}</h4>
                      <p>₹{item.price} × {item.qty}</p>
                      <div className="qty-controls">
                        <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="remove-btn">
                        Remove
                      </button>
                    </div>
                  </div>
                ))}

                <h3 className="total">Total: ₹{totalAmount}</h3>

                {/* ✅ Billing Form */}
                <div className="billing-form styled-billing">
                  <h3>Billing Details</h3>
                  <input type="text" placeholder="Full Name" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
                  <input type="text" placeholder="Phone" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
                  <input type="email" placeholder="Email" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
                  <textarea placeholder="Address" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })}></textarea>

                  <label>Payment Method:</label>
                  <select value={payment} onChange={(e) => setPayment(e.target.value)}>
                    <option value="cash">Cash</option>
                    <option value="card">Card</option>
                    <option value="upi">UPI</option>
                  </select>

                  <button className="pay-btn" onClick={handlePayment}>💳 Pay Now</button>
                  <button className="bill-btn" onClick={printBill}>🧾 Print Bill</button>
                </div>
              </>
            )}
          </aside>
        )}
      </div>

      {/* ✅ Image Viewer Modal */}
      {viewItem && (
        <div className="image-modal">
          <div className="image-modal-content">
            <button className="close-btn" onClick={() => setViewItem(null)}>✖</button>
            <h2>{viewItem.name} - Images</h2>
            <div className="image-gallery">
              {viewItem.imageFront && <img src={viewItem.imageFront} alt="Front" />}
              {viewItem.imageBack && <img src={viewItem.imageBack} alt="Back" />}
              {viewItem.imageSide && <img src={viewItem.imageSide} alt="Side" />}
            </div>
          </div>
        </div>
      )}

      {/* ✅ Payment Success Popup */}
      {paymentSuccess && (
        <div className="payment-success">
          <div className="success-box">
            ✅ Payment Successful!
            <p>Thank you, {customer.name || "User"}! Your order has been placed.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Laptops;
