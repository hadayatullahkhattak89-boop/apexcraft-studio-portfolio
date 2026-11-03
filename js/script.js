/**
 * ApexCraft Studio - Core Interactive Application
 * Production-ready Vanilla JavaScript
 * Zero external JS dependencies
 */

// ==========================================
// 1. CENTRAL CONFIGURATION
// Easily modify business details here
// ==========================================
const CONFIG = {
  BRAND_NAME: "ApexCraft Studio",
  TAGLINE: "We Build Digital Experiences That Grow Businesses.",
  WHATSAPP_NUMBER: "923135233955", // Pakistan WhatsApp Number
  CONTACT_EMAIL: "apexcrafthub@gmail.com",
  DEFAULT_THEME: "dark",

  // Pricing Calculator Settings
  CALCULATOR: {
    types: {
      business: { name: "Business Website", basePrice: 650, baseDays: 7 },
      ecommerce: { name: "E-Commerce Store", basePrice: 1250, baseDays: 12 },
      landing: { name: "Landing Page", basePrice: 380, baseDays: 4 },
      webapp: { name: "Custom Web Application", basePrice: 1650, baseDays: 16 },
      saas: { name: "SaaS Platform", basePrice: 1450, baseDays: 14 }
    },
    pages: {
      "1-5": { name: "1–5 Pages", multiplier: 1.0, extraDays: 0 },
      "6-10": { name: "6–10 Pages", multiplier: 1.45, extraDays: 3 },
      "11-20": { name: "11–20 Pages", multiplier: 1.9, extraDays: 6 },
      "20+": { name: "20+ Pages", multiplier: 2.5, extraDays: 10 }
    },
    addons: {
      seo: { name: "SEO Optimization", price: 150, days: 1 },
      whatsapp: { name: "WhatsApp Integration", price: 80, days: 1 },
      "contact-form": { name: "Contact Form", price: 60, days: 1 },
      analytics: { name: "Analytics", price: 90, days: 1 },
      cms: { name: "CMS", price: 250, days: 3 },
      animations: { name: "Custom Animations", price: 180, days: 2 },
      payment: { name: "Payment Integration", price: 220, days: 2 },
      rush: { name: "Rush Delivery", price: 200, timeReduction: 0.35 }
    }
  },

  // Service Details Data for Interactive "Learn More" Modals
  SERVICES_DATA: {
    business: {
      title: "Business Websites",
      badge: "Corporate & Professional",
      description: "Modern corporate and business websites engineered to establish unwavering credibility, engage corporate clients, and drive inbound inquiries.",
      deliverables: [
        "Tailored responsive brand design matching company guidelines",
        "High-converting contact capture & calendar booking integrations",
        "On-page technical SEO & OpenGraph social sharing meta tags",
        "Fast PageSpeed score (95+) guaranteed across all devices",
        "30-day post-launch warranty and technical documentation"
      ],
      techStack: "HTML5, CSS3/Tailwind, JavaScript, CMS / Static Site Generators",
      typicalTimeline: "7–10 Business Days",
      startingPrice: "$650"
    },
    ecommerce: {
      title: "E-Commerce Stores",
      badge: "High Conversion Retail",
      description: "High-performance online stores with fluid product filtering, cart drawer, checkout simulation, and payment gateway architecture.",
      deliverables: [
        "Product catalog with dynamic category and price filtering",
        "Interactive sliding cart drawer with live quantity updating",
        "Stripe, PayPal, or custom payment gateway checkout integration",
        "Mobile-first checkout UX optimized for high completion rate",
        "Order receipt confirmation and customer email notifications"
      ],
      techStack: "Modular JavaScript, Snipcart / Stripe API, REST / JSON Catalog",
      typicalTimeline: "12–16 Business Days",
      startingPrice: "$1,250"
    },
    saas: {
      title: "SaaS Platforms & Dashboards",
      badge: "Cloud Software & Tech",
      description: "Modern SaaS landing pages, interactive product showcase tours, and clean analytical customer dashboard interfaces.",
      deliverables: [
        "High-impact SaaS landing page with feature tab tours",
        "Interactive dashboard UI with metric charts and live filter states",
        "Monthly / Annual billing tier pricing switcher",
        "Authentication flow & trial sign-up modals",
        "Enterprise-grade performance and accessibility standards"
      ],
      techStack: "Modern JS Architecture, Canvas / SVG Charting, REST APIs",
      typicalTimeline: "14–18 Business Days",
      startingPrice: "$1,450"
    },
    restaurant: {
      title: "Restaurant & Booking Websites",
      badge: "Hospitality & Dining",
      description: "Restaurant websites featuring sensory visual menus, dietary filter tabs, online table reservations, and event inquiries.",
      deliverables: [
        "Curated visual menu with dietary tags (Vegan, Gluten-Free, Chef Picks)",
        "Interactive online table reservation engine with instant confirmation",
        "Location mapping, opening hours, and direct WhatsApp contact",
        "Private dining / catering inquiry submission forms",
        "Luxury typography and rich photography presentation"
      ],
      techStack: "Semantic HTML5, CSS Grid / Flexbox, Reservation Logic",
      typicalTimeline: "8–12 Business Days",
      startingPrice: "$750"
    },
    landing: {
      title: "Landing Pages",
      badge: "High Conversion Campaigns",
      description: "Laser-focused landing pages built specifically for paid ad campaigns, product pre-orders, and high-volume lead generation.",
      deliverables: [
        "Above-the-fold value proposition and conversion hook",
        "Strategic CTA placements with sticky quick-action triggers",
        "A/B test ready structure with heat-map analytics compatibility",
        "Sub-1 second load time optimization for PPC traffic",
        "Instant WhatsApp and CRM lead routing"
      ],
      techStack: "Ultra-lean Vanilla CSS & JS, Micro-interactions",
      typicalTimeline: "4–6 Business Days",
      startingPrice: "$380"
    },
    webapp: {
      title: "Custom Web Applications",
      badge: "Bespoke Functionality",
      description: "Tailor-made web applications designed to solve unique internal business bottlenecks, client portals, and interactive calculators.",
      deliverables: [
        "Custom workflow automation and business logic implementation",
        "Interactive state management without bloated dependencies",
        "API integrations (CRMs, payment gateways, messaging bots)",
        "Role-based access simulations and structured data handling",
        "Comprehensive code comments and developer handover guide"
      ],
      techStack: "Vanilla JS / Modern Frameworks, Node / REST, WebSockets",
      typicalTimeline: "16–22 Business Days",
      startingPrice: "$1,650"
    }
  }
};

