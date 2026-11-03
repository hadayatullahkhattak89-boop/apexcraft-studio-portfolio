/**
 * NovaStore E-Commerce Storefront Engine
 * Production-ready Vanilla JavaScript
 */

// ==========================================
// 1. PRODUCT DATABASE
// ==========================================
const PRODUCTS = [
  {
    id: 1,
    title: "Apex ANC Wireless Pro",
    category: "audio",
    price: 189,
    originalPrice: 249,
    rating: 4.9,
    reviews: 128,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80",
    badge: "Best Seller",
    desc: "Active noise-cancelling over-ear headphones with custom 40mm titanium drivers, 45-hour battery life, and ultra-plush memory foam earcups."
  },
  {
    id: 2,
    title: "Vanguard Smartwatch Ultra",
    category: "gadgets",
    price: 149,
    originalPrice: 199,
    rating: 4.8,
    reviews: 95,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&q=80",
    badge: "25% OFF",
    desc: "Aerospace titanium casing, always-on AMOLED retina display, ECG telemetry, sleep tracking, and 7-day battery endurance."
  },
  {
    id: 3,
    title: "Minimalist Leather Commuter Pack",
    category: "fashion",
    price: 89,
    originalPrice: 120,
    rating: 4.7,
    reviews: 64,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&q=80",
    badge: "Popular",
    desc: "Handcrafted full-grain Italian leather backpack with weatherproof zippers, dedicated 16-inch laptop sleeve, and hidden passport security pocket."
  },
  {
    id: 4,
    title: "Mechanical RGB Wireless Keyboard",
    category: "gadgets",
    price: 119,
    originalPrice: 159,
    rating: 4.9,
    reviews: 210,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600&q=80",
    badge: "Hot Deal",
    desc: "Hot-swappable tactile mechanical switches, CNC aluminum chassis, south-facing RGB per-key backlighting, and Bluetooth 5.2 connectivity."
  },
  {
    id: 5,
    title: "Studio Monitor Desktop Speakers",
    category: "audio",
    price: 229,
    originalPrice: 299,
    rating: 4.8,
    reviews: 88,
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=600&q=80",
    badge: "Audiophile",
    desc: "Nearfield active studio reference monitors with Kevlar low-frequency drivers, silk dome tweeters, and lossless optical inputs."
  },
  {
    id: 6,
    title: "Titanium Polarized Aviators",
    category: "accessories",
    price: 75,
    originalPrice: 95,
    rating: 4.6,
    reviews: 42,
    image: "https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=600&q=80",
    badge: "Summer Pick",
    desc: "Ultra-lightweight memory titanium frames, scratch-resistant polarized TAC lenses offering 100% UVA/UVB protection."
  },
  {
    id: 7,
    title: "Ergonomic Precision Wireless Mouse",
    category: "gadgets",
    price: 69,
    originalPrice: 89,
    rating: 4.7,
    reviews: 112,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=600&q=80",
    badge: "Trending",
    desc: "Natural handshake contour angle, dual-mode hyper-fast scroll wheel, multi-device flow switching, and 8,000 DPI optical sensor."
  },
  {
    id: 8,
    title: "Vacuum Insulated Thermal Flask",
    category: "accessories",
    price: 34,
    originalPrice: 45,
    rating: 4.9,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600&q=80",
    badge: "Eco Gear",
    desc: "Double-wall copper vacuum insulation keeping drinks ice cold for 24 hours or steaming hot for 12 hours. BPA-free stainless steel."
  }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
let cart = [
  { id: 1, qty: 1 } // Default sample item for realistic feel
];
let activeCategory = 'all';
let searchQuery = '';
let currentSort = 'featured';
let discountPercentage = 0; // Set to 0.20 when APEX20 is applied

// Quick View temporary state
let qvActiveProductId = null;
let qvQuantity = 1;

// ==========================================
// 3. CATALOG RENDERING & FILTERING
// ==========================================
function renderProducts() {
  const grid = document.getElementById('products-grid');
  const emptyState = document.getElementById('empty-state');
  if (!grid) return;

  // Filter products
  let filtered = PRODUCTS.filter(p => {
    const matchesCat = activeCategory === 'all' || p.category === activeCategory;
    const query = searchQuery.toLowerCase().trim();
    const matchesSearch = query === '' || 
      p.title.toLowerCase().includes(query) || 
      p.category.toLowerCase().includes(query) ||
      p.desc.toLowerCase().includes(query);
    return matchesCat && matchesSearch;
  });

  // Sort products
  if (currentSort === 'price-low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (currentSort === 'price-high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (currentSort === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  // Display empty or grid
  if (filtered.length === 0) {
    grid.innerHTML = '';
    emptyState.style.display = 'block';
    return;
  } else {
    emptyState.style.display = 'none';
  }

  // Render cards
  grid.innerHTML = filtered.map(product => `
    <article class="product-card" data-product-id="${product.id}">
      ${product.badge ? `<span class="prod-badge">${product.badge}</span>` : ''}
      <div class="prod-img-wrap">
        <img src="${product.image}" alt="${product.title}" class="prod-img" loading="lazy">
        <button type="button" class="btn-quick-view" onclick="openQuickView(${product.id})">
          <i class="fas fa-eye"></i> Quick View
        </button>
      </div>
      <div class="prod-body">
        <span class="prod-cat">${product.category}</span>
        <h3 class="prod-title">${product.title}</h3>
        <div class="prod-rating">
          <i class="fas fa-star"></i>
          <span style="font-weight: 700; color: var(--text-main);">${product.rating}</span>
          <span class="rating-count">(${product.reviews})</span>
        </div>
        <div class="prod-footer">
          <div>
            <span class="prod-price">$${product.price}</span>
            ${product.originalPrice ? `<span class="prod-price-orig">$${product.originalPrice}</span>` : ''}
          </div>
          <button type="button" class="btn-add-cart" onclick="addToCart(${product.id})" aria-label="Add ${product.title} to Cart" title="Add to Cart">
            <i class="fas fa-plus"></i>
          </button>
        </div>
      </div>
    </article>
  `).join('');
}

// ==========================================
// 4. CART SYSTEM (DRAWER & CALCULATIONS)
// ==========================================
function updateCartUI() {
  const badge = document.getElementById('cart-badge-count');
  const drawerCount = document.getElementById('cart-drawer-count');
  const container = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const discountRow = document.getElementById('discount-row');
  const discountEl = document.getElementById('cart-discount');
  const shippingEl = document.getElementById('cart-shipping');
  const grandTotalEl = document.getElementById('cart-grand-total');
  const checkoutTotalEl = document.getElementById('modal-checkout-total');

  const totalItemsCount = cart.reduce((sum, item) => sum + item.qty, 0);

  if (badge) badge.textContent = totalItemsCount;
  if (drawerCount) drawerCount.textContent = `(${totalItemsCount})`;

  // Calculate financials
  let subtotal = 0;
  cart.forEach(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (p) subtotal += p.price * item.qty;
  });

  const discountAmount = subtotal * discountPercentage;
  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const grandTotal = Math.max(0, subtotal - discountAmount + shippingCost);

  if (subtotalEl) subtotalEl.textContent = `$${subtotal.toFixed(2)}`;
  if (shippingEl) shippingEl.textContent = shippingCost === 0 ? 'Free' : `$${shippingCost.toFixed(2)}`;

  if (discountPercentage > 0) {
    if (discountRow) discountRow.style.display = 'flex';
    if (discountEl) discountEl.textContent = `-$${discountAmount.toFixed(2)}`;
  } else {
    if (discountRow) discountRow.style.display = 'none';
  }

  if (grandTotalEl) grandTotalEl.textContent = `$${grandTotal.toFixed(2)}`;
  if (checkoutTotalEl) checkoutTotalEl.textContent = `$${grandTotal.toFixed(2)}`;

  // Render Cart Items
  if (!container) return;

  if (cart.length === 0) {
    container.innerHTML = `
      <div class="cart-empty-message">
        <i class="fas fa-bag-shopping"></i>
        <h4>Your shopping bag is empty</h4>
        <p style="font-size: 0.85rem; margin-top: 0.4rem;">Browse our collection and add your favorite items.</p>
      </div>
    `;
    const footer = document.getElementById('cart-drawer-footer');
    if (footer) footer.style.opacity = '0.5';
    return;
  }

  const footer = document.getElementById('cart-drawer-footer');
  if (footer) footer.style.opacity = '1';

  container.innerHTML = cart.map(item => {
    const p = PRODUCTS.find(prod => prod.id === item.id);
    if (!p) return '';
    return `
      <div class="cart-item">
        <img src="${p.image}" alt="${p.title}" class="cart-item-img">
        <div class="cart-item-details">
          <div style="display: flex; justify-content: space-between; align-items: flex-start;">
            <div class="cart-item-title">${p.title}</div>
            <button type="button" class="item-remove-btn" onclick="removeFromCart(${p.id})" aria-label="Remove item">
              <i class="fas fa-trash-can"></i>
            </button>
          </div>
          <div class="cart-item-price">$${p.price * item.qty} <span style="font-size: 0.72rem; color: var(--text-muted); font-weight: normal;">($${p.price} each)</span></div>
          <div class="cart-item-actions">
            <div class="qty-control">
              <button type="button" class="qty-btn" onclick="changeQty(${p.id}, -1)">-</button>
              <span class="qty-number">${item.qty}</span>
              <button type="button" class="qty-btn" onclick="changeQty(${p.id}, 1)">+</button>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

function addToCart(productId, qty = 1) {
  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.qty += qty;
  } else {
    cart.push({ id: productId, qty: qty });
  }

  updateCartUI();
  const prod = PRODUCTS.find(p => p.id === productId);
  showStoreToast(`Added "${prod ? prod.title : 'Item'}" to bag!`);
}

function quickAddToCart(productId) {
  addToCart(productId, 1);
  openCartDrawer();
}

function changeQty(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) {
    removeFromCart(productId);
  } else {
    updateCartUI();
  }
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
  showStoreToast("Item removed from bag");
}

function openCartDrawer() {
  document.getElementById('cart-drawer')?.classList.add('open');
  document.getElementById('cart-overlay')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCartDrawer() {
  document.getElementById('cart-drawer')?.classList.remove('open');
  document.getElementById('cart-overlay')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ==========================================
// 5. QUICK VIEW MODAL
// ==========================================
function openQuickView(productId) {
  const p = PRODUCTS.find(prod => prod.id === productId);
  if (!p) return;

  qvActiveProductId = p.id;
  qvQuantity = 1;

  document.getElementById('qv-img').src = p.image;
  document.getElementById('qv-cat').textContent = p.category;
  document.getElementById('qv-title').textContent = p.title;
  document.getElementById('qv-desc').textContent = p.desc;
  document.getElementById('qv-price-now').textContent = `$${p.price}`;
  document.getElementById('qv-price-was').textContent = p.originalPrice ? `$${p.originalPrice}` : '';
  document.getElementById('qv-qty-val').textContent = '1';

  // Render Stars
  const starsContainer = document.getElementById('qv-rating');
  starsContainer.innerHTML = `
    <i class="fas fa-star"></i> <strong style="color: var(--text-main);">${p.rating}</strong>
    <span style="color: var(--text-muted); margin-left: 0.3rem;">(${p.reviews} verified reviews)</span>
  `;

  document.getElementById('quick-view-modal')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  document.getElementById('quick-view-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ==========================================
// 6. CHECKOUT SIMULATION
// ==========================================
function openCheckoutModal() {
  if (cart.length === 0) {
    showStoreToast("Your shopping bag is empty! Add products first.", "info");
    return;
  }
  closeCartDrawer();

  // Reset to form step
  document.getElementById('checkout-step-form').style.display = 'block';
  document.getElementById('checkout-step-success').style.display = 'none';

  document.getElementById('checkout-modal')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCheckoutModal() {
  document.getElementById('checkout-modal')?.classList.remove('open');
  document.body.style.overflow = '';
}

// ==========================================
// 7. TOAST NOTIFICATION
// ==========================================
function showStoreToast(message) {
  const toast = document.getElementById('store-toast');
  if (!toast) return;

  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--neon-cyan); margin-right: 0.5rem;"></i> ${message}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ==========================================
// 8. EVENT LISTENERS INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  updateCartUI();

  // Category Tab Clicks
  const catButtons = document.querySelectorAll('.cat-tab');
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeCategory = btn.getAttribute('data-category');
      renderProducts();
    });
  });

  // Search Input Handler
  const searchInput = document.getElementById('product-search');
  const clearBtn = document.getElementById('clear-search');
  const statusBar = document.getElementById('search-status-bar');
  const termDisplay = document.getElementById('search-term-display');

  searchInput?.addEventListener('input', (e) => {
    searchQuery = e.target.value;
    if (searchQuery.trim().length > 0) {
      clearBtn.style.display = 'block';
      statusBar.style.display = 'block';
      termDisplay.textContent = searchQuery;
    } else {
      clearBtn.style.display = 'none';
      statusBar.style.display = 'none';
    }
    renderProducts();
  });

  clearBtn?.addEventListener('click', () => {
    searchInput.value = '';
    searchQuery = '';
    clearBtn.style.display = 'none';
    statusBar.style.display = 'none';
    renderProducts();
  });

  // Reset Filters Button
  document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
    activeCategory = 'all';
    searchQuery = '';
    searchInput.value = '';
    clearBtn.style.display = 'none';
    statusBar.style.display = 'none';
    catButtons.forEach(b => b.classList.remove('active'));
    document.querySelector('.cat-tab[data-category="all"]')?.classList.add('active');
    renderProducts();
  });

  // Sort Dropdown
  document.getElementById('sort-select')?.addEventListener('change', (e) => {
    currentSort = e.target.value;
    renderProducts();
  });

  // Cart Drawer open & close triggers
  document.getElementById('cart-open-btn')?.addEventListener('click', openCartDrawer);
  document.getElementById('cart-close-btn')?.addEventListener('click', closeCartDrawer);
  document.getElementById('cart-overlay')?.addEventListener('click', closeCartDrawer);

  // Promo Code Handler
  const promoInput = document.getElementById('promo-input');
  const promoBtn = document.getElementById('apply-promo-btn');
  const promoMsg = document.getElementById('promo-msg');

  promoBtn?.addEventListener('click', () => {
    const code = promoInput.value.trim().toUpperCase();
    if (code === 'APEX20') {
      discountPercentage = 0.20;
      promoMsg.style.display = 'block';
      promoMsg.style.color = '#10b981';
      promoMsg.innerHTML = '<i class="fas fa-circle-check"></i> Coupon applied: 20% discount activated!';
      updateCartUI();
      showStoreToast("20% discount applied to your order!");
    } else {
      promoMsg.style.display = 'block';
      promoMsg.style.color = '#ef4444';
      promoMsg.innerHTML = '<i class="fas fa-circle-xmark"></i> Invalid code. Try "APEX20"';
    }
  });

  // Checkout Triggers
  document.getElementById('checkout-trigger-btn')?.addEventListener('click', openCheckoutModal);
  document.getElementById('checkout-close-btn')?.addEventListener('click', closeCheckoutModal);

  // Payment method selection
  const payCards = document.querySelectorAll('.payment-method-card');
  payCards.forEach(card => {
    card.addEventListener('click', () => {
      payCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const radio = card.querySelector('input[type="radio"]');
      if (radio) radio.checked = true;
    });
  });

  // Checkout Form Submission
  const checkoutForm = document.getElementById('simulated-checkout-form');
  checkoutForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = checkoutForm.querySelector('button[type="submit"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing Payment...';
    btn.disabled = true;

    setTimeout(() => {
      btn.innerHTML = originalText;
      btn.disabled = false;

      // Generate random order ID
      const orderId = 'NOVA-' + Math.floor(100000 + Math.random() * 900000);
      document.getElementById('receipt-order-id').textContent = orderId;

      // Switch step to success screen
      document.getElementById('checkout-step-form').style.display = 'none';
      document.getElementById('checkout-step-success').style.display = 'block';

      // Clear Cart
      cart = [];
      discountPercentage = 0;
      updateCartUI();
    }, 1000);
  });

  document.getElementById('btn-continue-shopping')?.addEventListener('click', () => {
    closeCheckoutModal();
  });

  // Quick View Quantity and Close
  document.getElementById('qv-close-btn')?.addEventListener('click', closeQuickView);
  document.getElementById('quick-view-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'quick-view-modal') closeQuickView();
  });

  document.getElementById('qv-qty-minus')?.addEventListener('click', () => {
    if (qvQuantity > 1) {
      qvQuantity--;
      document.getElementById('qv-qty-val').textContent = qvQuantity;
    }
  });

  document.getElementById('qv-qty-plus')?.addEventListener('click', () => {
    qvQuantity++;
    document.getElementById('qv-qty-val').textContent = qvQuantity;
  });

  document.getElementById('qv-add-btn')?.addEventListener('click', () => {
    if (qvActiveProductId) {
      addToCart(qvActiveProductId, qvQuantity);
      closeQuickView();
      openCartDrawer();
    }
  });

  // Global Escape key
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCartDrawer();
      closeQuickView();
      closeCheckoutModal();
    }
  });
});
