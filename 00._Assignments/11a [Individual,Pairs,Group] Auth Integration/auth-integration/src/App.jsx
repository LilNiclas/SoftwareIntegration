// src/App.jsx
import React from "react";
import { auth, provider } from "./firebase";
import { signInWithPopup } from "firebase/auth";

function App() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      alert(`Welcome, ${result.user.displayName}!`);
    } catch (error) {
      console.error(error);
      alert("Failed to sign in");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Auth Integration</h1>
      <button onClick={handleGoogleLogin}>Sign in with Google</button>
    </div>
  );
}

export default App;
