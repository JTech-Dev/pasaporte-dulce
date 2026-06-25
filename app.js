/* ============================================================
   DULCE STUDIO — Mode Switcher
   Toggles between "Sweet" (normal) and "Fit" dessert worlds
   ============================================================ */

const FIT_CONTENT = {
  cheesecake: {
    title: "Almond Cheesecake",
    desc: "The same creamy, rich texture — built on an almond-flour crust and sweetened with erythritol. Zero compromise.",
    cal: "210 kcal",
    ingredients: ["Cream Cheese", "Erythritol", "Almond Flour", "Vanilla"],
    tag: "Fit",
    badge: "Low Carb"
  },
  pancakes: {
    title: "Protein Pancake Stack",
    desc: "Light, fluffy almond-flour pancakes with a natural maple-flavoured syrup, topped with fresh seasonal berries.",
    cal: "240 kcal",
    ingredients: ["Almond Flour", "Eggs", "Stevia Syrup", "Berries"],
    tag: "Fit",
    badge: "High Protein"
  },
  cinnamon: {
    title: "Fit Cinnamon Rolls",
    desc: "All the warmth of a classic cinnamon roll, made with almond flour dough and a stevia-sweetened cinnamon swirl.",
    cal: "195 kcal",
    ingredients: ["Almond Flour", "Erythritol", "Cinnamon", "Cream Cheese"],
    tag: "Fit",
    badge: "Sugar-Free"
  },
  brownie: {
    title: "Dark Choco Brownie",
    desc: "Dense almond-flour brownie with 85% dark chocolate and monk fruit sweetener. Rich flavour, zero sugar spike.",
    cal: "180 kcal",
    ingredients: ["85% Chocolate", "Almond Flour", "Monk Fruit", "Walnuts"],
    tag: "Fit",
    badge: "Keto-Friendly"
  },
  tiramisu: {
    title: "Fit Tiramisu",
    desc: "Layered almond-flour sponge soaked in espresso, with an erythritol-sweetened mascarpone mousse. Guilt-free heaven.",
    cal: "190 kcal",
    ingredients: ["Mascarpone", "Espresso", "Erythritol", "Cocoa"],
    tag: "Fit",
    badge: "Light"
  },
  cookie: {
    title: "Almond Choco Cookie",
    desc: "Chewy, crisp-edged cookie made entirely from almond flour and stevia, with dark chocolate chunks throughout.",
    cal: "145 kcal",
    ingredients: ["Almond Flour", "Stevia", "Dark Chocolate", "Coconut Oil"],
    tag: "Fit",
    badge: "Grain-Free"
  }
};

const NORMAL_CONTENT = {
  cheesecake: {
    title: "New York Cheesecake",
    desc: "Dense, creamy, with a buttery graham cracker crust and a silky vanilla filling.",
    cal: "380 kcal",
    ingredients: ["Cream Cheese", "Sugar", "Graham Cracker", "Vanilla"],
    tag: "Classic",
    badge: "Bestseller"
  },
  pancakes: {
    title: "Fluffy Stack",
    desc: "Sky-high pancakes with maple syrup, fresh berries, and a cloud of whipped cream.",
    cal: "420 kcal",
    ingredients: ["All-purpose Flour", "Eggs", "Butter", "Maple Syrup"],
    tag: "Classic",
    badge: "Fan Fave"
  },
  cinnamon: {
    title: "Cinnamon Rolls",
    desc: "Warm, gooey rolls with a brown sugar cinnamon swirl and thick cream cheese frosting.",
    cal: "450 kcal",
    ingredients: ["Flour", "Brown Sugar", "Cinnamon", "Cream Cheese"],
    tag: "Classic",
    badge: "Morning Pick"
  },
  brownie: {
    title: "Fudge Brownie",
    desc: "Deep dark chocolate brownie — crispy top, molten center, studded with walnut pieces.",
    cal: "390 kcal",
    ingredients: ["Dark Chocolate", "Sugar", "Flour", "Walnuts"],
    tag: "Classic",
    badge: "Staff Pick"
  },
  tiramisu: {
    title: "Tiramisu",
    desc: "Ladyfingers soaked in espresso, layered with mascarpone cream and dusted with cocoa.",
    cal: "360 kcal",
    ingredients: ["Mascarpone", "Espresso", "Sugar", "Cocoa"],
    tag: "Classic",
    badge: "New"
  },
  cookie: {
    title: "Choco Chip Cookie",
    desc: "Bakery-style cookies — crisp edges, chewy center, loaded with real chocolate chips.",
    cal: "280 kcal",
    ingredients: ["Butter", "Brown Sugar", "Flour", "Chocolate Chips"],
    tag: "Classic",
    badge: "Classic"
  }
};

const HERO_CONTENT = {
  normal: {
    eyebrow: "Indulge your way",
    title: "Life is short.<br><em>Eat dessert.</em>",
    sub: "Handcrafted pastries and desserts made with love — choose your style, never compromise on taste."
  },
  fit: {
    eyebrow: "Eat well, feel great",
    title: "Same love.<br><em>Smarter ingredients.</em>",
    sub: "All your favourite desserts, reimagined with almond flour and zero-calorie sweeteners. Same taste, lighter you."
  }
};

