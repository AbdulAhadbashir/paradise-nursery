import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';

function CartItem({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [checkoutMessage, setCheckoutMessage] = useState('');

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const itemTotal = (item) => item.cost * item.quantity;
  const totalAmount = cartItems.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      // Going below 1 removes the plant from the cart
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  return (
    <div className="page">
      {/* Navbar: Home / Plants / Cart */}
      <nav className="navbar">
        <button className="nav-brand" onClick={() => onNavigate('home')}>
          Paradise Nursery
        </button>
        <div className="nav-links">
          <button className="nav-link" onClick={() => onNavigate('home')}>Home</button>
          <button className="nav-link" onClick={() => onNavigate('plants')}>Plants</button>
          <button
            className="nav-link cart-link active"
            onClick={() => onNavigate('cart')}
            aria-label={`Cart, ${totalQuantity} items`}
          >
            <svg width="30" height="30" viewBox="0 0 256 256" aria-hidden="true">
              <circle cx="80" cy="216" r="12" fill="currentColor" />
              <circle cx="184" cy="216" r="12" fill="currentColor" />
              <path
                d="M42.3 72H221.7l-26.4 92.4A16 16 0 0 1 179.9 176H84.1a16 16 0 0 1-15.4-11.6L32.5 37.8A8 8 0 0 0 24.8 32H8"
                fill="none"
                stroke="currentColor"
                strokeWidth="16"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span className="cart-count">{totalQuantity}</span>
          </button>
        </div>
      </nav>

      <main className="cart-wrapper">
        <h2 className="cart-title">Your Shopping Cart</h2>

        <div className="cart-summary">
          <p>
            Total plants: <strong className="summary-number">{totalQuantity}</strong>
          </p>
          <p>
            Total cost: <strong className="summary-number">${totalAmount}</strong>
          </p>
        </div>

        {cartItems.length === 0 ? (
          <p className="cart-empty">Your cart is empty. Pick a few plants to get started.</p>
        ) : (
          <div className="cart-list">
            {cartItems.map((item) => (
              <div className="cart-item" key={item.name}>
                <img className="cart-item-image" src={item.image} alt={item.name} />
                <div className="cart-item-details">
                  <h3 className="cart-item-name">{item.name}</h3>
                  <p className="cart-item-cost">Unit price: ${item.cost}</p>
                  <div className="cart-item-quantity">
                    <button
                      className="qty-button"
                      onClick={() => handleDecrement(item)}
                      aria-label={`Decrease quantity of ${item.name}`}
                    >
                      &minus;
                    </button>
                    <span className="qty-value">{item.quantity}</span>
                    <button
                      className="qty-button"
                      onClick={() => handleIncrement(item)}
                      aria-label={`Increase quantity of ${item.name}`}
                    >
                      +
                    </button>
                  </div>
                  <p className="cart-item-total">Subtotal: ${itemTotal(item)}</p>
                </div>
                <button className="delete-button" onClick={() => handleRemove(item)}>
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}

        {checkoutMessage && <p className="checkout-message">{checkoutMessage}</p>}

        <div className="cart-actions">
          <button className="continue-button" onClick={() => onNavigate('plants')}>
            Continue Shopping
          </button>
          <button
            className="checkout-button"
            onClick={() => setCheckoutMessage('Checkout is Coming Soon!')}
          >
            Checkout
          </button>
        </div>
      </main>
    </div>
  );
}

export default CartItem;
