import React, { useState } from "react";
import AuthPage from "../Authpage";
import "./VeltrixNavbar.css";

const VeltrixNavbar = () => {
  const [searchValue, setSearchValue] = useState("");
  const [locationMenu, setLocationMenu] = useState(false);
  const [authpage, setAuthpage] = useState(false);
  const [area, setArea] = useState("India");

  const locations = [
    "India",
    "United States",
    "United Kingdom",
    "Canada",
    "Australia",
  ];

  const handleLocationSelect = (location) => {
    setLocationMenu(false);
    setArea(location);
  };

  const handleSellClick = () => {
    console.log("Sell clicked");
  };

  const handleWishlistClick = () => {
    console.log("Wishlist clicked");
  };

  const handleLoginClick = () => {
    console.log("Login clicked");
    setAuthpage(true);
  };

  const handleCloseAuth = () => {
    setAuthpage(false);
  };

  const handleAuthPageClick = (e) => {
    e.stopPropagation();
  };

  return (
    <>
      <nav className="veltrix-navbar">
        <div className="navbar-container">
          {/* Left Section: Logo & Location */}
          <div className="navbar-left">
            <div className="navbar-logo">Veltrix</div>

            <div className="location-selector-wrapper">
              <button
                className="location-selector-btn"
                onClick={() => setLocationMenu(!locationMenu)}
              >
                <span className="location-icon">📍</span>
                <span className="location-text">{area}</span>
                <span className="location-chevron">›</span>
              </button>

              {locationMenu && (
                <div className="location-dropdown">
                  {locations.map((location) => (
                    <button
                      key={location}
                      className="location-option"
                      onClick={() => handleLocationSelect(location)}
                    >
                      {location}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Center Section: Search Bar */}
          <div className="navbar-center">
            <div className="search-wrapper">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                className="search-input"
                placeholder="Search 'Jobs'"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
              />
            </div>
          </div>

          {/* Right Section: Actions */}
          <div className="navbar-right">
            {/* Wishlist */}
            <button
              className="navbar-action-btn wishlist-btn"
              onClick={handleWishlistClick}
              title="Wishlist"
            >
              <span className="action-icon">❤️</span>
              <span className="action-text">Wishlist</span>
            </button>

            {/* Login */}
            <button
              className="navbar-action-btn login-btn"
              onClick={handleLoginClick}
              title="Login"
            >
              <span className="action-icon">👤</span>
              <span className="action-text">Login</span>
            </button>

            {/* Sell Button */}
            <button
              className="navbar-action-btn sell-btn"
              onClick={handleSellClick}
              title="Sell"
            >
              <span className="sell-icon">+</span>
              <span className="sell-text">SELL</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Auth Modal - Outside navbar */}
      {authpage && (
        <div className="auth-modal-overlay" onClick={handleCloseAuth}>
          <div className="auth-modal-container" onClick={handleAuthPageClick}>
            {/* Close Button */}
            <button
              className="auth-modal-close"
              onClick={handleCloseAuth}
              title="Close"
            >
              ✕
            </button>
            {/* AuthPage Component */}
            <AuthPage />
          </div>
        </div>
      )}
    </>
  );
};

export default VeltrixNavbar;
