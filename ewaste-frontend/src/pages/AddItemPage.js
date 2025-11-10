import React, { useState } from "react";
import "./AddItemPage.css";

const AddItemPage = () => {
  const [item, setItem] = useState({
    name: "",
    condition: "",
    years: "",
    price: "",
    email: "",
    address: "",
    date: "",
    frontImg: "",
    backImg: "",
    sideImg: "",
  });

  // Convert uploaded image file to Base64
  const handleImageUpload = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setItem({ ...item, [field]: reader.result }); // save base64 string
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const existingItems = JSON.parse(localStorage.getItem("oldItems")) || [];
    localStorage.setItem("oldItems", JSON.stringify([...existingItems, item]));
    alert("✅ Item added successfully!");
    window.location.href = "/oldmodels";
  };

  return (
    <div className="add-item-container">
      <h1>Add Old Electronic Item</h1>
      <form className="add-item-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Item / Phone Name"
          value={item.name}
          onChange={(e) => setItem({ ...item, name: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Condition (%)"
          value={item.condition}
          onChange={(e) => setItem({ ...item, condition: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Used Years"
          value={item.years}
          onChange={(e) => setItem({ ...item, years: e.target.value })}
          required
        />
        <input
          type="number"
          placeholder="Estimated Price (₹)"
          value={item.price}
          onChange={(e) => setItem({ ...item, price: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={item.email}
          onChange={(e) => setItem({ ...item, email: e.target.value })}
          required
        />
        <textarea
          placeholder="Address"
          value={item.address}
          onChange={(e) => setItem({ ...item, address: e.target.value })}
          required
        ></textarea>

        <label>Date & Time:</label>
        <input
          type="datetime-local"
          value={item.date}
          onChange={(e) => setItem({ ...item, date: e.target.value })}
        />

        {/* Image Upload Section */}
        <div className="image-upload-section">
          <label>📷 Front Image:</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"  // opens camera on mobile
            onChange={(e) => handleImageUpload(e, "frontImg")}
            required
          />
          {item.frontImg && <img src={item.frontImg} alt="Front" className="preview-img" />}

          <label>📷 Back Image:</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => handleImageUpload(e, "backImg")}
            required
          />
          {item.backImg && <img src={item.backImg} alt="Back" className="preview-img" />}

          <label>📷 Side Image (Optional):</label>
          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={(e) => handleImageUpload(e, "sideImg")}
          />
          {item.sideImg && <img src={item.sideImg} alt="Side" className="preview-img" />}
        </div>

        <button type="submit" className="submit-btn">
          ✅ Submit Item
        </button>
      </form>
    </div>
  );
};

export default AddItemPage;
