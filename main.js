/* ================================================================
   JULIÁN MACHUCA — PORTFOLIO
   Main JavaScript
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileMenu();
  initScrollReveal();
  initAudioVisualizer();
  initSmoothScroll();
});

/* ── Navbar scroll effect ─────────────────────────────────────── */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  let ticking = false;

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        if (window.scrollY > 60) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  });
}

/* ── Mobile menu ──────────────────────────────────────────────── */
function initMobileMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');

  toggle.addEventListener('click', () => {
    toggle.classList.toggle('active');
    links.classList.toggle('open');
    document.body.style.overflow = links.classList.contains('open') ? 'hidden' : '';
  });
}

function closeMenu() {
  const toggle = document.getElementById('menuToggle');
  const links = document.getElementById('navLinks');
  toggle.classList.remove('active');
  links.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Scroll reveal (IntersectionObserver) ─────────────────────── */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // Stagger animations
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  elements.forEach(el => observer.observe(el));
}

/* ── Audio visualizer waveform ────────────────────────────────── */
function initAudioVisualizer() {
  const container = document.getElementById('audioVisualizer');
  if (!container) return;

  const barCount = 40;
  for (let i = 0; i < barCount; i++) {
    const bar = document.createElement('div');
    bar.className = 'audio-bar';
    // Random heights and animation delays for organic feel
    const height = Math.random() * 24 + 8;
    const delay = Math.random() * 1.5;
    const duration = Math.random() * 0.8 + 0.8;
    bar.style.height = height + 'px';
    bar.style.animationDelay = delay + 's';
    bar.style.animationDuration = duration + 's';
    container.appendChild(bar);
  }
}

/* ── Smooth scroll for anchor links ───────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}

/* ── Copy email to clipboard ──────────────────────────────────── */
function copyEmail() {
  const email = 'julian.machuca2001@gmail.com';
  navigator.clipboard.writeText(email).then(() => {
    // Update button text
    const span = document.getElementById('emailText');
    span.textContent = '¡Copiado!';
    setTimeout(() => { span.textContent = 'Email'; }, 2000);

    // Show toast
    showToast('📧 ' + email + ' copiado al portapapeles');
  });
}

function showToast(message) {
  // Remove existing toast
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger animation
  requestAnimationFrame(() => {
    toast.classList.add('toast--visible');
  });

  setTimeout(() => {
    toast.classList.remove('toast--visible');
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}
