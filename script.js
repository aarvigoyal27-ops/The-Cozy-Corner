'use strict';
const PRODUCT_DATA = [
  {
    id: 'p001', name: 'Ashwood Lounge Chair',
    category: 'living-room', categoryLabel: 'Living Room', price: 30000,
    description: 'Hand-carved solid ashwood with hand-woven jute back. Zero synthetic materials.',
    image: 'https://i.pinimg.com/1200x/15/2e/d7/152ed7565041d4d8a08de19b22f004f6.jpg',
    badge: 'Bestseller',
  },
  {
    id: 'p002', name: 'Velvet Settee No. 7',
    category: 'living-room', categoryLabel: 'Living Room', price: 25000,
    description: 'Three-seater loveseat in deep emerald velvet with solid brass hairpin legs.',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&q=80&auto=format&fit=crop',
    badge: null,
  },
  {
    id: 'p003', name: 'Teak Nesting Tables',
    category: 'living-room', categoryLabel: 'Living Room', price: 22000,
    description: 'Set of three graduated teak side tables. Each surface sealed with pure tung oil.',
    image: 'https://images.unsplash.com/photo-1567016432779-094069958ea5?w=600&q=80&auto=format&fit=crop',
    badge: 'New',
  },
  {
    id: 'p004', name: 'Heritage Wardrobe',
    category: 'bedroom', categoryLabel: 'Bedroom', price: 135000,
    description: 'Six-door solid sheesham wardrobe with dovetail joinery. No particle board.',
    image: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=600&q=80&auto=format&fit=crop',
    badge: null,
  },
  {
    id: 'p005', name: 'Cloud Platform Bed',
    category: 'bedroom', categoryLabel: 'Bedroom', price: 68000,
    description: 'Low-profile platform bed in whitewashed mango wood with brass inlay detail.',
    image: 'https://images.unsplash.com/photo-1616594039964-ae9021a400a0?w=600&q=80&auto=format&fit=crop',
    badge: 'Bestseller',
  },
  {
    id: 'p006', name: 'Linen Accent Chair',
    category: 'bedroom', categoryLabel: 'Bedroom', price: 18500,
    description: 'Slub-linen upholstered accent chair with solid walnut legs. Removable cushion cover.',
    image: 'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=600&q=80&auto=format&fit=crop',
    badge: null,
  },
  {
    id: 'p007', name: 'Oval Dining Table',
    category: 'dining-room', categoryLabel: 'Dining Room', price: 78000,
    description: 'Seats 6–8. Book-matched walnut slab with live-edge detailing. Single pedestal base.',
    image: 'https://images.unsplash.com/photo-1617806118233-18e1de247200?w=600&q=80&auto=format&fit=crop',
    badge: 'New',
  },
  {
    id: 'p008', name: 'Ladder Back Chair',
    category: 'dining-room', categoryLabel: 'Dining Room', price: 12500,
    description: 'Sold individually. Rush-woven seat, steam-bent oak back. Stackable design.',
    image: 'https://images.unsplash.com/photo-1581539250439-c96689b516dd?w=600&q=80&auto=format&fit=crop',
    badge: null,
  },
  {
    id: 'p009', name: 'Credenza No. 3',
    category: 'dining-room', categoryLabel: 'Dining Room', price: 56000,
    description: 'Six-door sideboard in natural oak with hidden push-to-open mechanism.',
    image: 'https://images.unsplash.com/photo-1594026112284-02bb6f3352fe?w=600&q=80&auto=format&fit=crop',
    badge: null,
  },
];

const AppState = {
  products: [], activeFilter: 'all', cart: [],
  theme: 'light', isLoggedIn: false, userName: null, isShuffling: false,
};