// ==========================================
// 2. HELPER UTILITIES
// ==========================================

/**
 * Generate formatted WhatsApp link with prefilled message
 */
function getWhatsAppUrl(messageText) {
  const cleanNumber = CONFIG.WHATSAPP_NUMBER.replace(/\D/g, '');
  return `https://wa.me/${cleanNumber}?text=${encodeURIComponent(messageText)}`;
}

/**
 * Display toast notification
 */
function showToast(message, type = 'success') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  // Trigger entrance
  requestAnimationFrame(() => {
    toast.classList.add('show');
  });

  // Auto remove
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

// ==========================================
// 3. THEME TOGGLE (DARK / LIGHT MODE)
// ==========================================
function initTheme() {
  const toggleBtn = document.getElementById('theme-toggle');
  const storedTheme = localStorage.getItem('apexcraft_theme') || CONFIG.DEFAULT_THEME;

  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';

      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('apexcraft_theme', newTheme);
      updateThemeIcon(newTheme);
      showToast(`Switched to ${newTheme} mode`);
    });
  }
}

function updateThemeIcon(theme) {
  const icon = document.querySelector('#theme-toggle i');
  if (!icon) return;
  if (theme === 'light') {
    icon.className = 'fas fa-moon';
  } else {
    icon.className = 'fas fa-sun';
  }
}

// ==========================================
// 4. NAVIGATION & MOBILE DRAWER
// ==========================================
function initNavigation() {
  const navbar = document.getElementById('navbar');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky header shadow
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    updateActiveNavLink();
  });

  // Mobile Drawer Toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer when clicking a link
    mobileDrawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Smooth scroll spy
  function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }
}

// ==========================================
// 5. ANIMATED STATISTICS COUNTER
// ==========================================
function initStatCounters() {
  const statNumbers = document.querySelectorAll('[data-counter]');
  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        statNumbers.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-counter'), 10);
          const duration = 1800; // ms
          const start = 0;
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentVal = Math.floor(easeProgress * (target - start) + start);

            counter.textContent = currentVal;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent = target;
            }
          }

          requestAnimationFrame(updateCounter);
        });
      }
    });
  }, { threshold: 0.3 });

  const statsSection = document.getElementById('stats');
  if (statsSection) {
    observer.observe(statsSection);
  }
}

