// ===== PAGE NAVIGATION =====
function showPage(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.toggle('active', a.getAttribute('data-page') === page);
  });
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// ===== NAVBAR SCROLL =====
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// ===== MOBILE MENU =====
function toggleMenu() {
  document.getElementById('mobile-menu').classList.toggle('open');
}

// ===== FAQ ACCORDION =====
function toggleFaq(el) {
  const item = el.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// ===== CAROUSEL =====
let currentSlide = 0;
const totalSlides = 5;
const visibleSlides = 3;
const maxSlide = totalSlides - visibleSlides;

function moveCarousel(dir) {
  currentSlide = Math.max(0, Math.min(maxSlide, currentSlide + dir));
  updateCarousel();
}
function goToSlide(i) {
  currentSlide = Math.min(i, maxSlide);
  updateCarousel();
}
function updateCarousel() {
  const carousel = document.getElementById('testimonials-carousel');
  const cardWidth = 374;
  carousel.style.transform = `translateX(-${currentSlide * cardWidth}px)`;
  document.querySelectorAll('.carousel-dot').forEach((d, i) => d.classList.toggle('active', i === currentSlide));
}
setInterval(() => { currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1; updateCarousel(); }, 5000);

// ===== ANIMATED COUNTERS =====
function animateCounters() {
  document.querySelectorAll('[data-target]').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const step = target / 60;
    const timer = setInterval(() => {
      current = Math.min(target, current + step);
      el.textContent = Math.floor(current) + (target >= 95 ? '' : '+');
      if (current >= target) { el.textContent = target + (target >= 95 ? '' : '+'); clearInterval(timer); }
    }, 16);
  });
}
setTimeout(animateCounters, 800);

// ===== FORM SUBMIT =====
function handleFormSubmit(btn) {
  btn.innerHTML = '<i class="fas fa-check"></i> Message Sent! We\'ll be in touch soon.';
  btn.style.background = 'linear-gradient(135deg, #00A040, #00C060)';
  btn.disabled = true;
  setTimeout(() => {
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';
    btn.style.background = '';
    btn.disabled = false;
  }, 4000);
}

// ===== SCROLL ANIMATIONS =====
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; } });
}, { threshold: 0.1 });
document.querySelectorAll('.service-card, .stat-card, .package-card, .why-reason, .blog-card').forEach(el => {
  el.style.opacity = '0'; el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});

// Mobile responsive carousel adjustment
function updateCarouselLayout() {
  const carousel = document.getElementById('testimonials-carousel');
  if (!carousel) return;
  currentSlide = 0;
  carousel.style.transform = 'translateX(0)';
}
window.addEventListener('resize', updateCarouselLayout);