const DOM = {
  html:           document.documentElement,
  themeToggleBtn: document.getElementById('theme-toggle'),
  themeOverlay:   document.getElementById('theme-overlay'),
  authBtn:        document.getElementById('auth-btn'),
  authLabel:      document.getElementById('auth-label'),
  heroSlider:     document.getElementById('brightness-slider'),
  loadingState:   document.getElementById('loading-state'),
  productGrid:    document.getElementById('product-grid'),
  filterBtns:     document.querySelectorAll('.filter-btn'),
  noResults:      document.getElementById('no-results'),
  cartToggleBtn:  document.getElementById('cart-toggle-btn'),
  cartOverlay:    document.getElementById('cart-overlay'),
  cartCloseBtn:   document.getElementById('cart-close-btn'),
  cartBackdrop:   document.querySelector('.cart-backdrop'),
  cartDeck:       document.getElementById('card-deck'),
  cartEmptyState: document.getElementById('cart-empty-state'),
  cartControls:   document.getElementById('cart-controls'),
  cartFooterRow:  document.getElementById('cart-footer-row'),
  shuffleBtn:     document.getElementById('shuffle-btn'),
  removeTopBtn:   document.getElementById('remove-top-btn'),
  cartCount:      document.getElementById('cart-count'),
  cartTotal:      document.getElementById('cart-total'),
  cartItemCount:  document.getElementById('cart-item-count-label'),
  checkoutBtn:    document.getElementById('checkout-btn'),
  authModal:      document.getElementById('auth-modal'),
  modalClose:     document.getElementById('modal-close-btn'),
  modalBackdrop:  document.querySelector('.modal-backdrop'),
  loginTab:       document.getElementById('login-tab'),
  signupTab:      document.getElementById('signup-tab'),
  loginPanel:     document.getElementById('login-panel'),
  signupPanel:    document.getElementById('signup-panel'),
  authSuccess:    document.getElementById('auth-success'),
  loginEmail:     document.getElementById('login-email'),
  loginPw:        document.getElementById('login-password'),
  loginEmailErr:  document.getElementById('login-email-error'),
  loginPwErr:     document.getElementById('login-password-error'),
  loginFormErr:   document.getElementById('login-form-error'),
  loginSubmit:    document.getElementById('login-submit-btn'),
  signupName:     document.getElementById('signup-name'),
  signupEmail:    document.getElementById('signup-email'),
  signupPw:       document.getElementById('signup-password'),
  signupNameErr:  document.getElementById('signup-name-error'),
  signupEmailErr: document.getElementById('signup-email-error'),
  signupPwErr:    document.getElementById('signup-password-error'),
  signupFormErr:  document.getElementById('signup-form-error'),
  pwStrengthFill: document.getElementById('pw-strength-fill'),
  pwStrengthLbl:  document.getElementById('pw-strength-label'),
  toast:          document.getElementById('toast'),
  toastMessage:   document.getElementById('toast-message'),
};

// ── Demonstrating HOF ──────────────────────────────────────
const formatCurrency = (amount) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(amount);

// ── Demonstrating Closure ──────────────────────────────────
const createToastController = () => {
  let timerId = null;
  return {
    show(message, duration = 3000) {
      if (timerId) { clearTimeout(timerId); DOM.toast.classList.remove('toast-exit'); }
      DOM.toastMessage.textContent = message;
      DOM.toast.hidden = false;
      DOM.toast.classList.remove('toast-exit');
      timerId = setTimeout(() => {
        DOM.toast.classList.add('toast-exit');
        setTimeout(() => { DOM.toast.hidden = true; timerId = null; }, 320);
      }, duration);
    },
  };
};
const Toast = createToastController();

// ── Demonstrating Regex ────────────────────────────────────
const isValidEmail = (email) =>
  /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(email.trim());

const evaluatePassword = (pw) => {
  const score = [pw.length >= 8, /\d/.test(pw), /[^a-zA-Z0-9]/.test(pw), /[A-Z]/.test(pw)].filter(Boolean).length;
  return { valid: pw.length >= 8, strength: score <= 1 ? 'weak' : score <= 2 ? 'fair' : 'strong', score };
};

// ── Demonstrating BOM — localStorage ──────────────────────
const saveCartToStorage    = () => localStorage.setItem('cozyCornerCart', JSON.stringify(AppState.cart));
const loadCartFromStorage  = () => { const r = localStorage.getItem('cozyCornerCart'); return r ? JSON.parse(r) : []; };
const saveThemeToStorage   = (t) => localStorage.setItem('cozyCornerTheme', t);
const loadThemeFromStorage = () => localStorage.getItem('cozyCornerTheme') || 'light';
const saveAuthSession      = (n, e) => localStorage.setItem('cozyCornerUser', JSON.stringify({ name: n, email: e }));
const loadAuthSession      = () => { const r = localStorage.getItem('cozyCornerUser'); return r ? JSON.parse(r) : null; };
const clearAuthSession     = () => localStorage.removeItem('cozyCornerUser');

// ── Demonstrating async/await + simulated fetch ────────────
const fetchProducts = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return PRODUCT_DATA;
};

