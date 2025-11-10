import React, { useState, useEffect } from "react";
import "./OldModels.css";

const OldModels = () => {
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
  const [items, setItems] = useState([]);
  const [viewItem, setViewItem] = useState(null); // For viewing images in popup

  // ✅ Load items from localStorage (merged with defaults)
  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem("oldItems")) || [];
    const defaultItems = [
      {
        id: 1,
        title: "iPhone 11",
        years: 3,
        condition: 80,
        price: 15000,
        img: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
      },
      {
        id: 2,
        title: "Samsung Galaxy S10",
        years: 4,
        condition: 75,
        price: 12000,
        img: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
      },
      {
        id: 3,
        title: "HP Laptop i5",
        years: 5,
        condition: 70,
        price: 25000,
        img: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
      },
      {
        id: 4,
        title: "Mi Power Bank",
        years: 2,
        condition: 90,
        price: 1500,
        img: "https://cdn-icons-png.flaticon.com/512/1048/1048949.png",
      },
    ];

    const merged = [
      ...defaultItems,
      ...savedItems.map((item, i) => ({
        id: defaultItems.length + i + 1,
        title: item.name,
        years: item.years,
        condition: item.condition,
        price: item.price,
        img: item.frontImg,
        backImg: item.backImg,
        sideImg: item.sideImg,
        email: item.email,
        address: item.address,
        date: item.date,
      })),
    ];
    setItems(merged);
  }, []);

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

  const handlePayment = () => {
    if (cart.length === 0) return alert("Add items to cart before paying!");
    if (!customer.name || !customer.phone || !customer.address)
      return alert("Please fill in your billing details!");
    setPaymentSuccess(true);
    setTimeout(() => setPaymentSuccess(false), 2500);
  };

  const printBill = () => {
    if (cart.length === 0) return alert("No items to print.");
    const printContent = `
      <html>
        <head><title>Bill Receipt</title></head>
        <body style="font-family:Poppins,sans-serif; padding:20px;">
          <h2>♻️ EcoCycle Billing Receipt</h2>
          <p><b>Name:</b> ${customer.name}</p>
          <p><b>Phone:</b> ${customer.phone}</p>
          <p><b>Email:</b> ${customer.email}</p>
          <p><b>Address:</b> ${customer.address}</p>
          <hr>
          <table border="1" cellspacing="0" cellpadding="8" width="100%">
            <tr><th>Item</th><th>Qty</th><th>Price</th><th>Total</th></tr>
            ${cart
              .map(
                (item) =>
                  `<tr><td>${item.title}</td><td>${item.qty}</td><td>₹${item.price}</td><td>₹${
                    item.price * item.qty
                  }</td></tr>`
              )
              .join("")}
          </table>
          <hr>
          <h3>Total Amount: ₹${totalAmount}</h3>
          <p><b>Payment Method:</b> ${payment}</p>
          <p>Thank you for recycling with <b>EcoCycle</b>!</p>
        </body>
      </html>`;
    const newWin = window.open("", "_blank");
    newWin.document.write(printContent);
    newWin.document.close();
    newWin.print();
  };

  return (
    <div className="oldmodels-container">
      {/* ✅ Header */}
      <header className="oldmodels-header">
        <h1>♻️ Buy / Recycle Old Electronics</h1>
        <div className="header-buttons">
          <button className="cart-toggle-btn" onClick={() => setShowCart(!showCart)}>
            🛒 Cart ({cart.length})
          </button>
          <button className="add-item-btn" onClick={() => (window.location.href = "/add-item")}>
             Add New Item
          </button>
        </div>
      </header>

      {/* ✅ Product List */}
      <div className="main-layout">
        <div className="oldmodels-section">
          <h2>Available Old Models</h2>
          <div className="oldmodels-grid">
            {items.map((item) => (
              <div key={item.id} className="oldmodels-card">
                <img src={item.img} alt={item.title} className="main-img" />
                <h3>{item.title}</h3>
                <p>Used: {item.years} Years</p>
                <p>Condition: {item.condition}%</p>

                <p className="price">₹{item.price}</p>


                <div className="oldmodels-btns">
                  <button onClick={() => addToCart(item)} className="add-cart-btn">
                    Add to Cart
                  </button>
                  {item.frontImg || item.backImg || item.sideImg ? (
                    <button className="view-btn" onClick={() => setViewItem(item)}>
                      View Images
                    </button>
                  ) : null}
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
                    <img src={item.img} alt={item.title} />
                    <div>
                      <h4>{item.title}</h4>
                      <p>₹{item.price} × {item.qty}</p>
                      <div className="qty-controls">
                        <button onClick={() => updateQty(item.id, item.qty - 1)}>-</button>
                        <span>{item.qty}</span>
                        <button onClick={() => updateQty(item.id, item.qty + 1)}>+</button>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="remove-btn">Remove</button>
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
            <h2>{viewItem.title} - Images</h2>
            <div className="image-gallery">
              {viewItem.img && <img src={viewItem.img} alt="Front" />}
              {viewItem.backImg && <img src={viewItem.backImg} alt="Back" />}
              {viewItem.sideImg && <img src={viewItem.sideImg} alt="Side" />}
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

export default OldModels;
