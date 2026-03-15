const loader = document.querySelector('.page-loader');
const nav = document.querySelector('.site-header');
const navLinks = document.querySelectorAll('.nav-links a');
const toggle = document.querySelector('[data-toggle]');
const menu = document.querySelector('[data-menu]');
const backToTop = document.querySelector('.back-to-top');
const revealItems = document.querySelectorAll('.reveal');

window.addEventListener('load', () => {
  setTimeout(() => loader.classList.add('hidden'), 400);
});

document.querySelectorAll('[data-scroll]').forEach((btn) => {
  btn.addEventListener('click', () => {
    document.querySelector(btn.dataset.scroll).scrollIntoView({ behavior: 'smooth' });
    if (menu.classList.contains('open')) {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
});

if (toggle) {
  toggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.2 }
);

revealItems.forEach((item) => observer.observe(item));

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
  const offset = window.scrollY;
  nav.style.background = offset > 40 ? 'rgba(11, 15, 26, 0.85)' : 'rgba(11, 15, 26, 0.5)';
  backToTop.classList.toggle('show', offset > 600);

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    const bottom = top + section.offsetHeight;
    if (offset >= top && offset < bottom) {
      navLinks.forEach((link) => link.classList.remove('active'));
      const activeLink = document.querySelector(`.nav-links a[href="#${section.id}"]`);
      if (activeLink) activeLink.classList.add('active');
    }
  });
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Counters
const counters = document.querySelectorAll('[data-counter]');
let counterStarted = false;

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !counterStarted) {
        counterStarted = true;
        counters.forEach((counter) => {
          const target = Number(counter.dataset.counter);
          let current = 0;
          const increment = Math.max(1, Math.floor(target / 60));
          const tick = () => {
            current += increment;
            if (current >= target) {
              counter.textContent = target;
            } else {
              counter.textContent = current;
              requestAnimationFrame(tick);
            }
          };
          tick();
        });
      }
    });
  },
  { threshold: 0.4 }
);

const statsSection = document.querySelector('#stats');
if (statsSection) counterObserver.observe(statsSection);

// Testimonial slider
const track = document.querySelector('[data-track]');
const prevBtn = document.querySelector('[data-prev]');
const nextBtn = document.querySelector('[data-next]');
let slideIndex = 0;

const updateSlider = () => {
  if (!track) return;
  const cardWidth = track.querySelector('.testimonial-card').offsetWidth + 20;
  track.scrollTo({ left: cardWidth * slideIndex, behavior: 'smooth' });
};

if (nextBtn && prevBtn) {
  nextBtn.addEventListener('click', () => {
    slideIndex = (slideIndex + 1) % 3;
    updateSlider();
  });
  prevBtn.addEventListener('click', () => {
    slideIndex = (slideIndex - 1 + 3) % 3;
    updateSlider();
  });
}

// FAQ accordion
const accordionItems = document.querySelectorAll('.accordion-item');
accordionItems.forEach((item) => {
  item.addEventListener('click', () => {
    const panel = item.nextElementSibling;
    const isExpanded = item.getAttribute('aria-expanded') === 'true';
    accordionItems.forEach((btn) => {
      btn.setAttribute('aria-expanded', 'false');
      btn.nextElementSibling.style.maxHeight = null;
    });
    if (!isExpanded) {
      item.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    }
  });
});

// Simple form validation
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = form.querySelectorAll('input, select, textarea');
    let valid = true;
    fields.forEach((field) => {
      if (!field.checkValidity()) {
        valid = false;
        field.style.borderColor = '#e06c75';
      } else {
        field.style.borderColor = 'rgba(255, 255, 255, 0.12)';
      }
    });
    if (valid) {
      form.reset();
      alert('Thank you. Your consultation request has been received.');
    }
  });
}