// ── Demonstrating .filter() HOF ───────────────────────────
const filterProductsByCategory = (products, category) =>
  category === 'all' ? products : products.filter((p) => p.category === category);

// ── Demonstrating .map() HOF — data → HTML ─────────────────
const productToCardHTML = (product) => {
  const badgeHTML = product.badge ? `<span class="product-badge">${product.badge}</span>` : '';
  return `
    <article class="product-card" role="listitem" data-id="${product.id}">
      <div class="product-img-wrap">
        <img src="${product.image}" alt="${product.name}" class="product-photo" loading="lazy"
          onerror="this.style.display='none';this.nextElementSibling.style.display='flex';" />
        <div class="product-img-fallback" aria-hidden="true" style="display:none;"><span>✦</span></div>
        ${badgeHTML}
      </div>
      <div class="product-info">
        <p class="product-category">${product.categoryLabel}</p>
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <div class="product-footer">
          <span class="product-price">${formatCurrency(product.price)}</span>
          <button class="add-to-cart-btn" data-action="add-to-cart" data-product-id="${product.id}"
            aria-label="Add ${product.name} to cart">Add to Cart</button>
        </div>
      </div>
    </article>`.trim();
};

const renderProducts = (category = 'all') => {
  // .filter() → .map() → .join() functional pipeline
  const html = filterProductsByCategory(AppState.products, category).map(productToCardHTML).join('');
  if (!html) { DOM.productGrid.innerHTML = ''; DOM.noResults.hidden = false; }
  else { DOM.noResults.hidden = true; DOM.productGrid.innerHTML = html; }
};

const addToCart = (productId) => {
  const product = AppState.products.find((p) => p.id === productId);
  if (!product) return;
  if (AppState.cart.some((i) => i.id === productId)) {
    Toast.show(`"${product.name}" is already in your deck.`); return;
  }
  AppState.cart.push(product);
  saveCartToStorage();
  renderCartDeck(); updateCartBadge(); updateCartSummary();
  Toast.show(`✦ "${product.name}" added to your collection.`);
};

// ── Demonstrating .reduce() HOF ───────────────────────────
const computeCartTotal = (items) => items.reduce((total, item) => total + item.price, 0);

const updateCartBadge = () => {
  const count = AppState.cart.length;
  DOM.cartCount.textContent = count;
  DOM.cartCount.classList.toggle('visible', count > 0);
};

const updateCartSummary = () => {
  DOM.cartTotal.textContent = formatCurrency(computeCartTotal(AppState.cart));
  DOM.cartTotal.classList.add('bump');
  setTimeout(() => DOM.cartTotal.classList.remove('bump'), 400);
  const c = AppState.cart.length;
  DOM.cartItemCount.textContent = `${c} ${c === 1 ? 'item' : 'items'}`;
};

// ── Demonstrating .map() + CSS 3D perspective ──────────────
const renderCartDeck = () => {
  const items = AppState.cart;
  const isEmpty = items.length === 0;
  DOM.cartEmptyState.hidden = !isEmpty;
  DOM.cartControls.style.visibility = isEmpty ? 'hidden' : 'visible';
  DOM.cartFooterRow.style.opacity   = isEmpty ? '0.4' : '1';
  if (isEmpty) { DOM.cartDeck.innerHTML = ''; return; }

  const MAX_VISIBLE = 4;
  DOM.cartDeck.innerHTML = items.slice(0, MAX_VISIBLE).map((item, index) => {
    const isTop = index === 0;
    const transform = [
      `translateX(-50%)`,
      `translateY(calc(-50% + ${index * 6}px))`,
      `translateZ(${index * -8}px)`,
      `rotateZ(${index * 1.2}deg)`,
      `scale(${1 - index * 0.025})`,
    ].join(' ');
    return `
      <div class="cart-card ${isTop ? 'top-card' : ''}" role="listitem"
        style="transform:${transform};z-index:${MAX_VISIBLE - index};opacity:${1 - index * 0.12};"
        data-card-id="${item.id}" aria-label="${item.name}, ${formatCurrency(item.price)}">
        <div class="cart-card-thumb">
          <img src="${item.image}" alt="${item.name}" class="cart-card-img" />
        </div>
        <div class="cart-card-info">
          <div class="cart-card-name">${item.name}</div>
          <div class="cart-card-category">${item.categoryLabel}</div>
        </div>
        <div class="cart-card-price">${formatCurrency(item.price)}</div>
        ${isTop ? `<div class="cart-card-pos">— top of deck —</div>` : ''}
      </div>`.trim();
  }).join('');
};

