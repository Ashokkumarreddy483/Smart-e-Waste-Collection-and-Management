import React, { useState } from "react";
import axios from "axios";
import "./SchedulePickupPage.css";

const SchedulePickupPage = () => {
  const [formData, setFormData] = useState({
    userEmail: "",
    deviceType: "",
    brand: "",
    model: "",
    conditionStatus: "",
    quantity: "",
    pickupAddress: "",
    remarks: "",
  });

  const [images, setImages] = useState([]); // For multiple image uploads
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setImages(e.target.files); // FileList object
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg("");
    setErrorMsg("");

    try {
      const formDataToSend = new FormData();

      // Append text fields
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      // Append files
      for (let i = 0; i < images.length; i++) {
        formDataToSend.append("images", images[i]); // matches @RequestParam("images")
      }

      const response = await axios.post(
        "http://localhost:8080/api/pickups",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setSuccessMsg("Pickup request submitted successfully!");
      setFormData({
        userEmail: "",
        deviceType: "",
        brand: "",
        model: "",
        conditionStatus: "",
        quantity: "",
        pickupAddress: "",
        remarks: "",
      });
      setImages([]);
    } catch (error) {
      console.error("Error submitting pickup:", error);
      setErrorMsg("Failed to submit request. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pickup-container">
      <h2>Schedule an E-Waste Pickup</h2>

      <form className="pickup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Device Type</label>
            <input
              type="text"
              name="deviceType"
              value={formData.deviceType}
              onChange={handleChange}
              placeholder="e.g. Laptop, Mobile, TV"
              required
            />
          </div>

          <div className="form-group">
            <label>Brand</label>
            <input
              type="text"
              name="brand"
              value={formData.brand}
              onChange={handleChange}
              placeholder="e.g. Dell"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Model</label>
            <input
              type="text"
              name="model"
              value={formData.model}
              onChange={handleChange}
              placeholder="e.g. Inspiron 15"
            />
          </div>

          <div className="form-group">
            <label>Condition</label>
            <select
              name="conditionStatus"
              value={formData.conditionStatus}
              onChange={handleChange}
              required
            >
              <option value="">-- Select Condition --</option>
              <option value="Working">Working</option>
              <option value="Damaged">Damaged</option>
              <option value="Dead">Dead</option>
            </select>
          </div>
        </div>

        <div className="form-group">
          <label>Quantity</label>
          <input
            type="number"
            name="quantity"
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>

        {/* ✅ File upload input */}
        <div className="form-group">
          <label>Upload Images</label>
          <input
            type="file"
            name="images"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        <div className="form-group">
          <label>Pickup Address</label>
          <textarea
            name="pickupAddress"
            value={formData.pickupAddress}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div className="form-group">
          <label>Additional Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Any special instructions"
          ></textarea>
        </div>

        {loading ? (
          <button className="submit-btn" disabled>
            Submitting...
          </button>
        ) : (
          <button className="submit-btn" type="submit">
            Submit Pickup Request
          </button>
        )}

        {successMsg && <p className="success-msg">{successMsg}</p>}
        {errorMsg && <p className="error-msg">{errorMsg}</p>}
      </form>
    </div>
  );
};

export default SchedulePickupPage;
