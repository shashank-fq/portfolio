// ===== THEME TOGGLE =====
const html = document.documentElement;
const themeToggle = document.getElementById('theme-toggle');

const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);

themeToggle.addEventListener('click', () => {
  const current = html.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 40);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-links a');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinkEls.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => observer.observe(s));

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('section > .container > *, .project-card, .cert-card, .info-card, .skill-category, .achieve-card, .contact-card');

revealEls.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => revealObserver.observe(el));

// ===== PARTICLES =====
function createParticles() {
  const container = document.getElementById('particles');
  if (!container) return;
  const count = 40;
  for (let i = 0; i < count; i++) {
    const dot = document.createElement('div');
    const size = Math.random() * 3 + 1;
    const x = Math.random() * 100;
    const y = Math.random() * 100;
    const dur = Math.random() * 20 + 10;
    const delay = Math.random() * 10;
    dot.style.cssText = `
      position: absolute;
      left: ${x}%; top: ${y}%;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: ${Math.random() > 0.5 ? 'rgba(124,111,247,0.5)' : 'rgba(34,211,238,0.4)'};
      animation: floatParticle ${dur}s ${delay}s infinite ease-in-out alternate;
      pointer-events: none;
    `;
    container.appendChild(dot);
  }
}

const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes floatParticle {
    from { transform: translateY(0) translateX(0); opacity: 0.3; }
    to { transform: translateY(-30px) translateX(20px); opacity: 0.8; }
  }
`;
document.head.appendChild(particleStyle);
createParticles();

// ===== CONTACT FORM =====
const form = document.getElementById('contact-form');
const successMsg = document.getElementById('form-success');

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Sending...';
  btn.disabled = true;
  setTimeout(() => {
    successMsg.classList.add('show');
    btn.textContent = 'Send Message';
    btn.disabled = false;
    form.reset();
    setTimeout(() => successMsg.classList.remove('show'), 4000);
  }, 1000);
});

// ===== RESUME PLACEHOLDER =====
document.getElementById('resume-btn').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Resume coming soon! Check back later.');
});
document.getElementById('resume-download').addEventListener('click', (e) => {
  e.preventDefault();
  alert('Resume coming soon! Check back later.');
});

// ===== SMOOTH ACTIVE NAV STYLE =====
const navStyle = document.createElement('style');
navStyle.textContent = `.nav-links a.active { color: var(--text); } .nav-links a.active::after { width: 100%; }`;
document.head.appendChild(navStyle);