// ==========================================
// 6. INTERACTIVE PROJECT PRICING CALCULATOR
// ==========================================
const calcState = {
  type: 'business',
  pages: '1-5',
  addons: new Set(['seo', 'contact-form'])
};

function initCalculator() {
  const typeButtons = document.querySelectorAll('[data-calc-type]');
  const pageButtons = document.querySelectorAll('[data-calc-pages]');
  const addonCards = document.querySelectorAll('[data-calc-addon]');
  const whatsappQuoteBtn = document.getElementById('calc-whatsapp-btn');

  // Handle Project Type click
  typeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      typeButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcState.type = btn.getAttribute('data-calc-type');
      updateCalculator();
    });
  });

  // Handle Pages click
  pageButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      pageButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      calcState.pages = btn.getAttribute('data-calc-pages');
      updateCalculator();
    });
  });

  // Handle Addon Cards click
  addonCards.forEach(card => {
    card.addEventListener('click', () => {
      const addonKey = card.getAttribute('data-calc-addon');
      if (calcState.addons.has(addonKey)) {
        calcState.addons.delete(addonKey);
        card.classList.remove('active');
      } else {
        calcState.addons.add(addonKey);
        card.classList.add('active');
      }
      updateCalculator();
    });
  });

  // Initial calculation
  updateCalculator();

  function updateCalculator() {
    const typeInfo = CONFIG.CALCULATOR.types[calcState.type] || CONFIG.CALCULATOR.types.business;
    const pageInfo = CONFIG.CALCULATOR.pages[calcState.pages] || CONFIG.CALCULATOR.pages['1-5'];

    // Base math
    let price = typeInfo.basePrice * pageInfo.multiplier;
    let days = typeInfo.baseDays + pageInfo.extraDays;

    let selectedAddonNames = [];
    calcState.addons.forEach(key => {
      const addon = CONFIG.CALCULATOR.addons[key];
      if (addon) {
        price += addon.price;
        if (addon.days) days += addon.days;
        if (addon.timeReduction) {
          days = Math.max(3, Math.round(days * (1 - addon.timeReduction)));
        }
        selectedAddonNames.push(addon.name);
      }
    });

    const finalPrice = Math.round(price);
    const minDays = Math.max(3, Math.round(days * 0.85));
    const maxDays = Math.round(days * 1.15);
    const timelineString = `${minDays}–${maxDays} Business Days`;

    // DOM Updates
    const priceDisplay = document.getElementById('calc-price-display');
    const deliveryDisplay = document.getElementById('calc-delivery-display');
    const summaryType = document.getElementById('summary-type');
    const summaryPages = document.getElementById('summary-pages');
    const summaryAddons = document.getElementById('summary-addons');

    if (priceDisplay) priceDisplay.textContent = `$${finalPrice.toLocaleString()}`;
    if (deliveryDisplay) deliveryDisplay.textContent = `Estimated Delivery: ~${timelineString}`;
    if (summaryType) summaryType.textContent = typeInfo.name;
    if (summaryPages) summaryPages.textContent = pageInfo.name;
    if (summaryAddons) {
      summaryAddons.textContent = selectedAddonNames.length > 0
        ? selectedAddonNames.join(', ')
        : 'None selected';
    }

    // WhatsApp Quote Button URL Generation
    if (whatsappQuoteBtn) {
      const quoteMessage = `Hello ${CONFIG.BRAND_NAME}! I just used your website calculator to configure a project:
- Website Type: ${typeInfo.name}
- Number of Pages: ${pageInfo.name}
- Selected Add-ons: ${selectedAddonNames.length ? selectedAddonNames.join(', ') : 'None'}
- Estimated Investment: $${finalPrice}
- Estimated Timeline: ${timelineString}

I would like to discuss and move forward with this project!`;

      whatsappQuoteBtn.href = getWhatsAppUrl(quoteMessage);
    }
  }
}

