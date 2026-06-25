/* ============================================================
   SWEET PASSPORT — Main App
   - Sweet / Fit mode toggle
   - Add to cart
   - Cart sidebar with quantity controls
   - Checkout via mailto
   ============================================================ */

// ── Product Data ───────────────────────────────────────────────────────────

const PRODUCTS = {
  cheesecake: { emoji: '🍮', price: 6.50 },
  pancakes:   { emoji: '🥞', price: 8.00 },
  cinnamon:   { emoji: '🌀', price: 5.50 },
  brownie:    { emoji: '🍫', price: 4.50 },
  tiramisu:   { emoji: '☕', price: 7.00 },
  cookie:     { emoji: '🍪', price: 3.00 },
};

const NORMAL_CONTENT = {
  cheesecake: { title: 'New York Cheesecake',  desc: 'Dense, creamy, with a buttery graham cracker crust and a silky vanilla filling.',              cal: '380 kcal', tag: 'Classic', badge: 'Bestseller',   ingredients: ['Cream Cheese','Sugar','Graham Cracker','Vanilla'] },
  pancakes:   { title: 'Fluffy Stack',          desc: 'Sky-high pancakes with maple syrup, fresh berries, and a cloud of whipped cream.',             cal: '420 kcal', tag: 'Classic', badge: 'Fan Fave',     ingredients: ['All-purpose Flour','Eggs','Butter','Maple Syrup'] },
  cinnamon:   { title: 'Cinnamon Rolls',        desc: 'Warm, gooey rolls with a brown sugar cinnamon swirl and thick cream cheese frosting.',         cal: '450 kcal', tag: 'Classic', badge: 'Morning Pick', ingredients: ['Flour','Brown Sugar','Cinnamon','Cream Cheese'] },
  brownie:    { title: 'Fudge Brownie',         desc: 'Deep dark chocolate brownie — crispy top, molten center, studded with walnut pieces.',          cal: '390 kcal', tag: 'Classic', badge: 'Staff Pick',   ingredients: ['Dark Chocolate','Sugar','Flour','Walnuts'] },
  tiramisu:   { title: 'Tiramisu',              desc: 'Ladyfingers soaked in espresso, layered with mascarpone cream and dusted with cocoa.',          cal: '360 kcal', tag: 'Classic', badge: 'New',          ingredients: ['Mascarpone','Espresso','Sugar','Cocoa'] },
  cookie:     { title: 'Choco Chip Cookie',     desc: 'Bakery-style cookies — crisp edges, chewy center, loaded with real chocolate chips.',           cal: '280 kcal', tag: 'Classic', badge: 'Classic',      ingredients: ['Butter','Brown Sugar','Flour','Chocolate Chips'] },
};

const FIT_CONTENT = {
  cheesecake: { title: 'Almond Cheesecake',     desc: 'The same creamy, rich texture — built on an almond-flour crust and sweetened with erythritol.',  cal: '210 kcal', tag: 'Fit', badge: 'Low Carb',      ingredients: ['Cream Cheese','Erythritol','Almond Flour','Vanilla'] },
  pancakes:   { title: 'Protein Pancake Stack', desc: 'Light, fluffy almond-flour pancakes with a natural maple-flavoured syrup and fresh berries.',    cal: '240 kcal', tag: 'Fit', badge: 'High Protein',  ingredients: ['Almond Flour','Eggs','Stevia Syrup','Berries'] },
  cinnamon:   { title: 'Fit Cinnamon Rolls',    desc: 'Almond flour dough with a stevia-sweetened cinnamon swirl — all the warmth, none of the guilt.',  cal: '195 kcal', tag: 'Fit', badge: 'Sugar-Free',   ingredients: ['Almond Flour','Erythritol','Cinnamon','Cream Cheese'] },
  brownie:    { title: 'Dark Choco Brownie',    desc: 'Dense almond-flour brownie with 85% dark chocolate and monk fruit sweetener.',                    cal: '180 kcal', tag: 'Fit', badge: 'Keto-Friendly', ingredients: ['85% Chocolate','Almond Flour','Monk Fruit','Walnuts'] },
  tiramisu:   { title: 'Fit Tiramisu',          desc: 'Almond-flour sponge soaked in espresso with an erythritol-sweetened mascarpone mousse.',         cal: '190 kcal', tag: 'Fit', badge: 'Light',         ingredients: ['Mascarpone','Espresso','Erythritol','Cocoa'] },
  cookie:     { title: 'Almond Choco Cookie',   desc: 'Chewy, crisp-edged cookie made from almond flour and stevia with dark chocolate chunks.',         cal: '145 kcal', tag: 'Fit', badge: 'Grain-Free',   ingredients: ['Almond Flour','Stevia','Dark Chocolate','Coconut Oil'] },
};

