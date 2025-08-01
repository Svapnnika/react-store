import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Types of Ceramics */}
        <div className="footer-section">
          <h3>Types of Ceramics</h3>
          <ul>
            <li><Link to="/ceramics/porcelain">Porcelain</Link></li>
            <li><Link to="/ceramics/stoneware">Stoneware</Link></li>
            <li><Link to="/ceramics/earthenware">Earthenware</Link></li>
            <li><Link to="/ceramics/bone-china">Bone China</Link></li>
            <li><Link to="/ceramics/terracotta">Terracotta</Link></li>
          </ul>
        </div>

        {/* Website Benefits */}
        <div className="footer-section">
          <h3>Why Choose Us</h3>
          <ul>
            <li>Eco-friendly, handmade products</li>
            <li>Verified carbon offset tracking</li>
            <li>Secure blockchain-based payments</li>
            <li>Supports sustainability goals</li>
            <li>Authentic and curated marketplace</li>
          </ul>
        </div>

        {/* Company Info */}
        <div className="footer-section">
          <h3>Company</h3>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><Link to="/marketplace">Marketplace</Link></li>
            <li><Link to="/privacy">Privacy Policy</Link></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        © 2025 Ceramic Carbon Marketplace. All rights reserved.
      </div>
    </footer>
  );
}
