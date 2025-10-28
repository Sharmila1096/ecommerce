import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useCartStore } from "../store/cartStore";

const schema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  address: z.string().min(5, "Address is too short"),
});

export default function CheckoutForm() {
  const { items, totalPrice, clearCart } = useCartStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: zodResolver(schema) });

  const onSubmit = (data) => {
    console.log("Checkout data:", data);
    alert(`🎉 Order placed successfully! Total: ₹${totalPrice().toLocaleString()}`);
    clearCart();
  };

  return (
    <div className="checkout-container">
      <h2>Checkout</h2>

      {/* Cart Summary */}
      {items.length > 0 && (
        <div className="cart-summary">
          <h3>🛒 Order Summary</h3>
          {items.map((item) => (
            <div key={item.id} className="cart-summary-item">
              <p>{item.name} x {item.quantity}</p>
              <p>₹{(item.price * item.quantity).toLocaleString()}</p>
            </div>
          ))}
          <div className="cart-summary-item" style={{ fontWeight: 700 }}>
            <p>Total</p>
            <p>₹{totalPrice().toLocaleString()}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>Name: </label>
          <input placeholder="Enter your full name" {...register("name")} />
          {errors.name && <p className="error-msg">{errors.name.message}</p>}
        </div>

        <div>
          <label>Email: </label>
          <input placeholder="Enter your email" {...register("email")} />
          {errors.email && <p className="error-msg">{errors.email.message}</p>}
        </div>

        <div>
          <label>Address: </label>
          <textarea placeholder="Enter your address" {...register("address")} />
          {errors.address && <p className="error-msg">{errors.address.message}</p>}
        </div>

        <button type="submit">Place Order</button>
      </form>
    </div>
  );
}