// ── Demonstrating cart.push(cart.shift()) Shuffle ─────────
const shuffleDeck = async () => {
  if (AppState.cart.length < 2) { Toast.show('Need at least 2 items to shuffle!'); return; }
  if (AppState.isShuffling) return;
  AppState.isShuffling = true;
  const topCard = DOM.cartDeck.querySelector('.cart-card.top-card');
  if (topCard) {
    topCard.classList.add('fly-out');
    await new Promise((r) => setTimeout(r, 420));
  }
  AppState.cart.push(AppState.cart.shift()); // Core shuffle logic
  saveCartToStorage();
  renderCartDeck();
  AppState.isShuffling = false;
};

const removeTopCard = () => {
  if (!AppState.cart.length) return;
  const removed = AppState.cart.shift();
  Toast.show(`"${removed.name}" removed from your collection.`);
  saveCartToStorage(); renderCartDeck(); updateCartBadge(); updateCartSummary();
};

// ── Demonstrating Circular Clip-path Theme Toggle ─────────
const toggleTheme = () => {
  const newTheme = AppState.theme === 'light' ? 'dark' : 'light';
  const rect = DOM.themeToggleBtn.getBoundingClientRect();
  DOM.themeOverlay.style.setProperty('--ox', `${rect.left + rect.width / 2}px`);
  DOM.themeOverlay.style.setProperty('--oy', `${rect.top + rect.height / 2}px`);
  DOM.themeOverlay.classList.add('expanding');
  setTimeout(() => {
    AppState.theme = newTheme;
    DOM.html.setAttribute('data-theme', newTheme);
    saveThemeToStorage(newTheme);
  }, 320);
  setTimeout(() => DOM.themeOverlay.classList.remove('expanding'), 700);
};

const applyStoredTheme = () => {
  AppState.theme = loadThemeFromStorage();
  DOM.html.setAttribute('data-theme', AppState.theme);
};

// ── Demonstrating CSS Variable update via JS ──────────────
const onBrightnessChange = (e) => {
  document.documentElement.style.setProperty('--bg-brightness', e.target.value / 100);
  e.target.setAttribute('aria-valuenow', e.target.value);
};

const openAuthModal  = () => { DOM.authModal.hidden = false; document.body.style.overflow = 'hidden'; DOM.loginEmail.focus(); };
const closeAuthModal = () => { DOM.authModal.hidden = true; document.body.style.overflow = ''; resetAuthForms(); };
const openCart       = () => { DOM.cartOverlay.hidden = false; document.body.style.overflow = 'hidden'; DOM.cartCloseBtn.focus(); };
const closeCart      = () => { DOM.cartOverlay.hidden = true; document.body.style.overflow = ''; DOM.cartToggleBtn.focus(); };

const resetAuthForms = () => {
  [DOM.loginEmail, DOM.loginPw, DOM.signupName, DOM.signupEmail, DOM.signupPw]
    .forEach((el) => { if (el) { el.value = ''; el.classList.remove('error'); } });
  [DOM.loginEmailErr, DOM.loginPwErr, DOM.loginFormErr,
   DOM.signupEmailErr, DOM.signupNameErr, DOM.signupPwErr, DOM.signupFormErr]
    .forEach((el) => { if (el) el.textContent = ''; });
  DOM.pwStrengthFill.style.width = '0%';
  DOM.pwStrengthLbl.textContent  = '';
  DOM.authSuccess.hidden = true;
};

const switchAuthTab = (tab) => {
  resetAuthForms();
  const isLogin = tab === 'login';
  DOM.loginPanel.hidden  = !isLogin;
  DOM.signupPanel.hidden =  isLogin;
  DOM.loginTab.classList.toggle('active',  isLogin);
  DOM.signupTab.classList.toggle('active', !isLogin);
  DOM.loginTab.setAttribute('aria-selected',  String(isLogin));
  DOM.signupTab.setAttribute('aria-selected', String(!isLogin));
  (isLogin ? DOM.loginEmail : DOM.signupName).focus();
};