const HERO_CONTENT = {
  normal: { eyebrow: 'Indulge your way',   title: 'Life is short.<br><em>Eat dessert.</em>',            sub: 'Handcrafted pastries and desserts made with love — choose your style, never compromise on taste.' },
  fit:    { eyebrow: 'Eat well, feel great', title: 'Same love.<br><em>Smarter ingredients.</em>', sub: 'All your favourite desserts, reimagined with almond flour and zero-calorie sweeteners.' },
};

const MENU_CONTENT = {
  normal: { eyebrow: 'Our Menu',  title: "This week's favourites",  desc: 'Classic comfort desserts, baked to perfection with the finest ingredients.' },
  fit:    { eyebrow: 'Fit Menu',  title: 'Guilt-free delights',     desc: 'Every recipe reengineered with almond flour and zero-calorie sweeteners.' },
};

const BANNER_CONTENT = {
  normal: { eyebrow: 'The Fit Side',   title: 'Same desserts.<br>Smarter ingredients.',        sub: 'Every classic recipe reinvented with <strong>almond flour</strong> and <strong>zero-calorie sweeteners</strong> — without compromising taste.', btn: 'Switch to Fit Mode',   onclick: "setMode('fit')" },
  fit:    { eyebrow: 'The Sweet Side', title: 'Sometimes you need<br>the real thing.',          sub: 'Our <strong>classic recipes</strong> use real butter, real sugar, and all-purpose flour — for those moments when only the original will do.',     btn: 'Switch to Sweet Mode', onclick: "setMode('normal')" },
};

// ── State ──────────────────────────────────────────────────────────────────
let currentMode = 'normal';
let cart = []; // [{ key, title, emoji, price, mode, qty }]

// ── Helpers ────────────────────────────────────────────────────────────────
const el = id => document.getElementById(id);
const fmt = n => '$' + n.toFixed(2);

// ── Render Menu ────────────────────────────────────────────────────────────
function renderMenu(mode) {
  const data = mode === 'fit' ? FIT_CONTENT : NORMAL_CONTENT;
  const grid = el('menuGrid');
  if (!grid) return;

  grid.innerHTML = Object.entries(data).map(([key, item]) => {
    const { emoji, price } = PRODUCTS[key];
    return `
      <div class="card" data-key="${key}">
        <div class="card-image">
          <div class="card-emoji">${emoji}</div>
          <div class="card-badge">${item.badge}</div>
        </div>
        <div class="card-body">
          <div class="card-meta">
            <span class="card-tag">${item.tag}</span>
            <span class="card-cal">${item.cal}</span>
          </div>
          <h3 class="card-title">${item.title}</h3>
          <p class="card-desc">${item.desc}</p>
          <div class="card-ingredients">
            ${item.ingredients.map(i => `<span>${i}</span>`).join('')}
          </div>
          <div class="card-footer">
            <span class="card-price">${fmt(price)}</span>
            <button class="btn-add" onclick="addToCart('${key}')">Add to cart</button>
          </div>
        </div>
      </div>`;
  }).join('');
}

// ── Cart Logic ─────────────────────────────────────────────────────────────
function addToCart(key) {
  const data = currentMode === 'fit' ? FIT_CONTENT : NORMAL_CONTENT;
  const { emoji, price } = PRODUCTS[key];
  const item = data[key];
  const id = `${key}-${currentMode}`;
  const existing = cart.find(c => c.id === id);

  if (existing) {
    existing.qty++;
  } else {
    cart.push({ id, key, title: item.title, emoji, price, mode: currentMode, qty: 1 });
  }

  updateCartUI();
  openCart();
  flashCartBtn();
}

function removeFromCart(id) {
  cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(c => c.id === id);
  if (!item) return;
  item.qty += delta;
  if (item.qty <= 0) cart = cart.filter(c => c.id !== id);
  updateCartUI();
}

function getTotal() {
  return cart.reduce((sum, c) => sum + c.price * c.qty, 0);
}

function updateCartUI() {
  const count = cart.reduce((s, c) => s + c.qty, 0);
  const countEl = el('cartCount');
  countEl.textContent = count;
  countEl.classList.toggle('hidden', count === 0);

  const emptyEl  = el('cartEmpty');
  const itemsEl  = el('cartItems');
  const footerEl = el('cartFooter');

  if (cart.length === 0) {
    emptyEl.style.display  = 'flex';
    itemsEl.style.display  = 'none';
    footerEl.style.display = 'none';
    return;
  }

  emptyEl.style.display  = 'none';
  itemsEl.style.display  = 'block';
  footerEl.style.display = 'block';

  itemsEl.innerHTML = cart.map(c => `
    <li class="cart-item">
      <span class="ci-emoji">${c.emoji}</span>
      <div class="ci-info">
        <p class="ci-title">${c.title}</p>
        <small class="ci-mode ${c.mode === 'fit' ? 'ci-fit' : 'ci-normal'}">${c.mode === 'fit' ? 'Fit' : 'Sweet'}</small>
      </div>
      <div class="ci-qty">
        <button class="qty-btn" onclick="changeQty('${c.id}', -1)">−</button>
        <span>${c.qty}</span>
        <button class="qty-btn" onclick="changeQty('${c.id}', 1)">+</button>
      </div>
      <div class="ci-right">
        <span class="ci-price">${fmt(c.price * c.qty)}</span>
        <button class="ci-remove" onclick="removeFromCart('${c.id}')" aria-label="Remove">✕</button>
      </div>
    </li>`).join('');

  el('cartSubtotal').textContent = fmt(getTotal());
}

