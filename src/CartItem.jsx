import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateQuantity } from "./CartSlice";
import "./CartItem.css";
import PropTypes from "prop-types";

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Pre-calculate totals once per render
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalAmount = cart
    .reduce((total, item) => {
      const cost = parseFloat(item.cost.replace("$", ""));
      return total + cost * item.quantity;
    }, 0)
    .toFixed(2);

  const handleContinueShopping = () => {
    onContinueShopping();
  };

  const handleCheckoutShopping = () => {
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
  const calculateItemCost = (item) => {
    const cost = parseFloat(item.cost.replace("$", ""));
    return (cost * item.quantity).toFixed(2);
  };

  // Render cart items
  const renderCartItems = () => {
    if (cart.length === 0) {
      return (
        <div className="empty-cart">
          <p>Your cart is empty</p>
          <p>Add some plants to your cart to see them here!</p>
        </div>
      );
    }

    return cart.map((item) => (
      <div className="cart-item" key={item.name}>
        <img className="cart-item-image" src={item.image} alt={item.name} />
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
            <span className="cart-item-quantity-value">{item.quantity}</span>
            <button
              className="cart-item-button cart-item-button-inc"
              onClick={() => handleIncrement(item)}
            >
              +
            </button>
          </div>
          <div className="cart-item-total">
            Subtotal: ${calculateItemCost(item)}
          </div>
          <button
            className="cart-item-delete"
            onClick={() => handleRemove(item.name)}
          >
            Remove
          </button>
        </div>
      </div>
    ));
  };

  // Render order summary
  const renderOrderSummary = () => {
    if (cart.length === 0) return null;

    return (
      <div
        style={{ marginTop: "20px", color: "black" }}
        className="total_cart_amount"
      >
        <h3>Order Summary</h3>
        <div className="order-summary">
          <div className="summary-row">
            <span>Items ({totalItems}):</span>
            <span>${totalAmount}</span>
          </div>
          <div className="summary-row total">
            <span>Order Total:</span>
            <span>${totalAmount}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: "black" }}>Shopping Cart ({totalItems} items)</h2>
      <h3 style={{ color: "black" }}>Total Cart Amount: ${totalAmount}</h3>
      <div>{renderCartItems()}</div>
      {renderOrderSummary()}
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

CartItem.propTypes = {
  onContinueShopping: PropTypes.func.isRequired,
};

export default CartItem;
