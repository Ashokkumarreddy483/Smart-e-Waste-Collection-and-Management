import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";
import {
  FaRecycle,
  FaTrashAlt,
  FaTruck,
  FaClock,
  FaUserCircle,
  FaSearch,
  FaShoppingCart,
} from "react-icons/fa";

const HomePage = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="amazon-style-container">

      {/* 🖼 Hero Banner */}
      <section className="hero-banner">
        <div className="hero-overlay">
          <h1>Recycle Responsibly, Earn Rewards 🌱</h1>
          <p>
            Exchange your old electronics for rewards and help build a cleaner planet.
          </p>
          <button className="hero-btn" onClick={() => navigate("/schedule-pickup")}>
            Schedule Pickup
          </button>
        </div>
      </section>

      {/* 🛒 Category Section */}
      <section className="category-section">
        <h2>Explore Recycling Categories</h2>
        <div className="category-grid">
          <div className="category-card" onClick={() => navigate("/request-tracking")}>
            <FaClock className="category-icon" />
            <h3>Track Your Requests</h3>
            <p>Check the real-time status of your e-waste recycling journey.</p>
          </div>

           <div className="category-card" onClick={() => navigate("/schedule-pickup")}>
                      <FaTrashAlt className="category-icon" />
                      <h3>Submit New Request</h3>
                      <p>Recycle your old electronics safely and responsibly.</p>
                    </div>

          <div className="category-card" onClick={() => navigate("/pickup-orders")}>
            <FaTruck className="category-icon" />
            <h3>Pickup a delivery</h3>
            <p>Book a convenient pickup time for your old gadgets.</p>
          </div>

          <div className="category-card" onClick={() => navigate("/learn-recycle")}>
            <FaRecycle className="category-icon" />
            <h3>Learn to Recycle</h3>
            <p>Discover best recycling practices to save the environment.</p>
          </div>
        </div>
      </section>

    {/* 🌍 Featured Products (like Amazon items) */}
    <section className="product-section">
      <h2>Popular Recyclable Items</h2>
      <div className="product-grid">
        {[
          {
            title: "Old Mobile Phones",
            img: "https://cdn-icons-png.flaticon.com/512/992/992700.png",
            desc: "Recycle your unused phones safely.",
            path: "/oldmobiles",
          },
          {
            title: "Laptops & PCs",
            img: "https://cdn-icons-png.flaticon.com/512/888/888879.png",
            desc: "Turn your old computers into green rewards.",
            path: "/laptops",
          },
          {
            title: "Batteries & Chargers",
            img: "https://cdn-icons-png.flaticon.com/512/1048/1048949.png",
            desc: "Dispose batteries responsibly.",
            path: "/batteries",
          },
          {
            title: "Home Appliances",
            img: "https://cdn-icons-png.flaticon.com/512/2972/2972207.png",
            desc: "We collect old appliances for recycling.",
            path: "/appliances",
          },
        ].map((item, index) => (
          <div key={index} className="product-card">
            <img src={item.img} alt={item.title} />
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
            <button
              className="btn-recycle"
              onClick={() => navigate(item.path)}
            >
              Explore
            </button>
          </div>
        ))}
      </div>
    </section>



      {/* 🛠 Info Section */}
      <section className="info-banner">
        <h2>Why Choose EcoCycle?</h2>
        <div className="info-grid">
          <div className="info-card">
            <h3>♻️ 100% Eco-Friendly</h3>
            <p>We ensure safe and sustainable recycling methods.</p>
          </div>
          <div className="info-card">
            <h3>🚚 Doorstep Pickup</h3>
            <p>Convenient pickup at your preferred time and place.</p>
          </div>
          <div className="info-card">
            <h3>💰 Reward Points</h3>
            <p>Earn eco-points for every successful recycling request.</p>
          </div>
        </div>
      </section>

     {/* 🌱 Footer */}
     <footer className="footer">
       <div className="footer-top">
         <div className="footer-column">
           <h3>Get to Know Us</h3>
           <ul>
             <li><a href="#about">About EcoCycle</a></li>
             <li><a href="#mission">Our Mission</a></li>
             <li><a href="#careers">Careers</a></li>
             <li><a href="#blog">Eco Blog</a></li>
           </ul>
         </div>

         <div className="footer-column">
           <h3>Customer Service</h3>
           <ul>
             <li><a href="#help">Help & FAQs</a></li>
             <li><a href="#returns">Returns</a></li>
             <li><a href="#support">Contact Support</a></li>
             <li><a href="#privacy">Privacy Policy</a></li>
           </ul>
         </div>

         <div className="footer-column">
           <h3>Payment Options</h3>
           <div className="payment-icons">
             <img src="https://cdn-icons-png.flaticon.com/512/196/196578.png" alt="Visa" />
             <img src="https://cdn-icons-png.flaticon.com/512/196/196561.png" alt="MasterCard" />
             <img src="https://cdn-icons-png.flaticon.com/512/196/196566.png" alt="PayPal" />
             <img src="https://cdn-icons-png.flaticon.com/512/196/196573.png" alt="Google Pay" />
             <img src="https://cdn-icons-png.flaticon.com/512/196/196579.png" alt="Apple Pay" />
           </div>
         </div>

         <div className="footer-column">
           <h3>Our Location</h3>
           <p>EcoCycle HQ<br />123 Green Street,<br />Hyderabad, India 400001</p>
           <div className="map-container">
             <iframe
               title="EcoCycle Hyderabad Map"
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3806.406871865308!2d78.47466237512387!3d17.385044083511582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bcb99c580e2f8f5%3A0x9b3b8d56cbb23c8f!2sHyderabad%2C%20Telangana!5e0!3m2!1sen!2sin!4v1730278521000!5m2!1sen!2sin"
               width="100%"
               height="150"
               style={{ border: 0 }}
               allowFullScreen=""
               loading="lazy"
             ></iframe>
           </div>

         </div>
       </div>

       <div className="footer-bottom">
         <p>© 2025 EcoCycle | Building a Greener Tomorrow 🌿</p>
         <p>
           <a href="#home">Home</a> | <a href="#track">Track</a> | <a href="#pickup">Pickup</a> |{" "}
           <a href="#submit">Submit</a> | <a href="#recycle">Recycle</a>
         </p>
       </div>
     </footer>

    </div>
  );
};

export default HomePage;