// ── Demonstrating Regex Validation ────────────────────────
const validateLoginForm = () => {
  let ok = true;
  DOM.loginEmailErr.textContent = ''; DOM.loginPwErr.textContent = '';
  DOM.loginEmail.classList.remove('error'); DOM.loginPw.classList.remove('error');
  if (!DOM.loginEmail.value.trim()) {
    DOM.loginEmailErr.textContent = 'Email is required.'; DOM.loginEmail.classList.add('error'); ok = false;
  } else if (!isValidEmail(DOM.loginEmail.value)) {
    DOM.loginEmailErr.textContent = 'Enter a valid email address.'; DOM.loginEmail.classList.add('error'); ok = false;
  }
  if (!DOM.loginPw.value) {
    DOM.loginPwErr.textContent = 'Password is required.'; DOM.loginPw.classList.add('error'); ok = false;
  } else if (DOM.loginPw.value.length < 8) {
    DOM.loginPwErr.textContent = 'Password must be at least 8 characters.'; DOM.loginPw.classList.add('error'); ok = false;
  }
  return ok;
};

const validateSignupForm = () => {
  let ok = true;
  [DOM.signupNameErr, DOM.signupEmailErr, DOM.signupPwErr].forEach((el) => { el.textContent = ''; });
  [DOM.signupName, DOM.signupEmail, DOM.signupPw].forEach((el) => el.classList.remove('error'));
  if (!DOM.signupName.value.trim() || !/^[a-zA-Z\s]{2,}$/.test(DOM.signupName.value.trim())) {
    DOM.signupNameErr.textContent = 'Enter a valid full name (letters only).'; DOM.signupName.classList.add('error'); ok = false;
  }
  if (!isValidEmail(DOM.signupEmail.value)) {
    DOM.signupEmailErr.textContent = 'Enter a valid email address.'; DOM.signupEmail.classList.add('error'); ok = false;
  }
  if (!evaluatePassword(DOM.signupPw.value).valid) {
    DOM.signupPwErr.textContent = 'Password must be at least 8 characters.'; DOM.signupPw.classList.add('error'); ok = false;
  }
  return ok;
};

const handleLogin = () => {
  if (!validateLoginForm()) return;
  const savedUser = loadAuthSession();
  if (!savedUser || savedUser.email !== DOM.loginEmail.value.trim()) {
    DOM.loginFormErr.textContent = 'No account found. Please sign up first.'; return;
  }
  AppState.isLoggedIn = true; AppState.userName = savedUser.name; updateAuthUI();
  DOM.loginPanel.hidden = true; DOM.authSuccess.hidden = false;
  document.getElementById('success-message').textContent = `Welcome back, ${savedUser.name}.`;
  document.getElementById('success-sub').textContent = 'Your collection is waiting.';
  setTimeout(closeAuthModal, 2200);
};

const handleSignup = () => {
  if (!validateSignupForm()) return;
  const name = DOM.signupName.value.trim(), email = DOM.signupEmail.value.trim();
  saveAuthSession(name, email);
  AppState.isLoggedIn = true; AppState.userName = name; updateAuthUI();
  DOM.signupPanel.hidden = true; DOM.authSuccess.hidden = false;
  document.getElementById('success-message').textContent = `Welcome, ${name}.`;
  document.getElementById('success-sub').textContent = 'Your account is ready. Happy collecting.';
  setTimeout(closeAuthModal, 2200);
};

const updateAuthUI = () => {
  DOM.authLabel.textContent = AppState.isLoggedIn
    ? (AppState.userName ? AppState.userName.split(' ')[0] : 'Account')
    : 'Sign In';
};

const onPasswordInput = () => {
  const { score, strength } = evaluatePassword(DOM.signupPw.value);
  DOM.pwStrengthFill.style.width      = `${Math.min(score * 25, 100)}%`;
  DOM.pwStrengthFill.style.background = { weak: '#c04040', fair: '#c4852a', strong: '#3a9e5f' }[strength];
  DOM.pwStrengthLbl.textContent       = DOM.signupPw.value
    ? `Strength: ${strength[0].toUpperCase() + strength.slice(1)}` : '';
};

// ── Demonstrating Event Delegation ────────────────────────
const setupEventDelegation = () => {
  DOM.productGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-action="add-to-cart"]');
    if (btn) addToCart(btn.dataset.productId);
  });
};

