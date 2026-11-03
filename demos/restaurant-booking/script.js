/**
 * Savor & Spice - Luxury Fine Dining & Reservation Engine
 * Production-ready Vanilla JavaScript
 */

// ==========================================
// 1. CULINARY MENU DATABASE
// ==========================================
const MENU_DISHES = [
  {
    id: 1,
    name: "Hokkaido Scallop Crudo",
    subtitle: "Capesante di Hokkaido con Agrumi",
    category: "starters",
    price: 36,
    desc: "Sashimi-grade Hokkaido sea scallops served with blood orange reduction, finger lime pearls, and cold-pressed Sicilian olive oil.",
    dietary: ["Gluten-Free", "Raw Crudo"],
    tag: "Chef's Starter",
    image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?w=600&q=80"
  },
  {
    id: 2,
    name: "Heritage Beef Tartare",
    subtitle: "Tartare di Manzo al Tartufo Nero",
    category: "starters",
    price: 32,
    desc: "Hand-cut prime Black Angus tenderloin, cured quail egg yolk, shallot brunoise, caperberries, and black winter truffle emulsion.",
    dietary: ["Organic Farm", "Signature"],
    tag: "Heritage",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&q=80"
  },
  {
    id: 3,
    name: "Dry-Aged Wagyu Ribeye A5",
    subtitle: "Costata di Wagyu Giapponese Frollata",
    category: "mains",
    price: 95,
    desc: "Miyazaki A5 Wagyu ribeye seared over Binchotan charcoal, charred baby leeks, marrow jus, and smoked fleur de sel.",
    dietary: ["Gluten-Free", "A5 Certified"],
    tag: "Prime Cut",
    image: "https://images.unsplash.com/photo-1558030006-450675393462?w=600&q=80"
  },
  {
    id: 4,
    name: "Glacier 51 Chilean Sea Bass",
    subtitle: "Spigola Cilena con Brodo di Zafferano",
    category: "mains",
    price: 68,
    desc: "Pan-roasted Patagonian toothfish in an aromatic saffron dashi, braised baby fennel, sea succulents, and candied kumquat.",
    dietary: ["Sustainable Wild", "Pescatarian"],
    tag: "Sommelier Pair",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?w=600&q=80"
  },
  {
    id: 5,
    name: "Truffle Handcrafted Tagliolini",
    subtitle: "Tagliolini Freschi al Tartufo Bianco",
    category: "mains",
    price: 54,
    desc: "30-yolk handmade pasta tossed in cultured Normandy butter, 36-month aged Parmigiano Reggiano, and freshly shaved Norcia winter truffles.",
    dietary: ["Vegetarian", "Artisan Pasta"],
    tag: "House Special",
    image: "https://images.unsplash.com/photo-1621996346565-e3d5d6281691?w=600&q=80"
  },
  {
    id: 6,
    name: "7-Course Chef Omakase Flight",
    subtitle: "Il Grande Viaggio Gastronomico",
    category: "specials",
    price: 185,
    desc: "An experimental tasting voyage featuring rare seasonal imports, live table finishings, and exclusive vintage wine pairings.",
    dietary: ["Pre-Order Required", "Tasting Only"],
    tag: "Michelin Journey",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&q=80"
  },
  {
    id: 7,
    name: "Valrhona Guanaja Soufflé",
    subtitle: "Soufflé Caldo al Cioccolato Fondente",
    category: "desserts",
    price: 24,
    desc: "Baked to order 70% dark chocolate soufflé served with Tahitian bourbon vanilla bean gelato and gold leaf garnish.",
    dietary: ["Vegetarian", "Organic Cacao"],
    tag: "Table Finishing",
    image: "https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=600&q=80"
  },
  {
    id: 8,
    name: "Spiced Saffron Panna Cotta",
    subtitle: "Panna Cotta allo Zafferano e Pistacchio",
    category: "desserts",
    price: 20,
    desc: "Infused with Persian saffron and cardamom, roasted Bronte pistachio praline, and wild raspberry coulis.",
    dietary: ["Gluten-Free", "Vegetarian"],
    tag: "Silky Finish",
    image: "https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=600&q=80"
  },
  {
    id: 9,
    name: "Château Margaux Premier Cru 2015",
    subtitle: "Grand Vin de Bordeaux Reserve",
    category: "wines",
    price: 380,
    desc: "Sensational bouquet of blackcurrant, violets, and cedar. Velvety tannins with lingering notes of truffle and dark cocoa.",
    dietary: ["Cellar Reserve", "Sommelier Select"],
    tag: "Rare Vintage",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&q=80"
  }
];

// ==========================================
// 2. STATE MANAGEMENT
// ==========================================
let activeMenuCategory = 'all';
let guestCount = 2;
let selectedTimeSlot = '7:00 PM';

