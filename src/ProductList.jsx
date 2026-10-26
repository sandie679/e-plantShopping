import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice.jsx';
import CartItem from './CartItem.jsx';

// Replace each image with a real plant photo, e.g. '/images/snake-plant.jpg'
const img = (seed) => `https://picsum.photos/seed/${seed}/400/300`;

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: img('snake-plant'), cost: 15, description: 'Produces oxygen at night and filters indoor toxins.' },
      { name: 'Spider Plant', image: img('spider-plant'), cost: 12, description: 'Easy to grow and removes common household pollutants.' },
      { name: 'Peace Lily', image: img('peace-lily'), cost: 18, description: 'Elegant white blooms that purify the air.' },
      { name: 'Boston Fern', image: img('boston-fern'), cost: 20, description: 'Lush fronds that add humidity and remove toxins.' },
      { name: 'Rubber Plant', image: img('rubber-plant'), cost: 17, description: 'Glossy leaves that absorb airborne chemicals.' },
      { name: 'Areca Palm', image: img('areca-palm'), cost: 22, description: 'A natural humidifier with feathery, tropical fronds.' },
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      { name: 'Lavender', image: img('lavender'), cost: 14, description: 'Calming fragrance that promotes relaxation and sleep.' },
      { name: 'Jasmine', image: img('jasmine'), cost: 16, description: 'Sweet-smelling flowers that lift your mood.' },
      { name: 'Rosemary', image: img('rosemary'), cost: 10, description: 'Fragrant herb used in cooking and aromatherapy.' },
      { name: 'Mint', image: img('mint'), cost: 8, description: 'Refreshing scent, great for teas and cocktails.' },
      { name: 'Lemon Balm', image: img('lemon-balm'), cost: 11, description: 'Lemon-scented leaves that ease stress.' },
      { name: 'Basil', image: img('basil'), cost: 9, description: 'Aromatic kitchen herb with a fresh, sweet scent.' },
    ],
  },
  {
    category: 'Succulents & Cacti',
    plants: [
      { name: 'Aloe Vera', image: img('aloe-vera'), cost: 13, description: 'Soothing gel for skin, and very low maintenance.' },
      { name: 'Jade Plant', image: img('jade-plant'), cost: 15, description: 'A symbol of good luck with thick, glossy leaves.' },
      { name: 'Echeveria', image: img('echeveria'), cost: 9, description: 'Rosette-shaped succulent in soft pastel colours.' },
      { name: 'Barrel Cactus', image: img('barrel-cactus'), cost: 19, description: 'Round, sun-loving cactus that needs little water.' },
      { name: 'Zebra Haworthia', image: img('haworthia'), cost: 10, description: 'Striped leaves; thrives in low light.' },
      { name: "Burro's Tail", image: img('burros-tail'), cost: 14, description: 'Trailing stems, perfect for hanging pots.' },
    ],
  },
];

function ProductList({ onHomeClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [showCart, setShowCart] = useState(false);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  return (
    <div>
      <nav className="navbar">
        <strong>🌿 Paradise Nursery</strong>
        <div>
          <a onClick={onHomeClick}>Home</a>
          <a onClick={() => setShowCart(false)}>Plants</a>
          <a className="cart-link" onClick={() => setShowCart(true)}>
            🛒 Cart <span className="cart-count">{totalQuantity}</span>
          </a>
        </div>
      </nav>

      {showCart ? (
        <CartItem onContinueShopping={() => setShowCart(false)} />
      ) : (
        <div className="product-page">
          {plantsArray.map((group) => (
            <section className="category" key={group.category}>
              <h2>{group.category}</h2>
              <div className="product-grid">
                {group.plants.map((plant) => (
                  <div className="product-card" key={plant.name}>
                    <img src={plant.image} alt={plant.name} />
                    <h3>{plant.name}</h3>
                    <p className="product-description">{plant.description}</p>
                    <p className="product-price">${plant.cost}</p>
                    <button
                      className="add-to-cart-button"
                      disabled={isInCart(plant.name)}
                      onClick={() => dispatch(addItem(plant))}
                    >
                      {isInCart(plant.name) ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  );
}

export default ProductList;