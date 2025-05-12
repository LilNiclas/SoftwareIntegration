// src/App.jsx
import React from "react";

function App() {
  const handlePayment = () => {
    // Replace this with your actual Stripe payment link
    window.location.href = "https://buy.stripe.com/test_28EdRb4LY3Su6c33yS0RG00";
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Buy Product</h1>
      <button onClick={handlePayment} style={{ padding: "10px 20px" }}>
        Pay Now
      </button>
    </div>
  );
}

export default App;
