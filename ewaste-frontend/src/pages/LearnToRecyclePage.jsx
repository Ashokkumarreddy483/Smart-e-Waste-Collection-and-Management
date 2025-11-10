import React from "react";
import "./LearnToRecyclePage.css";
import { FaRecycle, FaLeaf, FaTrashAlt, FaWater, FaGlobe } from "react-icons/fa";

const LearnToRecyclePage = () => {
  return (
    <div className="recycle-container">
      <header className="recycle-header">
        <h1>♻️ Learn to Recycle</h1>
        <p>Small steps lead to a greener tomorrow. Start your recycling journey today!</p>
      </header>

      <section className="recycle-tips">
        <div className="recycle-card">
          <FaRecycle className="icon" />
          <h3>Sort Your Waste</h3>
          <p>Separate plastics, metals, paper, and e-waste to make recycling easier and more efficient.</p>
        </div>

        <div className="recycle-card">
          <FaTrashAlt className="icon" />
          <h3>Dispose E-Waste Properly</h3>
          <p>Old electronics contain harmful materials. Always hand them over to certified e-waste recyclers like EcoCycle.</p>
        </div>

        <div className="recycle-card">
          <FaLeaf className="icon" />
          <h3>Reduce Before You Recycle</h3>
          <p>Think before you buy. Choose reusable products to minimize waste creation.</p>
        </div>

        <div className="recycle-card">
          <FaWater className="icon" />
          <h3>Save Natural Resources</h3>
          <p>Recycling reduces the need for new raw materials, saving energy and preserving ecosystems.</p>
        </div>

        <div className="recycle-card">
          <FaGlobe className="icon" />
          <h3>Be a Global Citizen</h3>
          <p>Join local recycling drives and encourage others to live sustainably.</p>
        </div>
      </section>

      <section className="cta-section">
        <h2>Start Recycling with EcoCycle Today!</h2>
        <p>Schedule a pickup for your e-waste and be part of a sustainable future.</p>
        <a href="/schedule-pickup" className="cta-button">
          Schedule Pickup →
        </a>
      </section>
    </div>
  );
};

export default LearnToRecyclePage;
