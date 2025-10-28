import React from "react";
import { useCartStore } from "../store/cartStore";
import "./Cart.css";

export default function Cart() {
  const { items, updateQuantity, removeFromCart, totalPrice } = useCartStore();

  return (
    <div className="cart-section">
      <h2>🛍️ Your Cart</h2>
      {items.length === 0 ? (
        <p style={{ textAlign: "center", color: "#555" }}>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <div key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-img" />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>₹{item.price.toLocaleString()}</p>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, Number(e.target.value))
                  }
                />
                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item.id)}
                >
                  ❌ Remove
                </button>
              </div>
            </div>
          ))}
          <h3 className="total-price">Total: ₹{totalPrice().toLocaleString()}</h3>
        </>
      )}
    </div>
  );
}

