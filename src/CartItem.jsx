import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  const calculateTotalAmount = () => {
    return cart
      .reduce((total, item) => {
        const cost = parseFloat(item.cost.replace("$", ""));
        return total + cost * item.quantity;
      }, 0)
      .toFixed(2);
  };

  const handleContinueShopping = (e) => {
    e.preventDefault();
    onContinueShopping();
  };

  const handleCheckoutShopping = (e) => {
    alert("Functionality to be added for future reference");
  };

  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        name: item.name,
        quantity: item.quantity + 1,
      })
    );
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          name: item.name,
          quantity: item.quantity - 1,
        })
      );
    } else {
      handleRemove(item.name);
    }
  };

  const handleRemove = (itemName) => {
    dispatch(removeItem(itemName));
  };

  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    const cost = parseFloat(item.cost.replace("$", ""));
    return (cost * item.quantity).toFixed(2);
  };

  // Calculate total number of items in the cart
  const calculateTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>
        Shopping Cart ({calculateTotalItems()} items)
      </h2>
      <h3 style={{ color: "black" }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h3>
      <div>
        {cart.length > 0 ? (
          cart.map((item) => (
            <div className="cart-item" key={item.name}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />
              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>
                <div className="cart-item-cost">{item.cost} per unit</div>
                <div className="cart-item-quantity">
                  <button
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                  >
                    -
                  </button>
                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>
                  <button
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                  >
                    +
                  </button>
                </div>
                <div className="cart-item-total">
                  Subtotal: ${calculateTotalCost(item)}
                </div>
                <button
                  className="cart-item-delete"
                  onClick={() => handleRemove(item.name)}
                >
                  Remove
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="empty-cart">
            <p>Your cart is empty</p>
            <p>Add some plants to your cart to see them here!</p>
          </div>
        )}
      </div>
      {cart.length > 0 && (
        <div
          style={{ marginTop: "20px", color: "black" }}
          className="total_cart_amount"
        >
          <h3>Order Summary</h3>
          <div className="order-summary">
            <div className="summary-row">
              <span>Items ({calculateTotalItems()}):</span>
              <span>${calculateTotalAmount()}</span>
            </div>
            <div className="summary-row total">
              <span>Order Total:</span>
              <span>${calculateTotalAmount()}</span>
            </div>
          </div>
        </div>
      )}
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={handleContinueShopping}>
          Continue Shopping
        </button>
        <br />
        {cart.length > 0 && (
          <button
            className="get-started-button1"
            onClick={handleCheckoutShopping}
          >
            Checkout
          </button>
        )}
      </div>
    </div>
  );
};

export default CartItem;
