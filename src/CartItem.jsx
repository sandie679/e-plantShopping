import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice.jsx';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const itemTotal = (item) => item.cost * item.quantity;
  const cartTotal = cartItems.reduce((sum, item) => sum + itemTotal(item), 0);

  const handleIncrement = (item) =>
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleCheckout = () => alert('Coming Soon');

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div className="cart-item" key={item.name}>
          <img src={item.image} alt={item.name} />
          <div className="cart-item-details">
            <h3>{item.name}</h3>
            <p>Unit price: ${item.cost}</p>
            <div className="quantity-controls">
              <button onClick={() => handleDecrement(item)}>−</button>
              <span>{item.quantity}</span>
              <button onClick={() => handleIncrement(item)}>+</button>
            </div>
            <p><strong>Subtotal: ${itemTotal(item)}</strong></p>
          </div>
          <button className="delete-button" onClick={() => dispatch(removeItem(item.name))}>
            Delete
          </button>
        </div>
      ))}

      <p className="cart-total">Total Cart Amount: ${cartTotal}</p>

      <div className="cart-buttons">
        <button className="continue-button" onClick={onContinueShopping}>
          Continue Shopping
        </button>
        <button className="checkout-button" onClick={handleCheckout}>
          Checkout
        </button>
      </div>
    </div>
  );
}

export default CartItem;