const MENU_CONTENT = {
  normal: {
    eyebrow: "Our Menu",
    title: "This week's favourites",
    desc: "Classic comfort desserts, baked to perfection with the finest ingredients."
  },
  fit: {
    eyebrow: "Fit Menu",
    title: "Guilt-free delights",
    desc: "Every recipe reengineered with almond flour and zero-calorie sweeteners — built for your goals."
  }
};

const BANNER_CONTENT = {
  normal: {
    eyebrow: "The Fit Side",
    title: "Same desserts.<br>Smarter ingredients.",
    sub: "Every classic recipe reinvented with <strong>almond flour</strong> instead of refined flour, and <strong>zero-calorie sweeteners</strong> in place of sugar — without ever compromising on taste or texture.",
    btn: "Switch to Fit Mode"
  },
  fit: {
    eyebrow: "The Sweet Side",
    title: "Sometimes you just<br>need the real thing.",
    sub: "Our <strong>classic recipes</strong> use the finest traditional ingredients — real butter, real sugar, and all-purpose flour — for those moments when only the original will do.",
    btn: "Switch to Sweet Mode"
  }
};

// ── State ──────────────────────────────────────────────────────────────────
let currentMode = 'normal';

// ── Helpers ────────────────────────────────────────────────────────────────
function el(id) { return document.getElementById(id); }

function updateCards(mode) {
  const data = mode === 'fit' ? FIT_CONTENT : NORMAL_CONTENT;
  Object.entries(data).forEach(([key, item]) => {
    const titleEl = el(`title-${key}`);
    const descEl  = el(`desc-${key}`);
    const calEl   = el(`cal-${key}`);
    const tagEl   = el(`tag-${key}`);
    const badgeEl = el(`badge-${key}`);
    const ingEl   = el(`ing-${key}`);

    if (titleEl) titleEl.textContent = item.title;
    if (descEl)  descEl.textContent  = item.desc;
    if (calEl)   calEl.textContent   = item.cal;
    if (tagEl)   tagEl.textContent   = item.tag;
    if (badgeEl) badgeEl.textContent = item.badge;
    if (ingEl) {
      ingEl.innerHTML = item.ingredients
        .map(i => `<span>${i}</span>`)
        .join('');
    }
  });
}

function updateHero(mode) {
  const h = HERO_CONTENT[mode];
  const eyebrow = el('heroEyebrow');
  const title   = el('heroTitle');
  const sub     = el('heroSub');
  if (eyebrow) eyebrow.textContent = h.eyebrow;
  if (title)   title.innerHTML = h.title;
  if (sub)     sub.textContent = h.sub;
}

function updateMenu(mode) {
  const m = MENU_CONTENT[mode];
  const eyebrow = el('menuEyebrow');
  const title   = el('menuTitle');
  const desc    = el('menuDesc');
  if (eyebrow) eyebrow.textContent = m.eyebrow;
  if (title)   title.textContent   = m.title;
  if (desc)    desc.textContent    = m.desc;
}

function updateBanner(mode) {
  const b = BANNER_CONTENT[mode];
  const eyebrow = el('bannerEyebrow');
  const title   = el('bannerTitle');
  const sub     = el('bannerSub');
  const btn     = el('bannerBtn');
  if (eyebrow) eyebrow.textContent = b.eyebrow;
  if (title)   title.innerHTML     = b.title;
  if (sub)     sub.innerHTML       = b.sub;
  if (btn) {
    btn.textContent = b.btn;
    btn.onclick = () => {
      setMode(mode === 'fit' ? 'normal' : 'fit');
      return false;
    };
  }
}

// ── Main mode setter ───────────────────────────────────────────────────────
function setMode(mode) {
  if (mode === currentMode) return;
  currentMode = mode;

  // Flash transition
  document.body.classList.add('switching');
  setTimeout(() => document.body.classList.remove('switching'), 300);

  // Swap body class
  document.body.classList.toggle('mode-normal', mode === 'normal');
  document.body.classList.toggle('mode-fit',    mode === 'fit');

  // Update content
  updateHero(mode);
  updateMenu(mode);
  updateCards(mode);
  updateBanner(mode);
}

// ── Toggle click ───────────────────────────────────────────────────────────
function initToggle() {
  const toggle = el('modeToggle');
  if (!toggle) return;
  toggle.addEventListener('click', () => {
    setMode(currentMode === 'normal' ? 'fit' : 'normal');
  });
}

// ── Add-to-cart micro-interaction ──────────────────────────────────────────
function initAddButtons() {
  document.querySelectorAll('.btn-add').forEach(btn => {
    btn.addEventListener('click', function () {
      const prev = this.textContent;
      this.textContent = '✓ Added!';
      this.style.background = 'var(--accent)';
      this.style.color = '#fff';
      setTimeout(() => {
        this.textContent = prev;
        this.style.background = '';
        this.style.color = '';
      }, 1400);
    });
  });
}

// ── Init ───────────────────────────────────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  initToggle();
  initAddButtons();
});