// ── Cart open / close ──────────────────────────────────────────────────────
function openCart() {
  el('cartSidebar').classList.add('open');
  el('cartOverlay').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeCart() {
  el('cartSidebar').classList.remove('open');
  el('cartOverlay').classList.remove('open');
  document.body.style.overflow = '';
}

function flashCartBtn() {
  const btn = el('cartBtn');
  btn.classList.add('pop');
  setTimeout(() => btn.classList.remove('pop'), 350);
}

// ── Checkout ───────────────────────────────────────────────────────────────
function submitOrder() {
  const name     = (el('ckName')?.value    || '').trim();
  const email    = (el('ckEmail')?.value   || '').trim();
  const delivery = document.querySelector('input[name="delivery"]:checked')?.value || 'Pickup';
  const address  = (el('ckAddress')?.value || '').trim();
  const notes    = (el('ckNotes')?.value   || '').trim();

  if (!name || !email) {
    alert('Please enter your name and email before sending.');
    return;
  }
  if (delivery === 'Delivery' && !address) {
    alert('Please enter your delivery address.');
    return;
  }
  if (cart.length === 0) {
    alert('Your cart is empty!');
    return;
  }

  const itemLines = cart.map(c =>
    `  • ${c.emoji} ${c.title} (${c.mode === 'fit' ? 'Fit' : 'Sweet'}) x${c.qty} — ${fmt(c.price * c.qty)}`
  ).join('\n');

  const body = [
    `Hello Sweet Passport! 🎉`,
    ``,
    `I'd like to place an order:`,
    ``,
    `👤 Name: ${name}`,
    `📧 Email: ${email}`,
    `🚗 Fulfillment: ${delivery}${delivery === 'Delivery' ? '\n📍 Address: ' + address : ''}`,
    ``,
    `🛒 Order:`,
    itemLines,
    ``,
    `💰 Total: ${fmt(getTotal())}`,
    notes ? `\n📝 Notes: ${notes}` : '',
    ``,
    `Looking forward to hearing from you!`,
  ].join('\n');

  const subject = encodeURIComponent('New Order — Sweet Passport');
  window.location.href = `mailto:brendaliortiz2@gmail.com?subject=${subject}&body=${encodeURIComponent(body)}`;
}

// ── Mode switching ─────────────────────────────────────────────────────────
function setMode(mode) {
  if (mode === currentMode) return;
  currentMode = mode;

  document.body.classList.add('switching');
  setTimeout(() => document.body.classList.remove('switching'), 300);

  document.body.classList.toggle('mode-normal', mode === 'normal');
  document.body.classList.toggle('mode-fit',    mode === 'fit');

  // Hero
  const h = HERO_CONTENT[mode];
  if (el('heroEyebrow')) el('heroEyebrow').textContent = h.eyebrow;
  if (el('heroTitle'))   el('heroTitle').innerHTML     = h.title;
  if (el('heroSub'))     el('heroSub').textContent     = h.sub;

  // Menu header
  const m = MENU_CONTENT[mode];
  if (el('menuEyebrow')) el('menuEyebrow').textContent = m.eyebrow;
  if (el('menuTitle'))   el('menuTitle').textContent   = m.title;
  if (el('menuDesc'))    el('menuDesc').textContent    = m.desc;

  // Cards
  renderMenu(mode);

  // Banner
  const b = BANNER_CONTENT[mode];
  if (el('bannerEyebrow')) el('bannerEyebrow').textContent = b.eyebrow;
  if (el('bannerTitle'))   el('bannerTitle').innerHTML     = b.title;
  if (el('bannerSub'))     el('bannerSub').innerHTML       = b.sub;
  if (el('bannerBtn')) {
    el('bannerBtn').textContent = b.btn;
    el('bannerBtn').setAttribute('onclick', `${b.onclick}; return false;`);
  }
}

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  renderMenu('normal');
  updateCartUI();

  // Toggle
  el('modeToggle')?.addEventListener('click', () => setMode(currentMode === 'normal' ? 'fit' : 'normal'));

  // Cart open/close
  el('cartBtn')?.addEventListener('click', openCart);
  el('cartClose')?.addEventListener('click', closeCart);
  el('cartOverlay')?.addEventListener('click', closeCart);

  // Checkout button
  el('checkoutBtn')?.addEventListener('click', submitOrder);

  // Delivery toggle
  document.querySelectorAll('input[name="delivery"]').forEach(radio => {
    radio.addEventListener('change', () => {
      const wrap = el('ckAddressWrap');
      if (wrap) wrap.style.display = radio.value === 'Delivery' ? 'block' : 'none';
    });
  });

  // Keyboard close
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeCart(); });
});
