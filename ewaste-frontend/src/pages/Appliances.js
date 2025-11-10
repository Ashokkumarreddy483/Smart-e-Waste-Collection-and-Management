import React from "react";
import "./CategoryPage.css";

const Appliances = () => {
  return (
    <div className="category-page">
      <h1>Home Appliances</h1>
      <p>Recycle your home appliances and contribute to sustainability.</p>

      <div className="product-grid">
        {[1, 2, 3].map((n) => (
          <div key={n} className="product-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/2972/2972207.png"
              alt="Appliance"
            />
            <h3>Appliance Item {n}</h3>
            <p>Condition: Working | Weight: 8kg</p>
            <button className="btn-add-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appliances;