// ── Demonstrating BOM — window.location ───────────────────
const handleCheckout = () => {
  if (!AppState.cart.length) { Toast.show('Your cart is empty — add some pieces first!'); return; }
  Toast.show(`Redirecting to checkout — ${formatCurrency(computeCartTotal(AppState.cart))} for ${AppState.cart.length} item(s).`, 4000);
  console.log('[BOM] window.location would navigate to /checkout');
};

const onKeyDown = (e) => {
  if (e.key === 'Escape') {
    if (!DOM.cartOverlay.hidden) closeCart();
    if (!DOM.authModal.hidden)   closeAuthModal();
  }
};

// ── Demonstrating async/await entry point ─────────────────
const init = async () => {
  applyStoredTheme();
  AppState.cart = loadCartFromStorage();
  updateCartBadge(); updateCartSummary();
  const savedUser = loadAuthSession();
  if (savedUser) { AppState.isLoggedIn = true; AppState.userName = savedUser.name; updateAuthUI(); }
  setupEventDelegation();

  DOM.loadingState.style.display = 'grid';
  DOM.productGrid.style.display  = 'none';

  try {
    AppState.products = await fetchProducts();
    DOM.loadingState.style.display = 'none';
    DOM.productGrid.style.display  = 'grid';
    renderProducts('all');
  } catch (err) {
    console.error(err);
    DOM.loadingState.style.display = 'none';
    DOM.productGrid.style.display  = 'grid';
    DOM.noResults.hidden = false;
  }

  renderCartDeck();
  bindEventListeners();
};

const bindEventListeners = () => {
  DOM.themeToggleBtn.addEventListener('click', toggleTheme);
  DOM.heroSlider.addEventListener('input', onBrightnessChange);
  document.querySelector('.filter-bar').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    DOM.filterBtns.forEach((b) => { b.classList.toggle('active', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
    AppState.activeFilter = btn.dataset.filter;
    renderProducts(AppState.activeFilter);
  });
  DOM.cartToggleBtn.addEventListener('click', openCart);
  DOM.cartCloseBtn.addEventListener('click', closeCart);
  DOM.cartBackdrop.addEventListener('click', closeCart);
  DOM.shuffleBtn.addEventListener('click', shuffleDeck);
  DOM.removeTopBtn.addEventListener('click', removeTopCard);
  DOM.checkoutBtn.addEventListener('click', handleCheckout);
  DOM.authBtn.addEventListener('click', () => {
    if (AppState.isLoggedIn) {
      AppState.isLoggedIn = false; AppState.userName = null;
      clearAuthSession(); updateAuthUI(); Toast.show('You have been signed out.');
    } else { openAuthModal(); }
  });
  DOM.modalClose.addEventListener('click', closeAuthModal);
  DOM.modalBackdrop.addEventListener('click', closeAuthModal);
  DOM.loginTab.addEventListener('click',  () => switchAuthTab('login'));
  DOM.signupTab.addEventListener('click', () => switchAuthTab('signup'));
  DOM.loginSubmit.addEventListener('click', handleLogin);
  DOM.loginEmail.addEventListener('keydown', (e) => { if (e.key === 'Enter') DOM.loginPw.focus(); });
  DOM.loginPw.addEventListener('keydown',    (e) => { if (e.key === 'Enter') handleLogin(); });
  DOM.signupSubmit.addEventListener('click', handleSignup);
  DOM.signupName.addEventListener('keydown',  (e) => { if (e.key === 'Enter') DOM.signupEmail.focus(); });
  DOM.signupEmail.addEventListener('keydown', (e) => { if (e.key === 'Enter') DOM.signupPw.focus(); });
  DOM.signupPw.addEventListener('keydown',    (e) => { if (e.key === 'Enter') handleSignup(); });
  DOM.signupPw.addEventListener('input', onPasswordInput);
  document.querySelector('.modal-card').addEventListener('click', (e) => {
    const btn = e.target.closest('.toggle-pw-btn');
    if (!btn) return;
    const inp = document.getElementById(btn.dataset.target);
    inp.type = inp.type === 'password' ? 'text' : 'password';
  });
  document.addEventListener('keydown', onKeyDown);
  document.querySelectorAll('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => {
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); t.scrollIntoView({ behavior: 'smooth' }); }
    })
  );
  window.addEventListener('scroll', () => {
    document.querySelector('.navbar').style.boxShadow =
      window.scrollY > 20 ? '0 4px 24px rgba(44,26,14,0.12)' : 'none';
  }, { passive: true });
};
document.addEventListener('DOMContentLoaded', init);