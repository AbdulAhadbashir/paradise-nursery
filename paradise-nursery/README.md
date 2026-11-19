# Paradise Nursery

A front-end shopping application for browsing houseplants and managing a shopping cart.
Built with **React**, **Redux Toolkit**, and **Vite**, and deployed with **GitHub Pages**.

**Live app:** https://YOUR-USERNAME.github.io/paradise-nursery/

## Pages

- **Landing page** – background image, company name, a paragraph about the company, and a *Get Started* button.
- **Plants (product listing)** – 18 houseplants in 3 categories (Air Purifying, Aromatic, Low Light & Succulents). Each shows a thumbnail, name, price, and an *Add to Cart* button that disables once the plant is in the cart.
- **Cart** – total plants, total cost, per-plant thumbnail, name, unit price and subtotal, increase / decrease buttons, a delete button, *Continue Shopping*, and *Checkout* ("Coming Soon").

The navbar (Home / Plants / Cart, with a live cart-count icon) appears on the Plants and Cart pages.

## Project structure

```
src/
  App.jsx          Landing page + page switching
  AboutUs.jsx      Company description
  ProductList.jsx  Plant catalog + navbar
  CartItem.jsx     Shopping cart page + navbar
  CartSlice.jsx    Redux slice (addItem, removeItem, updateQuantity)
  store.js         Redux store
  App.css          Styles, including the landing page background image
```

## Run locally

```bash
npm install
npm run dev
```

## Deploy to GitHub Pages

1. Make sure `base` in `vite.config.js` is `/your-repo-name/`.
2. Set `homepage` in `package.json` to your GitHub Pages URL.
3. Run `npm run deploy`.
4. In the repo, open **Settings > Pages** and set the source to the `gh-pages` branch.
