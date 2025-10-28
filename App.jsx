import React from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CheckoutForm from "./components/CheckoutForm";
import "./App.css";

export default function App() {
  return (
    <div className="app-container">
      <header className="header">
  <h1 className="glow-title">✨ Click & Cart 🛒</h1>
  <p className="tagline">🛍️⚡ Shop Today. Glow Tomorrow ⚡</p>
</header>

      <ProductList />
      <Cart />
      <CheckoutForm />
    </div>
  );
}