// ==========================================
// 3. MENU RENDERING
// ==========================================
function renderMenu() {
  const grid = document.getElementById('dishes-grid');
  if (!grid) return;

  const filtered = MENU_DISHES.filter(d => {
    return activeMenuCategory === 'all' || d.category === activeMenuCategory;
  });

  grid.innerHTML = filtered.map(dish => `
    <article class="dish-card">
      <div class="dish-img-wrap">
        <img src="${dish.image}" alt="${dish.name}" class="dish-img" loading="lazy">
        ${dish.tag ? `<span class="dish-tag">${dish.tag}</span>` : ''}
      </div>
      <div class="dish-body">
        <div class="dish-header-row">
          <h3 class="dish-name">${dish.name}</h3>
          <span class="dish-price">$${dish.price}</span>
        </div>
        <div class="dish-sub">${dish.subtitle}</div>
        <p class="dish-desc">${dish.desc}</p>
        <div class="dish-dietary-pills">
          ${dish.dietary.map(item => `<span class="diet-pill">${item}</span>`).join('')}
        </div>
        <button type="button" class="btn-select-dish" onclick="selectDishForBooking('${dish.name.replace(/'/g, "\\'")}')">
          <i class="fas fa-calendar-plus"></i> Reserve Table for this Dish
        </button>
      </div>
    </article>
  `).join('');
}

function selectDishForBooking(dishName) {
  const notesInput = document.getElementById('res-notes');
  if (notesInput) {
    notesInput.value = `Interested in pre-ordering: ${dishName}`;
  }
  document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' });
  showRestoToast(`Preference set for "${dishName}"! Complete your booking below.`);
}

// ==========================================
// 4. RESERVATION FORM HANDLING
// ==========================================
function initReservationControls() {
  // Guest Stepper
  const minusBtn = document.getElementById('guest-minus');
  const plusBtn = document.getElementById('guest-plus');
  const guestDisplay = document.getElementById('guest-val');

  minusBtn?.addEventListener('click', () => {
    if (guestCount > 1) {
      guestCount--;
      guestDisplay.textContent = `${guestCount} Guest${guestCount > 1 ? 's' : ''}`;
    }
  });

  plusBtn?.addEventListener('click', () => {
    if (guestCount < 8) {
      guestCount++;
      guestDisplay.textContent = `${guestCount} Guests`;
    } else {
      showRestoToast("For parties greater than 8, please contact our private dining concierge.");
    }
  });

  // Date Preset to Today
  const dateInput = document.getElementById('res-date');
  if (dateInput) {
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;
    dateInput.value = today;
  }

  // Time Slot Buttons
  const slotButtons = document.querySelectorAll('.time-slot-btn');
  slotButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      slotButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedTimeSlot = btn.getAttribute('data-time');
    });
  });

  // Form Submit
  const form = document.getElementById('reservation-form');
  const modal = document.getElementById('booking-modal');
  const closeBtn = document.getElementById('booking-close-btn');
  const doneBtn = document.getElementById('btn-close-confirm');

  form?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('res-name').value.trim();
    const email = document.getElementById('res-email').value.trim();
    const phone = document.getElementById('res-phone').value.trim();
    const dateVal = document.getElementById('res-date').value;
    const area = document.getElementById('res-area').value;

    if (!name || !email || !phone || !dateVal) {
      showRestoToast("Please complete all required fields.");
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const orig = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Securing Table...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = orig;
      submitBtn.disabled = false;

      // Populate Confirmation Modal
      const refCode = 'SAVOR-' + Math.floor(10000 + Math.random() * 90000);
      document.getElementById('confirm-ref').textContent = refCode;
      document.getElementById('confirm-name').textContent = name;
      document.getElementById('confirm-guests').textContent = `${guestCount} Guests`;
      document.getElementById('confirm-datetime').textContent = `${dateVal} at ${selectedTimeSlot}`;
      document.getElementById('confirm-area').textContent = area;

      // Open Modal
      modal?.classList.add('open');
      document.body.style.overflow = 'hidden';
      showRestoToast("Table successfully confirmed!");
    }, 900);
  });

  const closeModal = () => {
    modal?.classList.remove('open');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  doneBtn?.addEventListener('click', closeModal);
  modal?.addEventListener('click', (e) => {
    if (e.target.id === 'booking-modal') closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });
}

// ==========================================
// 5. TOAST NOTIFICATION
// ==========================================
function showRestoToast(msg) {
  const toast = document.getElementById('resto-toast');
  if (!toast) return;

  toast.innerHTML = `<i class="fas fa-wine-glass" style="color: var(--gold); margin-right: 0.5rem;"></i> ${msg}`;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

// ==========================================
// 6. DOM READY INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  renderMenu();
  initReservationControls();

  // Menu Category Tabs
  const menuTabs = document.querySelectorAll('.m-tab');
  menuTabs.forEach(btn => {
    btn.addEventListener('click', () => {
      menuTabs.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeMenuCategory = btn.getAttribute('data-category');
      renderMenu();
    });
  });
});
