import React, { useState,useEffect } from "react";
import "./Products.css";
import { appContext } from "../App";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
export default function Products() {
  const { products } = useContext(appContext);
  const navigate = useNavigate();
   const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    document.body.className = darkMode ? "dark-theme" : "light-theme";
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);
  const handleImageClick = (productId) => {
    navigate(`/product/${productId}`);
  };
  // const addToCart = (id) => {
  //   setCart({ ...cart, [id]: (cart[id] || 0) + 1 });
  // };
  // const increment = (id) => {
  //   setCart({ ...cart, [id]: cart[id] + 1 });
  // };
  // const decrement = (id) => {
  //   if (cart[id] > 1) {
  //     setCart({ ...cart, [id]: cart[id] - 1 });
  //   } else {
  //     setCart({ ...cart, [id]: 0 });
  //   }
  // };
  return (
    <>
     <div style={{ textAlign: "right", margin: "1rem" }}>
        <button
          onClick={() => setDarkMode(!darkMode)}
          style={{
            padding: "8px 12px",
            backgroundColor: darkMode ? "#444" : "#eee",
            color: darkMode ? "#fff" : "#000",
            border: "none",
            borderRadius: "6px",
            cursor: "pointer",
          }}
        >
          {darkMode ? "☀️Light" : "🌙Dark"}
        </button>
      </div>
      <div className="App-Products-Row">
        {products.map((value) => (
          <div key={value._id} className="App-Products-Box">
            <img 
              src={value.imgUrl || value.url || 'https://via.placeholder.com/350x350?text=No+Image'} 
              alt={value.name || 'Product Image'}
              className="product-image clickable-image"
              onClick={() => handleImageClick(value._id)}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/350x350?text=No+Image';
              }}
            />
            <h3>{value.name}</h3>
            <p>{value.desc}</p>
            <h4>${value.price}</h4>
            <button>Shop Now</button>
            {/* {cart[value._id] && cart[value._id] > 0 ? (
              <div>
                <button onClick={() => decrement(value._id)}>-</button>
                {cart[value._id]}
                <button onClick={() => increment(value._id)}>+</button>
              </div>
            ) : (
              <button onClick={() => addToCart(value._id)}>Add to Cart</button>
            )} */}
          </div>
        ))}
      </div>
      ;
    </>
  );
}
