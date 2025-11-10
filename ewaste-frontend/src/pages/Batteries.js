import React from "react";
import "./CategoryPage.css";

const Batteries = () => {
  return (
    <div className="category-page">
      <h1>Batteries & Chargers</h1>
      <p>Dispose of batteries and chargers safely to prevent pollution.</p>

      <div className="product-grid">
        {[1, 2, 3].map((n) => (
          <div key={n} className="product-card">
            <img
              src="https://cdn-icons-png.flaticon.com/512/1048/1048949.png"
              alt="Battery"
            />
            <h3>Battery Pack {n}</h3>
            <p>Type: Li-ion | Capacity: 3000mAh</p>
            <button className="btn-add-cart">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Batteries;
