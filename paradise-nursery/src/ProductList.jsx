import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';

const img = (slug) => `${import.meta.env.BASE_URL}images/${slug}.svg`;
const plant = (name, slug, cost, description) => ({ name, image: img(slug), cost, description });

// 3 categories x 6 plants = 18 plants
const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      plant('Snake Plant', 'snake-plant', 15, 'Upright leaves, nearly impossible to kill.'),
      plant('Spider Plant', 'spider-plant', 12, 'Arching stripes and cheerful baby plants.'),
      plant('Peace Lily', 'peace-lily', 18, 'Glossy leaves and white blooms.'),
      plant('Boston Fern', 'boston-fern', 20, 'Soft, feathery fronds for humid rooms.'),
      plant('Rubber Plant', 'rubber-plant', 24, 'Big, deep green leaves with a bold look.'),
      plant('Areca Palm', 'areca-palm', 29, 'A tropical feel for bright corners.'),
    ],
  },
  {
    category: 'Aromatic Plants',
    plants: [
      plant('Lavender', 'lavender', 14, 'Calming purple spikes and a classic scent.'),
      plant('Rosemary', 'rosemary', 12, 'Fragrant needles, great for cooking.'),
      plant('Mint', 'mint', 9, 'Fresh, fast-growing leaves for tea.'),
      plant('Jasmine', 'jasmine', 22, 'Sweet-smelling climber with star flowers.'),
      plant('Lemon Balm', 'lemon-balm', 11, 'Bright lemony leaves, easy to grow.'),
      plant('Eucalyptus', 'eucalyptus', 19, 'Silvery foliage with a crisp aroma.'),
    ],
  },
  {
    category: 'Low Light & Succulents',
    plants: [
      plant('ZZ Plant', 'zz-plant', 26, 'Shiny stems that thrive on neglect.'),
      plant('Pothos', 'pothos', 10, 'Trailing vines that handle dim light.'),
      plant('Aloe Vera', 'aloe-vera', 13, 'Plump leaves with a soothing gel.'),
      plant('Jade Plant', 'jade-plant', 16, 'Tiny tree shape with thick, round leaves.'),
      plant('Haworthia', 'haworthia', 11, 'Compact striped rosette for desks.'),
      plant('Cast Iron Plant', 'cast-iron-plant', 28, 'Tough, dark leaves for the dimmest rooms.'),
    ],
  },
];

function ProductList({ onNavigate }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const isInCart = (name) => cartItems.some((item) => item.name === name);

  const handleAddToCart = (p) => {
    dispatch(addItem({ name: p.name, image: p.image, cost: p.cost }));
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
          <button className="nav-link active" onClick={() => onNavigate('plants')}>Plants</button>
          <button
            className="nav-link cart-link"
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

      <main className="product-grid-wrapper">
        {plantsArray.map((group) => (
          <section key={group.category} className="category">
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((p) => {
                const added = isInCart(p.name);
                return (
                  <div className="product-card" key={p.name}>
                    <img className="product-image" src={p.image} alt={p.name} />
                    <h3 className="product-title">{p.name}</h3>
                    <p className="product-description">{p.description}</p>
                    <p className="product-price">${p.cost}</p>
                    <button
                      className="product-button"
                      onClick={() => handleAddToCart(p)}
                      disabled={added}
                    >
                      {added ? 'Added to Cart' : 'Add to Cart'}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>
    </div>
  );
}

export default ProductList;