// ==========================================
// 7. SERVICES "LEARN MORE" INTERACTIVE MODAL
// ==========================================
function initServiceModals() {
  const modal = document.getElementById('service-modal');
  const closeBtn = document.getElementById('service-modal-close');
  const triggers = document.querySelectorAll('[data-service-trigger]');

  if (!modal) return;

  triggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceKey = btn.getAttribute('data-service-trigger');
      const data = CONFIG.SERVICES_DATA[serviceKey];
      if (!data) return;

      // Populate Modal Content
      document.getElementById('modal-service-badge').textContent = data.badge;
      document.getElementById('modal-service-title').textContent = data.title;
      document.getElementById('modal-service-desc').textContent = data.description;
      document.getElementById('modal-service-stack').textContent = data.techStack;
      document.getElementById('modal-service-timeline').textContent = data.typicalTimeline;
      document.getElementById('modal-service-price').textContent = data.startingPrice;

      const listContainer = document.getElementById('modal-service-deliverables');
      listContainer.innerHTML = '';
      data.deliverables.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check-circle" style="color: var(--success); margin-right: 0.6rem;"></i> ${item}`;
        listContainer.appendChild(li);
      });

      // Update CTA
      const modalCta = document.getElementById('modal-service-cta');
      if (modalCta) {
        modalCta.href = getWhatsAppUrl(`Hi ${CONFIG.BRAND_NAME}! I'm interested in learning more about your "${data.title}" service.`);
      }

      // Open Modal
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  closeBtn?.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

// ==========================================
// 8. INTERACTIVE FAQ ACCORDION
// ==========================================
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (!questionBtn) return;

    questionBtn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for neat accordion behavior
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
}

// ==========================================
// 9. CONTACT FORM VALIDATION & SUBMISSION
// ==========================================
function initContactForm() {
  const form = document.getElementById('contact-form');
  const successModal = document.getElementById('contact-success-modal');
  const successCloseBtn = document.getElementById('contact-success-close');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('form-name').value.trim();
    const email = document.getElementById('form-email').value.trim();
    const phone = document.getElementById('form-phone').value.trim();
    const projectType = document.getElementById('form-service').value;
    const budget = document.getElementById('form-budget').value;
    const details = document.getElementById('form-message').value.trim();

    if (!name || !email || !details) {
      showToast('Please fill out all required fields.', 'error');
      return;
    }

    const submitBtn = form.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting Request...';
    submitBtn.disabled = true;

    // Simulate reliable API request
    setTimeout(() => {
      submitBtn.innerHTML = originalBtnText;
      submitBtn.disabled = false;

      // Fill confirmation details in success modal
      document.getElementById('success-client-name').textContent = name;
      document.getElementById('success-service').textContent = projectType;
      document.getElementById('success-ref-code').textContent = 'APX-' + Math.floor(100000 + Math.random() * 900000);

      // Open Success Modal
      if (successModal) {
        successModal.classList.add('active');
        document.body.style.overflow = 'hidden';
      } else {
        showToast('Thank you! Your project request has been submitted successfully.');
      }

      form.reset();
    }, 900);
  });

  const closeSuccess = () => {
    if (successModal) {
      successModal.classList.remove('active');
      document.body.style.overflow = '';
    }
  };

  successCloseBtn?.addEventListener('click', closeSuccess);
  successModal?.addEventListener('click', (e) => {
    if (e.target === successModal) closeSuccess();
  });
}

// ==========================================
// 10. GLOBAL WHATSAPP LINKS & FLOATING WIDGET
// ==========================================
function bindWhatsAppButtons() {
  // Bind all buttons with [data-whatsapp-action]
  const generalButtons = document.querySelectorAll('[data-whatsapp-action]');
  generalButtons.forEach(btn => {
    btn.href = getWhatsAppUrl(`Hello ${CONFIG.BRAND_NAME}! I visited your agency portfolio and would like to chat about a new website project.`);
  });
}

function initFloatingWhatsApp() {
  const bubble = document.getElementById('wa-bubble');
  const closeBtn = document.getElementById('wa-bubble-close');

  if (!bubble) return;

  // Show gentle welcoming bubble after 3.5 seconds
  setTimeout(() => {
    if (!sessionStorage.getItem('wa_bubble_dismissed')) {
      bubble.classList.add('show');
    }
  }, 3500);

  closeBtn?.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    bubble.classList.remove('show');
    sessionStorage.setItem('wa_bubble_dismissed', 'true');
  });
}

// ==========================================
// 11. INITIALIZATION ON DOM READY
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initNavigation();
  initStatCounters();
  initCalculator();
  initServiceModals();
  initFaqAccordion();
  initContactForm();
  bindWhatsAppButtons();
  initFloatingWhatsApp();
});
